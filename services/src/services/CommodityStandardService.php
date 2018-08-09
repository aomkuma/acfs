<?php
    
    namespace App\Service;
    
    use App\Model\CommodityStandard;
    use App\Model\CommodityKeyword;

    use Illuminate\Database\Capsule\Manager as DB;
    
    class CommodityStandardService {

    	public static function getCommodityStandardList(){
            return CommodityStandard::orderBy('standardID', 'DESC')
            		->get();      
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