<?php
    
    namespace App\Service;
    
    use App\Model\Menu;
    use App\Model\Page;
    use App\Model\AttachFile;
    use App\Model\MenuFavourite;

    use Illuminate\Database\Capsule\Manager as DB;
    
    class MenuService {

        public static function getMenuFavourite($email){
            return Menu::join('menu_favourite', 'menu_favourite.menu_id', '=', 'menus.id')
                    ->where('email', $email)
                    ->where('menus.actives', 'Y')
                    ->orderBy('menu_count', 'DESC')
                    ->get();      
        }

        public static function getMenuList($parent_menu){
            return Menu::where('actives', 'Y')
                    ->where('parent_menu', $parent_menu)
                    ->orderBy('menu_order', 'ASC')
                    ->get();      
        }

        public static function getMenuListManage(){
            return Menu::orderBy('id', 'DESC')
                    ->get();      
        }

        public static function getMenuListParent($menu_id = ''){
            return Menu::where(function($query) use ($menu_id){
                        $query->where('id' , '<>', $menu_id);
                    })
                    
                    ->orderBy('id', 'DESC')
                    ->get()
                    ->toArray();      
        }

    	public static function getMenu($menu_id){
            return Menu::find($menu_id);      
        }

        public static function getMenuByType($menu_type){
            // echo $menu_type ;exit;
            return Menu::where('page_type', $menu_type)->first();      
        }

        public static function getPage($menu_id){
            return Page::where('menu_id', $menu_id)->first();      
        }

        public static function updateMenu($obj){

        	$model = Menu::find($obj['id']);
        	if(empty($model)){
        		$model = new Menu;
        	}
            // $model->update_date = date('Y-m-d H:i:s');
            $model->menu_name_th = $obj['menu_name_th'];
            $model->menu_name_en = $obj['menu_name_en'];
            $model->parent_menu = $obj['parent_menu'];
            $model->menu_type = $obj['menu_type'];
            $model->actives = $obj['actives'];
            $model->menu_url = $obj['menu_url'];
            $model->menu_order = $obj['menu_order'];
            $model->menu_logo = $obj['menu_logo'];
            $model->menu_image = $obj['menu_image'];
            $model->save();
            return $model->id;
        }

        public static function updatePage($obj){

            $model = Page::find($obj['id']);
            if(empty($model)){
                $model = new Page;
                $model->create_date = date('Y-m-d H:i:s');
            }
            $model->menu_id = $obj['menu_id'];
            $model->title_th = $obj['title_th'];
            $model->title_en = $obj['title_en'];
            $model->update_date = date('Y-m-d H:i:s');
            $model->contents = $obj['contents'];
            $model->contents_en = $obj['contents_en'];
            $model->save();
            return $model->id;
        }

        public static function updateMenuURL($id){

            $model = Menu::find($id);
            $model->menu_url = 'page/'. $id;
            $model->save();
            return $model->id;
        }

        public static function getPageContent($menu_id){
            return Page::where('menu_id', $menu_id)->first();
        }

        public static function getAttachFiles($menu_id){
            return AttachFile::where('menu_id', $menu_id)->get();
        }

        public static function updateVisit($email, $menu_id){
            $model = MenuFavourite::where('menu_id', $menu_id)->where('email', $email)->first();
            if(empty($model)){
                $model = new MenuFavourite;
                $model->menu_id = $menu_id;
                $model->email = $email;
                $model->menu_count = 1;
            }else{
                $model->menu_count = intval($model->menu_count) + 1;
            }
            return $model->save();
        }

    }