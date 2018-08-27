<?php
    
    namespace App\Service;
    
    use App\Model\CommodityStandard;
    use App\Model\CommodityKeyword;

    use Illuminate\Database\Capsule\Manager as DB;
    
    class CommodityStandardService {

    	public static function getCommodityStandardList($currentPage, $limitRowPerPage, $_standardIDToIgnore, $stepList){
            // 
            $limit = $limitRowPerPage;
            $offset = $currentPage;
            $skip = $offset * $limit;
            $totalRows = CommodityStandard::whereNotIn("standardID", $_standardIDToIgnore)
                        ->where(function($query) use ($stepList){
                            if($stepList[0] == 11){
                                $query->where('status', 'Inactive');
                            }else{
                                $query->whereIn('step', $stepList);
                                $query->where('status', 'Active');
                            }
                        })
                        ->count();

            // $totalPage = ceil($totalRows / $limitRowPerPage);
            $DataList = CommodityStandard::whereNotIn("standardID", $_standardIDToIgnore)
                        ->where(function($query) use ($stepList){
                            if($stepList[0] == 11){
                                $query->where('status', 'Inactive');
                            }else{
                                $query->whereIn('step', $stepList);
                                $query->where('status', 'Active');
                            }
                        })
                        ->orderBy('standardID', 'DESC')
                        ->skip($skip)
                        ->take($limit)
                		->get();      

            return ['DataList'=>$DataList, 'Total' => $totalRows];
        }

        public static function getCommodityStandardListWithCheckDate($currentPage, $limitRowPerPage){
            // 
            $limit = $limitRowPerPage;
            $offset = $currentPage;
            $skip = $offset * $limit;
            $totalRows = CommodityStandard::where(DB::raw("DATEDIFF('".date('Y-m-d')."',createDate)"), '>', '1735')
                        ->count();

            // $totalPage = ceil($totalRows / $limitRowPerPage);
            $DataList = CommodityStandard::where( DB::raw("DATEDIFF('".date('Y-m-d')."',createDate)"), '>', '1735')
                        ->orderBy('standardID', 'DESC')
                        ->skip($skip)
                        ->take($limit)
                        ->get();      

            return ['DataList'=>$DataList, 'Total' => $totalRows];
        }

        public static function getCommodityStandardListForUser($userID, $currentPage, $limitRowPerPage, $_standardIDToIgnore){
            $limit = $limitRowPerPage;
            $offset = $currentPage;
            $skip = $offset * $limit;
            $totalRows = CommodityStandard::whereNotIn("Commodity_Standards.standardID", $_standardIDToIgnore)
                        ->join("Academic_Boards", 'Academic_Boards.standardID', '=', 'Commodity_Standards.standardID')
                        ->count();
            // $totalPage = ceil($totalRows / $limitRowPerPage);
            $DataList = CommodityStandard::select("Commodity_Standards.*")
                        ->whereNotIn("Commodity_Standards.standardID", $_standardIDToIgnore)
                        ->join("Academic_Boards", 'Academic_Boards.standardID', '=', 'Commodity_Standards.standardID')
                        ->groupBy('Commodity_Standards.standardID')
                        ->orderBy('Commodity_Standards.standardID', 'DESC')
                        ->skip($skip)
                        ->take($limit)
                        ->get();      

            return ['DataList'=>$DataList, 'Total' => $totalRows];
        }

        public static function getCommodityStandardListWithCheckDateForUser($userID, $currentPage, $limitRowPerPage){
            $limit = $limitRowPerPage;
            $offset = $currentPage;
            $skip = $offset * $limit;
            $totalRows = CommodityStandard::where(DB::raw("DATEDIFF('".date('Y-m-d')."',Commodity_Standards.createDate)"), '>', '1735')
                        ->join("Academic_Boards", 'Academic_Boards.standardID', '=', 'Commodity_Standards.standardID')
                        ->count();
            // $totalPage = ceil($totalRows / $limitRowPerPage);
            $DataList = CommodityStandard::select("Commodity_Standards.*")
                        ->where(DB::raw("DATEDIFF('".date('Y-m-d')."',Commodity_Standards.createDate)"), '>', '1735')
                        ->join("Academic_Boards", 'Academic_Boards.standardID', '=', 'Commodity_Standards.standardID')
                        ->groupBy('Commodity_Standards.standardID')
                        ->orderBy('Commodity_Standards.standardID', 'DESC')
                        ->skip($skip)
                        ->take($limit)
                        ->get();      

            return ['DataList'=>$DataList, 'Total' => $totalRows];
        }

        public static function getCommodityStandard($standardID){
            return CommodityStandard::find($standardID); 
        }

        public static function getCommodityKeywords($standardID, $keywordLang){
            return CommodityKeyword::where('standardID', $standardID)->where('keywordLang', $keywordLang)->get(); 
        }

        public static function updateCommodityStandard($CommodityStandard){
            if(empty($CommodityStandard['standardID'])){
                $CommodityStandard['createDate'] = date('Y-m-d H:i:s');
                $CommodityStandard['updateDate'] = date('Y-m-d H:i:s');
                $model = CommodityStandard::create($CommodityStandard);
                return $model->standardID;
            }else{
                $CommodityStandard['updateDate'] = date('Y-m-d H:i:s');
                CommodityStandard::where('standardID', $CommodityStandard['standardID'])->update($CommodityStandard);
                return $CommodityStandard['standardID'];
            }
            
        }

        public static function updateCommodityKeyword($CommodityKeyword){
            if(empty($CommodityKeyword['keywordID'])){
                $CommodityKeyword['createDate'] = date('Y-m-d H:i:s');
                $CommodityKeyword['updateDate'] = date('Y-m-d H:i:s');
                $model = CommodityKeyword::create($CommodityKeyword);
                return $model->keywordID;
            }else{
                $CommodityKeyword['updateDate'] = date('Y-m-d H:i:s');
                $model = CommodityKeyword::where('keywordID', $CommodityKeyword['keywordID'])->update($CommodityKeyword);
                return $CommodityKeyword['keywordID'];
            }
            
        }

        public static function removeCommodityStandard($id){
            return CommodityStandard::find($id)->delete();
        }
    }