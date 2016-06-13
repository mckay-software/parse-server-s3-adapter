/* @flow */
'use strict'

const assert = require('assert')
const bufferFrom /* : (b: string|Buffer) => Buffer */ = require('./buffer-from')
const Minio = require('minio')
const thenifyAll = require('thenify-all')
const url = require('url')
const urljoin = require('url-join')

class Adapter {
  /* :: static default: Class<Adapter>; */

  /* :: accessKey: string; */
  /* :: bucket: (name: string) => string; */
  /* :: direct: (name: string) => boolean; */
  /* :: endPoint: string; */
  /* :: minio: Minio; */
  /* :: prefix: (name: string) => string; */
  /* :: region: string; */
  /* :: secretKey: string; */

  constructor (options /* : Object */ = {}) {
    const {
      accessKey, bucket, direct, endPoint, prefix, region, secretKey
    } = Object.assign({
      direct: false, prefix: '', region: 'us-east-1'
    }, options)

    assert(accessKey, 'Argument required: accessKey')
    assert(bucket, 'Argument required: bucket')
    assert(endPoint, 'Argument required: endPoint')
    assert(secretKey, 'Argument required: secretKey')

    // Needs the required() check for `endPoint` to have run
    const ep = url.parse(endPoint)
    const { secure = ep.protocol === 'https:' } = options

    // Needs `secure`, whether it's provided or defaulted
    const { port = ep.port ? +ep.port : (secure ? 443 : 80) } = options

    Object.assign(this, { region: `${region}` })
    Object.assign(this, { bucket: typeof bucket === 'function'
      ? bucket : () => `${bucket}` })
    Object.assign(this, { direct: typeof direct === 'function'
      ? direct : () => !!direct })
    Object.assign(this, { prefix: typeof prefix === 'function'
      ? prefix : (name) => `${prefix}${name}` })

    this.minio = new Minio({
      endPoint: ep.hostname, accessKey, secretKey, secure, port
    })

    thenifyAll.withCallback(this.minio, this.minio, [
      'bucketExists',
      'getObject',
      'makeBucket',
      'putObject',
      'removeObject'
    ])
  }

  createBucket (filename /* : string */) /* : Promise */ {
    return this.minio.bucketExists(this.bucket(filename))
    .catch(() => this.minio.makeBucket(this.bucket(filename), this.region))
  }

  createFile (
    name /* : string */,
    data /* : string|Buffer */,
    contentType /* : string */
  ) /* : Promise */ {
    return this.createBucket(name)
    .then(() => this.minio.putObject(
      this.bucket(name),
      this.prefix(name),
      data,
      contentType
    ))
  }

  deleteFile (name /* : string */) /* : Promise */ {
    return this.createBucket(name)
    .then(() => this.minio.removeObject(this.bucket(name), this.prefix(name)))
  }

  getFileData (name /* : string */) /* : Promise */ {
    return this.createBucket(name)
    .then(() => this.minio.getObject(this.bucket(name), this.prefix(name)))
    .then((stream) => new Promise((resolve, reject) => {
      const buflist = []
      stream.on('error', reject)
      stream.on('data', (chunk) => buflist.push(bufferFrom(chunk)))
      stream.on('end', () => resolve(Buffer.concat(buflist)))
    }))
  }

  getFileLocation (config /* : Object */, name /* : string */) /* : string */ {
    const parts = this.direct(name)
      ? [this.endPoint, this.prefix(name)]
      : [config.mount, 'files', config.applicationId, encodeURIComponent(name)]
    return urljoin(...parts)
  }
}

module.exports = Adapter
module.exports.default = Adapter
