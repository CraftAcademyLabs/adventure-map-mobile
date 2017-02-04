Feature: View activity feed
  As a User
  in order to see all the activities for my given interests (pre determined or able to change in settings)
  I need to see a Feed of Activities.

  https://www.pivotaltracker.com/story/show/136351621


  Scenario: I view my activity feed
    Given I open the app
    And I am logged in as "thomas@random.se" with password "password"
    And I create an activity "My Super Cool Activity"
    Given I should be on the "activities" page
    Then I should see "My Super Cool Activity"
