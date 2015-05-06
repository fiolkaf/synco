var Message = require('./message');
var objectUtils = require('../data/object-utils');
var objectAssign = Object.assign || require('object.assign');

function SetMessage(id, data) {
    if (id[0] !== '/') {
        throw 'Id must start with '/'/'/' character';
    }
    this.id = id;
    this.type = 'set';
    this.data = data;
}

SetMessage.prototype = new Message();

SetMessage.prototype._updateRoot = function(object, data) {
    Object.keys(object)
        .filter(key => key !== 'id')
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
    if (!object.id) {
        throw 'Object must have id defined: ' + JSON.stringify(object);
    }
    var index = this.id.indexOf(object.id);
    if (index !== 0) {
        throw 'Message and object id do not match ' + this.id + ' <> ' + object.id;
    }

    var keys = this.id.substring(object.id.length).split('/').filter(i => i);
    if (!keys.length) {
        this._updateRoot(object, this.data);
        return object;
    }

    var key = keys.pop();
    var leaf = objectUtils.findDescendant(object, keys, {});

    if (Array.isArray(leaf)) {

        if (typeof this.data !== 'object') {
            leaf.push(this.data);
            return;
        }

        var items = leaf.filter( item => {
            return item.id.split('/').pop() === key;
        });
        if (items.length) {
            this._updateValue(leaf, leaf.indexOf(items[0]), this.data);
            return object;
        }
        this.data.id = this.id;
        leaf.push(this.data);

    } else {
        this._updateValue(leaf, key, this.data);
    }

    return object;
};

module.exports = SetMessage;
