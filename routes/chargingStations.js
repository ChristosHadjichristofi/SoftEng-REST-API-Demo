const express = require('express');
const auth = require('../middlewares/auth');
const chargingStationsController = require('../controllers/chargingStations');

const router = express.Router();

router.get('/', auth, chargingStationsController.getAll);
router.get('/municipalities', chargingStationsController.getMunicipalities);
router.get('/municipalities/:name', chargingStationsController.getDataByMunicipalityName);
router.get('/names', chargingStationsController.getNames);
router.get('/names/:name', chargingStationsController.getDataByStationName);

module.exports = router;