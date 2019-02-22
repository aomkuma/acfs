angular.module('app').controller('UserAccountAdminUpdateController', function($scope, $compile, $cookies, $filter, $state, $routeParams, $uibModal, HTTPService, IndexOverlayFactory) {
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

    $scope.ID = $routeParams.id;

    $scope.loadAdmin = function(action, id){
        var params = {'id' : id};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Admin = result.data.DATA.Admin;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.saveAdmin = function(data){
        var params = {'Admin' : data};
        HTTPService.clientRequest('user-account/update/admin', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                // if($scope.ID === undefined){
                //     window.location.href = '#/user-account/update/admin/' + result.data.DATA.adminID;
                // }else{
                //     $scope.ID = result.data.DATA.adminID;
                //     $scope.loadAdmin('user-account/get/admin', $scope.ID);
                //     IndexOverlayFactory.overlayHide();
                // }
                window.location.href = '#/user-account/0';
                
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.cancelUpdate = function(id){
        window.location.href = '#/user-account';
    }

    $scope.setAdmin = function(){
        $scope.Admin = {
                        'adminID' : ''
                        , 'adminType' : 'normal'
                        , 'name' : ''
                        , 'lastName' : ''
                        , 'position' : ''
                        , 'department' : ''
                        , 'phone' : ''
                        , 'email' : ''
                        , 'password' : ''
                        , 'createBy' : $scope.currentUser.adminID
                        , 'createDate' : ''
                        , 'updateBy' : $scope.currentUser.adminID
                        , 'updateDate' : ''
                };
    }

    $scope.confirmPassword = '';

    IndexOverlayFactory.overlayHide();
    
    if($scope.ID !== undefined){
        $scope.loadAdmin('user-account/get/admin', $scope.ID);
    }else{
        $scope.setAdmin();
    }

});