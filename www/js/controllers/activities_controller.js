function activitiesController($scope, $state, $ionicLoading, $ionicModal, Activity) {
  $scope.message = 'This is the Activities View for ' + $scope.user.email;

  $scope.$on("$ionicView.enter", function () {
    $ionicLoading.show({
      template: 'Getting activities...'
    });
    Activity.query(function (response) {
      $scope.activities = response.data.reverse();
      $ionicLoading.hide();
    });

  });




  $scope.openModal = function(activity) {
    $ionicModal.fromTemplateUrl('templates/activity.html', {
      scope: $scope,
      animation: 'zoom-from-center'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.activity = activity;
      $scope.modal.show();
    });

  };

  $scope.closeModal = function(){
    $scope.modal.hide();
    $scope.modal.remove();
  };

  $scope.addActivity = function () {
    $state.go('app.create_activity');
  };

  $scope.viewProfile = function () {
    $state.go('app.profile');
  };

}
