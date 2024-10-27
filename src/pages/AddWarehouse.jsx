import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addWarehouseService } from '../services/operations/warehouse';

export const AddWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { warehouses } = useSelector((state) => state.warehouse);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addWarehouseService(formData, navigate, token, warehouses));
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Heading Card */}
      <div className="w-full bg-white shadow-2xl shadow-richblack-100 p-6 mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Add your warehouse</h1>
        <p className="text-gray-600 text-center">
          Add a new warehouse to the system by filling out the details below.
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full bg-white shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          <span className="text-blue-600">Add </span>
          <span className="text-blue-600">Warehouse</span>
          <hr />
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Warehouse Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-gray-700 font-medium">Warehouse Name <span className='text-red-200 text-lg'>*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Main Warehouse"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2 text-gray-700 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="This is the main warehouse"
              rows="3"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label htmlFor="location" className="mb-2 text-gray-700 font-medium">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Bilaspur chhattisgarh"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
          >
            Add Warehouse
          </button>
        </form>
      </div>
    </div>
  );
};
