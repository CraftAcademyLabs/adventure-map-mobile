angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController)
  .controller('createActivityController', createActivityController)
  .controller('userController', userController)
  .controller('showActivityController', showActivityController);

function userController($scope, $state) {

}

function showActivityController($scope, $ionicModal, Activity){



  $scope.openModal = function (activity) {
    $ionicModal.fromTemplateUrl('templates/activity.html', {
      scope: $scope,
      animation: 'zoom-from-center'
    }).then(function (modal) {
      $scope.modal = modal;
      Activity.get({id: activity.id}, function (response) {
        $scope.activity = response.data;
        $scope.modal.show();
      });
    });


  };

  $scope.closeModal = function () {
    $scope.modal.hide();
    $scope.modal.remove();
  };
}

