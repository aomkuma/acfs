<?php

    namespace App\Controller;
    
    use App\Service\CommodityStandardService;
    use App\Service\AttachFileService;

    class CommodityStandardController extends Controller {
        
        protected $logger;
        protected $db;
        
        public function __construct($logger, $db){
            $this->logger = $logger;
            $this->db = $db;
        }

        public function getListForHomepage($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $userType = filter_var($params['obj']['userType'], FILTER_SANITIZE_STRING);
                $userID = filter_var($params['obj']['userID'], FILTER_SANITIZE_NUMBER_INT);
                $currentPage = filter_var($params['obj']['currentPage'], FILTER_SANITIZE_NUMBER_INT);
                $limitRowPerPage = filter_var($params['obj']['limitRowPerPage'], FILTER_SANITIZE_NUMBER_INT);
                $standardIDToIgnore = $params['obj']['standardIDToIgnore'];

                $stepList = [1,2,3,4,5,6,7,8];
                $CommodityStandard = [];
                $Total = 0;
                if($userType == 'admin'){

                    // Check data compare create date with current date
                    /*
                    $_Result = CommodityStandardService::getCommodityStandardListWithCheckDate($currentPage, $limitRowPerPage);
                    $_CommodityStandard = $_Result['DataList'];
                    $_Total = $_Result['Total'];
                    
                    foreach ($_CommodityStandard as $key => $value) {
                        $standardIDToIgnore[] = $value['standardID'];
                        $value['step'] = 11;
                        array_push($CommodityStandard, $value);
                    }
                    $Total += $_Total;
                    */
                    $limitRow = $limitRowPerPage;
                    $_Result = CommodityStandardService::getCommodityStandardList($currentPage, $limitRow, $standardIDToIgnore, $stepList);
                    $_CommodityStandard = $_Result['DataList'];
                    $_Total = $_Result['Total'];

                    foreach ($_CommodityStandard as $key => $value) {
                        array_push($CommodityStandard, $value);
                    }
                    $Total += $_Total;

                }else{
                    /*
                    $_Result = CommodityStandardService::getCommodityStandardListWithCheckDateForUser($userID, $currentPage, $limitRowPerPage);
                    $_CommodityStandard = $_Result['DataList'];
                    $_Total = $_Result['Total'];

                    foreach ($_CommodityStandard as $key => $value) {
                        $standardIDToIgnore[] = $value['standardID'];
                        $value['step'] = 11;
                        array_push($CommodityStandard, $value);
                    }
                    $Total += $_Total;
                    */
                    $limitRow = $limitRowPerPage;
                    $_Result = CommodityStandardService::getCommodityStandardListForUser($userID, $currentPage, $limitRow, $standardIDToIgnore, $stepList);
                    $_CommodityStandard = $_Result['DataList'];
                    $_Total = $_Result['Total'];

                    foreach ($_CommodityStandard as $key => $value) {
                        array_push($CommodityStandard, $value);
                    }
                    $Total += $_Total;

                }

                $Total = ceil($Total / $limitRowPerPage);
                $this->data_result['DATA']['CommodityStandard'] = $CommodityStandard;
                $this->data_result['DATA']['Total'] = $Total;
                $this->data_result['DATA']['standardIDToIgnore'] = $standardIDToIgnore;
                
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getList($request, $response, $args){
            try{
            	$params = $request->getParsedBody();
            	$userType = filter_var($params['obj']['userType'], FILTER_SANITIZE_STRING);
                $userID = filter_var($params['obj']['userID'], FILTER_SANITIZE_NUMBER_INT);
                $currentPage = filter_var($params['obj']['currentPage'], FILTER_SANITIZE_NUMBER_INT);
                $limitRowPerPage = filter_var($params['obj']['limitRowPerPage'], FILTER_SANITIZE_NUMBER_INT);
                $viewType = filter_var($params['obj']['viewType'], FILTER_SANITIZE_STRING);
                if($viewType == 'pending'){
                    $stepList = [1,2,3,4,5,6,7,8];
                }else if($viewType == 'inuse'){
                    $stepList = [9];
                }else if($viewType == 'cancelled'){
                    $stepList = [11];
                }
                $CommodityStandard = [];
                $Total = 0;

                /*
                // Check data compare create date with current date
                $_Result = CommodityStandardService::getCommodityStandardListWithCheckDate($currentPage, $limitRowPerPage);
                $_CommodityStandard = $_Result['DataList'];
                // print_r($_Result);exit;
                $_Total = $_Result['Total'];
                // $standardIDToIgnore = [];
                foreach ($_CommodityStandard as $key => $value) {
                    $standardIDToIgnore[] = $value['standardID'];
                    $value['step'] = 11;
                    array_push($CommodityStandard, $value);
                }
                $Total += $_Total;
                */
                $limitRow = $limitRowPerPage - $Total;
                $_Result = CommodityStandardService::getCommodityStandardList($currentPage, $limitRow, $standardIDToIgnore, $stepList);
                $_CommodityStandard = $_Result['DataList'];
                $_Total = $_Result['Total'];
                foreach ($_CommodityStandard as $key => $value) {
                    array_push($CommodityStandard, $value);
                }
                $Total += $_Total;

                $Total = ceil($Total / $limitRowPerPage);
                $this->data_result['DATA']['CommodityStandard'] = $CommodityStandard;
                $this->data_result['DATA']['Total'] = $Total;
                $this->data_result['DATA']['standardIDToIgnore'] = $standardIDToIgnore;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getData($request, $response, $args){
            try{
            	$params = $request->getParsedBody();
            	$id = $params['obj']['id'];
                $_CommodityStandard = CommodityStandardService::getCommodityStandard($id);
                $_Commodity_Keywords_TH = CommodityStandardService::getCommodityKeywords($id, 'TH');
                $_Commodity_Keywords_EN = CommodityStandardService::getCommodityKeywords($id, 'EN');

                $this->data_result['DATA']['CommodityStandard'] = $_CommodityStandard;
                $this->data_result['DATA']['Commodity_Keywords_TH'] = $_Commodity_Keywords_TH;
                $this->data_result['DATA']['Commodity_Keywords_EN'] = $_Commodity_Keywords_EN;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function updateData($request, $response, $args){
            
            $_WEB_FILE_PATH = 'files/files';

            try{
                // error_reporting(E_ERROR);
                // error_reporting(E_ALL);
                // ini_set('display_errors','On');
                $params = $request->getParsedBody();

                // print_r($params);exit;
                $_CommodityStandard = $params['obj']['Commodity_Standards']; 
                $_Commodity_Keywords_TH = $params['obj']['Commodity_Keywords_TH']; 
                $_Commodity_Keywords_EN = $params['obj']['Commodity_Keywords_EN']; 

                $files = $request->getUploadedFiles();
                $f = $files['obj']['AttachFile'];
                // print_r($f);
                // exit;
                if($f != null){
                    if($f->getClientFilename() != ''){
                        // Unset old image if exist
                        
                        $ext = pathinfo($f->getClientFilename(), PATHINFO_EXTENSION);
                        $FileName = date('YmdHis').'_'.rand(100000,999999). '.'.$ext;
                        $FilePath = $_WEB_FILE_PATH . '/commodity-standard/'.$FileName;
                        
                        $_CommodityStandard['standardFileName'] = $f->getClientFilename();
                        $_CommodityStandard['standardFilePath'] = $FilePath;
                        
                        $f->moveTo('../../' . $FilePath);
                    }        
                }

                $id = CommodityStandardService::updateCommodityStandard($_CommodityStandard);
                foreach($_Commodity_Keywords_TH as $k => $v){
                	$v['standardID'] = $id;
                	unset($v['$hashKey']);
                	CommodityStandardService::updateCommodityKeyword($v);
                }
                foreach($_Commodity_Keywords_EN as $k => $v){
                	$v['standardID'] = $id;
                	unset($v['$hashKey']);
                	CommodityStandardService::updateCommodityKeyword($v);
                }

                $this->data_result['DATA']['standardID'] = $id;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }
    }