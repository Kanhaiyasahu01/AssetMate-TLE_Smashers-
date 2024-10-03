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
router.post("/create", auth,isAdmin,createWarehouse);

// Route for getting all warehouses
router.get("/all",auth,isAdmin, getAllWarehouses);

// Route for updating a warehouse (ID passed in the body)
router.put("/update", auth,isAdmin,updateWarehouse);

// Route for deleting a warehouse (ID passed in the body)
router.delete("/delete", auth,isAdmin,deleteWarehouse);


router.post("/add-product",auth,isAdmin,addProductToWarehouse);
// Export the router for use in the main application
module.exports = router;
