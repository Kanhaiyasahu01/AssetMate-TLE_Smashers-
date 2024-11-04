import React, { useState, useEffect } from "react";

export const ProductListForm = ({ products, onProductListChange }) => {
  const [productForm, setProductForm] = useState({
    productId: "",
    name: "",
    price: 0,
    priceAtOrder: 0,
    quantity: 1,
    tax: 0,
    discount: 0,
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
    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle selecting a product from the dropdown
  const handleSelectProduct = (productId) => {
    const selectedProduct = products.find((product) => product._id === productId);
    
    const netTax = Math.max(selectedProduct.tax - selectedProduct.discount, 0);
    const totalPrice = calculateTotal(selectedProduct.retailPrice, productForm.quantity || 1, netTax);
    
    setProductForm({
      productId: selectedProduct._id,
      name: selectedProduct.name,
      price: selectedProduct.retailPrice,
      priceAtOrder: totalPrice,
      quantity: productForm.quantity || 1,
      tax: selectedProduct.tax,
      discount: selectedProduct.discount || 0,
    });

    setSearchTerm("");
    setFilteredProducts([]);
  };

  // Calculate total with tax and discount
  const calculateTotal = (price, quantity, netTax) => {
    const totalBeforeTax = price * quantity;
    const totalWithTax = totalBeforeTax + (totalBeforeTax * (netTax / 100));
    return totalWithTax.toFixed(2);
  };

  // Update priceAtOrder when quantity changes
  useEffect(() => {
    if (productForm.productId) {
      const selectedProduct = products.find(product => product._id === productForm.productId);
      const netTax = Math.max(selectedProduct.tax - selectedProduct.discount, 0);
      const updatedPriceAtOrder = calculateTotal(selectedProduct.retailPrice, productForm.quantity, netTax);
      
      setProductForm(prevForm => ({
        ...prevForm,
        priceAtOrder: updatedPriceAtOrder,
      }));
    }
  }, [productForm.quantity, productForm.productId, products]);

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
            total: productForm.priceAtOrder,
        };
        setIsEditing(false);
        setEditIndex(null);
    } else {
        const existingProductIndex = updatedProductTable.findIndex(
            (product) => product.productId === productForm.productId
        );

        if (existingProductIndex > -1) {
            // If the product already exists, update the quantity and total
            const existingProduct = updatedProductTable[existingProductIndex];
            existingProduct.quantity += parseInt(productForm.quantity, 10);
            existingProduct.priceAtOrder = calculateTotal(
                existingProduct.price,
                existingProduct.quantity,
                existingProduct.tax
            );
            updatedProductTable[existingProductIndex] = existingProduct; // Update the existing product
        } else {
            // If it doesn't exist, add a new product
            updatedProductTable.push({
                ...productForm,
                total: productForm.priceAtOrder,
            });
        }
    }

    setProductTable(updatedProductTable);
    onProductListChange(updatedProductTable);

    
    // Reset form
    setProductForm({
        productId: "",
        name: "",
        price: 0,
        priceAtOrder: 0,
        quantity: 1,
        tax: 0,
        discount: 0,
    });
};

  const handleEditProduct = (index) => {
    const productToEdit = productTable[index];
    setProductForm({
      productId: productToEdit.productId,
      name: productToEdit.name,
      price: productToEdit.price,
      priceAtOrder: productToEdit.priceAtOrder,
      quantity: productToEdit.quantity,
      tax: productToEdit.tax,
      discount: productToEdit.discount,
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
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Price (Retail)</th>
            <th className="px-4 py-2 border">Tax</th>
            <th className="px-4 py-2 border">Discount (%)</th>
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
                id="price"
                name="price"
                value={productForm.price}
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
              <input
                type="number"
                id="discount"
                name="discount"
                readOnly
                value={productForm.discount}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </td>

            <td className="px-4 py-2 border">
              {/* Display the calculated total */}
              {productForm.priceAtOrder}
            </td>

            <td className="px-4 py-2 border">
              <button
                type="button"
                onClick={handleAddProduct}
                className={`py-2 px-4 ${isEditing ? "bg-green-600" : "bg-blue-600"} text-white rounded-md hover:${
                  isEditing ? "bg-green-700" : "bg-blue-700"
                }`}
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Render the product table */}
      <h3 className="text-lg font-semibold text-gray-700">Product Table</h3>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border">Product Name</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Price (Retail)</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {productTable.map((product, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{product.name}</td>
              <td className="px-4 py-2 border">{product.quantity}</td>
              <td className="px-4 py-2 border">{product.price}</td>
              <td className="px-4 py-2 border">{product.priceAtOrder}</td>
              <td className="px-4 py-2 border">
                <button
                  type="button"
                  onClick={() => handleEditProduct(index)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 ml-2"
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
