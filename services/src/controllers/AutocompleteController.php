<?php

    namespace App\Controller;
    
    use App\Service\AutocompleteService;
    
    class AutocompleteController extends Controller {
        
        protected $logger;
        protected $db;
        
        public function __construct($logger, $db){
            $this->logger = $logger;
            $this->db = $db;
        }
       
        public function getAutocomplete($request, $response, $args){
            try{
                $loginObj = $request->getParsedBody();
                $qtype = $loginObj['obj']['qtype'];
                $keyword = $loginObj['obj']['keyword'];
                $qtype = filter_var($qtype, FILTER_SANITIZE_STRING);
                $keyword = filter_var($keyword, FILTER_SANITIZE_STRING);
                $this->logger->info('Find by $qtype : '.$qtype.', $keyword : '.$keyword);
                
                switch($qtype){
                    case 'STAKEHOLDERNAMETHAI' : $this->data_result['DATA'] = AutocompleteService::getStakeholderNameThai($keyword); break;
                    case 'STAKEHOLDERNAMEENG' : $this->data_result['DATA'] = AutocompleteService::getStakeholderNameEng($keyword); break;
                    case 'STANDARD' : $this->data_result['DATA'] = AutocompleteService::getCommodityStandard($keyword); break;
                    default : null;
                }
                
                return $this->returnResponse(200, $this->data_result, $response, false);
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $e, $response);
            }
            
        }
        
    }

?>