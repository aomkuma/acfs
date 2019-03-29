<?php  

namespace App\Model;
class CommodityStandardCertification extends \Illuminate\Database\Eloquent\Model {  
  	protected $table = 'Commodity_Standard_Certification';
  	protected $primaryKey = 'standardID';
  	public $timestamps = false;
  	protected $fillable = array('standardID'
                , 'years'
  							, 'standardNameThai'
  							, 'standardNameEng'
  							, 'standardType'
  							, 'standardCategory'
  							, 'productType'
                , 'standardTypeEng'
  							, 'noThai'
  							, 'bookNumberThai'
  							, 'noEng'
  							, 'bookNumberEng'
  							, 'detail'
                , 'detailEng'
  							, 'step'
  							, 'status'
                , 'standardFileName'
  							, 'standardFilePath'
                , 'standardFileNameEN'
                , 'standardFilePathEN'
                , 'academicBoardName'
                , 'standardDefineType'
                , 'standardPublishingType'
                , 'standardGroup'
                , 'standardGroupEng'
                , 'secondaryCode'
                , 'accreditationScope'
                , 'accreditationScopeEng'
                , 'useDate'
                , 'cancelledDate'
                , 'descThai'
                , 'descEng'
                , 'createBy'
                , 'createDate'
                , 'updateBy'
                , 'updateDate'
  						);
  	// public function attachFiles()
   //  {
  	// 	return $this->hasMany('App\Model\AttachFile', 'parent_id');
   //  }

}
