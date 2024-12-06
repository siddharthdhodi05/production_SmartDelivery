import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  // Fetch assignments from backend
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Get the token (e.g., from localStorage or any other method)
        const token = localStorage.getItem("token"); // Adjust according to your auth flow

        const response = await axios.get("http://localhost:5001/api/assignments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assignment Management</h1>
        <button
          onClick={() => navigate("/createAssign")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Add Assignment
        </button>
      </div>

      {/* Assignments List */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Assignment ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Customer Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Partner Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {assignments.map((assignment) => (
              <tr
                key={assignment._id}
                className="hover:bg-gray-50 transition-all border-b last:border-none"
              >
                {/* Assignment ID */}
                <td className="px-4 py-3">{assignment._id}</td>

                {/* Customer Name */}
                <td className="px-4 py-3">
                  {assignment.orderId?.customer?.name || "N/A"}
                </td>

                {/* Partner Name */}
                <td className="px-4 py-3">
                  {assignment.partnerId?.name || "N/A"}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      assignment.status === "success"
                        ? "bg-green-100 text-green-800"
                        : assignment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignment;
