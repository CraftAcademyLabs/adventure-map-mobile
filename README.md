[![CircleCI](https://circleci.com/gh/CraftAcademyLabs/adventure-map-mobile.svg?style=svg&circle-token=490dd46cd4b07d41ff4682e6ec0904d6a6471bed)](https://circleci.com/gh/CraftAcademyLabs/adventure-map-mobile)
# Adventure Map Mobile (Ionic 1.x)
AdventureMap Mobile application - Ionic v1 😞


### Running tests

#### Features
This project uses Protractor and CucumberJS for acceptance tests
Feature files are placed in `tests/features` folder. 
Step definitions are placed in `tests/features/step_definitions`

##### Dependencies
Install `protractor` and update the webdriver

```shell
$ npm install -g protractor
$ webdriver-manager update
```

This line may be necessary:
```
$ node_modules/protractor/bin/webdriver-manager update
```

##### Running the tests
In order to run features, an instance of the application must be running:

```shell
$ ionic serve
```

then open another tab on your terminal and to run the test you must run the following command:
```
$ npm run cucumber
```

### Running the App
You can choose to run the app on your phone or in an emulator.

### iOs Simulator
Run the following commands
```
$ ionic platform remove ios (optional)
$ ionic platform add ios
$ ionic emulate ios
```
_