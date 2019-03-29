angular.module('app').controller('QuestionNormalUpdateController', function($scope, $compile, $cookies, $filter, $state, $uibModal, $routeParams, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! questionnaire update page');
    $scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'questionnaire';
    $scope.ID = $routeParams.id;

    $scope.loadSubcommitteeList = function(){
        HTTPService.clientRequest('subcommittee/list/active', null).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.SubcommitteeList = result.data.DATA.Subcommittee;
                
                IndexOverlayFactory.overlayHide();
                
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadCommodityStandard = function(){
        HTTPService.clientRequest('commodity-standard/list/pending', null).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.CommodityStandardList = result.data.DATA.List;
                
                IndexOverlayFactory.overlayHide();
                
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.loadQuestionnaire = function(action, id){
        var params = {'id': id};
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.Questionnaire = result.data.DATA.Questionnaire;
                if($scope.Questionnaire.openDate != null){
                    $scope.Questionnaire.openDate = makeDate($scope.Questionnaire.openDate);
                }
                if($scope.Questionnaire.closeDate != null){
                    $scope.Questionnaire.closeDate = makeDate($scope.Questionnaire.closeDate);
                }
                IndexOverlayFactory.overlayHide();
                
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.saveQuestionnaire = function(data){
        console.log(data);
        data.closeDate = makeSQLDate(data.closeDate);
        data.openDate = makeSQLDate(data.openDate);
        var params = {'Questionnaire' : data, 'AttachFile':$scope.AttachFile};
        IndexOverlayFactory.overlayShow();
        HTTPService.uploadRequest('questionnaire/update', params).then(function(result){  
            // console.log(result.data);
            // $scope.loadQuestionnaires($scope.Commodity_Standards.standardID);
            if(result.data.STATUS == 'OK'){
                // $scope.addAlert('บันทึกสำเร็จ','success');
                // if($scope.ID === undefined){
                //     window.location.href = '#/questionnaire/update/normal/' + result.data.DATA.questionnaireID;
                // }else{
                //     $scope.ID = result.data.DATA.questionnaireID;
                //     $scope.loadQuestionnaire('questionnaire/get', $scope.ID);
                //     IndexOverlayFactory.overlayHide();    
                // }
                window.location.href = '#/question/0';
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.sendMail = function(){
        var params = {'Questionnaire' : $scope.Questionnaire};
        IndexOverlayFactory.overlayShow();
        HTTPService.uploadRequest('questionnaire/sendmail', params).then(function(result){  
            // console.log(result.data);
            // $scope.loadQuestionnaires($scope.Commodity_Standards.standardID);
            if(result.data.STATUS == 'OK'){
                $scope.addAlert('ส่ง email สำเร็จ','success');
                // if($scope.ID === undefined){
                //     window.location.href = '#/questionnaire/update/online/' + result.data.DATA.questionnaireID;
                // }else{
                //     $scope.ID = result.data.DATA.questionnaireID;
                //     $scope.loadQuestionnaire('questionnaire/get', $scope.ID);
                //     IndexOverlayFactory.overlayHide();    
                // }
                window.location.href = '#/question/0';
            }
            IndexOverlayFactory.overlayHide();
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

    $scope.loadQuestionnairePerson = function(){
        var params = {
                    'masterType':'Branch'
                    };
        HTTPService.clientRequest('questionnaire/person/list', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.BranchList = result.data.DATA;
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.addQuestionnairePerson = function(){
        $scope.loadQuestionnairePerson();
        $scope.QuestionnairePerson = {'questionnairePersonID':'' , 'questionaireID':'', 'stakeholderID':'', 'nameThai':'', 'lastNameThai':''};
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'update_person.html',
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
            // $scope.saveQuestionnairePerson($scope.QuestionnairePerson);
        });
    }

    $scope.saveQuestionnairePerson = function(Branch){
        var params = {'masterType' : 'Branch', 'data' : Branch};
        HTTPService.clientRequest('questionnaire/person/update', params).then(function(result){
            console.log(result);
            if(result.data.STATUS == 'OK'){
                $scope.addAlert('บันทึกสำเร็จ','success');
                $scope.loadQuestionnairePerson();
                IndexOverlayFactory.overlayHide();
            }else{
                IndexOverlayFactory.overlayHide();
            }
        });
    }

    $scope.removeQuestionnairePerson = function(id, index){
        if(id == ''){
            $scope.Questionnaire.questionnaire_person.splice(index, 1);
            return false;
        }
        $scope.alertMessage = 'ข้อมูลนี้จะถูกลบจากฐานข้อมูลโดยทันที ต้องการลบบุคคลนี้ ใช่หรือไม่ ?';
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
            var params = {'id' : id};
            HTTPService.clientRequest('questionnaire/person/delete', params).then(function(result){
                // console.log(result);
                if(result.data.STATUS == 'OK'){
                    $scope.loadQuestionnairePerson();
                    IndexOverlayFactory.overlayHide();
                }else{
                    IndexOverlayFactory.overlayHide();
                }
            });
        });
    }

    $autocompleteUserResult = [];
    $scope.searchSubcommitteeAutoComplete = function (val, qtype){
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

    $scope.autocompleteSubcommitteeSelected = function ($item, $model, $label){

        $scope.Questionnaire.subcommitteeID = $item.subcommitteeID;
        console.log($scope.Questionnaire.subcommitteeID);

    }

    $scope.autocompleteStandardSelected = function ($item, $model, $label){

        $scope.Questionnaire.standardID = $item.standardID;
        console.log($scope.Questionnaire.standardID);

    }

    $scope.autocompleteStakeholderSelected = function ($item, $model, $label){

        // check person if exist
        var loop = $scope.Questionnaire.questionnaire_person.length;
        for(var i = 0; i < loop; i++){
            if($item.stakeholderID == $scope.Questionnaire.questionnaire_person[i].stakeholderID){
                alert('มีรายชื่อบุคคลนี้อยู่แล้ว');
                return false;
            }
        }

        var person = {'questionnairePersonID':'' 
                    , 'questionaireID':$scope.ID
                    , 'stakeholderID':$item.stakeholderID
                    , 'nameThai':$item.nameThai
                    , 'lastNameThai':$item.lastNameThai}; 
    
        $scope.Questionnaire.questionnaire_person.push(person);
        $scope.keyword = '';

    }

    $scope.addQuestion = function(){
        $scope.Questionnaire.question.push({'questionID':''
                                            , 'questionaireID':$scope.ID
                                            , 'question':''
                                            ,'createBy':$scope.currentUser.adminID
                                            ,'createDate':''
                                            ,'updateBy':$scope.currentUser.adminID
                                            ,'updateDate':''
                                        });
    }

    $scope.removeQuestion = function(id , index){
        $scope.alertMessage = 'คำถามนี้จะถูกลบจากฐานข้อมูลทันที ต้องการลบคำถามนี้ ใช่หรือไม่ ?';
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
            var params = {'id' : id};
            HTTPService.clientRequest('questionnaire/question/delete', params).then(function(result){
                console.log(result);
                if(result.data.STATUS == 'OK'){
                    // $scope.loadQuestionnaire('questionnaire/list');
                    $scope.Questionnaire.question.splice(index, 1);
                    IndexOverlayFactory.overlayHide();
                }else{
                    IndexOverlayFactory.overlayHide();
                }
            
            });
        });
    }

    $scope.cancelUpdate = function(){
        window.location.href = '#/question';
    }

    $scope.setQuestionnaire = function(){
        $scope.Questionnaire = {'questionnaireID':''
                                ,'standardID':''
                                ,'questionName':''
                                ,'fileName':''
                                ,'filePath':''
                                ,'questionnaireType':'normal'
                                ,'questionnaireSubType':''
                                ,'subcommitteeID':''
                                ,'subcommitteeName':''
                                ,'openDate':null
                                ,'closeDate':null
                                ,'createBy':$scope.currentUser.adminID
                                ,'createDate':''
                                ,'updateBy':$scope.currentUser.adminID
                                ,'updateDate':''
                                ,'questionnaire_person':[]
                                ,'question':[]
                            };
    }

    $scope.getDateString = function(d){
        return convertShortDate(d);
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
        $scope.dateOptions2.minDate = $scope.Questionnaire.openDate==null?new Date():$scope.Questionnaire.openDate;
        $scope.popup2.opened = true;
    };

    $scope.alerts = [];
    $scope.addAlert = function(msg, type) {
      $scope.alerts.push({
        msg: msg,
        type: type
      });
    };

    $scope.Branch = {'branchID':'' , 'branchNameThai':'', 'branchNameEng':''};

    IndexOverlayFactory.overlayHide();

    $scope.loadSubcommitteeList();
    $scope.loadCommodityStandard();
    if($scope.ID !== undefined){
        $scope.loadQuestionnaire('questionnaire/get', $scope.ID);
    }else{
        $scope.setQuestionnaire();
    }
    // $scope.loadMasterfile('Branch');

});