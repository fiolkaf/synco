var messages = require('./messages');
var objectUtils = require('./data/object-utils');

function SyncoObject(data) {
    this._data = data || {};
}

SyncoObject.prototype.set = function(id, data) {
    return this.process(messages.set(id, data));
};

SyncoObject.prototype.update = function(id, data) {
    return this.process(messages.update(id, data));
};

SyncoObject.prototype.delete = function(id) {
    return this.process(messages.delete(id));
};

SyncoObject.prototype.get = function(id, data) {
    return messages.get(id).process(this._data);
};

SyncoObject.prototype.process = function(messages) {
    if (!Array.isArray(messages)) {
        messages = [messages];
    }

    messages.forEach(function(message) {
        message.process(this._data);
    }.bind(this));

    return this;
};

SyncoObject.prototype.messages = function() {
    return objectUtils.getIds(this.data())
        .map(item => messages.set(item.id, item.value));
};

SyncoObject.prototype.data = function() {
    return this._data;
};

module.exports = data => {
    return new SyncoObject(data);
};
