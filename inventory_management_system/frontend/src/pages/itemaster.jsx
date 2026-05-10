import React from "react";
import ActionButton from "../components/button.jsx";

const ItemMaster = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Item Master</h1>
      <div className="flex flex-wrap gap-4">
        <ActionButton text="Add Item" color="green" onClick={() => alert("Add Item")} />
        <ActionButton text="View Items" color="blue" onClick={() => alert("View Items")} />
        <ActionButton text="Update Item" color="yellow" onClick={() => alert("Update Item")} />
        <ActionButton text="Delete Item" color="red" onClick={() => alert("Delete Item")} />
      </div>
    </div>
  );
};

export default ItemMaster;
