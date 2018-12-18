<?php

    namespace App\Controller;
    
    use App\Service\HearingReportService;
    
    class HearingReportController extends Controller {
        
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
                $condition = $params['obj']['condition'];
                
                if(!empty($condition['months']) && !empty($condition['years'])){
                    $date_from = $condition['years'] . '-' . str_pad($condition['months'], 2, '0', STR_PAD_LEFT) . '-01'; 
                    $maxDay = date('t', strtotime($date_from));
                    $date_to = $condition['years'] . '-' . str_pad($condition['months'], 2, '0', STR_PAD_LEFT) . '-' . $maxDay; 
                    $create_date = [$date_from, $date_to];
                }
                
                $_List = HearingReportService::getList($create_date);

                $this->data_result['DATA']['List'] = $_List;

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
                
                $_Chanel = $params['obj']['Chanel'];
                $_DataType = $params['obj']['DataType'];
                
                $id = HearingReportService::updateData($_Data);

                // Add HearingReport Callback
                foreach ($_Chanel as $value) {
                    $data['hearing_report_id'] = $id;
                    $data['detail_desc'] = $value;
                    $data['hearing_report_type'] = 'Chanel';
                    HearingReportService::addHearingReportDetail($data);
                }

                // Add HearingReport List
                foreach ($_DataType as $value) {
                    $data['hearing_report_id'] = $id;
                    $data['detail_desc'] = $value;
                    $data['hearing_report_type'] = 'DataType';
                    HearingReportService::addHearingReportDetail($data);
                }

                $this->data_result['DATA']['id'] = $id;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

    }
