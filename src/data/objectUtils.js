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

module.exports = {
    findDescendant: findDescendant
};
