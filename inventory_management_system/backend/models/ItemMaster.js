import mongoose from "mongoose";
import Supplier from "./supplierMaster.js";

const itemSchema = new mongoose.Schema({
  itemCode: { type: String, required: true, unique: true },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  uom: { type: String, required: true },
  minLevel: { type: Number, required: true },
  maxLevel: { type: Number, required: true },
  reorderLevel: { type: Number, required: true },
  stockQty: { type: Number, default: 0 },
  avgRate: { type: Number, default: 0 },
  ledgerStatus: { type: String, default: "Normal" },
}, { timestamps: true });

const headerSchema = new mongoose.Schema({
  docNumber: { type: Number, unique: true },
  transactionType: { type: String, enum: ["purchase", "issue"], required: true },
  date: { type: Date, default: Date.now },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  supplierCode: {
    type: String,
    validate: {
      validator: function (value) {
        return this.transactionType === "purchase" ? value != null : true;
      },
      message: "supplierCode is required for purchase transactions"
    }
  },
  departmentCode: {
    type: String,
    validate: {
      validator: function (value) {
        return this.transactionType === "issue" ? value != null : true;
      },
      message: "departmentCode is required for issue transactions"
    }
  },
  itemCode: { type: String, required: true },
});

// Auto increment doc number and calculate total
headerSchema.pre("save", async function (next) {
  if (!this.docNumber) {
    const maxHeader = await mongoose.model("TransactionHeader")
      .findOne({})
      .sort({ docNumber: -1 })
      .select("docNumber");
    this.docNumber = maxHeader ? maxHeader.docNumber + 1 : 1;
  }

  if (this.quantity && this.rate) {
    this.totalAmount = this.quantity * this.rate;
  }
  next();
});

export const Item = mongoose.model("Item", itemSchema);
export const TransactionHeader = mongoose.model("TransactionHeader", headerSchema);
