const InvoiceDetails = require('../models/InvoiceDetails'); // Import the model

exports.addInvoiceDetails = async (req, res) => {
  try {
    const { referenceNumber, orderDate, orderDueDate, discount, tax } = req.body;

    // Validate required fields (if any required beyond what schema defaults)
    if (!referenceNumber) {
      return res.status(400).json({
        success: false,
        message: "Reference number and order due date are required.",
      });
    }

    // Create a new InvoiceDetails entry
    const newInvoiceDetails = new InvoiceDetails({
      referenceNumber,
      orderDate,
      orderDueDate,
      discount: discount || 0, // If discount is not provided, default to 0
      tax: tax || 0,           // If tax is not provided, default to 0
    });

    // Save the invoice details, pre-save hook will automatically generate the invoice number
    await newInvoiceDetails.save();

    // Return the created invoice details in the response
    return res.status(201).json({
      success: true,
      message: 'Invoice details created successfully',
      invoiceDetails: newInvoiceDetails,
    });
  } catch (error) {
    console.error('Error creating invoice details:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating invoice details',
      error: error.message,
    });
  }
};
