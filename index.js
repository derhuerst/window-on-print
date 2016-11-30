'use strict'

const onPrint = (type, match) => (window, cb) => {
	let called = false, query, queryFn

	const cleanup = () => {
		if (queryFn) query.removeListener(queryFn)
		window.removeEventListener(type + 'print', onPrint, false)
		if (!called) {
			called = true
			cb()
		}
	}

	if (window.matchMedia) {
		queryFn = (query) => {
			if (query.matches === match) cleanup()
		}
		query = window.matchMedia('print')
		query.addListener(queryFn)
	}
	window.addEventListener(type + 'print', onPrint, false)
}

module.exports = {
	before: onPrint('before', true),
	after: onPrint('after', false),
	onPrint: onPrint
}
