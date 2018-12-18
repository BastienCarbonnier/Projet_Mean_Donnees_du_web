var isEmailInGoodFormat = function(email_to_check){
  // définition d'une expression régulière matchant les emails
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // on retourne le test de notre chaine de caractère (email_to_check)
  return regex.test(email_to_check);
};

module.exports = {
  isEmailInGoodFormat: isEmailInGoodFormat
};
