<?php

    namespace App\Controller;
    
    use App\Service\AcademicBoardService;
    
    class AcademicBoardController extends Controller {
        
        protected $logger;
        protected $db;
        
        public function __construct($logger, $db){
            $this->logger = $logger;
            $this->db = $db;
        }

        public function getList($request, $response, $args){
            try{
            	$params = $request->getParsedBody();
            	$standardID = $params['obj']['standardID'];
                $_AcademicBoard = AcademicBoardService::getAcademicBoardList($standardID);
                
                $_AcademicBoard_List = [];
                foreach($_AcademicBoard as $k =>$v){
                    $Substitute_List = AcademicBoardService::getSubtituteList($v['academicBoardID']);
                    $v['Substitute_List'] = $Substitute_List;
                    array_push($_AcademicBoard_List, $v);
                }

                $this->data_result['DATA']['AcademicBoard'] = $_AcademicBoard_List;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getData($request, $response, $args){
            try{
            	$params = $request->getParsedBody();
            	$id = $params['obj']['id'];
                $_AcademicBoard = AcademicBoardService::getAcademicBoard($id);
                $_Commodity_Keywords_TH = AcademicBoardService::getCommodityKeywords($id, 'TH');
                $_Commodity_Keywords_EN = AcademicBoardService::getCommodityKeywords($id, 'EN');

                $this->data_result['DATA']['AcademicBoard'] = $_AcademicBoard;
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

                //print_r($params);exit;
                $_Stakeholders = $params['obj']['Stakeholders']; 
                $standardID = $params['obj']['standardID'];
                $user_session = $params['user_session'];
                $AcademicBoard['academicBoardID'] = $_Stakeholders['academicBoardID'];
                $AcademicBoard['stakeholderID'] = $_Stakeholders['stakeholderID'];
                $AcademicBoard['standardID'] = $standardID;
                $AcademicBoard['createBy'] = $user_session['adminID'];
                $AcademicBoard['updateBy'] = $user_session['adminID'];

                
                $id = AcademicBoardService::updateAcademicBoard($AcademicBoard);

                foreach($_Stakeholders['Substitute_List'] as $k => $v){
                    $Substitute['substituteID'] = $v['substituteID'];
                	$Substitute['academicBoardID'] = $id;
                    $Substitute['stakeholderID'] = $v['stakeholderID'];
                    $Substitute['standardID'] = $standardID;
                	unset($v['$hashKey']);
                	AcademicBoardService::updateSubstituteAcademicBoard($Substitute);
                }
                
                $this->data_result['DATA']['academicBoardID'] = $id;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteData($request, $response, $args){
            
            try{
                $params = $request->getParsedBody();
                $academicBoardID = filter_var($params['obj']['academicBoardID'], FILTER_SANITIZE_NUMBER_INT);

                AcademicBoardService::removeAcademicBoard($academicBoardID);
                $this->data_result['DATA']['academicBoardID'] = $id;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }
    }