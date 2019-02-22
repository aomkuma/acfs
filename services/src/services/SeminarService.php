<?php
    
    namespace App\Service;
    
    use App\Model\Seminar;
    use App\Model\SeminarResponse;

    use Illuminate\Database\Capsule\Manager as DB;
    
    class SeminarService {

    	public static function getList($keyword, $page_type, $actives){
            return Seminar::where('page_type', $page_type)
                    ->where(function($query) use ($keyword, $actives) {
                        if(!empty($actives)){
                            $query->where('actives', $actives);
                        }
                        if(!empty($keyword)){
                            $query->where('title_th', 'LIKE', DB::raw("'%" . $keyword . "%'"));
                            $query->orWhere('title_en', 'LIKE', DB::raw("'%" . $keyword . "%'"));
                        }
                    })
                    ->orderBy('id', 'DESC')
            		->get();      
        }

        public static function getData($id){
            return Seminar::find($id);      
        }

        public static function getListResponse($seminar_id){
            return SeminarResponse::where('seminar_id', $seminar_id)
                    ->orderBy('id', 'DESC')
                    ->get();      
        }

        public static function updateData($obj){

        	if(empty($obj['id'])){
                $obj['create_date'] = date('Y-m-d H:i:s');
                $model = Seminar::create($obj);
                return $model->id;    
               
            }else{
                Seminar::where('id', $obj['id'])->update($obj);
                return $obj['id'];
            }
        }

        public static function addSeminarResponse($obj){
            $obj['create_date'] = date('Y-m-d H:i:s');
            $model = SeminarResponse::create($obj);
            return $model->id;    
        }

        public static function removeData($id){
            return Seminar::find($id)->delete();
        }

    }