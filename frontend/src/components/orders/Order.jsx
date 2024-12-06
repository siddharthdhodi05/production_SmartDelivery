import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }

        // Make the API request with the token in headers
        const response = await axios.get("http://localhost:5001/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`, // Adjust based on your backend's expected format
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.response?.data?.message || "Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <button
          onClick={() => navigate("/addOrder")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Add Order
        </button>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Order Number</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Area</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-all border-b last:border-none"
                >
                  <td className="px-4 py-3">{order.orderNumber}</td>
                  <td className="px-4 py-3">{order.customer.name}</td>
                  <td className="px-4 py-3">{order.area}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">${order.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;
