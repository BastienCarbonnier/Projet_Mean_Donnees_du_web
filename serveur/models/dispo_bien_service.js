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

exports.getCollectionByFiltre = getCollectionByFiltre;
