const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:city', async (req, res) => {

    const city = req.params.city;

    try {

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
        );

        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            condition: response.data.weather[0].description,
            windSpeed: response.data.wind.speed
        };

        res.json(weatherData);

    } catch (error) {

        res.status(500).json({
            message: 'Unable to fetch weather data'
        });

    }

});

module.exports = router;