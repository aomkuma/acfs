<?php
    
    namespace App\Service;
    
    use App\Model\Satisfaction;

    use Illuminate\Database\Capsule\Manager as DB;
    
    class SatisfactionService {

    	public static function getList($menu_type, $condition){
            return Satisfaction::all();
        }

        public static function updateData($obj){
            $obj['create_date'] = date('Y-m-d H:i:s');
            $model = Satisfaction::create($obj);
            return $model->id;    
        }
        public static function removeData($id){
            
            return Satisfaction::find($id)->delete();
            
        }


    }
