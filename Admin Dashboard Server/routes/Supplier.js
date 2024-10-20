// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers
const {
  createSupplier,            // Controller to create a supplier (without order list)
  createAddress,             // Controller to create a billing/shipping address
  createAdditionalDetails,   // Controller to create additional details
  createSupplierOrder,
  getAllSuppliers,
  deleteSupplier,
} = require("../controllers/Supplier");

const { auth , isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Supplier Routes
// ********************************************************************************************************
// Route for creating a supplier (without orders)
router.post("/create",createSupplier);

// Route for creating a billing or shipping address
router.post("/address/create",createAddress);

// Route for creating additional details
router.post("/additional-details/create",createAdditionalDetails);

router.post('/create-supplier-order',createSupplierOrder);
// Export the router for use in the main application
router.get('/get-all-suppliers',getAllSuppliers);

router.delete('/delete-supplier',deleteSupplier)
module.exports = router;
