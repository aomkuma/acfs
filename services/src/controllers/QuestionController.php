<?php

    namespace App\Controller;
    
    use App\Service\QuestionService;

    class QuestionController extends Controller {
        
        protected $logger;
        protected $db;
        
        public function __construct($logger, $db){
            $this->logger = $logger;
            $this->db = $db;
        }

        public function getListActive($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                
                $_List = QuestionService::getListActive();
                
                $this->data_result['DATA']['Questionnaire'] = $_List;
                
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getList($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $currentPage = filter_var($params['obj']['currentPage'], FILTER_SANITIZE_NUMBER_INT);
                $limitRowPerPage = filter_var($params['obj']['limitRowPerPage'], FILTER_SANITIZE_NUMBER_INT);
                $questionType = $params['obj']['questionType'];

                $_Result = QuestionService::getList($currentPage, $limitRowPerPage, $questionType);

                $_List = $_Result['DataList'];
                $_Total = $_Result['Total'];

                $this->data_result['DATA']['Questionnaire'] = $_List;
                $this->data_result['DATA']['Total'] = $_Total;
                
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getStandardList($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                //$questionID = $params['obj']['questionID'];

                $_List = QuestionService::getStandardList();

                $this->data_result['DATA']['StandardList'] = $_List;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getStandardQuestionList($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                //$questionID = $params['obj']['questionID'];
                $standardID = $params['obj']['standardID'];
                $_List = QuestionService::getStandardQuestionList($standardID);

                $this->data_result['DATA']['QuestionList'] = $_List;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getData($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $questionID = $params['obj']['id'];
                $_Data = QuestionService::getData($questionID);
                // $_QuestionCommodityData = QuestionService::getQuestionCommodityData($questionID);
                $this->data_result['DATA']['Questionnaire'] = $_Data;
                // $this->data_result['DATA']['QuestionCommodity'] = $_QuestionCommodityData;

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
                $_Questionnaire = $params['obj']['Questionnaire'];
                $Questionnaire_Person = $_Questionnaire['questionnaire_person'];
                $QuestionList = $_Questionnaire['question'];

                unset($_Questionnaire['subcommitteeName']);
                unset($_Questionnaire['standardName']);
                unset($_Questionnaire['questionnaire_person']);
                unset($_Questionnaire['question']);

                /*
                $_QuestionCommodity = $params['obj']['QuestionCommodity'];
                $user_session = $params['user_session'];
                
                $questionID = QuestionService::updateData($_Question);
                foreach ($_QuestionCommodity as $key => $value) {
                    if(empty($value['questionCommodityID'])){
                        unset($value['standardNameThai']);
                        $value['questionID'] = $questionID;
                        QuestionService::updateQuestionCommodityData($value);
                    }
                }
                */

                $files = $request->getUploadedFiles();
                $f = $files['obj']['AttachFile'];
                // print_r($f);
                // exit;
                if($f != null){
                    if($f->getClientFilename() != ''){
                        // Unset old image if exist
                        
                        $ext = pathinfo($f->getClientFilename(), PATHINFO_EXTENSION);
                        $FileName = date('YmdHis').'_'.rand(100000,999999). '.'.$ext;
                        $FilePath = $_WEB_FILE_PATH . '/question/'.$FileName;
                        
                        $_Questionnaire['fileName'] = $f->getClientFilename();
                        $_Questionnaire['filePath'] = $FilePath;
                        
                        $f->moveTo('../../' . $FilePath);
                    }        
                }

                $questionnaireID = QuestionService::updateData($_Questionnaire);

                // save questionare person
                
                foreach ($Questionnaire_Person as $key => $value) {
                    if(empty($value['questionnairePersonID'])){
                        $data = [];
                        $data['questionaireID'] = $questionnaireID;
                        $data['stakeholderID'] = $value['stakeholderID'];
                        $questionnairePersonID = QuestionService::updateQuestionnairePerson($data);
                    }
                }

                foreach ($QuestionList as $key => $value) {
                    unset($value['$hashKey']);
                    $value['questionaireID'] = $questionnaireID;
                    $questionID = QuestionService::updateQuestion($value);
                    
                }

                $this->data_result['DATA']['questionnaireID'] = $questionnaireID;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteData($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $_questionID = $params['obj']['id'];
                QuestionService::removeData($_questionID);
                
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getListQuestionnairePerson($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function updateQuestionnairePerson($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteQuestionnairePerson($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $questionnairePersonID = $params['obj']['id'];

                $result = QuestionService::removeQuestionnairePerson($questionnairePersonID);
                $this->data_result['DATA'] = $result;
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteQuestion($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $questionID = $params['obj']['id'];

                $result = QuestionService::removeQuestion($questionID);

                $this->data_result['DATA'] = $result;
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

    
    }