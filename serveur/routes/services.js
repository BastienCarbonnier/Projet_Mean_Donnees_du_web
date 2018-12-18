/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */

var express = require('express');
var router = express.Router();

// Require controller modules.
var services_controller = require('../controllers/servicesController');

router.put('/emprunt/',services_controller.emprunt_service);
router.get('/dispo/:id/', services_controller.service_get_dispo);
// GET request for show all service.
router.get('/', services_controller.service_list);
// DELETE request to delete a service.
router.delete('/:id/', services_controller.service_delete_by_id);

// DELETE request to delete a service.
router.delete('/', services_controller.service_delete);

// GET request for show detail of a service.
router.get('/research/', services_controller.service_research);

// GET request for show detail of a service by id.
router.get('/:id/', services_controller.service_detail);

// POST request for creating service.
router.post('/', services_controller.service_create);



// GET request to update Bien.
router.put('/:id/', services_controller.service_update);


module.exports = router;
