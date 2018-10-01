angular.module('e-homework').controller('ServicesController', function($scope, $compile, $cookies, $filter, $state, $sce, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! Services page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'services';

    $scope.load = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            //console.log(result);
            $scope.ServicesList = result.data.DATA.ServicesList;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.save = function(action, ServicesList){
        var params = {'ServicesList':ServicesList};
        HTTPService.clientRequest(action, params).then(function(result){
            //console.log(result);
            $scope.load('services/list');
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.addServices = function(){
        var services = {'id':''
                        ,'service_name':''
                        ,'url':''
                        ,'actives':'Y'
                        };
        $scope.ServicesList.push(services);
    }

    $scope.load('services/list');

});