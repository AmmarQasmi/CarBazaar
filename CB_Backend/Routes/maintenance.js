const express = require('express');
const MaintenanceRouter = express.Router();
const {
    maintenanceController,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
} = require('../Controllers/maintenanceController');

MaintenanceRouter.post('/maintenance', maintenanceController);
MaintenanceRouter.get('/maintenance', getAllMaintenance);
MaintenanceRouter.get('/maintenance/:maintenance_id', getMaintenanceById);
MaintenanceRouter.put('/maintenance/:maintenance_id', updateMaintenance);
MaintenanceRouter.delete('/maintenance/:maintenance_id', deleteMaintenance);

module.exports = MaintenanceRouter;
