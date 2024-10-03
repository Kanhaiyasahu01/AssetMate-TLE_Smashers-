// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { fetchWarehouses } from '../features/warehouseSlice'; // Fetch warehouses action
// import axios from 'axios';

// export const AddNewProduct = () => {

//   const dispatch = useDispatch();
//   const warehouses = useSelector((state) => state.warehouse.warehouses); // Get warehouse list from store
//   const loading = useSelector((state) => state.warehouse.loading); // Get loading state from store

//   const [productData, setProductData] = useState({
//     warehouseId: '',
//     name: '',
//     code: '',
//     category: '',
//     subCategory: '',
//     retailPrice: '',
//     purchaseOrderPrice: '',
//     stockUnit: '',
//     alertQuantity: '',
//     tax: '',
//     discount: '',
//     measuringUnit: '',
//     description: '',
//     validTo: '',
//   });

//   useEffect(() => {
//     dispatch(fetchWarehousesService()); // Dispatch the thunk to fetch warehouses
//   }, [dispatch]);
//   // Handle input field changes
//   const handleChange = (e) => {
//     setProductData({ ...productData, [e.target.name]: e.target.value });
//   };

//  // Handle form submission
//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   // Implement your product addition logic here
  
// };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           {/* Select Warehouse */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="warehouseId" className="mb-2 text-gray-700 font-medium">Select Warehouse:</label>
//             <select
//               id="warehouseId"
//               name="warehouseId"
//               value={productData.warehouseId}
//               onChange={handleChange}
//               required
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">Select Warehouse</option>
//               {warehouses.map((warehouse) => (
//                 <option key={warehouse._id} value={warehouse._id}>
//                   {warehouse.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Product Name */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="name" className="mb-2 text-gray-700 font-medium">Product Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={productData.name}
//               onChange={handleChange}
//               required
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter product name"
//             />
//           </div>

//           {/* Product Code */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="code" className="mb-2 text-gray-700 font-medium">Product Code</label>
//             <input
//               type="text"
//               id="code"
//               name="code"
//               value={productData.code}
//               onChange={handleChange}
//               required
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter product code"
//             />
//           </div>

//           {/* Category */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="category" className="mb-2 text-gray-700 font-medium">Category</label>
//             <input
//               type="text"
//               id="category"
//               name="category"
//               value={productData.category}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter category"
//             />
//           </div>

//           {/* Subcategory */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="subCategory" className="mb-2 text-gray-700 font-medium">Subcategory</label>
//             <input
//               type="text"
//               id="subCategory"
//               name="subCategory"
//               value={productData.subCategory}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter subcategory"
//             />
//           </div>

//           {/* Retail Price */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="retailPrice" className="mb-2 text-gray-700 font-medium">Retail Price</label>
//             <input
//               type="number"
//               id="retailPrice"
//               name="retailPrice"
//               value={productData.retailPrice}
//               onChange={handleChange}
//               required
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter retail price"
//             />
//           </div>

//           {/* Purchase Order Price */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="purchaseOrderPrice" className="mb-2 text-gray-700 font-medium">Purchase Order Price</label>
//             <input
//               type="number"
//               id="purchaseOrderPrice"
//               name="purchaseOrderPrice"
//               value={productData.purchaseOrderPrice}
//               onChange={handleChange}
//               required
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter purchase order price"
//             />
//           </div>

//           {/* Stock Unit */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="stockUnit" className="mb-2 text-gray-700 font-medium">Stock Unit</label>
//             <input
//               type="number"
//               id="stockUnit"
//               name="stockUnit"
//               value={productData.stockUnit}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter stock unit"
//             />
//           </div>

//           {/* Alert Quantity */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="alertQuantity" className="mb-2 text-gray-700 font-medium">Alert Quantity</label>
//             <input
//               type="number"
//               id="alertQuantity"
//               name="alertQuantity"
//               value={productData.alertQuantity}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter alert quantity"
//             />
//           </div>

//           {/* Tax */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="tax" className="mb-2 text-gray-700 font-medium">Tax (%)</label>
//             <input
//               type="number"
//               id="tax"
//               name="tax"
//               value={productData.tax}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter tax percentage"
//             />
//           </div>

//           {/* Discount */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="discount" className="mb-2 text-gray-700 font-medium">Discount (%)</label>
//             <input
//               type="number"
//               id="discount"
//               name="discount"
//               value={productData.discount}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter discount percentage"
//             />
//           </div>

//           {/* Measuring Unit */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="measuringUnit" className="mb-2 text-gray-700 font-medium">Measuring Unit</label>
//             <input
//               type="text"
//               id="measuringUnit"
//               name="measuringUnit"
//               value={productData.measuringUnit}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter measuring unit"
//             />
//           </div>

//           {/* Description */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="description" className="mb-2 text-gray-700 font-medium">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={productData.description}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter product description"
//             />
//           </div>

//           {/* Valid To */}
//           <div className="form-group flex flex-col">
//             <label htmlFor="validTo" className="mb-2 text-gray-700 font-medium">Valid To</label>
//             <input
//               type="date"
//               id="validTo"
//               name="validTo"
//               value={productData.validTo}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };



