'use strict'

const Adapter = require('..')
const { AssertionError } = require('assert')
const { test } = require('tap')

test('should throw when not initialized properly', (t) => {
  t.plan(4)

  function required (name, fn) {
    t.test(`argument ${name} is required`, (t) => {
      t.plan(2)
      try { fn() } catch (err) {
        t.type(err, AssertionError)
        t.equal(err.message, `Argument required: ${name}`)
      }
    })
  }

  required('accessKey', () => new Adapter())

  required('bucket', () => new Adapter({
    accessKey: 'accessKey'
  }))

  required('endPoint', () => new Adapter({
    accessKey: 'accessKey',
    bucket: 'bucket'
  }))

  required('secretKey', () => new Adapter({
    accessKey: 'accessKey',
    bucket: 'bucket',
    endPoint: 'https://localhost'
  }))
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
