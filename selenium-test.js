'use strict'

const webdriver = require('webdriverio')
const so = require('so')
const assert = require('assert')

const user = process.env.SAUCE_USERNAME
const key = process.env.SAUCE_ACCESS_KEY
const job = process.env.TRAVIS_JOB_NUMBER
const build = process.env.TRAVIS_BUILD_NUMBER



const browser = webdriver.remote({
	user, key, host: 'localhost', port: 4445,
	logLevel: 'silent',
	desiredCapabilities: {
		'tunnel-identifier': job, build, name: 'selenium-test',
		browserName: 'chrome',
		platform: 'Windows 10',
		recordScreenshots: false,
		chromeOptions: {args: ['--kiosk', '--kiosk-printing']}
	}
})

so(function* () {
	yield browser.init()
	yield browser.url(`http://localhost:8080/example.html`)

	const before = yield browser.execute(() => ({
		beforeprint: document.getElementById('beforeprint').checked,
		afterprint: document.getElementById('afterprint').checked
	}))

	console.log(before)
	assert.strictEqual(before.values.beforeprint, false)
	assert.strictEqual(before.values.afterprint, false)

	console.log('printing.')
	yield browser.execute(() => window.print())

	const after = yield browser.execute(() => ({
		beforeprint: document.getElementById('beforeprint').checked,
		afterprint: document.getElementById('afterprint').checked
	}))

	console.log(after)
	assert.strictEqual(after.values.beforeprint, true)
	assert.strictEqual(after.values.afterprint, true)

	yield browser.end()
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
