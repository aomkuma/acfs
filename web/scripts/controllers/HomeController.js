angular.module('e-homework').controller('HomeController', function($scope, $cookies, $filter, $state, HTTPService, IndexOverlayFactory) {
	//console.log('Hello !');
    $scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'home';
    $scope.$parent.menu_selected_th = 'หน้าหลัก';

    $scope.slides = [{'id':1, 'path':'../cio-files/img/slide/studio_x9450.jpg'}
    				,{'id':2, 'path':'../cio-files/img/slide/studio_x9450.jpg'}];


    $scope.loadPalace = function(action){
        HTTPService.clientRequest(action, null).then(function(result){
            //console.log(result);
            $scope.PalaceList = result.data.DATA.Palace;
            IndexOverlayFactory.overlayHide();
            $scope.getMinister();
            $scope.getViceMinister();
            $scope.getAdvisor();
            $scope.getSecretary();
            $scope.getHeadOfficer();
        });
    }

    $scope.getMinister = function(){
    	var loop = $scope.PalaceList.length;
    	for(var i=0; i < loop; i++){
    		if($scope.PalaceList[i].position_en == 'Minister of Tourism and Sports'){
    			$scope.Minister = $scope.PalaceList[i];
    			console.log($scope.Minister);
    		}
    	}
    }

    $scope.getViceMinister = function(){
    	var loop = $scope.PalaceList.length;
    	for(var i=0; i < loop; i++){
    		if($scope.PalaceList[i].position_en == 'Vice Minister attached to the Prime Minister'){
    			$scope.ViceMinister = $scope.PalaceList[i];
    			console.log($scope.ViceMinister);
    		}
    	}
    }
    $scope.getAdvisor = function(){
    	var loop = $scope.PalaceList.length;
    	for(var i=0; i < loop; i++){
    		if($scope.PalaceList[i].position_en == 'Advisor to the Minister'){
    			$scope.Advisor = $scope.PalaceList[i];
    			console.log($scope.Advisor);
    		}
    	}
    }
    $scope.getSecretary = function(){
    	var loop = $scope.PalaceList.length;
    	for(var i=0; i < loop; i++){
    		if($scope.PalaceList[i].position_en == 'Secretary to the Minister of Tourism and Sports'){
    			$scope.Secretary = $scope.PalaceList[i];
    			console.log($scope.Secretary);
    		}
    	}
    }
    $scope.getHeadOfficer = function(){
    	var loop = $scope.PalaceList.length;
    	for(var i=0; i < loop; i++){
    		if($scope.PalaceList[i].position_en == 'Head Officer'){
    			$scope.HeadOfficer = $scope.PalaceList[i];
    			console.log($scope.HeadOfficer);
    		}
    	}
    }


    $scope.Minister = null;

    $scope.loadPalace('palaces');
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
setTimeout(function(){
	showSlides();	
	// setInterval(function(){showSlides();},5000);
},500);


function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " dot-active";
    setTimeout(showSlides, 4000); // Change image every 2 seconds
}