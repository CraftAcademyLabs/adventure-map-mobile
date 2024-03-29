exports.config = {
  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
        args: ['--disable-web-security']
    }
  },

  // Spec patterns are relative to this directory.
  specs: [
    'features/*.feature'
  ],

  baseUrl: 'http://localhost:8100/',

  cucumberOpts: {
    require:  [
      'features/step_definitions/*_steps.js',
      'features/support/*.js'
    ],
    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true
  },
  chromeOnly: true,
  directConnect: true,
  onPrepare: function() {
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(40000);
    browser.manage().window().setSize(260, 900);
  }
};
