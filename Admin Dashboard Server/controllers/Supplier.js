// Import required models
const Supplier = require("../models/Supplier");
const Address = require("../models/Address");
const {CustomField,AdditionalDetails} = require("../models/AdditionalDetails")
const SupplierOrder = require("../models/SupplierOrder");
const InvoiceDetails = require("../models/InvoiceDetails");
const Product = require("../models/Product");

// Controller for creating a Billing/Shipping Address
exports.createAddress = async (req, res) => {
  console.log("inside create address controller")
  try {
      const { name, company, phone, email, address, city, country, postbox } = req.body;
console.log("inside create address controller")
      // Validate required fields
      if (!name || !company || !phone || !email || !city || !country) {
          return res.status(400).json({
              success: false,
              message: "Name, company, phone, email, city, and country are required fields",
          });
      }

      // Create the address
      const newAddress = await Address.create({
          name,
          company,
          phone,
          email,
          address,
          city,
          country,
          postbox,
      });
      console.log("Address created billing")
      // Respond with success
      return res.status(201).json({
          success: true,
          message: "Address created successfully",
          address: newAddress,
      });
  } catch (error) {
      console.error("Error creating address:", error);
      return res.status(500).json({
          success: false,
          message: "An error occurred while creating the address",
          error: error.message,
      });
  }
};



// Controller for creating Additional Details
exports.createAdditionalDetails = async (req, res) => {
    try {
      const { tax, discount, documentId, customFields } = req.body;
  
      // Validate required fields
      if (!documentId) {
        return res.status(400).json({
          success: false,
          message: "Document ID is required",
        });
      }
  
      // Check if customFields array is provided, and create the fields
      let customFieldIds = [];
      if (customFields && customFields.length > 0) {
        // Create each custom field and store its ID in the customFieldIds array
        customFieldIds = await Promise.all(
          customFields.map(async (field) => {
            const newCustomField = await CustomField.create({
              name: field.name,
              description: field.description,
            });
            return newCustomField._id;
          })
        );
      }
  
      // Create additional details with the custom field references
      const newAdditionalDetails = await AdditionalDetails.create({
        tax,
        discount,
        documentId,
        customFields: customFieldIds,
      });
  
      // Respond with success
      return res.status(201).json({
        success: true,
        message: "Additional details created successfully",
        additionalDetails: newAdditionalDetails,
      });
    } catch (error) {
      console.error("Error creating additional details:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating additional details",
        error: error.message,
      });
    }
  };

  
  exports.createSupplier = async (req, res) => {
    try {
      const {billingAddress, shippingAddress, additionalDetails} = req.body;
  
      // Check if required fields are provided
      if (!billingAddress || !shippingAddress || !additionalDetails) {
        return res.status(400).json({
          success: false,
          message: "Billing address, shipping address, and additional details are required",
        });
      }
  
      // Ensure that the provided IDs exist in their respective collections
      const billingAddressExists = await Address.findById(billingAddress);
      const shippingAddressExists = await Address.findById(shippingAddress);
      const additionalDetailsExists = await AdditionalDetails.findById(additionalDetails);
  
      if (!billingAddressExists || !shippingAddressExists || !additionalDetailsExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid billing address, shipping address, or additional details",
        });
      }
  
      // Create the supplier
      const newSupplier = await Supplier.create({
        billingAddress,
        shippingAddress,
        additionalDetails,
        supplierOrders: [],
        transactions:[],
         // Initialize without orders
      });
  
      // Populate the necessary fields in the newly created supplier
      const populatedSupplier = await Supplier.findById(newSupplier._id)
        .populate('billingAddress')
        .populate('shippingAddress')
        .populate(
            {
                path:"additionalDetails",
                populate:{
                    path:"customFields"
                }
            }
        )
        .lean(); // Optional: use lean for better performance
  
      // Respond with success and populated data
      return res.status(201).json({
        success: true,
        message: "Supplier created successfully",
        supplier: populatedSupplier,
      });
    } catch (error) {
      console.error("Error creating supplier:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the supplier",
        error: error.message,
      });
    }
  };
  

// Controller for creating a supplier order
exports.createSupplierOrder = async (req, res) => {
  try {
    const {
      supplier,
      warehouse,
      referenceNumber,
      orderDueDate,
      tax,           // Individual tax for the invoice
      discount,      // Individual discount for the invoice
      productList,
      shipping,
      extraDiscount,
      grandTotal,
      paymentOfTerms,
      isUpdateRequired,
    } = req.body;

    // Step 1: Create Invoice Details
    const newInvoice = await InvoiceDetails.create({
      referenceNumber,
      orderDueDate,
      tax,       // Invoice-specific tax
      discount,  // Invoice-specific discount
    });

    // Step 2: Create Supplier Order with the invoice ID
    const newSupplierOrder = await SupplierOrder.create({
      supplier,
      warehouse,
      invoiceDetails: newInvoice._id,  // Reference to the created invoice
      productList,
      shipping,
      extraDiscount,
      grandTotal,
      paymentOfTerms,
      isUpdateRequired,
    });

    // Step 3: Update Supplier model's supplierOrders array with the new SupplierOrder ID
    const supplierData = await Supplier.findById(supplier);
    if (supplierData) {
      supplierData.supplierOrders.push(newSupplierOrder._id);  // Add the new SupplierOrder ID to the supplierOrders array
      await supplierData.save();  // Save the updated supplier data
    } else {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    // Step 4: Conditionally update stock if `isUpdateRequired` is true
    if (isUpdateRequired) {
      for (const item of productList) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stockUnit += item.quantity;  // Update stock based on quantity
          await product.save();  // Save the updated product
        }
      }
    }

    // Step 5: Send response
    return res.status(201).json({
      success: true,
      message: "Supplier order created successfully",
      supplierOrder: newSupplierOrder,
    });
  } catch (error) {
    console.error("Error creating supplier order:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the supplier order",
      error: error.message,
    });
  }
};
