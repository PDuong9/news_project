const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=54f9eb335aff452192c71a0fdc90c621"
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;