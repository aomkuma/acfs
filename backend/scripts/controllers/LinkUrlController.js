angular.module('e-homework').controller('LinkUrlController', function($scope, $compile, $cookies, $filter, $state, $uibModal, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! LinkUrl page');
    $scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'relatelink';

    $scope.load = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            console.log(result);
            $scope.LinkUrl = null;
            $scope.LinkUrlList = result.data.DATA.LinkUrl;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.edit = function(data){
        $scope.AttachFile = null;
        $scope.LinkUrl = angular.copy(data);
        
        $scope.PAGE = 'UPDATE';
    }

    $scope.add = function(){
        $scope.AttachFile = null;
        $scope.LinkUrl = null;
        $scope.PAGE = 'UPDATE';
    }

    $scope.cancelUpdate = function(){
        $scope.AttachFile = null;
        $scope.LinkUrl = null;
        $scope.PAGE = 'MAIN';
    }

    $scope.save = function(action, LinkUrl, AttachFile){
        // console.log($scope.LinkUrl);
        IndexOverlayFactory.overlayShow();
 
        var params = {'LinkUrl':LinkUrl, 'AttachFile':AttachFile};
        HTTPService.uploadRequest(action, params).then(function(result){
            console.log(result);
            $scope.PAGE = 'MAIN';
            if(result.data.STATUS == 'OK'){
                $scope.AttachFile = null;
                $scope.load('linkurl');
                $scope.cancelUpdate();
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.remove = function(action, id){
        $scope.alertMessage = 'ต้องการลบลิ้งค์นี้ ใช่หรือไม่ ?';
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
            HTTPService.deleteRequest(action, id).then(function(result){
            // $scope.load('LinkUrls');
            $scope.load('linkurl');
            IndexOverlayFactory.overlayHide();
        });
        });
        
    }

    $scope.AttachFile = null;
    $scope.LinkUrl = null;

    $scope.PAGE = 'MAIN';
    $scope.load('linkurl');

});