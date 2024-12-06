import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast";
import axios from "axios";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState({
    email:"",
    password:""
  })



 const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5001/api/auth/login', user);
    console.log(response);
    if (response.data && response.data.token) {
      const { token } = response.data;

      // Store token in Redux and localStorage
      dispatch(login({ token }));
      localStorage.setItem('token', token);

      // Navigate to the dashboard or home page
      navigate('/');
      toast.success('Login successful!');
    }
  } catch (error) {
    console.log(error);
    toast.error('Login failed. Please check your credentials.');
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={onSubmitHandler}>
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
