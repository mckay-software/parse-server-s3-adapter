'use strict'

const Adapter = require('..')
const fs = require('mz/fs')
const config = require('./config')
const { tearDown, test } = require('tap')

tearDown(() => process.exit())

const filename = 'create-file'
const content = 'create-file content'

test('should write files', (t) => {
  t.plan(2)
  return new Adapter(config).createFile(filename, content, 'text/plain')
  .then(() => fs.readdir(`./data/${config.bucket}`))
  .then((files) => t.match(files, [filename]))
  .then(() => fs.readFile(`./data/${config.bucket}/${filename}`))
  .then((data) => t.equal(data.toString(), content))
})
