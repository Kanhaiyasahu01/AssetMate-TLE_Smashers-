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
    return <div>Loading order details...</div>; // Show loading state
  }

  const { supplier, warehouse, productList, totalTax, totalDiscount, shipping, grandTotal } = orderDetails;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      
      {/* Supplier and Warehouse Info */}
      <div className="mb-6 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-xl font-semibold">Supplier Information</h2>
        <p>Name: {supplier?.billingAddress?.company}</p>
        <p>Email: {supplier?.billingAddress?.email}</p>
        <p>Address: {supplier?.billingAddress?.address}</p>
        
        <h2 className="text-xl font-semibold mt-4">Warehouse Information</h2>
        <p>Name: {warehouse?.name}</p>
        <p>Location: {warehouse?.location}</p>
      </div>

      {/* Product List Table */}
      <h2 className="text-xl font-semibold mb-2">Product List</h2>
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

      {/* Summary of Order */}
      <div className="mt-6 p-4 border border-gray-300 rounded-lg">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <p>Total Tax: {totalTax.toFixed(2)}</p>
        <p>Total Discount: {totalDiscount.toFixed(2)}</p>
        <p>Shipping: {shipping.toFixed(2)}</p>
        <p className="font-bold">Grand Total: {grandTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};
