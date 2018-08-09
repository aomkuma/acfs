var serviceUrl = '../services/public/';

var app = angular.module('app', ['ui.bootstrap' , 'ngRoute' , 'ngAnimate', 'ngCookies', 'ui.router', 'oc.lazyLoad', 'ngFileUpload', 'angular-bind-html-compile']);

app.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
  app.register = {
    controller: $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service
  };
});

angular.module('app').controller('AppController', ['$cookies','$scope', '$filter', '$uibModal','IndexOverlayFactory', function($cookies, $scope, $filter, $uibModal, IndexOverlayFactory) {
	$scope.overlay = IndexOverlayFactory;
	$scope.overlayShow = false;
	$scope.currentUser = null;
    $scope.TotalLogin = 0;
    $scope.menu_selected = '';
    $scope.currentUser = sessionStorage.getItem("user_session");
    console.log($scope.currentUser);
    $scope.logout = function(){
        $scope.alertMessage = 'ต้องการออกจากระบบ ใช่หรือไม่ ?';
        var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'views/dialog_confirm.html',
            size : 'sm',
            scope : $scope,
            backdrop : 'static',
            controller : 'ModalDialogCtrl',
            resolve : {
                params : function() {
                    return {};
                } 
            },
        });
        modalInstance.result.then(function (valResult) {
            sessionStorage.removeItem('user_session');
        $scope.currentUser = null;
        window.location.replace('#/guest/logon');
            
        });
        
    }

}]);
