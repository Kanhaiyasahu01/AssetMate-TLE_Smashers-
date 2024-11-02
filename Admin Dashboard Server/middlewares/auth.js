// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

// Configuring dotenv to load environment variables from .env file
dotenv.config();

// Middleware to authenticate user requests
exports.auth = async (req, res, next) => {
	try {
		const token =
			req.cookies.token ||
			req.body.token ||
			req.headers.authorization?.replace("Bearer ", ""); // Safe access to Authorization header
		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Authorization token is missing",
			});
		}

		// Verify the JWT using the secret key
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// Store the decoded JWT payload in the request object for further use
		req.user = decoded;
		// Move on to the next middleware or request handler
		next();
	} catch (error) {
		// If JWT verification fails or other errors occur
		return res.status(401).json({
			success: false,
			message: error.name === "JsonWebTokenError" ? "Invalid token" : "Token verification failed",
		});
	}
};

// Middleware to check if the user is an Admin
exports.isAdmin = async (req, res, next) => {
	try {
		// Find user based on the email from the decoded JWT
		const userDetails = await User.findOne({ email: req.user.email });

		// Ensure the user exists and has the Admin role
		if (!userDetails || userDetails.role !== "Admin") {
			return res.status(403).json({
				success: false,
				message: "Access denied. Admins only.",
			});
		}

		// Proceed to the next middleware if the user is an Admin
		next();
	} catch (error) {
		// Handle errors, including if the user's role can't be verified
		return res.status(500).json({
			success: false,
			message: "Failed to verify user role",
		});
	}
};
