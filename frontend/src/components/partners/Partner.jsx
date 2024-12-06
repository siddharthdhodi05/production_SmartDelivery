import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Partner = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch partners from backend API
  useEffect(() => {
  const fetchPartners = async () => {
    try {
      setLoading(true);

      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found in local storage');
      }

      // Make the API request with the token in headers
      const response = await axios.get("http://localhost:5001/api/partners", {
        headers: {
          Authorization: `Bearer ${token}`, // Adjust based on your backend's expected format
        },
      });

      setPartners(response.data);
    } catch (error) {
      console.error("Error fetching partners:", error);
      setError(error.response?.data?.message || "Failed to load partners. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchPartners();
}, []);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Partner Management</h1>
        <button
          onClick={() => navigate("/addpart")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Add Partner
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
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {partners.map((partner) => (
                <tr
                  key={partner.id}
                  className="hover:bg-gray-50 transition-all border-b last:border-none"
                >
                  <td className="px-4 py-3">{partner.name}</td>
                  <td className="px-4 py-3">{partner.email}</td>
                  <td className="px-4 py-3">{partner.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Partner;
