/*jslint node: true */
/*jshint esversion: 6 */
/* jshint expr: true */

var express =require("express");
var assert = require("assert");
var async = require("async");
var config = require('../ressource/config/config');


var getBiensOrServicesByDateAndKeywords = function (db,collection,dateMin,dateMax,ordreDate,keywords,res,callbackglobal){
    console.log(keywords);

    if (typeof keywords =="string"){
        let tab = [];
        tab.push(keywords);
        keywords = tab;
    }
    // db.DisponibilitesBiens.find({ "dates.date": {$gte: ISODate("2019-01-24T00:00:00.000Z")}}).pretty();
    //db.DisponibilitesBiens.find({ 'dates.date': {$gte: ISODate("2019-01-08T00:00:00.000Z")}},{'dates.$': 1}).pretty();
    //db.DisponibilitesBiens.find({ 'dates.date': {$gte: ISODate("2019-01-07T00:00:00.000Z")}},{'dates.$': 1, idBien : 1}).pretty();

    //db.DisponibilitesBiens.find({ 'dates.date': {$lte: ISODate("2019-01-24T00:00:00.000Z")}},{'dates.$': 1, idBien : 1}).sort({'dates.date': 1}).pretty();

    async.waterfall([
        //On récupère les ids des biens contenant les mots clés
        function(callback){
            if (keywords!=undefined && keywords.length != 0){
                db.collection(collection).find({motsClefs: {$elemMatch:{ $in: keywords}}}).toArray((err, documents)=> {
                    //console.log(documents);
                    callback(null,documents);
                });
            }
            else{
                db.collection(collection).find({}).toArray((err, documents)=> {
                    callback(null,documents);
                });
            }

        },
        // On récupère les disponibilites de biens ou service fournit
        function(doc,callback){
            let filtre =  { $or: []} ;
            async.forEachOf(doc, (value, key, callback) => {
                let id_key = String("id"+collection.substring(0,collection.length-1));

                let newOb = {};
                newOb[id_key]= doc[key]._id;
                filtre.$or.push(newOb);
                callback();
            }, err => {
                if (err) console.error(err.message);


                let filtre_sort = { $push: { dates: { $each: [ ], $sort: parseInt(ordreDate) } } };
                db.collection("Disponibilites"+collection).updateMany(filtre,filtre_sort, (err)=> {
                    db.collection("Disponibilites"+collection).find(filtre).toArray((err, dispoParId)=> {
                        callback(null,dispoParId,doc);
                    });
                });

            });
        },
        function(dispoParId,doc,callback){

            let dispoFinal = [];
            let newDoc = {};
            //console.log(dispoParId);
            async.forEachOf(dispoParId, (value, key, callback_for) => {
                newDoc = {};
                let id = value["id"+collection.substring(0,collection.length-1)];

                newDoc["id"+collection.substring(0,collection.length-1)] = id;

                newDoc.value = doc[key];
                newDoc.nom = doc[key].nom;
                newDoc.descriptif =  doc[key].descriptif;
                newDoc.idMembre =  doc[key].idMembre;
                newDoc._id = doc[key]._id;
                newDoc.dates =[];

                async.each(value.dates, function(t,callback2) {

                    let dispo1 = {};
                    let dispo2 = {};
                    if (t.matin){
                        dispo1.date = t.date;
                        dispo1.matin = true;
                    }
                    if(t.aprem){
                        dispo2.date = t.date;
                        dispo2.aprem = true;
                    }


                    let date = new Date(t.date);

                    let day = date.getDate();
                    let month = date.getMonth() +1;
                    let year = date.getFullYear();

                    let dayString = (day<10)?"0"+day:day;
                    let monthString = (month<10)?"0"+month:month;

                    let dateString = dayString+":"+monthString+":"+year;

                    let aff = dateString + " : ";
                    let ensDate =[];
                    if(Object.keys(dispo1).length !== 0){
                        dispo1.aff = aff + "matin";
                        ensDate.push(dispo1);
                    }

                    if(Object.keys(dispo2).length !== 0){
                        dispo2.aff = aff+"après-midi";
                        ensDate.push(dispo2);
                    }

                    if (dateMin!==undefined && dateMax!==undefined){
                        if(t.date>=dateMin && t.date <=dateMax) {
                            newDoc.dates.push.apply(newDoc.dates,ensDate);
                        }
                    }
                    else if (dateMin!==undefined && dateMax===undefined) {
                        if(t.date>=dateMin) {
                            newDoc.dates.push.apply(newDoc.dates,ensDate);
                        }
                    }
                    else if (dateMin===undefined && dateMax!==undefined) {
                        if(t.date<=dateMax) {
                            newDoc.dates.push.apply(newDoc.dates,ensDate);
                        }
                    }
                    else{
                        newDoc.dates.push.apply(newDoc.dates,ensDate);
                    }
                    callback2();
                }, function(err) {

                    if(err) {
                        console.log(err);
                    }
                    else {

                        console.log("success");
                    }
                });
                if (newDoc.dates.length != 0){
                    dispoFinal.push(newDoc);
                }
                callback_for();

            }, (err) => {
                if (err) console.error(err.message);

                callback(null,dispoFinal);

            });
        }
    ], function (err, result) {
          callbackglobal(err,result);
      });

};


