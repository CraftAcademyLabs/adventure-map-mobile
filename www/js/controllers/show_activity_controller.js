function showActivityController($scope, $ionicModal, $ionicLoading, Activity, Comment){
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

  $scope.makeComment = function(activityId) {
    var commentData = {};
    // commentData.id = $scope.user.id;
    console.log(activityId);
    commentData.activity_id = activityId;
    $ionicLoading.show({
      template: 'Saving comment...'
    });
    Comment.save({id: activityId, commentData}, function (resp) {
      // $state.go('app.activities');
      $ionicLoading.hide();
      console.log(resp);
    }, function (resp) {
      $ionicLoading.hide();
      console.log(resp);
    });
  }
}

