var expect = require('unexpected');
var synco = require('../src/synco-object');

describe('syncoObject', function() {
    describe('create', function() {
        it('can create new synco object', function() {
            var object = synco({id : '/root'});
            expect(object, 'to be defined');
        });
        it('can create new synco object from messages', function() {
            var object = synco({ id: '/root' })
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/id', {})
                .set('/root/array/id/property', true)
                .data();

            expect(object, 'to equal', {
                id: '/root',
                name: 'test_name',
                array: [{
                    id: '/root/array/id',
                    property: true
                }]
            });
        });
        it('can create new object with data', function() {
            var syncoObj = synco({
                id: '/uri',
                name: 'name',
                type: 'type'
            });

            expect(syncoObj.data(), 'to equal', {
                id: '/uri',
                name: 'name',
                type: 'type'
            });
        });
    });
    describe('set', function() {
        it('can set root element properties', function() {
            var object = { id: '/', car: 'beetle'};
            synco(object).set('/', { fruit: 'orange' });
            expect(object, 'to equal', {
                id : '/',
                fruit: 'orange'
            });
        });
        it('can set root property', function() {
            var object = { id: '/root'};
            synco(object)
                .set('/root/name', 'orange')
                .set('/root/name', 'apple');

            expect(object.id, 'to equal', '/root');
            expect(object.name, 'to equal', 'apple');
        });
        it('can set nested property', function() {
            var obj = { id: '/root', object: {} };
            synco(obj)
                .set('/root/object/name', 'orange')
                .set('/root/object/name', 'apple');

            expect(obj.id, 'to equal', '/root');
            expect(obj.object.name, 'to equal', 'apple');
        });
        it('can set property in non existing path', function() {
            var obj = { id: '/root'};
            synco(obj)
                .set('/root/object/name', 'orange')
                .set('/root/object/name', 'apple');

            expect(obj.id, 'to equal', '/root');
            expect(obj.object.name, 'to equal', 'apple');
        });
        it('can set property in non existing nested path', function() {
            var obj = { id: '/root'};
            synco(obj)
                .set('/root/object/object/name', 'orange')
                .set('/root/object/object/name', 'apple');

            expect(obj.id, 'to equal', '/root');
            expect(obj.object.object.name, 'to equal', 'apple');
        });
    });
    describe('update', function() {
        it('can update root element properties', function() {
            var object = {id: '/'};
            synco(object).update('/', { fruit: 'orange' });
            synco(object).update('/', { car: 'beetle' });

            expect(object, 'to equal', {
                id: '/',
                fruit: 'orange',
                car: 'beetle'
            });
        });
        it('can update root property', function() {
            var object = {id: '/root'};
            synco(object)
                .update('/root/name', 'orange')
                .update('/root/name', 'apple');

            expect(object.id, 'to equal', '/root');
            expect(object.name, 'to equal', 'apple');
        });
        it('can set nested property', function() {
            var obj = { id: '/root', object: {} };
            synco(obj)
                .update('/root/object/name', 'orange')
                .update('/root/object/name', 'apple');

            expect(obj.id, 'to equal', '/root');
            expect(obj.object.name, 'to equal', 'apple');
        });
        it('can set property in non existing path', function() {
            var obj = { id: '/root'};
            synco(obj)
                .update('/root/object/name', 'orange')
                .update('/root/object/name', 'apple');

            expect(obj.id, 'to equal', '/root');
            expect(obj.object.name, 'to equal', 'apple');
        });
        it('can set property in non existing nested path', function() {
            var obj = { id: '/root'};
            synco(obj)
                .update('/root/object/object/name', 'orange')
                .update('/root/object/object/name', 'apple');

            expect(obj.id, 'to equal', '/root');
            expect(obj.object.object.name, 'to equal', 'apple');
        });
        it('can insert new item as update to an empty array', function() {
            var object = synco({ id: '/settings' })
                .update('/settings/items', [{id: '/settings/items/1'}])
                .data();

            expect(object, 'to equal', {
                id: '/settings',
                items: [{
                    id: '/settings/items/1'
                }]
            });
        });
        it('can insert new item as update to non empty array', function() {
            var object = synco({ id: '/settings', items: [{ id: '/settings/items/2'}] })
                .update('/settings/items', [ {id: '/settings/items/1'} ])
                .data();

            expect(object, 'to equal', {
                id: '/settings',
                items: [{
                    id: '/settings/items/2'
                }, {
                    id: '/settings/items/1'
                }]
            });
        });
        it('can update to array item', function() {
            var object = synco({ id: '/settings', items: [{ id: '/settings/items/2', name: 'name'}] })
                .update('/settings/items', [ {id: '/settings/items/2', name: 'new name'} ])
                .data();

            expect(object, 'to equal', {
                id: '/settings',
                items: [{
                    id: '/settings/items/2',
                    name: 'new name'
                }]
            });
        });
    });
    describe('delete', function() {
        it('can delete array from synco object', function() {
            var object = synco({ id: '/root' })
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/id0', {})
                .set('/root/array/id0/property', true)
                .delete('/root/array')
                .data();

            expect(object, 'to equal', {
                id: '/root',
                name: 'test_name'
            });
        });
        it('can delete property from synco object', function() {
            var object = synco({id: '/root'})
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/id0', {})
                .set('/root/array/id0/property', true)
                .delete('/root/name')
                .data();

            expect(object, 'to equal', {
                id: '/root',
                array: [
                    {
                        id: '/root/array/id0',
                        property: true
                    }
                ]
            });
        });
        it('can delete array item from synco object', function() {
            var object = synco({id: '/root'})
                .set('/root/name', 'test_name')
                .set('/root/array', [])
                .set('/root/array/id0', {})
                .set('/root/array/id0/property', true)
                .delete('/root/array/id0')
                .data();
            expect(object, 'to equal', {
                id: '/root',
                name: 'test_name',
                array: []
            });
        });
    });
    describe('clone', function() {
        it('can get synco messages', function() {
            var object = synco({
                id: '/root',
                name: 'test_name',
                array: [{
                    id: '/root/array/id0',
                    property: true
                }]
            });

            expect(
                object.messages().map(message => message.getData()),
                'to equal', [
                    { id: '/root/id', type: 'set', data: '/root'},
                    { id: '/root/name', type: 'set', data: 'test_name'},
                    { id: '/root/array', type: 'set', data: []},
                    { id: '/root/array/id0', type: 'set', data: {}},
                    { id: '/root/array/id0/id', type: 'set', data: '/root/array/id0'},
                    { id: '/root/array/id0/property', type: 'set', data: true}
                ]);
        });
        it('can clone synco objects', function() {
            var object = synco({
                id: '/root',
                name: 'test_name',
                array: [{
                    id: '/root/array/id0',
                    property: true
                },
                {
                    id: '/root/array/id1',
                    array: [
                        {id: '/root/array/id1/array/1'},
                        {id: '/root/array/id1/array/2'}
                    ],
                    object: {
                        text: 'hello world',
                        array: [{
                            id: '/root/array/id1/object/array/id1',
                            text: 'txt'
                        }]
                    }
                }]
            });
            var clone = synco({ id: '/root' });
            var messages = object.messages();
            clone.process(messages);

            expect(object.data(), 'to equal', clone.data());
        });
    });
});
