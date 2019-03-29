angular.module('e-homework').controller('NewsDetailController', function($scope, $compile, $cookies, $filter, $state, $routeParams, HTTPService, IndexOverlayFactory) {
	$scope.$parent.menu_selected = 'news';
    $scope.$parent.menu_selected_th = 'ข่าว';

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

    $scope.load = function(action, viewer, id){
    	var params = {'id' : id , 'viewer' : viewer};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.News = result.data.DATA.News;
            $scope.slideImage($scope.next_index);
            // $scope.PictureList = $scope.News.PictureList;
            IndexOverlayFactory.overlayHide();
            console.log($scope.PictureList);

            setTimeout(function(){
                // for(var i = 0; i < $scope.NewsList.length; i++){
                console.log('do iframe');
                $("#if").prop('src', 'https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2F61.19.221.109%2Facfs%2Fweb%2F%23%2Fnews%2Fdetail%2F'+$scope.News.id+'%2F&layout=button&size=small&mobile_iframe=true&appId=190072441615269&width=59&height=20');
                // }
            }, 200);
        });
    }

    $scope.getThaiDate = function(date){
        console.log(date);
        return convertDateToFullThaiDateIgnoreTime(new Date(date));
    }

    $scope.setImageCover = function(path){
        console.log(path);
        $scope.News.image_cover_path = path;
    }

    $scope.FBShare = function(data){
         FB.ui({
                method: 'feed',
                name: data.title_th, //'สำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ aa',
                link: 'http://61.19.221.109/acfs/web/#/news/detail/' + data.id, //http://61.19.221.109/acfs/web/#/news/detail/12',
                picture: 'http://61.19.221.109/acfs/' + data.image_cover_path, //'http://61.19.221.109/acfs/files/img/news/12_20190213130745_430751.jpg',
                caption: data.title_th, //'ภาพงานพิธีเปิดโครงการฝึกอบรมเชิงปฏิบัติการ เพื่อยกระดับขีดความสามารถ Q อาสา ด้านมาตรฐานเกษตรอินทรีย์ เพื่อยกระดับขีดความสามารถ Q อาสา ให้เป็นผู้ตรวจประเมินเบื้องต้น (Pre auditor) ด้านเกษตรอินทรีย์',
                description: data.contents, //'นางสาวจูอะดี พงศ์มณีรัตน์ เลขาธิการสำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ (มกอช.) เป็นประธานเปิดโครงการฝึกอบรมเชิงปฏิบัติการ เพื่อยกระดับขีดความสามารถ Q อาสา ด้านมาตรฐานเกษตรอินทรีย์ เพื่อยกระดับขีดความสามารถ Q อาสา ให้เป็นผู้ตรวจประเมินเบื้องต้น (Pre auditor) ด้านเกษตรอินทรีย์ ในลักษณะเกษตรกรแนะนำเกษตรกรด้วยกันเองและเป็นกลไกในการขับเคลื่อน โครงการพัฒนาเกษตรกรรมยั่งยืน ร่วมกับเจ้าหน้าที่ภาครัฐที่เกี่ยวข้องในระดับพื้นที่ ผู้เข้าอบรมประกอบด้วย Q อาสา จากจังหวัดกำแพงเพชร พิจิตร พิษณุโลก เพชรบูรณ์ สระแก้ว และพัทลุง จำนวน 50 คน โดยมี นางสาวนลินทิพย์ เพณี ผู้อำนวยการกองส่งเสริมมาตรฐาน กล่าวรายงาน และร่วมต้อนรับ ณ โรงแรม ทีเค พาเลซ แอนด์ คอนเวนชั่น แจ้งวัฒนะ กรุงเทพฯ',
                message: 'สำนักงานมาตรฐานสินค้าเกษตรและอาหารแห่งชาติ'
            });
    }

    $scope.slideImage = function(index){
        var cnt = 0;
        var position = index;
        $scope.PictureList = [];

        while(cnt < 3 && position < $scope.News.PictureList.length){
            
            $scope.PictureList.push($scope.News.PictureList[position]);
            position++;
            cnt++;
            console.log('do : '+cnt);
            console.log('index : ' + index);
        }

        $scope.News.image_cover_path = $scope.PictureList[0].file_path;
        $scope.next_index = index + 1;
        $scope.prev_index = index - 1;
        console.log($scope.next_index);
        console.log($scope.prev_index);
    }
    
    $scope.next_index = 0;
    $scope.prev_index = 0;
    $scope.PictureList = [];

    $scope.NEWS_ID = $routeParams.NEWS_ID;
    $scope.loadMenu('menu/list');
    $scope.load('news/view', 'visitor', $scope.NEWS_ID);
});