const express = require('express');
const cors = require('cors');

/* Import routes */
const chargingStationsRoutes = require('./routes/chargingStations');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes used */
app.use('/api/chargingStations', chargingStationsRoutes);

app.use((req, res, next) => { res.status(404).json({ message: 'Endpoint not found' }) });

module.exports = app;