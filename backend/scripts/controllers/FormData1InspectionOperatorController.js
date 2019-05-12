angular.module('e-homework').controller('FormData1InspectionOperatorController', function($scope, $compile, $cookies, $filter, $state, $routeParams, $uibModal, HTTPService, IndexOverlayFactory) {
    IndexOverlayFactory.overlayShow();
    
    var $user_session = sessionStorage.getItem('user_session');
    
    if($user_session != null){
        $scope.$parent.currentUser = angular.fromJson($user_session);
    }else{
       window.location.replace('#/guest/logon');
    }
    console.log('Hello ! AttachFile Multi page');
    $scope.DEFAULT_LANGUAGE = 'TH';
    $scope.$parent.menu_selected = 'authority';

    $scope.page_type = 'inspection-operator';//$routeParams.page_type;

     $scope.MenuPermission =  angular.fromJson(sessionStorage.getItem('MenuPermission'));
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
            $scope.Menu = $filter('MenuPermission')($scope.MenuPermission, $scope.Menu);     
            // $scope.load('menu/page/get', $scope.ID);
            
        });
    }

    $scope.loadMenu('menu/list');

    $scope.getMenu = function(action, menu_type){
        var params = {'menu_type' : menu_type};
        console.log(menu_type);
        HTTPService.clientRequest(action, params).then(function(result){
            console.log(result);
            $scope.MenuName = result.data.DATA.Menu;
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadIso = function(){
        HTTPService.clientRequest('form-data1/list/iso', null).then(function(result){
            if(result.data.STATUS == 'OK'){
                $scope.Iso1List = result.data.DATA.List1;
                $scope.Iso2List = result.data.DATA.List2;
                $scope.Iso3List = result.data.DATA.List3;
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadIsoAll = function(){
        var params = {'type' : 'all'};
        HTTPService.clientRequest('form-data1/list/iso', params).then(function(result){
            if(result.data.STATUS == 'OK'){
                $scope.IsoList = result.data.DATA.List;
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.loadList = function(condition){
        var con = angular.copy(condition);
        IndexOverlayFactory.overlayShow();
        if(con.start_date != null && con.start_date != ''){
            con.start_date = makeSQLDate(con.start_date);
        }
        if(con.end_date != null && con.end_date != ''){
            con.end_date = makeSQLDate(con.end_date);
        }

        var params = {'condition' : con, 'menu_type' : $scope.page_type};
        HTTPService.clientRequest('form-data1/list', params).then(function(result){
            if(result.data.STATUS == 'OK'){
                $scope.DataList = result.data.DATA.List;
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.saveIso = function(ISO){
        var params = {'ISO' : ISO};
        HTTPService.clientRequest('form-data1/update/iso', params).then(function(result){
            if(result.data.STATUS == 'OK'){
                alert('บันทึกสำเร็จ');
                $scope.PAGE = 'MAIN';
                $scope.loadList($scope.condition);

            }
            IndexOverlayFactory.overlayHide();
        });
    }   

    $scope.removeData = function(id){
        $scope.alertMessage = 'ต้องการลบข้อมูลนี้ ใช่หรือไม่ ?';
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
            HTTPService.clientRequest('form-data1/delete', params).then(function(result){
                // $scope.load('Datas');
                $scope.loadList($scope.condition);
                IndexOverlayFactory.overlayHide();
            });
        });
        
    }

    $scope.addIso = function(){
        $scope.ISO = {'id' : '', 'iso_type' : null, 'iso_name' : ''};
        $scope.PAGE = 'ISO';
    }

    
    $scope.saveData = function(FormData1, form_data1_license, form_data1_scope){
        for(var i = 0; i < form_data1_license.length; i++){
            if(form_data1_license[i].start_date != undefined && form_data1_license[i].start_date != null && form_data1_license[i].start_date != ''){
                form_data1_license[i].start_date = concatDateSQL(form_data1_license[i].start_date);
            }
            if(form_data1_license[i].end_date != undefined && form_data1_license[i].end_date != null && form_data1_license[i].end_date != ''){
                form_data1_license[i].end_date = concatDateSQL(form_data1_license[i].end_date);
            }
            
            
        }

        var params = {'FormData1' : FormData1, 'form_data1_license' : form_data1_license, 'form_data1_scope' : form_data1_scope};
        HTTPService.uploadRequest('form-data1/operator/update', params).then(function(result){
            if(result.data.STATUS == 'OK'){
                alert('บันทึกสำเร็จ');
                $scope.PAGE = 'MAIN';
                $scope.loadList($scope.condition, $scope.operator_type);
            }
            IndexOverlayFactory.overlayHide();
        });
    } 

    $scope.updateData = function(id){
        if(id != ''){
            var params = {'id' : id};
            HTTPService.clientRequest('form-data1/operator/get', params).then(function(result){
                if(result.data.STATUS == 'OK'){
                    $scope.FormData1 = result.data.DATA;
                    $scope.form_data1_license = $scope.FormData1.form_data1_license;
                    $scope.form_data1_scope = $scope.FormData1.form_data1_scope;
                    for(var i = 0; i < $scope.form_data1_license.length; i++){
                        $scope.form_data1_license[i].start_date = makeDate($scope.form_data1_license[i].start_date);
                        $scope.form_data1_license[i].end_date = makeDate($scope.form_data1_license[i].end_date);
                        console.log($scope.form_data1_license[i].start_date);
                    }

                }
                IndexOverlayFactory.overlayHide();
            });
        }else{
            $scope.FormData1 = {
                'menu_type' : $scope.page_type
                ,'actives' : 'Y'
            };

            $scope.form_data1_license = [{'form_data1_standard_checked' : [{
                                                        'form_data1_product_inspect':[{}]
                                                        }
                                                ]
                                           }
                
            ];

            $scope.form_data1_scope = [{'form_data1_sub_scope':[{'iso':null}]}];
            
            console.log($scope.form_data1_license);
        }
        $scope.loadIso();
        $scope.PAGE = 'UPDATE';
    }

    $scope.addDetail = function(){
        $scope.form_data1_license.unshift({'form_data1_standard_checked' : [{
                                                        'form_data1_product_inspect':[{}]
                                                        }] 
                                    });
    }

    $scope.addScope = function(index){
        $scope.form_data1_scope.push({
                                    'form_data1_sub_scope':[{}]
                                });
    }

    $scope.addSubScope = function(index){
        $scope.form_data1_scope[index].form_data1_sub_scope.push({
                                    'iso':null
                                });
    }

    $scope.addStandardChecked = function(detail_index){
        $scope.form_data1_license[detail_index].form_data1_standard_checked.push({'form_data1_product_inspect':[{}]});
    }

    $scope.addProductInspect = function(detail_index, scope_index){
        $scope.form_data1_license[detail_index].form_data1_standard_checked[scope_index].form_data1_product_inspect.push({});
    }

    $scope.DatePoupObj = [];
    
    $scope.openStartDateObj = function(index) {
        $scope.form_data1_license[index].open_start_date = true;
    };

    $scope.openEndDateObj = function(index) {
        $scope.form_data1_license[index].open_end_date = true;
    };

    $scope.cancel = function(){
        $scope.PAGE = 'MAIN';
    }

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
        $scope.popup2.opened = true;
    };

    $scope.condition = {'keyword':'', 'iso':null};
    $scope.UsageStatusList = [];
    $scope.PAGE = 'MAIN';

    $scope.getMenu('menu/get/type' ,$scope.page_type);
    $scope.loadList($scope.condition);
    $scope.loadIsoAll();

});