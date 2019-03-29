angular.module('e-homework').controller('StandardCommodityCertificationController', function($scope, $compile, $cookies, $filter, $state, $sce, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! StandardCommodityCertification page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'video';
    $scope.page_type = 'standard-commodity-certification';

     $scope.MenuPermission =  angular.fromJson(sessionStorage.getItem('MenuPermission'));
     $scope.loadMenu = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            //console.log(result);
            $scope.Menu = result.data.DATA.Menu;
            IndexOverlayFactory.overlayHide();
            $(document).ready(function(){
                // console.log('asd');
              $('a.test').on("click", function(e){
                // alert('aa');
                // $('ul.dropdown-menu').hide();
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
              });
            });
            $scope.Menu = $filter('MenuPermission')($scope.MenuPermission, $scope.Menu);     
            // $scope.load('menu/page/get', $scope.ID);
            
        });
    }

    $scope.loadMenu('menu/list');

    $scope.getMenu = function(action, menu_type){
        var params = {'menu_type' : menu_type};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.MenuName = result.data.DATA.Menu;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.load = function(action){
        var params = {'currentPage': $scope.currentPage
                    , 'limitRowPerPage': $scope.limitRowPerPage
                    , 'keyword': $scope.keyword
                    , 'standardType': $scope.standardType
                };
        HTTPService.clientRequest(action, params).then(function(result){
            //console.log(result);
            $scope.CommodityStandard = result.data.DATA.CommodityStandard;
            $scope.totalPages = result.data.DATA.Total;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.edit = function(id){
        window.location.href = '#/video/update/' + id;
    }

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        $scope.load('commodity-standard/list/certification');
    }

    $scope.pageChanged = function() {
        $scope.goToPage($scope.currentPage);
        // $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.makeDateString = function(d){
        if(d != undefined){
            var splitDate = d.split(' ');
            return convertDateToFullThaiDateIgnoreTime(new Date(splitDate[0]));
        }
    }

    $scope.search = function(keyword, standardType){
        $scope.load('commodity-standard/list/certification');
    }

    $scope.totalPages = 0;
    $scope.currentPage = 0;
    $scope.limitRowPerPage = 10;
    $scope.limitDisplay = 5;
    $scope.keyword = null;
    $scope.standardType = null;

    $scope.getMenu('menu/get/type' ,$scope.page_type);
    $scope.load('commodity-standard/list/certification');

});