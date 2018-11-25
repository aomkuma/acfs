<?php
    
    namespace App\Service;
    
    use App\Model\Questionnaire;
    use App\Model\Question;
    use App\Model\QuestionnairePerson;
    use App\Model\CommodityStandard;


    use Illuminate\Database\Capsule\Manager as DB;
    
    class QuestionService {

        public static function getListActive(){
            return Questionnaire::all();
        }

    	public static function getList($currentPage, $limitRowPerPage, $questionType = 'normal'){
            $limit = $limitRowPerPage;
            $offset = $currentPage;
            $skip = $offset * $limit;
            $totalRows = Questionnaire::count();
            $totalPage = ceil($totalRows / $limitRowPerPage);
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

        public static function getData($questionnaireID){
            return Questionnaire::select("Questionnaires.*", "Subcommittee.subcommitteeName", "Commodity_Standards.standardNameThai AS standardName")
                                ->where('questionnaireID', $questionnaireID)
                                ->leftJoin("Subcommittee", "Subcommittee.subcommitteeID", '=' , 'Questionnaires.subcommitteeID')
                                ->leftJoin("Commodity_Standards", "Commodity_Standards.standardID", '=' , 'Questionnaires.standardID')
                                //->with('questionnairePerson')
                                ->with(array('questionnairePerson' => function($query){
                                    $query->join('Stakeholders', 'Stakeholders.stakeholderID', '=', 'Questionnaire_Person.stakeholderID');
                                }))
                                ->with('question')
                                ->first();
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
    }
