# Parse Server: S3-like storage adapter

[![npm](https://img.shields.io/npm/v/parse-server-s3like-adapter.svg?style=flat-square)](https://www.npmjs.com/package/parse-server-s3like-adapter)
[![Travis](https://img.shields.io/travis/mckay-software/parse-server-s3like-adapter.svg?style=flat-square)](https://travis-ci.org/mckay-software/parse-server-s3like-adapter)
[![Coveralls](https://img.shields.io/coveralls/mckay-software/parse-server-s3like-adapter.svg?style=flat-square)](https://coveralls.io/github/mckay-software/parse-server-s3like-adapter)
[![License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://spdx.org/licenses/ISC.html)

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
    /// See https://docs.minio.io/docs/javascript-client-quickstart-guide

    // URL to object storage service
    endPoint: 'https://...', // required

    // Access key (user id that uniquely identifies your account)
    accessKey: 'accessKey', // required

    // Secret key (password to your account)
    secretKey: 'secretKey', // required

    // You should not need these as they will be derived from `endPoint`
    secure: true, // optional, defaults to true
    port: 443, // optional, defaults to 443 if `secure` is true, else 80

    /// Other storage options, not passed directly to Minio
    bucket: 'my_bucket', // required
    region: 'us-east-1', // optional, defaults to us-east-1

    /// Adapter options, not passed to Minio
    bucketPrefix: '', // optional, defaults to ''
    directAccess: false, // optional, defaults to false
    baseUrl: null, // optional, defaults to falsy
    baseUrlDirect: false // optional, defaults to false

    /// Any other options are passed directly to the Minio client, so in case
    /// they add more options, this library will not have to be modified.
  }
}
```

