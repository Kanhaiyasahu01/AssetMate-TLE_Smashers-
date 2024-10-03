import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // To dispatch actions
import { useNavigate } from 'react-router-dom'; // For navigation
import { addWarehouseService } from '../services/operations/warehouse'; // Import service for adding warehouse
import { useSelector } from 'react-redux';
export const AddWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate
  const { token } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
  });

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the addWarehouseService, passing the form data and navigate function
    dispatch(addWarehouseService(formData, navigate,token));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Warehouse</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Warehouse Name */}
          <div className="form-group flex flex-col">
            <label htmlFor="name" className="mb-2 text-gray-700 font-medium">Warehouse Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter warehouse name"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group flex flex-col">
            <label htmlFor="description" className="mb-2 text-gray-700 font-medium">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter warehouse description"
            />
          </div>

          {/* Location */}
          <div className="form-group flex flex-col">
            <label htmlFor="location" className="mb-2 text-gray-700 font-medium">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter warehouse location"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Warehouse
          </button>
        </form>
      </div>
    </div>
  );
};
