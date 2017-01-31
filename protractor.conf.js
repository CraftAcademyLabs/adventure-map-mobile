exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './features/**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:8100/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [
      './features/**/*_steps.js',
      './features/support/*.js'
    ],
    format: 'pretty'
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    // require('connect')().use(require('serve-static')('www')).listen(8100);
  }
};
