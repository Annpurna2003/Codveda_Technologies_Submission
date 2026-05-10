import React, { useState } from "react";
import axios from "axios";

const AddSupplier = () => {
  const [rows, setRows] = useState([
    {
      supplierCode: "",
      name: "",
      address: "",
      contactPerson: "",
      phone: "",
      email: "",
      leadTimeDays: ""
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
        supplierCode: "",
        name: "",
        address: "",
        contactPerson: "",
        phone: "",
        email: "",
        leadTimeDays: ""
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const row of rows) {
        await axios.post("http://localhost:4000/api/supplier/add", row);
      }
      alert("All suppliers added successfully!");
      setRows([
        {
          supplierCode: "",
          name: "",
          address: "",
          contactPerson: "",
          phone: "",
          email: "",
          leadTimeDays: ""
        }
      ]);
    } catch (error) {
      console.error("Error adding suppliers:", error);
      alert("Failed to add suppliers. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add New Suppliers</h2>

        <table className="w-full border border-gray-300 mb-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Supplier Code</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Contact Person</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Lead Time (Days)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.keys(row).map((field) => (
                  <td className="border p-2" key={field}>
                    <input
                      type={field === "email" ? "email" : field === "phone" || field === "leadTimeDays" ? "number" : "text"}
                      name={field}
                      value={row[field]}
                      onChange={(e) => handleChange(index, e)}
                      required
                      className="w-full border rounded px-1 py-1"
                    />
                  </td>
                ))}
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
            Save Suppliers
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplier;
