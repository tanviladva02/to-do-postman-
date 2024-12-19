const express = require("express");
const connectDB = require("./connection/db"); // Import the DB connection
const taskRoutes = require("./routes/task.routes");  // Import task routes
const userRoutes = require("./routes/user.routes");

const app = express();
const port = 8100;

app.use(express.json());  // Middleware to parse JSON request body

// Connect to MongoDB
connectDB();

// Use routes
app.use("/tasks", taskRoutes);  // Use task routes
app.use("/user", userRoutes);  // Use user routes correctly

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



 