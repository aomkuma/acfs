angular.module('app').controller('ForgotPasswordController',function($scope, $routeParams, HTTPService, IndexOverlayFactory){
	
	$scope.user = {'Username':''};

    var reDirect = '';
    if($routeParams.redirect_url !== undefined){
        reDirect = $routeParams.redirect_url;
        console.log(reDirect);
    }
	$scope.showError = false; // set Error flag
	$scope.showSuccess = false; // set Success Flag
    
	//------- Authenticate function
	$scope.forgotPassword = function (){
		var flag= false;
        $scope.showError = false;
        $scope.showSuccess = false;
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest('forgot-password', {'Username':$scope.user.Username}).then(function(user){
            console.log(user);
            if(user.data.STATUS == 'OK'){
                $scope.showError = false;
                $scope.showSuccess = true;
                // sessionStorage.setItem('user_session' , JSON.stringify(user.data.DATA.UserData));
                setTimeout(function(){
                    window.location.replace('#/guest/logon' );    
                }, 3000);
            }else{
                $scope.showError = true;
                $scope.showSuccess = false;
            }
            IndexOverlayFactory.overlayHide();
        });
	}
});
