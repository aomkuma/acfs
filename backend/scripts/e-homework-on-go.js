angular.module('e-homework').config(function($routeProvider, $locationProvider) {
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

	.when("/video", {
        templateUrl : "views/video/main.html",
        controller : "VideoController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/VideoController.js" ]
				});
			} ]
		}
	})

	.when("/video/update/:id?", {
        templateUrl : "views/video/update.html",
        controller : "VideoUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/VideoUpdateController.js" ]
				});
			} ]
		}
	})

	.when("/menu-manage", {
        templateUrl : "views/menu/main.html",
        controller : "MenuController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/MenuController.js" ]
				});
			} ]
		}
	})

	.when("/menu-manage/update/:id?", {
        templateUrl : "views/menu/update.html",
        controller : "MenuUpdateController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/MenuUpdateController.js" ]
				});
			} ]
		}
	})

	.when("/update/pages/:pagetype", {
        templateUrl : "views/update/pages.html",
        controller : "UpdatePageController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/UpdatePageController.js" ]
				});
			} ]
		}
	})

	.when("/update/links/:linktype", {
        templateUrl : "views/update/link.html",
        controller : "UpdateLinkController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/UpdateLinkController.js" ]
				});
			} ]
		}
	})

	.when("/palace/manage", {
        templateUrl : "views/palace/palace.html",
        controller : "PalaceController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/PalaceController.js" ]
				});
			} ]
		}
	})

	.when("/link-url/manage", {
        templateUrl : "views/linkurl/linkurl.html",
        controller : "LinkUrlController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/LinkUrlController.js" ]
				});
			} ]
		}
	})

	.when("/update/news", {
        templateUrl : "views/update/news.html",
        controller : "UpdateNewsController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/UpdateNewsController.js" ]
				});
			} ]
		}
	})

	.when("/update/laws", {
        templateUrl : "views/update/law.html",
        controller : "UpdateLawController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/UpdateLawController.js" ]
				});
			} ]
		}
	})

	.when("/update/menu", {
        templateUrl : "views/update/menu.html",
        controller : "UpdateMenuController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/UpdateMenuController.js" ]
				});
			} ]
		}
	})

	.when("/question", {
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

	.when("/question/detail/:id?", {
        templateUrl : "views/question/detail.html",
        controller : "QuestionDetailController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/QuestionDetailController.js" ]
				});
			} ]
		}
	})	

	.when("/services", {
        templateUrl : "views/services/main.html",
        controller : "ServicesController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/ServicesController.js" ]
				});
			} ]
		}
	})

/*
	.when("/about/manage", {
        templateUrl : "views/about/about.html",
        controller : "AboutController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/AboutController.js" ]
				});
			} ]
		}
	})

	.when("/palace/manage", {
        templateUrl : "views/palace/palace.html",
        controller : "PalaceController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/PalaceController.js" ]
				});
			} ]
		}
	})

	.when("/authority/manage", {
        templateUrl : "views/authority/authority.html",
        controller : "AuthorityController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/AuthorityController.js" ]
				});
			} ]
		}
	})

	.when("/policy/manage", {
        templateUrl : "views/policy/policy.html",
        controller : "PolicyController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/PolicyController.js" ]
				});
			} ]
		}
	})

	.when("/project/manage", {
        templateUrl : "views/project/project.html",
        controller : "ProjectController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/ProjectController.js" ]
				});
			} ]
		}
	})

	.when("/contact/manage", {
        templateUrl : "views/contact/contact.html",
        controller : "ContactController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/ContactController.js" ]
				});
			} ]
		}
	})
	*/
	;



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