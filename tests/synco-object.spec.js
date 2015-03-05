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
                object.messages().map(message => message.data()),
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
            messages.forEach(msg => {
                msg.process(clone);
            });

            expect(object.data(), 'to equal', clone.data());
        });
    })
});
