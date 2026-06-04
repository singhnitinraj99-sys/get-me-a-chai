import { NextResponse } from "next/server"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils"
import Payment from "@/models/Payment"
import User from "@/models/User"
import connectDB from '@/lib/mongodb'

export const POST = async (req) => {
  await connectDB()
  let body = await req.formData()
  body = Object.fromEntries(body)

  // Step 1: Find the pending payment record
  let p = await Payment.findOne({ oid: body.razorpay_order_id })
  if (!p) {
    return NextResponse.json({ success: false, message: "Order Id not found" })
  }

  // Step 2: Find the creator using the email stored in the payment
  let user = await User.findOne({ email: p.to_user })
  if (!user || !user.razorpaysecret) {
    return NextResponse.json({ success: false, message: "Creator Razorpay secret not found" })
  }

  // Step 3: Verify using the CREATOR'S secret — the same secret that created the order
  let xx = validatePaymentVerification(
    {
      "order_id": body.razorpay_order_id,
      "payment_id": body.razorpay_payment_id
    },
    body.razorpay_signature,
    user.razorpaysecret   // ✅ FIXED: was process.env.KEY_SECRET (wrong), now creator's own secret
  )

  if (xx) {
    await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { returnDocument: 'after' }
    )

    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/${user.username}?paymentdone=true`
    )
  } else {
    return NextResponse.json({ success: false, message: "Payment Verification Failed" })
  }
}