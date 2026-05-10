
 import {TransactionHeader} from "../models/ItemMaster.js";
// import TransactionDetail from "../models/transactionDetail.js";


export const createHeader = async (req, res) => {
  try {
    const { transactionType, supplierCode, departmentCode, itemCode, quantity, rate } = req.body;

    // Basic validations
    if (!transactionType || !itemCode || !quantity || !rate) {
      return res.status(400).json({
        success: false,
        message: "transactionType, itemCode, quantity, and rate are required."
      });
    }

    if (transactionType === "purchase" && !supplierCode) {
      return res.status(400).json({
        success: false,
        message: "supplierCode is required for purchase transactions."
      });
    }

    if (transactionType === "issue" && !departmentCode) {
      return res.status(400).json({
        success: false,
        message: "departmentCode is required for issue transactions."
      });
    }

    // Create and save header
    const header = new TransactionHeader({
      transactionType,
      supplierCode: transactionType === "purchase" ? supplierCode : null,
      departmentCode: transactionType === "issue" ? departmentCode : null,
      itemCode,
      quantity,
      rate
    });

    await header.save();

    res.status(201).json({
      success: true,
      message: "Transaction header created successfully",
      data: header
    });

  } catch (error) {
    console.error("Error creating header:", error);
    res.status(500).json({
      success: false,
      message: "Error creating transaction header",
      error: error.message
    });
  }
};


// Fetch all headers
export const getAllHeaders = async (req, res) => {
  try {
    const headers = await TransactionHeader.find();
    res.status(200).json({ success: true, data: headers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching headers" });
  }
};


