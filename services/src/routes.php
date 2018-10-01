<?php
// Routes

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

//$app->get('/user/{id}', 'UserController:getUser');
$app->post('/login/', 'LoginController:authenticate');
$app->post('/forgot-password/', 'LoginController:forgotPassword');

$app->post('/autocomplete/', 'AutocompleteController:getAutocomplete');
$app->post('/masterfile/get/', 'MasterfileController:getMasterfile');
$app->post('/masterfile/update/', 'MasterfileController:updateMasterfile');
$app->post('/masterfile/remove/', 'MasterfileController:deleteMasterfile');

$app->post('/commodity-standard/list/home/', 'CommodityStandardController:getListForHomepage');
$app->post('/commodity-standard/list/', 'CommodityStandardController:getList');
$app->post('/commodity-standard/get/', 'CommodityStandardController:getData');
$app->post('/commodity-standard/update/', 'CommodityStandardController:updateData');

$app->post('/academic-board/list/', 'AcademicBoardController:getList');
$app->post('/academic-board/update/', 'AcademicBoardController:updateData');
$app->post('/academic-board/delete/', 'AcademicBoardController:deleteData');

$app->post('/meeting/list/', 'MeetingController:getList');
$app->post('/meeting/list/home/', 'MeetingController:getListForHomepage');
$app->post('/meeting/update/', 'MeetingController:updateData');
$app->post('/meeting/delete/', 'MeetingController:deleteData');
$app->post('/meeting/meeting-file/delete/', 'MeetingController:deleteMeetingData');
$app->post('/meeting/invite-file/delete/', 'MeetingController:deleteInviteData');
$app->post('/meeting/view/attendee/', 'MeetingController:viewAttendee');
$app->post('/meeting/add/attendee/', 'MeetingController:addAttendee');
$app->post('/meeting/delete/attendee/', 'MeetingController:removeAttendee');

$app->post('/stakeholder/list/', 'StakeholderController:getList');
$app->post('/stakeholder/get/', 'StakeholderController:getData');
$app->post('/stakeholder/update/', 'StakeholderController:updateData');
$app->post('/stakeholder/delete/', 'StakeholderController:deleteData');

$app->post('/subcommittee/list/', 'SubcommitteeController:getList');
$app->post('/subcommittee/get/', 'SubcommitteeController:getData');
$app->post('/subcommittee/update/', 'SubcommitteeController:updateData');
$app->post('/subcommittee/delete/', 'SubcommitteeController:deleteData');
$app->post('/subcommittee/person/delete/', 'SubcommitteeController:deleteSubcommitteePersonData');

$app->post('/user-account/list/admin/', 'UserAccountController:getAdminList');
$app->post('/user-account/get/admin/', 'UserAccountController:getAdminData');
$app->post('/user-account/update/admin/', 'UserAccountController:updateAdminData');
$app->post('/user-account/delete/admin/', 'UserAccountController:deleteAdminData');
$app->post('/user-account/list/user/', 'UserAccountController:getUserList');
$app->post('/user-account/get/user/', 'UserAccountController:getUserData');
$app->post('/user-account/update/user/', 'UserAccountController:updateUserData');
$app->post('/user-account/delete/user/', 'UserAccountController:deleteUserData');

$app->post('/email/list/', 'EmailController:getList');
$app->post('/email/get/', 'EmailController:getData');
$app->post('/email/update/', 'EmailController:updateData');
$app->post('/email/delete/', 'EmailController:deleteData');
$app->post('/email/delete/commodity/', 'EmailController:deleteEmailCommodityData');

$app->post('/questionnaire/list/', 'QuestionController:getList');
$app->post('/questionnaire/get/', 'QuestionController:getData');
$app->post('/questionnaire/update/', 'QuestionController:updateData');
$app->post('/questionnaire/delete/', 'QuestionController:deleteData');
$app->post('/questionnaire/list/standard/', 'QuestionController:getStandardList');
$app->post('/questionnaire/list/standard/question/', 'QuestionController:getStandardQuestionList');
$app->post('/questionnaire/person/list/', 'QuestionController:getListQuestionnairePerson');
$app->post('/questionnaire/person/update/', 'QuestionController:updateQuestionnairePerson');
$app->post('/questionnaire/person/delete/', 'QuestionController:deleteQuestionnairePerson');
$app->post('/questionnaire/question/delete/', 'QuestionController:deleteQuestion');

$app->post('/menu/list/', 'MenuController:getMenuList');
$app->post('/menu/list/manage/', 'MenuController:getMenuListManage');
$app->post('/menu/get/', 'MenuController:getMenu');
$app->post('/menu/update/', 'MenuController:updateMenu');
$app->post('/menu/page/get/', 'MenuController:GetMenuPage');
$app->post('/menu/get/parent/', 'MenuController:GetMenuParent');

$app->post('/slideshow/view/', 'SlideShowController:getSlideShowView');
$app->post('/slideshow/', 'SlideShowController:getSlideShow');
$app->post('/slideshow/update/', 'SlideShowController:updateSlideShow');
$app->delete('/slideshow/delete/{id}', 'SlideShowController:removeSlideShow');

$app->post('/news/', 'NewsController:getNewsList');
$app->post('/news/home/', 'NewsController:getNewsListHomepage');
$app->post('/news/view/', 'NewsController:getNews');
$app->post('/news/update/', 'NewsController:updateNews');
$app->delete('/news/delete/{id}', 'NewsController:removeNews');

$app->post('/linkurl/', 'LinkUrlController:getLinkUrl');
$app->post('/linkurlView/', 'LinkUrlController:getLinkUrlView');
$app->post('/linkurl/update/', 'LinkUrlController:updateLinkUrl');
$app->delete('/linkurl/delete/{id}', 'LinkUrlController:removeLinkUrl');


// Default action
$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