var getDispoForBiensOrServicesById = function(db,collection,id,dateMin,dateMax,callback){
    let filtre = {};
    // db.DisponibilitesBiens.find({ 'dates.date': {$gte: ISODate("2019-01-07T00:00:00.000Z")},"idBien":1},{'dates.$': 1, idBien : 1}).pretty();
    filtre["id"+collection.substring(0,collection.length-1)] = id;
    dateMin = new Date(dateMin);
    if (dateMax != undefined) dateMax = new Date(dateMax);
    //{ projection: {'dates.$': 1}}
    db.collection("Disponibilites"+collection).find(filtre).toArray((err, documents)=> {
        let dates =[];
        console.log(documents[0]);
        if(documents.length !== 0){
            async.forEachOf(documents[0].dates, (value, key, callbackFor) => {
                let date = new Date(value.date);
                if (dateMin<=date && (dateMax==undefined || date<=dateMax)){
                    let dispo1 = {};
                    let dispo2 = {};
                    if (value.matin){
                        dispo1.date = value.date;
                        dispo1.matin = true;
                    }
                    if(value.aprem){
                        dispo2.date = value.date;
                        dispo2.aprem = true;
                    }




                    let day = date.getDate();
                    let month = date.getMonth() +1;
                    let year = date.getFullYear();

                    let dayString = (day<10)?"0"+day:day;
                    let monthString = (month<10)?"0"+month:month;

                    let dateString = dayString+":"+monthString+":"+year;

                    let aff = dateString + " : ";
                    if(Object.keys(dispo1).length !== 0){
                        dispo1.aff = aff + "matin";
                        dates.push(dispo1);
                    }

                    if(Object.keys(dispo2).length !== 0){
                        dispo2.aff = aff+"après-midi";
                        dates.push(dispo2);
                    }
                }

                callbackFor();
            }, err => {
                callback({dates : dates});
            });
        }
        else{
            callback([]);
        }

    });
};

var getBiensOrServicesAndDispo = function(db,collection,idMembre,callback){
    let filtre = {};

    if(idMembre!= undefined)
        filtre.idMembre = idMembre;

    let biens = [];
    db.collection(collection).find(filtre).toArray((err, documents)=> {
        biens = documents;
        delete filtre.idMembre;
        async.forEachOf(biens, (value, key, callbackFor) => {

            filtre["id"+collection.substring(0,collection.length-1)] = value._id;

            db.collection("Disponibilites"+collection).find(filtre,{'dates.$': 1}).toArray((err, documents)=> {
                let dates =[];

                async.forEachOf(documents[0].dates, (value, key, callbackFor2) => {
                    let dispo1 = {};
                    let dispo2 = {};
                    if (value.matin){
                        dispo1.date = value.date;
                        dispo1.matin = true;
                    }
                    if(value.aprem){
                        dispo2.date = value.date;
                        dispo2.aprem = true;
                    }


                    let date = new Date(value.date);

                    let day = date.getDate();
                    let month = date.getMonth() +1;
                    let year = date.getFullYear();

                    let dayString = (day<10)?"0"+day:day;
                    let monthString = (month<10)?"0"+month:month;

                    let dateString = dayString+":"+monthString+":"+year;

                    let aff = dateString + " : ";
                    if(Object.keys(dispo1).length !== 0){
                        dispo1.aff = aff + "matin";
                        dates.push(dispo1);
                    }

                    if(Object.keys(dispo2).length !== 0){
                        dispo2.aff = aff+"après-midi";
                        dates.push(dispo2);
                    }
                    callbackFor2();
                }, err => {

                    biens[key].dates = dates;
                    callbackFor();
                });
            });

        }, err => {
            callback(biens);
        });

    });
};

