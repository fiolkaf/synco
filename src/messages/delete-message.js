var Message = require('./message');
var objectUtils = require('../data/objectUtils');

function DeleteMessage(uri) {
    if (uri[0] !== '/') {
        throw 'Uri must start with '/'/'/' character';
    }

    this.uri = uri;
    this.type = 'delete';
}

DeleteMessage.prototype = new Message();

DeleteMessage.prototype.consructor = DeleteMessage;

DeleteMessage.prototype.process = function(object) {
    if (!object.uri) {
        throw 'Object must have uri defined: ' + JSON.stringify(object);
    }
    var index = this.uri.indexOf(object.uri);
    if ( index !== 0) {
        throw 'Message and object uri do not match';
    }
    var keys = this.uri.substring(object.uri.length).split('/').filter(i => i);

    var key = keys.pop();
    var leaf = objectUtils.findDescendant(object, keys);
    if (typeof(leaf) === 'undefined') {
        return object; // Object does not contain this part
    }

    if (Array.isArray(leaf)) {
        var items = leaf.filter( item => {
            return item.hasOwnProperty('id') ? item.id === key : item === key;
        });

        if (items.length === 0) {
            throw 'Item not found ' + key + ': ' + JSON.stringify(leaf);
        }

        leaf.splice(leaf.indexOf(items[0]), 1);
    } else {
        if (leaf.hasOwnProperty(key)) {
            delete leaf[key];
        }
    }

    return object;
};

module.exports = DeleteMessage;
