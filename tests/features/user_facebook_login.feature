Feature: Enable OAuth on client
  As a User
  in order to simplify my login
  I would like to log in with Facebook

  Scenario: Facebook login
    Given I open the app
    And I login using Facebook
    Then I should be on the "activities" page
    And I should see "This is the Activities View for academy@craftacademy.se"
