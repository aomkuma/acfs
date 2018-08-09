<?php

    namespace App\Controller;
    
    use App\Service\UserAccountService;

    class UserAccountController extends Controller {
        
        protected $logger;
        protected $db;
        
        public function __construct($logger, $db){
            $this->logger = $logger;
            $this->db = $db;
        }

        public function getAdminList($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                //$stakeholderID = $params['obj']['stakeholderID'];

                $_List = UserAccountService::getAdminList();

                $this->data_result['DATA']['Admin'] = $_List;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getUserList($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                //$stakeholderID = $params['obj']['stakeholderID'];

                $_List = UserAccountService::getUserList();

                $this->data_result['DATA']['User'] = $_List;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getAdminData($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $adminID = $params['obj']['id'];
                $_Data = UserAccountService::getAdminData($adminID);

                $this->data_result['DATA']['Admin'] = $_Data;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getUserData($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $userID = $params['obj']['id'];
                $_Data = UserAccountService::getUserData($userID);

                $this->data_result['DATA']['User'] = $_Data;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function updateAdminData($request, $response, $args){
            
            try{
                // error_reporting(E_ERROR);
                // error_reporting(E_ALL);
                // ini_set('display_errors','On');
                $params = $request->getParsedBody();
                $_Admin = $params['obj']['Admin'];
                $user_session = $params['user_session'];
                
                $adminID = UserAccountService::updateAdminData($_Admin);

                $this->data_result['DATA']['adminID'] = $adminID;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function updateUserData($request, $response, $args){
            
            try{
                // error_reporting(E_ERROR);
                // error_reporting(E_ALL);
                // ini_set('display_errors','On');
                $params = $request->getParsedBody();
                $_User = $params['obj']['User'];
                $user_session = $params['user_session'];
                
                // Prepare data to update
                $update_data['userID'] = $_User['userID'];
                $update_data['stakeholderID'] = $_User['stakeholderID'];
                $update_data['email'] = $_User['email'];
                $update_data['password'] = $_User['password'];
                $update_data['createBy'] = $_User['createBy'];
                $update_data['createDate'] = $_User['createDate'];
                $update_data['updateBy'] = $user_session['adminID'];
                $update_data['updateDate'] = $_User['updateDate'];

                $userID = UserAccountService::updateUserData($update_data);

                $this->data_result['DATA']['userID'] = $userID;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteAdminData($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $_adminID = $params['obj']['id'];
                UserAccountService::removeAdminData($_adminID);
                
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteUserData($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $_userID = $params['obj']['id'];
                UserAccountService::removeUserData($_userID);
                
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }
    
    }