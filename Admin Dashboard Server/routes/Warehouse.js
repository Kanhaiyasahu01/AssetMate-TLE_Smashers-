// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers
const {
  createWarehouse,
  getAllWarehouses,
  updateWarehouse,
  deleteWarehouse,
} = require("../controllers/warehouse/warehouse");

const {
  addProductToWarehouse
} = require("../controllers/Product");

const { auth , isAdmin } = require("../middlewares/auth")


// ********************************************************************************************************
//                                      Warehouse Routes
// ********************************************************************************************************
// Route for creating a warehouse (without products)
router.post("/create",createWarehouse);

// Route for getting all warehouses
router.get("/all", getAllWarehouses);

// Route for updating a warehouse (ID passed in the body)
router.put("/update",updateWarehouse);

// Route for deleting a warehouse (ID passed in the body)
router.delete("/delete",deleteWarehouse);


router.post("/add-product",addProductToWarehouse);
// Export the router for use in the main application
module.exports = router;
