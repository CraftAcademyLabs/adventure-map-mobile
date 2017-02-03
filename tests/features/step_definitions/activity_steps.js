var myStepDefinitionsWrapper = function () {

  this.Given(/^I set the Activity "([^"]*)" to "([^"]*)"$/, function (binding, value, callback) {
    var field = browser.element(by.css('body')).element(by.model('activityData.' + binding.toLowerCase()));
    field.sendKeys(value);
    callback();
  });

  this.Given(/^I slide "([^"]*)" to "([^"]*)"$/, function (binding, value, callback) {
    var slider = browser.element(by.css('body')).element(by.model('activityData.' + binding.toLowerCase()));
    browser.actions().dragAndDrop(slider, {x: ( (value * 100) - 100 ), y: 0}).perform();
    callback();
  });

  this.Given(/^I select Activity "([^"]*)" to "([^"]*)"$/, function (binding, value, callback) {
    var select = browser.element(by.css('body')).element(by.model('activityData.' + binding.toLowerCase()));
    select.sendKeys(value);
    callback();
  });

  this.Given(/^I have created an activity "([^"]*)"$/, function (title, callback) {
    browser.get('#/create_activity');
    var title_field = browser.element(by.css('body')).element(by.css('input[placeholder="' + 'Pick a headline for your activity' + '"]'));
    title_field.sendKeys(title);
    var body_field = browser.element(by.css('body')).element(by.model('activityData.' + 'body'.toLowerCase()));
    body_field.sendKeys('This is the body');
    var slider = browser.element(by.css('body')).element(by.model('activityData.' + 'difficulty'.toLowerCase()));
    browser.actions().dragAndDrop(slider, {x: ( (1 * 100) - 100 ), y: 0}).perform();
    var select = browser.element(by.css('body')).element(by.model('activityData.' + 'category'.toLowerCase()));
    select.sendKeys('Hiking');
    var button = browser.element(by.buttonText('Create'));
    button.click().then(function(){
      callback();
    });
  });
};
module.exports = myStepDefinitionsWrapper;
