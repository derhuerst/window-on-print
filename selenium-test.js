'use strict'

const webdriver = require('webdriverio')
const so = require('so')
const assert = require('assert')

const user = process.env.SAUCE_USERNAME
const key = process.env.SAUCE_ACCESS_KEY
const build = process.env.TRAVIS_BUILD_NUMBER
const job = process.env.TRAVIS_JOB_NUMBER
const platform = process.env.PLATFORM

console.log(`Using Chrome on ${platform}.`)



const runner = webdriver.remote({
	user, key, host: 'localhost', port: 4445,
	logLevel: 'silent',
	desiredCapabilities: {
		build, 'tunnel-identifier': job, name: 'selenium-test',
		browserName: 'chrome', platform,
		recordScreenshots: false,
		chromeOptions: {
			args: ['--kiosk', '--kiosk-printing']
		}
	}
})

so(function* () {
	yield runner.init()
	yield runner.url(`http://localhost:8080/example.html`)

	const before = yield runner.execute(() => ({
		beforeprint: document.getElementById('beforeprint').checked,
		afterprint: document.getElementById('afterprint').checked
	}))

	assert.strictEqual(before.value.beforeprint, false)
	assert.strictEqual(before.value.afterprint, false)

	console.log('Printing.')
	yield runner.execute(() => window.print())
	yield runner.keys(['Escape']) // try to proceed somehow

	const after = yield runner.execute(() => ({
		beforeprint: document.getElementById('beforeprint').checked,
		afterprint: document.getElementById('afterprint').checked
	}))

	assert.strictEqual(after.value.beforeprint, true)
	assert.strictEqual(after.value.afterprint, true)

	yield runner.end()
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
