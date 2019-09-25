<?php

    namespace App\Controller;
    
    use App\Service\NewsService;
    use App\Service\AttachFileService;

    class NewsController extends Controller {
        
        protected $logger;
        protected $db;
        
        public function __construct($logger, $db){
            $this->logger = $logger;
            $this->db = $db;
        }

        public function getNewsList($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $news_type  =$params['obj']['news_type'];
                $actives  =$params['obj']['actives'];
                $currentPage = filter_var($params['obj']['currentPage'], FILTER_SANITIZE_NUMBER_INT);
                $limitRowPerPage = filter_var($params['obj']['limitRowPerPage'], FILTER_SANITIZE_NUMBER_INT);
                // $actives = '';

                $_News = NewsService::getNewsList($news_type, $actives, $currentPage, $limitRowPerPage);
                // print_r($_News);
                $NewDataList = $_News['DataList'];
                $TotalRows = $_News['Total'];
                // print_r($NewDataList);
                // print_r($TotalRows);exit;
                $_NewsList = [];
                foreach($NewDataList as $k => $v){
                    $_AttachFiles = AttachFileService::getAttachFiles($v['id'], 'news');
                    $v['AttachFiles'] = $_AttachFiles;

                    $_PictureList = AttachFileService::getAttachFiles($v['id'], 'news-picture');
                    $v['PictureList'] = $_PictureList;
                    // print_r($v);exit;
                    array_push($_NewsList, $v);
                }
                // print_r($_NewsList);exit;
                $this->data_result['DATA']['News'] = $_NewsList;
                $this->data_result['DATA']['Total'] = $TotalRows;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getNewsListHomepage($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $news_type  =$params['obj']['news_type'];
                $actives  =$params['obj']['actives'];

                $_News = NewsService::getNewsListHomepage('Y');
                $_NewsList1 = [];
                foreach($_News as $k => $v){
                    $_AttachFiles = AttachFileService::getAttachFiles($v['id'], 'news');
                    $v['AttachFiles'] = $_AttachFiles;
                    // print_r($v);exit;
                    array_push($_NewsList1, $v);
                }
                
                $this->data_result['DATA']['NewsList1'] = $_NewsList1;
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function getNews($request, $response, $args){
            try{
                $params = $request->getParsedBody();
                $id  = $params['obj']['id'];
                $viewer = $params['obj']['viewer'];
                
                if($viewer == 'visitor'){
                    NewsService::updateNewsView($id);
                }

                $_News = NewsService::getNews($id);
                $_AttachFiles = AttachFileService::getAttachFiles($_News['id'], 'news');
                $_News['AttachFiles'] = $_AttachFiles;

                $_PictureList = AttachFileService::getAttachFiles($_News['id'], 'news-picture');
                $_News['PictureList'] = $_PictureList;

                $this->data_result['DATA']['News'] = $_News;
                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }

        public function updateNews($request, $response, $args){
            
            $_WEB_IMAGE_PATH = 'files/img';
            $_WEB_FILE_PATH = 'files/files';

            try{
                // error_reporting(E_ERROR);
                // error_reporting(E_ALL);
                // ini_set('display_errors','On');
                $files = $request->getUploadedFiles();
                $upload_files = $request->getUploadedFiles();
                $picture_files = $upload_files['obj']['NewsObj']['PictureList'];
                $attach_files = $upload_files['obj']['AttachFileList'];

                // print_r($attach_files);
                // exit;
                $params = $request->getParsedBody();

                // print_r($params);exit;
                $_News = $params['obj']['NewsObj']; 
                unset($_News['AttachFiles']);

                // Save News 
                $id = NewsService::updateNews($_News);
                
                // Update Attach files
                if($attach_files != null){
                    
                    foreach($attach_files as $k => $v){
                        // print_r($v['attachFile']);
                        $f = $v['attachFile'];
                        // print_r($f);
                        if($f != null){
                            if($f->getClientFilename() != ''){
                                $ext = pathinfo($f->getClientFilename(), PATHINFO_EXTENSION);
                                $FileName = $id . '_' . date('YmdHis').'_'.rand(100000,999999). '.'.$ext;
                                $FilePath = $_WEB_FILE_PATH . '/news/'.$FileName;

                                $AttachFile = ['parent_id'=>$id
                                                ,'menu_id'=>$id
                                                ,'page_type'=>'news'
                                                ,'file_name'=>$f->getClientFilename()
                                                ,'file_path'=>$FilePath
                                                ,'content_type'=>$f->getClientMediaType()
                                                ,'file_size'=>number_format($f->getSize()/1024, 2)

                                            ];
                                // print_r($AttachFile);exit;
                                AttachFileService::addAttachFiles($AttachFile);
                                $f->moveTo('../../' . $FilePath);
                                
                            }
                        }
                    }
                    
                }

                // Update Attach files
                $files = $request->getUploadedFiles();
                $f = $files['obj']['AttachFile'];
                // print_r($f);
                // exit;
                if($f != null){
                    if($f->getClientFilename() != ''){
                        // Unset old image if exist
                        $delete_file_path = '../../' . $_WEB_IMAGE_PATH . $_News['image_cover_path'];
                        unset($delete_file_path);

                        $ext = pathinfo($f->getClientFilename(), PATHINFO_EXTENSION);
                        $FileName = date('YmdHis').'_'.rand(100000,999999). '.'.$ext;
                        $FilePath = $_WEB_IMAGE_PATH . '/news/'.$FileName;
                        NewsService::updateNewsImagePath($id, $FilePath);
                        $f->moveTo('../../' . $FilePath);
                    }        
                }

                // save news picture
                if($picture_files != null){
                    foreach($picture_files as $k => $v){
                        // print_r($v['attachFile']);
                        $f = $v['attachFile'];
                        // print_r($f);
                        if($f != null){
                            if($f->getClientFilename() != ''){
                                $ext = pathinfo($f->getClientFilename(), PATHINFO_EXTENSION);
                                $FileName = $id . '_' . date('YmdHis').'_'.rand(100000,999999). '.'.$ext;
                                $FilePath = $_WEB_IMAGE_PATH . '/news/'.$FileName;

                                $AttachFile = ['parent_id'=>$id
                                                ,'menu_id'=>$id
                                                ,'page_type'=>'news-picture'
                                                ,'file_name'=>$f->getClientFilename()
                                                ,'file_path'=>$FilePath
                                                ,'content_type'=>$f->getClientMediaType()
                                                ,'file_size'=>number_format($f->getSize()/1024, 2)

                                            ];
                                // print_r($AttachFile);exit;
                                AttachFileService::addAttachFiles($AttachFile);
                                $f->moveTo('../../' . $FilePath);
                                
                            }
                        }
                    }
                }

                // exit;

                return $this->returnResponse(200, $this->data_result, $response, false);
                
            }catch(\Exception $e){
                return $this->returnSystemErrorResponse($this->logger, $this->data_result, $e, $response);
            }
        }
    }