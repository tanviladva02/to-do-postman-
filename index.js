const express = require("express");
const connectDB = require("./connection/db"); // Import the DB connection
const taskRoutes = require("./routes/task.routes");

const app = express();
const port = 8100;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use("/tasks", taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
