import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewSupplier = () => {
  const [suppliers, setSuppliers] = useState([]); // always an array
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // ✅ Fetch suppliers
const fetchSuppliers = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/api/supplier/get");
    if (data.success && Array.isArray(data.suppliers)) {
      setSuppliers(data.suppliers);
    } else {
      setSuppliers([]);
    }
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    setSuppliers([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchSuppliers();
  }, []);

  // ✅ Edit
  const handleEdit = (supplier) => {
    setEditingId(supplier._id);
    setEditFormData({
      supplierCode: supplier.supplierCode || "",
      name: supplier.name || "",
      address: supplier.address || "",
      contactPerson: supplier.contactPerson || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      leadTimeDays: supplier.leadTimeDays || "",
    });
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // ✅ Save updated supplier
  const handleSave = async (id) => {
    try {
      if (!editFormData || Object.keys(editFormData).length === 0) {
        alert("No data to update.");
        return;
      }

      const { data } = await axios.put(
        `http://localhost:4000/api/supplier/update/${id}`,
        editFormData
      );

      if (data.success) {
        setSuppliers((prev) =>
          prev.map((s) =>
            s._id.toString() === id.toString() ? { ...s, ...editFormData } : s
          )
        );
        setEditingId(null);
      } else {
        alert("Failed to update supplier.");
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      alert("Failed to update supplier.");
    }
  };

  // ✅ Cancel editing
  const handleCancel = () => setEditingId(null);

  // ✅ Delete supplier
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/supplier/delete/${id}`
      );
      if (data.success) {
        setSuppliers((prev) => prev.filter((s) => s._id !== id));
      } else {
        alert("Failed to delete supplier.");
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
      alert("Failed to delete supplier.");
    }
  };

  if (loading) return <p>Loading suppliers...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Supplier List</h2>
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">Supplier Code</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Address</th>
            <th className="py-2 px-4 border">Contact Person</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Lead Time (Days)</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers?.map((s) => (
            <tr key={s._id} className="text-center border-b hover:bg-gray-50">
              {editingId === s._id ? (
                <>
                  {["supplierCode", "name", "address", "contactPerson", "phone", "email", "leadTimeDays"].map((field) => (
                    <td key={field} className="py-2 px-4 border">
                      <input
                        type={field === "leadTimeDays" ? "number" : "text"}
                        name={field}
                        value={editFormData[field]}
                        onChange={handleChange}
                        className="w-full border rounded p-1"
                      />
                    </td>
                  ))}
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleSave(s._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border">{s.supplierCode}</td>
                  <td className="py-2 px-4 border">{s.name}</td>
                  <td className="py-2 px-4 border">{s.address}</td>
                  <td className="py-2 px-4 border">{s.contactPerson}</td>
                  <td className="py-2 px-4 border">{s.phone}</td>
                  <td className="py-2 px-4 border">{s.email}</td>
                  <td className="py-2 px-4 border">{s.leadTimeDays}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {(!suppliers || suppliers.length === 0) && (
            <tr>
              <td colSpan="8" className="text-center py-3 text-gray-500">
                No suppliers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSupplier;
