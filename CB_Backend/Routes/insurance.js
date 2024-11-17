const express = require('express');
const InsuranceRouter = express.Router();
const insuranceController = require('../Controllers/insuranceController');

InsuranceRouter.post('/insurance', insuranceController.createInsurancePolicy);
InsuranceRouter.get('/insurance', insuranceController.getAllInsurancePolicies);
InsuranceRouter.get('/insurance/:policy_number', insuranceController.getInsurancePolicyById);
InsuranceRouter.put('/insurance/:policy_number', insuranceController.updateInsurancePolicy);
InsuranceRouter.delete('/insurance/:policy_number', insuranceController.deleteInsurancePolicy);

module.exports = InsuranceRouter;
