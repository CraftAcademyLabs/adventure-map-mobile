var myHooks = function () {
  this.Before('@network', function (scenario, callback) {
    console.log("Before hook");
    //browser.setDefaultTimeout(60 * 1000);
    callback();
  });

  this.After(function(scenario, callback) {
    console.log('Scenario is successful: ' + scenario.isSuccessful());
    callback();
  });
};

module.exports = myHooks;
