<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use GuzzleHttp\Client;
use Jenssegers\Agent\Agent;
use Illuminate\Support\Facades\Log;

use PhpParser\Node\Expr\FuncCall;

use View;
use Illuminate\Support\Facades\Cache;
class GegemiController extends Controller
{
    public function GetResult (Request $request) 
    {
            $historyIdUpdate = $request->input("historyId");
           
            $url ="http://45.76.161.30:3030/api/skin/analysisAI";
            $client = new Client();
            $headers = [];
            $body = [
               'question' => $request->input("question")
            ];
            // Send an asynchronous request.
            $res = $client->requestAsync('post',$url , [
               'json' =>$body
               ]   
            );

            $result =  $res->wait();
            If($result->getStatusCode() ==200)
            {
               $checkresult = $result->getBody()->getContents();

                $urlUpdateHistory ="https://api-ai.exomiyo.com/api/update_resultAI";
                  $client2 = new Client();
                  $body2 = [
                        'historyId' => $historyIdUpdate,
                        'resultAI'=> $checkresult
                  ];
                  // Send an asynchronous request.
                  $res1 = $client2->requestAsync('post',$urlUpdateHistory , 
                  [
                        'json' =>$body2
                  ]   
                  );
                  $result =  $res1->wait();

                return $checkresult;
            }
            else 
            {
               return "";
            }
     }
}
