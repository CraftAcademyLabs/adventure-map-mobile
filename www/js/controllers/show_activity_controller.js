function showActivityController($scope,
                                $state,
                                $stateParams,
                                $ionicModal,
                                $ionicLoading,
                                $ionicSlideBoxDelegate,
                                $ionicPopup,
                                Activity,
                                Comment,
                                Follow,
                                LikeActivity,
                                UnlikeActivity,
                                SaveActivity,
                                UnsaveActivity,
                                Utilities,
                                MapService) {

  var activityId;

  $scope.$on("$ionicView.enter", function () {
    if ($stateParams.id) {
      activityId = $stateParams.id;
      getActivity(activityId);
    }
  });

  $scope.navigateToActivity = function (activity) {
    switch ($state.current.name) {
      case 'app.my-saved-activities':
      case 'app.activities':
        $state.go('app.activity', {id: activity.id});
        break;
      case 'app.my-activities':
        $state.go('app.my-activity', {id: activity.id});
        break;
    }
  };

  $scope.closeCommentModal = function () {
    $scope.comment_modal.hide();
    $scope.comment_modal.remove();
    getActivity(activityId);
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
      if (resp.status === 'success') {
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

  $scope.followUser = function (userId) {
    Follow.save({user_id: userId}, function (response) {
      $ionicLoading.hide();
      if (response.status === 'success') {
      } else {
        console.log(response);
        $ionicPopup.alert({
          title: 'User could not be followed.'
        })
      }
    })
  };

  $scope.unfollowUser = function (userId) {
    Follow.delete({id: userId}, function (response) {
      if (response.status === 'success') {
        console.log('user deleted, hopefully');
      } else {
        console.log(response);
        $ionicPopup.alert({
          title: 'User could not be unfollowed.'
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
    if ($scope.activity.comments !== []) {
      $scope.activity.comments = $scope.activity.comments.map(function (comment) {
        date = new Date(Date.parse(comment.created_at));
        comment.created_at = date.toDateString();
        return comment;
      })
    }
  }

  function showSmallMap(lat, lng) {
    //var lat, long;
    var srs_code = 'EPSG:3006';
    var proj4def = '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    var crs = new L.Proj.CRS(srs_code, proj4def, {
      resolutions: [
        4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8
      ],
      origin: [-1200000.000000, 8500000.000000],
      bounds: L.bounds([-1200000.000000, 8500000.000000], [4305696.000000, 2994304.000000])
    });

    var map = new L.Map('small-map', {
      crs: crs,
      continuousWorld: true,
      zoomControl: false
    });
    map.setView([lat, lng], 10);
    MapService.addToMap(lat, lng, map);
    console.log($scope.activity)
  }


  function getActivity(id) {
    Activity.get({id: id}, function (response) {
      $scope.activity = response.data;
      $scope.activity.images = Utilities.sanitizeArrayFromNullObjects($scope.activity.images);
      $scope.activity.routes = Utilities.sanitizeArrayFromNullObjects($scope.activity.routes);
      $scope.activity.waypoints = Utilities.sanitizeArrayFromNullObjects($scope.activity.waypoints);
      prepareComments();
      console.log($scope.activity);
      showSmallMap($scope.activity.coords.lat, $scope.activity.coords.lng)

    });
  }

  $scope.likeActivity = function (activity_id) {
    LikeActivity.likeActivity(activity_id);
  };

  $scope.unlikeActivity = function (activity_id) {
    UnlikeActivity.unlikeActivity(activity_id);
  }

  $scope.saveActivity = function (activity_id) {
    SaveActivity.saveActivity(activity_id);
  };

  $scope.unsaveActivity = function (activity_id) {
    UnsaveActivity.unsaveActivity(activity_id);
  }

}
