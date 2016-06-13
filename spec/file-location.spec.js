'use strict'

const Adapter = require('..')
const { test } = require('tap')

test('should support the direct/proxied file locations', (t) => {
  t.plan(2)

  function args () {
    return {
      accessKey: 'accessKey',
      bucket: 'bucket',
      endPoint: 'http://minio.xyz',
      secretKey: 'secretKey'
    }
  }

  t.test('direct', (t) => {
    const s3 = new Adapter(Object.assign(args(), { direct: true }))
    t.plan(1)
    t.equal(s3.getFileLocation({}, 'foo'), 'http://minio.xyz/bucket/foo')
  })

  t.test('proxied', (t) => {
    const s3 = new Adapter(Object.assign(args(), { direct: false }))
    t.plan(1)
    const got = s3.getFileLocation({}, 'foo')
    const want = '/files/foo'
    t.ok(got.endsWith(want), `${got} should end with ${want}`)
  })
})
