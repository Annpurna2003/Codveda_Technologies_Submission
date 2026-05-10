import express from "express";
import { createHeader, getAllHeaders} from "../controllers/transactionheadercontroller.js";

import { get } from "mongoose";

const transactionrouter = express.Router();

transactionrouter.post("/addheader", createHeader);
transactionrouter.get("/getheader", getAllHeaders);



export default transactionrouter;
