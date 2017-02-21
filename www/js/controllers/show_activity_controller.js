function showActivityController($scope, $rootScope, $ionicModal, $ionicLoading, Activity, Comment){
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

  $scope.openCommentBox = function(activityId, userId) {
    $scope.commentData = {};
    $ionicModal.fromTemplateUrl('templates/comment.html', {
      scope: $scope,
      animation: 'zoom-from-center'
    }).then(function (modal) {
      $scope.modal = modal;
      console.log('what up');
      $scope.modal.show();
    });
  };

  $scope.makeComment = function(activityId, userId) {
    // Why don't I have a user id saved in the $scope??
    $scope.commentData.id = userId;
    $scope.commentData.activity_id = activityId;
    var body = 'A fake body';
    $ionicLoading.show({
      template: 'Saving comment...'
    });
    console.dir($rootScope.user);
    Comment.save({body: $scope.commentData.body, id: activityId}, function (resp) {
      // $state.go('app.activities');
      $ionicLoading.hide();
      console.log(resp);
      $scope.closeModal();
    }, function (resp) {
      $ionicLoading.hide();
      console.log(resp);
    });
  }
}

