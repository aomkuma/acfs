angular.module('app').controller('StakeholderController', function($scope, $compile, $cookies, $filter, $state, $uibModal, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! stakeholder page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'stakeholder';

    $scope.loadStakeholder = function(action){
        var params = {'currentPage': $scope.currentPage
                    , 'limitRowPerPage': $scope.limitRowPerPage 
                    };
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Stakeholders = result.data.DATA.Stakeholder;
                $scope.totalPages = result.data.DATA.Total;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadSubcommittee = function(action){
        console.log(action);
        var params = {'currentPage': $scope.currentPage
                    , 'limitRowPerPage': $scope.limitRowPerPage 
                    };
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Subcommittee = result.data.DATA.Subcommittee;
                $scope.totalPages = result.data.DATA.Total;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.removeStakeholders = function(id){
        $scope.alertMessage = 'ต้องการลบรายชื่อบุคคลนี้ ใช่หรือไม่ ?';
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
            HTTPService.clientRequest('stakeholder/delete', params).then(function(result){
                console.log(result);
                if(result.data.STATUS == 'OK'){
                    $scope.loadStakeholder('stakeholder/list');
                    IndexOverlayFactory.overlayHide();
                }else{
                    IndexOverlayFactory.overlayHide();
                }
            
            });
        });
    }

    $scope.removeSubcommittee = function(id){
        $scope.alertMessage = 'ต้องการลบคณะอนุกรรมการนี้ ใช่หรือไม่ ?';
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
            HTTPService.clientRequest('subcommittee/delete', params).then(function(result){
                console.log(result);
                if(result.data.STATUS == 'OK'){
                    $scope.loadSubcommittee('subcommittee/list')
                    IndexOverlayFactory.overlayHide();
                }else{
                    IndexOverlayFactory.overlayHide();
                }
            
            });
        });
    }

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        $scope.loadStakeholder('stakeholder/list');
    }

    $scope.goUpdate = function(id){
        window.location.href = '#/stakeholder/update/' + id;
    }

    $scope.goUpdateSubcommittee = function(id){
        window.location.href = '#/subcommittee/update/' + id;
    }

    $scope.totalPages = 0;
    $scope.currentPage = 0;
    $scope.limitRowPerPage = 10;
    $scope.limitDisplay = 5;

    IndexOverlayFactory.overlayHide();
    $scope.loadStakeholder('stakeholder/list');

});