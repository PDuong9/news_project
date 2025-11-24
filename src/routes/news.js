const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/:category', async (req, res) => {
    const category = req.params.category;
    const apiKey = process.env.NEWS_API_KEY;
    const src = "https://newsapi.org/v2/top-headlines?country=us&apiKey=54f9eb335aff452192c71a0fdc90c621"
    
    try {
        const response = await fetch(src);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;