'use strict'

const Adapter = require('..')
const { test } = require('tap')

test('should throw when not initialized properly', (t) => {
  t.plan(5)

  t.throws(() => new Adapter(),
    new Error('Argument options is required.'))

  t.throws(() => new Adapter({}),
    new Error('Argument endPoint is required.'))

  t.throws(() => new Adapter({
    endPoint: 'https://localhost'
  }), new Error('Argument accessKey is required.'))

  t.throws(() => new Adapter({
    endPoint: 'https://localhost',
    accessKey: 'accessKey'
  }), new Error('Argument secretKey is required.'))

  t.throws(() => new Adapter({
    endPoint: 'https://localhost',
    accessKey: 'accessKey',
    secretKey: 'secretKey'
  }), new Error('Argument bucket is required.'))
})

test('should not throw when initialized properly', (t) => {
  t.plan(1)

  t.doesNotThrow(() => new Adapter({
    endPoint: 'https://play.minio.io:9000',
    accessKey: 'accessKey',
    secretKey: 'secretKey',
    bucket: 'bucket'
  }))
})

/*
  describe('getFileLocation', () => {
    var config = {
      mount: 'http://my.server.com/parse',
      applicationId: 'xxxx'
    }
    var options

    beforeEach(() => {
      options = {
        directAccess: true,
        bucketPrefix: 'foo/bar/',
        baseUrl: 'http://example.com/files'
      }
    })

    it('should get using the baseUrl', () => {
      var s3 = new S3Adapter('accessKey', 'secretKey', 'myBucket', options)
      expect(s3.getFileLocation(config, 'test.png')).toEqual('http://example.com/files/foo/bar/test.png')
    })

    it('should get direct to baseUrl', () => {
      options.baseUrlDirect = true
      var s3 = new S3Adapter('accessKey', 'secretKey', 'myBucket', options)
      expect(s3.getFileLocation(config, 'test.png')).toEqual('http://example.com/files/test.png')
    })

    it('should get without directAccess', () => {
      options.directAccess = false
      var s3 = new S3Adapter('accessKey', 'secretKey', 'myBucket', options)
      expect(s3.getFileLocation(config, 'test.png')).toEqual('http://my.server.com/parse/files/xxxx/test.png')
    })

    it('should go directly to amazon', () => {
      delete options.baseUrl
      var s3 = new S3Adapter('accessKey', 'secretKey', 'myBucket', options)
      expect(s3.getFileLocation(config, 'test.png')).toEqual('https://myBucket.s3.amazonaws.com/foo/bar/test.png')
    })
  })

  if (process.env.TEST_S3_ACCESS_KEY && process.env.TEST_S3_SECRET_KEY && process.env.TEST_S3_BUCKET) {
    // Should be initialized from the env
    let s3 = new S3Adapter({
      accessKey: process.env.TEST_S3_ACCESS_KEY,
      secretKey: process.env.TEST_S3_SECRET_KEY,
      bucket: process.env.TEST_S3_BUCKET
    })
    filesAdapterTests.testAdapter('S3Adapter', s3)
  }
})
*/
