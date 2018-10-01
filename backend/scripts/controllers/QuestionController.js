angular.module('e-homework').controller('QuestionController', function($scope, $compile, $cookies, $filter, $state, $sce, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! Question page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'question';

    $scope.load = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            //console.log(result);
            $scope.Question = result.data.DATA.QuestionList;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.edit = function(id){
        window.location.href = '#/question/detail/' + id;
    }

    $scope.load('question/list');

});