
import {Item} from "../models/ItemMaster.js"; 
import {TransactionHeader} from "../models/ItemMaster.js";
// Purchase stock update
export const updateStockOnPurchaseBulk = async (req, res) => {
  try {
    let { items } = req.body;

    if (!items) return res.status(400).json({ success: false, message: "items are required" });
    if (!Array.isArray(items)) items = [items];

    const bulkOps = items.map(i => ({
      updateOne: {
        filter: { _id: i._id },
        update: { $inc: { stockQty: i.quantity } }
      }
    }));

    const result = await Item.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: `Stock increased for ${result.modifiedCount} items`
    });

  } catch (error) {
    console.error("Error updating purchase stock:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Issue stock update
export const updateStockOnIssueBulk = async (req, res) => {
  try {
    let { items } = req.body;

    if (!items) return res.status(400).json({ success: false, message: "items are required" });
    if (!Array.isArray(items)) items = [items];

    const bulkOps = items.map(i => ({
      updateOne: {
        filter: { _id: i._id },
        update: { $inc: { stockQty: -i.quantity } } // decrease stock
      }
    }));

    const result = await Item.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: `Stock decreased for ${result.modifiedCount} items`
    });

  } catch (error) {
    console.error("Error updating issue stock:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Calculate and update ledger status for all items
export const calculateLedgerStatus = async (req, res) => {
  try {
    const items = await Item.find();
    const transactions = await TransactionHeader.find();

    if (!items.length) {
      return res.status(404).json({ success: false, message: "No items found" });
    }

    const ledger = items.map(item => {
      const itemTxns = transactions.filter(txn => txn.itemCode === item.itemCode);

      const purchaseQty = itemTxns
        .filter(txn => txn.transactionType === "purchase")
        .reduce((sum, txn) => sum + txn.quantity, 0);

      const issueQty = itemTxns
        .filter(txn => txn.transactionType === "issue")
        .reduce((sum, txn) => sum + txn.quantity, 0);

      const openingStock = item.stockQty - (purchaseQty - issueQty);
      const closingStock = item.stockQty;

      let status = "Normal";
      if (closingStock < item.minLevel) status = "Danger";
      else if (closingStock <= item.reorderLevel) status = "Reorder Soon";
      else if (closingStock > item.maxLevel) status = "Overstock";

      return {
        itemCode: item.itemCode,
        itemName: item.itemName,
        openingStock,
        purchaseQty,
        issueQty,
        closingStock,
        minLevel: item.minLevel,
        reorderLevel: item.reorderLevel,
        maxLevel: item.maxLevel,
        ledgerStatus: status
      };
    });

    // Optional: update ledgerStatus in DB for each item
    const bulkOps = ledger.map(l => ({
      updateOne: {
        filter: { itemCode: l.itemCode },
        update: { $set: { ledgerStatus: l.ledgerStatus } }
      }
    }));
    await Item.bulkWrite(bulkOps);

    res.status(200).json({ success: true, data: ledger });
  } catch (error) {
    console.error("Error calculating ledger status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};