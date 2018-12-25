angular.module('e-homework').controller('HomeController', function($scope, $cookies, $filter, $state, $sce, HTTPService, IndexOverlayFactory) {
	//console.log('Hello !');
    // $scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'home';
    $scope.$parent.menu_selected_th = 'หน้าหลัก';
    var $user_session = sessionStorage.getItem('USER_LOGIN');
    $scope.$parent.currentUser = angular.fromJson($user_session);
    // $scope.slides = [{'id':1, 'path':'../cio-files/img/slide/studio_x9450.jpg'}
    // 				,{'id':2, 'path':'../cio-files/img/slide/studio_x9450.jpg'}];
    $scope.loadMenu = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            //console.log(result);
            $scope.Menu = result.data.DATA.Menu;
            IndexOverlayFactory.overlayHide();
            $(document).ready(function(){
                // console.log('asd');
              $('a.test').on("click", function(e){
                // alert('aa');
                // $('ul.dropdown-menu').hide();
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
              });
            });
        });
    }

    $scope.loadMenuFavourite = function(){
        
        var params = {'user_session' : $scope.currentUser};
        HTTPService.clientRequest('menu/get/favourite', params).then(function(result){
            //console.log(result);
            $scope.HighlightList = result.data.DATA.Menu;
            $scope.slideImage($scope.next_index);
        });
    }

    $scope.loadSlide = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            //console.log(result);
            $scope.slides = result.data.DATA.SlideShow;
            IndexOverlayFactory.overlayHide();
            setTimeout(showSlides, 1000);
        });
    }

    $scope.loadVideo = function(action){
        var params = {'actives' : 'Y'};
        HTTPService.clientRequest(action, params).then(function(result){
            //console.log(result);
            $scope.Video = result.data.DATA.VideoList;
            setTimeout(function(){
                for(var i=0; i < $scope.Video.length; i++){
                    $videoSrc = $sce.trustAsResourceUrl($scope.Video[i].video_url);
                    $("#video" + i).prop('src', $videoSrc);
                    console.log($("#video" + i).attr('src'));
                }
            }, 500);
            
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadLinkUrl = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            console.log(result);
            $scope.LinkUrl = result.data.DATA.LinkUrl;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadNews = function(action){
        var params = null;
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.NewsList1 = result.data.DATA.NewsList1;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.checkFormat = function(format){
        if(format.indexOf('video') > -1){
            return true;
        }else{
            return false;
        }
    }

    $scope.getThaiDate = function(date){
        console.log(date);
        return convertDateToFullThaiDateIgnoreTime(new Date(date));
    }

    $scope.goNewsList = function(news_type){
        window.location.href = '#/news/'+news_type;
    }

    $scope.goVideoList = function(){
        window.location.href = '#/video';
    }

    $scope.Minister = null;

    $scope.ShowHighlightList = [];
    $scope.HighlightList = [
                                {'img_path':'files/img/h1.png'}
                                ,{'img_path':'files/img/h2.png'}
                                ,{'img_path':'files/img/h3.png'}
                                ,{'img_path':'files/img/h4.png'}
                            ];

    $scope.loadMenu('menu/list');
    $scope.loadSlide('slideshow/view');
    // $scope.loadPalace('palaces');
    $scope.loadLinkUrl('linkurl');
    $scope.loadNews('news/home');
    $scope.loadMenuFavourite();
    // $scope.loadVideo('video/list');
    // $scope.loadNewsEcho('news', 'ข่าวประกาศจัดซื้อจัดจ้าง', 'Y');

    setTimeout(function(){
        //showSlides();   
        // setInterval(function(){showSlides();},5000);
    },500);

    $scope.slideImage = function(index){
        var cnt = 0;
        var position = index;
        $scope.ShowHighlightList = [];

        while(cnt < 5 && position < $scope.HighlightList.length){
            
            $scope.ShowHighlightList.push($scope.HighlightList[position]);
            position++;
            cnt++;
            console.log('do : '+cnt);
            console.log('index : ' + index);
        }
        $scope.next_index = index + 1;
        $scope.prev_index = index - 1;
        console.log($scope.next_index);
        console.log($scope.prev_index);
    }
    
    $scope.next_index = 0;
    $scope.prev_index = 0;

});

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

var slideIndex = 0;



function showSlides(index) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var text = document.getElementsByClassName("text");
    var dots = document.getElementsByClassName("dot");
    
    if(slides.length !== 0){
        for (i = 0; i < slides.length; i++) {
           slides[i].style.display = "none"; 
            dots[i].className = 'dot';
            text[i].style.display = "none";
        }
        if(index == null){
            slideIndex++;
        }else{
            slideIndex = index;
        }
        if (slideIndex > slides.length) {slideIndex = 1} 
        var video_src = document.getElementById("video_src" + (slideIndex-1));
        console.log("video_src" + (slideIndex-1));
        // setTimeout(console.log(video_src.duration), 5000);
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if(slides[slideIndex-1].style !== undefined){
            slides[slideIndex-1].style.display = "block";  
            text[slideIndex-1].style.display = "block";  
        }
        dots[slideIndex-1].className += " dot-active";
        // setTimeout(function(){
            if(slides.length > 1){
                // setTimeout(showSlides, 4000);
                console.log(video_src);
                if(isNaN(video_src.duration)){
                    setTimeout(showSlides, 4000); // Change image every 2 seconds
                }else{
                    // console.log('duration' , video_src.duration * 1000);
                    setTimeout(showSlides, (video_src.duration * 1000) + 200);
                }
            }
        // },4000);
    }
}