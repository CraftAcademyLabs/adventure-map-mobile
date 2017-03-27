function userController($scope, $ionicPlatform, md5, $ionicModal, FileService) {
  $scope.files = [];
  $scope.profileImage = function () {
    if ($scope.user.id !== undefined) {
      if ($scope.user.image) {
        return $scope.user.image;
      } else {
        var options = {size: 128, format: 'svg'};

        var hashedEmail = md5.createHash($scope.user.email);
        return 'data:image/svg+xml;base64,' + new Identicon(hashedEmail, options).toString();
      }
    }
  };

  $ionicModal.fromTemplateUrl('templates/file.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.showFile = function (object) {
    FileService.readFile(object, $scope)
  };

  $ionicPlatform.ready(function () {
    try {
      FileService.readDirectory(window, $scope);
    } catch (e) {
      console.log("Corvova plugins aren't available in browsers.");
      console.log(e);
    }
  });
}
