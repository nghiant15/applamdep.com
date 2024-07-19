<?php

use Illuminate\Support\Facades\Route;

Route::post('/addtype2', 'HistoryController@AddClickZalo2');
Route::get('/', 'HomepageController@index')->name('homePage');
Route::get('/get-all-history', 'HistoryController@GetAllHistory');
Route::post('/AddClickZalo', 'HistoryController@AddClickZalo');


Route::get('/{slug}/lichsu-soida', 'HistoryController@historySoida');
Route::get('/{slug}/{id}/lichsu-soida', 'HistoryController@historySoida');

Route::get('/{slug}/lich-su-soi-da-with-iframe/{id}', 'HomepageController@ViewhistoryWithIframe');

Route::get('/lich-su-soi-da-with-iframe/{id}', 'HomepageController@ViewhistoryWithIframe');
Route::get('/lichsu-soida', 'HistoryController@historySoida');
Route::get('/book', 'HomepageController@indexBook')->name('homePage');
Route::get('/book/{book}', 'HomepageController@booking')->name('homePage');

Route::get('/book/{book}/ket-qua', 'HomepageController@resultBook')->name('homePage');


Route::get('/dangky', 'OpenAccountController@openAccount')->name('openAccount');
Route::get("/mo-tai-khoan-thanh-cong", function(){
   return View::make("success");
});


Route::get('/thong-tin-tai-khoan', 'HomepageController@profile')->name('homePage');
Route::get('/{slug}/thong-tin-tai-khoan', 'HomepageController@profile')->name('homePage');

Route::get('api/evoucher/banner/getAll', 'EvoucherController@getbanner');

Route::get('/xemchitietlichsu/{id}', 'HomepageController@historyDetailPage');
Route::get('/xemtuong/xemchitietlichsu/{id}', 'HomepageController@historyDetailPage3');
Route::get('/xemchitietlichsu2/{id}', 'HomepageController@historyDetailPage2');
Route::post('/typeLogin/setType', 'HistoryController@setType');

Route::get('/{slug}/nhan-de-xuat-cham-soc-da', 'HomepageController@recomendProduct')->name('homePage');
Route::get('/nhan-de-xuat-cham-soc-da', 'HomepageController@recomendProduct')->name('homePage');
Route::get('/ket-qua', 'HomepageController@result')->name('redireHOmePage');
Route::get('/{slug}/ket-qua', 'HomepageController@result')->name('redireHOmePage');
Route::get('{slug}/ket-qua', 'HomepageController@result')->name('redireHOmePage2');
Route::get('/{slug}/ket-qua', 'HomepageController@result')->name('redireHOmePage3');
// Route::post('/skin/add-history-skin-plugin', 'HistoryController@saveHistory')->name('saveHistory');
Route::post('/{slug}/skin/call-soi-da', 'HomepageController@callSikin');
Route::post('/skin/call-soi-da', 'HomepageController@callSikin');




Route::post('/skin/add-history-skin-plugin', 'HistoryController@saveHistory')->name('saveHistory');
Route::post('{slug}/skin/add-history-skin-plugin', 'HistoryController@saveHistory')->name('saveHistory');
Route::post('/{slug}/{saleId}/skin/add-history-skin-plugin', 'HistoryController@saveHistory')->name('saveHistory');
Route::post('/{slug}/skin/add-history-skin-plugin', 'HistoryController@saveHistory')->name('saveHistory');


Route::post('/{slug}/dang-nhap-plugin', 'UserController@login')->name('loginSystem');
Route::post('/dang-nhap-plugin', 'UserController@login')->name('loginSystem');
Route::post('/dang-nhap-plugin', 'UserController@login')->name('loginSystem');

Route::post('/{slug}/dang-nhap-plugin-game', 'UserController@loginGame')->name('loginSystem');
Route::post('/dang-nhap-plugin-game', 'UserController@loginGame')->name('loginSystem');
Route::post('/dang-nhap-plugin-game', 'UserController@loginGame')->name('loginSystem');


Route::get('/thong-tin-tong-quan', 'HomepageController@thongtintongquan')->name('homePage');
Route::get('/tham-gia-chuong-trinh-qua-tang', 'HomepageController@formReward')->name('homePage');
Route::get('/{slug}/thong-tin-tong-quan', 'HomepageController@thongtintongquan')->name('redireHOmePage');
Route::get('/trang-chu', 'HomepageController@test')->name('homePage');
Route::get('/bat-dau-soi-da', 'HomepageController@start')->name('homePage');
Route::get('/{slug}/lich-su-soi-da/{id}', 'HomepageController@history');
Route::get('/{slug}/lich-su-soi-da', 'HomepageController@history');
Route::get('/lich-su-soi-da', 'HomepageController@history')->name('redireHOmePage');




Route::get('/makeup', 'HomepageController@redireHomePage')->name('redireHOmePage');
Route::get('/makeup/{slug}', 'HomepageController@redireHomePage')->name('redireHOmePage');

Route::get('/{slug}', 'HomepageController@skinIndex')->name('homePage');





Route::post('/{slug}/dang-xuat-he-thong', 'UserController@logout')->name('logoutUser');

Route::post('/dang-xuat-he-thong', 'UserController@logout')->name('logoutUser');

Route::post('/dang-xuat-sale', 'UserController@logoutSale')->name('logoutUser');
Route::post('/dang-xuat-khach-hang', 'UserController@logoutUser')->name('logoutUser');



Route::get('/{slug}/get-my-info', 'ProfileController@getInfo')->name('getInfo');

Route::get('/get-my-info', 'ProfileController@getInfo')->name('getInfo');

Route::post('/{slug}/update-end-user', 'ProfileController@update')->name('update');

Route::post('/update-end-user', 'ProfileController@update')->name('update');


Route::post('/them-moi-khach-hang', 'ProfileController@saleAddUser')->name('saleAddUser');
Route::post('/{slug}/them-moi-khach-hang', 'ProfileController@saleAddUser')->name('saleAddUser');
// Route::get('lichsu-soida', 'HistoryController@historySoida');
