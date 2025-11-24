const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Top-headlines by category
router.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${encodeURIComponent(category)}&language=en&apiKey=${apiKey}`;
    fetchAndRespond(url, res);
});

// Top-headlines by source
router.get('/source/:source', async (req, res) => {
    const source = req.params.source;
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=us&source=${source}&language=en&apiKey=${apiKey}`;
    fetchAndRespond(url, res);
});

// Top-headlines by query
router.get('/query/:query', async (req, res) => {
    const query = req.params.query;
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=popularity&apiKey=${apiKey}`;
    fetchAndRespond(url, res);
});

// Helper function
async function fetchAndRespond(url, res) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = router;