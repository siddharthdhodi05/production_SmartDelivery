import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
  const [orders, setOrders] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [assignedAt, setAssignedAt] = useState("");
  const [status, setStatus] = useState("success"); // default status
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token here
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    // Fetch available partners
    const fetchPartners = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/partners", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token here
          },
        });
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners", error);
      }
    };

    fetchOrders();
    fetchPartners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the assignedAt date is formatted correctly
    const assignedAtDate = new Date(assignedAt).toISOString();

    const assignmentData = {
      orderId: selectedOrderId,
      partnerId: selectedPartnerId,
      assignedAt: assignedAtDate, // Use formatted date
      status: status,
    };

    console.log("Sending data to the server:", assignmentData); // Log request data

    try {
      await axios.post(
        "http://localhost:5001/api/assignments",
        assignmentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/assignment"); // Redirect to the assignments list
    } catch (error) {
      //console.error("Error creating assignment", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Assignment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
            Select Order
          </label>
          <select
            id="orderId"
            name="orderId"
            value={selectedOrderId}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select an Order</option>
            {orders.map((order) => (
              <option key={order._id} value={order._id}>
                {order.orderNumber}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="partnerId" className="block text-sm font-medium text-gray-700">
            Select Partner
          </label>
          <select
            id="partnerId"
            name="partnerId"
            value={selectedPartnerId}
            onChange={(e) => setSelectedPartnerId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a Partner</option>
            {partners.map((partner) => (
              <option key={partner._id} value={partner._id}>
                {partner.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="assignedAt" className="block text-sm font-medium text-gray-700">
            Assigned At
          </label>
          <input
            type="datetime-local"
            id="assignedAt"
            name="assignedAt"
            value={assignedAt}
            onChange={(e) => setAssignedAt(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
