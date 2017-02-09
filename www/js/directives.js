angular
  .module('adventureMap.directives', [])
  .directive("displayFirstImage", displayFirstImage);

function displayFirstImage() {
  return {
    scope: false,
    link: function ($scope, element, attrs) {
      $scope.message = attrs.message;
    },
    template: "<img> {{[message, user.firstName, user.lastName].join(' ')}}!</img>"
  };
}

