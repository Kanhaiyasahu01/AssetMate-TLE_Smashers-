const Client = require("../models/Client")
const Address = require("../models/Address");
const {CustomField,AdditionalDetails} = require("../models/AdditionalDetails")
const InvoiceDetails = require("../models/InvoiceDetails");
const Product = require("../models/Product");
const ClientOrder = require("../models/ClientOrder");
const mongoose = require('mongoose');

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
        orderType:"SALE",
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
        orderType:"QUOTE",
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
        // Fetch all clients and populate related fields, including customFields inside additionalDetails
        const clients = await Client.find({})
            .populate("billingAddress")
            .populate("shippingAddress")
            .populate({
              path:"additionalDetails",
              populate:{
                path:"customFields"
              }
            })
            .exec();

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
      .populate({
        path: "client", // First populate the client object
        populate: { 
          path: "billingAddress", // Only populate the billingAddress field
          model: "Address" 
        }
      })
      .populate("warehouse") // Populate warehouse data
      .populate("invoiceDetails") // Populate invoice details
      .populate({
        path: "productList.product", // Populate product inside productList array
        model: "Product",
      })
      .lean(); // Using lean for better performance
    
  
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
  
  exports.getOrder = async (req, res) => {
    try {
      // Extract the quotation ID from the request URL (req.params)
      const { id } = req.params;
  
      // Check if the ID is provided
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Order ID is required",
        });
      }
  
      // Fetch the quotation data and populate the product field inside productList
      const orderData = await ClientOrder.findById(id)
      .populate({
        path: "client", // First populate the client object
        populate: { 
          path: "billingAddress", // Only populate the billingAddress field
          model: "Address" 
        }
      })
      .populate("warehouse") // Populate warehouse data
      .populate("invoiceDetails") // Populate invoice details
      .populate({
        path: "productList.product", // Populate product inside productList array
        model: "Product",
      })
      .lean(); // Using lean for better performance
    
  
      // If no data found, send a 404 response
      if (!orderData) {
        return res.status(404).json({
          success: false,
          message: "order not found",
        });
      }
  
      // Send the quotation data as a response
      return res.status(200).json({
        success: true,
        message: "order retrieved successfully",
        clientOrder: orderData,
      });
    } catch (error) {
      console.error("Error while fetching order:", error);
  
      // Send a 500 error response with the error details
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching the order",
        error: error.message,
      });
    }
  };


  exports.fetchAllOrder = async (req, res) => {
    try {
      const allOrders = await ClientOrder.find({ orderType: "SALE" })
      .populate({
        path: "client", 
        populate: { 
          path: "billingAddress",
          model: "Address" 
        }
      })
      .populate("warehouse") // Populate warehouse data
      .populate("invoiceDetails") // Populate invoice details
      .populate({
        path: "productList.product", // Populate product inside productList array
        model: "Product",
      })
      .lean(); // Us
  
      if (!allOrders || allOrders.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Fetched all orders",
        allOrders,
      });
  
    } catch (err) {
      console.error("Error fetching orders:", err);  // Add error logging
      return res.status(500).json({
        success: false,
        message: "Internal server error while fetching all orders",
      });
    }
  };
  
  exports.fetchAllQuotation = async (req, res) => {
    try {
      const allQuotation = await ClientOrder.find({ orderType: "QUOTE" })
      .populate({
        path: "client", // First populate the client object
        populate: { 
          path: "billingAddress", // Only populate the billingAddress field
          model: "Address" 
        }
      })
      .populate("warehouse") // Populate warehouse data
      .populate("invoiceDetails") // Populate invoice details
      .populate({
        path: "productList.product", // Populate product inside productList array
        model: "Product",
      })
      .lean(); 
  
      if (!allQuotation || allQuotation.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Fetched all quotation",
        allQuotation,
      });
  
    } catch (err) {
      console.error("Error fetching orders:", err);  // Add error logging
      return res.status(500).json({
        success: false,
        message: "Internal server error while fetching all quotation",
      });
    }
  };


