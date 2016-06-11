# Parse Server: S3-like storage adapter

[![npm](https://img.shields.io/npm/v/parse-server-s3like-adapter.svg?style=flat-square)](https://www.npmjs.com/package/parse-server-s3like-adapter)
[![Travis](https://img.shields.io/travis/mckay-software/parse-server-s3like-adapter.svg?style=flat-square)](https://travis-ci.org/mckay-software/parse-server-s3like-adapter)
[![Coveralls](https://img.shields.io/coveralls/mckay-software/parse-server-s3like-adapter.svg?style=flat-square)](https://coveralls.io/github/mckay-software/parse-server-s3like-adapter)
[![License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://spdx.org/licenses/ISC.html)

_Parse Server adapter for S3-like storage._

If you want to:
- Use AWS S3: go to [parse-server-s3-adapter](https://www.npmjs.com/package/parse-server-s3-adapter)
- Use S3-like storage, such as Minio, Ceph, GCS, etc: use this.

## Install

```
$ npm install --save parse-server-s3like-adapter
```

## Usage

### using a config file

```js
{
  "appId": 'my_app_id',
  "masterKey": 'my_master_key',
  // other options
  "filesAdapter": {
    "module": "parse-server-s3like-adapter",
    "options": {
      "accessKey": "accessKey",
      "secretKey": "secretKey",
      "bucket": "my_bucket",
      // optional:
      "region": 'us-east-1', // default value
      "bucketPrefix": '', // default value
      "directAccess": false, // default value
      "baseUrl": null, // default value
      "baseUrlDirect": false // default value
    }
  }
}
```

### using environment variables

Set your environment variables:

```
S3_ACCESS_KEY=accessKey
S3_SECRET_KEY=secretKey
S3_BUCKET=bucketName
```

And update your config / options

```
{
  "appId": 'my_app_id',
  "masterKey": 'my_master_key',
  // other options
  "filesAdapter": "parse-server-s3like-adapter"
}
```


### passing as an instance

```
var S3Adapter = require('parse-server-s3like-adapter');

var s3Adapter = new S3Adapter('accessKey',
                  'secretKey',
                  'bucket' , {
                    region: 'us-east-1'
                    bucketPrefix: '',
                    directAccess: false,
                    baseUrl: 'http://images.example.com'
                  });

var api = new ParseServer({
	appId: 'my_app',
	masterKey: 'master_key',
	filesAdapter: s3adapter
})
```

or with an options hash

```
var S3Adapter = require('parse-server-s3like-adapter');

var s3Options = {
  "accessKey": "accessKey",
  "secretKey": "secretKey",
  "bucket": "my_bucket",
  // optional:
  "region": 'us-east-1', // default value
  "bucketPrefix": '', // default value
  "directAccess": false, // default value
  "baseUrl": null // default value
}

var s3Adapter = new S3Adapter(s3Options);

var api = new ParseServer({
  appId: 'my_app',
  masterKey: 'master_key',
  filesAdapter: s3Adapter
})
```
