angular.module('e-homework').controller('VideoController', function($scope, $compile, $cookies, $filter, $state, $sce, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! Video page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'video';

    $scope.load = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            //console.log(result);
            $scope.Video = result.data.DATA.VideoList;
            setTimeout(function(){
                for(var i=0; i < $scope.Video.length; i++){
                    $videoSrc = $sce.trustAsResourceUrl($scope.Video[i].video_url);
                    $("#video" + i).prop('src', $videoSrc);
                    console.log($("#video" + i).attr('src'));
                }
            }, 500);
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.edit = function(id){
        window.location.href = '#/video/update/' + id;
    }

    $scope.load('video/list');

});