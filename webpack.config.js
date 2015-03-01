//Load the default Brixo configuration
var webpackConfig = require('brixo-framework/config/webpack.config.js');

var _ = require('lodash');

//Override webpack settings here
module.exports = _.merge(webpackConfig,{
    entry: {application: 'main.js'}
});