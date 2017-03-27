angular.module('adventureMap.fileService', [])
  .service('FileService', function ($q, $cordovaFile) {
    var saveToFileFunction = function (timestamp, route) {
      var fileName = (timestamp + ".txt");
      var routeObject = {
        file: fileName,
        createdAt: timestamp,
        route: route
      };
      var data = angular.toJson(routeObject, true);
      console.log(data);
      $cordovaFile.writeFile(cordova.file.dataDirectory, fileName, data, true)
        .then(function (success) {
          console.log(success);
          console.log('wrote to file: ' + fileName);
        }, function (error) {
          console.log('error in write');
          console.error(error.messageData);
        });
    };

    var readFileFunction = function(object, $scope){
      $cordovaFile.readAsText(cordova.file.dataDirectory, object.fileName)
        .then(function (content) {
          $scope.object = content;
          $scope.openModal()
        }, function (error) {
          // error
        });

    };

    var readDirectoryFunction = function(window, $scope){
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
        var directoryReader = dirEntry.createReader();
        var files = $q.when(directoryReader.readEntries(dirSuccess, dirFail));
        debugger;
      });
    }

    function dirSuccess(entries) {
      console.log("INFO: Listing entries");
      var files = [];
      var i;
      for (i = 0; i < entries.length; i++) {
        var timeStampFromFileName = new Date(parseFloat(entries[i].name.replace(/\.[^/.]+$/, "")));
        files.push({
          fileName: entries[i].name,
          date: timeStampFromFileName
        });
      }
      return files;
    }

    function dirFail(error) {
      console.log("Failed to list directory contents: " + error.code);
    }

    return {
      saveToFile: saveToFileFunction,
      readDirectory: readDirectoryFunction,
      readFile: readFileFunction
    }
  });

