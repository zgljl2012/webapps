// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova','starter.controllers','LocalStorageModule'])
    .run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
              StatusBar.styleDefault();
            }
            Date.prototype.format = function(format){ 
                var o = { 
                "M+" : this.getMonth()+1, //month 
                "d+" : this.getDate(), //day 
                "h+" : this.getHours(), //hour 
                "m+" : this.getMinutes(), //minute 
                "s+" : this.getSeconds(), //second 
                "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
                "S" : this.getMilliseconds() //millisecond 
                } 

                if(/(y+)/.test(format)) { 
                    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
                } 

                for(var k in o) { 
                    if(new RegExp("("+ k +")").test(format)) { 
                        format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
                    } 
                } 
                return format; 
            };
//            var db = $cordovaSQLite.openDB({ name: "my.db" });
//            $cordovaSQLite.execute(db, 
//                "CREATE TABLE IF NOT EXISTS missions "+
//                    "(time timestamp primary key, work text, status integer, finishTime timestamp)");
        });
    })
    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,
        localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix("tomato-work");
        //使用$ionicConfigProvider服务解决ionic项目生成的导航栏在手机顶部的问题
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        // 使用$stateProvider中的state()方法来进行路由的配置，这是ionic种的路由实现机制
        // 此处，没有使用AngularJS中的路由机制
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/working');
        
        $stateProvider
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract:true,
                templateUrl: 'templates/tabs.html'
            })
            //工作模块
            .state('tab.working',{
                url:'/working',
                cache:false,
                views:{
                    'tab-working':{
                        templateUrl:'templates/tab-working.html',
                        controller:'WorkingCtrl'
                    }
                }
            })
            // 历史模块
            .state('tab.history',{
                url:'/history',
                cache:false,
                views:{
                    'tab-history':{
                        templateUrl:'templates/tab-history.html',
                        controller:"HistoryCtrl"
                    }
                }
            })
            // 任务模块
            .state('tab.mission',{
                url:'/mission',
				cache:true,
				animation:'slide-in-left',
                views:{
                    'tab-mission':{
                        templateUrl:'templates/tab-mission.html',
                        controller:"MissionCtrl"
                    }
                }
            })
    })   
;
