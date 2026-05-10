import express from "express";
import {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
  
} from "../controllers/itemcontrollers.js";

const itemrouter = express.Router();
itemrouter.post("/add", addItem);
itemrouter.get("/", getItems);
itemrouter.get("/:id", getItemById);
itemrouter.put("/:id", updateItem);
itemrouter.delete("/:id", deleteItem);

export default itemrouter;
