var _ = require('underscore');

module.exports = _.extend(
    require(__dirname + '/../config/environments/' + process.env.NODE_ENV + '.json') || {});
