/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {


  // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
  // default view engine) your home page.
  //
  // (Alternatively, remove this and add an `index.html` file in your `assets` directory)
  '/': {
    view: 'homepage'
  },

  // The EMAXBUFFER error protects against performance issues by timing out requests that are trying
  // to upload files when your code is slow.
  // ================================================================================================
  //
  // i.e. if the file upload is smaller than the default stream highWaterMark, it'll get paused using
  // TCP backpressure.  This is good (it takes advantage of the power of streams2 to give your pre-processing
  // code time to run).
  // However, since this still consumes a small amount of memory, it is a potential performance issue and
  // potentially even an attack vector.  That's why we have EMAXBUFFER.
  // Use the configurable `maxTimeToBuffer` option to configure this timeout in ms (it's quite high by default)
  //
  // (note that EMAXBUFFER may be changed eventually-
  //  for details see: https://github.com/balderdashy/skipper/blob/master/standalone/Upstream/Upstream.js#L70)
  //
  // Upload w/ artificial delay to demonstrate EMAXBUFFER (this will only happen if you upload a big file)
  'post /file/do-slow-things-then-upload': [function (req, res, next){
    setTimeout(function (){
      // This route is here to provide a way to see how EMAXBUFFER errors work-
      // you can only see this type of error if you have Skipper's debug mode enabled
      // (try lifting this app w/ `DEBUG=skipper sails lift`)

      // Why doesn't this trigger an error? Imagine your `maxTimeToBuffer` config is set to 1 second (default is higher than that, ~5s)
      // That means for any upstream (e.g. `req.file("avatar")`) you have just one second to plug it into a receiver.
      // Now imagine an attacker wants to hit you with a DoS attack- if you
      next();
    }, 5500);
  },'FileController.upload']

  // The ETIMEOUT error protects against DoS attacks by timing out requests that hit your file upload
  // route, but are trying
  // to upload files when your code is slow.
  // ================================================================================================


  // Custom routes here...


  // If a request to a URL doesn't match any of the custom routes above,
  // it is matched against Sails route blueprints.  See `config/blueprints.js`
  // for configuration options and examples.

};
