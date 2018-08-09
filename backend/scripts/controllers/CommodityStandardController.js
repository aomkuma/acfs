angular.module('app').controller('CommodityStandardController', function($scope, $compile, $cookies, $filter, $state, HTTPService, IndexOverlayFactory) {
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

    $scope.loadCommodityStandard = function(action){
        var params = null;
        HTTPService.uploadRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.dataset = result.data.DATA.CommodityStandard;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.goUpdate = function(id){
        window.location.href = '#/commodity-standard/update/' + id;
    }

    IndexOverlayFactory.overlayHide();
    $scope.loadCommodityStandard('commodity-standard/list');

});