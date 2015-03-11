var SetMessage = require('./set-message');
var objectUtils = require('../data/object-utils');
var objectAssign = Object.assign || require('object.assign');

function UpdateMessage(uri, data) {
    if (uri[0] !== '/') {
        throw 'Uri must start with '/'/'/' character';
    }
    this.uri = uri;
    this.type = 'update';
    this.data = data;
}

UpdateMessage.prototype = new SetMessage('/');

UpdateMessage.prototype._updateRoot = function(object, data) {
    objectAssign(object, this.data);
};

UpdateMessage.prototype._updateValue = function(object, key, data) {
    if (typeof(data) === 'object' && !Array.isArray(data)) {
        objectAssign(object[key], data);
        return;
    }
    object[key] = data;
};

UpdateMessage.prototype.constructor = UpdateMessage;

module.exports = UpdateMessage;
