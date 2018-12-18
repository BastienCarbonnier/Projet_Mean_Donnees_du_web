/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */

var express = require('express');
var router = express.Router();

// Require controller modules.
var membres_controller = require('../controllers/membresController');

// GET request to show all membre.
router.get('/', membres_controller.membre_list);

// GET request for show detail of a membre by id.
router.get('/:id/', membres_controller.membre_detail);


router.post('/checkLogin/', membres_controller.membre_check_email_password);

// DELETE request to delete a membre.
router.delete('/', membres_controller.membre_delete);

// DELETE request to delete a membre.
router.delete('/:id/', membres_controller.membre_delete_by_id);

// POST request for creating membre.
router.post('/', membres_controller.membre_create);

// PUT request to update Membre.
router.put('/', membres_controller.membre_update);

// PUT request to update Membre.
router.put('/:id/', membres_controller.membre_update);



module.exports = router;
