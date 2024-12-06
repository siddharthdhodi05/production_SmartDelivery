import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddOrder = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    orderNumber: "",
    customer: {
      name: "",
      phone: "",
      address: "",
    },
    area: "",
    items: [],
    totalAmount: 0,
    status: "pending",
    scheduledFor: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is under customer
    if (name.startsWith("customer-")) {
      // Update the customer object
      setOrderData({
        ...orderData,
        customer: {
          ...orderData.customer,
          [name.split("-")[1]]: value, // Get the property (name, phone, address)
        },
      });
    } else {
      // Handle other fields
      setOrderData({
        ...orderData,
        [name]: value,
      });
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in local storage");
      }

      // Make the API request to add the order
      const response = await axios.post(
        "http://localhost:5001/api/orders", // Adjust the URL accordingly
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order added successfully!");
      navigate("/order"); // Redirect to the orders list page (adjust route as necessary)
    } catch (error) {
      console.error("Error adding order:", error);
      setError(error.response?.data?.message || "Failed to add order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Order</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleAddOrder} className="space-y-4">
        <div>
          <label className="block text-gray-700">Order Number</label>
          <input
            type="text"
            name="orderNumber"
            value={orderData.orderNumber}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Customer Details */}
        <div>
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            name="customer-name"
            value={orderData.customer.name}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Phone</label>
          <input
            type="text"
            name="customer-phone"
            value={orderData.customer.phone}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Customer Address</label>
          <input
            type="text"
            name="customer-address"
            value={orderData.customer.address}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        {/* Other Order Details */}
        <div>
          <label className="block text-gray-700">Area</label>
          <input
            type="text"
            name="area"
            value={orderData.area}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={orderData.totalAmount}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Scheduled For</label>
          <input
            type="datetime-local"
            name="scheduledFor"
            value={orderData.scheduledFor}
            onChange={handleInputChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Order
        </button>
      </form>
    </div>
  );
};

export default AddOrder;
