angular.module('e-homework').controller('StandardCommodityCertificationController', function($scope, $compile, $cookies, $filter, $state, $uibModal, $sce, HTTPService, IndexOverlayFactory) {

	$scope.page_type = 'standard-commodity-certification';

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

            // $scope.load('menu/page/get', $scope.ID);
            
        });
    }

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

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        $scope.load('commodity-standard/list/certification');
    }

    $scope.pageChanged = function() {
        $scope.goToPage($scope.currentPage);
        // $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.search = function(keyword, standardType){
        $scope.load('commodity-standard/list/certification');
    }
    
    $scope.makeDateString = function(d){
        if(d != undefined){
            var splitDate = d.split(' ');
            return convertDateToFullThaiDateIgnoreTime(new Date(splitDate[0]));
        }
    }

    $scope.totalPages = 0;
    $scope.currentPage = 0;
    $scope.limitRowPerPage = 10;
    $scope.limitDisplay = 5;
    $scope.keyword = null;
    $scope.standardType = null;

    $scope.loadMenu('menu/list');
    $scope.getMenu('menu/get/type' ,$scope.page_type);
    $scope.load('commodity-standard/list/certification');


});	