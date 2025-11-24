// This is main server

const express = require("express");

// Routes imports
const newsRouter = require("./src/routes/news");

const app = express();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

// Connect to public_html folder
app.use(express.static("src/public_html"));

// Set up routes
app.use("/api/news", newsRouter);

// Start the server
app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
