var Message = require('./message');
var objectUtils = require('../data/object-utils');
var objectAssign = Object.assign || require('object.assign');

function SetMessage(uri, data) {
    if (uri[0] !== '/') {
        throw 'Uri must start with '/'/'/' character';
    }
    this.uri = uri;
    this.type = 'set';
    this.data = data;
}

SetMessage.prototype = new Message();

SetMessage.prototype._updateRoot = function(object, data) {
    Object.keys(object)
        .filter(key => key !== '_uri')
        .forEach(key => {
            delete object[key];
        });

    objectAssign(object, this.data);
};

SetMessage.prototype._updateValue = function(object, key, data) {
    object[key] = data;
};

SetMessage.prototype.constructor = SetMessage;

SetMessage.prototype.process = function(object) {
    if (!object._uri) {
        throw 'Object must have _uri defined: ' + JSON.stringify(object);
    }
    var index = this.uri.indexOf(object._uri);
    if (index !== 0) {
        throw 'Message and object uri do not match';
    }

    var keys = this.uri.substring(object._uri.length).split('/').filter(i => i);
    if (!keys.length) {
        this._updateRoot(object, this.data);
        return object;
    }

    var key = keys.pop();
    var leaf = objectUtils.findDescendant(object, keys, true);

    if (Array.isArray(leaf)) {

        if (typeof this.data !== 'object') {
            leaf.push(this.data);
            return;
        }

        var items = leaf.filter( item => {
            return item._id === key;
        });
        if (items.length) {
            this._updateValue(leaf, leaf.indexOf(items[0]), this.data);
            return object;
        }
        this.data._id = key;
        leaf.push(this.data);

    } else {
        this._updateValue(leaf, key, this.data);
    }

    return object;
};

module.exports = SetMessage;
