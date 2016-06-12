'use strict'

const Adapter = require('..')
const fs = require('mz/fs')
const config = require('./config')
const { tearDown, test } = require('tap')

tearDown(() => process.exit())

const filename = 'read-file'
const content = 'read-file content'

test('should read files', (t) => {
  t.plan(1)
  return fs.mkdir(`./data/${config.bucket}`)
  .catch(() => { /* ignore mkdir error */ })
  .then(() => fs.writeFile(`./data/${config.bucket}/${filename}`, content))
  .then(() => new Adapter(config).getFileData(filename))
  .then((data) => t.equal(data.toString(), content))
})
