/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */

var express =require("express");
var async = require("async");
var config = require('../ressource/config/config');


var getCollectionByFiltre = function (db,collection,filtre,callback){
    db.collection(collection).find(filtre).toArray((err, documents)=> {
        callback(documents);
    });
};

var getReservationsWithDetails = function (db,collection,type,idBeneficiaire,callback){
    let filtre ={idBeneficiaire : idBeneficiaire};

    let results = [];
    db.collection(collection).find(filtre).toArray((err, documents)=> {
        async.forEachOf(documents, (value, key, callbackFor) => {
            let result = {};

            let id = parseInt(value["id"+type]);
            let filtre2 = {};
            filtre2._id = id;

            let collection2 = type+"s";

            result["id"+type] = id;

            result.idBeneficiaire = value.idBeneficiaire;
            result.idPreteur = value.idPreteur;
            result.creneaux = value.creneaux;
            console.log(filtre2);
            db.collection(collection2).find(filtre2).toArray((err, documents)=> {
                result.nom = documents[0].nom;
                result.descriptif = documents[0].descriptif;
                results.push(result);
                callbackFor();
            });

        }, err => {
            console.log(results);
            callback(results);
        });
    });
};


exports.getCollectionByFiltre = getCollectionByFiltre;
exports.getReservationsWithDetails = getReservationsWithDetails;
