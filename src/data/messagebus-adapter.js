var bussi = require('bussi');

module.exports = function MessageBusAdapter() {
    var channel = bussi.channel('data');

    this.sendChanges = function(uri, changes) {
        channel.publish('update' + uri, JSON.parse(JSON.stringify(changes)));
    };

    this.subscribeChanges = function(uri, callback) {
        return channel.subscribe('update' + uri, function(envelope) {
            callback(uri, JSON.parse(JSON.stringify(envelope.payload)));
        });
    };
};
