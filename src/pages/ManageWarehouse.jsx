import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWarehouseService, fetchWarehousesService } from '../services/operations/warehouse';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../components/common/ConfirmationModel';
import { WarehouseForm } from '../components/WarehouseForm';

export const ManageWarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { warehouses, loading } = useSelector((state) => state.warehouse);
  const { token } = useSelector((state) => state.auth);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState(null);

  useEffect(() => {
    if (warehouses.length === 0) {
      dispatch(fetchWarehousesService(token));
    }
    console.log("warehouse",warehouses)
  }, [dispatch, token]);

  const handleEdit = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (warehouseId) => {
    setWarehouseToDelete(warehouseId);
    console.log(warehouseToDelete);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteWarehouseService(token,warehouseToDelete));
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Warehouses</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
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
                    <td className="border px-4 py-2">{warehouse?.warehouseProducts?.length || 0}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
                        onClick={() => handleEdit(warehouse)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-400 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleDeleteClick(warehouse._id)}
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

          {/* Form for Adding or Editing Warehouse */}
          {isFormOpen && (
            <WarehouseForm
              warehouse={selectedWarehouse}
              onSave={() => setIsFormOpen(false)}
              onCancel={() => setIsFormOpen(false)}
            />
          )}

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={isModalOpen}
            title="Confirm Deletion"
            message="Are you sure you want to delete this warehouse?"
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};
