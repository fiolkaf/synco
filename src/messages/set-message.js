var Message = require('./message');
var objectUtils = require('../data/objectUtils');

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
    if (leaf === null) {
        return; // Object does not contain this part
    }

    if (Array.isArray(leaf)) {
        var items = leaf.filter( item => {
            return item.id === key;
        });

        if (items.length) {
            leaf[leaf.indexOf(items[0])] = this.value;
            return;
        }

        this.value.id = key;
        leaf.push(this.value);
    } else {
        leaf[key] = this.value;
    }

    return object;
};

module.exports = SetMessage;
