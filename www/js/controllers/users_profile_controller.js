function usersProfileController($scope,
                           $ionicLoading,
                           $ionicPlatform,
                           MyActivities,
                           MyFollowers,
                           Save,
                           User,
                           Users,
                           md5) {


    $scope.users = Users;
    console.log($scope.users)

    showMyActivities = function () {
        console.log(user)
        $ionicLoading.show({
            template: 'Getting activities'
        })
        // Scope empties out at some point! That's why we need the user in $localStorage
        MyActivities.get({id: user.id}, function (resp) {
            console.log(resp)
            $ionicLoading.hide()
            if (resp.status === 'success') {
                // Sort by date
                $scope.myActivities = resp.data.sort(function (a, b) {
                    return Date.parse(b.created_at) - Date.parse(a.created_at)
                })

                console.log(resp)
            } else {
                console.log('error ' + resp.message[0])
                $ionicPopup.alert({
                    title: resp.message[0]
                })
            }
        }, function (resp) {
            $ionicLoading.hide()
        })
    }

    $scope.showMyActivities = function () {
        $ionicPlatform.ready(function () {
            showMyActivities()
        })
    }

    showFollows = function (request) {
        console.log(user);
        console.log(request);
        $ionicLoading.show({
            template: 'Getting users I follow...'
        })
        MyFollowers.get({request: request}, function (resp) {
            // console.log(resp);
            $ionicLoading.hide()
            if (resp.status == 'success') {
                // Sort by name
                $scope.myFollow = resp.users.sort(function (a, b) {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                })

                console.log($scope.myFollow)
            } else {
                console.log('error ' + resp.message[0])
                $ionicPopup.alert({
                    title: resp.message[0]
                })
            }
        }, function (resp) {
            $ionicLoading.hide()
        })
    }

    $scope.showFollows = function (request) {
        $ionicPlatform.ready(function () {
            // $window.location.reload(true);
            showFollows(request)
        })
    }

    showSavedActivities = function () {
        $ionicLoading.show({
            template: 'Getting my saved activities...'
        })
        Save.get(function (resp) {
            $ionicLoading.hide()
            if (resp.status === 'success') {
                $scope.mySaves = resp.data.sort(function (a, b) {
                    if (a.created_at < b.created_at) return -1
                    if (a.created_at > b.created_at) return 1
                    return 0
                })
                console.log($scope.mySaves)
            } else {
                $ionicPopup.alert({
                    title: resp.message[0]
                })
            }
        }, function (resp) {
            $ionicLoading.hide()
        })
    }

    $scope.showSavedActivities = function () {
        $ionicPlatform.ready(function () {
            showSavedActivities()
        })
    }

    $scope.othersProfileImage = function (index) {
        if ($scope.myFollow[index] !== undefined) {
            if ($scope.myFollow[index].image) {
                return $scope.myFollow[index].image
            } else {
                var options = {size: 50, format: 'svg'}

                var hashedName = md5.createHash($scope.myFollow[index].name)
                return 'data:image/svg+xml;base64,' + new Identicon(hashedName, options).toString()
            }
        }
    }

    $scope.updateProfile = function () {
        console.log($scope.user);

        $scope.user.interest_list = setInterestList().join(', ');
        User.update($scope.user, function (resp) {
            if (resp.status === 'success') {
                console.log(resp)
                $scope.editProfileModal.hide()
            }
        })
    }
}


