'use strict'

const Adapter = require('..')
const { test } = require('tap')

test('should not throw when initialized properly', (t) => {
  t.plan(1)
  t.doesNotThrow(() => new Adapter({
    accessKey: 'accessKey',
    bucket: 'bucket',
    endPoint: 'https://play.minio.io:9000',
    secretKey: 'secretKey'
  }))
})
