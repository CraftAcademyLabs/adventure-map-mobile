Feature: Enable OAuth on client
  As a User
  in order to simplify my login
  I would like to log in with Facebook

  Scenario: Facebook login
    Given I open the app
    And I click "Login with Facebook"
    Then I should be on the "activities" page
