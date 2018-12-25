<?php
    
    namespace App\Service;
    
    use App\Model\UserRole;
    use App\Model\UserRoleDetail;

    use Illuminate\Database\Capsule\Manager as DB;
    
    class UserRoleService {

    	public static function getList($actives){
            return UserRole::where(function($query) use ($actives){
                        if(!empty($actives)){
                            $query->where('actives', $actives);
                        }
                    })->get();
        }

        public static function updateData($obj){
            if(empty($obj['id'])){
                $obj['create_date'] = date('Y-m-d H:i:s');
                $obj['update_date'] = date('Y-m-d H:i:s');
                $model = UserRole::create($obj);
                return $model->id;    
               
            }else{
                $obj['update_date'] = date('Y-m-d H:i:s');
                UserRole::where('id', $obj['id'])->update($obj);
                return $obj['id'];
            }
        
        }
        public static function removeData($id){
            
            return UserRole::find($id)->delete();
            
        }


    }
