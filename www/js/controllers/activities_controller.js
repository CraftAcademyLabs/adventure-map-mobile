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

  $ionicModal.fromTemplateUrl('templates/activity.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.openModal = function(activity) {
    $scope.activity = activity;
    $scope.modal.show();
  };

  $scope.closeModal = function(){
    $scope.modal.close();
  }

  $scope.addActivity = function () {
    $state.go('app.create_activity');
  };

  $scope.viewProfile = function () {
    $state.go('app.profile');
  };

}
