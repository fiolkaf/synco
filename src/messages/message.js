function Message() {}

Message.prototype.data = function() {
    return JSON.parse(JSON.stringify(this));
}

module.exports = Message;
