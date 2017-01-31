Feature: Access the application

  Scenario: The user opens the app and sees Hello World

    Given I open the app
    Then I should see an navbar
    And the title should be "AdventureMap"
    And I should see "Hello World"