var getBiensOrServicesByMembre  = function (db,collection,idMembre,callback){
    let filtre = {};
    filtre.idMembre = idMembre;
    db.collection(collection).find(filtre).toArray((err, documents)=> {
        callback(documents);
    });
};

var getCollectionByFiltre = function (db,collection,filtre,callback){
    db.collection(collection).find(filtre).toArray((err, documents)=> {
        callback(documents);
    });
};
var getNewId = function (db,collection,callback){
    db.collection(collection).countDocuments((err, count)=> {
        callback(null,parseInt(count)+1);
    });

};

var isMemberInDatabaseById = function (db,id,callback){
    let filtre = { _id: { $eq: parseInt(id) } };
    let collection = "Membres";
    db.collection(collection).find(filtre).toArray((err, documents)=> {
        callback(documents.length!==0);
    });
};
var isBienOrServiceInDatabaseById = function (db,collection,id,callback){
    let filtre = { _id: { $eq: parseInt(id) } };
    db.collection(collection).find(filtre).toArray((err, documents)=> {
        callback(documents.length!==0);
    });
};

var createBienOrService = function (db,collection,params,callback){
    delete params._id;
    if (params.idMembre == undefined || params.nom ==undefined || params.motsClefs == undefined || params.motsClefs.length ==0){
        callback(true,"Paramètre non présent ou mal nommé");
        return;
    }
    isMemberInDatabaseById(db,params.idMembre,(membreExist)=>{
        if (membreExist){
            getNewId(db,collection,(err,newid)=>{
                let new_doc = {};
                new_doc._id = newid;
                if (params.dates != undefined){
                    let dispo = {};
                    dispo["id"+collection.substring(0,collection.length-1)] = newid;
                    let dates = [];
                    let date;
                    async.forEachOf(params.dates, (value, key, callback) => {
                        date = {};
                        date.date = value.date;//new Date(value.date);
                        date.matin = true;
                        date.aprem = true;
                        dates.push(date);
                        callback();
                    }, err => {
                        if (err) callback(true);
                        dispo.dates=dates;
                        db.collection("Disponibilites"+collection).insertOne(dispo);

                        delete params.dates;

                        async.forEachOf(params, (value, key, callback) => {
                            new_doc[key] = value;
                            callback();
                        }, err => {
                            if (err) callback(true);
                            db.collection(collection).insertOne(new_doc);
                            callback(false);
                        });
                    });
                }
                else{
                    callback(true,"Un "+collection.substring(0,collection.length-1)+" ne peut être créé sans dates.");
                }

            });
        }
        else{
            callback(true,"Le membre n'existe pas");
            return;
        }
    });

};

var deleteBienOrServiceById = function(db,collection,id,callback){

    db.collection(collection).deleteOne({ _id: parseInt(id) },function(err, obj) {
        if (err) callback(true);
        else callback(false);
    });
};

var deleteBienOrServiceByIdMembre = function(db,collection,idMembre,callback){
    db.collection(collection).deleteMany({ idMembre: parseInt(idMembre)},function(err, obj) {
        if (err) callback(true);
        else callback(false);
    });
};
var empruntBienOrServiceById= function(db,collection,id,idMembre,params,callback){
    //console.log(params);
    let dates = params.dates;

    let filtre = {};
    filtre["id"+collection.substring(0,collection.length-1)] = id;

    async.forEachOf(dates, (value, key, callback) => {

        delete value.aff;
        filtre["dates.date"] = new Date(value.date);

        db.collection("Disponibilites"+collection).find(filtre,{ projection: {'dates.$': 1}}).toArray((err, documents)=> {

            let filtreUpdate = {};
            filtreUpdate["id"+collection.substring(0,collection.length-1)] = id;
            // {"idBien" : 1} {$pull:{dates: ISODate("2041-01-24T00:00:00.000Z")}}
            let newDate ={};
            let oldDate = documents[0].dates[0];
            newDate.date = new Date(value.date);

            newDate.matin = oldDate.matin;
            newDate.aprem = oldDate.aprem;
            console.log(newDate);
            if(value.matin == true)
                newDate.matin = false;
            if(value.aprem == true)
                newDate.aprem = false;

            console.log(newDate);
            db.collection("Disponibilites"+collection).updateOne(filtreUpdate,{ $pull: { dates: oldDate}},(err, count)=> {
                db.collection("Disponibilites"+collection).updateOne(filtreUpdate,{ $addToSet: { "dates": newDate}});
                addUtilisation(db,collection,id,idMembre,oldDate,value, (res)=>{
                });
            });
        });

        callback();
    }, err => {
        if (err) console.error(err.message);
    });
    callback(params);

};

