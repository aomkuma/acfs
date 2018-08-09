<?php

    namespace App\Controller;
    
    use App\Service\MeetingService;

    class MeetingController extends Controller {
        
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

                $_List = MeetingService::getList($standardID);

                $this->data_result['DATA']['Meeting'] = $_List;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getData($request, $response, $args){
            try{

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function updateData($request, $response, $args){
            $_WEB_FILE_PATH = 'files/files';
            try{

                $params = $request->getParsedBody();
                $_Meeting = $params['obj']['Meeting'];
                $user_session = $params['user_session'];
                unset($_Meeting['meeting_attendees']);
                unset($_Meeting['mom_file']);
                unset($_Meeting['meeting_file']);
                unset($_Meeting['invite_file']);
                // print_r($_Meeting);
                // exit;
                $meetingID = MeetingService::updateData($_Meeting);

                // Upload meeting files if exists
                $files = $request->getUploadedFiles();
                if($files != null){
                    foreach($files as $key => $val){
                        foreach($val['MeetingFileList'] as $k => $v){
                            // print_r($v);
                            // exit;
                            $f = $v['attachFile'];
                            // print_r($f);
                            if($f != null){
                                if($f->getClientFilename() != ''){
                                    $ext = pathinfo($f->getClientFilename(), PATHINFO_EXTENSION);
                                    $FileName = $meetingID . '_' . date('YmdHis').'_'.rand(100000,999999). '.'.$ext;
                                    $FilePath = $_WEB_FILE_PATH . '/commodity-standard/meeting-files/'.$FileName;

                                    $AttachFile = ['meetingID'=>$meetingID
                                                    ,'standardID'=>$_Meeting['standardID']
                                                    ,'fileName'=>$f->getClientFilename()
                                                    ,'filePath'=>$FilePath
                                                    ,'createBy'=>$user_session['adminID']
                                                    ,'createDate'=>date('Y-m-d H:i:s')
                                                    ,'updateBy'=>$user_session['adminID']
                                                    ,'updateDate'=>date('Y-m-d H:i:s')
                                                ];
                                    // print_r($AttachFile);exit;
                                    MeetingService::addMeetingFile($AttachFile);
                                    //$f->moveTo('../../' . $FilePath);
                                    
                                }
                            }
                        }
                    }
                }

                // Upload invite files if exists
                $files = $request->getUploadedFiles();
                if($files != null){
                    foreach($files as $key => $val){
                        foreach($val['InviteFileList'] as $k => $v){
                            // print_r($v);
                            // exit;
                            $f = $v['attachFile'];
                            // print_r($f);
                            if($f != null){
                                if($f->getClientFilename() != ''){
                                    $ext = pathinfo($f->getClientFilename(), PATHINFO_EXTENSION);
                                    $FileName = $meetingID . '_' . date('YmdHis').'_'.rand(100000,999999). '.'.$ext;
                                    $FilePath = $_WEB_FILE_PATH . '/commodity-standard/invite-files/'.$FileName;

                                    $AttachFile = ['meetingID'=>$meetingID
                                                    ,'standardID'=>$_Meeting['standardID']
                                                    ,'fileName'=>$f->getClientFilename()
                                                    ,'filePath'=>$FilePath
                                                    ,'createBy'=>$user_session['adminID']
                                                    ,'createDate'=>date('Y-m-d H:i:s')
                                                    ,'updateBy'=>$user_session['adminID']
                                                    ,'updateDate'=>date('Y-m-d H:i:s')
                                                ];
                                    // print_r($AttachFile);exit;
                                    MeetingService::addInviteFile($AttachFile);
                                    //$f->moveTo('../../' . $FilePath);
                                    
                                }
                            }
                        }
                    }
                }

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteData($request, $response, $args){
            try{

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteMeetingData($request, $response, $args){

            try{
                $params = $request->getParsedBody();
                $meetingFileID = $params['obj']['id'];
                $result = MeetingService::removeMeetingFile($meetingFileID);
                $this->data_result['DATA']['result'] = $result;
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function deleteInviteData($request, $response, $args){

            try{
                $params = $request->getParsedBody();
                $inviteFileID = $params['obj']['id'];
                $result = MeetingService::removeInviteFile($inviteFileID);
                $this->data_result['DATA']['result'] = $result;
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }
    
    }