/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */
var Bien = require('../models/bien_service');
var async = require("async");
// Display list of all Biens.
exports.bien_list = function(req, res) {

    if(req.query.idMembre !== undefined){
        Bien.getBiensOrServicesAndDispo(req.app.locals.db,"Biens",parseInt(req.query.idMembre), (json)=>{
            res.json(json);
        });
    }
    else{
        Bien.getBiensOrServicesAndDispo(req.app.locals.db,"Biens",undefined, (json)=>{
            res.json(json);
        });
    }

};

exports.bien_get_dispo = function(req, res) {

    Bien.getDispoForBiensOrServicesById(req.app.locals.db,"Biens",parseInt(req.params.id),req.query.dateMin,req.query.dateMax, (json)=>{
        res.json(json);
    });

};

exports.emprunt_bien = function(req, res) {
    Bien.empruntBienOrServiceById(req.app.locals.db,"Biens",parseInt(req.body.idBien),parseInt(req.body.idMembre),req.body, (json)=>{
        res.json(json);
    });
};
// Display biens by date and keywords.
exports.bien_research = function(req, res) {

    if (Object.keys(req.query).length === 0){
        Bien.getCollectionByFiltre(req.app.locals.db,"Biens",{}, (json)=>{
            res.json(json);
        });
    }
    else{
        let dateMin;
        let dateMax;
        if (req.query.dateMin ===undefined){
            dateMin =undefined;
        }
        else{
            dateMin = new Date(req.query.dateMin);//"2019-01-05");
        }
        if (req.query.dateMax ===undefined){
            dateMax =undefined;
        }
        else{
            dateMax = new Date(req.query.dateMax);//"2019-11-13");
        }
        if(req.query.ordreDate===undefined){
            ordreDate = 1;
        }
        else {
            ordreDate = req.query.ordreDate;
        }

        Bien.getBiensOrServicesByDateAndKeywords(req.app.locals.db,"Biens",dateMin,dateMax,ordreDate,req.query.keywords,res, (err,biens) =>{
            res.json(biens);
        });
    }
};

// Display detail page for a specific Bien.
exports.bien_detail = function(req, res) {
    Bien.getCollectionByFiltre(req.app.locals.db,"Biens",{_id : parseInt(req.params.id)}, (json)=>{
        res.json(json);
    });
};

// Handle Bien create on POST.
exports.bien_create = function(req, res) {


    let params = req.body;

    Bien.createBienOrService (req.app.locals.db,"Biens",params, (err,code)=>{


        if(!err){
            res.json({"err": false});
        }
        else{
            res.json({"err": true, "code": code});
        }
    });

};

// Handle Bien delete.
exports.bien_delete_by_id = function(req, res) {

    Bien.deleteBienOrServiceById (req.app.locals.db,"Biens",req.params.id, (err,code)=>{
        if(!err){
            res.json({"err": false});
        }
        else{
            res.json({"err": true, "code": code});
        }
    });
};

exports.bien_delete = function(req, res) {

    if (req.params.id != undefined){
        Bien.deleteBienOrServiceById(req.app.locals.db,"Biens",parseInt(req.params.id), (err,code)=>{
            if(!err){
                res.json({"err": false});
            }
            else{
                res.json({"err": true, "code": code});
            }
        });
    }
    else if(req.query.idMembre != undefined){
        Bien.deleteBienOrServiceByIdMembre(req.app.locals.db,"Biens",req.query.idMembre, (err)=>{
            if(!err){
                res.send("Le document a bien été supprimé!");
            }
            else{
                res.send("Erreur lors de la suppression");
            }
        });
    }
    else{
        res.send("Erreur : Aucun id ou idMembre fournit");
    }

};

// Display Bien update.
exports.bien_update = function(req, res) {

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
    Bien.updateBienOrServiceById (req.app.locals.db,"Biens",parseInt(id),body_params, (err,code)=>{
        if(!err){
            res.end("Le document a bien été mis à jour!");
        }
        else{
            res.send("Erreur lors de la mis à jour : "+code);
        }
    });
};
