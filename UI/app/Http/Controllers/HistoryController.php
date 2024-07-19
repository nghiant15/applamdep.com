<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use GuzzleHttp\Client;
use Jenssegers\Agent\Agent;
use PhpParser\Node\Expr\FuncCall;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;


class HistoryController extends Controller
{
    public function GetAllHistory(Request $request)
    {
          
                $urlRequest = API_BaseUrl."/".UserGetAllHistory;  
                $dataUserSession =  session('dataCompany', null);

            
                if($dataUserSession)
                {

                }
                else 
                {
                return  ["is_success" =>false];
                }

                $dataUser =  $dataUserSession->data;
                $dataUser->token = $dataUserSession->token;
                $slug =  null;
                if ($request->has('slug')) {
                $slug   =   $request->input('slug');
                }
                $phoneNumber = $dataUser->phone;
                $dataUpdate = [
                    "slug" => $slug,
                    "phoneNumber"=>  $phoneNumber,
                    "company_id"=> $this->getCompanyId()
                ];
       
                $client = new Client();
                $res = $client->request('post',$urlRequest , [
                    'json' =>$dataUpdate
                ]);
                if($res->getStatusCode() ==200)
                {
                $checkresult = $res->getBody()->getContents();
                $checkresult = json_decode($checkresult);
                if($checkresult->is_success)
                {
                        return  [
                            "is_success" =>true , 
                            "data"=> $checkresult 
                        ];
                    
                }
                return  [
                        "is_success" =>false , 
                        "data"=> $checkresult 
                ];
                }
                return  ["is_success" =>false];
    }

    public function CheckUrl ($slug) 
    {

     
        $checkacssSlugUrl ="https://api-soida.applamdep.com/api/check-access-slug";
        $client = new Client();

        $res = $client->request('post', 'https://api-soida.applamdep.com/api/check-access-slug', [
            'json' => [
                'slug'=> $slug
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
                    return  false;
                }
                else 
                {
                    $this->setdataInfoCompany ($checkresult->data->company_data);
;                    
                }
            
                return $result->isAccess;
            }
             return  false;
           
         }
        return false;

    }
    public function hisTorySoida (Request $request, $slug =null) 
    {
       
        $isCheck  = true;

        if($slug == "" ||$slug ==null)
        {
            $this->setdataInfoCompany(null);            
        }
        else 
        {
            $isCheck = $this->CheckUrl($slug);
        }  

      
        if(!$isCheck)
        {
              return view("notfound");
         }
         
        // dd($companyGlobalId);

        // if($slug){
            
        //     $checkAccessSlug  =  $this->checkAccess($request, $slug, null);
           
        //     $isAccess = $checkAccessSlug["is_success"];
        //    if($isAccess)
        //    {
        //         $dataSlug =  $checkAccessSlug["data"];
        //         // dd($dataSlug);
        //         $this->setCompanyId ($dataSlug->data->data->resultCompany->_id);

            
  
        //    }
        //    else 
        //    {

            
             
        //        return view("404.notfound");
        //     }
        //  }
        //  else 
        //  {
         
        //     $this->setCompanyId ("");
        // }

        // $this->getColorSystem($request);
        // $this->getDataInfo($request);

        $companyGlobalId = $this->getCompanyId();
        
       
        $dataUserSession =  session('dataCompany', null);
        $companyGlobalId = $this->getCompanyId();

        if($slug){
            
        //     $checkAccessSlug  =  $this->checkAccess($request, $slug, null);
           
        //     $isAccess = $checkAccessSlug["is_success"];
        //    if($isAccess)
        //    {
        //         $dataSlug =  $checkAccessSlug["data"];
        //         $this->setCompanyId ($dataSlug->data->data->resultCompany->_id);

            
  
        //    }
        //    else 
        //    {

            
             
        //        return view("404.notfound");
        //     }
         }
         else 
         {
         
            $this->setCompanyId ("");
        }

        // $this->getColorSystem($request);
        $dataUser =null;
        if($dataUserSession)
        {
            $dataUser =  $dataUserSession->data;
            $dataUser->token = $dataUserSession->token;
            // dd($dataUser);
            // $dataUser = $this->getInfo($request);
            // $dataUser = $dataUser["data"]->data;
        }
        else 
        {
            return redirect('/');
        }
        $isCheck  = true;
        if($slug == "" ||$slug ==null)
        {

        }
        else 
        {
            // $isCheck = $this->CheckUrl($slug);
        }
    
         if(!$isCheck)
        {
               return view("404.notfound");
        }
        $companyGlobalId = $this->getCompanyId();
        $agent = new Agent();
  
        return view("history.historySoida", compact("slug", "dataUser","companyGlobalId","agent"));
     }

