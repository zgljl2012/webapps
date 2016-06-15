/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('history-controller',[])
    .controller('HistoryCtrl',['$scope', 'localStorageService', 'dataService','$timeout', function($scope, 
        localStorageService,dataService,$timeout){
        var missions = localStorageService.get("missions");
        $scope.missions = dataService.find(missions,{status:2});
        
    }])
    ;
