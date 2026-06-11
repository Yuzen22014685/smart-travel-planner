require('dotenv').config();

const mongoose = require("mongoose");
const express = require('express');

const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const weatherRoutes = require('./routes/weatherRoutes');

app.use('/api/weather', weatherRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
