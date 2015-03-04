var Changes = require('./data/changes');
var MessageBusAdapter = require('./data/messagebus-adapter');
var ObjectTraverse = require('./data/object-traverse');
var ObservableObject = require('../src/observable/observable').ObservableObject;
var messages = require('./messages');
var assign = Object.assign || require('object.assign');

function RemoteObject(data) {
    if (!data.uri || data.uri[0] !== '/') {
        throw 'Remote object must have uri which starts with \'\'\' ';
    }
    var self = new ObservableObject(data);

    var _receive = false;
    var changeLog = null;
    var _messageBus = new MessageBusAdapter();

    self.startChanges = function() {
        changeLog = [];
    };

    self.commitChanges = function() {
        sendChanges(changeLog);
        changeLog = null;
    };

    self.supressChanges = function() {
        changeLog = null;
    };

    function sendChanges(changes) {
        var result = [];
        changes.forEach(function(change) {
            Array.prototype.push.apply(result, Changes.mapObservableChange(data.uri, change));
        });

        self._trigger('changed', result);
        _messageBus.sendChanges(self.uri, result);
    }

    function subscribeRecordChanges(uri) {
        var unsubscribe = _messageBus.subscribeChanges(uri, receiveChanges);
        self.addDisposable(unsubscribe);
    }

    function receiveChanges(uri, messageList) {
        _receive = true;
        messageList.forEach(message => {
            messages.create(message).process(self);
        });
        _receive = false;
    }

    var unsubscribe = self.on('change', function(change) {
        var changeInfo = ObjectTraverse.getLastUriByPath(self, change.key);
        if (self !== changeInfo.object) {
            return;
        }

        if (changeInfo.path === 'uri') {
            subscribeRecordChanges(data.uri);
        }

        if (_receive) {
            return;
        }

        if (!self.uri) {
            return;
        }

        if (changeLog) {
            changeLog.push(change);
        } else {
            sendChanges([change]);
        }

    });

    self.addDisposable(unsubscribe);
    if (data && data.uri) {
        subscribeRecordChanges(data.uri);
    }

    return self;
}

module.exports = RemoteObject;
