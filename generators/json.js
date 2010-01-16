if (typeof JSON == 'undefined') require('../utils/JSON');

// TODO(ibolmo): modify arguments to include an `options` argument for output options.
exports.output = function (out, obj) {
	out(JSON.stringify(obj, null, 4));
};
