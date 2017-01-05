'use strict'

const webdriver = require('webdriverio')

const user = process.env.SAUCE_USERNAME
const key = process.env.SAUCE_ACCESS_KEY
const job = process.env.TRAVIS_JOB_NUMBER
const build = process.env.TRAVIS_BUILD_NUMBER



webdriver.remote({
	user, key, host: 'localhost', port: 4445,
	logLevel: 'silent',
	desiredCapabilities: {
		'tunnel-identifier': job, build, name: 'selenium-test',
		browserName: 'chrome',
		platform: 'Windows 10',
		recordScreenshots: false
	}
})
.init()
.url(`http://localhost:8080/`)
.getTitle()
.then((title) => console.log('page title', title))
.catch((err) => console.error(err))
.end()
