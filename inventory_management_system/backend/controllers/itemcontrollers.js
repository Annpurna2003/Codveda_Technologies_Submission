import {Item} from "../models/ItemMaster.js";
import Supplier from "../models/supplierMaster.js";

// ✅ Add new Item
export const addItem = async (req, res) => {
  try {
   const {
  itemCode,
  itemName,
  description,
  uom,
  minLevel,
  maxLevel,
  reorderLevel,
  stockQty,
  avgRate
} = req.body;

    // check duplicate code
    const existing = await Item.findOne({ itemCode });
    if (existing) {
      return res.status(400).json({ success: false, message: "Item code already exists" });
    }

    

  const item = new Item({
  itemCode,
  itemName,
  description,
  uom,
  minLevel,
  maxLevel,
  reorderLevel,
   avgRate,
  stockQty,
 
});

    await item.save();

    res.status(201).json({ success: true, message: "Item created successfully", item });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get all Items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get single Item by ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).populate("supplier", "name email phone");

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Update Item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      itemCode,
      itemName,
      description,
      uom,
      minLevel,
      maxLevel,
      reorderLevel,
      stockQty,
      avgRate
    } = req.body;

    // check duplicate itemCode
    const existingItem = await Item.findOne({
      itemCode,
      _id: { $ne: id }
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Item code already exists"
      });
    }

    const item = await Item.findByIdAndUpdate(
      id,
      {
        itemCode,
        itemName,
        description,
        uom,
        minLevel,
        maxLevel,
        reorderLevel,
        stockQty,
        avgRate
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item
    });

  } catch (error) {
    console.error("Error updating item:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting item:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
