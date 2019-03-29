var serviceUrl = '../services/public/';


'use strict';
/* global FB */

var app = angular.module('e-homework', ['ui.bootstrap' , 'ngRoute' , 'ngAnimate', 'ngCookies', 'ui.router', 'oc.lazyLoad', 'ngFileUpload', 'angular-bind-html-compile', '720kb.socialshare']);

app.config(function($controllerProvider, $compileProvider, $filterProvider, $provide) {
  app.register = {
    controller: $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service
  };
});

angular.module('e-homework').controller('AppController', ['$cookies','$scope', '$filter', '$uibModal','IndexOverlayFactory', 'HTTPService', function($cookies, $scope, $filter, $uibModal, IndexOverlayFactory, HTTPService) {
	$scope.overlay = IndexOverlayFactory;
  $scope.currentUser = null;
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
    window.location.reload();
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
    if(keyword != undefined && keyword != null && keyword != ''){
      window.location.href = '#/search/' + keyword;  
    }else{
      keyword = '';
      window.location.href = '#/';  
    }
    
  }
  $scope.checkEnter = function(event, keyword){
    if(event.keyCode == 13){
      window.location.href = '#/search/' + keyword;
    }
  }

  $scope.checkLogin = function(email){
    // console.log({'email' : email});
    // return;
    if(email == null || email == ''){
      return;
    }
    var params = {'email' : email};
      HTTPService.clientRequest('subscribe/mail/login', params).then(function(result){
        if(result.data.STATUS == 'OK'){
          sessionStorage.setItem('USER_LOGIN', JSON.stringify({'email' : email}));
          var $user_session = sessionStorage.getItem('USER_LOGIN');
          console.log($user_session);
          // sessionStorage.removeItem('USER_LOGIN');
          $scope.currentUser = angular.fromJson($user_session);
          console.log('current ', $scope.currentUser);

          var fav_menu = result.data.DATA.Menu;
          if(fav_menu != null){
            window.location.href = '#/' + fav_menu.menu_url;
          }
        }else{
          var alertMsg = ($scope.DEFAULT_LANGUAGE == 'TH'?result.data.DATA.TH:result.data.DATA.EN);
          alert(alertMsg);
        }
        
      });
    // window.location.reload();
  
  }

  $scope.checkLogout = function(){
    sessionStorage.removeItem('USER_LOGIN');
    $scope.currentUser = null;
  }
// sessionStorage.removeItem('ShowLandingPage');
  $scope.VisitorCount = sessionStorage.getItem('VisitorCount');
  // $scope.LandingPage = sessionStorage.getItem('LandingPage');
  $scope.ShowLandingPage = sessionStorage.getItem('ShowLandingPage');
  console.log($scope.ShowLandingPage);
  
  $scope.closeLandingPage = function(){
    sessionStorage.setItem('ShowLandingPage', false);
    $scope.ShowLandingPage = false;
  }


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  $scope.subscribeMail = function(email){
      
      if(email == null || email == '' || !validateEmail(email)){
        alert('กรุณากรอก e-mail ให้ถูกต้อง');
        return;
      }
      var params = {'email' : email};
      HTTPService.clientRequest('subscribe/mail/register', params).then(function(result){
          // console.log('landing', result);
          if(result.data.STATUS == 'OK'){
            var alertMsg = ($scope.DEFAULT_LANGUAGE == 'TH'?'ลงทะเบียนสำเร็จ!':'Register successful!');
            alert(alertMsg);
            
          }else{
            var alertMsg = ($scope.DEFAULT_LANGUAGE == 'TH'?result.data.DATA.TH:result.data.DATA.EN);
            alert(alertMsg);
            
          }
          $scope.mail_subscribe = '';
      });
  }

  $scope.mail_subscribe = '';
    
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

.directive('fbShare', [
    function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    FB.ui({
                        method: 'feed',
                        name: 'สำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ aa',
                        link: 'http://61.19.221.109/acfs/web/#/news/detail/12',
                        picture: 'http://61.19.221.109/acfs/files/img/news/12_20190213130745_430751.jpg',
                        caption: 'ภาพงานพิธีเปิดโครงการฝึกอบรมเชิงปฏิบัติการ เพื่อยกระดับขีดความสามารถ Q อาสา ด้านมาตรฐานเกษตรอินทรีย์ เพื่อยกระดับขีดความสามารถ Q อาสา ให้เป็นผู้ตรวจประเมินเบื้องต้น (Pre auditor) ด้านเกษตรอินทรีย์',
                        description: 'นางสาวจูอะดี พงศ์มณีรัตน์ เลขาธิการสำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ (มกอช.) เป็นประธานเปิดโครงการฝึกอบรมเชิงปฏิบัติการ เพื่อยกระดับขีดความสามารถ Q อาสา ด้านมาตรฐานเกษตรอินทรีย์ เพื่อยกระดับขีดความสามารถ Q อาสา ให้เป็นผู้ตรวจประเมินเบื้องต้น (Pre auditor) ด้านเกษตรอินทรีย์ ในลักษณะเกษตรกรแนะนำเกษตรกรด้วยกันเองและเป็นกลไกในการขับเคลื่อน โครงการพัฒนาเกษตรกรรมยั่งยืน ร่วมกับเจ้าหน้าที่ภาครัฐที่เกี่ยวข้องในระดับพื้นที่ ผู้เข้าอบรมประกอบด้วย Q อาสา จากจังหวัดกำแพงเพชร พิจิตร พิษณุโลก เพชรบูรณ์ สระแก้ว และพัทลุง จำนวน 50 คน โดยมี นางสาวนลินทิพย์ เพณี ผู้อำนวยการกองส่งเสริมมาตรฐาน กล่าวรายงาน และร่วมต้อนรับ ณ โรงแรม ทีเค พาเลซ แอนด์ คอนเวนชั่น แจ้งวัฒนะ กรุงเทพฯ',
                        message: 'สำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ'
                    });
                });
            }
        };
    }
])
;
