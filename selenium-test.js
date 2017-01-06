'use strict'

const FirefoxProfile = require('firefox-profile')
const webdriver = require('webdriverio')
const so = require('so')
const assert = require('assert')

const user = process.env.SAUCE_USERNAME
const key = process.env.SAUCE_ACCESS_KEY
const build = process.env.TRAVIS_BUILD_NUMBER
const job = process.env.TRAVIS_JOB_NUMBER
const browser = process.env.BROWSER
const platform = process.env.PLATFORM

console.log(`Using ${browser} on ${platform}.`)

const config = {
	chrome: (opt) => {
		opt.chromeOptions = {
			args: ['--kiosk', '--kiosk-printing']
		}
		return Promise.resolve(opt)
	},
	firefox: (opt) => new Promise((yay, nay) => {
		const p = new FirefoxProfile()
		p.setPreference('pdfjs.disabled', true)
		p.setPreference('print.print_to_file', true)
		p.setPreference('print.use_global_printsettings', false)
		p.setPreference('print.show_print_progress', false)
		p.encoded((encoded) => {
			opt.firefox_profile = encoded
			yay(opt)
		})
	}),
	safari: (opt) => Promise.resolve(opt)
}



so(function* () {
	const opt = yield config[browser]({
		build, 'tunnel-identifier': job, name: 'selenium-test',
		browserName: browser, platform,
		recordScreenshots: false
	})
	console.log('capabilities', opt)

	const runner = webdriver.remote({
		user, key, host: 'localhost', port: 4445,
		logLevel: 'silent',
		desiredCapabilities: opt
	})

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
