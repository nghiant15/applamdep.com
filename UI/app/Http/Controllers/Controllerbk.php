<?php

namespace App\Http\Controllers;

define('API_BaseUrl', env('API_URL', 'https://api-soida.applamdep.com') );
define('API_URL_Tikitech', env('API_URL_Tikitech', '') );
define('EndUser_Add',   "api/add-end-user");
define('Collaborators_Add',   "api/collaborator/add");
define('Collaborators_GetAllCustomer',   "api/collaborator/getAllCustomer");
define('Collaborators_GetAllCampaign',   "api/collaborator/getAllCampang");
define('SaleAddUser',   "api/sale-add-user");
define('EndUser_GetInfo',   "api/get-end-user-byId");
define('EndUser_Update',   "api/update-end-user");
define('EndUser_Login',   "api/login-end-user2");
// define('CompanyGlobalId',   "621c2ec17abc0b6b4349d4e5");
define('EndUser_SaveHistory',   "api/add-history-skin-plugin");

define('EndUser_SaveHistory_no_user',   "api/add-history-no-user");

define('EndUser_GetHistory',   "api/get-history-skin-by-user");

define('EndUser_GetHistoryById',   "api/get-detail-history-by-id");

define('Get_Recomend_Pproduct',   "itemSdk/get_product_result");

define('Brand_GetAll',   "api/banner/all");
define('Facebook_login', "api/login-with-facebook");


define('Makeup_GetAllBrand',   "types");
define('Makeup_GetColoyById',   "get-by-colorId");
define('Makeup_GetMakeupColor',   "api/get-makeup-color");
define('Makeup_GetRecomendProduct',   "api/get-makeup-data");

define('System_color_get',   "api/get-config-color");

define('config_get_by_key',   "api/config/getAll");

define('concludeGetByLevel',   "api/paramenterRecomed/getAllByLevel");
define('overviewUrl',   "api/paramenterRecomed/get-tu-van-tong-quan");
define('resultUrl',   "api/paramenterRecomed/get-ket-luan-chi-tiet");


define('api_skin_request',   "api/skin/request/evoucher");
define('api_makup_request',   "api/skin/makup");
define('Booking_add',   "api/booking/add");
define('Banner_getAll',   "api/banner_embedd/getAll");
define('Footer_getAll',   "api/footerPage/getAll");
define('Footer_getAll_Child',   "api/footerPage/getAll");
define('Admin_Login',   "api/plugin-login_pg");


define('Check_slug',   "api/check-access-url");

define('Check_hasRecevedVoucher',   "/api/evoucher/checkHasRecieved");

define('api_get_campaign',   "api/campaign/getAll");

define('api_push_voucher',   "api/evoucher/pushVoucher");

define('Customer_get_Voucher',   "api/evoucher/requestVoucher");

define('checkHasRecieved',   "api/evoucher/checkHasRecieved");
define('UserGetAllVoucher',   "api/user/getAllVoucher");

define('ConfigGetBySlug',   "api/config/getWebBySlug");


define('UserGetAllHistory',   "api/user/getAllHistory");


use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Jenssegers\Agent\Agent;
use Illuminate\Http\Request;

