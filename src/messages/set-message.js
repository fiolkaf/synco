var Message = require('./message');
var objectUtils = require('../data/object-utils');

function SetMessage(uri, value) {
    if (uri[0] !== '/') {
        throw 'Uri must start with '/'/'/' character';
    }
    this.uri = uri;
    this.type = 'set';
    this.value = value;
}

SetMessage.prototype = new Message();

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
    var key = keys.pop();
    var leaf = objectUtils.findDescendant(object, keys, true);

    if (Array.isArray(leaf)) {

        if (typeof this.value !== 'object') {
            leaf.push(this.value);
            return;
        }

        var items = leaf.filter( item => {
            return item._id === key;
        });
        if (items.length) {
            leaf[leaf.indexOf(items[0])] = this.value;
            return;
        }
        this.value._id = key;
        leaf.push(this.value);

    } else {
        leaf[key] = this.value;
    }

    return object;
};

module.exports = SetMessage;
