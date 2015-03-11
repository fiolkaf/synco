var Message = require('./message');
var objectAssign = Object.assign || require('object.assign');

function NewMessage(uri, data) {
    if (uri[0] !== '/') {
        throw 'Uri must start with '/'/'/' character';
    }

    this.uri = uri;
    this.data = data;
    this.type = 'new';
}

NewMessage.prototype = new Message();

NewMessage.prototype.constructor = NewMessage;

NewMessage.prototype.process = function(object) {
    object = object || {};
    object._uri = this.uri;
    objectAssign(object, this.data);

    return object;
};

module.exports = NewMessage;
