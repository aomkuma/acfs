angular.module('app').controller('QuestionController', function($scope, $compile, $cookies, $filter, $state, $uibModal, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! questionnaire page');
    $scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'questionnaire';

    $scope.loadQuestionnaire = function(action, questionType){
        var params = {'currentPage': $scope.currentPage
                    , 'limitRowPerPage': $scope.limitRowPerPage 
                    , 'questionType':questionType
                    };
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Questionnaire = result.data.DATA.Questionnaire;
                $scope.totalPages = result.data.DATA.Total;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    
    $scope.removeQuestionnaire = function(id, type){
        $scope.alertMessage = 'ต้องการลบแบบสอบถามนี้ ใช่หรือไม่ ?';
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
            HTTPService.clientRequest('questionnaire/delete', params).then(function(result){
                console.log(result);
                if(result.data.STATUS == 'OK'){
                    $scope.loadQuestionnaire('questionnaire/list', type);
                    IndexOverlayFactory.overlayHide();
                }else{
                    IndexOverlayFactory.overlayHide();
                }
            
            });
        });
    }

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        $scope.loadQuestionnaire('questionnaire/list');
    }

    $scope.goUpdate = function(id, questionType){
        window.location.href = '#/questionnaire/update/' + questionType + '/' + id;
    }

    $scope.totalPages = 0;
    $scope.currentPage = 0;
    $scope.limitRowPerPage = 10;
    $scope.limitDisplay = 5;

    IndexOverlayFactory.overlayHide();
    $scope.loadQuestionnaire('questionnaire/list' , 'normal');

});
