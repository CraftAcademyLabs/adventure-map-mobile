angular.module('adventureMap.services', [])

  .factory('createActivityService', function ($resource, API_URL) {
    return $resource(API_URL + '/activity', {
        'save': {
          method: 'POST'
        }
      }
    );
  });
