var testApp = angular.module("test_app", []);

testApp.controller("ItemsCtrl", ['$scope', '$http', function ($scope, $http) {
  $scope.ajax_loader = true;
  
    $http.get('http://ziggeo-app.herokuapp.com/items')
      .success(function (data) {
        $scope.items = data;
        $scope.ajax_loader = false;
      })
      .error(function (data, status, headers, config) {
         //  Do some error handling here
    });

  $scope.filter = {};
  $scope.search_name = "";

    $scope.getNames = function () {
        return ($scope.items || []).map(function (i) {
            return i.name;
        }).filter(function (i, idx, arr) {
            return arr.indexOf(i) === idx;
        });
    };
    
    $scope.filterByNames = function (item) {
      return $scope.filter[item.name] || nameFilter(item.name);
    };

    function nameFilter(name){
      var search_name = $scope.search_name.toLowerCase();
      if (search_name && search_name != ""){
        var nameReg = new RegExp(search_name);      
        name = name.replace(/\s{2,}/g, ' ');
        return nameReg.test(name.toLowerCase());
      }
      else{
        return false;
      }
    }
          
}]);