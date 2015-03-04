var Observable = require('./src/mixin/observable');
var Disposable = require('./src/mixin/disposable');
var RemoteObject = require('./src/remote-object');
var Observables = require('./src/observable/observables');

module.exports = {
    RemoteObject: RemoteObject,
    ObservableObject: Observables.ObservableObject,
    ObservableArray: Observables.ObservableArray,
    Mixin: {
        Observable: Observable,
        Disposable: Disposable
    }
};
