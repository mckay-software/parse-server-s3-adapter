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

  filename (name) {
    if (typeof this.prefix === 'function') {
      return this.prefix(name)
    }

    return this.prefix + name
  }

  createBucket () {
    return this.minio.bucketExists(this.bucket)
    .catch(() => this.minio.makeBucket(this.bucket, this.region))
  }

  createFile (name, data, contentType) {
    return this.minio.putObject(this.bucket, this.filename(name), data, contentType)
  }

  deleteFile (name) {
    return this.minio.removeObject(this.bucket, this.filename(name))
  }

  getFileData (name) {
    this.createBucket()
    .then(() => this.minio.getObject(this.bucket, this.filename(name)))
    .then((stream) => new Promise((resolve, reject) => {
      const buflist = []
      stream.on('error', reject)
      stream.on('data', (chunk) => buflist.push(Buffer.from(chunk)))
      stream.on('end', () => resolve(Buffer.concat(buflist)))
    }))
  }

  getFileLocation (config, name) {
    if (this.direct) {
      const loc = url.parse(this.baseUrl)
      loc.path = this.filename(name)
      return url.format(loc)
    }

    return `${config.mount}/files/${config.applicationId}/${encodeURIComponent(filename)}`
  }
}

module.exports = Adapter
module.exports.default = Adapter
