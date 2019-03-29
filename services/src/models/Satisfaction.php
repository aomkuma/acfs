<?php  

namespace App\Model;
class Satisfaction extends \Illuminate\Database\Eloquent\Model {  
  	protected $table = 'Satisfaction';
  	protected $primaryKey = 'id';
  	public $timestamps = false;
  	protected $fillable = array('id'
                , 'person_name'
                , 'correction'
                , 'up_to_date'
                , 'reliable'
                , 'accessibility'
                , 'useful'
                , 'suggestion'
                , 'create_date'
              );
}