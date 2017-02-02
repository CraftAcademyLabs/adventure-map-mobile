angular.module('adventureMap.services', [])

  .factory('createActivity', function ($resource, API_URL) {
    return $resource(API_URL + '/activity', {})
      .then(function(response) {
        console.log(response);
      });

  });
