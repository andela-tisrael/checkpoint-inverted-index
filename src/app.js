// Angular Module InvertedIndex
angular.module('InvertedIndex', [])
    // Angular Controller IndexCtrl
    .controller('IndexCtrl', ['$scope', '$timeout', ($scope, $timeout) => {
      const index = new InvertedIndex();
      $scope.indexes = null;
      $scope.setIndex = () => {
        return index.getIndex();
      };
      $scope.search = () => {
        if ($scope.words === undefined) {
          $scope.error = 'Upload and Create an index first before search';
        } else if ($scope.searchIndex === undefined) {
          $scope.error = 'Search field cannot be empty';
        } else {
          $scope.error = '';
          $scope.words = index.search($scope.searchIndex);
        }
      };
        // Create index
      $scope.createIndex = () => {
        $scope.error = '';
        index.indexMap = {};
        const file = document.getElementById('json-file').files[0];
        //  console.log(file);
        if (!file.name.toLowerCase().match(/\.json$/)) {
          error = ('This is not a JSON file.');
          return;
        }
        const reader = new FileReader();
        // Read uploaded file
        reader.onloadend = (e) => {
          try {
            // console.log(e);
            const data = JSON.parse(e.target.result);
            // console.log(data);
            // Validate format
            if (typeof (data) !== 'object') {
              $scope.error = 'Invalid JSON Format';
              return;
            }
            // Create index
            index.createIndex(data);
          } catch (ex) {
            $scope.error = 'Invalid JSON Format';
          }
          // display index
          $timeout(function() {
            $scope.$apply = () => {
              $scope.words = $scope.setIndex();
              $scope.indexes = index.docCount;
              // console.log($scope.words);
            };
          }, 1000);
        };
        reader.readAsBinaryString(file);
      };
    }]);
