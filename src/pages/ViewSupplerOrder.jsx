import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../services/operations/supplier';

export const ViewSupplierOrder = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    dispatch(fetchOrderById(token, orderId, setOrderDetails));
  }, [dispatch, token, orderId]);

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  const { supplier, warehouse, productList, totalTax, totalDiscount, shipping, grandTotal } = orderDetails;

  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      {/* Supplier and Warehouse Info Card */}
      <div className="bg-white shadow-md p-6 rounded-lg w-full flex justify-between items-stretch space-x-4">
  {/* Supplier Information Card */}
  <div className="flex-1 bg-gray-100 shadow-inner shadow-richblack-100 p-4 rounded-md h-full min-h-[200px]">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">Supplier Information</h2>
    <p className="mb-2 text-gray-600"><strong>Name:</strong> {supplier?.billingAddress?.company || 'N/A'}</p>
    <p className="mb-2 text-gray-600"><strong>Email:</strong> {supplier?.billingAddress?.email || 'N/A'}</p>
    <p className="mb-2 text-gray-600"><strong>Address:</strong> {supplier?.billingAddress?.address || 'N/A'}</p>
  </div>
  
  {/* Warehouse Information Card */}
  <div className="flex-1 bg-gray-100 shadow-inner shadow-richblack-100 p-4 rounded-md h-full min-h-[200px]">
    <h2 className="text-xl font-semibold mb-4 text-gray-700">Warehouse Information</h2>
    <p className="mb-2 text-gray-600"><strong>Name:</strong> {warehouse?.name || 'N/A'}</p>
    <p className="mb-2 text-gray-600"><strong>Location:</strong> {warehouse?.location || 'N/A'}</p>
  </div>
</div>




      {/* Product List Card */}
      <div className="bg-white shadow-md p-6 rounded-lg col-span-1 md:col-span-2 lg:col-span-3">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border-b-2 border-gray-300 p-2 text-left">Product Name</th>
                <th className="border-b-2 border-gray-300 p-2 text-left">Quantity</th>
                <th className="border-b-2 border-gray-300 p-2 text-left">Discount</th>
                <th className="border-b-2 border-gray-300 p-2 text-left">Price at Order</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b p-2">{item.product?.name || 'N/A'}</td>
                  <td className="border-b p-2">{item.quantity}</td>
                  <td className="border-b p-2">{item.product.discount}</td>
                  <td className="border-b p-2">{item.priceAtOrder.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary of Order Card */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
       
        <p className="font-bold text-lg mt-4"><strong>Grand Total:</strong> {grandTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};
