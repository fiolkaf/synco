var synco = require('../src/synco-object');
var expect = require('unexpected/unexpected');

describe('syncoObject', function() {
    describe('create', function() {
        it('can create new synco object', function() {
            var object = synco().new('/root');
            expect(object, 'to be defined');
        });
        it('can create new synco object from messages', function() {
            var object = synco()
                .new('/root')
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/id0', {})
                .set('/root/array/id0/property', true)
                .data();

            expect(object, 'to equal', {
                _uri: '/root',
                name: 'test_name',
                array: [{
                    _id: 'id0',
                    property: true
                }]
            });
        });
        it('can create new object with data', function() {
            var syncoObj = synco().new('/uri', {
                name: 'name',
                type: 'type'
            });

            expect(syncoObj.data(), 'to equal', {
                _uri: '/uri',
                name: 'name',
                type: 'type'
            });
        });
    });
    describe('set', function() {
        it('can set root element properties', function() {
            var object = {_uri: '/'};
            synco(object).set('/', { fruit: 'orange' });
            expect(object._uri, 'to equal', '/');
            expect(object.fruit, 'to equal', 'orange');
        });
        it('can set root property', function() {
            var object = {_uri: '/root'};
            synco(object)
                .set('/root/name', 'orange')
                .set('/root/name', 'apple');

            expect(object.name, 'to equal', 'apple');
        });
        it('can set nested property', function() {
            var obj = { _uri: '/root', object: {} };
            synco(obj)
                .set('/root/object/name', 'orange')
                .set('/root/object/name', 'apple');

            expect(obj.object.name, 'to equal', 'apple');
        });
        it('can set property in non existing path', function() {
            var obj = { _uri: '/root'};
            synco(obj)
                .set('/root/object/name', 'orange')
                .set('/root/object/name', 'apple');

            expect(obj.object.name, 'to equal', 'apple');
        });
        it('can set property in non existing nested path', function() {
            var obj = { _uri: '/root'};
            synco(obj)
                .set('/root/object/object/name', 'orange')
                .set('/root/object/object/name', 'apple');

            expect(obj.object.object.name, 'to equal', 'apple');
        });
    });
    describe('delete', function() {
        it('can delete array from synco object', function() {
            var object = synco()
                .new('/root')
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/id0', {})
                .set('/root/array/id0/property', true)
                .delete('/root/array')
                .data();

            expect(object, 'to equal', {
                _uri: '/root',
                name: 'test_name'
            });
        });
        it('can delete property from synco object', function() {
            var object = synco()
                .new('/root')
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/id0', {})
                .set('/root/array/id0/property', true)
                .delete('/root/name')
                .data();

            expect(object, 'to equal', {
                _uri: '/root',
                array: [
                    {
                        _id: 'id0',
                        property: true
                    }
                ]
            });
        });
        it('can delete array item from synco object', function() {
            var object = synco()
                .new('/root')
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/id0', {})
                .set('/root/array/id0/property', true)
                .delete('/root/array/id0')
                .data();

            expect(object, 'to equal', {
                _uri: '/root',
                name: 'test_name',
                array: []
            });
        });
        it('can delete array item from synco object', function() {
            var object = synco()
                .new('/root')
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/1', 1)
                .set('/root/array/2', 2)
                .set('/root/array/3', 3)
                .delete('/root/array/2')
                .data();

            expect(object, 'to equal', {
                _uri: '/root',
                name: 'test_name',
                array: [1, 3]
            });
        });
    });
    describe('clone', function() {
        it('can get synco messages', function() {
            var object = synco({
                _uri: '/root',
                name: 'test_name',
                array: [{
                    _id: 'id0',
                    property: true
                }]
            });

            expect(
                object.messages().map(message => message.getData()),
                'to equal', [
                    { uri: '/root/_uri', type: 'set', value: '/root'},
                    { uri: '/root/name', type: 'set', value: 'test_name'},
                    { uri: '/root/array', type: 'set', value: []},
                    { uri: '/root/array/id0', type: 'set', value: {}},
                    { uri: '/root/array/id0/_id', type: 'set', value: 'id0'},
                    { uri: '/root/array/id0/property', type: 'set', value: true}
                ]);
        });
        it('can clone synco objects', function() {
            var object = synco({
                _uri: '/root',
                name: 'test_name',
                array: [{
                    _id: 'id0',
                    property: true
                },
                {
                    _id: 'id1',
                    array: [1, 2, 3],
                    object: {
                        text: 'hello world',
                        array: [{
                            _id: 'id1',
                            text: 'txt'
                        }]
                    }
                }]
            });
            var clone = synco({_uri: '/root'});
            var messages = object.messages();
            clone.process(messages);

            expect(object.data(), 'to equal', clone.data());
        });
    })
});
