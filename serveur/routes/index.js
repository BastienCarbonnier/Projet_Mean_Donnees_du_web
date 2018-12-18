/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send("Bienvenue sur la page d'accueil");
});


module.exports = router;
