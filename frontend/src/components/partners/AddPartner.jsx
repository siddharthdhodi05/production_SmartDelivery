import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPartner = () => {
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState({
    name: "",
    phone: "",
    email: "",
    shiftStart: "",
    shiftEnd: "",
    currentLoad: 0,
    assignedOrders: [],
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartnerData({ ...partnerData, [name]: value });
  };

  const handleAddPartner = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in local storage");
      }

      // Format the shift object
      const shift = {
        start: partnerData.shiftStart,
        end: partnerData.shiftEnd,
      };

      // Make the API request
      const response = await axios.post(
        "http://localhost:5001/api/partners",
        {
          name: partnerData.name,
          phone: partnerData.phone,
          email: partnerData.email,
          shift,
          currentLoad: partnerData.currentLoad,
          assignedOrders: partnerData.assignedOrders,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Partner added successfully!");
      navigate("/partner"); // Redirect to the partners list page
    } catch (error) {
      console.error("Error adding partner:", error);
      setError(error.response?.data?.message || "Failed to add partner. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Partner</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddPartner} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={partnerData.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={partnerData.phone}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={partnerData.email}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Shift Start</label>
          <input
            type="datetime-local"
            name="shiftStart"
            value={partnerData.shiftStart}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Shift End</label>
          <input
            type="datetime-local"
            name="shiftEnd"
            value={partnerData.shiftEnd}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Current Load</label>
          <input
            type="number"
            name="currentLoad"
            value={partnerData.currentLoad}
            onChange={handleInputChange}
            className="border p-2 w-full"
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Partner
        </button>
      </form>
    </div>
  );
};

export default AddPartner;
