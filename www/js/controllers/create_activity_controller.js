function createActivityController($scope, $ionicLoading, $state, $cordovaImagePicker, Activity, S3FileUpload) {
  $scope.activityData = {};
  $scope.categories = ['Hiking', 'Cross country skiing', 'Back country skiing', 'Paddling', 'Mountain biking', 'Horse riding', 'Climbing', 'Snow mobiling', 'Cross country ice skating', 'Foraging'];

  $scope.createActivity = function () {
    $ionicLoading.show({
      template: 'Saving...'
    });
    Activity.save($scope.activityData, function (resp) {

      // Loop through uploadImages and send them to the server
      addImages(resp.data.id);

      $state.go('app.activities');
      $ionicLoading.hide();
      console.log(resp);
    }, function (resp) {
      console.log(resp);
    });
  };

  $scope.selectPhotos = function() {
    $scope.uploadImages = [];
    var options = {
      maximumImagesCount: 2,
      width: 800,
      height: 800,
      quality: 60
    };

    $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        // This allows for multiple images.
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);

          // Upload to S3
          S3FileUpload.upload('images', results[i]);
            // .then( function (response) {
            //   $scope.uploadImages.push(response.public_url);
            // })
        }
      }, function(error) {
        // error getting photos
      });
  };

  function addImages(id) {
    // If there are uploaded images, register them as activity details with the server.
    if ($scope.uploadImages != []) {
      $scope.uploadImages.forEach(function(url) {
        ActivityDetail.save({id: id, file_attachment: url, attachment_type: 'Image'}, function (resp) {
          console.log(resp);
        })
      })
    }


  }
}
