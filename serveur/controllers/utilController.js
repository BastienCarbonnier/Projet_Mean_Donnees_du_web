/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */
var UtilBien = require('../models/util_bien_service');
var async = require("async");

// Recupère la liste des diponibilités pour chaque bien.
exports.util_list = function(req, res) {
    let filtre = {};
    let type = req.params.type;
    if (req.query.idBeneficiaire !== undefined) filtre.idBeneficiaire = parseInt(req.query.idBeneficiaire);

    UtilBien.getCollectionByFiltre(req.app.locals.db,"Utilisations"+type+"s",filtre, (json)=>{
        res.json(json);
    });
};


exports.util_by_id = function(req, res) {
    let type = req.params.type;
    let idBeneficiaire = parseInt(req.params.id);
    //if (req.query.idBeneficiaire !== undefined) filtre.idBeneficiaire = parseInt(req.query.idBeneficiaire);
    UtilBien.getReservationsWithDetails(req.app.locals.db,"Utilisations"+type+"s",type,idBeneficiaire, (json)=>{
        res.json(json);
    });

};
