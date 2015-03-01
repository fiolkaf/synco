var Message = require('./message');

function NewMessage(uri) {
    if (uri[0] !== '/') {
        throw 'Uri must start with '/'/'/' character';
    }

    this.uri = uri;
    this.type = 'new';
}

NewMessage.prototype = new Message();

NewMessage.prototype.constructor = NewMessage;

NewMessage.prototype.process = function(object) {
    object = object || {};
    object.uri = this.uri;
    return object;
};

module.exports = NewMessage;
