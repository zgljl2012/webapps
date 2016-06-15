/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('mission-controller',[])
    .controller('MissionCtrl',['$scope', '$ionicPopup','localStorageService', 
        function($scope, $ionicPopup,localStorageService){
        $scope.data = {};
        $scope.addMission = function(){
            if($scope.data.mission) {
                var work = $scope.data.mission;
                var missions = localStorageService.get('missions');
                if(missions===null) {
                    missions = [];
                    localStorageService.set("missions", missions);
                }
                /**
                 * work：工作内容
                 * timestamp：加入时间戳
                 * status：0-刚创建，1-进行中，2-已完成
                 */
                var now = new Date(); 
                var nowStr = now.format("yyyy-MM-dd hh:mm:ss"); 
                var mission = {work:work,timestamp:nowStr,status:0};
                missions.push(mission);
                localStorageService.set("missions", missions);
                var popup = $ionicPopup.alert({
                    title: '温馨提示',
                    template: '任务已添加',
                    okText:"确定"
                });
                popup.then(function(){
                    $scope.data.mission = null;
                });
            } else {
                var popup = $ionicPopup.alert({
                    title: '温馨提示',
                    template: '请先输入任务',
                    okText:"确定"
                });
                popup.then();
            }
        };
    }])
    ;
