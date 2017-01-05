'use strict'

const webdriver = require('webdriverio')
const so = require('so')

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

	console.log('execute1', yield browser.execute(() =>
		document.getElementById('execute').checked
	))

	console.log('printing…', yield browser.execute(() => window.print()))

	console.log('execute', yield browser.execute(() =>
		document.getElementById('beforeprint').checked
	))

	yield browser.end()
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
