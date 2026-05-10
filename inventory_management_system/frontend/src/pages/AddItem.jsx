import React, { useState } from "react";
import axios from "axios";

const AddItem = () => {
  const [rows, setRows] = useState([
    {
      itemCode: "",
      itemName: "",
      description: "",
      uom: "",
      minLevel: "",
      maxLevel: "",
      reorderLevel: "",
       stockQty: "",
      avgQty: "",
     
    }
  ]);

  const handleChange = (index, e) => {
    const newRows = [...rows];
    newRows[index][e.target.name] = e.target.value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        itemCode: "",
        itemName: "",
        description: "",
        uom: "",
        minLevel: "",
        maxLevel: "",
        reorderLevel: "",
        avgQty: "",
        stockQty: ""
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const row of rows) {
        await axios.post("http://localhost:5000/api/item/add", row);
      }
      alert("All items added successfully!");
      setRows([
        {
          itemCode: "",
          itemName: "",
          description: "",
          uom: "",
          minLevel: "",
          maxLevel: "",
          reorderLevel: "",
          avgQty: "",
          stockQty: ""
        }
      ]);
    } catch (error) {
      console.error("Error adding items:", error);
      alert("Failed to add items. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add New Items</h2>

        <table className="w-full border border-gray-300 mb-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Item Code</th>
               <th className="border p-2">Item Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">UOM</th>
              <th className="border p-2">Min Level</th>
              <th className="border p-2">Max Level</th>
              <th className="border p-2">Reorder Level</th>
              <th className="border p-2">Stock Qty</th>
              <th className="border p-2">Avg Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <input
                    type="text"
                    name="itemCode"
                    value={row.itemCode}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
                  <td className="border p-2">
                  <input
                    type="text"
                    name="itemName"
                    value={row.itemName}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="description"
                    value={row.description}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="uom"
                    value={row.uom}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    name="minLevel"
                    value={row.minLevel}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    name="maxLevel"
                    value={row.maxLevel}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    name="reorderLevel"
                    value={row.reorderLevel}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    name="stockQty"
                    value={row.stockQty}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    name="avgQty"
                    value={row.avgQty}
                    onChange={(e) => handleChange(index, e)}
                    required
                    className="w-full border rounded px-1 py-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={addRow}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Row
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Items
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
