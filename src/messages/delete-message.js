var Message = require('./message');
var objectUtils = require('../data/object-utils');

function DeleteMessage(id) {
    if (id[0] !== '/') {
        throw 'Uri must start with '/'/'/' character';
    }

    this.id = id;
    this.type = 'delete';
}

DeleteMessage.prototype = new Message();

DeleteMessage.prototype.constructor = DeleteMessage;

DeleteMessage.prototype.process = function(object) {
    if (!object.id) {
        throw 'Object must have id defined: ' + JSON.stringify(object);
    }
    var index = this.id.indexOf(object.id);
    if (index !== 0) {
        throw 'Message and object uri do not match';
    }
    var keys = this.id.substring(object.id.length).split('/').filter(i => i);

    var key = keys.pop();
    var leaf = objectUtils.findDescendant(object, keys);
    if (leaf === null) {
        return object; // Object does not contain this part
    }

    if (Array.isArray(leaf)) {
        var items = leaf.filter( item => {
            return item.id.split('/').pop() === key;
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
