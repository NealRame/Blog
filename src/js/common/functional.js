export function existy(value) {
	return value != null;
}

export function cat(head, ...args) {
	return existy(head) ? head.concat.apply(head, args) : [];
}

export function construct(head, tail) {
	return [head, ...tail];
}

export function dispatch(...funs) {
	return function(...args) {
		for (let fun of funs) {
			const ret = fun(...args);
			if (existy(ret)) {
				return ret;
			}
		}
	};
}

export function nodify(resolve, reject) {
	return function(err, ...args) {
		if (err) {
			reject(err);
		} else {
			resolve(...args);
		}
	};
}

export default {
	cat,
	construct,
	dispatch,
	existy,
	nodify
};
