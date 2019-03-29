<?php
    
    namespace App\Service;
    
    use App\Model\Questionnaire;
    use App\Model\QuestionnaireResponse;
    use App\Model\Question;
    use App\Model\QuestionnairePerson;
    use App\Model\CommodityStandard;


    use Illuminate\Database\Capsule\Manager as DB;
    
    class QuestionService {

        public static function getListActive($year){
            return Questionnaire::select("Questionnaires.*")
                    ->join('Commodity_Standards', "Commodity_Standards.standardID", '=', 'Questionnaires.standardID')
                    ->where(function($query) use ($year){
                            if(!empty($year)){
                                $query->where('Commodity_Standards.years', ($year + 543));
                                
                            }
                        })

                    ->get();
        }

        public static function getListPage($keyword){
            return Questionnaire::select("Questionnaires.*", "Commodity_Standards.standardNameThai")
                    ->join('Commodity_Standards', "Commodity_Standards.standardID", '=', 'Questionnaires.standardID')
                    ->where(function($query) use ($keyword){
                            if(!empty($keyword)){
                                $query->where('questionName' , 'LIKE', DB::raw("'%".$keyword."%'"));
                                $query->orWhere('standardNameThai' , 'LIKE', DB::raw("'%".$keyword."%'"));
                            }
                        })
                    
                    ->get();
        }

    	public static function getList($currentPage, $limitRowPerPage, $questionType = 'normal'){

            $currentPage = $currentPage - 1;
            
            $limit = $limitRowPerPage;
            $offset = $currentPage;
            $skip = $offset * $limit;
            $totalRows = Questionnaire::count();
            // $totalPage = ceil($totalRows / $limitRowPerPage);
            $DataList = Questionnaire::leftJoin("Commodity_Standards", "Commodity_Standards.standardID", '=', 'Questionnaires.standardID')
                        ->where('questionnaireType', $questionType)
                        ->skip($skip)
                        ->take($limit)
                        ->get();

            return ['DataList'=>$DataList, 'Total' => $totalPage];
        }

        public static function getStandardList(){
            return CommodityStandard::all();
        }

        public static function getStandardQuestionList($standardID){
            return Questionnaire::where('standardID', $standardID)
                                ->join("Questions", 'Questions.questionID', '=', 'Questionnaire.questionID')
                                ->get();
        }

        public static function getQuestionListByStandard($standardID){
            return Questionnaire::where('standardID', $standardID)
                                ->with('question')
                                ->get();
        }

        public static function getData($questionnaireID){
            return Questionnaire::select("Questionnaires.*", "Subcommittee.subcommitteeName", "Commodity_Standards.standardNameThai AS standardName","Commodity_Standards.academicBoardName AS academicBoardName")
                                ->where('questionnaireID', $questionnaireID)
                                ->leftJoin("Subcommittee", "Subcommittee.subcommitteeID", '=' , 'Questionnaires.subcommitteeID')
                                ->leftJoin("Commodity_Standards", "Commodity_Standards.standardID", '=' , 'Questionnaires.standardID')
                                //->with('questionnairePerson')
                                ->with(array('questionnairePerson' => function($query){
                                    $query->join('Stakeholders', 'Stakeholders.stakeholderID', '=', 'Questionnaire_Person.stakeholderID');
                                }))
                                ->with('question')
                                ->first()->toArray();
        }

        public static function getDataByStandard($standardID){
            return Questionnaire::select("Questionnaires.*")
                                ->where('standardID', $standardID)
                                ->with('question')
                                ->get();
        }

        public static function countTotalResponse($questionnaireID){
            return count(QuestionnaireResponse::where('questionnaire_id', $questionnaireID)
                                ->groupBy('response_by')
                                ->get()->toArray());
        }

        public static function updateData($obj){
            if(empty($obj['questionnaireID'])){
                $obj['createDate'] = date('Y-m-d H:i:s');
                $obj['updateDate'] = date('Y-m-d H:i:s');
                $model = Questionnaire::create($obj);
                return $model->questionnaireID;    
               
            }else{
                unset($obj['createBy']);
                $obj['updateDate'] = date('Y-m-d H:i:s');
                Questionnaire::where('questionnaireID', $obj['questionnaireID'])->update($obj);
                return $obj['questionnaireID'];
            }
        }

        public static function updateQuestionLinkURL($questionnaireID, $link_url){
            
            $obj['link_url'] = $link_url;
            return Questionnaire::where('questionnaireID', $questionnaireID)->update($obj);
           
        }

        public static function updateQuestionnaireResponseData($obj){
        
            $model = QuestionnaireResponse::create($obj);
            return $model->id;    
            
        }

        public static function removeData($questionnaireID){
            return Questionnaire::find($questionnaireID)->delete();
        }

        public static function updateQuestionnairePerson($obj){
            $model = QuestionnairePerson::create($obj);
            return $questionnairePersonID;    
        }

        public static function removeQuestionnairePerson($questionnairePersonID){
            return QuestionnairePerson::find($questionnairePersonID)->delete();
        }

        public static function updateQuestion($obj){
            if(empty($obj['questionID'])){
                $obj['createDate'] = date('Y-m-d H:i:s');
                $obj['updateDate'] = date('Y-m-d H:i:s');
                $model = Question::create($obj);
                return $model->questionID;    
               
            }else{
                unset($obj['createBy']);
                $obj['updateDate'] = date('Y-m-d H:i:s');
                Question::where('questionID', $obj['questionID'])->update($obj);
                return $obj['questionID'];
            }
        }

        public static function removeQuestion($questionID){
            return Question::find($questionID)->delete();
        }

        public static function getCountAgree($questionID){
            return QuestionnaireResponse::where('q_id', $questionID)
                    ->where('q_response', 'agree')
                    ->count();
        }

        public static function getCountDisagree($questionID){
            return QuestionnaireResponse::where('q_id', $questionID)
                    ->where('q_response', 'disagree')
                    ->count();
        }

        public static function getDisagreeComment($questionID){
            return QuestionnaireResponse::select("q_response_comment")
                    ->where('q_id', $questionID)
                    // ->where('q_response', 'disagree')
                    ->whereNotNull('q_response_comment')
                    ->get()
                    ->toArray();
        }

        
    }
