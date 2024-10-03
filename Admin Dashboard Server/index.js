const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/database");
const cors = require('cors');
const cookieParser = require("cookie-parser")
// Importing routes
const userRoutes = require("./routes/User");
const warehouseRoutes = require("./routes/Warehouse");
const supplierRoutes = require("./routes/Supplier");
const clientRoutes = require("./routes/Client");

// Database connection
dbConnect();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
	'http://localhost:5173',  // Vite development server URL
];

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests without origin (like mobile apps, Postman, etc.)
			if (!origin || allowedOrigins.includes(origin)) {
				return callback(null, true);
			}
			return callback(new Error('Not allowed by CORS'), false);
		},
		credentials: true,  // Allow credentials such as cookies to be sent
	})
);

// Route handling
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/warehouse", warehouseRoutes);
app.use("/api/v1/supplier", supplierRoutes);
app.use("/api/v1/client", clientRoutes);

// Default route
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: 'Your server is up and running....'
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`App is running at http://localhost:${PORT}`);
});
