function showActivityController($scope, $rootScope, $ionicModal, $ionicLoading, Activity, Comment){
  $scope.openModal = function (activity) {
    $ionicModal.fromTemplateUrl('templates/activity.html', {
      scope: $scope,
      animation: 'zoom-from-center'
    }).then(function (modal) {
      $scope.modal = modal;
      Activity.get({id: activity.id}, function (response) {
        $scope.activity = response.data;
        console.log(response);
        $scope.modal.show();
      });
    });
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
    $scope.modal.remove();
  };

  $scope.closeCommentModal = function () {
    $scope.comment_modal.hide();
    $scope.comment_modal.remove();
  };

  $scope.openCommentBox = function() {
    $scope.commentData = {};
    $ionicModal.fromTemplateUrl('templates/comment.html', {
      scope: $scope,
      animation: 'zoom-from-center'
    }).then(function (modal) {
      $scope.comment_modal = modal;
      $scope.comment_modal.show();
    });
  };

  $scope.makeComment = function(activityId) {
    $ionicLoading.show({
      template: 'Saving comment...'
    });
    Comment.save({body: $scope.commentData.body, id: activityId}, function (resp) {
      $ionicLoading.hide();
      $scope.closeCommentModal();
      // $scope.openModal(activity);
      console.log(resp);
      // $scope.closeModal();
    }, function (resp) {
      $ionicLoading.hide();
      console.log(resp);
    });
  }
}

