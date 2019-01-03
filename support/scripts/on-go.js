angular.module('app').config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/home.html",
        controller : "HomeController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/HomeController.js" ]
				});
			} ]
		}
	})

	.when("/guest/logon", {
        templateUrl : "views/login.html",
        controller : "LoginController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/LoginController.js" ]
				});
			} ]
		}
	})

	.when("/member/forgot-password", {
        templateUrl : "views/forgot-password.html",
        controller : "ForgotPasswordController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/ForgotPasswordController.js" ]
				});
			} ]
		}
	})

	.when("/commodity-standard", {
        templateUrl : "views/commodity-standard/main.html",
        controller : "CommodityStandardController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/CommodityStandardController.js" ]
				});
			} ]
		}
	})

	.when("/commodity-standard/update/:id?/:disabled_form?", {
        templateUrl : "views/commodity-standard/update.html",
        controller : "CommodityStandardUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/CommodityStandardUpdateController.js" ]
				});
			} ]
		}
	})

	.when("/stakeholder/:indexTab?", {
        templateUrl : "views/stakeholder/main.html",
        controller : "StakeholderController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/StakeholderController.js" ]
				});
			} ]
		}
	})

	.when("/stakeholder/update/:id", {
        templateUrl : "views/stakeholder/update.html",
        controller : "StakeholderUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/StakeholderUpdateController.js" ]
				});
			} ]
		}
	})

	.when("/subcommittee/update/:id?", {
        templateUrl : "views/stakeholder/update-subcommittee.html",
        controller : "SubcommitteeUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/SubcommitteeUpdateController.js" ]
				});
			} ]
		}
	})	

	.when("/user-account/:indexTab?", {
        templateUrl : "views/user-account/main.html",
        controller : "UserAccountController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/UserAccountController.js" ]
				});
			} ]
		}
	})

	.when("/user-account/update/admin/:id?", {
        templateUrl : "views/user-account/update-admin.html",
        controller : "UserAccountAdminUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/UserAccountAdminUpdateController.js" ]
				});
			} ]
		}
	})

	.when("/user-account/update/user/:id?", {
        templateUrl : "views/user-account/update-user.html",
        controller : "UserAccountUserUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/UserAccountUserUpdateController.js" ]
				});
			} ]
		}
	})

	.when("/email", {
        templateUrl : "views/email/main.html",
        controller : "EmailController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/EmailController.js" ]
				});
			} ]
		}
	})

	.when("/email/update/:id?", {
        templateUrl : "views/email/update.html",
        controller : "EmailUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/EmailUpdateController.js" ]
				});
			} ]
		}
	})

	.when("/question/:indexTab?", {
        templateUrl : "views/question/main.html",
        controller : "QuestionController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/QuestionController.js" ]
				});
			} ]
		}
	})

	.when("/questionnaire/update/normal/:id?", {
        templateUrl : "views/question/update-normal.html",
        controller : "QuestionNormalUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/QuestionNormalUpdateController.js" ]
				});
			} ]
		}
	})

	.when("/questionnaire/update/online/:id?", {
        templateUrl : "views/question/update-online.html",
        controller : "QuestionOnlineUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/QuestionOnlineUpdateController.js" ]
				});
			} ]
		}
	})

	.when("/report", {
        templateUrl : "views/report/main.html",
        controller : "ReportController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/ReportController.js" ]
				});
			} ]
		}
	})
	
	$locationProvider.hashPrefix('');
	// $locationProvider.html5Mode({
 //                 enabled: true,
 //                 requireBase: false
 //          });
	
});

/*app.config(function($routeProvider) {
	
	$routeProvider.when('/', {

	  templateUrl: function(rd) {
	    return 'views/home.html';
	  },

	  resolve: {
	    load: function($q, $route, $rootScope) {

	      var deferred = $q.defer();
	      var dependencies = [
	        'scripts/controllers/HomeController.js'
	      ];

	      $script(dependencies, function () {
	        $rootScope.$apply(function() {
	          deferred.resolve();
	        });
	      });

	      console.log(deferred);
	      return deferred.promise;
	    }
	  }
	});

});*/