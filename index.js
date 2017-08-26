'use strict'

const onPrint = (type, match) => (window, cb) => {
	let called = false, query, queryFn

	const unsubscribe = () => {
		if (queryFn) query.removeListener(queryFn)
		window.removeEventListener(type + 'print', print, false)
	}

	const print = () => {
		if (called) return
		called = true
		cb()
	}

	if (window.matchMedia) {
		queryFn = (query) => {
			if (query.matches === match) print()
		}
		query = window.matchMedia('print')
		query.addListener(queryFn)
	} else {
		window.addEventListener(type + 'print', print, false)
	}

	return unsubscribe
}

module.exports = {
	before: onPrint('before', true),
	after: onPrint('after', false),
	onPrint: onPrint
}