     public function getHistory ( Request $request )
     {
         $dataUserSession =  session('dataCompany', null);
         if($dataUserSession)
         {
         }
         else 
         {
             return response()->json(['message' => 'Chưa đăng nhập hệ thống'], 401);
         }
         $tokenCode =  $dataUserSession->token;
         // dd($tokenCode);
         $dataUpdate = [
              "company_id"=> $this->getCompanyId()
         ];
         $loginUrl = API_BaseUrl."/".EndUser_GetHistory;
         $client = new Client();
         $res = $client->request('get',$loginUrl , [
         'headers' => 
         [
             'Authorization' => "Bearer ".$tokenCode
         ],
         'json' =>$dataUpdate
         ]);
          if($res->getStatusCode() ==200)
         {
         
 
             $checkresult = $res->getBody()->getContents();
             $data = json_decode($checkresult);
             
              if($data->is_success)
            {
                 
                 
                  return $data;
                   
            }
            return  [
             "is_success" =>false , 
             "data"=> null
             ];
         }
         else 
         {
             return response()->json(['message' => 'Lấy lịch sử thất bại'], $res->getStatusCode() );
         }
        
     }
    
   
     public function SaveHistory (Request $request, $slug =null, $saleId =null) 
     {
     
      
        $ipClient = $this->get_ip();

        // if($ipClient =="127.0.0.1" || $ipClient =="192.168.1.24" || $ipClient ="125.235.233.250" )
        // {
        //     $ipClient = "118.69.182.32";
        // }
        $connectionType = $request->input('connectionType',"");
        $timeConnection = $request->input('timeConnection',"");
        $successGame   =  session('successGame', false);
        $typeLogin =  session('typeLogin', null);
        $gameJoinType1 = session('gameJoinType1', false);
        $ageGame =  session('ageGame', null);
        $ageGameReal =  session('ageGameReal', null);
        
        $gameType =session('gameType', "");
        $client1 = new Client();
        $linkUrl = "http://ip-api.com/json/".$ipClient;
        $res1 = $client1->request('get',$linkUrl);
         if($res1->getStatusCode() ==200)
        {
            $checkresult1 = $res1->getBody()->getContents();
            $data1 = json_decode($checkresult1);
            
                $dataJson = $request->json()->all();
                $result  = $dataJson['Result'];
                $loginUrl = API_BaseUrl."/".EndUser_SaveHistory;
                $dataUserSession =  session('dataCompany', null);
                $tokenCode ="";
              
                if($dataUserSession)
                {
                    $tokenCode =  $dataUserSession->token;
                }
                else 
                {
                    $loginUrl = API_BaseUrl."/".EndUser_SaveHistory_no_user;
                }
                $email =  $request->input("email");
                $imageObject = json_decode($result);
                $imagelInk =  "";
                if($imageObject)
                {
                    try {
                        $imagelInk = $imageObject->facedata->image_info->url;
                    } catch (\Throwable $th) {
                        $imagelInk = $imageObject->data->facedata->image_info->url;
                    }
                }
             
                $slug = $slug;
                $dataUpdate = [
                    "Company_Id"=> $this->getCompanyId(),
                    "Image"=> $imagelInk,
                    "slug"=> $slug,
                    "ipClient" => $ipClient,
                    "regionName"=>$data1->regionName,
                    "dataCheckRegion"=> $data1,
                    "slug2"=> "tikicare",
                    "ageGame"=>$ageGame,
                    "ageGameReal"=> $ageGameReal,
                    "ipRequest" => $this->get_ip(),
                    "Sale_Id"=>  null,
                    "gameType"=> $gameType,
                    "gameJoinType1"=> $gameJoinType1,
                    "successGame"=> $successGame,
                    "typeLogin"=>$typeLogin,
                    "connectionType"=>  $connectionType,
                    "timeConnection"=>0,
                    "Result"=> $result
                ];
                $client = new Client();
                $res = $client->request('post',$loginUrl , [
                                        'headers' => 
                                        [
                                            'Authorization' => "Bearer ".$tokenCode
                                        ],
                                        'json' =>$dataUpdate
                                        ]   
                );
                if($res->getStatusCode() ==200)
                { 
                    $checkresult = $res->getBody()->getContents();
                    $checkresult = json_decode($checkresult);
                    $this->setHistoryId($checkresult->data->_id);
                    session(['noUser' =>  true]);
                    return  [
                            "is_success" =>true
                        ];
                }
                return  ["is_success" =>false];
             }
}
    


 

   
public function AddClickZalo (Request $request) 
{
         $historyId = $this->getHistoryId();
        if($historyId)
        {
        
    
       
        $connectionType = $request->input('connectionType',"");
    
        $dataUpdate = [
        "connectionType"=> $connectionType,
        "historyId"=>$historyId

        ];
        $client = new Client();
        $res = $client->request('post',"https://api-soida.applamdep.com/api/add-type-contact" , [
        'json' =>$dataUpdate
        ]   
        );
         return  ["is_success" =>true];
        }

        return  ["is_success" =>false];
 }

 public function addClickZalo2 (Request $request) 
{
         $historyId = $this->getHistoryId();
         
         $connectionType = $request->input('connectionType',"");
         if($connectionType =="minisize")
         {

         }
    
         $dataUpdate = [
            "location" => $this->get_ip(),
            "connectionType"=> $connectionType,
            "Company_Id"=> $this->getCompanyId()
         ];
         $client = new Client();
         $res = $client->request('post',"https://api-soida.applamdep.com/api/add-type-contact2" , [
         'json' =>$dataUpdate
         ]   
         );
          return  ["is_success" =>true];
       
 }


     public function setType (Request $request) 
     {
          session(['typeLogin' => $request->input("typeLogin")]);

     }
   
    
}


