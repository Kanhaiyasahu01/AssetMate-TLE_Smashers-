import React, { useState } from 'react';

export const AddNewProduct = () => {
  const [formData, setFormData] = useState({
    warehouseId: '',
    name: '',
    code: '',
    category: '',
    subCategory: '',
    retailPrice: '',
    purchaseOrderPrice: '',
    stockUnit: '',
    alertQuantity: '',
    tax: '',
    discount: '',
    measuringUnit: '',
    description: '',
    validTo: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit form data
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product to Warehouse</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
     
        <div className=" flex flex-row justify-between items-center">
          
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Product Code */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="code">Product Code</label>
            <input
              type="text"
              name="code"
              id="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    </div>

<div className=" flex flex-row justify-between items-center">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="subCategory">Subcategory</label>
            <input
              type="text"
              name="subCategory"
              id="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
</div>

        <div className='flex flex-col justify-between'>
             {/* Warehouse ID */}
            <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="warehouseId">Warehouse ID</label>
                    <input
                    type="text"
                    name="warehouseId"
                    id="warehouseId"
                    value={formData.warehouseId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                    />
            </div>

            {/* Retail Price */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="retailPrice">Retail Price</label>
                    <input
                    type="number"
                    name="retailPrice"
                    id="retailPrice"
                    value={formData.retailPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                    />
                </div>

             {/* Purchase Order Price */}
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="purchaseOrderPrice">Purchase Order Price</label>
                    <input
                    type="number"
                    name="purchaseOrderPrice"
                    id="purchaseOrderPrice"
                    value={formData.purchaseOrderPrice}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                    />
                </div>

        </div>
          
        <div className='flex flex-row justify-between items-center'>
          {/* Stock Unit */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="stockUnit">Stock Unit</label>
                <input
                type="text"
                name="stockUnit"
                id="stockUnit"
                value={formData.stockUnit}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>

          {/* Alert Quantity */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="alertQuantity">Alert Quantity</label>
                <input
                type="number"
                name="alertQuantity"
                id="alertQuantity"
                value={formData.alertQuantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>
        </div>

    <div className='flex flex-row justify-between items-center'>
          {/* Tax */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="tax">Tax (%)</label>
            <input
              type="number"
              name="tax"
              id="tax"
              value={formData.tax}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="discount">Discount (%)</label>
            <input
              type="number"
              name="discount"
              id="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    </div>

    <div className='flex flex-col justify-between'>
          {/* Measuring Unit */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="measuringUnit">Measuring Unit</label>
            <input
              type="text"
              name="measuringUnit"
              id="measuringUnit"
              value={formData.measuringUnit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Valid To */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="validTo">Valid To</label>
            <input
              type="date"
              name="validTo"
              id="validTo"
              value={formData.validTo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
    </div>
    

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};
