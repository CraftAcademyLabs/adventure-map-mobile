Feature: User profile page
  As a User
  in order to fill out more info about myself
  I need to have a Profile page

  https://www.pivotaltracker.com/story/show/136354725

  Background:
    Given I open the app
    And I am logged in as "thomas@random.se" with password "password"

  Scenario: View profile
    Given I click on the toggle menu button
    And I select "Profile"
    Then I should be on the "app/profile" page

