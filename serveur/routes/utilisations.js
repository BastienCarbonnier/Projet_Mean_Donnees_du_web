/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */

var express = require('express');
var router = express.Router();

// Require controller modules.
var util_controller = require('../controllers/utilController');

router.get('/:type/:id/', util_controller.util_by_id);




//router.put('/:type/:id/', dispo_controller.emprunt);


/*
// DELETE request to delete a bien.
router.delete('/:id/', disponibilitesBiens_controller.disponibilitesBien_delete_by_id);

// DELETE request to delete a bien.
router.delete('/', disponibilitesBiens_controller.disponibilitesBien_delete);

// GET request for show detail of a bien.
router.get('/research/', disponibilitesBiens_controller.disponibilitesBien_research);

// GET request for show detail of a bien by id.
router.get('/:id/', disponibilitesBiens_controller.disponibilitesBien_detail);

// POST request for creating bien.
router.post('/', disponibilitesBiens_controller.disponibilitesBien_create);



// GET request to update Bien.
router.put('/:id/', disponibilitesBiens_controller.disponibilitesBien_update);

*/
module.exports = router;
