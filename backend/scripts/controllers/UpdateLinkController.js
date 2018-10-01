angular.module('e-homework').controller('UpdateLinkController', function($scope, $compile, $cookies, $filter, $state, $routeParams, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! Page page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'Page';

    $scope.load = function(action, link_type){
        var params = {'link_type': link_type};
        HTTPService.clientRequest(action, params).then(function(result){
            $scope.Link = result.data.DATA.Link;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.save = function(action, LinkObj){
        // console.log($scope.Page);
        IndexOverlayFactory.overlayShow();
        var params = {'LinkObj':LinkObj, 'link_type' : $scope.link_type};
        HTTPService.uploadRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.load('links', $scope.link_type);
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.link_type = $routeParams.linktype;
    $scope.Link = {'link_type':$scope.link_type};
    $scope.MenuName = getMenuName($scope.link_type);

    $scope.load('links', $scope.link_type);


});