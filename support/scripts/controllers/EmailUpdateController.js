angular.module('app').controller('EmailUpdateController', function($scope, $compile, $cookies, $filter, $state, $routeParams, $uibModal, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! email update page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'email';
    $scope.ID = $routeParams.id;

    $scope.loadEmail = function(action, id){
        var params = {'id': id};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Emails = result.data.DATA.Email;
                $scope.EmailCommodity = result.data.DATA.EmailCommodity;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.saveEmail = function(data, EmailCommodity){
        console.log(data);
        var params = {'Email' : data, 'EmailCommodity': EmailCommodity};
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest('email/update', params).then(function(result){  
            // console.log(result.data);
            // $scope.loadEmails($scope.Commodity_Standards.standardID);
            if(result.data.STATUS == 'OK'){
                // if($scope.ID === undefined){
                //     window.location.href = '#/email/update/' + result.data.DATA.emailID;
                // }else{
                //     $scope.ID = result.data.DATA.emailID;
                //     $scope.loadEmail('email/get', $scope.ID);
                //     IndexOverlayFactory.overlayHide();    
                // }
                window.location.href = '#/email';
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $autocompleteUserResult = [];
    $scope.searchStandardAutoComplete = function (val, qtype){
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

    $scope.autocompleteStandardSelected = function ($item, $model, $label){
        var standard = {'emailCommodityID': ''
                        , 'emailID' : $scope.ID
                        , 'standardID': $item.standardID
                        , 'standardNameThai' : $item.standardNameThai
                        };
        $scope.EmailCommodity.push(standard);
        $scope.CommodityStandard = '';
    }

    $scope.removeEmailCommodity = function(id, index){
        $scope.alertMessage = 'ต้องการลบมาตรฐานจาก e-mail นี้ ใช่หรือไม่ ?';
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
            var params = {'id' : id};
            HTTPService.clientRequest('email/delete/commodity', params).then(function(result){
                console.log(result);
                if(result.data.STATUS == 'OK'){
                    $scope.EmailCommodity.splice(index, 1);
                    IndexOverlayFactory.overlayHide();
                }else{
                    IndexOverlayFactory.overlayHide();
                }
            
            });
        });
    }

    $scope.cancelUpdate = function(){
        window.location.href = '#/email';
    }

    $scope.setEmail = function(){
        $scope.Emails = {'emailID':''
                            ,'email':''
                            ,'password':''
                            ,'createBy':$scope.currentUser.adminID
                            ,'createDate':''
                            ,'updateBy':$scope.currentUser.adminID
                            ,'updateDate':''
                        };
    }

    $scope.EmailCommodity = [];
    $scope.CommodityStandard = '';

    IndexOverlayFactory.overlayHide();

    if($scope.ID !== undefined){
        $scope.loadEmail('email/get', $scope.ID);
    }else{
        $scope.setEmail();
    }
    

});