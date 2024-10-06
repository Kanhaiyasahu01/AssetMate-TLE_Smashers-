import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWarehousesService } from '../services/operations/warehouse'; // Import your fetch service
import { useNavigate } from 'react-router-dom';

export const ManageWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { warehouses, loading } = useSelector((state) => state.warehouse);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch all warehouses when the component mounts
    if(warehouses.length === 0)
     {
      dispatch(fetchWarehousesService(token));
     }

  }, [dispatch, token]);

  const handleEdit = (warehouseId) => {
    // Navigate to edit page (you can define your own route and logic)
    // navigate(`/edit-warehouse/${warehouseId}`);
    console.log("Later you will be able to edit")
  };

  const handleDelete = (warehouseId) => {
    // Add your delete logic here (e.g., dispatching a delete action)
    console.log('Deleting warehouse with ID:', warehouseId);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Warehouses</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Warehouse Name</th>
              <th className="border px-4 py-2 text-left">Total Products</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses && warehouses.length > 0 ? (
              warehouses.map((warehouse, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{warehouse.name}</td>
                  <td className="border px-4 py-2">{warehouse.totalProducts || 0}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                      onClick={() => handleEdit(warehouse.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleDelete(warehouse.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No warehouses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
