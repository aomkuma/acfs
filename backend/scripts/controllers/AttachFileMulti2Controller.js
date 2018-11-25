angular.module('e-homework').controller('AttachFileMulti2Controller', function($scope, $compile, $cookies, $filter, $state, $routeParams, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! AttachFile Multi page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'authority';

    $scope.page_type = $routeParams.page_type;

    $scope.getMenu = function(action, menu_type){
        var params = {'menu_type' : menu_type};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.Menu = result.data.DATA.Menu;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadDataList = function(action, menu_type){
        var params = {'menu_type' : menu_type};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.DataList = result.data.DATA.DataList;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadMasterList = function(action, menu_type){
        var params = {'menu_type' : menu_type};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.MasterList = result.data.DATA.DataList;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.save = function(action, Data, AttachFileList, FileName){
        
        IndexOverlayFactory.overlayShow();
        
        var params = {'Data':Data, 'AttachFileList':AttachFileList, 'FileName' : FileName};
        
        HTTPService.uploadRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.FileList = [];
                $scope.addFiles();
                $scope.loadDataList('attachfile-multi/get/type' ,$scope.page_type);
                $scope.PAGE = 'MAIN';
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.setActives = function(action, id, active_status){
        var params = {'id' : id, 'active_status' : active_status};
        HTTPService.uploadRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                // $scope.FileList = [];
                // $scope.addFiles();
                // $scope.loadDataList('attachfile-multi/get/type' ,$scope.page_type);
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.addFiles = function(){
        $scope.FileList.push({'attachFileTH':{'name_th':''}, 'attachFileEN':{'name_en':''}});

    }

    $scope.edit = function(data){
        console.log(data);
        $scope.AttachFile = null;
        $scope.FileList = [];
        $scope.Data = angular.copy(data);
        $scope.FileName = [{'name_th':data.AttachFiles[0].display_name, 'name_en' : ''}];
        // alert(data.AttachFiles.length);
        if(data.AttachFiles.length > 1){
            $scope.FileName[0].name_en = data.AttachFiles[1].display_name;
        }
        $scope.addFiles();
        $scope.PAGE = 'UPDATE';
    }

    $scope.add = function(){
        $scope.AttachFile = null;
        $scope.FileList = [];
        $scope.FileName = [{'name_th':'', 'name_en' : ''}];
        $scope.addFiles();
        // create Data obj
        var order_no = 0;
        if($scope.DataList == null || $scope.DataList.length == 0){
            order_no = 1;
        }else{
            order_no = $scope.DataList.length + 1;
        }

        $scope.Data = {'menu_type' : $scope.page_type, 'order_no' : order_no, 'actives' : 'Y', 'file_type':''};
        $scope.PAGE = 'UPDATE';
    }

    $scope.cancel = function(){
        $scope.PAGE = 'MAIN';
    }

    IndexOverlayFactory.overlayHide();
    $scope.FileList = [];
    $scope.FileName = [{'name_th':'', 'name_en' : ''}];
    $scope.addFiles();
    $scope.PAGE = 'MAIN';

    $scope.getMenu('menu/get/type' ,$scope.page_type);
    $scope.loadDataList('attachfile-multi/get/type' ,$scope.page_type);
    $scope.loadMasterList('attachfile-multi/get/master' ,$scope.page_type);

});
