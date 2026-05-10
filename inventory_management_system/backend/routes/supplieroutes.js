import express from "express";
import {
  addSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} from "../controllers/suppliercontroller.js";

const supplierrouter = express.Router();

// Supplier Routes
supplierrouter.post("/add", addSupplier);
supplierrouter.get("/get", getSuppliers);
supplierrouter.get("/get/:id", getSupplierById);
supplierrouter.put("/update/:id", updateSupplier);
supplierrouter.delete("/delete/:id", deleteSupplier);

export default supplierrouter;
