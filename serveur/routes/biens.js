/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */

var express = require('express');
var router = express.Router();

// Require controller modules.
var biens_controller = require('../controllers/biensController');

router.put('/emprunt/',biens_controller.emprunt_bien);

router.get('/dispo/:id/', biens_controller.bien_get_dispo);
// GET request to show all bien.
router.get('/', biens_controller.bien_list);

// DELETE request to delete a bien.
router.delete('/:id/', biens_controller.bien_delete_by_id);

// DELETE request to delete a bien.
router.delete('/', biens_controller.bien_delete);

// GET request for show detail of a bien.
router.get('/research/', biens_controller.bien_research);

// GET request for show detail of a bien by id.
router.get('/:id/', biens_controller.bien_detail);



// POST request for creating bien.
router.post('/', biens_controller.bien_create);



// GET request to update Bien.
router.put('/:id/', biens_controller.bien_update);
// GET request to update Bien.
router.put('/', biens_controller.bien_update);


module.exports = router;
