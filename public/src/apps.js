/*  eslint-disable no-undef*/
/*jshint esnext: true */
// Angular Module InvertedIndex
angular.module('InvertedIndex', [])
  // Angular Controller IndexCtrl
  .controller('IndexCtrl', ['$scope', ($scope) => {
    $scope.index = new InvertedIndex();
    $scope.fileList = [];
    $scope.template = true;
    $scope.displayAll = false;
    $scope.displayTable = true;
    $scope.uploadedFile = [];
    $scope.documents = null;
    $scope.fileName = [];
    $scope.indexes = null;
    $scope.data = null;
    $scope.showSearch = false;
    // Select file to index
    document.getElementById('json-file').addEventListener('change', (e) => {
      const files = e.target.files;
      const output = [];
      for (let i = 0; i < files.length; i+=1) {
        $scope.getFiles(files[i]);
      }
      for (let i = 0, f; f = files[i]; i+=1) {
        const indexNames = output.push('<li><strong>', escape(f.name), '</strong><br>',

          f.size, ' bytes',
          '</li>');
      }
      document.getElementById('list').innerHTML = `${'<ul>'}${output.join('')}${'</ul>'}`;
      $scope.$apply();
    });

    $scope.setIndex = () => {
      if ($scope.index.docCount.length === 0) {
        $scope.error = $scope.index.contentIsEmpty(); // 'JSON file should not be empty'
        return;
      }
      $scope.showSearch = true;
      return $scope.index.getIndex($scope.fileSelected);
    };

    $scope.getFiles = (files) => {
      checkFile = InvertedIndex.fileIsValid(files);
      if (!checkFile) {
        $scope.error = 'This is not a JSON file.';
        return;
      } else {
        $scope.error = ' ';
        const reader = new FileReader();
        //Read the uploaded file after JSON validation
        reader.onloadend = (e) => {
          try {
            this.data = JSON.parse(e.target.result);
            if (typeof (this.data) === 'object') {
              console.log(files.name);
              console.log(data);
              $scope.$apply(() => {
                $scope.fileName.push(files.name);
                $scope.index.uploadedFiles[files.name] = this.data;
              });
            }
          } catch (ex) {
            $scope.$apply(() => {
              $scope.error = 'Invalid JSON Format';
            });
          }
        };
        reader.readAsBinaryString(files);

      }
    };

    $scope.createIndex = () => {
      $scope.template = false;
      $scope.error = '';
      $scope.index.indexMap = {};
      try {
        $scope.index.createIndex($scope.index.uploadedFiles[$scope.fileSelected], $scope.fileSelected);
        console.log($scope.index.fileMap);
        $scope.words = $scope.setIndex();
        $scope.indexes = $scope.index.docNumber[$scope.fileSelected];
        $scope.documents = $scope.index.docNumber;
      } catch (ex) {
        $scope.template = true;
        var i = $scope.fileName.indexOf($scope.fileSelected);
        if (i != -1) {
          $scope.fileName.splice(i, 1);
        }
        $scope.fileSelected = '';
        $scope.error = 'Invalid JSON format';
      }
      if ($scope.fileSelected !== '') {
        $scope.uploadedFile.push($scope.fileSelected);
      }
    };

    $scope.search = () => {
      $scope.template = false;
      try {
        if ($scope.words === undefined) {
          $scope.error = 'Upload and Create an index first before search';
        } else if ($scope.searchIndex === undefined) {
          $scope.error = 'Search field cannot be empty';
        } else if ($scope.searchIndex === '') {
          $scope.error = 'Search field cannot be empty';
        } else {
          $scope.error = '';
          console.log($scope.fileTitle);

          if ($scope.fileTitle == "all") {
            $scope.displayTable = false;
            $scope.displayAll = true;
          } else {
            $scope.displayTable = true;
            $scope.displayAll = false;
          }

          $scope.words = $scope.index.search($scope.searchIndex, $scope.fileTitle);
          $scope.indexes = $scope.index.docNumber[$scope.fileTitle];
          console.log($scope.words);
        }
      } catch (ex) {
        $scope.error = 'Select the file to search first';
      }
    };
  }]);