use GuzzleHttp\Client;
use Illuminate\Routing\Controller as BaseController;
use View;
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    private  $CompanyGlobalId;

    public function __construct()
    {    
      // dd(request()->getPathInfo());
      $slugInput = request()->segment(1);

 
      if($slugInput)
      {

      }
      else 
      {
         $slugInput= "soida";
      }
      $urlGetConfig = "https://api-soida.applamdep.com/api/config/getInfoWeb";
      $client = new Client();
      $res = $client->request('post', $urlGetConfig, [
         'json' => [
               'slug'=> $slugInput
            ]
      ]);
      if($res->getStatusCode() ==200)
      {
         $checkresult = $res->getBody()->getContents();
         $checkresult = json_decode($checkresult);

        
   
         
         if($checkresult->is_success)
         {
            $result  = $checkresult->data;

            
               
            
            if($result == null)
            {
               
               View::share('globalColor',  null );
               View::share('globalData',  null); 
               View::share('infobeauty',  null); 
            }
            else 
            {

               
                  View::share('globalColor',  $result->dataColor );
                  View::share('globalData',  $result->data->value );  
                  View::share('infobeauty',   $result->infobeauty); 
            }
         }

      }
      
    }


    public function setCompanyId($companyId=null)

    {      

         
       session(['companyId' =>$companyId]);

    }

    public function setdataInfoCompany($dataCompany=null)

    { 
         session(['dataInfoCompany' =>$dataCompany]);

    }

    public function getdataInfoCompany()

    { 
         $info  =  session('dataInfoCompany', null);
         return $info;
    }
    
    public function getCompanyId()
    {  
        $dataInfoCompany = $this->getdataInfoCompany();

        if($dataInfoCompany)
        {
         return $dataInfoCompany->_id;
        }
        else 
        {
         return null;
        }
           
    }



    public function setDataSale($dataSale=null)

    { 
       
     session(['dataSale' => $dataSale]);

     // $this->CompanyGlobalId = $companyId;

           
    }
    public function getSaleId()
    { 
        $dataSale =    session('dataSale', null);

        if($dataSale)
        {
           try {
              return $dataSale->data->_id;
           } catch (\Throwable $th) {
              return $dataSale->_id;
           }
           
        }
        else 
        {
           return null;
        }
     }

     public function getHistoryId()
     { 
         $historyId =  session('historyId', null);

         if($historyId)
         {
        
              return $historyId;
          }
         else 
         {
            return null;
         }
      }

      public function setHistoryId($historyId = null) 

    {      
          
       session(['historyId' => $historyId]);
       
     // $this->CompanyGlobalId = $companyId;

           
    }

    public function callRequest($bodyRequest, $url)
    {
     $loginUrl = $url;
     $client = new Client();
     $res = $client->request('post',$loginUrl , [
         'json' => $bodyRequest
     ]);

     
      if($res->getStatusCode() ==200)
     {
         $checkresult = $res->getBody()->getContents();
         $checkresult = json_decode($checkresult);
         if($checkresult->is_success)
         {
             $result  = $checkresult->data;
             
             if($result == null)
             {
                 return  false;
             }
             else 
             { 
                  session(['dataCompany' => $checkresult->data]);
             }
             
            return  [
               
                        "is_success" =>true ,
                        "message" =>"Đăng nhập thành công"
                     ]; 
             
         }
      
         return  ["is_success" =>false];
        
      }
     return false;

    }


    public function callRequestV2  ($bodyRequest, $url)
    {
     
     $loginUrl = $url;
     $client = new Client();
     $res = $client->request('post',$loginUrl , [
        'json' => $bodyRequest
     ]);
     
     if($res->getStatusCode() ==200)
     {
        $checkresult = $res->getBody()->getContents();
        $checkresult = json_decode($checkresult);
        if($checkresult->is_success)
        {
           $result  = $checkresult->data;
           return $checkresult->data;
        }
        return  ["is_success" =>false];     
        
      }
      return false;

    }

    public function   checkVoucherReceived  ($bodyRequest, $url)
    {
     
     $loginUrl = $url;
     $client = new Client();
     $res = $client->request('post',$loginUrl , [
        'json' => $bodyRequest
     ]);
     
     if($res->getStatusCode() ==200)
     {
        $checkresult = $res->getBody()->getContents();
        $checkresult = json_decode($checkresult);
        if($checkresult->is_success)
        {
           $result  = $checkresult->data;
           return $checkresult->data;
        }
        return  ["is_success" =>false];     
        
      }
      return false;

    }
    
    public function loginUser ($dataRequest) 
    {
       
        $loginUrl = API_BaseUrl."/".EndUser_Login;
        return $this->callRequest($dataRequest,$loginUrl );
       
    }

    public  function get_ip() {
     $keys = array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR');
 
     foreach ($keys as $key) {
         if (array_key_exists($key, $_SERVER) === true) {
             foreach (explode(',', $_SERVER[$key]) as $ip) {
                 if (filter_var($ip, FILTER_VALIDATE_IP) !== false) {
                     return $ip;
                 }
             }
         }
     }
 }
}
