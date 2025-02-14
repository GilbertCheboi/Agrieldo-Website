import React, { useState } from "react";

const LivestockManagement = () => {
  const [livestock, setLivestock] = useState([
    { id: 1, name: "Cow 1", breed: "Holstein", dob: "2023-01-10", health_status: "Healthy" },
    { id: 2, name: "Cow 2", breed: "Jersey", dob: "2022-12-05", health_status: "Sick" },
  ]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    dob: "",
    health_status: "Healthy",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLivestock([...livestock, { id: livestock.length + 1, ...formData }]);
    setOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Livestock Management</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setOpen(true)}>
        Add New Livestock
      </button>
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Breed</th>
            <th className="border border-gray-300 px-4 py-2">DOB</th>
            <th className="border border-gray-300 px-4 py-2">Health Status</th>
          </tr>
        </thead>
        <tbody>
          {livestock.map((animal) => (
            <tr key={animal.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{animal.id}</td>
              <td className="border border-gray-300 px-4 py-2">{animal.name}</td>
              <td className="border border-gray-300 px-4 py-2">{animal.breed}</td>
              <td className="border border-gray-300 px-4 py-2">{animal.dob}</td>
              <td className="border border-gray-300 px-4 py-2">{animal.health_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Livestock</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="w-full p-2 border border-gray-300 rounded" name="name" placeholder="Name" onChange={handleInputChange} />
              <input className="w-full p-2 border border-gray-300 rounded" name="breed" placeholder="Breed" onChange={handleInputChange} />
              <input className="w-full p-2 border border-gray-300 rounded" type="date" name="dob" onChange={handleInputChange} />
              <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
                Save
              </button>
              <button className="ml-2 bg-red-500 text-white px-4 py-2 rounded" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestockManagement;