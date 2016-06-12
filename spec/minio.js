'use strict'

const Minio = require('minio')
const play = require('./config')
const thenifyAll = require('thenify-all')
const url = require('url')

const config = Object.assign({}, play)
delete config.bucket

const { hostname, port, protocol } = url.parse(config.endPoint)
config.endPoint = hostname
config.port = +port
config.secure = protocol === 'https:'

const minio = module.exports = new Minio(config)
thenifyAll(minio, minio, [
  'bucketExists',
  'getObject',
  'removeBucket',
  'removeObject',
  'statObject'
])
