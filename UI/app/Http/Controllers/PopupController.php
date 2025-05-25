<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use GuzzleHttp\Client;
use Jenssegers\Agent\Agent;
use Illuminate\Support\Facades\Log;

use PhpParser\Node\Expr\FuncCall;

use View;
use Illuminate\Support\Facades\Cache;
class PopupController extends Controller
{
    public function Addpopup (Request $request) 
    {

        $dataUserSession =  session('dataCompany', null);
          $fullName ="";
        if(isset($dataUserSession))
        {
          $fullName = $dataUserSession->data->name;
        }

         $url ="https://api-ai.exomiyo.com/api/popup/add";
         $client = new Client();
         $headers = [];
         $body = [
               'address' => $request->input("address"),
               'contentAddvice' => $request->input("contentAddvice"),
               'slug' => $request->input("slug"),
               'fullName' =>  $fullName,
               'phone' => $request->input("phone")
         ];
         $res = $client->requestAsync('post',$url , [
            'json' =>$body
            ]   
         );
         $result =  $res->wait();
         if($result->getStatusCode() ==200)
         {
            $checkresult = $result->getBody()->getContents();
             return $checkresult;
         }
         else 
         {
            return "";
         }
     
   }
}
