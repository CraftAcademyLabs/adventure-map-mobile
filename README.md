[![CircleCI](https://circleci.com/gh/CraftAcademyLabs/adventure-map-mobile.svg?style=svg&circle-token=490dd46cd4b07d41ff4682e6ec0904d6a6471bed)](https://circleci.com/gh/CraftAcademyLabs/adventure-map-mobile)
# Adventure Map Mobile (Ionic 1.x)
AdventureMap Mobile application - Ionic v1 😞


### Running tests

#### Features
This project uses Protractor and CucumberJS for acceptance tests
Feature files are placed in `/features` folder. 
Step definitions are placed in `/features/step_definitions`

In order to run features, an instance of the `ionic serve` must be running and you must execute:
```
$ protractor tests/protractor.conf.js 
```

_