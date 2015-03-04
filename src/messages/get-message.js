var Message = require('./message');
var objectUtils = require('../data/objectUtils');

function GetMessage(uri, value) {
    if (uri[0] !== '/') {
        throw 'Uri must start with '/'/'/' character';
    }
    this.uri = uri;
    this.type = 'get';
    this.value = value;
}

GetMessage.prototype = new Message();

GetMessage.prototype.constructor = GetMessage;

GetMessage.prototype.process = function(object) {
    if (!object._uri) {
        throw 'Object must have _uri defined: ' + JSON.stringify(object);
    }
    var index = this.uri.indexOf(object._uri);
    if ( index !== 0) {
        throw 'Message and object uri do not match';
    }

    var keys = this.uri.substring(object._uri.length).split('/').filter(i => i);
    var key = keys.pop();
    var leaf = objectUtils.findDescendant(object, keys);
    if (leaf === null) {
        return null; // Object does not contain this part
    }

    if (Array.isArray(leaf)) {
        var arr = leaf.filter( item => {
            return item._id === key;
        });
        return arr.length ? arr[0] : null;
    } else {
        return leaf[key];
    }
};

module.exports = GetMessage;
