/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */

var express =require("express");
var assert = require("assert");
var async = require("async");
var config = require('../ressource/config/config');
var email_checker = require('./email_checker');

var getCollectionByFiltre = function (db,filtre,callback){
    db.collection("Membres").find(filtre).toArray((err, documents)=> {
        callback(documents);
    });
};
var getNewId = function (db,callback){
    db.collection("Membres").countDocuments((err, count)=> {
        callback(null,parseInt(count)+1);
    });

};

var createMembre = function (db,params,callback){
    let collection = "Membres";
    delete params._id;
    if (params.email == undefined || params.nom ==undefined || params.password == undefined || params.prenom ==undefined){
        callback(true,"Paramètre non présent ou mal nommé");
        return;
    }

    if(!email_checker.isEmailInGoodFormat(params.email)){
        callback(true,"Email mal formé");
        return;
    }
    if (params.role == undefined) params.role = "user";
    let new_membre = {};
    isMembreInDatabaseByEmail(db,params.email, isInDatabase => {
        if (!isInDatabase){
            getNewId(db,(err,newid)=>{
                new_membre._id = newid;
                new_membre.ratio = 0;
                async.forEachOf(params, (value, key, callback) => {
                    new_membre[key] = value;
                    callback();
                }, err => {
                    if (err) console.error(err.message);

                    db.collection(collection).insertOne(new_membre);
                    delete new_membre._id;
                    new_membre.id = newid;
                    callback(false,"",new_membre);
                });
            });

        }
        else{
            callback(true,"Email already use by a member");
        }


    });

};

var isMembreInDatabaseByEmail = function (db,email,callback){
    let filtre = { email: { $eq: String(email) } };
    let collection = "Membres";
    db.collection(collection).find(filtre).toArray((err, documents)=> {
        console.log(documents.length!==0);
        callback(documents.length!==0);
    });
};

var checkLoginAndPassword = function (db,params,callback){

    // db.Membres.find({$and:[{"email" : "bca@gmail.com"},{"password" : "facile"}]})
    let email = params.email;
    let password  = params.password;

    if (email== undefined || password==undefined) return callback(false);

    let filtre = { $and: [{ "email": String(email) }, {"password" : String(password)}]};
    let collection = "Membres";

    db.collection(collection).find(filtre).toArray((err, documents)=> {
        console.log(documents);
        let admin = false;
        if (documents[0].role == "admin") admin=true;
        let result = {
            "result" : documents[0] != undefined,
            "email" : documents[0].email,
            "id" : documents[0]._id,
            "admin" : admin,
            "nom": documents[0].nom,
            "prenom": documents[0].prenom,
            "ratio": documents[0].ratio
        };
        callback(result);
    });
};


var isMembreInDatabaseById = function (db,id,callback){
    let filtre = { _id: { $eq: parseInt(id) } };
    let collection = "Membres";
    db.collection(collection).find(filtre).toArray((err, documents)=> {
        console.log(documents.length!==0);
        callback(documents.length!==0);
    });
};


var deleteMembreById = function(db,id,callback){
    let collection = "Membres";
    db.collection(collection).deleteOne({ _id: parseInt(id) },function(err, obj) {
        if (err) callback(true);
        else callback(false);
    });
};

var deleteMembreByEmail = function(db,email,callback){
    let collection = "Membres";
    db.collection(collection).deleteOne({ email: String(email) },function(err, obj) {
        if (err) callback(true);
        else callback(false);
    });
};

var updateMembreById = function(db,id,params,callback){
    let updateObject = {$set:{}};
    let collection = "Membres";
    delete params._id;
    isMembreInDatabaseById(db,id, isInDatabase => {
        if (isInDatabase){
            if (params.email!=undefined){
                isMembreInDatabaseByEmail(db,params.email, isEmailUsed => {
                    if (isEmailUsed){
                        return callback(true,"Email already use by a member");
                    }
                    else{
                        async.forEachOf(params, (value, key, callback) => {
                            updateObject.$set[key] = value;
                            callback();
                        }, err => {
                            if (err) console.error(err.message);
                            db.collection(collection).updateOne({ _id: id },updateObject);
                            callback(false);
                            return;
                        });
                    }
                });
            }
            else{
                async.forEachOf(params, (value, key, callback) => {
                    updateObject.$set[key] = value;
                    callback();
                }, err => {
                    if (err) console.error(err.message);
                    db.collection(collection).updateOne({ _id: id },updateObject);
                    callback(false);
                    return;
                });
            }
        }
        else{
            callback(true,"Document non présent dans la database, Veuillez le créer au préalable");
        }

    });
};

var updateMembreByEmail = function(db,email,params,callback){
    let updateObject = {$set:{}};
    let collection = "Membres";
    delete params._id;
    isMembreInDatabaseByEmail(db,email, isInDatabase => {
        if (isInDatabase){
            async.forEachOf(params, (value, key, callback) => {
                updateObject.$set[key] = value;
                callback();
            }, err => {
                if (err) console.error(err.message);
                db.collection(collection).updateOne({ email: email },updateObject);
                callback(false);
                return;
            });
        }
        else{
            callback(true,"Document non présent dans la database, Veuillez le créer au préalable");
        }

    });
};

exports.getCollectionByFiltre = getCollectionByFiltre;
exports.createMembre = createMembre;
exports.deleteMembreById  = deleteMembreById;
exports.deleteMembreByEmail = deleteMembreByEmail;
exports.updateMembreById  = updateMembreById;
exports.updateMembreByEmail = updateMembreByEmail;
exports.checkLoginAndPassword = checkLoginAndPassword;
