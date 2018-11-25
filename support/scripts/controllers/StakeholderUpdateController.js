angular.module('app').controller('StakeholderUpdateController', function($scope, $compile, $cookies, $filter, $state, $uibModal, $routeParams, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! stakeholder update page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'stakeholder';
    $scope.ID = $routeParams.id;
    if($scope.ID == -1){
        $scope.ID = '';
    }

    $scope.loadStakeholder = function(action, id){
        var params = {'id': id};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Stakeholders = result.data.DATA.Stakeholder;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.saveStakeholder = function(data){
        console.log(data);
        var params = {'Stakeholder' : data};
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest('stakeholder/update', params).then(function(result){  
            // console.log(result.data);
            // $scope.loadStakeholders($scope.Commodity_Standards.standardID);
            if(result.data.STATUS == 'OK'){
                // if($scope.ID === undefined){
                //     window.location.href = '#/stakeholder/update/' + result.data.DATA.stakeholderID;
                // }else{
                //     $scope.addAlert('บันทึกสำเร็จ','success');
                //     $scope.ID = result.data.DATA.stakeholderID;
                //     $scope.loadStakeholder('stakeholder/get', $scope.ID);
                //     IndexOverlayFactory.overlayHide();    
                // }
                window.location.href = '#/stakeholder/0';
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadMasterfile = function(masterType){
        var params = {
                    'masterType':masterType
                    };
        HTTPService.clientRequest('masterfile/get', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                if(masterType == 'AccreditationScope'){
                    $scope.AccrediationScopeList = result.data.DATA;
                }else if(masterType == 'Branch'){
                    $scope.BranchList = result.data.DATA;
                }
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadBranch = function(){
        var params = {
                    'masterType':'Branch'
                    };
        HTTPService.clientRequest('masterfile/get', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.BranchList = result.data.DATA;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.addBranch = function(){
        $scope.loadBranch();
        $scope.Branch = {'branchID':'' , 'branchNameThai':'', 'branchNameEng':''};
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'update_branch.html',
            size: 'lg',
            scope: $scope,
            backdrop: 'static',
            controller: 'ModalDialogReturnFromOKBtnCtrl',
            resolve: {
                params: function () {
                    return {};
                }
            },
        });
        modalInstance.result.then(function (valResult) {
            $scope.saveBranch($scope.Branch);
        });
    }

    $scope.saveBranch = function(Branch){
        var params = {'masterType' : 'Branch', 'data' : Branch};
        HTTPService.clientRequest('masterfile/update', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.loadBranch();
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.removeBranch = function(branchID, index){
        $scope.alertMessage = 'ต้องการลบสาขานี้ ใช่หรือไม่ ?';
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
            var params = {'masterType' : 'Branch', 'id' : branchID};
            HTTPService.clientRequest('masterfile/remove', params).then(function(result){
                // console.log(result);
                if(result.data.STATUS == 'OK'){
                    $scope.loadBranch();
                    IndexOverlayFactory.overlayHide();
                }else{
                    IndexOverlayFactory.overlayHide();
                }
            });
        });
    }

    $scope.cancelUpdate = function(){
        window.location.href = '#/stakeholder';
    }

    $scope.setStakeholder = function(){
        $scope.Stakeholders = {'stakeholderID':''
                                ,'nameThai':''
                                ,'lastNameThai':''
                                ,'nameEng':''
                                ,'lastNameEng':''
                                ,'positionThai':''
                                ,'positionEng':''
                                ,'responsible':''
                                ,'experience':''
                                ,'institution':''
                                ,'address':''
                                ,'phone':''
                                ,'fax':''
                                ,'email':''
                                ,'status':'Active'
                                ,'createBy':$scope.currentUser.adminID
                                ,'createDate':''
                                ,'updateBy':$scope.currentUser.adminID
                                ,'updateDate':''
                            };
    }
    $scope.Branch = {'branchID':'' , 'branchNameThai':'', 'branchNameEng':''};
    $scope.alerts = [];
    $scope.addAlert = function(msg, type) {
      $scope.alerts.push({
        msg: msg,
        type: type
      });
    };

    IndexOverlayFactory.overlayHide();

    if($scope.ID !== undefined && $scope.ID !== ''){
        $scope.loadStakeholder('stakeholder/get', $scope.ID);
    }else{
        $scope.setStakeholder();
    }
    $scope.loadMasterfile('Branch');

});