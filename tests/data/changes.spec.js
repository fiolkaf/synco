var expect = require('unexpected/unexpected');
var Changes = require('../../src/data/changes');
var ObservableObject = require('../../src/observable/observable').ObservableObject;

describe('Changes', function() {
    describe('mapObservableChange', function() {
        describe('set', function() {
            it('generates a set message for set change', () => {
                var object = new ObservableObject({
                    test: false
                });
                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.test = true;
                expect(changes, 'to equal', [ { type: 'set', uri: '/test', value: true }]);
            });
            it('generates a set message for set change', () => {
                var object = new ObservableObject({
                    obj: {
                        test: false
                    }
                });
                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.obj.test = true;
                expect(changes, 'to equal', [ { uri: '/obj/test', type: 'set', value: true }]);
            });
            it('generates a set message for objects nested in arrays', () => {
                var object = new ObservableObject({
                    array: [ {
                        id: 'id1',
                        value: 1
                    }]
                });
                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array[0].value = 2;
                expect(changes, 'to equal', [
                    { uri: '/array/id1/value', type: 'set', value: 2 }
                ]);
            });
        });
        describe('splice', function() {
            it('generates a set message for splice', () => {
                var object = new ObservableObject({
                    array: [ 1, 2, 3, 4]
                });
                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.splice(2, 1, 8, 9);
                expect(changes, 'to equal', [
                    { uri: '/array/3', type: 'delete'},
                    { uri: '/array/8', type: 'set', value: 8 },
                    { uri: '/array/9', type: 'set', value: 9 }
                ]);
            });
            it('generates a set message for splice identified objects', () => {
                var object = new ObservableObject({
                    array: [ {
                        id: 'id1',
                        value: 1
                    }, {
                        id: 'id2',
                        value: 2
                    },{
                        id: 'id3',
                        value: 3
                    }, {
                        id: 'id4',
                        value: 4
                    }, {
                        id: 'id5',
                        value: 5
                    }]
                });
                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.splice(2, 1, { id: 'id8', value: 8 }, { id: 'id9', value: 9 });
                expect(changes, 'to equal', [
                    { uri: '/array/id3', type: 'delete' },
                    { uri: '/array/id8', type: 'set', value: {}},
                    { uri: '/array/id8/id', type: 'set', value: 'id8' },
                    { uri: '/array/id8/value', type: 'set', value: 8 },
                    { uri: '/array/id9', type: 'set', value: {}},
                    { uri: '/array/id9/id', type: 'set', value: 'id9' },
                    { uri: '/array/id9/value', type: 'set', value: 9 },
                ]);
            });

        });
        describe('push', function() {
            it('generates a set message for push', () => {
                var object = new ObservableObject({
                    array: [ 1, 2, 3, 4]
                });
                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.push(4, 5, 6);
                expect(changes, 'to equal', [
                    { uri: '/array/4', type: 'set', value: 4},
                    { uri: '/array/5', type: 'set', value: 5 },
                    { uri: '/array/6', type: 'set', value: 6 }
                ]);
            });
            it('generates a set message for push identified objects', () => {
                var object = new ObservableObject({
                    array: [ {
                        id: 'id1',
                        value: 1
                    }, {
                        id: 'id2',
                        value: 2
                    }]
                });

                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.push({
                    id: 'id3',
                    value: 3
                }, {
                    id: 'id4',
                    value: 4
                });
                expect(changes, 'to equal', [
                    { uri: '/array/id3', type: 'set', value: {} },
                    { uri: '/array/id3/id', type: 'set', value: 'id3' },
                    { uri: '/array/id3/value', type: 'set', value: 3 },
                    { uri: '/array/id4', type: 'set', value: {} },
                    { uri: '/array/id4/id', type: 'set', value: 'id4' },
                    { uri: '/array/id4/value', type: 'set', value: 4 },
                ]);
            });
        });
        describe('unshift', function() {
            it('generates a set message for unshift', () => {
                var object = new ObservableObject({
                    array: [1, 2, 3, 4]
                });
                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.unshift(4, 5, 6);
                expect(changes, 'to equal', [
                    { uri: '/array/4', type: 'set', value: 4},
                    { uri: '/array/5', type: 'set', value: 5 },
                    { uri: '/array/6', type: 'set', value: 6 }
                ]);
            });
            it('generates a set message for push identified objects', () => {
                var object = new ObservableObject({
                    array: [ {
                        id: 'id1',
                        value: 1
                    }, {
                        id: 'id2',
                        value: 2
                    }]
                });

                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.push({
                    id: 'id3',
                    value: 3
                }, {
                    id: 'id4',
                    value: 4
                });
                expect(changes, 'to equal', [
                    { uri: '/array/id3', type: 'set', value: {} },
                    { uri: '/array/id3/id', type: 'set', value: 'id3' },
                    { uri: '/array/id3/value', type: 'set', value: 3 },
                    { uri: '/array/id4', type: 'set', value: {} },
                    { uri: '/array/id4/id', type: 'set', value: 'id4' },
                    { uri: '/array/id4/value', type: 'set', value: 4 },
                ]);
            });
        });
        describe('pop', function() {
            it('generates a message for pop', () => {
                var object = new ObservableObject({
                    array: [1, 2, 3, 4]
                });
                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.pop();
                expect(changes, 'to equal', [
                    { uri: '/array/4', type: 'delete' }
                ]);
            });
            it('generates a message for push identified objects', () => {
                var object = new ObservableObject({
                    array: [ {
                        id: 'id1',
                        value: 1
                    }, {
                        id: 'id2',
                        value: 2
                    }]
                });

                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.pop();
                expect(changes, 'to equal', [
                    { uri: '/array/id2', type: 'delete' },
                ]);
            });
        });
        describe('shift', function() {
            it('generates a set message for pop', () => {
                var object = new ObservableObject({
                    array: [1, 2, 3, 4]
                });
                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.pop();
                expect(changes, 'to equal', [
                    { uri: '/array/4', type: 'delete' }
                ]);
            });
            it('generates a set message for push identified objects', () => {
                var object = new ObservableObject({
                    array: [ {
                        id: 'id1',
                        value: 1
                    }, {
                        id: 'id2',
                        value: 2
                    }]
                });

                var changes;
                object.on('change', function(evt) {
                    changes = Changes.mapObservableChange('', evt);
                });
                object.array.pop();
                expect(changes, 'to equal', [
                    { uri: '/array/id2', type: 'delete' },
                ]);
            });
        });

    });
});
