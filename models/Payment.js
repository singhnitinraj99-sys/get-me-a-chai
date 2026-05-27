import mongoose from "mongoose"
const { Schema, model } = mongoose

const PaymentSchema = new Schema({
  name:     { type: String, required: true },
  to_user:  { type: String, required: true },
  oid:      { type: String, required: true },
  message:  { type: String },
  amount:   { type: Number, required: true },
  done:     { type: Boolean, default: false }, // ✅ Boolean not Boo;Boolean
}, { timestamps: true })                       // ✅ auto createdAt + updatedAt

export default mongoose.models.Payment || model("Payment", PaymentSchema)