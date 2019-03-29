angular.module('e-homework').controller('StandardCommodityCertificationUpdateController', function($scope, $compile, $cookies, $filter, $state, $sce, $routeParams, HTTPService, IndexOverlayFactory) {
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

    $scope.getData = function(action){
        var params = {'standardID': $routeParams.standardID
                };
        HTTPService.clientRequest(action, params).then(function(result){
            //console.log(result);
            $scope.Data = result.data.DATA.CommodityStandard;
            $scope.Data.useDate = makeDateTime($scope.Data.useDate);
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.saveData = function(Data){
        var DataUpdate = angular.copy(Data);
        if(DataUpdate.useDate != null && DataUpdate.useDate != undefined && DataUpdate.useDate != ''){
            DataUpdate.useDate = makeSQLDate(DataUpdate.useDate);
        }

        var params = {'Data': DataUpdate};

        HTTPService.clientRequest('commodity-standard/update/certification', params).then(function(result){
            //console.log(result);
            alert('บันทึกสำเร็จ');
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.cancelUpdate = function(){
        window.location.href = '#/standard-commoditiy-certification';
    }

    $scope.popup1 = {
        opened: false
    };

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.getMenu('menu/get/type' ,$scope.page_type);
    $scope.getData('commodity-standard/get/certification');

});