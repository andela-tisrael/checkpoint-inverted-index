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
            let files = e.target.files;
            let output = [];
            for (let i = 0; i < files.length; i++) {
                $scope.fileList.push(files[i]);
                $scope.fileName.push(files[i].name);
            }
            for (let i = 0, f; f = files[i]; i++) {
            let indexNames = output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',

                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
            $scope.$apply();
        });
        $scope.setIndex = function() {
            if (index.docCount.length === 0) {
                $scope.error = 'JSON file should not be empty';
                return;
            }
            return index.getIndex();
        };
        $scope.search = () => {
            if ($scope.words === undefined) {
                $scope.error = 'Upload and Create an index first before search';
            } else if ($scope.searchIndex === undefined) {
                $scope.error = 'Search field cannot be empty';
            } else {
                $scope.error = '';
                let searchArray = $scope.searchIndex.split(' ');
                $scope.words = index.search($scope.searchIndex);
                //Raise alert that a word is not present in the index
                for(let word in searchArray){
                    if(!(searchArray[word] in $scope.words)){
                        alert(searchArray[word] + ' not found in index');
                    }
                }    
            }
        };
        // Create index
        $scope.createIndex = () => {
            for (list in $scope.fileList) {
                if ($scope.fileSelected == $scope.fileList[list].name) {
                    this.data = $scope.fileList[list];
                } 
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
                    });
                }, 1000);
            };
            reader.readAsBinaryString(this.data);
        };
    }]);