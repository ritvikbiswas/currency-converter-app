var myApp = angular.module('myApp', []);

myApp.controller('AppController', [
    '$scope',
    function($scope){
        $scope.title = "Currency Converter";
    }
]);

myApp.controller('TickerController', [
    '$scope', '$timeout', '$interval', 
    function($scope, $timeout, $interval){
        $scope.boxes = [
            {title: 'Box 1'},
            {title: 'Box 2'},
            {title: 'Box 3'},
            {title: 'Box 4'},
            {title: 'Box 5'},
            {title: 'Box 6'},
            {title: 'Box 7'},
            {title: 'Box 8'},
            {title: 'Box 9'},
            {title: 'Box 10'}
        ]; 

        $scope.moving = false;
        $scope.moveLeft = function(){
            $scope.moving = true;
            $timeout($scope.switchFirst, 1000);
        };
        $scope.switchFirst = function(){
            $scope.boxes.push($scope.boxes.shift());
            $scope.moving = false;
            $scope.$apply();
        }

        $interval($scope.moveLeft, 2000);
    }
]);