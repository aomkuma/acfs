angular.module('e-homework').controller('BudgetDisbursementController', function($scope, $cookies, $filter, $state, $uibModal, HTTPService, IndexOverlayFactory) {
	//console.log('Hello !');
    $scope.DEFAULT_LANGUAGE = 'TH';
    $scope.menu_selected = 'palace';
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }

    $scope.load = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            console.log(result);
            $scope.Data = null;
            $scope.DataList = result.data.DATA.Data;
            console.log($scope.DataList);
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.edit = function(data){
        $scope.AttachFile = null;
        $scope.Data = angular.copy(data);
        
        $scope.PAGE = 'UPDATE';
    }

    $scope.add = function(){
        $scope.AttachFile = null;
        $scope.Data = {'actives':'Y'};
        $scope.PAGE = 'UPDATE';
    }

    $scope.cancelUpdate = function(){
        $scope.AttachFile = null;
        $scope.Data = null;
        $scope.PAGE = 'MAIN';
    }

    $scope.save = function(action, Data, AttachFile){
        // console.log($scope.Data);
        //IndexOverlayFactory.overlayShow();
 
        var params = {'Data':Data, 'AttachFile' : AttachFile};
        HTTPService.uploadRequest(action, params).then(function(result){
            console.log(result);
            $scope.PAGE = 'MAIN';
            if(result.data.STATUS == 'OK'){
                $scope.AttachFile = null;
                $scope.load('budget-disbursement');
                $scope.cancelUpdate();
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.remove = function(action, id){
        $scope.alertMessage = 'ต้องการลบข้อมูลนี้ ใช่หรือไม่ ?';
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
            // $scope.load('Datas');
            $scope.load('budget-disbursement');
            IndexOverlayFactory.overlayHide();
        });
        });
        
    }

    $scope.getMonthName = function(month){
        return getThaiMonthName(month);
    }

    $scope.AttachFile = null;
    $scope.Data = null;

    $scope.YearList = getYearList(20);
    $scope.MonthList = getMonthList();

    $scope.PAGE = 'MAIN';
    $scope.load('budget-disbursement');

});