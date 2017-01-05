'use strict'

const webdriver = require('webdriverio')

const user = process.env.SAUCE_USERNAME
const key = process.env.SAUCE_ACCESS_KEY

console.log('sauce labs', user.slice(0, 3), key.slice(0, 3))



webdriver.remote({
	user, key,
	host: 'ondemand.saucelabs.com',
	desiredCapabilities: {
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
