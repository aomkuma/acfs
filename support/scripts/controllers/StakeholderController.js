angular.module('app').controller('StakeholderController', function($scope, $compile, $cookies, $filter, $state, $uibModal, $routeParams, HTTPService, IndexOverlayFactory) {
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
        var params = {'currentPage': $scope.Pagination.currentPage
                        , 'limitRowPerPage': $scope.Pagination.limitRowPerPage
                        };
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Stakeholders = result.data.DATA.Stakeholder;
                $scope.Pagination.totalPages = result.data.DATA.Total;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadSubcommittee = function(action){
        console.log(action);
        var params = {'currentPage': $scope.Pagination.currentPage
                        , 'limitRowPerPage': $scope.Pagination.limitRowPerPage
                    };
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Subcommittee = result.data.DATA.Subcommittee;
                $scope.Pagination.totalPages = result.data.DATA.Total;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadAcademicBoard = function(action){
        console.log(action);
        var params = {'currentPage': $scope.Pagination.currentPage
                        , 'limitRowPerPage': $scope.Pagination.limitRowPerPage
                    };
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.AcademicBoardList = result.data.DATA.AcademicBoard;
                $scope.Pagination.totalPages = result.data.DATA.Total;
                 IndexOverlayFactory.overlayHide();
                 console.log($scope.AcademicBoard);
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
        if($scope.ActiveTab == 0){
            $scope.loadStakeholder('stakeholder/list');
        }else if($scope.ActiveTab == 1){
            $scope.loadAcademicBoard('commodity-standard/academic-board/list');
        }else if($scope.ActiveTab == 2){
            $scope.loadSubcommittee('subcommittee/list'); 
        }
        
    }

    $scope.pageChanged = function() {
        $scope.goToPage($scope.currentPage);
        // $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.goUpdate = function(id){
        window.location.href = '#/stakeholder/update/' + id;
    }

    $scope.goUpdateSubcommittee = function(id){
        window.location.href = '#/subcommittee/update/' + id;
    }

    $scope.goUpdateAcademicBoard = function(academicBoard){
        console.log(academicBoard);
        $scope.AcademicBoard = angular.copy(academicBoard);
        console.log($scope.AcademicBoard);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'show_academic_board.html',
            size: 'lg',
            scope: $scope,
            backdrop: 'static',
            controller: 'ModalDialogReturnFromOKBtnCtrl',
            resolve: {
                params: function () {
                    return {};
                }
            },
        });
    }

    $scope.changeTab = function(index){
        $scope.Pagination.totalPages = 0;
        $scope.Pagination.currentPage = 0;
        $scope.Pagination.limitRowPerPage = 10;
        $scope.Pagination.limitDisplay = 10;
        $scope.ActiveTab = index;
        if(index == 0){
            $scope.loadStakeholder('stakeholder/list');    
        }else if(index == 1){
            $scope.loadAcademicBoard('commodity-standard/academic-board/list');
        }else if(index == 2){
            $scope.loadSubcommittee('subcommittee/list'); 
        }
        
    }

    $scope.Pagination = {'totalPages' : 0, 'currentPage' : 0, 'limitRowPerPage' : 10, 'limitDisplay' : 10};
    

    $scope.ActiveTab = 0;

    IndexOverlayFactory.overlayHide();
    

    if($routeParams.indexTab != undefined && $routeParams.indexTab != null){
        $scope.ActiveTab = parseInt($routeParams.indexTab);
    }

    if($scope.ActiveTab == 0){
        $scope.loadStakeholder('stakeholder/list');
    }else if($scope.ActiveTab == 1){
        $scope.loadAcademicBoard('commodity-standard/academic-board/list');
    }else{
        $scope.loadSubcommittee('subcommittee/list');
    }

});