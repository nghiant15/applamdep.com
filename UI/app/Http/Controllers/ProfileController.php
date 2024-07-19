<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use GuzzleHttp\Client;

use Jenssegers\Agent\Agent;
use Session;



class ProfileController extends Controller
{

    public function update (Request $request) 
    {

        $dataUserSession =  session('dataCompany', null);
       
        if($dataUserSession)
        {

        }
        else 
        {
            return response()->json(['message' => 'chưa đăng nhập hệ thống'], 401);
        }
        $tokenCode =  $dataUserSession->token;
        $email =  $request->input("email");
        if(!isset( $dataUserSession->data->google_id) || $dataUserSession->data->google_id =="" )
        {
            
        }
        else {
            $email  =  $dataUserSession->data->email;
        }

    
        $dataUpdate = [
            
                "CompanyGlobalId" => $this->getCompanyId(),
                "fullName" =>  $request->input("fullName"),
                "email"=>  $request->input("email"),
                "addressHome"=> $request->input("addressHome"),
                "introduction" => $request->input("introduction"),
                "company_id"=> $this->getCompanyId()
        ];
      
     

        $loginUrl = API_BaseUrl."/".EndUser_Update;
         $client = new Client();
         $res = $client->request('post',$loginUrl , [
            'headers' => 
            [
                'Authorization' => "Bearer ".$tokenCode
            ],
            'json' =>$dataUpdate
         ]);
         if($res->getStatusCode() ==200)
        {
            

            $checkresult = $res->getBody()->getContents();
             $checkresult = json_decode($checkresult);

           
            $dataCompany = session('dataCompany');
            if($dataCompany)
            {
                $dataCompany->data =   $checkresult->data;
                session(['dataCompany' =>$dataCompany]);
            }
              if($checkresult->is_success)
            {
                Session::flash('isRegister', true);
                
                 return  [ "is_success" =>true, 
                          "dataMessage" =>"Đăng ký thành công"];
            }
            return  ["is_success" =>false];
           
         }
       
         return  ["is_success" =>false];

    }

    public function getInfo (Request $request) 
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

        $urlRequest = API_BaseUrl."/".EndUser_GetInfo;    
        $client = new Client();
        $res = $client->request('post',$urlRequest , [
           'headers' => 
           [
               'Authorization' => "Bearer ".$tokenCode
           ]
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
            return  ["is_success" =>false];
           
         }
         return  ["is_success" =>false];

    }


       
    public function Register (Request $request) 
    {
        $loginUrl = API_BaseUrl."/".EndUser_Add;
        $client = new Client();
         $res = $client->request('post',$loginUrl , [
            'json' => [
                "email" => $request->input("email"),
                "google_id" => "",
                "phone" => $request->input("phone"),
                "CompanyGlobalId" => $this->getCompanyId(),
                "name" => $request->input("name"),
                "username" => $request->input("username"),
                "password" => $request->input("password")
              ]
         ]);
         if($res->getStatusCode() ==200)
        {
            $checkresult = $res->getBody()->getContents();
             $checkresult = json_decode($checkresult);
              if($checkresult->is_success)
            {
                Session::flash('isRegister', true);
                 return  [ "is_success" =>true, 
                          "dataMessage" =>"Đăng ký thành công"];
            }
            return  ["is_success" =>false];
           
         }
         return  ["is_success" =>false];

    }


    public function saleAddUser (Request $request) 
    {
        $loginUrl = API_BaseUrl."/".SaleAddUser;
        $client = new Client();
         $res = $client->request('post',$loginUrl , [
            'json' => [
                "email" => $request->input("email"),
                "google_id" => "",
                "phone" => $request->input("phone"),
                "pg_id"=> $this->getSaleId(),
                "CompanyGlobalId" => $this->getCompanyId(),
                "name" => $request->input("name"),
                "username" => $request->input("phone"),
                "password" => $request->input("phone")
              ]
         ]);
         if($res->getStatusCode() ==200)
        {
             $checkresult = $res->getBody()->getContents();
             $checkresult = json_decode($checkresult);
              if($checkresult->is_success)
            {
                  Session::flash('isSaleAddUser', true);
                
                  session(['dataCompany' => $checkresult->data]);
                 return  [ "is_success" =>true, 
                          "dataMessage" =>"Thêm mới khách hàng thành công"];
            }
            return  ["is_success" =>false];
           
         }
         return  ["is_success" =>false];

    }






}
