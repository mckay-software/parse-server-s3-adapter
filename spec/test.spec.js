'use strict'

const Adapter = require('..')
const { plan, test } = require('tap')
plan(2)

test('should throw when not initialized properly', (t) => {
  t.plan(5)

  t.throws(() => new Adapter(),
    new Error('Argument options is required.'))

  t.throws(() => new Adapter({}),
    new Error('Argument accessKey is required.'))

  t.throws(() => new Adapter({
    accessKey: 'accessKey'
  }), new Error('Argument bucket is required.'))

  t.throws(() => new Adapter({
    accessKey: 'accessKey',
    bucket: 'bucket'
  }), new Error('Argument endPoint is required.'))

  t.throws(() => new Adapter({
    accessKey: 'accessKey',
    bucket: 'bucket',
    endPoint: 'https://localhost'
  }), new Error('Argument secretKey is required.'))
})

test('should not throw when initialized properly', (t) => {
  t.plan(1)

  t.doesNotThrow(() => new Adapter({
    accessKey: 'accessKey',
    bucket: 'bucket',
    endPoint: 'https://play.minio.io:9000',
    secretKey: 'secretKey'
  }))
})
