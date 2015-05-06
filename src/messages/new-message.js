var Message = require('./message');
var objectUtils = require('../data/object-utils');

function NewMessage(id, data) {
    if (id[0] !== '/') {
        throw 'Id must start with '/'/'/' character';
    }
    this.id = id;
    this.type = 'new';
    this.data = data;
}

NewMessage.prototype = new Message();

NewMessage.prototype.constructor = NewMessage;

NewMessage.prototype.process = function(object) {
    if (!object.id) {
        throw 'Object must have id defined: ' + JSON.stringify(object);
    }

    var index = this.id.indexOf(object.id);
    if (index !== 0) {
        throw 'Message and object id do not match ' + this.id + ' <> ' + object.id;
    }

    var keys = this.id.substring(object.id.length).split('/').filter(i => i);
    if (!keys.length) {
        throw 'Message object id must be child of the root object: ! ' + object.id + ' < ' + this.id;
    }

    var leaf = objectUtils.findDescendant(object, keys, []);

    if (!Array.isArray(leaf)) {
        throw 'Object is not an array: ' + object.id + ', ' + this.id;
    }

    leaf.push(this.data);

    return object;
};

module.exports = NewMessage;
