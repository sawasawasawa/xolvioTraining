Feature: Reversing webdriver waitForExist command

  @critical @watch
  Scenario:
    Given I am on the main page
    When I wait for an element to disappear
    Then It disappears