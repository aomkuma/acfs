var serviceUrl = '../services/public/';

var app = angular.module('e-homework', ['ui.bootstrap' , 'ngRoute' , 'ngAnimate', 'ngCookies', 'ui.router', 'oc.lazyLoad', 'ngFileUpload', 'angular-bind-html-compile']);

app.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
  app.register = {
    controller: $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service
  };
});

angular.module('e-homework').controller('AppController', ['$cookies','$scope', '$filter', '$uibModal','IndexOverlayFactory', function($cookies, $scope, $filter, $uibModal, IndexOverlayFactory) {
	$scope.overlay = IndexOverlayFactory;
	$scope.overlayShow = false;
	$scope.menu_selected = '';
  

  if(sessionStorage.getItem('DEFAULT_LANGUAGE') == undefined || sessionStorage.getItem('DEFAULT_LANGUAGE') == null || sessionStorage.getItem('DEFAULT_LANGUAGE') == ''){
    sessionStorage.setItem('DEFAULT_LANGUAGE' , 'TH');
  }

  if(sessionStorage.getItem('FONT_SIZE') == undefined || sessionStorage.getItem('FONT_SIZE') == null || sessionStorage.getItem('FONT_SIZE') == ''){
    sessionStorage.setItem('FONT_SIZE' , 1.2);
  }

  if(sessionStorage.getItem('BG_COLOR') == undefined || sessionStorage.getItem('BG_COLOR') == null || sessionStorage.getItem('BG_COLOR') == ''){
    sessionStorage.setItem('BG_COLOR' , '#FFF');
  }

  if(sessionStorage.getItem('FONT_COLOR') == undefined || sessionStorage.getItem('FONT_COLOR') == null || sessionStorage.getItem('FONT_COLOR') == ''){
    sessionStorage.setItem('FONT_COLOR' , '#000');
  }

  $scope.DEFAULT_LANGUAGE = sessionStorage.getItem('DEFAULT_LANGUAGE');
  $scope.FONT_SIZE = sessionStorage.getItem('FONT_SIZE');
  $scope.BG_COLOR = sessionStorage.getItem('BG_COLOR');
  $scope.FONT_COLOR = sessionStorage.getItem('FONT_COLOR');

  $scope.changeLanguage = function(lang){
    sessionStorage.setItem('DEFAULT_LANGUAGE' , lang);
    // console.log(sessionStorage.getItem('DEFAULT_LANGUAGE'));
    $scope.DEFAULT_LANGUAGE = sessionStorage.getItem('DEFAULT_LANGUAGE');
  }

  $scope.changeFontSize = function(size){
    sessionStorage.setItem('FONT_SIZE' , size);
    $scope.FONT_SIZE = sessionStorage.getItem('FONT_SIZE');
  }

  $scope.changeColor = function(BG_COLOR, FONT_COLOR){
    sessionStorage.setItem('BG_COLOR' , BG_COLOR);
    $scope.BG_COLOR = sessionStorage.getItem('BG_COLOR');

    sessionStorage.setItem('FONT_COLOR' , FONT_COLOR);
    $scope.FONT_COLOR = sessionStorage.getItem('FONT_COLOR');
  }

  $scope.newWindows = function(url){
    window.open(url);
  }

  $scope.goPage = function(page){
    window.location.href = '#/pages/' + page;
  }

  $scope.goLink = function(link){
    window.location.href='#/links/' + link;
  }

  $scope.goTo = function(page){
    window.location.href = '#/' + page;
  }

  $scope.goSearch = function(keyword){
    window.location.href = '#/search/' + keyword;
  }
  $scope.checkEnter = function(event, keyword){
    if(event.keyCode == 13){
      window.location.href = '#/search/' + keyword;
    }
  }
    
}])
.directive('embedSrc', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(
        function() {
          return attrs.embedSrc;
        },
        function() {
          element.attr('src', attrs.embedSrc);
        }
      );
    }
  };
})
;
