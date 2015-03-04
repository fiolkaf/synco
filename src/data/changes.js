var messages = require('../messages');

function mapInsert(uri, item, index) {
    var result = [];
    if (typeof item === 'object') {
        if (!item.id) {
            throw 'Object must have id defined';
        }
        var itemUri = uri + '/' + item.id;
        result.push(messages.set(itemUri, {}).data());
        Object.keys(item).filter(key => typeof item[key] !== 'function').forEach(function(key) {
            result.push(messages.set(itemUri + '/' + key, item[key], index).data());
        });
    } else {
        result.push(messages.set(uri + '/' + item, item, index).data());
    }
    return result;
}

function mapDelete(uri, item) {
    var id = item.id ? item.id : item;
    return messages.delete(uri + '/' + id, item).data();
}

function mapObservableChange(uri, evt) {
    var result = [];
    var itemUri = uri + '/' + evt.key.replace(/\./g, '/');
    switch(evt.type) {
        case 'set':
            result.push(messages.set(itemUri, evt.value).data());
        break;
        case 'splice':
            var startIndex = evt.args[0];
            var deleted = Array.isArray(evt.result) ? evt.result : [evt.result];
            var inserted = Array.prototype.slice.call(evt.args, 2);
            result = deleted.map(item => mapDelete(itemUri, item));
            inserted.forEach( (item, index) => {
                Array.prototype.push.apply(result, mapInsert(itemUri, item, index + startIndex));
            });
        break;
        case 'push':
            evt.args.map((item, index) => {
                Array.prototype.push.apply(result, mapInsert(itemUri, item, evt.result - evt.args.length + index));
            });
        break;
        case 'unshift':
            evt.args.forEach((item, index) => {
                Array.prototype.push.apply(result, mapInsert(itemUri, item, index));
            });
        break;
        case 'pop':
        case 'shift':
            result.push(mapDelete(itemUri, evt.result));
        break;
        default:
            throw evt.type + ' id not supported';

    }
    return result;
}

module.exports = {
    mapObservableChange: mapObservableChange
};
