// Karma configuration
// Generated on Tue Mar 26 2019 00:42:14 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-mocks.js',
      // './index.js',
      // './tests/controllertest.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-route.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-cookies.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.11/ngStorage.min.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-animate.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.js',
      './app.js',
      './tests/signInTests.js',
      './tests/changePasswordTests.js',
      './tests/signOutTests.js',
      './tests/ViewBusInfo.js',
      './tests/personalInfoTests.js',
      './tests/authenticationTests.js',
      './tests/bookTicketTests.js',
      './tests/busAvailability.js',
      './tests/chooseSeatTests.js',
      './tests/conformationTests.js',
      './tests/printTicketTests.js',
      './tests/sample.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
