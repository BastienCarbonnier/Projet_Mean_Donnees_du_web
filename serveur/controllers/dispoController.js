/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */
var DispoBien = require('../models/dispo_bien_service');
var async = require("async");

// Recupère la liste des diponibilités pour chaque bien.
exports.dispo_list = function(req, res) {

    DispoBien.getCollectionByFiltre(req.app.locals.db,"Disponibilites"+req.params.type+"s",{}, (json)=>{
        res.json(json);
    });
};

// Récupère la liste des disponibilites pour un bien.

exports.dispo_by_id = function(req, res) {

    let filtre = {};
    let type = req.params.type;
    let idKey = "id"+type;
    filtre[idKey] = parseInt(req.params.id);

    DispoBien.getCollectionByFiltre(req.app.locals.db,"Disponibilites"+type+"s",filtre, (json)=>{
        res.json(json);
    });
};

exports.emprunt = function(req, res) {


    let type = req.params.type;

    let body_params = req.body;
    let id;


    if (req.params.id == undefined){
        if (body_params.id!=undefined){
            id = body_params.id;
            delete body_params.id;
        }
    }
    else{
        id = req.params.id;
        delete body_params.id;
    }

    DispoBien.empruntBienById(req.app.locals.db,type+"s",parseInt(id),body_params, (json)=>{
        res.send("Emprunt enregistré");
    });

};
