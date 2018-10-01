<?php  

namespace App\Model;
class News extends \Illuminate\Database\Eloquent\Model {  
  	protected $table = 'news';
  	protected $primaryKey = 'id';
  	public $timestamps = false;
    
}
