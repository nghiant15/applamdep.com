<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use GuzzleHttp\Client;
use Jenssegers\Agent\Agent;
use Illuminate\Support\Facades\Log;

use PhpParser\Node\Expr\FuncCall;
use View;
use Illuminate\Support\Facades\Cache;
class GameController extends Controller
{

   
   
    public function ReadAboutInfomation (Request $request) 
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://api.fpt.ai/hmi/tts/v5',
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => 'Bạn có dấu hiệu Lão Hóa Da tình trạng nhẹ ở mức 1/3.
        Bạn có dấu hiệu Lão Hóa Da tình trạng nhẹ ở mức 2/3.
        Bạn có các vấn đề do lỗ chân lông Da tình trạng nhẹ ở mức 4/3.
        Bạn có Đốm thâm nám  tình trạng nhẹ ở mức 4/3',
          CURLOPT_HTTPHEADER => array(
            'api-key: 3EdTMXVJyYds5pPqwcLur48IAq8WnVdf',
            'speed: ',
            'voice: banmai'
          ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        
        if ($err) {
          echo 'cURL Error #:' . $err;
        } else {
          
            return response()->json(json_decode($response));
        }
    
    }

   

}
