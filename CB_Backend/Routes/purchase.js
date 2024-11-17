const express = require("express");
const PurchaseRouter = express.Router();
const { purchaseController } = require("../Controllers/purchaseController")

PurchaseRouter.post("/purchase", purchaseController)

module.exports = PurchaseRouter;