/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // bootstrap
  app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');
  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');

  // base64
  app.import('vendor/jquery.base64.js');
  // cookie
  app.import('vendor/jquery.cookie-1.4.1.min.js');
  // color picker
  app.import('vendor/bootstrap-color-picker/js/bootstrap-colorpicker.min.js');
  app.import('vendor/bootstrap-color-picker/css/bootstrap-colorpicker.css');

  //date time picker
  app.import('vendor/moment-with-locales.min.js');
  app.import('vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js');
  app.import('vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css');

  //icheck
  app.import('vendor/icheck/icheck.min.js');
  app.import('vendor/icheck/skins/square/blue.css');
  return app.toTree();
};
