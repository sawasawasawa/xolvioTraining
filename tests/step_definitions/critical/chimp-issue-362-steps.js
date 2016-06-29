const expect = require('expect');

module.exports = function () {
  this.Given(/^I am on the main page$/, function () {
    browser.url('http://localhost:3000');
  });

  this.When(/^I wait for an element to disappear$/, function () {
    browser.waitForExist('.nonExistingElement', 5000, true)
  });

  this.Then(/^It disappears$/, function () {
    expect(browser.isExisting('.nonExistingElement')).toBe(false);
  });
};