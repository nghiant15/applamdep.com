<?php

namespace App\Http\Controllers;

use App\Models\User;

use GuzzleHttp\Client;
use Jenssegers\Agent\Agent;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\FuncCall;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class EvoucherController extends Controller
{
    public function getbanner ( Request $request )
    {
        $params = [
            'query' => [
                "company_id"=>  $this->getCompanyId(),
                "type"=> $request->input("type")
               
    
            ]
         ];
        $url = API_BaseUrl."/".Banner_getAll;
        
        $client = new Client();
        $res = $client->request('get',$url , $params);
         if($res->getStatusCode() ==200)
        {
            // return  ["is_success" =>false];

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
    public function getFooter ( Request $request )
    {
        $dataUpdate = [
            
            // "company_id"=>  $this->getCompanyId()
        ];
        
        $params = [
        'query' => [
            'company_id' => "-1",
           

        ]
     ];
     $url = API_BaseUrl."/".Footer_getAll;
      $client = new Client();
      $res = $client->request('get', $url, $params);
         if($res->getStatusCode() ==200)
        {
            // return  ["is_success" =>false];

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
    public function getFooterOnChild ( Request $request )
    {
    
        // dd($tokenCode);
        $dataUpdate = [
            
            "company_id"=>  $this->getCompanyId()
        ];
        $url = API_BaseUrl."/".Banner_getAll;
        
        $client = new Client();
        $res = $client->request('get',$url , [
        'json' =>$dataUpdate
        ]);
         if($res->getStatusCode() ==200)
        {
            // return  ["is_success" =>false];

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
 
   

   

    
}