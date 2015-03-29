var Message = require('./message');
var objectUtils = require('../data/object-utils');

function GetMessage(id) {
    if (!id || id[0] !== '/') {
        throw 'uri must start with '/'/'/' character';
    }
    this.id = id;
    this.type = 'get';
}

GetMessage.prototype = new Message();

GetMessage.prototype.constructor = GetMessage;

GetMessage.prototype.process = function(object) {
    if (!object.id) {
        throw 'Object must have id defined: ' + JSON.stringify(object);
    }
    var index = this.id.indexOf(object.id);
    if ( index !== 0) {
        throw 'Message and object id do not match';
    }

    if (this.id.length === object.id.length) {
        return object;
    }

    var keys = this.id.substring(object.id.length).split('/').filter(i => i);
    var key = keys.pop();
    var leaf = objectUtils.findDescendant(object, keys);
    if (leaf === null) {
        return null; // Object does not contain this part
    }

    if (Array.isArray(leaf)) {
        var arr = leaf.filter( item => {
            return item.id.split('/').pop() === key;
        });
        return arr.length ? arr[0] : null;
    } else {
        return leaf[key];
    }
};

module.exports = GetMessage;
