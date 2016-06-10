# parse-server-s3like-adapter

parse-server adapter for S3-like storages

# installation

`npm install --save parse-server-s3like-adapter`

# usage with parse-server

### using a config file

```
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
