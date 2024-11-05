import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductListForm } from "./ProductListForm";
import { fetchClientsService } from "../../../services/operations/client";
import { fetchWarehousesService } from "../../../services/operations/warehouse";
import { getMarketingUsersService } from "../../../services/operations/marketing";


export const OrderForm = ({ formData, setFormData, onSubmit }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { clients } = useSelector((state) => state.client);
  const { warehouses } = useSelector((state) => state.warehouse);
  const [warehouseProducts, setWarehouseProducts] = useState([]);

  const {marketingUsers} = useSelector(state => state.marketing);
  const [marketingUser, setMarketingUser] = useState('');

  useEffect(() => {
    if (warehouses.length === 0) {
      dispatch(fetchWarehousesService(token));
    }
    if (clients.length === 0) {
      dispatch(fetchClientsService(token));
    }

    if(marketingUsers.length === 0){
      dispatch(getMarketingUsersService(token));
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
    const calculateGrandTotal = () => {
      const grandTotal = formData.productList.reduce((total, product) => {
        return total + parseFloat(product.priceAtOrder || 0);
      }, 0);
      setFormData((prevData) => ({ ...prevData, grandTotal: grandTotal.toFixed(2) }));
    };

    if (formData.productList) {
      calculateGrandTotal();
    }
  }, [formData.productList, setFormData]);


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
    console.log("marketing user",marketingUser)
    onSubmit(marketingUser);
  };

  const handleMarketingUserInput = (e) => {
    setMarketingUser(e.target.value);
  };



  return (
    <div className="bg-white p-6 rounded-sm shadow-md">
      <form onSubmit={handleFormSubmit} className="space-y-8">
        {/* Client and Warehouse Selection, and Invoice Details side by side */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section: Client and Warehouse */}
          <div className="bg-white p-4 rounded-lg shadow-md shadow-richblack-100 flex-1">
            <h2 className="text-xl font-semibold mb-4">Client and Warehouse</h2>
            <div className="grid grid-cols-1 gap-8">
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
          </div>

          {/* Right Section: Invoice Details */}
          <div className="bg-white p-4 rounded-lg shadow-md shadow-richblack-100 flex-1">
            <h2 className="text-xl font-semibold mb-4">Dispatch Details</h2>
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
                <option value="CASH">CASH</option>
                <option value="CREDIT">CREDIT</option>
              </select>
          </div>
        </div>

        <div className="mt-8">
        <label
              htmlFor="marketingUsers"
              className="block font-medium text-gray-700"
            >
              Select Marketing Employee
            </label>
            <select
                name="marketingUsers"
                id="marketingUsers"
                value={marketingUser}
                onChange={handleMarketingUserInput}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Choose employee
                </option>
                {marketingUsers.map((SingleMarketingUser, index) => (
                  <option value={SingleMarketingUser._id} key={index}>
                    {SingleMarketingUser.name}
                  </option>
                ))}
              </select>

        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};
