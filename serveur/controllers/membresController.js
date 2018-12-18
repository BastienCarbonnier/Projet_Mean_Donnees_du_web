/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */
var Membre = require('../models/membre');
var async = require("async");
// Display list of all Membres.
exports.membre_list = function(req, res) {

    Membre.getCollectionByFiltre(req.app.locals.db,{}, (json)=>{
        res.json(json);
    });
};

// Display detail page for a specific Membre.
exports.membre_detail = function(req, res) {

    Membre.getCollectionByFiltre(req.app.locals.db,{_id : parseInt(req.params.id)}, (json)=>{
        res.json(json);
    });
};

// Handle Membre create on POST.
exports.membre_create = function(req, res) {


    let params = req.body;
    Membre.createMembre (req.app.locals.db,params, (err,code,response)=>{

        if(!err){

            response.err = false;
            delete response.password;
            response.admin = false;
            if (response.role == "admin"){
                response.admin = true;
            }
            delete response.role;


            res.json(response);
        }
        else{
            res.json({"err": true, "code": code});
        }
    });

};


exports.membre_check_email_password = function(req, res) {

    let params = req.body;

    Membre.checkLoginAndPassword(req.app.locals.db,params,(result)=>{


        res.send(result);
    });

};

// Handle Membre delete.
exports.membre_delete_by_id = function(req, res) {

    Membre.deleteMembreById(req.app.locals.db,req.params.id, (err)=>{
        if(!err){
            res.send("Le document a bien été supprimé!");
        }
        else{
            res.send("Erreur lors de la suppression");
        }
    });
};

exports.membre_delete = function(req, res) {

    if (req.query.id != undefined){
        Membre.deleteMembreById(req.app.locals.db,parseInt(req.query.id), (err)=>{
            if(!err){
                res.send("Le document a bien été supprimé!");
            }
            else{
                res.send("Erreur lors de la suppression");
            }
        });
    }
    else if(req.query.email != undefined){
        Membre.deleteMembreByEmail(req.app.locals.db,req.query.email, (err)=>{
            if(!err){
                res.send("Le document a bien été supprimé!");
            }
            else{
                res.send("Erreur lors de la suppression");
            }
        });
    }
    else{
        res.send("Erreur : Aucun email ou id fournit");
    }

};

exports.membre_update = function(req, res) {

    let body_params = req.body;
    let id;
    if (req.params.id == undefined){
        if (body_params.id != undefined){
            id = body_params.id;
            delete body_params.id;
        }
    }
    else{
        id = req.params.id;
    }

    if (id == undefined){
        if (body_params.email == undefined){
            res.json({"err": true, "code":"Erreur lors de la mis à jour : Email ou id non fournit"});
            return;
        }
        else{
            let email = body_params.email;
            delete body_params.email;
            Membre.updateMembreByEmail(req.app.locals.db,body_params.email,body_params, (err,code)=>{
                if(!err){
                    res.json({"err": false});
                }
                else{
                    res.json({"err": true, "code": code});
                }
            });
        }
    }
    else{
        Membre.updateMembreById(req.app.locals.db,parseInt(id),body_params, (err,code)=>{
            if(!err){
                res.json({"err": false});
            }
            else{
                res.json({"err": true, "code": code});
            }
        });
    }

};
