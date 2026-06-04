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
    amount: amount/100,
    to_user: to_user.email,   // ✅ store email instead of username
    name: paymentform.name,
    message: paymentform.message
  })

  return x
}

export const fetchpayments = async (username) => {
  await connectDB();
  
  // Find user first to get email
  let user = await User.findOne({ username: username });
  if (!user) return { leaderboard: [], totalCount: 0, totalAmount: 0 };
  
  // 1. Fetch top 10 payments for the leaderboard list
  let p = await Payment.find({ to_user: user.email, done: true })
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  // 2. Run a database aggregation to find the total sum and total count of ALL payments
  let stats = await Payment.aggregate([
    { $match: { to_user: user.email, done: true } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        totalCount: { $sum: 1 }
      }
    }
  ]);

  return {
    leaderboard: JSON.parse(JSON.stringify(p)),
    totalCount: stats[0]?.totalCount || 0,
    totalAmount: stats[0]?.totalAmount || 0
  };
}

export const fetchAllEarningsByEmail = async (email) => {
  if (!email) return { payments: [], totalAmount: 0, totalCount: 0 };
  
  await connectDB();
  
  // Fetch ALL completed payments for this creator's email address
  let allPayments = await Payment.find({ to_user: email, done: true })
    .sort({ createdAt: -1 }) // Newest transactions first
    .lean();

  // Calculate total earnings sum
  let totalAmount = allPayments.reduce((sum, p) => sum + p.amount, 0);

  return {
    payments: JSON.parse(JSON.stringify(allPayments)),
    totalAmount: totalAmount,
    totalCount: allPayments.length
  };
}
// Add this function to your existing actions/useractions.js file

export const fetchAllCreators = async () => {
  await connectDB();

  // Get all users who have at least logged in
  let users = await User.find({}).lean();

  // For each user, get their total earnings from payments
  let creatorsWithStats = await Promise.all(
    users.map(async (user) => {
      let stats = await Payment.aggregate([
        { $match: { to_user: user.email, done: true } },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
            totalCount: { $sum: 1 }
          }
        }
      ]);

      return {
        username: user.username,
        name: user.name || user.username,
        profilepic: user.profilepic || null,
        totalAmount: stats[0]?.totalAmount || 0,
        totalCount: stats[0]?.totalCount || 0,
      };
    })
  );

  // Sort by total amount raised, highest first
  creatorsWithStats.sort((a, b) => b.totalAmount - a.totalAmount);

  return JSON.parse(JSON.stringify(creatorsWithStats));
};
//MONGODB_URI=mongodb+srv://singhnitinraj96_db_user:AMqa15zZq9AWpW68@cluster0.0by395t.mongodb.net/getmeachai?appName=Cluster0