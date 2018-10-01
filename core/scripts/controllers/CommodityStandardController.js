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
                        , 'currentPage': $scope.currentPage
                        , 'limitRowPerPage': $scope.limitRowPerPage
                        , 'standardIDToIgnore' : $scope.standardIDToIgnore
                        , 'viewType' : viewType
                    };
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.dataset = result.data.DATA.CommodityStandard;
                $scope.totalPages = result.data.DATA.Total;
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

    $scope.goUpdate = function(id){
        window.location.href = '#/commodity-standard/update/' + id;
    }

    $scope.getStatusText = function(step){
        return $scope.statusText[step];
    }

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        $scope.loadCommodityStandard('commodity-standard/list');
    }

    $scope.makeDateString = function(d){
        if(d!= null && d != ''){
            return convertDateToFullThaiDateIgnoreTime(new Date(d.split(' ')[0]));    
        }
        return '';
    }

    $scope.statusText = [''
                        , 'การพิจารณาเรื่อง'
                        , 'การแต่งตั้งคณะกรรมการ'
                        , 'การจัดทำร่างมาตรฐาน'
                        , 'พิจารณาร่างมาตรฐาน'
                        , 'การประสานความเห็นจากผู้มีส่วนได้เสีย'
                        , 'การเสนอคณะกรรมการมาตรฐาน'
                        , 'การรับฟังความเห็นจากต่างประเทศ'
                        , 'การเสนอรัฐมนตรีลงนามในประกาศ/กฎกระทรวง'
                        , 'ประกาศใช้'
                        , 'ยกเลิกการประกาศใช้'
                        , 'ทบทวน'
                        ];

    $scope.AcademicBoard = [];
    $scope.totalPages = 0;
    $scope.currentPage = 0;
    $scope.limitRowPerPage = 10;
    $scope.limitDisplay = 5;

    IndexOverlayFactory.overlayHide();
    $scope.loadCommodityStandard('commodity-standard/list', 'pending');

});