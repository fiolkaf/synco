var NewMessage = require('./messages/new-message');
var SetMessage = require('./messages/set-message');
var GetMessage = require('./messages/get-message');
var UpdateMessage = require('./messages/update-message');
var DeleteMessage = require('./messages/delete-message');

module.exports = {
    new: (uri, data) => {
        return new NewMessage(uri, data);
    },
    set: (uri, value) => {
        return new SetMessage(uri, value);
    },
    update: (uri, value) => {
        return new UpdateMessage(uri, value);
    },
    get: uri => {
        return new GetMessage(uri);
    },
    delete: uri => {
        return new DeleteMessage(uri);
    },
    create: data => {
        switch (data.type) {
            case 'get': return new GetMessage(data.uri);
            case 'new': return new NewMessage(data.uri, data.data);
            case 'delete': return new DeleteMessage(data.uri);
            case 'set': return new SetMessage(data.uri, data.data);
            case 'update': return new UpdateMessage(data.uri, data.data);
        }
    }
};
