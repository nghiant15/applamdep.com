<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use GuzzleHttp\Client;
use Jenssegers\Agent\Agent;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use PhpParser\Node\Expr\FuncCall;

use View;


use Illuminate\Support\Facades\Cache;

class HomepageController extends Controller
{

   
    public function redireHomePage(Request $request, $slug =null )
    {
        return redirect('/');
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

    public function start (Request $request, $slug =null) 
    { 
        return view("start", compact("slug"));
    }


public function getDataInfo (Request $request) 
{
    
    $dataInfo =  session('dataInfo', null);
    $params = [
    'query' => [
        "key"=> "webinfo",
        'company_id'=> $this->getCompanyId()
    ]
    ];
    $dataUpdate = [
        
    ];

    

    $url = API_BaseUrl."/".config_get_by_key;
    $client = new Client();
    $res = $client->request('get',$url ,$params);
    if($res->getStatusCode() ==200)
    { 
        $checkresult = $res->getBody()->getContents();
        $data = json_decode($checkresult);
        if($data->is_success)
        {
            $dataInfo = json_decode($data->data[0]->Value);
        
        
            Cache::put('webinfo', $dataInfo->value);
            return $data;
            
        }  
        
        return  [
            "is_success" =>false , 
            "data"=> null
        ];
    }
    else 
    {
        session(['webinfo' =>[]]);
    }
}


    public function getDataInfoAdmin (Request $request) 
    {
         $dataInfo = session('dataInfo_admin', null);
         $params = [
          'query' => [
              "key"=> "webinfo_admin",
              'company_id'=>"-1"
          ]
       ];
        $dataUpdate = [
           
        ];
    
        $url = API_BaseUrl."/".config_get_by_key;
        $client = new Client();
        $res = $client->request('get',$url ,$params);
       
        if($res->getStatusCode() ==200)
        { 
            $checkresult = $res->getBody()->getContents();
            $data = json_decode($checkresult);
            
          
            if($data->is_success)
            {
                
                $dataInfo = json_decode($data->data[0]->Value);
                
                Cache::put('webinfo_admin', $dataInfo->value);
                return $data;
                  
             }  
             
            return  [
                "is_success" =>false , 
                "data"=> null
             ];
        }
        else 
        {
            session(['webinfo_admin' =>[]]);
        }
    }

    public function getColorSystem (Request $request) 
    {
       
        $bannerSession =  session('dataColor', null);
        $companyId =  $this->getCompanyId();
        if( $companyId == null ||  $companyId ==  "")
        {
            
            session(['dataColor' =>[]]);
            return;
        }
        $dataUpdate = [  ];
        $url = API_BaseUrl."/".System_color_get."/".$this->getCompanyId();
        $client = new Client();
        $res = $client->request('get',$url , [
            'json' =>$dataUpdate
        ]);
        if($res->getStatusCode() ==200)
        { 
            $checkresult = $res->getBody()->getContents();
            $data = json_decode($checkresult);

            
            if($data->is_success)
            {
                session(['dataColor' =>$data]);
                Cache::put('dataColor', $data->data);
                return $data;
                  
             }  
            return  [
                "is_success" =>false , 
                "data"=> null
             ];
        }
        else 
        {
            session(['dataColor' =>[]]);
        }
    }


    public function getAllFooterPage ( )
    {
        return;
        $dataUpdate = [
            
            // "company_id"=>  $this->getCompanyId()
        ];
        
        $params = [
        'query' => [
            'company_id' => "-1",
           

        ]
     ];
        $url = "https://api.deal24h.vn"."/".Footer_getAll;
      $client = new Client();
      $res = $client->request('get', $url, $params);
         if($res->getStatusCode() ==200)
        {
            // return  ["is_success" =>false];

            $checkresult = $res->getBody()->getContents();
            $data = json_decode($checkresult);

           
            
             if($data->is_success)
           {
               
                Cache::put('allFooter', $data->data);
           
            
                  
           }
        
        }
        else 
        {
            return response()->json(['message' => 'Lấy lịch sử thất bại'], $res->getStatusCode() );
        }
       
    }
    
    public function index (Request $request, $slug =null) 
    {  
        
        $typeLogin =  session('typeLogin', null);
       
        $dataUpdate = [];
        
        $params = [
        'query' => [
            'company_id' => "-1"
             ]
        ];
        $url = "https://api-soida.applamdep.com/api/baner/getAllBannerWeb";
        $client = new Client();
        $res = $client->request('get', $url, $params);

        $dataGlobal =null;
        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
            $data = json_decode($checkresult);
            $dataGlobal = $data->data;

        }


        $this->getDataInfoAdmin($request);
        if (Cache::has('webinfo')) {

        }
        else 
        {
            $this->getDataInfo($request);

        }
         if (Cache::has('allFooter')) {
              
        }
        else 
        {   
            $this->getAllFooterPage();  
        }     
        $dataColorSesion =  session('dataColor', null);
        if($dataColorSesion)
        {
        }
        else 
        {
            $this->getColorSystem($request);
        }
        $dataUserSession =  session('dataCompany', null);
        $companyGlobalId = $this->getCompanyId();
        $dataUser =null;
        if($dataUserSession)
        {
           $dataUser =  $dataUserSession->data;
            $dataUser->token = $dataUserSession->token;
            
        }
        
        $isCheck  = true;
        if($slug == "" ||$slug ==null)
        {

        }
        else 
        {
            $isCheck = $this->CheckUrl($slug);
        }  
        if(!$isCheck)
        {
        return view("404.notfound");
       
        }
        $companyGlobalId = $this->getCompanyId();
        $agent = new Agent();
        return view("campaign.bannerCampaign", compact("slug","dataGlobal","dataUser","companyGlobalId","agent"));
       
    }


