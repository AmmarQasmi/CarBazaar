const express = require('express');
const ContactRouter = express.Router();
const contactController = require('../Controllers/contactController');

ContactRouter.post('/contact', contactController.createContactUs);
ContactRouter.get('/contact', contactController.getAllContactUsRequests);
ContactRouter.get('/contact/:contact_id', contactController.getContactUsById);
ContactRouter.put('/contact/:contact_id', contactController.updateContactUs);
ContactRouter.delete('/contact/:contact_id', contactController.deleteContactUs);

module.exports = ContactRouter;
