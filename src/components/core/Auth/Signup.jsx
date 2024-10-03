import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ROLE } from '../../../utils/constant';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSignupData } from '../../../slice/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';
import {toast} from 'react-hot-toast';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    gstIn: '',
    address: '',
  });
  
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); 

  const [showPassword, setShowPassword] = useState(false);
  const role = ROLE.ADMIN;

  // Handle input fields when some value changes
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
      role,
    };

    // Dispatching actions for OTP verification and setting signup data
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
    });
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4 flex-col">
          <label>
            <p>
              Name <sup>*</sup>
            </p>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
              placeholder="Enter your name"
            />
          </label>

          <label>
            <p>
              Email <sup>*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
            />
          </label>

          <label>
            <p>
              Password <sup>*</sup>
            </p>
            <input
              required
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Enter your password"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label>
            <p>
              Address <sup>*</sup>
            </p>
            <textarea
              required
              name="address"
              value={formData.address}
              onChange={handleOnChange}
              placeholder="Enter your address"
              rows={4} // You can adjust the number of rows as needed
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label>
            <p>
              Phone Number <sup>*</sup>
            </p>
            <input
              required
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleOnChange}
              placeholder="Enter your Phone Number"
            />
          </label>

          <label>
            <p>
              GST IN <sup>*</sup>
            </p>
            <input
              type="text"
              name="gstIn"
              value={formData.gstIn}
              onChange={handleOnChange}
              placeholder="Enter your GST IN"
            />
          </label>
        </div>

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Create Account
        </button>
      </form>
    </div>
  );
};
