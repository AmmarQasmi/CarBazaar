const express = require('express');
const VehicleRouter = express.Router();
const {getAllVehicles, deleteVehicle, sortVehiclesByName } = require('../Controllers/vehicles');

VehicleRouter.get('/vehicles', getAllVehicles);
VehicleRouter.delete('/vehicles/:id', deleteVehicle);
VehicleRouter.get('/vehicles/sort', sortVehiclesByName);

module.exports = VehicleRouter;
