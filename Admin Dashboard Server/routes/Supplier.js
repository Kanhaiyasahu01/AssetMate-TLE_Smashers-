// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers
const {
  createSupplier,            // Controller to create a supplier (without order list)
  createAddress,             // Controller to create a billing/shipping address
  createAdditionalDetails,   // Controller to create additional details
  createSupplierOrder,
} = require("../controllers/Supplier");

const { auth , isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Supplier Routes
// ********************************************************************************************************
// Route for creating a supplier (without orders)
router.post("/create",auth,isAdmin,createSupplier);

// Route for creating a billing or shipping address
router.post("/address/create", auth,isAdmin,createAddress);

// Route for creating additional details
router.post("/additional-details/create", auth,isAdmin,createAdditionalDetails);

router.post('/create-supplier-order',auth,isAdmin,createSupplierOrder);
// Export the router for use in the main application

module.exports = router;
