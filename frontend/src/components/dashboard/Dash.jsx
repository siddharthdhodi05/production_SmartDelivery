import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dash = () => {
  const [counts, setCounts] = useState({
    totalOrders: 0,
    totalPartners: 0,
    totalAssignments: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch total orders count
        const ordersResponse = await axios.get('http://localhost:5001/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if needed
          },
        });
        const totalOrders = ordersResponse.data.length; // assuming the response is an array of orders

        // Fetch total partners count
        const partnersResponse = await axios.get('http://localhost:5001/api/partners', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if needed
          },
        });
        const totalPartners = partnersResponse.data.length; // assuming the response is an array of partners

        // Fetch total assignments count
        const assignmentsResponse = await axios.get('http://localhost:5001/api/assignments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if needed
          },
        });
        const totalAssignments = assignmentsResponse.data.length; // assuming the response is an array of assignments

        // Update state with the fetched counts
        setCounts({
          totalOrders,
          totalPartners,
          totalAssignments,
        });
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      }
    };

    fetchCounts();
  }, []); // Empty dependency array to fetch data on component mount

  return (
    <div className="container mx-auto p-6">
      {/* Dashboard Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Dashboard</h1>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Total Orders Card */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-50">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800">Total Orders</h2>
            <p className="text-5xl font-bold text-gray-900 mt-4">{counts.totalOrders}</p>
          </div>
        </div>

        {/* Active Partners Card */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-green-50">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800">Active Partners</h2>
            <p className="text-5xl font-bold text-gray-900 mt-4">{counts.totalPartners}</p>
          </div>
        </div>

        {/* Pending Assignments Card */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-yellow-50">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-800">Pending Assignments</h2>
            <p className="text-5xl font-bold text-gray-900 mt-4">{counts.totalAssignments}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dash;
