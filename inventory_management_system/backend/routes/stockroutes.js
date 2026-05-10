import express from "express";
// import stockcontroller from "../controllers/stockcontroller.js";
import {updateStockOnIssueBulk,updateStockOnPurchaseBulk,calculateLedgerStatus} from "../controllers/stockcontroller.js";


const stockrouter = express.Router();
stockrouter.put('/updatepurchase',updateStockOnPurchaseBulk)
stockrouter.put('/updateissue',updateStockOnIssueBulk)
stockrouter.get('/calculateledgerstatus',calculateLedgerStatus)

export default stockrouter;