var addUtilisation = function(db,collection,id,idBeneficiaire,oldDate,newDate,callback){

    let filtre = {};
    filtre["id"+collection.substring(0,collection.length-1)] = id;
    filtre.idBeneficiaire = idBeneficiaire;

    oldDate.matin = !oldDate.matin;
    oldDate.aprem = !oldDate.aprem;
    db.collection("Utilisations"+collection).find(filtre).toArray((err, documents)=> {
        console.log(documents);
        if (documents.length != 0){

            db.collection("Utilisations"+collection).updateOne(filtre,{ $pull: { creneaux: oldDate}},(err, count)=> {
                db.collection("Utilisations"+collection).updateOne(filtre,{ $addToSet: { "creneaux": newDate}},(err2, count2)=> {
                    console.log(count2);
                });
            });

        }
        else {
            let dates = [];
            dates.push(newDate);
            let newUtil = {};
            newUtil["id"+collection.substring(0,collection.length-1)] = id;
            newUtil.idBeneficiaire = idBeneficiaire;
            newUtil.creneaux = dates;
            db.collection("Utilisations"+collection).insertOne(newUtil);
        }
    });
    callback();

};
var updateBienOrServiceById = function(db,collection,id,params,callback){
    let setObject = {$set:{}};
    let unsetObject = {$unset:{}};
    delete params._id;
    isBienOrServiceInDatabaseById(db,collection,id, isInDatabase => {
        if (isInDatabase){
            if (params.dates != undefined){
                let dates = params.dates;
                delete params.dates;

                let filtre = {};
                filtre["id"+collection.substring(0,collection.length-1)] = id;

                async.forEachOf(dates, (value, key, callback) => {

                    filtre["dates.date"] = value.date;

                    db.collection("Disponibilites"+collection).find(filtre,{'dates.$': 1}).toArray((err, documents)=> {

                        if(documents.length!==0){
                            let filtreUpdate = {};
                            filtreUpdate["id"+collection.substring(0,collection.length-1)] = id;
                            // {"idBien" : 1} {$pull:{dates: ISODate("2041-01-24T00:00:00.000Z")}}
                            let newDate ={};
                            newDate.date = value.date;
                            newDate.matin = value.matin;
                            newDate.aprem = value.aprem;
                            db.collection("Disponibilites"+collection).updateOne(filtreUpdate,{ $pull: { dates: {date : value.date}}},(err, count)=> {
                                db.collection("Disponibilites"+collection).updateOne(filtreUpdate,{ $addToSet: { "dates": newDate}});
                            });
                        }
                        else{
                            let filtreUpdate = {};
                            filtreUpdate["id"+collection.substring(0,collection.length-1)] = id;
                            db.collection("Disponibilites"+collection).updateOne(filtreUpdate,{ $addToSet: { "dates": value}});
                        }
                    });

                    callback();
                }, err => {
                    if (err) console.error(err.message);
                });

            }
            async.forEachOf(params, (value, key, callback) => {
                if (value == null){
                    unsetObject.$unset[key] = "";
                }
                else{
                    setObject.$set[key] = value;
                }

                callback();
            }, err => {
                if (err) console.error(err.message);
                if (Object.keys(setObject.$set).length !== 0){
                    db.collection(collection).updateOne({ _id: id },setObject);
                }
                if (Object.keys(unsetObject.$unset).length !== 0){
                    db.collection(collection).updateOne({ _id: id },unsetObject);
                }
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
exports.getBiensOrServicesByMembre = getBiensOrServicesByMembre;
exports.getBiensOrServicesByDateAndKeywords = getBiensOrServicesByDateAndKeywords;
exports.getBiensOrServicesAndDispo = getBiensOrServicesAndDispo;
exports.getDispoForBiensOrServicesById = getDispoForBiensOrServicesById;
exports.createBienOrService = createBienOrService;
exports.deleteBienOrServiceById  = deleteBienOrServiceById;
exports.deleteBienOrServiceByIdMembre = deleteBienOrServiceByIdMembre;
exports.updateBienOrServiceById  = updateBienOrServiceById;
exports.empruntBienOrServiceById = empruntBienOrServiceById;
