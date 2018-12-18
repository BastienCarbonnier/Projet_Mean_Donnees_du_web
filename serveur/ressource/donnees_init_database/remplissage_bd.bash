mongoimport --db base_troc --collection Membres --file ./membres.json --drop --jsonArray
mongoimport --db base_troc --collection Biens --file ./biens.json --drop --jsonArray
mongoimport --db base_troc --collection Services --file ./services.json --drop --jsonArray
mongoimport --db base_troc --collection DisponibilitesBiens --file ./disponibilitesBiens.json --drop --jsonArray
mongoimport --db base_troc --collection DisponibilitesServices --file ./disponibilitesServices.json --drop --jsonArray
mongoimport --db base_troc --collection UtilisationsBiens --file ./utilisationsBiens.json --drop --jsonArray
mongoimport --db base_troc --collection UtilisationsServices --file ./utilisationsServices.json --drop --jsonArray