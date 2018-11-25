<?php

    namespace App\Controller;
    
    use App\Service\PalaceService;

    class PalaceController extends Controller {
        
        protected $logger;
        protected $db;
        
        public function __construct($logger, $db){
            $this->logger = $logger;
            $this->db = $db;
        }

        public function getList($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                //$emailID = $params['obj']['emailID'];
                $palace_type = $params['obj']['palace_type'];

                $_List = PalaceService::getList($palace_type);

                $this->data_result['DATA']['Palace'] = $_List;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getData($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $emailID = $params['obj']['id'];
                $_Data = PalaceService::getData($emailID);
                $_PalaceCommodityData = PalaceService::getPalaceCommodityData($emailID);
                $this->data_result['DATA']['Palace'] = $_Data;
                $this->data_result['DATA']['PalaceCommodity'] = $_PalaceCommodityData;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function updateData($request, $response, $args){
            $_WEB_IMAGE_PATH = 'files/img';
            $_WEB_FILE_PATH = 'files/files';
            try{
                // error_reporting(E_ERROR);
                // error_reporting(E_ALL);
                // ini_set('display_errors','On');
                $params = $request->getParsedBody();
                $_Palace = $params['obj']['Palace'];
                $user_session = $params['user_session'];

                // Update Attach files
                $files = $request->getUploadedFiles();
                $f = $files['obj']['AttachFile'];
                // print_r($f);
                // exit;
                if($f != null){
                    if($f->getClientFilename() != ''){
                        // Unset old image if exist
                        $delete_file_path = '../../' . $_WEB_IMAGE_PATH . $_Palace['picture_path'];
                        unset($delete_file_path);

                        $ext = pathinfo($f->getClientFilename(), PATHINFO_EXTENSION);
                        $FileName = date('YmdHis').'_'.rand(100000,999999). '.'.$ext;
                        $FilePath = $_WEB_IMAGE_PATH . '/palace/'.$FileName;
                        
                        $_Palace['picture_name'] = $f->getClientFilename();
                        $_Palace['picture_path'] = $FilePath;
                        
                        $f->moveTo('../../' . $FilePath);
                    }        
                }
                
                $_Palace['position_end_date'] = ($_Palace['position_end_date']=='null' || $_Palace['position_end_date']==''?NULL:$_Palace['position_end_date']);

                $id = PalaceService::updateData($_Palace);


                
                $this->data_result['DATA']['id'] = $id;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteData($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $_emailID = $params['obj']['id'];
                PalaceService::removeData($_emailID);
                
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deletePalaceCommodityData($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $_emailCommodityID = $params['obj']['id'];
                $result = PalaceService::removePalaceCommodityData($_emailCommodityID);
                $this->data_result['DATA']['result'] = $result;
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }
    
    }