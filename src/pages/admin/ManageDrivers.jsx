import React, { useState } from "react";
import { FaUserTie, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

export default function ManageDrivers() {
  const [drivers, setDrivers] = useState([
    { name: "Vinesh", phone: "123-456-7890", license: "AB1234" },
    { name: "Saran", phone: "987-654-3210", license: "CD5678" },
  ]);
  const [newDriver, setNewDriver] = useState({ name: "", phone: "", license: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedDriver, setEditedDriver] = useState({});

  const handleAddDriver = () => {
    if (newDriver.name && newDriver.phone && newDriver.license) {
      setDrivers([...drivers, newDriver]);
      setNewDriver({ name: "", phone: "", license: "" });
    }
  };

  const handleDelete = (index) => {
    const updated = [...drivers];
    updated.splice(index, 1);
    setDrivers(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedDriver({ ...drivers[index] });
  };

  const handleSaveEdit = () => {
    const updated = [...drivers];
    updated[editingIndex] = editedDriver;
    setDrivers(updated);
    setEditingIndex(null);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-white">
      <div className="flex items-center mb-6 space-x-3">
        <FaUserTie className="text-green-400 text-3xl" />
        <h2 className="text-3xl font-semibold text-green-300">Manage Drivers</h2>
      </div>

      {/* Add Driver Form */}
      <div className="mb-8">
        <h3 className="text-xl mb-4">Add New Driver</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newDriver.name}
            onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
            className="p-2 rounded bg-white/20 placeholder-white/70 text-white"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newDriver.phone}
            onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
            className="p-2 rounded bg-white/20 placeholder-white/70 text-white"
          />
          <input
            type="text"
            placeholder="License No."
            value={newDriver.license}
            onChange={(e) => setNewDriver({ ...newDriver, license: e.target.value })}
            className="p-2 rounded bg-white/20 placeholder-white/70 text-white"
          />
        </div>
        <button
          onClick={handleAddDriver}
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded shadow"
        >
          Add Driver
        </button>
      </div>

      {/* Driver Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white/5 rounded-lg overflow-hidden">
          <thead className="text-white/80 border-b border-white/20">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">License</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={index} className="hover:bg-white/10">
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedDriver.name}
                      onChange={(e) =>
                        setEditedDriver({ ...editedDriver, name: e.target.value })
                      }
                      className="p-1 bg-white/20 text-white rounded"
                    />
                  ) : (
                    driver.name
                  )}
                </td>
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedDriver.phone}
                      onChange={(e) =>
                        setEditedDriver({ ...editedDriver, phone: e.target.value })
                      }
                      className="p-1 bg-white/20 text-white rounded"
                    />
                  ) : (
                    driver.phone
                  )}
                </td>
                <td className="p-3">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedDriver.license}
                      onChange={(e) =>
                        setEditedDriver({ ...editedDriver, license: e.target.value })
                      }
                      className="p-1 bg-white/20 text-white rounded"
                    />
                  ) : (
                    driver.license
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {editingIndex === index ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-400 hover:text-green-500"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-red-400 hover:text-red-500"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-yellow-400 hover:text-yellow-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
