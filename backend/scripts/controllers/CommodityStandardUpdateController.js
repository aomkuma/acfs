angular.module('app').controller('CommodityStandardUpdateController', function($scope, $compile, $cookies, $filter, $state, $routeParams, $uibModal, HTTPService, IndexOverlayFactory) {
	
	IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
	console.log('id : ', $scope.$parent.currentUser.adminID);
	$scope.ID = $routeParams.id;
	$scope.$parent.menu_selected = 'commodity-standard';

	$scope.addKeywordTH = function(){
		$scope.Commodity_Keywords_TH.push({'keyword':''
								,'keywordLang':'TH'
								, 'createBy':$scope.currentUser.adminID
								, 'updateBy':$scope.currentUser.adminID});
	}

	$scope.addKeywordEN = function(){
		$scope.Commodity_Keywords_EN.push({'keyword':''
								,'keywordLang':'EN'
								, 'createBy':$scope.currentUser.adminID
								, 'updateBy':$scope.currentUser.adminID});
	}

	$scope.loadCommodityStandard = function(action, id){
		var params = {
					'id':id
					};
		HTTPService.clientRequest('commodity-standard/get', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Commodity_Standards = result.data.DATA.CommodityStandard;
                $scope.Commodity_Keywords_TH = result.data.DATA.Commodity_Keywords_TH;
                $scope.Commodity_Keywords_EN = result.data.DATA.Commodity_Keywords_EN;
                $scope.loadStakeholders($scope.ID);
                $scope.loadMeetings($scope.ID);
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
	}

	$scope.loadStakeholders = function(standardID){
		var params = {
					'standardID':standardID
					};
		HTTPService.clientRequest('academic-board/list', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.AcademicBoard = result.data.DATA.AcademicBoard;
            	IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
	}

	$scope.loadMeetings = function(standardID){
		var params = {
					'standardID':standardID
					};
		HTTPService.clientRequest('meeting/list', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Meetings = result.data.DATA.Meeting;
            	IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
	}

	$scope.save = function(){
		$scope.Commodity_Standards.updateBy = $scope.currentUser.adminID;
		var params = {
					'Commodity_Standards':$scope.Commodity_Standards
					, 'Commodity_Keywords_TH':$scope.Commodity_Keywords_TH
					, 'Commodity_Keywords_EN':$scope.Commodity_Keywords_EN
					};
		IndexOverlayFactory.overlayShow();
        HTTPService.uploadRequest('commodity-standard/update', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                if($scope.ID === undefined){
                    window.location.href = '#/commodity-standard/update/' + result.data.DATA.standardID;
                }else{
                    $scope.ID = result.data.DATA.standardID;
                    //$scope.loadCommodityStandard('commodity-standard/get', $scope.page_type);
                    $scope.loadCommodityStandard('commodity-standard/get', $scope.ID);
                    IndexOverlayFactory.overlayHide();    
                }
                
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
	}

	$scope.cancel = function(){
		window.location.href = '#/commodity-standard';
	}

	$scope.updateStakeholders = function(data){
		$scope.setStakeholder();
		$scope.setSubstitute();
		if(data != null){
			console.log(data);
			$scope.Stakeholders = angular.copy(data);
			// $scope.Substitute_List = $scope.Stakeholders.Substitute_List;
		}
		var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'update_stakeholder.html',
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
        modalInstance.result.then(function (valResult) {
            $scope.saveStakeholder(valResult);
        });
	}

	$scope.saveStakeholder = function(data){
		console.log(data);
		var params = {'Stakeholders' : data, 'standardID' : $scope.ID};
		IndexOverlayFactory.overlayShow();
		HTTPService.clientRequest('academic-board/update', params).then(function(result){  
			console.log(result.data);
			$scope.loadStakeholders($scope.Commodity_Standards.standardID);
			IndexOverlayFactory.overlayHide();
		});
	}

	$scope.removeStakeholders = function(academicBoardID){
		$scope.alertMessage = 'ต้องการลบรายชื่อบุคคลนี้ ใช่หรือไม่ ?';
        var modalInstance = $uibModal.open({
            animation : true,
            templateUrl : 'views/dialog_confirm.html',
            size : 'sm',
            scope : $scope,
            backdrop : 'static',
            controller : 'ModalDialogCtrl',
            resolve : {
                params : function() {
                    return {};
                } 
            },
        });
        modalInstance.result.then(function (valResult) {
            IndexOverlayFactory.overlayShow();
            var params = {'academicBoardID' : academicBoardID};
            HTTPService.clientRequest('academic-board/delete', params).then(function(result){
	            console.log(result);
	            if(result.data.STATUS == 'OK'){
	                $scope.loadCommodityStandard('commodity-standard/get', $scope.ID);
	                IndexOverlayFactory.overlayHide();
	            }else{
	                IndexOverlayFactory.overlayHide();
	            }
	        
	        });
        });
	}

	$scope.addSubstitute = function(){
		$scope.Stakeholders.Substitute_List.push({'substituteID':''});
	}

	$autocompleteUserResult = [];
    $scope.searchUserAutoComplete = function (val, qtype){
		val = encodeURIComponent(val);
		var params = {'qtype' : qtype, 'keyword' : val};
		return HTTPService.clientRequest('autocomplete', params).then(function(result){  
          $autocompleteUserResult = result.data.DATA;
          var loop = $autocompleteUserResult.length;
          console.log($autocompleteUserResult);
          if(loop > 0){
              var objList = [];
              for(var i = 0; i < loop; i++){
                objList.push($autocompleteUserResult[i]);
              }
              return objList;
          }else{
            return null;
          }
	      
	    });
	};

	$scope.autocompleteStakeholderSelected = function ($item, $model, $label){
		var academicBoardID = $scope.Stakeholders.academicBoardID;
        $scope.Stakeholders = angular.copy($item);
        $scope.Stakeholders.academicBoardID = academicBoardID;
        if(academicBoardID == ''){
        	$scope.Stakeholders['Substitute_List'] = [];	
        }
        
        console.log($scope.Stakeholders);
    }

    $scope.autocompleteSubstituteSelected = function($item, index){
    	var substituteID = $scope.Stakeholders.Substitute_List[index].substituteID;
    	$scope.Stakeholders.Substitute_List[index] = angular.copy($item);
    	$scope.Stakeholders.Substitute_List[index].substituteID = substituteID;
    	console.log($scope.Stakeholders.Substitute_List[index]);
    }

    $scope.updateMeeting = function(meetingType, data){
    	$scope.setMeeting(meetingType, $scope.ID);
    	$scope.meetingType = meetingType;
    	$scope.startHour = 0;
    	$scope.startMin = 0;
    	$scope.endHour = 0;
    	$scope.endMin = 0;
    	$scope.MeetingFileList = [];
    	$scope.InviteFileList = [];
    	if(data != null){
    		$scope.Meeting = angular.copy(data);
    		$scope.Meeting.startDate = makeDateTime($scope.Meeting.startDate);
    		$scope.Meeting.endDate = makeDateTime($scope.Meeting.endDate);
    		$scope.startHour = $scope.Meeting.startDate.getHours();
	    	$scope.startMin = $scope.Meeting.startDate.getMinutes();
	    	$scope.endHour = $scope.Meeting.endDate.getHours();
	    	$scope.endMin = $scope.Meeting.endDate.getMinutes();
    	}
    	var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'update_meeting.html',
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
        modalInstance.result.then(function (valResult) {
            $scope.saveMeeting($scope.Meeting, $scope.MeetingFileList, $scope.InviteFileList);
        });
    }

    $scope.dateOptions1 = {
        minDate: new Date(),
        showWeeks: true
      };

    $scope.dateOptions2 = {
        minDate: new Date(),
        showWeeks: true
      };
    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.dateOptions2.minDate = $scope.Meeting.startDate==null?new Date():$scope.Meeting.startDate;
        $scope.popup2.opened = true;
    };

    $scope.changeStartTime = function(hour, min){
    	var d = new Date($scope.Meeting.startDate);
    	d.setHours(hour);
    	d.setMinutes(min);
    	$scope.Meeting.startDate = d;
    }

    $scope.changeEndTime = function(hour, min){
    	var d = new Date($scope.Meeting.endDate);
    	d.setHours(hour);
    	d.setMinutes(min);
    	$scope.Meeting.endDate = d;
    }

    $scope.checkBetweenDate = function(changeType){
        if($scope.ReserveRoomInfo.StartDate != undefined && $scope.ReserveRoomInfo.EndDate != undefined 
            && ($scope.ReserveRoomInfo.StartTime != undefined &&$scope.ReserveRoomInfo.StartTime != '') 
            && ($scope.ReserveRoomInfo.EndTime != undefined &&$scope.ReserveRoomInfo.EndTime != '')){
            var startTime = ($scope.ReserveRoomInfo.StartTime==''?'00:00':$scope.ReserveRoomInfo.StartTime);
            var endTime = ($scope.ReserveRoomInfo.EndTime==''?'00:00':$scope.ReserveRoomInfo.EndTime);
            var start = concatDateTime($scope.ReserveRoomInfo.StartDate, startTime);
            var end = concatDateTime($scope.ReserveRoomInfo.EndDate, endTime);
            if(start > end){
                alert('เวลาเริ่มต้นมากกว่าเวลาสิ้นสุด');
                if(changeType == 'StartDate'){
                    $scope.ReserveRoomInfo.StartDate = null;
                }else if(changeType == 'StartTime'){
                    $scope.ReserveRoomInfo.StartTime = '';
                }else if(changeType == 'EndDate'){
                    $scope.ReserveRoomInfo.EndDate = null;
                }else if(changeType == 'EndTime'){
                    $scope.ReserveRoomInfo.EndTime = '';
                }
            }
        }
    }

    $scope.addMeetingFiles = function(){
    	$scope.MeetingFileList.push({'attachFile':null});
    }

    $scope.addInviteFiles = function(){
    	$scope.InviteFileList.push({'attachFile':null});
    }

    $scope.saveMeeting = function(Meeting, MeetingFileList, InviteFileList){
    	Meeting.startDate = concatDateTimeSQL(Meeting.startDate);
    	Meeting.endDate = concatDateTimeSQL(Meeting.endDate);
    	var params = {
					'Meeting':Meeting
					,'MeetingFileList':MeetingFileList
					,'InviteFileList':InviteFileList
					};
		console.log(params);
		// IndexOverlayFactory.overlayShow();			
		HTTPService.uploadRequest('meeting/update', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.loadMeetings($scope.ID);
            	IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.removeAttach = function(action, id, index, obj){
    	var params = {'id' : id};

        HTTPService.clientRequest(action, params).then(function(result){
            
            if(!result.data.DATA.result){
            	$scope.alertMessage = 'ไม่สามารถลบข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ';
	            var modalInstance = $uibModal.open({
	                animation : true,
	                templateUrl : 'html/custom_alert.html',
	                size : 'sm',
	                scope : $scope,
	                backdrop : 'static',
	                controller : 'ModalDialogCtrl',
	                resolve : {
	                    params : function() {
	                        return {};
	                    } 
	                },
	            });
            }else{
            	obj.splice(index, 1);
            	$scope.loadMeetings($scope.ID);
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.setMeeting = function(meetingType, standardID){
    	$scope.Meeting = {
    						'meetingID':''
    						,'standardID':standardID
    						,'meetingName':''
    						,'address':''
    						,'startDate':''
    						,'endDate':''
    						,'meetingType':meetingType
    						,'ConvenedStatus':'Y'
    						,'createBy':$scope.currentUser.adminID
    						,'createDate':''
    						,'updateBy':$scope.currentUser.adminID
    						,'updateDate':''
    					};
    }

	$scope.setStakeholder = function(){
		$scope.Stakeholders = {'academicBoardID':''
								,'stakeholderID':''
								,'nameThai':''
								,'lastNameThai':''
								,'nameEng':''
								,'lastNameEng':''
								,'positionThai':''
								,'positionEng':''
								,'responsible':''
								,'experience':''
								,'institution':''
								,'address':''
								,'phone':''
								,'fax':''
								,'email':''
								,'status':''
								,'createBy':$scope.currentUser.adminID
								,'createDate':''
								,'updateBy':$scope.currentUser.adminID
								,'updateDate':''
								,'Substitute_List':[]
							};
	}

	$scope.setSubstitute = function(){
		$scope.Substitute = {'substituteID':''
								,'stakeholderID':''
								,'nameThai':''
								,'lastNameThai':''
								,'nameEng':''
								,'lastNameEng':''
								,'positionThai':''
								,'positionEng':''
								,'responsible':''
								,'experience':''
								,'institution':''
								,'address':''
								,'phone':''
								,'fax':''
								,'email':''
								,'status':''
								,'createBy':$scope.currentUser.adminID
								,'createDate':''
								,'updateBy':$scope.currentUser.adminID
								,'updateDate':''
							};
	}


	$scope.Commodity_Standards = {'standardID':''
								,'standardType':''
								, 'standardCategory':''
								, 'productType':''
								, 'step':'1'
								, 'status':'Active'
								, 'createBy':$scope.currentUser.adminID
								, 'updateBy':$scope.currentUser.adminID
								};

	$scope.Commodity_Keywords_TH = [];
	$scope.Commodity_Keywords_EN = [];
	$scope.AcademicBoard = [];
	$scope.MeetingFileList = [];
	$scope.InviteFileList = [];
	$scope.meetingType = '';

	// Begin Program
	$scope.addKeywordTH();
	$scope.addKeywordEN();
	$scope.setStakeholder();
	$scope.setSubstitute();
	if($scope.ID !== undefined){
		$scope.loadCommodityStandard('commodity-standard/get', $scope.ID);
	}
	IndexOverlayFactory.overlayHide();
});