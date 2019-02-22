angular.module('app').controller('SubcommitteeUpdateController', function($scope, $compile, $cookies, $filter, $state, $uibModal, $routeParams, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! subcommittee update page');
	$scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'subcommittee';
    $scope.ID = $routeParams.id;

    $scope.loadSubcommittee = function(action, id){
        var params = {'id': id};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Subcommittee = result.data.DATA.Subcommittee;

                 IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.saveSubcommittee = function(data){
        console.log(data);
        var params = {'Subcommittee' : data};
        IndexOverlayFactory.overlayShow();
        HTTPService.clientRequest('subcommittee/update', params).then(function(result){  
            // console.log(result.data);
            // $scope.loadSubcommittees($scope.Commodity_Standards.standardID);
            if(result.data.STATUS == 'OK'){
                // $scope.addAlert('บันทึกสำเร็จ','success');
                // if($scope.ID === undefined){
                //     window.location.href = '#/subcommittee/update/' + result.data.DATA.subcommitteeID;
                // }else{

                //     $scope.ID = result.data.DATA.subcommitteeID;
                //     $scope.loadSubcommittee('subcommittee/get', $scope.ID);
                //     IndexOverlayFactory.overlayHide();    
                // }
                window.location.href = '#/stakeholder/2';
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $autocompleteUserResult = [];
    $scope.searchStakeholderAutoComplete = function (val, qtype){
        // val = encodeURIComponent(val);
        var params = {'qtype' : qtype, 'keyword' : val};
        return HTTPService.clientRequest('autocomplete', params).then(function(result){  
          $autocompleteUserResult = result.data.DATA;
          var loop = $autocompleteUserResult.length;
          // console.log($autocompleteUserResult);
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

        // check person if exist
        var loop = $scope.Subcommittee.subcommittee_person.length;
        for(var i = 0; i < loop; i++){
            if($item.stakeholderID == $scope.Subcommittee.subcommittee_person[i].stakeholderID){
                alert('มีรายชื่อบุคคลนี้อยู่ในกลุ่มคณะอนุกรรมการนี้แล้ว');
                return false;
            }
        }

        var person = {'subcommitteePersonID':'' 
                    , 'subcommitteeID':$scope.ID
                    , 'stakeholderID':$item.stakeholderID
                    , 'nameThai':$item.nameThai
                    , 'lastNameThai':$item.lastNameThai
                    , 'positionThai':$item.positionThai
                    , 'responsible':$item.responsible
                    , 'experience':$item.experience
                    , 'phone':$item.phone
                    , 'positionName':''};
                        
        $scope.Subcommittee.subcommittee_person.push(person);
        $scope.keyword = '';

    }

    $scope.removeSubcommitteePerson = function(id, index){
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

            if(id != ''){
                IndexOverlayFactory.overlayShow();
                var params = {'id' : id};
                HTTPService.clientRequest('subcommittee/person/delete', params).then(function(result){
                    console.log(result);
                    if(result.data.STATUS == 'OK'){
                        $scope.Subcommittee.subcommittee_person.splice(index, 1);
                        IndexOverlayFactory.overlayHide();
                    }else{
                        IndexOverlayFactory.overlayHide();
                    }
                
                });
            }else{
                $scope.Subcommittee.subcommittee_person.splice(index, 1);
            }
        });
    }

    $scope.cancelUpdate = function(){
        window.location.href = '#/stakeholder/2';
    }

    $scope.setSubcommittee = function(){
        $scope.Subcommittee = {'subcommitteeID':''
                                , 'subcommitteeName':''
                                , 'subcommittee_person':[]
                            };
    }

    $scope.loadMeetings = function(standardID){
        var params = {
                    'standardID':standardID
                    , 'menuType':'subcommittee'
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

    $scope.uploadMOMFile = function(MOMFile, meetingID){
        var params = {
                    'MOMFile':MOMFile
                    ,'standardID':$scope.ID
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
            if($scope.Meeting.emailSentDate != null){
                $scope.Meeting.emailSentDate = makeDateTime($scope.Meeting.emailSentDate);
                $scope.emailSentHour = $scope.Meeting.emailSentDate.getHours();
                $scope.emailSentMin = $scope.Meeting.emailSentDate.getMinutes();
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

    $scope.addMeetingFiles = function(){
        $scope.MeetingFileList.push({'attachFile':null});
    }

    $scope.addInviteFiles = function(){
        $scope.InviteFileList.push({'attachFile':null});
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
                            ,'menuType':'subcommittee'
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

    $scope.alerts = [];
    $scope.addAlert = function(msg, type) {
      $scope.alerts.push({
        msg: msg,
        type: type
      });
    };

    $scope.MinuteList = getMinuteList();
    $scope.HourList = getHourList();
    $scope.MeetingFileList = [];
    $scope.InviteFileList = [];
    $scope.meetingType = '';
    $scope.meetingID = '';
    $scope.SubcommitteePerson = {'subcommitteePersonID':'' , 'subcommitteeID':'', 'stakeholderID':'', 'positionName':''};
    $scope.SubcommitteePersonList = [];
    $scope.keyword = '';
    IndexOverlayFactory.overlayHide();

    if($scope.ID !== undefined){
        $scope.loadSubcommittee('subcommittee/get', $scope.ID);
        $scope.loadMeetings($scope.ID);
    }else{
        $scope.setSubcommittee();
    }
    
});