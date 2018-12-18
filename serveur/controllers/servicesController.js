/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */
var Service = require('../models/bien_service');

// Display list of all Services.
exports.service_list = function(req, res) {

    if(req.query.idMembre !== undefined){
        Service.getBiensOrServicesAndDispo(req.app.locals.db,"Services",parseInt(req.query.idMembre), (json)=>{
            res.json(json);
        });
    }
    else{
        Service.getBiensOrServicesAndDispo(req.app.locals.db,"Services",undefined, (json)=>{
            res.json(json);
        });
    }

};

exports.service_get_dispo = function(req, res) {

    Service.getDispoForBiensOrServicesById(req.app.locals.db,"Services",parseInt(req.params.id),req.query.dateMin,req.query.dateMax, (json)=>{
        res.json(json);
    });

};

exports.emprunt_service = function(req, res) {
    Service.empruntBienOrServiceById(req.app.locals.db,"Services",parseInt(req.body.idService),parseInt(req.body.idMembre),req.body, (json)=>{
        res.json(json);
    });
};

// Display services by date and keywords.
exports.service_research = function(req, res) {
    if (Object.keys(req.query).length === 0){
        Service.getCollectionByFiltre(req.app.locals.db,"Services",{}, (json)=>{
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

        console.log(req.query);
        console.log(dateMin);
        Service.getBiensOrServicesByDateAndKeywords(req.app.locals.db,"Services",dateMin,dateMax,ordreDate,req.query.keywords,res, (err,services) =>{
            console.log(err);
            res.json(services);
        });
    }
};

// Display detail page for a specific Service.
exports.service_detail = function(req, res) {

    Service.getCollectionByFiltre(req.app.locals.db,"Services",{_id : parseInt(req.params.id)}, (json)=>{
        //res.setHeader("Content-type", "application/json");
        res.json(json);
    });
};

// Handle Service create on POST.
exports.service_create = function(req, res) {


    let params = req.query;

    Service.createBienOrService(req.app.locals.db,"Services",params, (err,code)=>{
        if(!err){
            res.send("Insertion réussi");
        }
        else{
            res.send("Erreur lors de l'insertion "+code);
        }
    });

};

// Handle Service delete.
exports.service_delete_by_id = function(req, res) {

    Bien.deleteBienOrServiceById(req.app.locals.db,"Services",req.params.id, (err)=>{
        if(!err){
            res.send("Le document a bien été supprimé!");
        }
        else{
            res.send("Erreur lors de la suppression");
        }
    });
};

exports.service_delete = function(req, res) {

    if (req.query.id != undefined){
        Service.deleteBienOrServiceById(req.app.locals.db,"Services",parseInt(req.query.id), (err)=>{
            if(!err){
                res.send("Le document a bien été supprimé!");
            }
            else{
                res.send("Erreur lors de la suppression");
            }
        });
    }
    else if(req.query.idMembre != undefined){
        Service.deleteBienOrServiceByIdMembre(req.app.locals.db,"Services",req.query.idMembre, (err)=>{
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

// Display Service update.
exports.service_update = function(req, res) {

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
    Service.updateBienOrServiceById (req.app.locals.db,"Services",parseInt(id),body_params, (err,code)=>{
        if(!err){
            res.send("Le document a bien été mis à jour!");
        }
        else{
            res.send("Erreur lors de la mis à jour : "+code);
        }
    });
};
