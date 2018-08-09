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

        public function getList($request, $response, $args){
            try{
            	$params = $request->getParsedBody();
            	
                $_CommodityStandard = CommodityStandardService::getCommodityStandardList();

                $this->data_result['DATA']['CommodityStandard'] = $_CommodityStandard;

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