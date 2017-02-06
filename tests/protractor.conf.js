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
    // Override the timeout for webdriver.
    browser.driver.manage().timeouts().setScriptTimeout(60000);
  }
};
