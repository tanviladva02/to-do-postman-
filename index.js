const express = require("express");
const taskRoutes = require("./contoller/routes.task");

const app = express();
const port = 8100;

app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
