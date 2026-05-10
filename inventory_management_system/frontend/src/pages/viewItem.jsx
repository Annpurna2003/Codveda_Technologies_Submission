import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Fetch items
  const fetchItems = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/item/"
      );

      if (data.success) {
        setItems(data.items);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Start editing
  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setEditFormData({ ...item });
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save update
  const handleSave = async (id) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/item/${id}`,
        editFormData
      );

      if (data.success) {
        setItems((prev) =>
          prev.map((item) =>
            item._id === id ? data.item : item
          )
        );

        setEditingItemId(null);
        setEditFormData({});
      }
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setEditingItemId(null);
    setEditFormData({});
  };
const handleDelete = async (id) => {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    const { data } = await axios.delete(
      `http://localhost:5000/api/item/${id}`
    );

    if (data.success) {
      setItems((prev) => prev.filter((item) => item._id !== id));
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    alert("Failed to delete item.");
  }
};
  if (loading) return <p>Loading items...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Item List
      </h2>

      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border">Item Code</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">UOM</th>
            <th className="py-2 px-4 border">Min Level</th>
            <th className="py-2 px-4 border">Max Level</th>
            <th className="py-2 px-4 border">Reorder Level</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item._id}
              className="text-center border-b hover:bg-gray-50"
            >
              {editingItemId === item._id ? (
                <>
                  <td className="py-2 px-4 border">
                    <input
                      name="itemCode"
                      value={editFormData.itemCode || ""}
                      onChange={handleChange}
                      className="w-full border p-1"
                    />
                  </td>

                  <td className="py-2 px-4 border">
                    <input
                      name="description"
                      value={editFormData.description || ""}
                      onChange={handleChange}
                      className="w-full border p-1"
                    />
                  </td>

                  <td className="py-2 px-4 border">
                    <input
                      name="uom"
                      value={editFormData.uom || ""}
                      onChange={handleChange}
                      className="w-full border p-1"
                    />
                  </td>

                  <td className="py-2 px-4 border">
                    <input
                      type="number"
                      name="minLevel"
                      value={editFormData.minLevel || ""}
                      onChange={handleChange}
                      className="w-full border p-1"
                    />
                  </td>

                  <td className="py-2 px-4 border">
                    <input
                      type="number"
                      name="maxLevel"
                      value={editFormData.maxLevel || ""}
                      onChange={handleChange}
                      className="w-full border p-1"
                    />
                  </td>

                  <td className="py-2 px-4 border">
                    <input
                      type="number"
                      name="reorderLevel"
                      value={editFormData.reorderLevel || ""}
                      onChange={handleChange}
                      className="w-full border p-1"
                    />
                  </td>

                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleSave(item._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border">
                    {item.itemCode}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.description}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.uom}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.minLevel}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.maxLevel}
                  </td>
                  <td className="py-2 px-4 border">
                    {item.reorderLevel}
                  </td>

                  <td className="py-2 px-4 border">
                    <div className="space-x-2">
  <button
    onClick={() => handleEditClick(item)}
    className="bg-blue-500 text-white px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(item._id)}
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewItem;