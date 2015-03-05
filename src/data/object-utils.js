function findDescendant(object, keys) {
    var key = keys.shift();
    if (typeof key === 'undefined') {
        return object;
    }

    if (Array.isArray(object)) {
        var items = object.filter( item => {
            return item._id == key;
        });

        if (items.length === 0) {
            throw 'Item not found ' + key + ': ' + JSON.stringify(object);
        }

        return findDescendant(items[0], keys);
    } else {
        return findDescendant(object[key], keys);
    }
}

function getUris(object, uri) {
    if (typeof uri === 'undefined') {
        uri = object._uri;
    }

    if (!uri) {
        throw 'Uri is not defined';
    }

    var result = [];
    Object.keys(object).forEach(function(key) {
        var property = object[key];
        if (typeof property !== 'object') {
            result.push({ uri: uri + '/' + key, value: property });
            return;
        }

        if (Array.isArray(property)) {
            result.push({ uri: uri + '/' + key, value: [] });
            property.forEach((item, i) => {
                if (typeof item !== 'object') {
                    result.push({ uri: uri + '/' + key + '/['+ i +']', value: item });
                    return;
                }

                if (Array.isArray(item)) {
                    throw 'Nested arrays not supported';
                }

                if (!item.hasOwnProperty('_id')) {
                    throw 'Unidentified array item found, all array items must have _id defined';
                }

                result.push({ uri: uri + '/' + key + '/' + item._id, value: {}});
                Array.prototype.push.apply(result, getUris(item, uri + '/' + key + '/' + item._id))
            })
        } else {
            result.push({ uri: uri + '/' + key, value: {} });
            Array.prototype.push.apply(result, getUris(property, uri + '/' + key));
        }
    });
    return result;
}

module.exports = {
    findDescendant: findDescendant,
    getUris: getUris
};
