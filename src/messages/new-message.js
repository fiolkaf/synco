var Message = require('./message');

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

module.exports = NewMessage;
