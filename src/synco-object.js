var messages = require('./messages');
var objectUtils = require('./data/object-utils');

function SyncoObject(data) {
    this._data = data || {};
}

SyncoObject.prototype.new = function(uri, data) {
    return this.process(messages.new(uri, data));
};

SyncoObject.prototype.delete = function(uri) {
    return this.process(messages.delete(uri));
};

SyncoObject.prototype.set = function(uri, data) {
    return this.process(messages.set(uri, data));
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
    return objectUtils.getUris(this.data())
        .map(item => messages.set(item.uri, item.value));
};

SyncoObject.prototype.data = function() {
    return this._data;
};

module.exports = data => {
    return new SyncoObject(data);
};
