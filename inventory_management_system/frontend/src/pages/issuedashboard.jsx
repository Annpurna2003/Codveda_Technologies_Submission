import React, { useState } from "react";
import axios from "axios";

const IssueDashboard = () => {
  const [rows, setRows] = useState([
    { departmentCode: "", itemCode: "", quantity: "", rate: "" },
  ]);

  // Add row
  const addRow = () => {
    setRows([
      ...rows,
      { departmentCode: "", itemCode: "", quantity: "", rate: "" },
    ]);
  };

  // Remove row
  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    const qty = parseFloat(updatedRows[index].quantity) || 0;
    const rate = parseFloat(updatedRows[index].rate) || 0;
    updatedRows[index].totalAmount = qty * rate;

    setRows(updatedRows);
  };

  // Submit purchase

const handleIssue = async () => {
  try {
    // Filter out incomplete rows
    const validRows = rows.filter(
      (row) => row.departmentCode && row.itemCode && row.quantity && row.rate
    );

    if (validRows.length === 0) {
      alert("❌ Please fill in all fields before submitting!");
      return;
    }

    // Send each row to backend
    await Promise.all(
      validRows.map((row) =>
        axios.post("http://localhost:5000/api/transaction/addheader", {
          transactionType: "issue",
          departmentCode: row.departmentCode,
          itemCode: row.itemCode,
          quantity: Number(row.quantity),
          rate: Number(row.rate),
        })
      )
    );

    alert("✅ Issue saved successfully!");
    setRows([{ departmentCode: "", itemCode: "", quantity: "", rate: "" }]);
  } catch (err) {
    console.error(err.response?.data || err);
    alert("❌ Failed to save purchase! Check console for details.");
  }
};

  // Calculate grand total
  const grandTotal = rows.reduce((sum, row) => sum + row.totalAmount, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Issue Dashboard</h2>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Department Code</th>
            <th className="p-2 border">Item Code</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Rate</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.departmentCode}
                  onChange={(e) => handleChange(index, "departmentCode", e.target.value)}
                  placeholder="Enter Department Code"
                  className="w-full border p-1 rounded"
                />
              </td>

              <td className="border p-2">
                <input
                  type="text"
                  value={row.itemCode}
                  onChange={(e) => handleChange(index, "itemCode", e.target.value)}
                  placeholder="Enter Item Code"
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleChange(index, "quantity", e.target.value)}
                  min="0"
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={row.rate}
                  onChange={(e) => handleChange(index, "rate", e.target.value)}
                  min="0"
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border p-2 text-center">
                {rows.length > 1 && (
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 font-bold">Grand Total: {grandTotal}</div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={addRow}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Row
        </button>
        <button
          onClick={handleIssue}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Issue
        </button>
      </div>
    </div>
  );
};

export default IssueDashboard;
