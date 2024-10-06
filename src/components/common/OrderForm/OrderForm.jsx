import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductListForm } from "./ProductListForm";
import { fetchClientsService } from "../../../services/operations/client";
import { fetchWarehousesService } from "../../../services/operations/warehouse";

export const OrderForm = ({ formData, setFormData, onSubmit }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { clients } = useSelector((state) => state.client);
  const { warehouses } = useSelector((state) => state.warehouse);
  const [warehouseProducts, setWarehouseProducts] = useState([]);

  useEffect(() => {
    if (warehouses.length === 0) {
      dispatch(fetchWarehousesService(token));
    }
    if (clients.length === 0) {
      dispatch(fetchClientsService(token));
    }
  }, [dispatch, token, warehouses.length, clients.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProductListChange = (newProductList) => {
    setFormData({
      ...formData,
      productList: newProductList,
    });
  };

  useEffect(() => {
    if (formData.warehouse) {
      const selectedWarehouse = warehouses.find(
        (warehouse) => warehouse._id === formData.warehouse
      );
      if (selectedWarehouse) {
        setWarehouseProducts(selectedWarehouse);
      }
    }
  }, [formData.warehouse, warehouses]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Call the submitHandler passed from the parent component (Quotation)
  };

  return (
    <div className="p-8 bg-gray-100 rounded-md shadow-lg">
      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="client" className="block font-medium text-gray-700">
              Bill to
            </label>
            <select
              name="client"
              id="client"
              value={formData.client}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Client</option>
              {clients &&
                clients.map((cl) => (
                  <option key={cl._id} value={cl._id} className="text-black">
                    {cl.billingAddress.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="warehouse"
              className="block font-medium text-gray-700"
            >
              Select Warehouse
            </label>
            <select
              name="warehouse"
              id="warehouse"
              value={formData.warehouse}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Warehouse</option>
              {warehouses &&
                warehouses.map((wh) => (
                  <option key={wh._id} value={wh._id}>
                    {wh.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Invoice Details */}
        <div>
          <p className="text-lg font-semibold text-gray-800">Invoice Details</p>
          <div className="mt-4">
            <label
              htmlFor="reference"
              className="block font-medium text-gray-700"
            >
              Reference
            </label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="orderDate"
                  className="block font-medium text-gray-700"
                >
                  Order Date
                </label>
                <input
                  type="date"
                  id="orderDate"
                  name="orderDate"
                  value={formData.orderDate}
                  onChange={handleInputChange}
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="orderDueDate"
                  className="block font-medium text-gray-700"
                >
                  Order Due Date
                </label>
                <input
                  type="date"
                  id="orderDueDate"
                  name="orderDueDate"
                  value={formData.orderDueDate}
                  onChange={handleInputChange}
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-8">
          <ProductListForm
            warehouseId={formData.warehouse}
            products={warehouseProducts?.warehouseProducts}
            onProductListChange={handleProductListChange}
          />
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <label
              htmlFor="totalTax"
              className="block font-medium text-gray-700"
            >
              Total Tax
            </label>
            <input
              type="number"
              id="totalTax"
              name="totalTax"
              value={formData.totalTax}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="totalDiscount"
              className="block font-medium text-gray-700"
            >
              Total Discount
            </label>
            <input
              type="number"
              id="totalDiscount"
              name="totalDiscount"
              value={formData.totalDiscount}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="shipping"
              className="block font-medium text-gray-700"
            >
              Shipping Charge
            </label>
            <input
              type="number"
              id="shipping"
              name="shipping"
              value={formData.shipping}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Grand Total */}
        <div className="mt-8">
          <label
            htmlFor="grandTotal"
            className="block font-medium text-gray-700"
          >
            Grand Total
          </label>
          <input
            type="number"
            id="grandTotal"
            name="grandTotal"
            value={formData.grandTotal}
            onChange={handleInputChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Payment Terms */}
        <div className="mt-8">
          <label
            htmlFor="paymentOfTerms"
            className="block font-medium text-gray-700"
          >
            Payment Terms
          </label>
          <select
            name="paymentOfTerms"
            id="paymentOfTerms"
            value={formData.paymentOfTerms}
            onChange={handleInputChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="CASH">Cash</option>
            <option value="CARD">Card</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
          </select>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};
