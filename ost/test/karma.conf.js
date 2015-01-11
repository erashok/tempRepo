module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/lodash/dist/lodash.compat.js',
      'bower_components/angular-lodash/angular-lodash.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bootstrap/app.js',
      'app/**/*.js',
      'test/unit/**/*.js',
      'test/e2e/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
