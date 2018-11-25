angular.module('app').controller('UserAccountController', function($scope, $compile, $cookies, $filter, $state, $uibModal, $routeParams, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! user-account page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'user-account';

    $scope.loadAdmin = function(action){
        var params = {'currentPage': $scope.currentPage
                    , 'limitRowPerPage': $scope.limitRowPerPage 
                    };
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Admin = result.data.DATA.Admin;
                $scope.totalPages = result.data.DATA.Total;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadUser = function(action){
        var params = {'currentPage': $scope.currentPage
                    , 'limitRowPerPage': $scope.limitRowPerPage 
                    };
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.User = result.data.DATA.User;
                $scope.totalPages = result.data.DATA.Total;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.removeAdmin = function(id){
        $scope.alertMessage = 'ต้องการลบรายชื่อ admin นี้ ใช่หรือไม่ ?';
        var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'views/dialog_confirm.html',
            size : 'sm',
            scope : $scope,
            backdrop : 'static',
            controller : 'ModalDialogCtrl',
            resolve : {
                params : function() {
                    return {};
                } 
            },
        });
        modalInstance.result.then(function (valResult) {
            IndexOverlayFactory.overlayShow();
            var params = {'id' : id};
            HTTPService.clientRequest('user-account/delete/admin', params).then(function(result){
                console.log(result);
                if(result.data.STATUS == 'OK'){
                    $scope.loadAdmin('user-account/list/admin');
                    IndexOverlayFactory.overlayHide();
                }else{
                    IndexOverlayFactory.overlayHide();
                }
            
            });
        });
    }

    $scope.removeUser = function(id){
        $scope.alertMessage = 'ต้องการลบรายชื่อ User นี้ ใช่หรือไม่ ?';
        var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'views/dialog_confirm.html',
            size : 'sm',
            scope : $scope,
            backdrop : 'static',
            controller : 'ModalDialogCtrl',
            resolve : {
                params : function() {
                    return {};
                } 
            },
        });
        modalInstance.result.then(function (valResult) {
            IndexOverlayFactory.overlayShow();
            var params = {'id' : id};
            HTTPService.clientRequest('user-account/delete/user', params).then(function(result){
                console.log(result);
                if(result.data.STATUS == 'OK'){
                    $scope.loadAdmin('user-account/list/user');
                    IndexOverlayFactory.overlayHide();
                }else{
                    IndexOverlayFactory.overlayHide();
                }
            
            });
        });
    }

    $scope.goAdminUpdate = function(id){
        window.location.href = '#/user-account/update/admin/' + id;
    }

    $scope.goUserUpdate = function(id){
        window.location.href = '#/user-account/update/user/' + id;
    }

    $scope.goUserTab = function(){
        $scope.totalPages = 0;
        $scope.currentPage = 0;
        $scope.limitRowPerPage = 10;
        $scope.limitDisplay = 5;
        $scope.loadUser('user-account/list/user');
    }

    $scope.goAdminTab = function(){
        $scope.totalPages = 0;
        $scope.currentPage = 0;
        $scope.limitRowPerPage = 10;
        $scope.limitDisplay = 5;
        $scope.loadAdmin('user-account/list/admin');
    }

    $scope.totalPages = 0;
    $scope.currentPage = 0;
    $scope.limitRowPerPage = 10;
    $scope.limitDisplay = 5;

    $scope.ActiveTab = 0;

    IndexOverlayFactory.overlayHide();
    
    
    

    if($routeParams.indexTab != undefined && $routeParams.indexTab != null){
        $scope.ActiveTab = parseInt($routeParams.indexTab);
    }

    if($scope.ActiveTab == 0){
        $scope.loadAdmin('user-account/list/admin');
    }else{
        $scope.loadUser('user-account/list/user');
    }

});