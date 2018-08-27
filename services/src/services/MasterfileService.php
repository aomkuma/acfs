<?php
    
    namespace App\Service;
    
    use App\Model\AccreditationScope;
    use App\Model\Branch;
    use App\Model\Stakeholder;
    
    use Illuminate\Database\Capsule\Manager as DB;
    
    class MasterfileService {

    	public static function getAccreditationScope(){
            return AccreditationScope::all();
        }

        public static function getBranch(){
            return Branch::all();
        }

        public static function updateBranch($obj){
            if(empty($obj['branchID'])){
                $model = Branch::create($obj);
                return $model->branchID;
            }else{
                // $find old branch name
                $model = Branch::find($obj['branchID']);
                Branch::where('branchID', $obj['branchID'])->update($obj);

                // Update stakeholder's branch if change
                $update_branch = ['branch' => $obj['branchNameThai']];
                Stakeholder::where('branch', $model->branchNameThai)->update($update_branch);
                return $obj['branchID'];
            }
        }

        public static function deleteBranch($id){
            return Branch::find($id)->delete();
        }        

        
    }
