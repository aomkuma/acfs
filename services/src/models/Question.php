<?php  

namespace App\Model;
class Question extends \Illuminate\Database\Eloquent\Model {  
  	protected $table = 'Questions';
  	protected $primaryKey = 'questionID';
  	public $timestamps = false;
  	protected $fillable = array('questionID'
                , 'questionaireID'
                , 'question'
                , 'createBy'
                , 'createDate'
                , 'updateBy'
                , 'updateDate'
              );
}