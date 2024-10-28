import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccountService } from '../services/operations/accounts';
import toast from 'react-hot-toast'; // Assuming you are using this for notifications
import { useDispatch, useSelector } from 'react-redux';

export const Accounts = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    accountNo: '',
    name: '',
    balance: 0.0,
    accountType: '',
  });
  const navigate = useNavigate();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { accountNo, name, accountType } = formData;

    if (!accountNo || !name || !accountType) {
      toast.error('Please fill in all the required fields');
      return;
    }

    dispatch(createAccountService(token, formData, navigate));
  };

  return (
    <div>
      <div className="w-full bg-white shadow-xl p-4 mb-4 rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">Create New Account Here</h1>
      </div>

      <div className="mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-md mb-2" htmlFor="accountNo">
              Account Number
            </label>
            <input
              id="accountNo"
              name="accountNo"
              type="text"
              value={formData.accountNo}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter Account Number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md mb-2" htmlFor="balance">
              Initial Balance
            </label>
            <input
              id="balance"
              name="balance"
              type="number"
              value={formData.balance}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Enter Balance"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-md mb-2" htmlFor="accountType">
              Account Type
            </label>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            >
              <option value="">Select Account Type</option>
              <option value="Savings">Savings</option>
              <option value="Checking">Checking</option>
              <option value="Current">Current</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
