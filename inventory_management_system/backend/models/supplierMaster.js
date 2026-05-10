import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  supplierCode: { type: String, required: true, unique: true },

  name: { type: String, required: true },
  address: String,
  contactPerson: String,
  phone: Number,
  email: String,
  leadTimeDays: Number,
 // used for reorder planning
}, { timestamps: true });

export default mongoose.model("Supplier", supplierSchema);

