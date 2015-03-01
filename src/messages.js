var NewMessage = require('./messages/new-message');
var SetMessage = require('./messages/set-message');
var GetMessage = require('./messages/get-message');
var DeleteMessage = require('./messages/delete-message');

module.exports = {
    new: (uri) => {
        return new NewMessage(uri);
    },
    set: (uri, value) => {
        return new SetMessage(uri, value);
    },
    get: (uri) => {
        return new GetMessage(uri);
    },
    delete: (uri) => {
        return new DeleteMessage(uri);
    }
};
