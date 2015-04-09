var NewMessage = require('./messages/new-message');
var SetMessage = require('./messages/set-message');
var GetMessage = require('./messages/get-message');
var UpdateMessage = require('./messages/update-message');
var DeleteMessage = require('./messages/delete-message');

module.exports = {
    set: (id, value) => {
        return new SetMessage(id, value);
    },
    update: (id, value) => {
        return new UpdateMessage(id, value);
    },
    get: id => {
        return new GetMessage(id);
    },
    delete: id => {
        return new DeleteMessage(id);
    },
    create: data => {
        switch (data.type) {
            case 'new': return new NewMessage(data.id, data.data);
            case 'get': return new GetMessage(data.id);
            case 'delete': return new DeleteMessage(data.id);
            case 'set': return new SetMessage(data.id, data.data);
            case 'update': return new UpdateMessage(data.id, data.data);
        }
    }
};
