const User = require('../models/User');


exports.addQuotation = async (req, res) => {
    try {
        console.log("inside add quotation")
        const { userId, quotationId } = req.body;
        
        // Check if both userId and quotationId are provided
        if (!userId || !quotationId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Find the user and add the quotation ID to the user's quotation array
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { quotation: quotationId } },
            { new: true } // Return the updated document
        );

        // Check if user was found and updated
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Quotation added successfully",
            user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

exports.getMarketingUsers = async (req, res) => {
    try {
        // Find all users with role "Marketing"
        console.log("I am inside backend ")
        const marketingUsers = await User.find({ role: "Marketing" });

        // Check if any users were found
        if (marketingUsers.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users with role 'Marketing' found",
            });
        }

        // Return the list of users
        res.status(200).json({
            success: true,
            message: "Marketing users fetched successfully",
            marketingUsers,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

exports.getMarketingQuotations = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Find the user by ID and populate quotations
      const marketingUser = await User.findById(userId)
        .populate({
          path: "quotation",
          match: { orderType: "QUOTE" }, // Filter quotations for orderType "QUOTE"
          populate: [
            {
              path: "client",
              populate: {
                path: "billingAddress",
                model: "Address",
              },
            },
            {
              path: "warehouse",
            },
            {
              path: "invoiceDetails",
            },
            {
              path: "productList.product",
              model: "Product",
            },
          ],
        })
        .lean();
  
      if (!marketingUser) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Extract quotations
      const marketingQuotations = marketingUser.quotation;
  
      if (!marketingQuotations || marketingQuotations.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No quotations found",
        });
      }
  
      // Send the response with the populated quotations
      return res.status(200).json({
        success: true,
        message: "Quotations fetched successfully",
        allQuotations: marketingQuotations,
      });
    } catch (err) {
      console.error("Error fetching marketing quotations:", err);
      return res.status(500).json({
        success: false,
        message: "Server error, could not fetch quotations",
      });
    }
  };
  
  