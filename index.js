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
      accessKey = required('accessKey'),
      bucket = required('bucket'),
      direct = false,
      endPoint = required('endPoint'),
      prefix = '',
      region = 'us-east-1',
      secretKey = required('secretKey')
    } = options

    // Needs the required() check for `endPoint` to have run
    const ep = url.parse(endPoint)
    const { secure = ep.protocol === 'https:' } = options

    // Needs `secure`, whether it's provided or defaulted
    const { port = ep.port ? +ep.port : (secure ? 443 : 80) } = options

    Object.assign(this, { bucket, direct, region, prefix })
    this.minio = thenifyAll(new Minio({
      endPoint: ep.hostname, accessKey, secretKey, secure, port
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
    if (this.direct) {
      const loc = url.parse(this.baseUrl)
      loc.path = this.prefix + filename
      return url.format(loc)
    }

    return `${config.mount}/files/${config.applicationId}/${encodeURIComponent(filename)}`
  }
}

module.exports = Adapter
module.exports.default = Adapter
