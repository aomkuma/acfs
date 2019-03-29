angular.module('e-homework').controller('NewsController', function($scope, $compile, $cookies, $filter, $state, $routeParams, HTTPService, IndexOverlayFactory) {
	$scope.$parent.menu_selected = 'news';
    $scope.$parent.menu_selected_th = 'ข่าว';
    $scope.page_type = 'news';//$routeParams.page_type;
    console.log($routeParams.page_type);
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

    $scope.getMenu = function(action, menu_type){
        var params = {'menu_type' : menu_type};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.MenuName = result.data.DATA.Menu;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.load = function(action, news_type, actives){
    	var params = {'news_type' : news_type
                    , 'actives': actives
                    , 'currentPage': $scope.currentPage
                    , 'limitRowPerPage': $scope.limitRowPerPage};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.NewsList = result.data.DATA.News;
            $scope.totalPages = result.data.DATA.Total;
            setTimeout(function(){
                for(var i = 0; i < $scope.NewsList.length; i++){
                    console.log('do iframe');
                    $("#if" + i).prop('src', 'https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2F61.19.221.109%2Facfs%2Fweb%2F%23%2Fnews%2Fdetail%2F'+$scope.NewsList[i].id+'%2F&layout=button&size=small&mobile_iframe=true&appId=190072441615269&width=59&height=20');
                }
            }, 200);
            
            IndexOverlayFactory.overlayHide();
        });
    }
    
    $scope.changeNewsType = function(news_type){
		$scope.NEWS_TYPE = news_type;
    	$scope.load('news', $scope.NEWS_TYPE, 'Y');
    }

    $scope.getThaiDate = function(date){
        console.log(date);
        return convertDateToFullThaiDateIgnoreTime(new Date(date));
    }

    $scope.getUrl = function(url){
        // console.log('http://61.19.221.109/acfs/web/#/news/detail/'+url);
        // return encodeURIComponent('http://61.19.221.109/acfs/web/#/news/detail/'+url);
        return 'https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&layout=button&size=small&mobile_iframe=true&appId=190072441615269&width=59&height=20';
    }

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        $scope.load('news');
    }

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $scope.goToPage($scope.currentPage);
        // $log.log('Page changed to: ' + $scope.currentPage);
    };
    
    if($routeParams.NEWS_TYPE != undefined || $routeParams.NEWS_TYPE != null){
        if($routeParams.NEWS_TYPE == '1'){
            $scope.NEWS_TYPE = 'ข่าวเด่นรัฐมนตรีว่าการกระทรวงการท่องเที่ยวและกีฬาจากสื่อต่างๆ';    
        }else if($routeParams.NEWS_TYPE == '2'){
            $scope.NEWS_TYPE = 'ข่าวประชาสัมพันธ์รัฐมนตรีว่าการกระทรวงการท่องเที่ยวและกีฬาจากสื่อต่างๆ';    
        }else if($routeParams.NEWS_TYPE == '3'){
            $scope.NEWS_TYPE = 'ข่าวประชาสัมพันธ์ปลัดกระทรวงการท่องเที่ยวและกีฬา';    
        }else if($routeParams.NEWS_TYPE == '4'){
            $scope.NEWS_TYPE = 'ข่าวประชาสัมพันธ์ของจังหวัด';    
        }
        
    }

    $scope.totalPages = 0;
    $scope.currentPage = 1;
    $scope.limitRowPerPage = 9;
    $scope.limitDisplay = 10;
    
    $scope.loadMenu('menu/list');
    $scope.getMenu('menu/get/type' ,$scope.page_type);
    $scope.load('news', $scope.NEWS_TYPE, 'Y');
});