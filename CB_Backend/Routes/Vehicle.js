const express = require('express');
const VehicleRouter = express.Router();
const {getAllVehicles, deleteVehicle, sortVehiclesByName, registerVehicle } = require('../Controllers/vehicles');

VehicleRouter.get('/vehicles', getAllVehicles);
VehicleRouter.delete('/vehicles/:id', deleteVehicle);
VehicleRouter.get('/vehicles/sort', sortVehiclesByName);
VehicleRouter.post('/vehicles/register', registerVehicle);

module.exports = VehicleRouter;
