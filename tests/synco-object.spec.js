var synco = require('../src/synco-object');
var expect = require('unexpected/unexpected');

describe('syncoObject', function() {
    describe('init', function() {
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
        it('can modify synco object', function() {
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
        it('can get synco create messages', function() {
            var synco = synco({
                _uri: '/root',
                name: 'test_name',
                array: [{
                    _id: 'id0',
                    property: true
                }]
            });

            expect(
                synco.messages.map(message => message.data()),
                'to equal', [
                    { type: 'new', uri: '/root'},
                    { type: 'set', uri: '/root/name', value: 'test_name'},
                    { type: 'set', uri: '/root/array', value: []},
                    { type: 'set', uri: '/root/array/id0', value: {}},
                    { type: 'set', uri: '/root/array/id0', value: 'id0'},
                    { type: 'set', uri: '/root/array/id0/property', value: true}
                ]);
        });
    });
});
