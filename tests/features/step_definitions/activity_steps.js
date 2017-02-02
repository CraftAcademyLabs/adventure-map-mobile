var myStepDefinitionsWrapper = function () {

  this.Given(/^I set the Activity "([^"]*)" to "([^"]*)"$/, function (binding, value, callback) {
    var field = browser.element(by.css('body')).element(by.model('activityData.' + binding.toLowerCase()));
    field.sendKeys(value);
    callback();
  });

  this.Given(/^I slide "([^"]*)" to "([^"]*)"$/, function (binding, value, callback) {
    var slider = browser.element(by.css('body')).element(by.model('activityData.' + binding.toLowerCase()));
    browser.actions().dragAndDrop(slider, {x: (100 * (value - 1)), y: 0}).perform();
    browser.pause();
    callback();
  });
};
module.exports = myStepDefinitionsWrapper;
