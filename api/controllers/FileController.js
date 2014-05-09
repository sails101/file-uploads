/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `FileController.upload()`
   */
  upload: function (req, res) {

    req.file('avatar').upload(function whenDone(err, uploadedFiles) {
      if (err) return res.serverError(err);
      else return res.json({
        files: uploadedFiles,
        textParams: req.params.all()
      });
    });
  },

  /**
   * `FileController.s3upload()`
   */
  s3upload: function (req, res) {

    var blobAdapter = require('skipper-s3')({
      bucket: process.env.BUCKET,
      key: process.env.KEY,
      secret: process.env.SECRET
    });
    var receiving = blobAdapter.receive();

    req.file('avatar').upload(receiving, function whenDone(err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }
      else return res.json({
        files: uploadedFiles,
        textParams: req.params.all()
      });
    });
  },


  /**
   * FileController.download()
   */
  download: function (req, res) {
    require('fs').createReadStream(req.param('path'))
    .on('error', function (err) {
      res.serverError(err);
    })
    .pipe(res);
  }
};

