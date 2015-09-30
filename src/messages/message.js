function Message() {}

Message.prototype.getData = function() {
    return JSON.parse(JSON.stringify(this));
};

module.exports = Message;
