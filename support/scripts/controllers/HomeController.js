angular.module('app').controller('HomeController', function($scope, $cookies, $filter, $state, $uibModal, IndexOverlayFactory, HTTPService) {
	//console.log('Hello !');
    $scope.DEFAULT_LANGUAGE = 'TH';
    var $user_session = sessionStorage.getItem('user_session');
    $scope.menu_selected = 'home';
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }

    // load standard
    $scope.loadCommodityStandard = function(action){
        var params = {'userType':$scope.currentUser.userType
	        			, 'userID': $scope.currentUser.adminID
	        			, 'currentPage': $scope.currentPage
	        			, 'limitRowPerPage': $scope.limitRowPerPage
	        			, 'standardIDToIgnore' : $scope.standardIDToIgnore
        			};
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.dataset = result.data.DATA.CommodityStandard;
                $scope.totalPages = result.data.DATA.Total;
                $scope.standardIDToIgnore = result.data.DATA.standardIDToIgnore;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadMeeting = function(action){
        var params = {'userType':$scope.currentUser.userType
	        			, 'userID': $scope.currentUser.adminID
        			};
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Meeting = result.data.DATA.Meeting;
                $scope.getDayOfMonth();
                IndexOverlayFactory.overlayHide();

            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.goUpdateStandard = function(id){
        window.location.href = '#/commodity-standard/update/' + id;
    }

    $scope.getStatusText = function(step){
        return $scope.statusText[step];
    }

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        $scope.loadCommodityStandard('commodity-standard/list/home');
    }

    $scope.makeDateString = function(d){
    	if(d!= null && d != ''){
            return convertDateToFullThaiDateIgnoreTime(new Date(d.split(' ')[0]));    
        }
        return '';
    }

	$scope.goToLastMonth = function() {
		$scope.date = new Date($scope.date.getFullYear(), $scope.date.getMonth(), 0);
		$scope.getDayOfMonth()
		// this.getDaysOfMonth();
	}

	$scope.goToNextMonth = function() {
		$scope.date = new Date($scope.date.getFullYear(), $scope.date.getMonth()+2, 0);
		$scope.getDayOfMonth()
	// this.getDaysOfMonth();
	}

    $scope.getDayOfMonth = function(){

		$scope.daysInThisMonth = [];
	    $scope.daysInLastMonth = [];
	    $scope.daysInNextMonth = [];    	
	    $scope.currentMonth = $scope.monthNames[$scope.date.getMonth()];
	    $scope.currentMonthInt = $scope.date.getMonth() + 1;
	    $scope.currentYear = $scope.date.getFullYear();
	    if($scope.date.getMonth() === new Date().getMonth()) {
	      $scope.currentDate = new Date().getDate();
	    } else {
	      $scope.currentDate = 999;
	    }

	    var firstDayThisMonth = new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1).getDay();
	    var prevNumOfDays = new Date($scope.date.getFullYear(), $scope.date.getMonth(), 0).getDate();
	    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
	      $scope.daysInLastMonth.push(i);
	    }

	    var $scopeNumOfDays = new Date($scope.date.getFullYear(), $scope.date.getMonth()+1, 0).getDate();
	    for (var i = 0; i < $scopeNumOfDays; i++) {
	      $scope.daysInThisMonth.push(i+1);
	    }

	    var lastDayThisMonth = new Date($scope.date.getFullYear(), $scope.date.getMonth()+1, 0).getDay();
	    var nextNumOfDays = new Date($scope.date.getFullYear(), $scope.date.getMonth()+2, 0).getDate();
	    for (var i = 0; i < (6-lastDayThisMonth); i++) {
	      $scope.daysInNextMonth.push(i+1);
	    }
	    var totalDays = $scope.daysInLastMonth.length+$scope.daysInThisMonth.length+$scope.daysInNextMonth.length;
	    if(totalDays<36) {
	      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
	        $scope.daysInNextMonth.push(i);
	      }
	    }

        if($scope.isFirstLoadPage){
            console.log('this day : ' + $scope.date.getDate());
            
            $scope.setMeetingTable($scope.findMeetingInDay($scope.date.getDate()));
            $scope.isFirstLoadPage = false;
        }
	    console.log($scope.daysInThisMonth);
    }

    $scope.findMeetingInDay = function(day){
    	// Create date obj
    	
    	var curDate = $scope.date;
    	curDate.setDate(day);
    	// console.log(curDate);

    	var meetingList = [];
    	// convert date to string
    	curDate = makeSQLDate(curDate);
    	for(var i = 0; i < $scope.Meeting.length; i++){
    		// convert meeting start and end date time to string 
    		var startDate = $scope.Meeting[i].startDate.split(' ')[0];
    		var endDate = $scope.Meeting[i].endDate.split(' ')[0];
    		// console.log(curDate, startDate, endDate);
    		if(curDate == startDate || curDate == endDate){
    			meetingList.push($scope.Meeting[i]);
    		}
    	}
    	// console.log(meetingList);
    	return meetingList;
    }

    $scope.setMeetingTable = function(meeting, date){

        $scope.CurrentDay = convertDateToFullThaiDateIgnoreTime(new Date($scope.date));
        $scope.MeetingList = meeting;
        console.log($scope.MeetingList);
    }

    $scope.showMeetingDetail = function(data){
        $scope.MeetingDetail = data;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'meeting_detail.html',
            size: 'lg',
            scope: $scope,
            backdrop: 'static',
            controller: 'ModalDialogReturnFromOKBtnCtrl',
            resolve: {
                params: function () {
                    return {};
                }
            },
        });
    }

    $scope.makeDateTimeString = function(d){

        if(d!= null && d != ''){
            var datetime = d.split(' ');
            var date = datetime[0];
            var time = datetime[1];
            d = new Date(date);
            d.setHours(time.split(':')[0]);
            d.setMinutes(time.split(':')[1]);
            return convertDateToFullThaiDate(d);    
        }
        return '';
    }

    $scope.statusText = [''
                        , 'การพิจารณาเรื่อง'
                        , 'การแต่งตั้งคณะกรรมการ'
                        , 'การจัดทำร่างมาตรฐาน'
                        , 'พิจารณาร่างมาตรฐาน'
                        , 'การประสานความเห็นจากผู้มีส่วนได้เสีย'
                        , 'การเสนอคณะกรรมการมาตรฐาน'
                        , 'การรับฟังความเห็นจากต่างประเทศ'
                        , 'การเสนอรัฐมนตรีลงนามในประกาศ/กฎกระทรวง'
                        , 'ประกาศใช้'
                        , 'ยกเลิกการประกาศใช้'
                        , 'ทบทวน'
                        ];
    $scope.totalPages = 0;
    $scope.currentPage = 0;
    $scope.limitRowPerPage = 5;
    $scope.limitDisplay = 5;
    $scope.date = new Date();
  	$scope.monthNames = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

	$scope.daysInThisMonth = [];
    $scope.daysInLastMonth = [];
    $scope.daysInNextMonth = [];
    $scope.Meeting = [];
    $scope.CurrentDay = convertDateToFullThaiDateIgnoreTime(new Date());
    $scope.MeetingList = [];
    $scope.isFirstLoadPage = true;
    // load seminar

    $scope.loadCommodityStandard('commodity-standard/list/home');
    $scope.loadMeeting('meeting/list/home');
    // $scope.getDayOfMonth();
});