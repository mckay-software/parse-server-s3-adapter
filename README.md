# Parse Server: S3-like storage adapter

[![Greenkeeper badge](https://badges.greenkeeper.io/mckay-software/parse-server-s3like-adapter.svg)](https://greenkeeper.io/)

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
    accessKey: 'accessKey',
    bucket: 'my_bucket',
    direct: true,
    endPoint: 'https://...',
    secretKey: 'secretKey'
  }
}
```

| Option | Default | Description |
|:-------|:-------:|:------------|
| `accessKey` | **required** ||
| `bucket` | **required** | The bucket to store data into. This can be a function that takes the filename and returns a string. |
| `direct` | `false` | Whether files are served from the `endPoint` (`true`) or proxied by Parse (`false`). This can be a function that takes the filename and returns a boolean. |
| `endPoint` | **required** | The URL to the storage service. Should be a full URL, with protocol and port (if non-standard), e.g. `https://play.minio.io:9000` or `https://minio.example.com`. |
| `port` | From `endPoint` | Override the port number. By default is parsed from the `endPoint` URL, with 80/443 as standard defaults based the value of `secure`. |
| `prefix` | `''` | A prefix to apply to all filenames. Can be set to e.g. `'foo/'` to put all files in a subdirectory. This can be a function that takes the filename and returns a string. |
| `region` | `'us-east-1'` | May not actually matter for some services, refer to your documentation. This can be a function that takes the filename and returns a string. |
| `secretKey` | **required** ||
| `secure` | From `endPoint` | Override whether the connection is secure or not. By default is parsed from the `endPoint` URL (`https` is secure, otherwise not). |