exports.deleteOrderById = async (req, res) => {
    try {
      const { orderId, clientId } = req.body;
  
      // Validate input
      if (!orderId || !clientId) {
        return res.status(400).json({
          success: false,
          message: "Order ID and Client ID are required",
        });
      }
  
      // Delete the order
      const deletedOrder = await ClientOrder.findByIdAndDelete(orderId);
  
      if (!deletedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found or not able to delete",
        });
      }
  
      // Update the client to remove the deleted order
      const updatedClient = await Client.findByIdAndUpdate(
        clientId,
        {
          $pull: { clientOrders: orderId }, // Ensure you're pulling the correct order ID
        },
        { new: true } // Return the updated client document
      );
  
      if (!updatedClient) {
        return res.status(404).json({
          success: false,
          message: "Client not found or unable to update",
        });
      }
  
      // Respond with success
      return res.status(200).json({
        success: true,
        message: "Order deleted successfully",
        deletedOrder,
        updatedClient, // Optionally include the updated client data in the response
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the order",
        error: err.message,
      });
    }
  };


  // exports.updateClient = async (req, res) => {
  //   try {
  //     const {_id,billingAddress, shippingAddress, additionalDetails,clientOrders,transactions,quotation} = req.body;
  
  //     // Check if required fields are provided
  //     if(!_id){
  //       return res.status(400).json({
  //         success:false,
  //         message:"Client doest not exists",
  //       })
  //     }
  //     if (!billingAddress || !shippingAddress || !additionalDetails) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Billing address, shipping address, and additional details are required",
  //       });
  //     }

      
  
  //     // Ensure that the provided IDs exist in their respective collections
  //     const billingAddressExists = await Address.findById(billingAddress);
  //     const shippingAddressExists = await Address.findById(shippingAddress);
  //     const additionalDetailsExists = await AdditionalDetails.findById(additionalDetails);
  
  //     if (!billingAddressExists || !shippingAddressExists || !additionalDetailsExists) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Invalid billing address, shipping address, or additional details",
  //       });
  //     }
  
  //     // Create the client
  //     const newClient = await Client.findByIdAndUpdate(_id,{
  //       billingAddress,
  //       shippingAddress,
  //       additionalDetails,
  //       clientOrders: ,
  //       transactions:[],
  //       quotation:[]
  //        // Initialize without orders
  //     });
  
  //     // Populate the necessary fields in the newly created client
  //     const populatedClient = await Client.findById(newClient._id)
  //       .populate('billingAddress')
  //       .populate('shippingAddress')
  //       .populate(
  //           {
  //               path:"additionalDetails",
  //               populate:{
  //                   path:"customFields"
  //               }
  //           }
  //       )
  //       .lean(); // Optional: use lean for better performance
  
  //     // Respond with success and populated data
  //     return res.status(201).json({
  //       success: true,
  //       message: "Client created successfully",
  //       client: populatedClient,
  //     });
  //   } catch (error) {
  //     console.error("Error creating client:", error);
  //     return res.status(500).json({
  //       success: false,
  //       message: "An error occurred while creating the client",
  //       error: error.message,
  //     });
  //   }
  // };




  exports.deleteClients = async (req, res) => {
    try {
      const { id } = req.body;
  console.log("body",id)
      // Check if the id is provided
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Please provide a client ID.",
        });
      }
  
      // Validate the ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid client ID format.",
        });
      }
  
      // Find the client by ID and delete it
      const deletedClient = await Client.findByIdAndDelete(id);
  
      // If client was not found or couldn't be deleted
      if (!deletedClient) {
        return res.status(400).json({
          success: false,
          message: "Unable to delete client. Client not found.",
        });
      }
  
      // Successfully deleted
      return res.status(200).json({
        success: true,
        message: "Client deleted successfully.",
      });
  
    } catch (err) {
      // Error handling
      console.error("Error deleting client:", err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the client.",
      });
    }
  };
  
  const PlantClient = require("../models/PlantClient"); // Import your PlantClient model

// Create a new PlantClient
exports.createPlantClient = async (req, res) => {
  try {
    const { personName, designation, plantName, department, email, mobileNo, alternateMoNo, LandlineNumber, remarks } = req.body;
    // Validate required fields
    if (!personName || !email || !mobileNo) {
      return res.status(400).json({
        success: false,
        message: "Person Name, Email, and Mobile Number are required fields.",
      });
    }

    // Create the new PlantClient
    const newPlantClient = await PlantClient.create({
      personName,
      designation,
      plantName,
      department,
      email,
      mobileNo,
      alternateMoNo,
      LandlineNumber,
      remarks,
    });

    return res.status(201).json({
      success: true,
      message: "Plant Client created successfully.",
      plantClient: newPlantClient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the Plant Client.",
      error: error.message,
    });
  }
};

// Update an existing PlantClient
exports.updatePlantClient = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from URL parameters
    const { personName, designation, plantName, department, email, mobileNo, alternateMoNo, LandlineNumber, remarks } = req.body;

    // Find the PlantClient by ID
    const plantClient = await PlantClient.findById(id);
    if (!plantClient) {
      return res.status(404).json({
        success: false,
        message: "Plant Client not found.",
      });
    }

    // Update the PlantClient
    plantClient.personName = personName || plantClient.personName;
    plantClient.designation = designation || plantClient.designation;
    plantClient.plantName = plantName || plantClient.plantName;
    plantClient.department = department || plantClient.department;
    plantClient.email = email || plantClient.email;
    plantClient.mobileNo = mobileNo || plantClient.mobileNo;
    plantClient.alternateMoNo = alternateMoNo || plantClient.alternateMoNo;
    plantClient.LandlineNumber = LandlineNumber || plantClient.LandlineNumber;
    plantClient.remarks = remarks || plantClient.remarks;

    // Save the updated PlantClient
    const updatedPlantClient = await plantClient.save();

    return res.status(200).json({
      success: true,
      message: "Plant Client updated successfully.",
      plantClient: updatedPlantClient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the Plant Client.",
      error: error.message,
    });
  }
};

// Delete a PlantClient
exports.deletePlantClient = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from URL parameters

    // Find and delete the PlantClient by ID
    const plantClient = await PlantClient.findByIdAndDelete(id);
    if (!plantClient) {
      return res.status(404).json({
        success: false,
        message: "Plant Client not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Plant Client deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the Plant Client.",
      error: error.message,
    });
  }
};

// Get all PlantClients
exports.getAllPlantClients = async (req, res) => {
  try {
    // Fetch all PlantClients from the database
    const plantClients = await PlantClient.find()
    .populate({
      path: 'plantName', // Populate plantName (Client document)
      populate: {
        path: 'billingAddress', // Populate billingAddress within Client model
      },
    })
    .exec();
    
    return res.status(200).json({
      success: true,
      message: "Plant Clients retrieved successfully.",
      plantClients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the Plant Clients.",
      error: error.message,
    });
  }
};
