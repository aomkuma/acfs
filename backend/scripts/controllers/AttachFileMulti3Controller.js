angular.module('e-homework').controller('AttachFileMulti3Controller', function($scope, $compile, $cookies, $filter, $state, $routeParams, HTTPService, IndexOverlayFactory) {
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
        var params = {'menu_type' : menu_type, 'file_type' : $scope.FileType};
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

    $scope.save = function(action, Data, AttachFileList, FileName, FileCode){
        
        IndexOverlayFactory.overlayShow();
        if(Data.file_date != null && Data.file_date != undefined && Data.file_date != ''){
            Data.file_date = makeSQLDate(Data.file_date);
        }
        var params = {'Data':Data, 'AttachFileList':AttachFileList, 'FileName' : FileName, 'FileCode' : FileCode};
        
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

        if(data != null){
            $scope.Data = angular.copy(data);
        }else{
            if($scope.page_type == 'patrol'){
                $scope.Data = {'file_type' : $scope.FileType};
                console.log($scope.Data);
            }
        }
        
        $scope.FileName = [{'name_th':data.AttachFiles[0].display_name, 'name_en' : ''}];
        $scope.FileCode = [{'code_th':'', 'code_en' : ''}];
        $scope.FileCode[0].code_th = data.AttachFiles[0].file_code;
        // alert(data.AttachFiles.length);
        if(data.AttachFiles.length > 1){
            $scope.FileName[0].name_en = data.AttachFiles[1].display_name;
            $scope.FileCode[0].code_en = data.AttachFiles[1].file_code;
        }

        if($scope.Data.file_date != null && $scope.Data.file_date != ''){
            $scope.Data.file_date = makeDate($scope.Data.file_date);
        }
        $scope.addFiles();
        $scope.PAGE = 'UPDATE';
    }

    $scope.add = function(){
        console.log($scope.FileType);
        var filetype = '';
        if($scope.page_type == 'patrol'){
             filetype = $scope.FileType;
        }
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

        $scope.Data = {'menu_type' : $scope.page_type, 'file_type' : filetype, 'order_no' : order_no, 'actives' : 'Y',};
        console.log($scope.Data);
        $scope.PAGE = 'UPDATE';
    }

    $scope.cancel = function(){
        $scope.PAGE = 'MAIN';
    }

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setFileType = function(index){
        $scope.FileType = $scope.FileTypeList[index].file_type;
        $scope.FileTypeIndex = index;
        console.log($scope.FileTypeIndex);
        $scope.loadDataList('attachfile-multi/get/type' ,$scope.page_type);
    }

    $scope.FileTypeList = [{'file_type' : 'รายละเอียดโครงการ'}
                                ,{'file_type' : 'แบบฟอร์มต่างๆ'}
                                ,{'file_type' : 'ตัวอย่างเอกสาร'}
                                ,{'file_type' : 'ภาพกิจกรรม'}
                                ,{'file_type' : 'ถามตอบ'}
                            ];
    $scope.FileTypeIndex = 0;
    console.log($scope.FileTypeIndex);
    $scope.FileType = $scope.FileTypeList[0].file_type;
    console.log($scope.FileType);

    IndexOverlayFactory.overlayHide();
    $scope.FileList = [];
    $scope.FileName = [{'name_th':'', 'name_en' : ''}];
    $scope.FileCode = [{'code_th':'', 'code_en' : ''}];
    $scope.addFiles();
    $scope.PAGE = 'MAIN';

    $scope.getMenu('menu/get/type' ,$scope.page_type);
    $scope.loadDataList('attachfile-multi/get/type' ,$scope.page_type);
    $scope.loadMasterList('attachfile-multi/get/master' ,$scope.page_type);

});
