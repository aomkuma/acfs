angular.module('e-homework').controller('PageController', function($scope, $compile, $cookies, $filter, $state, $routeParams, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    console.log('Hello ! About page');
	
    console.log($scope.DEFAULT_LANGUAGE);
    $scope.$parent.menu_selected = 'about';
    $scope.$parent.menu_selected_th = 'เกี่ยวกับซีไอโอ';
    
    $scope.$parent.menu_selected_th = 'อำนาจหน้าที่ของ CIO';
    $scope.load = function(action, page_type){
        var params = {'page_type': page_type};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.Page = result.data.DATA.Page;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.FileList = [];
    $scope.Page = {'contents':null};
    $scope.page_type = $routeParams.pagetype;
    $scope.MenuName = getMenuName($scope.page_type);
    console.log($scope.MenuName);
    $scope.load('pages', $scope.page_type);
    

});