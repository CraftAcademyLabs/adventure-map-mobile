var basicStepDefinitionsWrapper = function () {

  this.World = require("../support/world.js").World;

  this.Then(/^start the debugger$/, function () {
    browser.enterRepl();
  });

  this.Given(/^I go to "([^"]*)"$/, function (site, callback) {
    browser.get(site).then(function(){
      callback();
    });

  });

  this.Given(/^I open the app$/, function (callback) {
    browser.get('').then(function(){
      callback();
    });
  });

  this.Given(/^I fill in "([^"]*)" with "([^"]*)"$/, function (element, value, callback) {
    var field = browser.element(by.css('body')).element(by.css('input[placeholder="' + element + '"]'));
    field.sendKeys(value).then(function(){
      callback();
    });
  });

  this.Then(/^I click "([^"]*)"$/, function (element, callback) {
    var button = browser.element(by.buttonText(element));
    button.click().then(function(){
      callback();
    });
  });
};

module.exports = basicStepDefinitionsWrapper;
