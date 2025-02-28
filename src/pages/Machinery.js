import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Machinery = () => {
  const [machinery, setMachinery] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    purchase_date: "",
    condition: "New",
    image: null,
  });

  useEffect(() => {
    fetchMachinery();
  }, []);

  const fetchMachinery = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      const response = await axios.get("https://api.agrieldo.com/api/machinery/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched Machinery Data:", response.data);
      setMachinery(response.data);
    } catch (error) {
      console.error("Error fetching machinery:", error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.purchase_date || !formData.image) {
      console.error("Please fill in all required fields.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found, please log in.");
        return;
      }

      await axios.post("https://api.agrieldo.com/api/machinery/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      fetchMachinery();
      setOpen(false);
    } catch (error) {
      console.error("Error adding machinery:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Machinery Management</h1>

      {/* Machinery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {machinery.map((item) => {
          const imageUrl = item.image.startsWith("http") ? item.image : `https://api.agrieldo.com${item.image}`;
          return (
            <div 
              key={item.id} 
              className="border rounded-lg shadow-lg p-4 bg-white cursor-pointer"
              onClick={() => navigate(`/machinery/${item.id}`)}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded"
                  onError={(e) => {
                    console.error("Image failed to load:", imageUrl);
                    e.target.src = "placeholder-image-url.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded">
                  No Image
                </div>
              )}
              <h3 className="text-lg font-bold mt-2">{item.name}</h3>
              <p className="text-sm text-gray-600">Model: {item.model || "N/A"}</p>
              <p className="text-sm text-gray-600">Purchase Date: {item.purchase_date}</p>
              <p className="text-sm text-gray-600">Condition: {item.condition}</p>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-10 right-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
      >
        +
      </button>

      {/* Modal for Adding Machinery */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Machinery</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border p-2 mb-2"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="model"
                placeholder="Model"
                className="w-full border p-2 mb-2"
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="purchase_date"
                className="w-full border p-2 mb-2"
                onChange={handleInputChange}
                required
              />
              <select
                name="condition"
                className="w-full border p-2 mb-2"
                onChange={handleInputChange}
                required
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Needs Repair">Needs Repair</option>
              </select>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full border p-2 mb-2"
                onChange={handleInputChange}
                required
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Machinery;
