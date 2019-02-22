angular.module('app').controller('ReportController', function($scope, $compile, $cookies, $filter, $state, $uibModal, $routeParams, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! report page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'report';

    $scope.loadCommodityStandard = function(action, years){
        IndexOverlayFactory.overlayShow();
        var params = {'years':years};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.StandardList = result.data.DATA.CommodityStandard;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadQuestionnaire = function(action){
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, $scope.condition3).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.QuestionnaireList = result.data.DATA.Questionnaire;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadSubcommittee = function(action){
        console.log(action);
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, null).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.SubcommitteeList = result.data.DATA.Subcommittee;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadAcademicBoard = function(action){
        var params = {
                    'masterType':'AcademicBoard'
                    };
        HTTPService.clientRequest('masterfile/get', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.AcademicBoardList = result.data.DATA;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadBranch = function(){
        var params = {
                    'masterType':'Branch'
                    };
        HTTPService.clientRequest('masterfile/get', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.BranchList = result.data.DATA;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.exportReport = function(report_type, condition){
        var params = {'report_type':report_type, 'condition': condition};
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest('report/export', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                window.location.href="../files/files/downloads/" + result.data.DATA;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.YearList = getYearList(20);

    IndexOverlayFactory.overlayHide();
    $scope.loadCommodityStandard('commodity-standard/list/active', '');
    $scope.loadQuestionnaire('questionnaire/list/active'); 
    $scope.loadSubcommittee('subcommittee/list/active');   
    $scope.loadAcademicBoard('commodity-standard/academic-board/list');
    $scope.loadBranch();

});