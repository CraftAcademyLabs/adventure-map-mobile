var myStepDefinitionsWrapper = function () {

  this.World = require("../support/world.js").World;

  this.Given(/^I open the app$/, function (callback) {
    browser.get('');
    callback();
  });


  this.Then(/^I should see an navbar$/, function (callback) {
    this.expect(element(by.css('ion-navbar')).isPresent()).to.eventually.equal(true);
    callback();
  });

  this.Then(/^the title should be "([^"]*)"$/, function (title, callback) {
    this.expect(browser.getTitle()).to.eventually.equal(title);
    callback();
  });

  this.Then(/^I should see "([^"]*)"$/, function (content, callback) {
    this.expect(element(by.css('ion-content')).getText()).to.eventually.equal(content);
    callback();
  });
};
module.exports = myStepDefinitionsWrapper;
