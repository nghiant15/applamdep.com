<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

class CopilotController extends Controller
{
    public function   test ( Request $request) 
    {
        $client = new Client();
        // Gửi yêu cầu GET tới API của Copilot
        $response = $client->post('https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer AIzaSyD1ZvzaErC5lqyxi8p51oHch3WDIb7NBno' 
            ],
            'json' => [
                'model' => 'models/gemini-pro',
                'prompt' => [
                    'text' => 'Viết một bài thơ về Laravel.'
                ]
            ]
        ]);
        // Lấy mã trạng thái và nội dung phản hồi
        $statusCode = $response->getStatusCode();
        $body = $response->getBody();
        $data = json_decode($body, true);

        // Trả về kết quả dưới dạng JSON
        return response()->json([
            'status' => $statusCode,
            'data' => $data
        ]);
    }
}
