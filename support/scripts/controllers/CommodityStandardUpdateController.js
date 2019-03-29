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
    $scope.disabled_form = $routeParams.disabled_form;

    $scope.DisabledForm = false;
    if($scope.disabled_form == 'disabled'){
        $scope.DisabledForm = true;
    }
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

    $scope.IDReplaced = {'id':''};
    $scope.checkStep = function(step){
        if(step != 9){
            $scope.Commodity_Standards.useDate = null;
            $scope.AttachFile = null;
            if(step == 10){
                $scope.CommodityStandardReplaceList = [];
                var params = {'standardID' : $scope.Commodity_Standards.standardID};
                HTTPService.clientRequest('commodity-standard/list/replace', params).then(function(result){

                    $scope.CommodityStandardReplaceList = result.data.DATA.List;

                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'choose_standard_replace.html',
                        size: 'md',
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
                        $scope.ID_Replaced = valResult;
                        console.log($scope.ID_Replaced);
                    });
                });
            }
        }
    }

	$scope.loadCommodityStandard = function(action, id){
		var params = {
					'id':id
					};
		HTTPService.clientRequest('commodity-standard/get', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Commodity_Standards = result.data.DATA.CommodityStandard;

                if($scope.Commodity_Standards.step == '10'){
                    $scope.CommodityStep = $scope.Commodity_Standards.step;
                }

                $scope.Commodity_Keywords_TH = result.data.DATA.Commodity_Keywords_TH;
                $scope.Commodity_Keywords_EN = result.data.DATA.Commodity_Keywords_EN;
                $scope.loadStakeholders($scope.ID);
                $scope.loadMeetings($scope.ID);
                $scope.Commodity_Standards.useDate = makeDateTime($scope.Commodity_Standards.useDate);
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
                    , 'menuType':'standard'
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

    $scope.loadMasterfile = function(masterType){
        var params = {
                    'masterType':masterType
                    };
        HTTPService.clientRequest('masterfile/get', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                if(masterType == 'AccreditationScope'){
                    $scope.AccrediationScopeList = result.data.DATA;
                }else if(masterType == 'Branch'){
                    $scope.BranchList = result.data.DATA;
                }
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

	$scope.save = function(){
		$scope.Commodity_Standards.updateBy = $scope.currentUser.adminID;
        if($scope.Commodity_Standards.useDate != undefined && $scope.Commodity_Standards.useDate != null && $scope.Commodity_Standards.useDate != '' && $scope.Commodity_Standards.useDate != '0000-00-00 00:00:00'){
            $scope.Commodity_Standards.useDate = makeSQLDate($scope.Commodity_Standards.useDate);
        }

        if($scope.Commodity_Standards.echoDate != undefined && $scope.Commodity_Standards.echoDate != null && $scope.Commodity_Standards.echoDate != '' && $scope.Commodity_Standards.echoDate != '0000-00-00 00:00:00'){
            $scope.Commodity_Standards.echoDate = makeSQLDate($scope.Commodity_Standards.echoDate);
        }

        if($scope.Commodity_Standards.cancelledDate != undefined && $scope.Commodity_Standards.cancelledDate != null && $scope.Commodity_Standards.cancelledDate != '' && $scope.Commodity_Standards.cancelledDate != '0000-00-00 00:00:00'){
            $scope.Commodity_Standards.cancelledDate = makeSQLDate($scope.Commodity_Standards.cancelledDate);
        }
		var params = {
					'Commodity_Standards':$scope.Commodity_Standards
					, 'Commodity_Keywords_TH':$scope.Commodity_Keywords_TH
					, 'Commodity_Keywords_EN':$scope.Commodity_Keywords_EN
                    , 'ID_Replaced':($scope.ID_Replaced==undefined?'':$scope.ID_Replaced.id)
                    , 'AttachFile':$scope.AttachFile
                    , 'AttachFileEN':$scope.AttachFileEN
					};
		IndexOverlayFactory.overlayShow();
        HTTPService.uploadRequest('commodity-standard/update', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.addAlert('บันทึกสำเร็จ','success');
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
		// val = encodeURIComponent(val);
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
        $scope.emailSentHour = 0;
        $scope.emailSentMin = 0;
        $scope.Meeting = null;
        $scope.AttendeeList = [];
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
            console.log($scope.Meeting.emailSentDate);
            if($scope.Meeting.emailSentDate != null){
                $scope.Meeting.emailSentDate = makeDateTime($scope.Meeting.emailSentDate);
                $scope.emailSentHour = $scope.Meeting.emailSentDate.getHours();
                $scope.emailSentMin = $scope.Meeting.emailSentDate.getMinutes();
                console.log($scope.emailSentHour, $scope.emailSentMin);
            }
            // load meeting attendee
            var params = {'meetingID' : $scope.Meeting.meetingID};
            HTTPService.uploadRequest('meeting/view/attendee', params).then(function(result){
                console.log(result);
                if(result.data.STATUS == 'OK'){
                    $scope.AttendeeList = result.data.DATA.Attendee;
                }
            });
    	}else{
            $scope.setMeeting(meetingType, $scope.ID);
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
            $scope.saveMeeting($scope.Meeting, $scope.AttendeeList, $scope.MeetingFileList, $scope.InviteFileList);
        });
    }

    $scope.dateOptions1 = {
        // minDate: new Date(),
        showWeeks: true
      };

    $scope.dateOptions2 = {
        // minDate: new Date(),
        showWeeks: true
      };
      $scope.dateOptions3 = {
        // minDate: new Date(),
        showWeeks: true
      };

      $scope.dateOptions4 = {
        // minDate: new Date(),
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
        // $scope.dateOptions2.minDate = $scope.Meeting.startDate==null?new Date():$scope.Meeting.startDate;
        $scope.popup2.opened = true;
    };
    $scope.popup3 = {
        opened: false
    };
    $scope.open3 = function() {
        $scope.popup3.opened = true;
    };

    $scope.popup4 = {
        opened: false
    };
    $scope.open4 = function() {
        $scope.popup4.opened = true;
    };

    $scope.changeStartTime = function(hour, min){
        console.log($scope.Meeting);
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

    $scope.changeSentEmailTime = function(hour, min){
        console.log($scope.Meeting.emailSentDate);
        var d = new Date($scope.Meeting.emailSentDate);
        d.setHours(hour);
        d.setMinutes(min);
        $scope.Meeting.emailSentDate = d;
        console.log($scope.Meeting.emailSentDate);
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

    $scope.uploadMOMFile = function(MOMFile, meetingID){
        var params = {
                    'MOMFile':MOMFile
                    ,'standardID':$scope.Commodity_Standards.standardID
                    ,'meetingID':meetingID
                    };
        IndexOverlayFactory.overlayShow();          
        HTTPService.uploadRequest('meeting/upload/momfile', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                window.location.reload();
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.saveMeeting = function(Meeting, AttendeeList, MeetingFileList, InviteFileList){
    	Meeting.startDate = concatDateTimeSQL(Meeting.startDate);
    	Meeting.endDate = concatDateTimeSQL(Meeting.endDate);
        Meeting.emailSentDate = concatDateTimeSQL(Meeting.emailSentDate);
        
    	var params = {
					'Meeting':Meeting
                    ,'AttendeeList':AttendeeList
					,'MeetingFileList':MeetingFileList
					,'InviteFileList':InviteFileList
					};
		console.log(params);
		IndexOverlayFactory.overlayShow();			
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

    $scope.viewAttendee = function(meetingID){
        $scope.meetingID = meetingID;
        var params = {'meetingID' : meetingID};
        HTTPService.uploadRequest('meeting/view/attendee', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.AttendeeList = result.data.DATA.Attendee;
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'view_attendee.html',
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
                   
                });

                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
        
    }

    $scope.autocompleteAttendeeSelected = function($item, $model, $label){
        if($scope.Meeting !== undefined && $scope.Meeting != null){
            $scope.meetingID = $scope.Meeting.meetingID;
        }
        var attendee = {'meetingAttendeeID':''
                            ,'attendeeID':$item.stakeholderID
                            ,'meetingID':$scope.meetingID
                            ,'standardID':$scope.ID
                            ,'nameThai':$item.nameThai
                            ,'lastNameThai':$item.lastNameThai
                            ,'positionThai':$item.positionThai
                            ,'createBy':$scope.currentUser.adminID
                            ,'createDate':''
                            ,'updateBy':$scope.currentUser.adminID
                            ,'updateDate':''
                            };
        if($scope.meetingID != undefined && $scope.meetingID != null && $scope.meetingID != ''){
            var params = {'Attendee' : attendee};
            HTTPService.uploadRequest('meeting/add/attendee', params).then(function(result){
                if(result.data.STATUS == 'OK'){
                    attendee.meetingAttendeeID = result.data.DATA.Attendee.meetingAttendeeID;
                    $scope.AttendeeList.push(attendee);
                    
                }
            });
        }else{
            $scope.AttendeeList.push(attendee);
        }
        $scope.keyword = '';    
    }

    $scope.removeAttendee = function(id, index){
        console.log(id);
        if(id != undefined){
            var params = {'id' : id};

            HTTPService.clientRequest('meeting/delete/attendee', params).then(function(result){
                
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
                    $scope.AttendeeList.splice(index, 1);
                }
                IndexOverlayFactory.overlayHide();
            });
        }else{
            $scope.AttendeeList.splice(index, 1);
        }
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
                            ,'sentEmailStatus':'Default'
                            ,'isSendMail':'N'
                            ,'remark':''
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

    $scope.alerts = [];
    $scope.addAlert = function(msg, type) {
      $scope.alerts.push({
        msg: msg,
        type: type
      });
    };

    

    $scope.sendMailMeeting = function(Meeting){
        var params = {'Meeting' : Meeting};
        IndexOverlayFactory.overlayShow();
        HTTPService.uploadRequest('meeting/sendmail', params).then(function(result){  
            if(result.data.STATUS == 'OK'){
                // $scope.addAlert('ส่ง email สำเร็จ','success');
                alert('ส่ง email สำเร็จ');
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.sendMailPassword = function(){
        var params = {'standardID' : $scope.Commodity_Standards.standardID};
        IndexOverlayFactory.overlayShow();
        HTTPService.uploadRequest('academic-board/sendmail', params).then(function(result){  
            if(result.data.STATUS == 'OK'){
                // $scope.addAlert('ส่ง email สำเร็จ','success');
                alert('ส่ง email สำเร็จ');
            }
            IndexOverlayFactory.overlayHide();
        });
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
    $scope.meetingID = '';
    $scope.AttachFile = null;

    $scope.MinuteList = getMinuteList();
    $scope.HourList = getHourList();
    $scope.YearList = getYearList(20);

	// Begin Program
	$scope.addKeywordTH();
	$scope.addKeywordEN();
	$scope.setStakeholder();
	$scope.setSubstitute();
    $scope.loadMasterfile('AccreditationScope');
    $scope.loadMasterfile('Branch');
	if($scope.ID !== undefined){
		$scope.loadCommodityStandard('commodity-standard/get', $scope.ID);
	}
	IndexOverlayFactory.overlayHide();
});