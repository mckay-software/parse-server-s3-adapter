'use strict'

const Adapter = require('..')
const fs = require('mz/fs')
const config = require('./config')
const { tearDown, test } = require('tap')

tearDown(() => process.exit())

const filename = 'delete-file'
const content = 'delete-file content'

test('should delete files', (t) => {
  t.plan(2)
  return fs.mkdir(`./data/${config.bucket}`)
  .catch(() => { /* ignore mkdir error */ })
  .then(() => fs.writeFile(`./data/${config.bucket}/${filename}`, content))
  .then(() => fs.readdir(`./data/${config.bucket}`))
  .then((files) => t.match(files, [filename])) // sanity check
  .then(() => new Adapter(config).deleteFile(filename))
  .then(() => fs.readdir(`./data/${config.bucket}`))
  .then((files) => t.notMatch(files, [filename]))
})
