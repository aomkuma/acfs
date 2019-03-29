<?php

    namespace App\Controller;
    
    use App\Service\ProductCodeService;
    use App\Service\MenuService;
    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

    class ProductCodeController extends Controller {
        
        protected $logger;
        protected $db;
        
        public function __construct($logger, $db){
            $this->logger = $logger;
            $this->db = $db;
        }

        public function getList($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $condition = $params['obj']['condition'];
                $currentPage = filter_var($params['obj']['currentPage'], FILTER_SANITIZE_NUMBER_INT);
                $limitRowPerPage = filter_var($params['obj']['limitRowPerPage'], FILTER_SANITIZE_NUMBER_INT);
                
                $_Result = ProductCodeService::getList($condition, $currentPage, $limitRowPerPage);
                $_List = $_Result['DataList'];
                $TotalRows = $_Result['Total'];
                
                $this->data_result['DATA']['List'] = $_List;
                $this->data_result['DATA']['Total'] = $TotalRows;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function updateData($request, $response, $args){
            
            
            try{
                // error_reporting(E_ERROR);
                // error_reporting(E_ALL);
                // ini_set('display_errors','On');
                $params = $request->getParsedBody();
                $_Data = $params['obj']['Data'];
                foreach ($_Data as $key => $value) {
                    if($value == 'null'){
                        $_Data[$key] = '';
                    }
                }
                
                $id = ProductCodeService::updateData($_Data);

                $this->data_result['DATA']['id'] = $id;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function uploadData($request, $response, $args){
            
            $_WEB_IMAGE_PATH = 'files/img';
            $_WEB_FILE_PATH = 'files/files';
            try{
                // error_reporting(E_ERROR);
                // error_reporting(E_ALL);
                // ini_set('display_errors','On');
                $params = $request->getParsedBody();
                // $_Data = $params['obj']['Data'];
                // $user_session = $params['user_session'];

                // Update Attach files
                $files = $request->getUploadedFiles();
                $f = $files['obj']['AttachFile'];
                // print_r($f);
                // exit;
                if($f != null){
                    if($f->getClientFilename() != ''){
                        // Unset old image if exist
                        
                        $ext = pathinfo($f->getClientFilename(), PATHINFO_EXTENSION);
                        $FileName = date('YmdHis').'_'.rand(100000,999999). '.'.$ext;
                        $FilePath = $_WEB_FILE_PATH . '/product-code/'.$FileName;
                        
                        $f->moveTo('../../' . $FilePath);
                    }        
                }
                // $_BudgetDisbursement['createBy'] = $user_session['adminID'];
                // $id = BudgetDisbursementService::updateData($_BudgetDisbursement);

                // read file 
                $file = '../../' . $FilePath;
                $ItemList = $this->readExcelFile($file);
                // print_r($ItemList);
                // exit;
                // add Items
                foreach ($ItemList as $key => $value) {
                    $id = ProductCodeService::updateData($value);
                }
                
                
                $this->data_result['DATA']['id'] = $id;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        private function readExcelFile($file){

            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
            $sheetData = $spreadsheet->getActiveSheet()->toArray();

            $field_array = ['product_type', 'product_subtype', 'product_th', 'code'];
            $cnt_row = 1;

            $ItemList = [];
            foreach ($sheetData as $key => $value) {
                
                if($cnt_row >= 3){
                
                $cnt_col = 0;
                $cnt_field = 0;
                $Item = [];
                
                foreach ($value as $k => $v) {
                    if($cnt_col >= 0 && $cnt_col <= 4){
                        
                        $Item[ $field_array[$cnt_field] ] = $v;
                        $cnt_field++;
                        
                    }
                    $cnt_col++;
                }
                
                array_push($ItemList, $Item);
                
                }

                $cnt_row++;

            }
            
            return $ItemList;
        }

    }
