# How do I upload files in Sails?

Example of using Sails to properly/safely stream file uploads to S3 and/or disk (esp. really big uploads).


## Trying it out

Clone this repo, `npm install`, then start the server with `sails lift`.

Then...


#### Upload file(s) to disk 

`POST /file/upload`

[![Run in Postman](https://run.pstmn.io/button.png)](https://www.getpostman.com/run-collection/d79c7deb45ef3a476e5d)
 
See [`api/controllers/FileController.js`](https://github.com/sails101/file-uploads/blob/master/api/controllers/FileController.js#L15).

> To download a file from disk, see https://github.com/sails101/file-uploads/blob/master/api/controllers/FileController.js#L82.



#### Upload file(s) to S3

`POST /file/s3upload`

[![Run in Postman](https://run.pstmn.io/button.png)](https://www.getpostman.com/run-collection/d79c7deb45ef3a476e5d)

See [`api/controllers/FileController.js`](https://github.com/sails101/file-uploads/blob/master/api/controllers/FileController.js#L52).

> To download a file from S3, talk to the Amazon S3 API directly.
