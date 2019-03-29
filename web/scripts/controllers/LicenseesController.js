angular.module('e-homework').controller('LicenseesController', function($scope, $compile, $cookies, $filter, $state, $routeParams, $uibModal, HTTPService, IndexOverlayFactory) {

    $scope.page_type = 'licensees';

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

    $scope.loadRegion = function(){
        var params = {'qtype' : 'REGION'};
        HTTPService.clientRequest('autocomplete', params).then(function(result){
            console.log(result);
            $scope.RegionList = result.data.DATA;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadProvince = function(region_id){
        var params = {'qtype' : 'PROVINCES', 'keyword' : region_id};
        HTTPService.clientRequest('autocomplete', params).then(function(result){
            console.log(result);
            $scope.ProvinceList = result.data.DATA;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadMaster = function(master_type){
        var params = {'masterType' : master_type};
        HTTPService.clientRequest('masterfile/get', params).then(function(result){
            console.log(result);
            $scope.StandardList = result.data.DATA;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadList = function(){
        var params = {'condition' : $scope.condition
                        , 'currentPage': $scope.currentPage
                        , 'limitRowPerPage': $scope.limitRowPerPage
                };
        HTTPService.clientRequest('licensees/list', params).then(function(result){
            console.log(result);
            $scope.DataList = result.data.DATA.List;
            $scope.totalPages = result.data.DATA.Total;
            $scope.bigTotalItems =  result.data.DATA.Total;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        $scope.loadList();
    }

    $scope.pageChanged = function() {
        $scope.goToPage($scope.currentPage);
        // $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.totalPages = 0;
    $scope.currentPage = 0;
    $scope.limitRowPerPage = 15;
    $scope.limitDisplay = 5;
    $scope.PAGE = 'MAIN';

    $scope.loadMenu('menu/list');
    $scope.getMenu('menu/get/type', $scope.page_type);
    $scope.loadList();    
    $scope.loadRegion();
    $scope.loadMaster($scope.page_type);
});