import express from "express";
import connectDB from "./connection/db.js"; // Import the DB connection
import taskRoutes from "./routes/task.routes.js"; // Import task routes
import userRoutes from "./routes/user.routes.js"; // Import user routes
const app = express();
const port = 8100; // Explicitly typing the port
// Middleware for parsing JSON
app.use(express.json());
// Connect to MongoDB
connectDB();
// Use routes for tasks and users
app.use("/tasks", taskRoutes);
app.use("/user", userRoutes);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
