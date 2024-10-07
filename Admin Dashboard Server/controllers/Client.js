const Client = require("../models/Client")
const Address = require("../models/Address");
const {CustomField,AdditionalDetails} = require("../models/AdditionalDetails")
const InvoiceDetails = require("../models/InvoiceDetails");
const Product = require("../models/Product");
const ClientOrder = require("../models/ClientOrder");


exports.createClient = async (req, res) => {
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
  
      // Create the client
      const newClient = await Client.create({
        billingAddress,
        shippingAddress,
        additionalDetails,
        clientOrders: [],
        transactions:[],
        quotation:[]
         // Initialize without orders
      });
  
      // Populate the necessary fields in the newly created client
      const populatedClient = await Client.findById(newClient._id)
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
        message: "Client created successfully",
        client: populatedClient,
      });
    } catch (error) {
      console.error("Error creating client:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the client",
        error: error.message,
      });
    }
  };
  

  exports.createClientOrder = async (req, res) => {
    try {
      const {
      client,
      warehouse,
      referenceNumber,
      orderDueDate,
      tax,           // Individual tax for the invoice
      discount,      // Individual discount for the invoice
      productList,
      totalTax,
      totalDiscount,
      shipping,
      extraDiscount,
      grandTotal,
      paymentOfTerms,
      } = req.body;
  
      // Step 1: Create Invoice Details
      const newInvoice = await InvoiceDetails.create({
        referenceNumber,
        orderDueDate,
        tax,       
        discount, 
      });
  
      // Step 2: Create Client Order with the invoice ID
      const newClientOrder = await ClientOrder.create({
        client,
        warehouse,
        invoiceDetails: newInvoice._id,  // Reference to the created invoice
        productList,
        totalTax,
        totalDiscount,
        shipping,
        extraDiscount,
        grandTotal,
        paymentOfTerms,
      });
  
      // Step 3: Update Client model's clientOrders array with the new ClientOrder ID
      const clientData = await Client.findById(client);
      if (clientData) {
        clientData.clientOrders.push(newClientOrder._id);  // Add the new ClientOrder ID to the clientOrders array
        await clientData.save();  // Save the updated client data
      } else {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        });
      }
  
      // Step 4: Update stock based on the ordered product quantities
      for (const item of productList) {
        const product = await Product.findById(item.product);
        if (product) {
          if (product.stockUnit >= item.quantity) {
            product.stockUnit -= item.quantity;  // Reduce stock based on ordered quantity
            await product.save();  // Save the updated product stock
          } else {
            return res.status(400).json({
              success: false,
              message: `Insufficient stock for product: ${product._id}`,
            });
          }
        } else {
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.product}`,
          });
        }
      }
  
      // Step 5: Send response
      return res.status(201).json({
        success: true,
        message: "Client order created successfully",
        clientOrder: newClientOrder,
      });
    } catch (error) {
      console.error("Error creating client order:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the client order",
        error: error.message,
      });
    }
  };


  exports.createQuotation = async (req, res) => {
    try {
      const {
        client,
        warehouse,
        referenceNumber,
        orderDueDate,
        tax,
        discount, // Now we are using discount
        productList,
        totalTax,
        totalDiscount,
        shipping,
        extraDiscount,
        grandTotal,
        paymentOfTerms,
      } = req.body;
  
      // Ensure required fields are provided
      if (!client || !warehouse || !productList || productList.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Client, warehouse, and products are required.",
        });
      }
  
      // Step 1: Create Invoice Details for the quotation
      const newInvoice = await InvoiceDetails.create({
        referenceNumber: referenceNumber || "",
        orderDueDate: orderDueDate || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        tax: tax || 0,
        discount: discount || 0, // Now discount is being used
      });
  
      // Step 2: Create Quotation (entry in ClientOrder but treated as a quotation)
      const newQuotation = await ClientOrder.create({
        client,
        warehouse,
        invoiceDetails: newInvoice._id, // Reference to the created invoice
        productList,
        totalTax: totalTax || 0,
        totalDiscount: totalDiscount || discount || 0, // Include discount in totalDiscount logic
        shipping: shipping || 0,
        extraDiscount: extraDiscount || 0,
        grandTotal: grandTotal || 0,
        paymentOfTerms: paymentOfTerms || "CASH",
      });
  
      // Step 3: Add Quotation ID to Client's quotations array
      const clientData = await Client.findById(client);
      if (clientData) {
        clientData.quotation.push(newQuotation._id); // Add the Quotation ID
        await clientData.save(); // Save the updated client data
      } else {
        return res.status(404).json({
          success: false,
          message: "Client not found",
        });
      }
  
      // Step 4: Send response
      return res.status(201).json({
        success: true,
        message: "Quotation created successfully",
        quotation: newQuotation,
      });
    } catch (error) {
      console.error("Error creating quotation:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while creating the quotation",
        error: error.message,
      });
    }
  };
  


  exports.convertToOrder = async (req, res) => {
    try {
      const { quotationId } = req.body;
  
      // Ensure quotationId is provided
      if (!quotationId) {
        return res.status(400).json({
          success: false,
          message: "Quotation ID is required.",
        });
      }
  
      // Step 1: Find the quotation by ID
      const quotation = await ClientOrder.findById(quotationId);
      if (!quotation) {
        return res.status(404).json({
          success: false,
          message: "Quotation not found.",
        });
      }
  
      // Step 2: Update stock based on the ordered product quantities
      for (const item of quotation.productList) {
        const product = await Product.findById(item.product);
        if (product) {
          if (product.stockUnit >= item.quantity) {
            product.stockUnit -= item.quantity; // Reduce stock based on ordered quantity
            await product.save(); // Save the updated product stock
          } else {
            return res.status(400).json({
              success: false,
              message: `Insufficient stock for product: ${product._id}`,
            });
          }
        } else {
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.product}`,
          });
        }
      }
  
      // Step 3: Send response
      return res.status(200).json({
        success: true,
        message: "Quotation successfully converted to order by updating stock",
        quotation: quotation, // Returning the updated quotation data
      });
    } catch (error) {
      console.error("Error converting quotation to order:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while converting the quotation to order",
        error: error.message,
      });
    }
  };
  
  
  exports.getAllClients = async (req, res) => {
    try {
      // Fetch all clients from the database and populate related fields if necessary
      const clients = await Client.find().populate('billingAddress shippingAddress additionalDetails');
  
      return res.status(200).json({
        success: true,
        message: "Clients retrieved successfully",
        clients,
      });
    } catch (error) {
      console.error("Error while fetching clients:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching clients",
        error: error.message,
      });
    }
  };



  exports.getQuotation = async (req, res) => {
    try {
      // Extract the quotation ID from the request URL (req.params)
      const { id } = req.params;
  
      // Check if the ID is provided
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Quotation ID is required",
        });
      }
  
      // Fetch the quotation data and populate the product field inside productList
      const quotationData = await ClientOrder.findById(id)
        .populate('client') // Populate client data
        .populate('warehouse') // Populate warehouse data
        .populate('invoiceDetails') // Populate invoice details
        .populate({
          path: 'productList.product', // Populate product inside productList array
          model: 'Product',
        })
        .lean(); // Use lean for better performance
  
      // If no data found, send a 404 response
      if (!quotationData) {
        return res.status(404).json({
          success: false,
          message: "Quotation not found",
        });
      }
  
      // Send the quotation data as a response
      return res.status(200).json({
        success: true,
        message: "Quotation retrieved successfully",
        quotation: quotationData,
      });
    } catch (error) {
      console.error("Error while fetching quotation:", error);
  
      // Send a 500 error response with the error details
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the quotation",
        error: error.message,
      });
    }
  };
  