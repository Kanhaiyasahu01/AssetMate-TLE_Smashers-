import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductListForm } from "./common/OrderForm/ProductListForm";
import { fetchSuppliersService } from "../services/operations/supplier";
import { fetchWarehousesService } from "../services/operations/warehouse";

export const SupplierOrderForm = ({ formData, setFormData, onSubmit }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { suppliers } = useSelector((state) => state.supplier);
  const { warehouses } = useSelector((state) => state.warehouse);
  const [warehouseProducts, setWarehouseProducts] = useState([]);

  useEffect(() => {
    if (warehouses.length === 0) {
      dispatch(fetchWarehousesService(token));
    }
    if (suppliers.length === 0) {
      dispatch(fetchSuppliersService(token));
    }
  }, [dispatch, token, warehouses.length, suppliers.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
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
    onSubmit();
  };

  return (
    <div className="bg-white p-6 rounded-sm shadow-md">
      <form onSubmit={handleFormSubmit} className="space-y-8">
        {/* Supplier and Warehouse Selection, and Order Details side by side */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section: Supplier and Warehouse */}
          <div className="bg-white p-4 rounded-lg shadow-md shadow-richblack-100 flex-1">
            <h2 className="text-xl font-semibold mb-4">Supplier and Warehouse</h2>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label htmlFor="supplier" className="block font-medium text-gray-700">
                  Bill to Supplier
                </label>
                <select
                  name="supplier"
                  id="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Supplier</option>
                  {suppliers &&
                    suppliers.map((sp) => (
                      <option key={sp._id} value={sp._id} className="text-black">
                        {sp.billingAddress.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="warehouse" className="block font-medium text-gray-700">
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
          </div>

          {/* Right Section: Order Details */}
          <div className="bg-white p-4 rounded-lg shadow-md shadow-richblack-100 flex-1">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="mt-4">
              <label htmlFor="reference" className="block font-medium text-gray-700">
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
                  <label htmlFor="orderDate" className="block font-medium text-gray-700">
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
                  <label htmlFor="orderDueDate" className="block font-medium text-gray-700">
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
        </div>

        {/* Product List */}
        <div className="bg-white p-4 rounded-lg shadow-md shadow-richblack-100 mt-8">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <ProductListForm
            warehouseId={formData.warehouse}
            products={warehouseProducts?.warehouseProducts}
            onProductListChange={handleProductListChange}
          />
        </div>

        {/* Summary */}
        <div className="bg-white p-4 rounded-lg shadow-md shadow-richblack-100 mt-8">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label htmlFor="totalTax" className="block font-medium text-gray-700">
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
              <label htmlFor="totalDiscount" className="block font-medium text-gray-700">
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
              <label htmlFor="shipping" className="block font-medium text-gray-700">
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
            <label htmlFor="grandTotal" className="block font-medium text-gray-700">
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
            <label htmlFor="paymentOfTerms" className="block font-medium text-gray-700">
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
        </div>

        {/* Update Stock Checkbox */}
        <div className="mt-8">
          <label htmlFor="isUpdateRequired" className="block font-medium text-gray-700">
            Update Quantity in Stock?
          </label>
          <input
            type="checkbox"
            id="isUpdateRequired"
            name="isUpdateRequired"
            checked={formData.isUpdateRequired}
            onChange={handleCheckboxChange}
            className="mt-2"
          />{" "}
          <span className="text-gray-700">Check this box if you want to update the stock</span>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Supplier Order
          </button>
        </div>
      </form>
    </div>
  );
};
