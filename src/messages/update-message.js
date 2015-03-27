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
    if (typeof object[key] === 'undefined') {
        object[key] = Array.isArray(data) ? [] : {};
    }

    if (typeof(data) === 'object' && !Array.isArray(data)) {
        objectAssign(object[key], data);
        return;
    }

    if (Array.isArray(data)) {
        if (data.length > 1) {
            throw 'Update multiple items is not supported';
        } else if (data.length === 0) {
            return;
        }
        var array = object[key];

        var getId = item =>
            item.hasOwnProperty && item.hasOwnProperty('_uri') ? item._uri :
            item.hasOwnProperty && item.hasOwnProperty('_id') ? item._id :
            item;

        var items = array.filter(item => getId(item) === getId(data[0]));

        if (!items.length) {
            if (!data[0].hasOwnProperty('_id')) {
                data[0]._id = data[0]._uri.split('/').pop();
            }
            array.push(data[0]);
        } else if ( typeof data[0] === 'object') {
            objectAssign(items[0], data[0]);
        }
        return;
    }

    object[key] = data;
};

UpdateMessage.prototype.constructor = UpdateMessage;

module.exports = UpdateMessage;