    public function indexBook (Request $request, $slug =null) 
    {  
        
        $typeLogin =  session('typeLogin', null);
       
        $dataUpdate = [];
        
        $params = [
        'query' => [
            'company_id' => "-1"
             ]
        ];
        $url = "https://api-soida.applamdep.com/api/baner/getAllBannerWeb";
        $client = new Client();
        $res = $client->request('get', $url, $params);

        $dataGlobal =null;
        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
            $data = json_decode($checkresult);
            $dataGlobal = $data->data;

        }


        $this->getDataInfoAdmin($request);
        if (Cache::has('webinfo')) {

        }
        else 
        {
            $this->getDataInfo($request);

        }
         if (Cache::has('allFooter')) {
              
        }
        else 
        {   
            $this->getAllFooterPage();  
        }     
        $dataColorSesion =  session('dataColor', null);
        if($dataColorSesion)
        {
        }
        else 
        {
            $this->getColorSystem($request);
        }
        $dataUserSession =  session('dataCompany', null);
        $companyGlobalId = $this->getCompanyId();
        $dataUser =null;
        if($dataUserSession)
        {
           $dataUser =  $dataUserSession->data;
            $dataUser->token = $dataUserSession->token;
            
        }
        
        $isCheck  = true;
        if($slug == "" ||$slug ==null)
        {

        }
        else 
        {
            $isCheck = $this->CheckUrl($slug);
        }  
        if(!$isCheck)
        {
        return view("404.notfound");
       
        }
        $companyGlobalId = $this->getCompanyId();
        $agent = new Agent();
        if( $agent->isMobile())
        {
            return view("book.mobileCa", compact("slug","dataGlobal","dataUser","companyGlobalId","agent"));
        }
        return view("book.bannerCampaign", compact("slug","dataGlobal","dataUser","companyGlobalId","agent"));
       
    }

    
    private function checkGameStatus($slug)
    {

        $url ="https://api-soida.applamdep.com/api/get-game-active";
        $client = new Client();

        $res = $client->request('get', $url, [
            'json' => [
                'slug'=> $slug
              ]
        ]);

        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
            $checkresult = json_decode($checkresult);
            $result = $checkresult->data;
            if (str_contains($result->slugApply, $slug)) { 
                session(['dataGame' =>$result]);
                return true;
            }
            else 
            {
                session(['dataGame' =>null]);
            }
            session(['dataGame' =>null]);
         }
         session(['dataGame' =>null]);
         return false;
    }
    private function getDataById($id)
    {
    
        $url ="https://api-soida.applamdep.com/api/getInfoUser?id=".$id;
        $client = new Client();
        $res = $client->request('get', $url, [
            'json' => [
                'id'=> $id
              ]
        ]);

        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
            $checkresult = json_decode($checkresult);
          
            $result = $checkresult->data;

           
            return $result;
          
           
         }
         
         return null;
    }

    private function getBeauty($slug)
    {
    
        $url ="https://api-soida.applamdep.com/api/gameBeauty/getInfo2?slug=".$slug;
        $client = new Client();

        $res = $client->request('get', $url, [
            'json' => [
                'slug'=> $slug
              ]
        ]);

        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
            $checkresult = json_decode($checkresult);
          
            $result = $checkresult->data;

           
      
          
              session(['beautyData' =>$result]);
         }
         
         return false;
    }

    private function getTuVan($slug)
    {
    
        $url ="https://api-soida.applamdep.com/api/tuvan/getInfo2?slug=".$slug;
        $client = new Client();

        $res = $client->request('get', $url, [
            'json' => [
                'slug'=> $slug
              ]
        ]);

        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
            $checkresult = json_decode($checkresult);
          
            $result = $checkresult->data;

           
      
          
              session(['TuVanData' =>$result]);
         }
         
         return false;
    }

    private function getGameXemtuong($companyId)
    {

        $url ="https://api-soida.applamdep.com/api/xemtuong/getInfoAdmin";
        $client = new Client();
      

        $res = $client->request('get', $url, [
            'query' => [
                'company_id'=> $companyId
              ]
        ]);

        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
            $checkresult = json_decode($checkresult);
            $result = $checkresult->data;
           
            session(['dataXemtuong' =>$result]);
             return $result;
            
         }
      
         return null;
    }
    private function getGameActive($companyId)
    {

        $url ="https://api-soida.applamdep.com/api/get-game-active";
        $client = new Client();
      

        $res = $client->request('get', $url, [
            'json' => [
                'companyId'=> $companyId
              ]
        ]);

        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
            $checkresult = json_decode($checkresult);
            $result = $checkresult->data;
            session(['dataGame' =>$result]);
            
            return $result;
            
         }
      
         return null;
    }

    private function getGameMinisize($companyId)
    {

        $url ="https://api-soida.applamdep.com/api/minisize/getInfoAdmin";
        $client = new Client();
      

        $res = $client->request('get', $url, [
            'query' => [
                'company_id'=> $companyId
              ]
        ]);

        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
            $checkresult = json_decode($checkresult);
            $result = $checkresult->data;
           
            session(['dataminisize' =>$result]);
             return $result;
            
         }
      
         return null;
    }
    public function skinIndex (Request $request, $slug =null) 
    {

        $this->getTuVan($slug);
        
        $this->setHistoryId(null);
        // $historyId =  session('historyId', null);
    
        // if($slug=="soida")
        // {
        //     return redirect()->to('/ngocdung');
        // }
        $isCheck  = true;
        $isTurnOfFooter =  true;

        if($slug == "" ||$slug ==null)
        {
            $this->setdataInfoCompany(null);            
        }
        else 
        {
            $isCheck = $this->CheckUrl($slug);
        } 

        $dataCompanyId =  $this->getCompanyId();
       
       
        $this->getBeauty($slug);
       


        $dataGame = $this->getGameActive($dataCompanyId);

      

        $gameMinisize = $this->getGameMinisize($dataCompanyId);
      
   
        if( $dataGame != null)
        {
            $fromDate = Carbon::parse($dataGame->fromDate); 
            $todate = Carbon::parse(  $dataGame->todate); 
            $currentTime = Carbon::now()->addHour(7);
            $turnOnGame =false;
            if( $currentTime >= $fromDate && $currentTime <= $todate  )
            {
    
             session(['turnOnGame' =>true]);
                $turnOnGame =true;
            }
        }
        else 
        {
            session()->forget('turnOnGame');
        
        }
      
       
      
        if(!$isCheck)
        {
            return view("notfound");
       
        }
        $agent = new Agent();
        $gameJoinTo= false;

        $dataUserSession =  session('dataCompany', null);

     

        if($dataUserSession)
        {
            $dataUserId=  $dataUserSession->data->_id;
         
           
            $dataUserSession->data = $this->getDataById($dataUserId);
            session(['dataCompany' =>$dataUserSession]);
            $dataUserSession =  session('dataCompany', null);

         
        }

      
        if($dataUserSession)
        {
            $isTurnOfFooter=false;
        }
        else 
        {
       
        }

        if($slug =="demo" || $slug =="demoweb" || $slug =="soida")
        {
            return view("welcomeZalo", compact("slug","agent","isTurnOfFooter","gameJoinTo"));
        }
        else  if($slug =="xemtuong")
        {
            $gameXemtuong = $this->getGameXemtuong($dataCompanyId);
        
            
            return view("xemtuong", compact("slug","agent","isTurnOfFooter","gameJoinTo"));
        }
        else 
        { 
            return view("welcomeNormal", compact("slug","agent","isTurnOfFooter","gameJoinTo"));
        }

        
        if($slug !="")
        {
           
        }
      
        return view("welcome", compact("slug","agent","isTurnOfFooter","gameJoinTo", "turnOnGame"));
    }

    public function booking (Request $request, $book = null) 
    {
         $this->setHistoryId(null);
        $slug ="book";
      

       
        $isCheck  = true;
        $isTurnOfFooter =  true;

        if($slug == "" ||$slug ==null)
        {
            $this->setdataInfoCompany(null);            
        }
        else 
        {
            $isCheck = $this->CheckUrl($slug);
        } 

        $dataCompanyId =  $this->getCompanyId();
       
       
        $this->getBeauty($slug);
         if(!$isCheck)
        {
            return view("notfound");
       
        }
        $agent = new Agent();
        $gameJoinTo= false;

        $dataUserSession =  session('dataCompany', null);

     

        if($dataUserSession)
        {
            $dataUserId=  $dataUserSession->data->_id;
         
           
            $dataUserSession->data = $this->getDataById($dataUserId);
            session(['dataCompany' =>$dataUserSession]);
            $dataUserSession =  session('dataCompany', null);

         
        }

      
        if($dataUserSession)
        {
            $isTurnOfFooter=false;
        }
        else 
        {
       
        }

        
        $turnOnGame = false;
        $slugBook = $book;


        if($slug !="")
        {
            return view("bookingZalo", compact( "slugBook", "slug","agent","isTurnOfFooter","gameJoinTo"));
        }
       
        return view("bookingZalo", compact("slugBook","slug","agent","isTurnOfFooter","gameJoinTo", "turnOnGame"));
    }
    

    public function result (Request $request, $slug =null) 
    {
        $data  =  session('dataResult', null);
        $dataGame = Session('dataGame', null);
         $this->getTuVan($slug);
         

        $contetnFail ="Chúc Quý khách may mắn lần sau NHƯNG  bạn vẫn được nhận  Ưu Đãi từ Nhãn Hàng chính hãng tài trợ";
        $contentSuccess = "CHÚC MỪNG BẠN ĐÃ TRÚNG THƯỞNG";
      
        $dataUserSession =  session('dataCompany', null);

        $displayGame = true;
        if($dataUserSession)
        {
            $displayGame = false;
        }

        $dataUserSession =  session('dataCompany', null);

     

        if($dataUserSession)
        {
            $dataUserId=  $dataUserSession->data->_id;
         
           
            $dataUserSession->data = $this->getDataById($dataUserId);
            session(['dataCompany' =>$dataUserSession]);
            $dataUserSession =  session('dataCompany', null);

         
        }
        
        $turnOffGame = false;
        $successGame = false;
        $ageGame = 0;
        $ageGameReal=0;
        $gameType = 1;



        session(['gameJoinType1' =>false]);
        if( $dataGame != null)
        {
               
                $contetnFail = $dataGame->popupfail;
            
                $contentSuccess = $dataGame->pupupSuccess;
                $currentTime = Carbon::now()->addHour(7);
                $converTextString = $currentTime->format('H:i');
                $fromDate = Carbon::parse($dataGame->fromDate); 
                $todate = Carbon::parse(  $dataGame->todate); 
                $timefrom = $dataGame->fromtime;
                $timeto = $dataGame->totime;
                if( $currentTime >= $fromDate && $currentTime <= $todate  )
                {
                    session(['gameJoinType1' =>True]);
                    $skin =  $data->data->facedata->generalResult->data[0]->data[0]->value;

                    session(['ageGame' =>$skin]);
                    session(['ageGameReal' =>$skin]);
                    if($timefrom<= $converTextString && $converTextString <=$timeto)
                    {
                       
                        if($dataGame->typeGame =="1")
                        {
                            session(['ageGame' =>$skin]);
                            session(['ageGameReal' =>$skin]);
                           
                            if( $skin*1  == $dataGame->skinNumber*1)
                            {
                                $successGame = true;
                            
                                
                          
                               
                                session(['gameType' =>1]);
                            }
                            else 
                            {
                                $successGame = false;
                            }
                        }
                        
                      
                       
                    }
                    else 
                    {
                       

                        if( $skin*1  == $dataGame->skinNumber*1)
                        {
                            $successGame = true;
                          
                      
                            session(['ageGame' =>($skin*1 + 1)]);
                            session(['ageGameReal' =>$skin]);
                            session(['gameType' =>1]);
                        }
                        else 
                        {
                            $successGame = false;
                        }

                        $successGame = false;
                    }
                }
         }

         

         session(['successGame' =>$successGame]);

       
      
        //  if($slug =="soida")
        // {
        //     $slug = null;
        // }
        // if($slug == null )
        // {

        // }
        $companyId = $this->getCompanyId();
 
        $agent = new Agent();
        $turnOffGame = false;
      
        $rewardCheck  =  session('rewardCheck', false);
         $gameJoinType1 =true;
     
         $gameMinisize = $this->getGameMinisize($companyId);
       
        if($slug !="")
        {
          
        }
        
        if($slug =="demo"  || $slug =="soida")
        {
            return view("resultZalo", compact("slug", 
             "ageGame","ageGameReal","gameType","gameJoinType1",
             "contetnFail", "contentSuccess",  "agent","companyId", "displayGame", "rewardCheck", "turnOffGame","successGame","dataGame")); 
        }
        else  if($slug =="demoweb" )
        {
            return view("demo", compact("slug", 
             "ageGame","ageGameReal","gameType","gameJoinType1",
             "contetnFail", "contentSuccess",  "agent","companyId", "displayGame", "rewardCheck", "turnOffGame","successGame","dataGame")); 
        }
       else if($slug =="xemtuong")
        {

            $gameXemtuong = $this->getGameXemtuong($companyId);
            return view("resultXemtuong", compact("slug", 
             "ageGame","ageGameReal","gameType","gameJoinType1",
             "contetnFail", "contentSuccess",  "agent","companyId", "displayGame", "rewardCheck", "turnOffGame","successGame","dataGame")); 
        }
        else 
        {
            
            return view("resultNormal", compact("slug", 
              
            "ageGame","ageGameReal","gameType","gameJoinType1",
             "contetnFail", "contentSuccess",  "agent","companyId", "displayGame", "rewardCheck", "turnOffGame","successGame","dataGame")); 
        }

     

        return view("result", compact("slug", "contetnFail", "contentSuccess",  "agent","companyId", "displayGame", "rewardCheck", "turnOffGame","successGame","dataGame"));
    }

    public function resultBook (Request $request, $book =null) 
    {
        $slug = "book";
        $data  =  session('dataResult', null);
        $dataGame = Session('dataGame', null);
        $contetnFail ="Chúc Quý khách may mắn lần sau NHƯNG  bạn vẫn được nhận  Ưu Đãi từ Nhãn Hàng chính hãng tài trợ";
        $contentSuccess = "CHÚC MỪNG BẠN ĐÃ TRÚNG THƯỞNG";
      
        $dataUserSession =  session('dataCompany', null);

        $displayGame = true;
        if($dataUserSession)
        {
            $displayGame = false;
        }

        $dataUserSession =  session('dataCompany', null);

     

        if($dataUserSession)
        {
            $dataUserId=  $dataUserSession->data->_id;
         
           
            $dataUserSession->data = $this->getDataById($dataUserId);
            session(['dataCompany' =>$dataUserSession]);
            $dataUserSession =  session('dataCompany', null);

         
        }
        
        $turnOffGame = false;
        $successGame = false;
        $ageGame = 0;
        $ageGameReal=0;
        $gameType = 1;



        session(['gameJoinType1' =>false]);
        if( $dataGame != null)
        {
               
                $contetnFail = $dataGame->popupfail;
            
                $contentSuccess = $dataGame->pupupSuccess;
                $currentTime = Carbon::now()->addHour(7);
                $converTextString = $currentTime->format('H:i');
                $fromDate = Carbon::parse($dataGame->fromDate); 
                $todate = Carbon::parse(  $dataGame->todate); 
                $timefrom = $dataGame->fromtime;
                $timeto = $dataGame->totime;
                if( $currentTime >= $fromDate && $currentTime <= $todate  )
                {
                    session(['gameJoinType1' =>True]);
                    $skin =  $data->data->facedata->generalResult->data[0]->data[0]->value;

                    session(['ageGame' =>$skin]);
                    session(['ageGameReal' =>$skin]);
                    if($timefrom<= $converTextString && $converTextString <=$timeto)
                    {
                       
                        if($dataGame->typeGame =="1")
                        {
                            session(['ageGame' =>$skin]);
                            session(['ageGameReal' =>$skin]);
                           
                            if( $skin*1  == $dataGame->skinNumber*1)
                            {
                                $successGame = true;
                            
                                
                          
                               
                                session(['gameType' =>1]);
                            }
                            else 
                            {
                                $successGame = false;
                            }
                        }
                        
                      
                       
                    }
                    else 
                    {
                       

                        if( $skin*1  == $dataGame->skinNumber*1)
                        {
                            $successGame = true;
                          
                      
                            session(['ageGame' =>($skin*1 + 1)]);
                            session(['ageGameReal' =>$skin]);
                            session(['gameType' =>1]);
                        }
                        else 
                        {
                            $successGame = false;
                        }

                        $successGame = false;
                    }
                }
         }

         

         session(['successGame' =>$successGame]);

       
      
        //  if($slug =="soida")
        // {
        //     $slug = null;
        // }
        // if($slug == null )
        // {

        // }
        $companyId = $this->getCompanyId();
 
        $agent = new Agent();
        $turnOffGame = false;
      
        $rewardCheck  =  session('rewardCheck', false);
         $gameJoinType1 =true;
       
        if($slug !="")
        {
              return view("resultZaloBook", compact("slug", 
              
             "ageGame","ageGameReal","gameType","gameJoinType1",
              "contetnFail", "contentSuccess",  "agent","companyId", "displayGame", "rewardCheck", "turnOffGame","successGame","dataGame")); 
        }


    

        return view("resultBook", compact("slug", "contetnFail", "contentSuccess",  "agent","companyId", "displayGame", "rewardCheck", "turnOffGame","successGame","dataGame"));
    }

    public function recomendProduct (Request $request, $slug =null) 
    {
    
        $companyId = $this->getCompanyId();
        $agent = new Agent();
        return view("recomendProduct", compact("slug", "companyId", "agent"));
    }

    

    public function profile (Request $request, $slug =null) 
    {
        $agent = new Agent();
        return view("profile", compact("slug","agent"));
    }

    public function history (Request $request , $slug =null, $id =null) 
    {
        $agent = new Agent();
        if($id ==null)
        {
            return view("history", compact("slug"));
        }
        return view("detailHistory",compact("id","agent"));
        
    }

    public function historyDetailPage3 (Request $request , $id =null) 
    {
        $agent = new Agent();
        if($id ==null)
        {
          return ;

        }
        
        $slug = "";
        $checkacssSlugUrl ="https://api-soida.applamdep.com/api/get-detail-history-skin";
        $client = new Client();
        $res = $client->request('post', 'https://api-soida.applamdep.com/api/get-detail-history-skin', [
            'json' => [
                 'id'=> $id
              ]
        ]);
        
     
       
  
        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();

            
            $checkresult = json_decode($checkresult);
            if($checkresult->is_success)
            {
                
                    $result  = $checkresult->data;
                
                    return view("historyPageDetail3",compact("id","result", "slug","agent"));

            }
                return  "Không có dữ liệu";
            
            }
            else 
            {
            
            }
        return view("historyPageDetail",compact("id","slug","agent"));

       
        
        
    }

    public function historyDetailPage (Request $request , $id =null) 
    {
        $agent = new Agent();
        if($id ==null)
        {
          return ;

        }
        
        $slug = "";
        $checkacssSlugUrl ="https://api-soida.applamdep.com/api/get-detail-history-skin";
        $client = new Client();
        $res = $client->request('post', 'https://api-soida.applamdep.com/api/get-detail-history-skin', [
            'json' => [
                 'id'=> $id
              ]
        ]);
        
     
       
  
        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();

            
            $checkresult = json_decode($checkresult);
                if($checkresult->is_success)
            {
                
                    $result  = $checkresult->data;  
                    
                
                    return view("historyPageDetail",compact("id","result", "slug","agent"));

            }
                return  "Không có dữ liệu";
            
            }
            else 
            {
            
            }
        return view("historyPageDetail",compact("id","slug","agent"));

       
        
        
    }

    public function historyDetailPage2 (Request $request , $id =null) 
    {
        $agent = new Agent();
        if($id ==null)
        {
          return ;

        }
        
        $slug = "";
        $checkacssSlugUrl ="http://207.148.71.172:3006/api/get-detail-history-skin";
        $client = new Client();
        $res = $client->request('post', 'http://207.148.71.172:3006/api/get-detail-history-skin', [
            'json' => [
                 'id'=> $id
              ]
        ]);
        
     
       
  
        if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();

            
            $checkresult = json_decode($checkresult);
                if($checkresult->is_success)
            {
                
                    $result  = $checkresult->data;
                    $result->Result = json_decode( $result->Result);

                   
                    return view("historyPageDetail",compact("id","result", "slug","agent"));

            }
                return  "Không có dữ liệu";
            
            }
            else 
            {
            
            }
        return view("historyPageDetail",compact("id","slug","agent"));    
        
    }


    public function detailHistory(Request $request, $id)
    {

        $agent = new Agent();
        return view("detailHistory",compact("id","agent"));
    }


    public function thongtintongquan (Request $request) 
    {

        $agent = new Agent();
        return view("thongtintongquan",compact("agent"));   

    }

    public  function formReward()
    {
        $agent = new Agent();
        return view("reward",compact("agent"));
    }

    private function checkGame ($dataReuslt)
    {
        return true;
    }

    public function callSikin (Request $request, $slug =null,$saleId =null) 
    {
        

            $this->setHistoryId(null);
            $isDesktop = "-1";
             if ($request->has('isDesktop')) {
                $isDesktop = $request->input("isDesktop");
            }
            $dataUpdate = [
                "image_base64"=> $request->input("bas64Request"),
               
            ];

 
            $url = "https://portal.applamdep.com/api/skin/portalApp";

            $client = new Client();
            $res = $client->request('post',$url , [
                'json' =>$dataUpdate
            ]);
            if($res->getStatusCode() ==200)
            { 
                $checkresult = $res->getBody()->getContents();
                $data = json_decode($checkresult);

            
                $data = $data->data;
         

                session(['dataResult' =>$data]);
                session(['rewardCheck' =>true]);
                $data  =  session('dataResult', null);
                $skin =  $data->data->facedata->hintResult;

                $d =$this->SaveSound($skin);


                $url ="https://api.fpt.ai/hmi/tts/v5";
                $client = new Client();
        
                $res1 = $client->request('post', $url, [
                  
                    'headers' => [
                        'Accept'       => 'application/json',
                        'Content-Type' => 'application/json',   
                        'api-key'=>'5PecxlB3UM9eeeWzCBAdST1LY0cBOXkf',
                       
                        'voice'=>'banmai'
                    ],
                    'body' => $d
                ]);             


                if($res1->getStatusCode() ==200)
                { 
                    $checkresult = $res1->getBody()->getContents();
                    $data1= json_decode($checkresult);
                  
                    $data->data->sound = $data1;
                    session(['dataResult' =>$data]);
                    $this->HandleSkin();
                     return  [
                            "is_success" =>true, 
                            "reward"=> true, 
                            "data"=> $data
                        
                     ];
    
                }
             

  
       

            }
            else 
            {
                  session(['webinfo' =>[]]);
            }
        }

     public function SaveSound($hintResult)
 {
    $text ='';
    $begintext ="";
  
    foreach ($hintResult as &$item1) {
       

        if($item1->sdktype*1.0 <5)
        continue;
     
    $avg = $item1->avg*1.0;
    $textDegree = "";
    $endpoint ="";
   
    if($avg <= 1 )
    {
      $textDegree =" Tốt";
    }
    else if($avg <=2)
    {
      $textDegree =" Bình thường";
    }
    else if($avg <=3)
    {
        $textDegree =" Nặng";

    }
    
    $valuerel2 =  round($avg/3*10);
    $value23 =round(10 - $valuerel2);

    $endpoint= " ".$value23." trên 10 ;";


    
    switch ($item1->sdktype) {
      case "5":
             $begintext=$begintext."Bạn có dấu hiệu Lão Hóa Da tình trạng";
             break;
     
        case "6":
            $begintext=$begintext."Bạn có mụn và mụn viêm đỏ tình trạng ";
        break;
        case "7":
            $begintext=$begintext."Bạn có Quầng thâm mắt tình trạng ";
        break;
        case "8":
            $begintext=$begintext."Bạn có các vấn đề do lỗ chân lông tình trạng ";
        break;
        case "9":
            $begintext=$begintext."Bạn có Đốm thâm nám tình trạng ";
        break;
    
      default:
        break;
    }
         $begintext=$begintext."".$textDegree."".$endpoint;

    }
    

  
    $d = $begintext;
    return $d;
   

  
 }
 public function HandleSkin()
 {
    $dataGame = Session('dataGame', null);

  
   $data  =  session('dataResult', null);
    session(['gameJoinType1' =>false]);
    if($data)
    { 
        $skin =  $data->data->facedata->generalResult->data[0]->data[0]->value;
        session(['ageGame' =>$skin]);

    

    }
    if($dataGame == null)
    {
        return;
    }


    $successGame =false;
    if( $dataGame != null)
    {
           
            $contetnFail = $dataGame->popupfail;
        
            $contentSuccess = $dataGame->pupupSuccess;
            $currentTime = Carbon::now()->addHour(7);
            $converTextString = $currentTime->format('H:i');
            $fromDate = Carbon::parse($dataGame->fromDate); 
            $todate = Carbon::parse(  $dataGame->todate); 
            $timefrom = $dataGame->fromtime;
            $timeto = $dataGame->totime;
            if( $currentTime >= $fromDate && $currentTime <= $todate  )
            {
                session(['gameJoinType1' =>True]);
             

                session(['ageGame' =>$skin]);
                session(['ageGameReal' =>$skin]);
                if($timefrom<= $converTextString && $converTextString <=$timeto)
                {
                   
                    if($dataGame->typeGame =="1")
                    {
                        session(['ageGame' =>$skin]);
                        session(['ageGameReal' =>$skin]);
                       
                        if( $skin*1  == $dataGame->skinNumber*1)
                        {
                            $successGame = true;
                        
                            
                      
                           
                            session(['gameType' =>1]);
                        }
                        else 
                        {
                            $successGame = false;
                        }
                    }
                    
                  
                   
                }
                else 
                {
                   

                    if( $skin*1  == $dataGame->skinNumber*1)
                    {
                        $successGame = true;
                      
                  
                        session(['ageGame' =>($skin*1 + 1)]);
                        session(['ageGameReal' =>$skin]);
                        session(['gameType' =>1]);
                    }
                    else 
                    {
                        $successGame = false;
                    }

                    $successGame = false;
                }
            }
     }

     

     session(['successGame' =>$successGame]);

   
  
 }
    public function ViewhistoryWithIframe(Request $request , $id = null )
    {

        $agent = new Agent();
            $companyGlobalId = $this->getCompanyId();
            $slug = null;
            
            $dataUser = null;

            $dataUpdate = [
                "idView"=> $id
            ];

            $loginUrl = API_BaseUrl."/".EndUser_GetHistoryById;
            $client = new Client();
            $res = $client->request('post',$loginUrl , [

                    'json' =>$dataUpdate
            ]);
            if($res->getStatusCode() ==200)
            {
                $checkresult = $res->getBody()->getContents();
                $data = json_decode($checkresult);
                if($data->is_success)
                {  
                    
                    $dataResult = $data->data->Result;

                    if (property_exists($dataResult,'data' ))
                    {
                        $dataResult = $dataResult->data;
                    } 
                  
                    $data = [
                        "data" =>$dataResult
                    ];
                 
                    
                    $isViewFrame =  true;
                    $agent = new Agent();
                    return view("history.historyDetaiIframe",compact("data","agent", "slug", "companyGlobalId","dataUser","isViewFrame","agent" ));
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

}
