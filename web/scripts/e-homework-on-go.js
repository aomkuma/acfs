angular.module('e-homework').config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/main/main.html",
        controller : "HomeController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/HomeController.js" ]
				});
			} ]
		}
	})

	.when("/guest/signin", {
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

	.when("/page/:id", {
        templateUrl : "views/page/page.html",
        controller : "PageController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/PageController.js" ]
				});
			} ]
		}
	})

	.when("/links/:linktype", {
        templateUrl : "views/page/link.html",
        controller : "LinkController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/LinkController.js" ]
				});
			} ]
		}
	})

	.when("/relate-link", {
        templateUrl : "views/page/linkurl.html",
        controller : "LinkUrlController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/LinkUrlController.js" ]
				});
			} ]
		}
	})

	.when("/news/:NEWS_TYPE?", {
        templateUrl : "views/page/news.html",
        controller : "NewsController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/NewsController.js" ]
				});
			} ]
		}
	})

	.when("/news/detail/:NEWS_ID", {
        templateUrl : "views/page/news-detail.html",
        controller : "NewsDetailController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/NewsDetailController.js" ]
				});
			} ]
		}
	})

	.when("/law", {
        templateUrl : "views/page/law.html",
        controller : "LawController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/LawController.js" ]
				});
			} ]
		}
	})

	.when("/palace", {
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

	.when("/palace-minister", {
        templateUrl : "views/palace/palace.html",
        controller : "PalaceMinisterController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/PalaceMinisterController.js" ]
				});
			} ]
		}
	})

	.when("/authority", {
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

	.when("/policy", {
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

	.when("/project", {
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

	.when("/contact", {
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

	.when("/video/detail/:id", {
        templateUrl : "views/video/detail.html",
        controller : "VideoDetailController",
        resolve : {
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files : [ "scripts/controllers/VideoDetailController.js" ]
				});
			} ]
		}
	})

	.when("/questions", {
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