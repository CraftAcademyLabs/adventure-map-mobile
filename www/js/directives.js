angular
  .module('adventureMap.directives', [])
  .directive("displayFirstImage", displayFirstImage);

function displayFirstImage() {
  return {
    template: '<img class="full-image" ng-src="{{getImage(activity)}}">'
  };
}

