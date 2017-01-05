'use strict'

const user = process.env.SAUCE_USERNAME
const key = process.env.SAUCE_ACCESS_KEY

console.log('sauce lab', user.slice(0, 3), key.slice(0, 3))
