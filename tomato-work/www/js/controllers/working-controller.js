/**
 * Created by zhoupan on 2015/9/15.
 */
angular.module('working-controller',[])
    .controller('WorkingCtrl',['$scope', 'localStorageService', '$interval','$ionicPopup',
        function($scope, localStorageService,$interval,$ionicPopup){
            var missions = localStorageService.get("missions");
            $scope.missions = missions;
            $scope.tomato = {
                m:0,
                s:0,
                showM:'00',
                showS:'00'
            };
            // 计时器状态：0-停止, 1-运行, 2-暂停
            $scope.status = 0;
            var clock = null;
            // 启动计时器
            $scope.start = function() {
                $scope.status = 1;
                $scope.tomato = {
                    m:0,
                    s:0,
                    showM:'00',
                    showS:'00'
                };
                // 时钟
                clock = $interval(function(){
                    if($scope.status !== 1) {
                        return;
                    }
                    var s = 3,m = 1;
                    $scope.tomato.s += 1;
                    if($scope.tomato.s === s) {
                        $scope.tomato.s = 0;
                        $scope.tomato.m += 1;
                    }
                    if($scope.tomato.m === m ) {
                        $interval.cancel(clock);
                        var popup = $ionicPopup.confirm({
                            title: '温馨提示',
                            template: '任务是否完成？',
                            okText:"完成",
                            cancelText:'没完成'
                        });
                        popup.then(function(res){
                            $scope.restart();
                            if(res){
                                console.log('1');
                            }
                        });
                    }
                    $scope.tomato.showM = 
                        $scope.tomato.m>=10?
                        $scope.tomato.m:'0'+$scope.tomato.m;
                    $scope.tomato.showS = 
                        $scope.tomato.s>=10?
                        $scope.tomato.s:'0'+$scope.tomato.s;
                },1000);
            };
            // 计时器暂停
            $scope.pause = function() {
                $scope.status = 2;
            };
            
            // 计时器恢复
            $scope.resume = function() {
                $scope.status = 1;
            };
            
            // 计时器停止
            $scope.restart = function() {
                if(clock !== null)
                    $interval.cancel(clock);
                $scope.status = 0;
                $scope.tomato = {
                    m:0,
                    s:0,
                    showM:'00',
                    showS:'00'
                };
            };
            
    }])
    ;
