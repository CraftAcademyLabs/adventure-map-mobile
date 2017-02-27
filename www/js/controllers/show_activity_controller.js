function showActivityController($scope, $ionicModal, $ionicLoading, Activity, Comment, Follow, $ionicSlideBoxDelegate, $ionicPopup) {
  $scope.openModal = function (activity) {
    $ionicModal.fromTemplateUrl('templates/activity.html', {
      scope: $scope,
      animation: 'zoom-from-center'
    }).then(function (modal) {
      $scope.modal = modal;
      Activity.get({id: activity.id}, function (response) {
        $scope.activity = response.data;
        prepareComments();
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

  $scope.openCommentBox = function () {
    $scope.commentData = {};
    $ionicModal.fromTemplateUrl('templates/comment.html', {
      scope: $scope,
      animation: 'zoom-from-center'
    }).then(function (modal) {
      $scope.comment_modal = modal;
      $scope.comment_modal.show();
    });
  };

  $scope.makeComment = function (activityId) {
    $ionicLoading.show({
      template: 'Saving comment...'
    });
    Comment.save({body: $scope.commentData.body, id: activityId}, function (resp) {
      $ionicLoading.hide();
      if (resp.status == 'success') {
        $scope.closeCommentModal();
      } else {
        console.log('error ' + resp.message[0]);
        $ionicPopup.alert({
          title: resp.message[0]
        });
      }
    }, function (resp) {
      $ionicLoading.hide();
    });
  };

  $scope.followUser = function(userId) {
    $ionicLoading.show({
      template: 'Following user...'
    });
    Follow.save({user_id: userId}, function (response) {
      $ionicLoading.hide();
      if (response.status == 'success') {
        console.log('user followed');
      } else {
        console.log('error: ' + response.message[0]);
        $ionicPopup.alert({
          title: response.message[0]
        })
      }
    })
  };

  $scope.nextSlide = function (index) {
    $ionicSlideBoxDelegate.slide(index);
  };

  function prepareComments() {
    $scope.activity.comments = $scope.activity.comments.sort(function (a, b) {
      return Date.parse(b.created_at) - Date.parse(a.created_at);
    });
    if ($scope.activity.comments != []) {
      $scope.activity.comments = $scope.activity.comments.map(function (comment) {
        date = new Date(Date.parse(comment.created_at));
        comment.created_at = date.toDateString();
        return comment;
      })
    }

  }
}
