'use strict'

const Minio = require('minio')
const thenifyAll = require('thenify-all')
const url = require('url')

function required (name) {
  throw new Error(`Argument ${name} is required.`)
}

class Adapter {
  constructor (options = required('options')) {
    const {
      endPoint = required('endPoint'),
      accessKey = required('accessKey'),
      secretKey = required('secretKey')
    } = options

    // All below needs the required() check for `endPoint` to have run

    function fromEndPoint () {
      let { hostname, port, protocol } = url.parse(endPoint)
      const secure = protocol === 'https:'
      if (port) {
        port = +port
      } else {
        port = secure ? 443 : 80
      }

      return { hostname, port, secure }
    }

    const {
      secure = fromEndPoint().secure,
      port = fromEndPoint().port,
      bucket = required('bucket'),
      region = 'us-east-1',
      prefix = ''
    } = options

    Object.assign(this, { bucket, region, prefix })
    this.minio = thenifyAll(new Minio({
      endPoint: fromEndPoint().hostname, accessKey, secretKey, secure, port
    }))
  }

  createBucket () {
    return this.minio.bucketExists(this.bucket)
    .catch(() => this.minio.makeBucket(this.bucket, this.region))
  }

  createFile (filename, data, contentType) {
    return this.minio.putObject(this.bucket, this.prefix + filename, data, contentType)
  }

  deleteFile (filename) {
    return this.minio.removeObject(this.bucket, this.prefix + filename)
  }

  getFileData (filename) {
    this.createBucket()
    .then(() => this.minio.getObject(this.bucket, this.prefix + filename))
    .then((stream) => new Promise((resolve, reject) => {
      const buflist = []
      stream.on('error', reject)
      stream.on('data', (chunk) => buflist.push(Buffer.from(chunk)))
      stream.on('end', () => resolve(Buffer.concat(buflist)))
    }))
  }

  getFileLocation (config, filename) {
    if (this.directAccess) {
      const loc = url.parse(this.baseUrl)
      loc.path = this.prefix + filename
      return url.format(loc)
    }

    return `${config.mount}/files/${config.applicationId}/${encodeURIComponent(filename)}`
  }
}

module.exports = Adapter
module.exports.default = Adapter
