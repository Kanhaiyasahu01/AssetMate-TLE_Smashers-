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
