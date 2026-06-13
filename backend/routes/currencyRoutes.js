const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET /api/currency
// Fetches live exchange rates for ALL major global travel destinations with MYR as the base
router.get('/', async (req, res) => {
    try {
        // Removing the hardcoded 'to' filter tells the API to return ALL available global currencies
        const response = await axios.get('https://api.frankfurter.dev/v1/latest?base=MYR');
        
        const currencyData = {
            base: 'MYR',
            date: response.data.date,
            rates: response.data.rates // This automatically passes down EUR, GBP, KRW, AUD, CAD, etc.
        };

        res.json(currencyData);
    } catch (error) {
        res.status(500).json({ message: 'Unable to fetch exchange rate data' });
    }
});

module.exports = router;