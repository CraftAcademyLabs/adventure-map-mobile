exports.config = {
  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to this directory.
  specs: [
    '*.feature'
  ],

  baseURL: 'http://localhost:8080/',

  cucumberOpts: {
    require:  [
      'step_definitions/*.steps.js',
      'support/*.js'
    ],
    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true
  },
  chromeOnly: true,
  directConnect: true
};
