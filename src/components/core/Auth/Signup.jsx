import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ROLE } from '../../../utils/constant';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../../slice/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';
import { toast } from 'react-hot-toast';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    gstIn: '',
    address: '',
    role: '', // Initialize role with an empty string
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const signupData = {
      ...formData,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(formData.email, navigate));

    // Reset form data
    setFormData({
      name: '',
      email: '',
      password: '',
      address: '',
      phoneNumber: '',
      gstIn: '',
      role: '',
    });
  };

  return (
    <div className="flex items-center justify-center  bg-gradient-to-r from-blue-300 to-green-300">
      <div className="w-full max-w-2xl mt-4 bg-white rounded-lg shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Create Account</h1>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          {/* Name Input */}
          <label className="block">
            <p className="text-sm font-medium text-gray-700 mb-2">Name <sup className="text-red-500">*</sup></p>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Email Input */}
          <label className="block">
            <p className="text-sm font-medium text-gray-700 mb-2">Email <sup className="text-red-500">*</sup></p>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Password Input */}
          <label className="relative block">
            <p className="text-sm font-medium text-gray-700 mb-2">Password <sup className="text-red-500">*</sup></p>
            <input
              required
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[40px] cursor-pointer text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </span>
          </label>

          {/* Role Select Input */}
          <label className="block">
            <p className="text-sm font-medium text-gray-700 mb-2">Role <sup className="text-red-500">*</sup></p>
            <select
              required
              name="role"
              value={formData.role}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select your role</option>
              {Object.entries(ROLE).map(([key, role]) => (
                <option key={key} value={role}>{role}</option>
              ))}
            </select>
          </label>

          {/* Address Input */}
          <label className="block">
            <p className="text-sm font-medium text-gray-700 mb-2">Address <sup className="text-red-500">*</sup></p>
            <textarea
              required
              name="address"
              value={formData.address}
              onChange={handleOnChange}
              placeholder="Enter your address"
              rows={3}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Phone Number Input */}
          <label className="block">
            <p className="text-sm font-medium text-gray-700 mb-2">Phone Number <sup className="text-red-500">*</sup></p>
            <input
              required
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleOnChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* GST IN Input */}
          <label className="block">
            <p className="text-sm font-medium text-gray-700 mb-2">GST IN <sup className="text-red-500">*</sup></p>
            <input
              type="text"
              name="gstIn"
              value={formData.gstIn}
              onChange={handleOnChange}
              placeholder="Enter your GST IN"
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};
