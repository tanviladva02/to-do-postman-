"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./connection/db")); // Import the DB connection
const task_routes_1 = __importDefault(require("./routes/task.routes")); // Import task routes
const user_routes_1 = __importDefault(require("./routes/user.routes")); // Import user routes
const app = (0, express_1.default)();
const port = 8100; // Explicitly typing the port
// Middleware for parsing JSON
app.use(express_1.default.json());
// Connect to MongoDB
(0, db_1.default)();
// Use routes for tasks and users
app.use("/tasks", task_routes_1.default);
app.use("/user", user_routes_1.default);
// Global error handling middleware
// app.use((err: any, req: Request, res: Response, next: Function) => {
//   console.error(err);
//   res.status(500).json({ message: 'Internal Server Error' });
// });
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
