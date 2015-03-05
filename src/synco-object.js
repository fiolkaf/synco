var messages = require('./messages');
var objectUtils = require('./data/object-utils');

function SyncoObject(target) {
    target = target || {};
    target.new = this.new;
    target.delete = this.delete;
    target.set = this.set;
    target.process = this.process;
    target.data = this.data;
    target.messages = this.messages;

    return target;
}

SyncoObject.prototype.new = function(uri) {
    return this.process(messages.new(uri));
};

SyncoObject.prototype.delete = function(uri) {
    return this.process(messages.delete(uri));
};

SyncoObject.prototype.set = function(uri, value) {
    return this.process(messages.set(uri, value));
};

SyncoObject.prototype.process = function(messages) {
    if (!Array.isArray(messages)) {
        messages = [messages];
    }

    messages.forEach(message => message.process(this));

    return this;
};

SyncoObject.prototype.messages = function() {
    return objectUtils.getUris(this.data())
        .map(item => messages.set(item.uri, item.value));
};

SyncoObject.prototype.data = function() {
    return JSON.parse(JSON.stringify(this));
};

module.exports = data => {
    return new SyncoObject(data);
};
