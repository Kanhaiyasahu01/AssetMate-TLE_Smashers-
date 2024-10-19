import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWarehousesService } from '../services/operations/warehouse';
// import { deleteProduct } from '../services/operations/product'; // Import your deleteProduct service
import { ConfirmationModal } from '../components/common/ConfirmationModel';
import { deleteProduct } from '../services/operations/warehouse';
export const ManageNewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { warehouses } = useSelector((state) => state.warehouse);
  
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  useEffect(() => {
    if (warehouses.length === 0) {
      dispatch(fetchWarehousesService(token));
    }
  }, [warehouses, dispatch, token]);

  const handleWarehouseChange = (e) => {
    const warehouseId = e.target.value;
    setSelectedWarehouse(warehouseId);
    const selectedWarehouseData = warehouses.find(warehouse => warehouse._id === warehouseId);
    setProducts(selectedWarehouseData ? selectedWarehouseData.warehouseProducts : []);
  };

  const openConfirmationModal = (productId) => {
    setProductIdToDelete(productId);
    setIsModalOpen(true);
  };
  
  const handleDeleteProduct = async () => {
    if (productIdToDelete) {
      try {
        // Dispatch delete product action
        await dispatch(deleteProduct(productIdToDelete, token, selectedWarehouse));
  
        // Update the local state to reflect the product deletion
        setProducts((prevProducts) => 
          prevProducts.filter(product => product._id !== productIdToDelete)
        );
  
        // Close the modal after deletion
        setIsModalOpen(false);
      } catch (error) {
        console.error('Failed to delete product:', error);
        // Optionally handle error state here, e.g., showing an error message
        setIsModalOpen(false); // Close the modal on error
      }
    }
  };
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 w-full border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      
      <div className="flex flex-row gap-3 mb-4">
        <select
          value={selectedWarehouse}
          onChange={handleWarehouseChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a warehouse</option>
          {warehouses.map(warehouse => (
            <option key={warehouse._id} value={warehouse._id}>
              {warehouse.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Retail Price</th>
            <th className="border border-gray-300 px-4 py-2">Stock Unit</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <tr key={product._id}>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{product.retailPrice}</td>
                <td className="border border-gray-300 px-4 py-2">{product.stockUnit}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => navigate(`/stock/update-product/${product._id}`, { state: { product, warehouseId: selectedWarehouse } })}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => openConfirmationModal(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">No products found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product?"
        onConfirm={handleDeleteProduct}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
