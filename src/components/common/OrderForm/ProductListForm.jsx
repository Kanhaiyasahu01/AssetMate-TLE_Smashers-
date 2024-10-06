import React, { useState, useEffect } from "react";

export const ProductListForm = ({ products, onProductListChange }) => {
  const [productForm, setProductForm] = useState({
    productId: "",
    name: "",
    priceAtOrder: 0,
    quantity: 1,
    tax: 0,
  });
  const [productTable, setProductTable] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  // Handle input changes for product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  // Handle selecting a product from the dropdown
  const handleSelectProduct = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
    setProductForm({
      productId: selectedProduct._id,
      name: selectedProduct.name,
      priceAtOrder: selectedProduct.retailPrice,
      quantity: productForm.quantity || 1,
      tax: (selectedProduct.retailPrice * 0.05).toFixed(2),
    });

    setSearchTerm("");
    setFilteredProducts([]);
  };

  // Add product to table
  const handleAddProduct = () => {
    if (!productForm.productId) {
      alert("Please select a product");
      return;
    }

    let updatedProductTable = [...productTable];

    if (isEditing) {
      updatedProductTable[editIndex] = {
        ...productForm,
        total: productForm.quantity * productForm.priceAtOrder,
      };
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const existingProductIndex = updatedProductTable.findIndex(
        (product) => product.productId === productForm.productId
      );

      if (existingProductIndex > -1) {
        updatedProductTable[existingProductIndex].quantity += parseInt(productForm.quantity, 10);
        updatedProductTable[existingProductIndex].total =
          updatedProductTable[existingProductIndex].quantity *
          updatedProductTable[existingProductIndex].priceAtOrder;
      } else {
        updatedProductTable.push({
          ...productForm,
          total: productForm.quantity * productForm.priceAtOrder,
        });
      }
    }

    setProductTable(updatedProductTable);
    onProductListChange(updatedProductTable);

    setProductForm({
      productId: "",
      name: "",
      priceAtOrder: 0,
      quantity: 1,
      tax: 0,
    });
  };

  const handleEditProduct = (index) => {
    const productToEdit = productTable[index];
    setProductForm({
      productId: productToEdit.productId,
      name: productToEdit.name,
      priceAtOrder: productToEdit.priceAtOrder,
      quantity: productToEdit.quantity,
      tax: productToEdit.tax,
    });
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProductTable = productTable.filter((_, i) => i !== index);
    setProductTable(updatedProductTable);
    onProductListChange(updatedProductTable);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">
        {isEditing ? "Edit Product" : "Add Products"}
      </h3>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Price at Order</th>
            <th className="px-4 py-2 border">Tax</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">
              <input
                type="text"
                id="search"
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Search Product..."
              />
              {searchTerm && filteredProducts.length > 0 && (
                <div className="border border-gray-300 mt-1 rounded-md shadow-lg">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleSelectProduct(product._id)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
            </td>

            <td className="px-4 py-2 border">
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={productForm.quantity}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </td>

            <td className="px-4 py-2 border">
              <input
                type="number"
                id="priceAtOrder"
                name="priceAtOrder"
                value={productForm.priceAtOrder}
                readOnly
                className="block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md"
              />
            </td>

            <td className="px-4 py-2 border">
              <input
                type="number"
                id="tax"
                name="tax"
                value={productForm.tax}
                readOnly
                className="block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-md"
              />
            </td>

            <td className="px-4 py-2 border">
              {(productForm.priceAtOrder * productForm.quantity).toFixed(2)}
            </td>

            <td className="px-4 py-2 border">
              <button
                type="button"  // Change button type to 'button' to prevent form submission
                onClick={handleAddProduct}
                className={`py-2 px-4 ${isEditing ? "bg-green-600" : "bg-blue-600"} text-white rounded-md hover:${
                  isEditing ? "bg-green-700" : "bg-blue-700"
                }`}
              >
                {isEditing ? "Save" : "Add"}
              </button>
            </td>
          </tr>

          {productTable.length > 0 &&
            productTable.map((product, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.quantity}</td>
                <td className="px-4 py-2 border">{product.priceAtOrder}</td>
                <td className="px-4 py-2 border">{product.tax}</td>
                <td className="px-4 py-2 border">
                  {(product.priceAtOrder * product.quantity).toFixed(2)}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEditProduct(index)}
                    className="py-1 px-3 mr-2 bg-yellow-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(index)}
                    className="py-1 px-3 bg-red-600 text-white rounded-md"
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
};
