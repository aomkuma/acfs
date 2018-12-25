angular.module('e-homework').controller('HomeController', function($scope, $cookies, $filter, $state, $uibModal, HTTPService, IndexOverlayFactory) {
	//console.log('Hello !');
    $scope.DEFAULT_LANGUAGE = 'TH';
    $scope.menu_selected = 'home';
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }

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

    $scope.loadMenu('menu/list');

    $scope.load = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            console.log(result);
            $scope.SlideShow = null;
            $scope.SlideShowList = result.data.DATA.SlideShow;
            console.log($scope.SlideShowList);
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.edit = function(data){
        $scope.AttachFile = null;
        $scope.SlideShow = angular.copy(data);
        
        $scope.PAGE = 'UPDATE';
    }

    $scope.add = function(){
        $scope.AttachFile = null;
        $scope.SlideShow = {'actives':'Y'};
        $scope.PAGE = 'UPDATE';
    }

    $scope.cancelUpdate = function(){
        $scope.AttachFile = null;
        $scope.SlideShow = null;
        $scope.PAGE = 'MAIN';
    }

    $scope.save = function(action, SlideShow, AttachFile){
        // console.log($scope.SlideShow);
        //IndexOverlayFactory.overlayShow();
 
        var params = {'SlideShowObj':SlideShow, 'AttachFileObj':AttachFile};
        HTTPService.uploadRequest(action, params).then(function(result){
            console.log(result);
            $scope.PAGE = 'MAIN';
            if(result.data.STATUS == 'OK'){
                $scope.AttachFile = null;
                $scope.load('slideshow');
                $scope.cancelUpdate();
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.remove = function(action, id){
        $scope.alertMessage = 'ต้องการลบ slide นี้ ใช่หรือไม่ ?';
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
            IndexOverlayFactory.overlayShow();
            HTTPService.deleteRequest(action, id).then(function(result){
            // $scope.load('SlideShows');
            $scope.load('slideshow');
            IndexOverlayFactory.overlayHide();
        });
        });
        
    }

    $scope.AttachFile = null;
    $scope.SlideShow = null;

    $scope.PAGE = 'MAIN';
    $scope.load('slideshow');

    // Link Footer

    $scope.loadFooterLink = function(){
        $scope.setFooterLink();
        HTTPService.clientRequest('footer-link/list', null).then(function(result){
            console.log(result);
            $scope.FooterLinkList = result.data.DATA.List;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.saveFooterLink = function(Data){
        var params = {'Data':Data};
        HTTPService.clientRequest('footer-link/update', params).then(function(result){
            console.log(result);
            $scope.PAGE = 'MAIN';
            if(result.data.STATUS == 'OK'){
                
                $scope.loadFooterLink();
                $scope.cancelUpdate();
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.removeFooterLink = function(id){
        $scope.alertMessage = 'ต้องการลบ link นี้ ใช่หรือไม่ ?';
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
            IndexOverlayFactory.overlayShow();
            HTTPService.clientRequest('footer-link/delete', {'id':id}).then(function(result){
            // $scope.load('SlideShows');
            $scope.loadFooterLink();
            IndexOverlayFactory.overlayHide();
        });
        });
        
    }

    $scope.updateFooterLink = function(data){
        $scope.FooterLink = angular.copy(data);
    }

    $scope.setFooterLink = function(){
        $scope.FooterLink = {'id':'', 'link_type' : '', 'link_name' : '', 'link_url' : ''};
    }

    $scope.loadFooterLink();

});