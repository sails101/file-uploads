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

