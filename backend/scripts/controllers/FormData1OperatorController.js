angular.module('e-homework').controller('FormData1OperatorController', function($scope, $compile, $cookies, $filter, $state, $routeParams, HTTPService, IndexOverlayFactory) {
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

    $scope.page_type = 'operator-list';

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

    $scope.loadList = function(condition, operator_type){
        $scope.operator_type = operator_type;
        IndexOverlayFactory.overlayShow();
        var params = {'condition' : condition, 'menu_type' : $scope.page_type, 'operator_type' : operator_type};
        HTTPService.clientRequest('form-data1/operator/list', params).then(function(result){
            if(result.data.STATUS == 'OK'){
                $scope.DataList = result.data.DATA.List;
            }
            IndexOverlayFactory.overlayHide();
        });
    }

    $scope.saveData = function(FormData1, FormData1License, FormData1Scope){
        var params = {'FormData1' : FormData1, 'FormData1License' : FormData1License, 'FormData1Scope' : FormData1Scope};
        HTTPService.uploadRequest('form-data1/operator/update', params).then(function(result){
            if(result.data.STATUS == 'OK'){
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
                    $scope.FormData1License = $scope.FormData1.form_data1_license;

                }
                IndexOverlayFactory.overlayHide();
            });
        }else{
            $scope.FormData1 = {
                'menu_type' : $scope.page_type
                ,'actives' : 'Y'
            };

            $scope.FormData1License = [{'FormData1StandardChecked' : [{
                                                        'FormData1ProductInspect':[{}]
                                                        }
                                                ]
                                           }
                
            ];

            $scope.FormData1Scope = [{'FormData1SubScope':[{'iso':null}]}];
            
            console.log($scope.FormData1License);
        }
        $scope.loadIso();
        $scope.PAGE = 'UPDATE';
    }

    $scope.addDetail = function(){
        $scope.FormData1License.push({'FormData1StandardChecked' : [{
                                                        'FormData1ProductInspect':[{}]
                                                        }] 
                                    });
    }

    $scope.addScope = function(index){
        $scope.FormData1Scope.push({
                                    'FormData1SubScope':[{}]
                                });
    }

    $scope.addSubScope = function(index){
        $scope.FormData1Scope[index].FormData1SubScope.push({
                                    'iso':null
                                });
    }

    $scope.addStandardChecked = function(detail_index){
        $scope.FormData1License[detail_index].FormData1StandardChecked.push({'FormData1ProductInspect':[{}]});
    }

    $scope.addProductInspect = function(detail_index, scope_index){
        $scope.FormData1License[detail_index].FormData1StandardChecked[scope_index].FormData1ProductInspect.push({});
    }

    $scope.DatePoupObj = [];
    
    $scope.openStartDateObj = function(index) {
        $scope.FormData1License[index].open_start_date = true;
    };

    $scope.openEndDateObj = function(index) {
        $scope.FormData1License[index].open_end_date = true;
    };

    $scope.cancel = function(){
        $scope.PAGE = 'MAIN';
    }

    $scope.condition = {'keyword':''};
    $scope.PAGE = 'MAIN';

    $scope.getMenu('menu/get/type' ,$scope.page_type);
    $scope.loadList($scope.condition, 'private');
    

});