//Angular Module InvertedIndex
angular.module('InvertedIndex', [])
    //Angular Controller IndexCtrl
    .controller('IndexCtrl', ['$scope', '$timeout', ($scope, $timeout) => {
        const index = new InvertedIndex();
        $scope.fileList = [];
        $scope.fileName = [];
        $scope.indexes = null;
        //Select file to index
        document.getElementById('json-file').addEventListener('change', function(e) {
            for (let i = 0; i < e.target.files.length; i++) {
                $scope.fileList.push(e.target.files[i]);
                $scope.fileName.push(e.target.files[i].name);
            }
            $scope.$apply();
            console.log($scope.fileList);
        });
        console.log($scope.fileList);
        $scope.setIndex = function() {
            if (index.docCount.length === 0) {
                $scope.error = 'JSON file should not be empty';
                return;
            }
            return index.getIndex();
        };
        $scope.search = () => {
            console.log($scope.words);
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
            for (list in $scope.fileList) {
                if ($scope.fileSelected == $scope.fileList[list].name) {
                    this.data = $scope.fileList[list];
                } //$scope.fileSelected in $scope.fileList[0].name);
            }
            $scope.error = '';
            index.indexMap = {};
            if (!$scope.fileSelected.toLowerCase().match(/\.json$/)) {
                $scope.error = ('This is not a JSON file.');
                return;
            }
            const reader = new FileReader();
            // Read uploaded file
            reader.onloadend = (e) => {
                try {
                    this.data = JSON.parse(e.target.result);
                    console.log(data);
                    // Validate format
                    if (typeof(data) !== 'object') {
                        $scope.error = 'Invalid JSON Format';
                        return;
                    }
                    // Create index
                    index.createIndex(data);
                } catch (ex) {
                    $scope.error = 'Invalid JSON Format';
                }
                //display index
                $timeout(function() {
                    $scope.$apply(function() {
                        $scope.words = $scope.setIndex();
                        $scope.indexes = index.docCount;
                        console.log($scope.words);
                    });
                }, 1000);
            };
            reader.readAsBinaryString(this.data);
        };
    }]);
