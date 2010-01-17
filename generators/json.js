if (typeof JSON == 'undefined') require('../utils/JSON');

// TODO(ibolmo): modify arguments to include an `options` argument for output options.
exports.output = function (obj) {
	return JSON.stringify(obj, null, 4);
};
