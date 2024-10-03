const bcrypt = require("bcryptjs");
const OTP = require("../models/OTP");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const mailSender = require("../utils/mailSender")
require("dotenv").config()

// Signup Controller for Registering USers
exports.signup = async (req, res) => {
    try {
      // Destructure fields from the request body
      const { name, email, password, role, otp,address,phoneNumber,gstIn} = req.body
      // Check if All Details are there or not
      if ( !name || !email || !password || !role || !otp || !address || !phoneNumber) {
        return res.status(403).send({
          success: false,
          message: "All fields are required",
        })
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists. Please sign in to continue.",
        })
      }

      // Find the most recent OTP for the email
      const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
      console.log(response)
      if (response.length === 0) {
        // OTP not found for the email
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        })
      } else if (otp !== response[0].otp) {
        // Invalid OTP
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        })
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)
  
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role,
        address,
        phoneNumber,
        gstIn,
      })
  
      return res.status(200).json({
        success: true,
        user,
        message: "User registered successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "User cannot be registered. Please try again.",
      })
    }
  }
  
//login controller
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered, Please SignUp to Continue`,
      })
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )

      // Save token to user document in database
      user.token = token
      user.password = undefined
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  } catch (error) {
    console.error(error)
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}

// Send OTP for email verification
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user is already registered
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Save OTP for the specific email in the database (overwriting any existing OTP for that email)
    const otpPayload = { email, otp };
    await OTP.findOneAndUpdate(
      { email },  // Find any existing OTP for this email
      otpPayload, // Update with new OTP
      { upsert: true, new: true } // Create a new document if no existing OTP is found
    );

    // Send OTP via email (assuming you have a mailSender function)
    await mailSender(email, otp,);

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.error("Error in sending OTP:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
      error: error.message,
    });
  }
};


// change password controller
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Check if oldPassword and newPassword are provided
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The old password is incorrect",
      });
    }

    // Hash the new password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send email notification (async)
    try {
      await mailSender(
        updatedUserDetails.email,
        "Password Updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Hi ${updatedUserDetails.name}, your password has been successfully updated.`
        )
      );
    } catch (error) {
      console.error("Error while sending email:", error.message);
      // Don't stop the process due to email sending failure, just log it
    }

    // Respond with success message
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the password",
      error: error.message,
    });
  }
};
