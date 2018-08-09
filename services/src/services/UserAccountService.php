<?php
    
    namespace App\Service;
    
    use App\Model\Admin;
    use App\Model\User;
    use App\Model\Stakeholder;


    use Illuminate\Database\Capsule\Manager as DB;
    
    class UserAccountService {

    	public static function getAdminList(){
            return Admin::all();
        }

        public static function getUserList(){
            return User::select("Stakeholders.*"
                                ,"Users.*")
                        ->join("Stakeholders", "Stakeholders.stakeholderID", '=' , 'Users.stakeholderID')
                        ->get();
        }

        public static function getAdminData($adminID){
            return Admin::find($adminID);
        }

        public static function getUserData($userID){
            return User::select("Stakeholders.*"
                                ,"Users.*")
                        ->join("Stakeholders", "Stakeholders.stakeholderID", '=' , 'Users.stakeholderID')
                        ->where("Users.userID", $userID)
                        ->first();
        }

        public static function updateAdminData($obj){
            if(empty($obj['adminID'])){
                // generate AdminID
                $adminID = UserAccountService::generateKeyID();
                // Check duplicate
                $Admin = UserAccountService::checkDuplicateAdminID($adminID);
                while(!empty($Admin)){
                    $adminID = UserAccountService::generateKeyID();
                    $Admin = UserAccountService::checkDuplicateAdminID($adminID);
                }
                $obj['adminID'] = $adminID;
                $obj['createDate'] = date('Y-m-d H:i:s');
                $obj['updateDate'] = date('Y-m-d H:i:s');
                $model = Admin::create($obj);
                return $adminID;    
               
            }else{
                unset($obj['createBy']);
                $obj['updateDate'] = date('Y-m-d H:i:s');
                Admin::where('adminID', $obj['adminID'])->update($obj);
                return $obj['adminID'];
            }
        }

        public static function updateUserData($obj){
            if(empty($obj['userID'])){
                // generate AdminID
                $userID = UserAccountService::generateKeyID();
                // Check duplicate
                $User = UserAccountService::checkDuplicateUserID($userID);
                while(!empty($User)){
                    $userID = UserAccountService::generateKeyID();
                    $User = UserAccountService::checkDuplicateUserID($userID);
                }
                $obj['userID'] = $userID;
                $obj['createDate'] = date('Y-m-d H:i:s');
                $obj['updateDate'] = date('Y-m-d H:i:s');
                $model = User::create($obj);
                return $userID;    
               
            }else{
                unset($obj['createBy']);
                $obj['updateDate'] = date('Y-m-d H:i:s');
                User::where('userID', $obj['userID'])->update($obj);
                return $obj['userID'];
            }
        }

        public static function removeAdminData($adminID){
            return Admin::find($adminID)->delete();
        }

        public static function removeUserData($userID){
            return User::find($userID)->delete();
        }

        public static function checkDuplicateAdminID($adminID){
            return Admin::find($adminID);
        }

        public static function checkDuplicateUserID($UserID){
            return User::find($userID);
        }

        private static function generateKeyID(){
            return rand(1000000, 9999999);
        }
    }
