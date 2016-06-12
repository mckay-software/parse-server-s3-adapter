'use strict'

const Adapter = require('..')
const { test } = require('tap')

test('should support the function/string arguments', (t) => {
  t.plan(6)

  function args () {
    return {
      accessKey: 'accessKey',
      bucket: 'bucket',
      endPoint: 'https://play.minio.io:9000',
      secretKey: 'secretKey'
    }
  }

  t.test('bucket as string', (t) => {
    const s3 = new Adapter(Object.assign(args(), { bucket: 'foo' }))
    t.plan(2)
    t.type(s3.bucket, 'function')
    t.equal(s3.bucket(), 'foo')
  })

  t.test('direct as string', (t) => {
    const s3 = new Adapter(Object.assign(args(), { direct: true }))
    t.plan(2)
    t.type(s3.direct, 'function')
    t.equal(s3.direct(), true)
  })

  t.test('prefix as string', (t) => {
    const s3 = new Adapter(Object.assign(args(), { prefix: 'foo' }))
    t.plan(2)
    t.type(s3.prefix, 'function')
    t.equal(s3.prefix('name'), 'fooname')
  })

  t.test('bucket as function', (t) => {
    const s3 = new Adapter(Object.assign(args(), { bucket: (x) => `foo${x}` }))
    t.plan(2)
    t.type(s3.bucket, 'function')
    t.equal(s3.bucket('bar'), 'foobar')
  })

  t.test('direct as function', (t) => {
    const s3 = new Adapter(Object.assign(args(), { direct: (x) => !x }))
    t.plan(5)
    t.type(s3.direct, 'function')
    t.equal(s3.direct(false), true)
    t.equal(s3.direct(true), false)
    t.equal(s3.direct(0), true)
    t.equal(s3.direct(1), false)
  })

  t.test('prefix as function', (t) => {
    const s3 = new Adapter(Object.assign(args(), { prefix: (x) => `foo${x}` }))
    t.plan(2)
    t.type(s3.prefix, 'function')
    t.equal(s3.prefix('baz'), 'foobaz')
  })
})
