'use strict'

const webdriver = require('webdriverio')

const user = process.env.SAUCE_USERNAME
const key = process.env.SAUCE_ACCESS_KEY
console.log('sauce lab', user.slice(0, 3), key.slice(0, 3))
const job = process.env.TRAVIS_JOB_NUMBER
const build = process.env.TRAVIS_BUILD_NUMBER



webdriver.remote({
	user, key,
	host: 'ondemand.saucelabs.com',
	desiredCapabilities: {
		'tunnel-identifier': job, build, name: 'selenium-test',
		browserName: 'chrome',
		platform: 'Windows 10',
		recordScreenshots: false
	}
})
.init()
.url('http://saucelabs.com/test/guinea-pig')
.getTitle()
.then((title) => console.log('page title', title))
.end()
