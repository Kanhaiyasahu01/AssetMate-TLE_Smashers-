const Product = require('../models/Product'); // Assuming your product schema is in models/Product.js
const Warehouse = require('../models/Warehouse'); // Assuming your warehouse schema is in models/Warehouse.js

// Controller function to add a new product to the warehouse
exports.addProductToWarehouse = async (req, res) => {
  try {
    const {
      warehouseId, // Get warehouse ID from the request body
      name,
      code,
      category,
      subCategory,
      retailPrice,
      purchaseOrderPrice,
      stockUnit,
      alertQuantity,
      tax, // Tax in percentage (stored for later use in order calculations)
      discount, // Discount in percentage (stored for later use in order calculations)
      measuringUnit,
      description,
      validTo,
    } = req.body;

    // Check if required fields are provided
    if (!warehouseId || !name || !retailPrice || !purchaseOrderPrice) {
      return res.status(400).json({
        success: false,
        message: 'Warehouse ID, product name, retail price, and purchase order price are required',
      });
    }

    // Create the new product in the database
    const newProduct = await Product.create({
      name,
      code,
      category,
      subCategory,
      retailPrice,
      purchaseOrderPrice,
      stockUnit,
      alertQuantity,
      tax, // Store the tax percentage
      discount, // Store the discount percentage
      measuringUnit,
      description,
      validTo,
    });

    // Step to update the warehouse document with the new product's ID
    await Warehouse.findByIdAndUpdate(
      warehouseId,
      { $push: { warehouseProducts: newProduct._id } }, // Push the new product ID to the warehouseProducts array
      { new: true } // Return the updated warehouse document
    );

    // Respond with success and the created product
    return res.status(201).json({
      success: true,
      message: 'Product added successfully to the warehouse',
      product: newProduct,
    });
  } catch (error) {
    console.error('Error adding product to warehouse:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while adding the product to the warehouse',
      error: error.message,
    });
  }
};


// update products with some data
exports.updateProducts = async (req, res) => {
  try {
    const { id, retailPrice, purchaseOrderPrice, stockUnit, alertQuantity, tax, discount } = req.body;
    
    // Find the existing product by ID
    const existingProduct = await Product.findById(id);

    // Check if the product exists
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product does not exist",
      });
    }

    // Update the product details
    existingProduct.retailPrice = retailPrice;
    existingProduct.purchaseOrderPrice = purchaseOrderPrice;
    existingProduct.stockUnit = stockUnit;
    existingProduct.alertQuantity = alertQuantity;
    existingProduct.tax = tax;
    existingProduct.discount = discount;

    // Save the updated product
    await existingProduct.save();

    // Respond with success

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: existingProduct, // Return the updated product details
    });

  } catch (err) {
    // Handle any unexpected errors
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { productId, warehouseId } = req.body; // Destructure productId and warehouseId from the request body

    // Ensure that both IDs are provided
    if (!productId || !warehouseId) {
      return res.status(400).json({ message: "Product ID and Warehouse ID are required." });
    }

    // Delete product from the Product database
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(400).json({
        success: false,
        message: "Unable to delete product",
      });
    }

    // Remove the productId from the warehouse's warehouseProducts array
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(
      warehouseId,
      { $pull: { warehouseProducts: { _id: productId } } }, // Ensure to pull the correct product by its ID
      { new: true } // Return the updated warehouse document
    );


    if (!updatedWarehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found.",
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Product deleted successfully.", 
      deletedProduct ,
      updatedWarehouse,
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).json({success:false, message: "Internal server error." });
  }
};