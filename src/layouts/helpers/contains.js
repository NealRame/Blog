module.exports = function(collection, element) {
	if (collection != null) {
		return collection.indexOf(element) !== -1;
	}
	return false;
}
