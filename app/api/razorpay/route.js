import { NextResponse } from "next/server"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"
import Payment from "@/models/Payment"
import User from "@/models/User"        // ✅ import User
import connectDB from '@/lib/mongodb'

export const POST = async (req) => {
  await connectDB()
  let body = await req.formData()
  body = Object.fromEntries(body)

  let p = await Payment.findOne({ oid: body.razorpay_order_id })
  if (!p) {
    return NextResponse.json({ success: false, message: "Order Id not found" })
  }

  let xx = validatePaymentVerification(
    { "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id },
    body.razorpay_signature,
    process.env.KEY_SECRET
  )

  if (xx) {
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { returnDocument: 'after' }
    )

    // ✅ find username from email since to_user is now email
    let user = await User.findOne({ email: updatedPayment.to_user })
    let username = user ? user.username : updatedPayment.to_user

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/${username}?paymentdone=true`  // ✅ redirect to username not email
    )
  } else {
    return NextResponse.json({ success: false, message: "Payment Verification Failed" })
  }
}