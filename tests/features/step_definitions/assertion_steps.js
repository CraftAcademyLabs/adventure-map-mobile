var assertionStepDefinitionsWrapper = function () {

  this.Then(/^I should be on the "([^"]*)" page$/, function (page, callback) {
    this.expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + "#/" + page)
      .and.notify(callback);
  });

  this.Then(/^I should see an navigation bar/, function (callback) {
    browser.waitForAngular();
    this.expect(element(by.css('ion-header-bar')).isPresent()).to.eventually.equal(true)
      .and.notify(callback);
  });

  this.Then(/^the navigation bar should be "([^"]*)"$/, function (title, callback) {
    browser.waitForAngular();
    this.expect(element(by.tagName('ion-nav-bar')).getText()).to.eventually.include(title)
      .and.notify(callback);
  });

  this.Then(/^the title should be "([^"]*)"$/, function (title, callback) {
    browser.waitForAngular();
    this.expect(browser.getTitle()).to.eventually.equal(title)
      .and.notify(callback);
  });

  this.Then(/^I should see "([^"]*)"$/, function (content, callback) {
    browser.waitForAngular();
    this.expect(element(by.css('body')).getText()).to.eventually.include(content)
      .and.notify(callback);
  });

  this.Then(/^the Leaflet map should be visible$/, function (callback) {
    browser.waitForAngular();
    this.expect(element(by.className('leaflet-container')).isDisplayed()).to.eventually.equal(true)
      .and.notify(callback);
  });
};
module.exports = assertionStepDefinitionsWrapper;
