// This is main server

const express = require('express');

// Routes imports
const newsRoute = require('./routes/news')

const app = express();
const host = '0.0.0.0';
const port = 3000;

// Connect to public_html folder
app.use(express.static('public_html'));

// Set up routes
app.use('/api/news', newsRoute);

// Start the server
app.listen(port, host, () => {
    console.log(`Server is running at https://localhost:${port}`);
});