angular.module('app').controller('SubcommitteeUpdateController', function($scope, $compile, $cookies, $filter, $state, $uibModal, $routeParams, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! subcommittee update page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'subcommittee';
    $scope.ID = $routeParams.id;

    $scope.loadSubcommittee = function(action, id){
        var params = {'id': id};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Subcommittee = result.data.DATA.Subcommittee;

                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.saveSubcommittee = function(data){
        console.log(data);
        var params = {'Subcommittee' : data};
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest('subcommittee/update', params).then(function(result){  
            // console.log(result.data);
            // $scope.loadSubcommittees($scope.Commodity_Standards.standardID);
            if(result.data.STATUS == 'OK'){
                // $scope.addAlert('บันทึกสำเร็จ','success');
                // if($scope.ID === undefined){
                //     window.location.href = '#/subcommittee/update/' + result.data.DATA.subcommitteeID;
                // }else{

                //     $scope.ID = result.data.DATA.subcommitteeID;
                //     $scope.loadSubcommittee('subcommittee/get', $scope.ID);
                //     IndexOverlayFactory.overlayHide();    
                // }
                window.location.href = '#/stakeholder/1';
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $autocompleteUserResult = [];
    $scope.searchStakeholderAutoComplete = function (val, qtype){
        // val = encodeURIComponent(val);
        var params = {'qtype' : qtype, 'keyword' : val};
        return HTTPService.clientRequest('autocomplete', params).then(function(result){  
          $autocompleteUserResult = result.data.DATA;
          var loop = $autocompleteUserResult.length;
          // console.log($autocompleteUserResult);
          if(loop > 0){
              var objList = [];
              for(var i = 0; i < loop; i++){
                objList.push($autocompleteUserResult[i]);
              }
              return objList;
          }else{
            return null;
          }
          
        });
    };

    $scope.autocompleteStakeholderSelected = function ($item, $model, $label){

        // check person if exist
        var loop = $scope.Subcommittee.subcommittee_person.length;
        for(var i = 0; i < loop; i++){
            if($item.stakeholderID == $scope.Subcommittee.subcommittee_person[i].stakeholderID){
                alert('มีรายชื่อบุคคลนี้อยู่ในกลุ่มคณะอนุกรรมการนี้แล้ว');
                return false;
            }
        }

        var person = {'subcommitteePersonID':'' 
                    , 'subcommitteeID':$scope.ID
                    , 'stakeholderID':$item.stakeholderID
                    , 'nameThai':$item.nameThai
                    , 'lastNameThai':$item.lastNameThai
                    , 'positionName':''};
                        
        $scope.Subcommittee.subcommittee_person.push(person);
        $scope.keyword = '';

    }

    $scope.removeSubcommitteePerson = function(id, index){
        $scope.alertMessage = 'ต้องการลบรายชื่อบุคคลนี้ ใช่หรือไม่ ?';
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

            if(id != ''){
                IndexOverlayFactory.overlayShow();
                var params = {'id' : id};
                HTTPService.clientRequest('subcommittee/person/delete', params).then(function(result){
                    console.log(result);
                    if(result.data.STATUS == 'OK'){
                        $scope.Subcommittee.subcommittee_person.splice(index, 1);
                        IndexOverlayFactory.overlayHide();
                    }else{
                        IndexOverlayFactory.overlayHide();
                    }
                
                });
            }else{
                $scope.Subcommittee.subcommittee_person.splice(index, 1);
            }
        });
    }

    $scope.cancelUpdate = function(){
        window.location.href = '#/stakeholder';
    }

    $scope.setSubcommittee = function(){
        $scope.Subcommittee = {'subcommitteeID':''
                                , 'subcommitteeName':''
                                , 'subcommittee_person':[]
                            };
    }

    $scope.alerts = [];
    $scope.addAlert = function(msg, type) {
      $scope.alerts.push({
        msg: msg,
        type: type
      });
    };
    $scope.SubcommitteePerson = {'subcommitteePersonID':'' , 'subcommitteeID':'', 'stakeholderID':'', 'positionName':''};
    $scope.SubcommitteePersonList = [];
    $scope.keyword = '';
    IndexOverlayFactory.overlayHide();

    if($scope.ID !== undefined){
        $scope.loadSubcommittee('subcommittee/get', $scope.ID);
    }else{
        $scope.setSubcommittee();
    }
    
});