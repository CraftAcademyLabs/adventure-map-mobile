function createActivityController($scope,  $auth, $ionicLoading, $state, $cordovaImagePicker, Activity, S3FileUpload) {

  $scope.activityData = {};
  $scope.categories = ['Hiking', 'Cross country skiing', 'Back country skiing', 'Paddling', 'Mountain biking', 'Horse riding', 'Climbing', 'Snow mobiling', 'Cross country ice skating', 'Foraging'];
  $scope.images = [];
  $scope.uploadImages = [];

  $scope.createActivity = function () {
    $ionicLoading.show({
      template: 'Saving...'
    });

    $auth.validateUser().then(function(resp){
      Activity.save($scope.activityData, function (resp) {
        // Loop through uploadImages and send them to the server
        // addImages(resp.data.id);
        // This takes you to the activities page, even if you created
        // an activity from the my-activities page.
        $state.go('app.activities');
        $ionicLoading.hide();
        console.log(resp);
      }, function (resp) {
        console.log(resp);
        $scope.errors = resp.data.message;
        $ionicLoading.hide();
      });
    });
  };

  $scope.selectPhotos = function() {
    openFilePicker();
    // var options = {
    //   maximumImagesCount: 2,
    //   width: 800,
    //   height: 800,
    //   quality: 60
    // };

    // $cordovaImagePicker.getPictures(options)
    //   .then(function (results) {
    //     // This allows for multiple images.
    //     for (var i = 0; i < results.length; i++) {
    //       console.log('Image URI: ' + results[i]);

    //       // Upload to S3
    //       S3FileUpload.upload('images', results[i]);
    //         // .then( function (response) {
    //         //   $scope.uploadImages.push(response.public_url);
    //         // })
    //     }
    //   }, function(error) {
    //     // error getting photos
    //   });
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

  function setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }

  function openFilePicker() {
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
      console.log(">>>>>>>>> Picked a file, next let's get a fileEntry we can upload");
      getFileEntry(imageUri);
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
  }

  function getFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
      console.log(">>>>>>>>> Let's see if we can upload something");
      // Create file object using fileEntry
      fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
          console.log("Successful file read: " + this.result);
          var blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
          blob.name = file.name;
          console.log("File name: " + blob.name);
          console.log("File type: " + blob.type);
          console.log("File size: " + blob.size);
          S3FileUpload.upload('images', blob).then(
            function(imageResp) {
              console.log("<<<<< Image Response >>>>>")
              console.log(imageResp.public_url);
            }
          );
          // displayFileData(fileEntry.fullPath + ": " + this.result);
        };

        reader.readAsArrayBuffer(file);

      }, function() {
        console.log('file read failed');
      });

      console.log("got file: " + fileEntry.fullPath);
    }, function () {
      // If don't get the FileEntry (which may happen when testing
      // on some emulators), copy to a new FileEntry.
        createNewFileEntry(imgUri);
    });
  }

  function createNewFileEntry(imgUri) {
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
      // JPEG file
      dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {
        // Do something with it, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        console.log("got file: " + fileEntry.fullPath);
        // displayFileData(fileEntry.fullPath, "File copied to");

      }, onErrorCreateFile);

    }, onErrorResolveUrl);
  }
}
