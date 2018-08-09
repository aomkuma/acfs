<?php

    namespace App\Service;
    
    use App\Model\Stakeholder;
    use App\Model\CommodityStandard;
	
    use Illuminate\Database\Capsule\Manager as DB;
    
    class AutocompleteService {
        
        public static function getStakeholderNameThai($keyword){
            
            return Stakeholder::where('status', 'Active')
                                ->where(function($query) use ($keyword){
                                    if(!empty($keyword)){
                                        $UsernameArr = explode(" ", preg_replace('!\s+!', ' ', $keyword));
                                        $FirstName = trim($UsernameArr[0]);
                                        $LastName = trim($UsernameArr[1]);
                                        $query->where('nameThai', 'LIKE', DB::raw("'".$FirstName."%'"));
                                        if(!empty($LastName)){
                                            $query->orWhere('lastNameThai', 'LIKE', DB::raw("'".$LastName."%'"));
                                        }
                                    }
                                })
                                ->skip(0)
                                ->take(10)
                                ->get();
        }

        public static function getStakeholderNameEng($keyword){
            
            return Stakeholder::where('status', 'Active')
                                ->where(function($query) use ($keyword){
                                    if(!empty($keyword)){
                                        $UsernameArr = explode(" ", preg_replace('!\s+!', ' ', $keyword));
                                        $FirstName = trim($UsernameArr[0]);
                                        $LastName = trim($UsernameArr[1]);
                                        $query->where('nameEng', 'LIKE', DB::raw("N'".$FirstName."%'"));
                                        if(!empty($LastName)){
                                            $query->orWhere('lastNameEng', 'LIKE', DB::raw("N'".$LastName."%'"));
                                        }
                                    }
                                })
                                ->skip(0)
                                ->take(10)
                                ->get();
        }

        public static function getCommodityStandard($keyword){
            
            return CommodityStandard::where('status', 'Active')
                                ->where(function($query) use ($keyword){
                                    if(!empty($keyword)){
                                        $query->where('standardNameThai', 'LIKE', DB::raw("'%".$keyword."%'"));
                                        $query->orWhere('standardNameEng', 'LIKE', DB::raw("'%".$keyword."%'"));
                                    }
                                })
                                ->skip(0)
                                ->take(10)
                                ->get();
        }
        
    }    

?>