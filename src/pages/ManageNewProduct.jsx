import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWarehousesService } from '../services/operations/warehouse';
// get the list of warehouse, 
// show a list of warehouse in the dropdown menu
// after selecting warehouse ,get its all product list and show it in tables,
// also give search feature for various products 
// also give update and delete product feature for it, in update create another route where retialPrice , etc will get updated. 
// and in delete product will get deleted.
export const ManageNewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { warehouses } = useSelector((state) => state.warehouse);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [products,setProducts] = useState([]);

  useEffect(() => {
    if (warehouses.length === 0) {
      dispatch(fetchWarehousesService(token));
    }
  }, [warehouses, dispatch, token]);

  // const handleWarehouseChange = (e) => {
  //   const warehouseId = e.target.value;
  //   setSelectedWarehouse(warehouseId);
  //   dispatch(fetchProductsByWarehouse(warehouseId, token)); // Fetch products by selected warehouse
  // };

  // const filteredProducts = products.filter(product =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
          {warehouses?.products.map(product => (
            <tr key={product._id}>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.retailPrice}</td>
              <td className="border border-gray-300 px-4 py-2">{product.stockUnit}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => navigate(`/update-product/${product._id}`)} // Navigate to update product route
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// "retailPrice": 100,
// "purchaseOrderPrice": 30,
// "stockUnit": 50,
// "alertQuantity": 5,
// "tax": 4,
// "discount": 2,