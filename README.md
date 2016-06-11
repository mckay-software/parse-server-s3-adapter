# Parse Server: S3-like storage adapter

[![npm](https://img.shields.io/npm/v/parse-server-s3like-adapter.svg?style=flat-square)](https://www.npmjs.com/package/parse-server-s3like-adapter)
[![Travis](https://img.shields.io/travis/mckay-software/parse-server-s3like-adapter.svg?style=flat-square)](https://travis-ci.org/mckay-software/parse-server-s3like-adapter)
[![Coveralls](https://img.shields.io/coveralls/mckay-software/parse-server-s3like-adapter.svg?style=flat-square)](https://coveralls.io/github/mckay-software/parse-server-s3like-adapter)
[![License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://spdx.org/licenses/ISC.html)

Based on [Minio's client](https://docs.minio.io/docs/javascript-client-quickstart-guide).

If you want to:
- Use AWS S3: go to [parse-server-s3-adapter](https://www.npmjs.com/package/parse-server-s3-adapter)
- Use S3-like storage, such as Minio, Ceph, GCS, etc: use this.

## Install

```
$ npm install --save parse-server-s3like-adapter
```

## Usage

```js
filesAdapter: {
  module: 'parse-server-s3like-adapter',
  options: {
    endPoint: 'https://...', // required
    accessKey: 'accessKey', // required
    secretKey: 'secretKey', // required
    bucket: 'my_bucket', // required
    prefix: '', // optional, defaults to ''
    region: 'us-east-1', // optional, defaults to us-east-1
  }
}
```

