<?php
// Routes

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

//$app->get('/user/{id}', 'UserController:getUser');
$app->post('/login/', 'LoginController:authenticate');

$app->post('/autocomplete/', 'AutocompleteController:getAutocomplete');

$app->post('/commodity-standard/list/', 'CommodityStandardController:getList');
$app->post('/commodity-standard/get/', 'CommodityStandardController:getData');
$app->post('/commodity-standard/update/', 'CommodityStandardController:updateData');

$app->post('/academic-board/list/', 'AcademicBoardController:getList');
$app->post('/academic-board/update/', 'AcademicBoardController:updateData');
$app->post('/academic-board/delete/', 'AcademicBoardController:deleteData');

$app->post('/meeting/list/', 'MeetingController:getList');
$app->post('/meeting/update/', 'MeetingController:updateData');
$app->post('/meeting/delete/', 'MeetingController:deleteData');
$app->post('/meeting/meeting-file/delete/', 'MeetingController:deleteMeetingData');
$app->post('/meeting/invite-file/delete/', 'MeetingController:deleteInviteData');

$app->post('/stakeholder/list/', 'StakeholderController:getList');
$app->post('/stakeholder/get/', 'StakeholderController:getData');
$app->post('/stakeholder/update/', 'StakeholderController:updateData');
$app->post('/stakeholder/delete/', 'StakeholderController:deleteData');

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



// Default action
$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
