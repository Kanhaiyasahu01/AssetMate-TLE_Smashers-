import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWarehouse, updateWarehouse } from '../slice/warehouse';
import { updateWarehouseService } from '../services/operations/warehouse';

export const WarehouseForm = ({ warehouse, onSave, onCancel }) => {
  const [name, setName] = useState(warehouse ? warehouse.name : '');
  const [description, setDescription] = useState(warehouse ? warehouse.description : '');
  const [location, setLocation] = useState(warehouse ? warehouse.location : '');
  const {token} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedWarehouse = {
      id: warehouse?._id,
      name,
      description,
      location,
    };

    dispatch(updateWarehouseService(token,updatedWarehouse));
    

    onSave(); // callback after saving
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit}>
        {/* Warehouse Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Warehouse Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Warehouse Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Warehouse Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Warehouse Location */}
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 bg-gray-300 hover:bg-gray-400 text-black py-1 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
