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
            $url ="http://45.76.161.30:3030/api/skin/analysisAI";
            $client = new Client();
            $headers = [];
            $body = [
               'question' => $request->input("question"),
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
               return $checkresult;
            }
            else 
            {
               return "";
            }
     }
}
