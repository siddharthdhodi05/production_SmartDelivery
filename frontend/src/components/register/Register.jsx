import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    address:"",
    role:"user"
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`http://localhost:5001/api/auth/register`, user, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        if (res.data && res.data.message) {
            toast.success(res.data.message);
            navigate("/login");
        }
    } catch (error) {
        toast.error("Registration failed. Please try again.");
    }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              value={user.name}
              onChange={(e) => setuser({ ...user, name: e.target.value })}
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              value={user.phone}
              onChange={(e) => setuser({ ...user, phone: e.target.value })}
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={user.address}
              onChange={(e) => setuser({ ...user, address: e.target.value })}
              name="address"
              placeholder="Enter your address"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={user.role}
              onChange={(e) => setuser({ ...user, role:e.target.value })}
              name="role"
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
