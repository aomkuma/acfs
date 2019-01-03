angular.module('app').controller('UserAccountUserUpdateController', function($scope, $compile, $cookies, $filter, $state, $routeParams, $uibModal, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
        console.log($scope.$parent.currentUser);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! user-account page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'user-account';

    $scope.ID = $routeParams.id;

    $scope.loadUser = function(action, id){
        var params = {'id' : id};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.User = result.data.DATA.User;
                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.saveUser = function(data){
        var params = {'User' : data};
        HTTPService.clientRequest('user-account/update/user', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                // if($scope.ID === undefined){
                //     window.location.href = '#/user-account/update/user/' + result.data.DATA.userID;
                // }else{
                //     $scope.ID = result.data.DATA.userID;
                //     $scope.loadUser('user-account/get/user', $scope.ID);
                //     IndexOverlayFactory.overlayHide();
                // }
                window.location.href = '#/user-account/1';
                
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $autocompleteUserResult = [];
    $scope.searchUserAutoComplete = function (val, qtype){
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

    $scope.autocompleteUserSelected = function ($item, $model, $label){
        var userID = $scope.User.userID;
        var password = $scope.User.password;
        $scope.User = angular.copy($item);
        $scope.User.userID = userID;
        $scope.User.password = password;
        console.log($scope.User);
    }

    $scope.cancelUpdate = function(id){
        window.location.href = '#/user-account';
    }

    $scope.setUser = function(){
        $scope.User = {
                        'userID' : ''
                        , 'stakeholderID' : ''
                        , 'email' : ''
                        , 'password' : ''
                        , 'createBy' : $scope.currentUser.UserID
                        , 'createDate' : ''
                        , 'updateBy' : $scope.currentUser.UserID
                        , 'updateDate' : ''
                };
    }

    $scope.confirmPassword = '';

    IndexOverlayFactory.overlayHide();
    
    if($scope.ID !== undefined){
        $scope.loadUser('user-account/get/user', $scope.ID);
    }else{
        $scope.setUser();
    }

});