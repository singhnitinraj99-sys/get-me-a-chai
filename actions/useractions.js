"use server"
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import Razorpay from 'razorpay'
import Payment from '@/models/Payment'

export const fetchuser = async (username) => {
  await connectDB()
  let u = await User.findOne({ username: username })
  return JSON.parse(JSON.stringify(u))
}

export const updateProfile = async (data, username) => {
  await connectDB()
  const { _id, __v, createdAt, updatedAt, ...cleanData } = data
  await User.findOneAndUpdate(
    { username: username },
    { $set: cleanData },
    { returnDocument: 'after' }
  )
}

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB()

  if (!paymentform.name || paymentform.name.length < 3) {
    throw new Error("Name must be at least 3 characters")
  }
  if (!paymentform.message || paymentform.message.length < 4) {
    throw new Error("Message must be at least 4 characters")
  }

  let to_user = await User.findOne({ username: to_username })

  if (!to_user) throw new Error("User not found")
  if (!to_user.razorpayid || !to_user.razorpaysecret) {
    throw new Error("Razorpay keys not set by this user")
  }

  var instance = new Razorpay({
    key_id: to_user.razorpayid,
    key_secret: to_user.razorpaysecret
  })

  let x = await instance.orders.create({
    amount: Number.parseInt(amount),
    currency: "INR"
  })

  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_user.email,
    name: paymentform.name,
    message: paymentform.message
  })

  return x
}

export const fetchpayments = async (username) => {
  await connectDB()

  let user = await User.findOne({ username: username })
  if (!user) return { leaderboard: [], totalCount: 0, totalAmount: 0 }

  let p = await Payment.find({ to_user: user.email, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean()

  let stats = await Payment.aggregate([
    { $match: { to_user: user.email, done: true } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        totalCount: { $sum: 1 }
      }
    }
  ])

  return {
    leaderboard: JSON.parse(JSON.stringify(p)),
    totalCount: stats[0]?.totalCount || 0,
    totalAmount: stats[0]?.totalAmount || 0
  }
}

export const fetchAllEarningsByEmail = async (email) => {
  if (!email) return { payments: [], totalAmount: 0, totalCount: 0 }

  await connectDB()

  let allPayments = await Payment.find({ to_user: email, done: true })
    .sort({ createdAt: -1 })
    .lean()

  let totalAmount = allPayments.reduce((sum, p) => sum + p.amount, 0)

  return {
    payments: JSON.parse(JSON.stringify(allPayments)),
    totalAmount: totalAmount,
    totalCount: allPayments.length
  }
}

export const fetchAllCreators = async () => {
  await connectDB()

  let users = await User.find({}).lean()

  // Single aggregation for ALL creators at once — much safer than Promise.all
  let allStats = await Payment.aggregate([
    { $match: { done: true } },
    {
      $group: {
        _id: "$to_user",        // group by creator email
        totalAmount: { $sum: "$amount" },
        totalCount: { $sum: 1 }
      }
    }
  ])

  // Build a lookup map: email → stats
  let statsMap = {}
  allStats.forEach((s) => {
    statsMap[s._id] = {
      totalAmount: s.totalAmount || 0,
      totalCount: s.totalCount || 0
    }
  })

  // Merge users with their stats — safe fallback if no payments
  let creators = users.map((user) => ({
    username: user.username || "",
    name: user.name || user.username || "",
    profilepic: user.profilepic || null,
    totalAmount: statsMap[user.email]?.totalAmount || 0,
    totalCount: statsMap[user.email]?.totalCount || 0,
  }))

  // Sort by total amount raised, highest first
  creators.sort((a, b) => b.totalAmount - a.totalAmount)

  return JSON.parse(JSON.stringify(creators))
}