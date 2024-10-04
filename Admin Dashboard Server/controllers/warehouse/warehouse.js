const Warehouse = require("../../models/Warehouse"); // Adjust the path as necessary

// Controller for creating a warehouse without products
exports.createWarehouse = async (req, res) => {
  try {
    const { name, description, location } = req.body;

    // Check if required fields are present
    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: "Name and location are required",
      });
    }

    // Use create() to add a new warehouse directly
    const newWarehouse = await Warehouse.create({
      name,
      description,
      location,
    });

    return res.status(201).json({
      success: true,
      message: "Warehouse created successfully",
      warehouse: newWarehouse,
    });
  } catch (error) {
    console.error("Error while creating warehouse:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the warehouse",
      error: error.message,
    });
  }
};

// Controller for reading all warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    // Fetch all warehouses from the database
    const warehouses = await Warehouse.find().populate('warehouseProducts');

    return res.status(200).json({
      success: true,
      message: "Warehouses retrieved successfully",
      warehouses,
    });
  } catch (error) {
    console.error("Error while fetching warehouses:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching warehouses",
      error: error.message,
    });
  }
};

// Controller for updating a warehouse by ID (ID passed in body)
exports.updateWarehouse = async (req, res) => {
  try {
    const { id, name, description, location } = req.body;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Warehouse ID is required",
      });
    }

    // Find and update the warehouse
    const updatedWarehouse = await Warehouse.findByIdAndUpdate(
      id,
      { name, description, location },
      { new: true, runValidators: true }
    );

    if (!updatedWarehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Warehouse updated successfully",
      warehouse: updatedWarehouse,
    });
  } catch (error) {
    console.error("Error while updating warehouse:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the warehouse",
      error: error.message,
    });
  }
};

// Controller for deleting a warehouse by ID (ID passed in body)
exports.deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Warehouse ID is required",
      });
    }

    // Find and delete the warehouse
    const deletedWarehouse = await Warehouse.findByIdAndDelete(id);

    if (!deletedWarehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Warehouse deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting warehouse:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the warehouse",
      error: error.message,
    });
  }
};
