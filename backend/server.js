require('dotenv').config();

const express = require('express');
const app = express();

const weatherRoutes = require('./routes/weatherRoutes');

app.use('/api/weather', weatherRoutes);

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});