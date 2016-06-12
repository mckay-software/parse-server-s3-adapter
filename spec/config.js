const crypto = require('crypto')
const { config } = require('../package.json')

module.exports = {
  endPoint: 'http://localhost:9000',
  accessKey: config.access,
  secretKey: config.secret,
  bucket: crypto.randomBytes(12).toString('hex')
}
