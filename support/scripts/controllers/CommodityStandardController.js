angular.module('app').controller('CommodityStandardController', function($scope, $compile, $cookies, $filter, $state, $uibModal, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! commodity-standard page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'commodity-standard';

    $scope.loadCommodityStandard = function(action, viewType){
        var params = {'userType':$scope.currentUser.userType
                        , 'userID': $scope.currentUser.adminID
                        , 'currentPage': $scope.Pagination.currentPage
                        , 'limitRowPerPage': $scope.Pagination.limitRowPerPage
                        , 'standardIDToIgnore' : $scope.standardIDToIgnore
                        , 'viewType' : viewType
                    };
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.dataset = result.data.DATA.CommodityStandard;
                $scope.Pagination.totalPages = result.data.DATA.Total;
                $scope.standardIDToIgnore = result.data.DATA.standardIDToIgnore;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadAcademicBoard = function(standardID){
        $scope.AcademicBoard = [];
        var params = {'standardID':standardID};
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest('academic-board/list', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.AcademicBoard = result.data.DATA.AcademicBoard;
                $scope.showAcademicBoard();
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.showAcademicBoard = function(){
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

    $scope.goUpdate = function(id, disabled_form){
        window.location.href = '#/commodity-standard/update/' + id + '/' + disabled_form;
    }

    $scope.getStatusText = function(step){
        return $scope.statusText[step];
    }

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        if($scope.ActiveTab == 0){
            $scope.loadCommodityStandard('commodity-standard/list', 'pending')
        }else if($scope.ActiveTab == 1){
            $scope.loadCommodityStandard('commodity-standard/list', 'inuse')
        }else if($scope.ActiveTab == 2){
            $scope.loadCommodityStandard('commodity-standard/list', 'cancelled'); 
        }
    }

    $scope.pageChanged = function() {
        $scope.goToPage($scope.currentPage);
        // $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.makeDateString = function(d){
        if(d!= null && d != '' && d != '0000-00-00 00:00:00'){
            console.log(d);
            return convertDateToFullThaiDateIgnoreTime(new Date(d.split(' ')[0]));    
        }
        return '';
    }

    $scope.changeTab = function(index){
        $scope.Pagination.totalPages = 0;
        $scope.Pagination.currentPage = 0;
        $scope.Pagination.limitRowPerPage = 10;
        $scope.Pagination.limitDisplay = 10;
        $scope.ActiveTab = index;
        if(index == 0){
            $scope.loadCommodityStandard('commodity-standard/list', 'pending')
        }else if(index == 1){
            $scope.loadCommodityStandard('commodity-standard/list', 'inuse')
        }else if(index == 2){
            $scope.loadCommodityStandard('commodity-standard/list', 'cancelled'); 
        }
        
    }

    $scope.statusText = [''
                        , 'การพิจารณาเรื่องที่สมควรกำหนดเป็นมาตรฐาน'
                        , 'การแต่งตั้งคณะกรรมการวิชาการ'
                        , 'การจัดทำร่างมาตรฐาน'
                        , 'การพิจารณาร่างมาตรฐาน'
                        , 'การประสานความเห็นจากผู้มีส่วนได้เสีย (จะเปิดรับฟังความคิดเห็น กำหนดเปิดหรือปิดรับฟังความคิดเห็นได้)'
                        , 'การเสนอคณะกรรมการมาตรฐานสินค้าเกษตร'
                        , 'การรับฟังความคิดเห็นจากต่างประเทศ (กรณีมาตรฐานบังคับ)'
                        , 'การเสนอรัฐมนตรีลงนามในประกาศ/กฎกระทรวง'
                        , 'ประกาศใช้'
                        , 'ยกเลิกการประกาศใช้'
                        , 'ทบทวน'
                        ];

    $scope.AcademicBoard = [];
    $scope.Pagination = {'totalPages' : 0, 'currentPage' : 0, 'limitRowPerPage' : 10, 'limitDisplay' : 10};
    // $scope.totalPages = 0;
    // $scope.currentPage = 0;
    // $scope.limitRowPerPage = 10;
    // $scope.limitDisplay = 5;
    $scope.ActiveTab = 0;

    IndexOverlayFactory.overlayHide();
    $scope.loadCommodityStandard('commodity-standard/list', 'pending');

});