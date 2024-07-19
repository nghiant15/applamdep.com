<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use GuzzleHttp\Client;

use Jenssegers\Agent\Agent;
use Session;



class UserController extends Controller
{

    public function logout (Request $request) 
    {
      
        $request->session()->forget("dataCompany");
        $request->session()->forget("historyId");
    
        $request->session()->flush();      
        return  ["is_success" =>true];

    }

    public function logoutSale (Request $request) 
    {
        $request->session()->flush();   
        return  ["is_success" =>true];
    
    }

    public function logoutUser (Request $request) 
    {
        $request->session()->forget("dataCompany");
        $request->session()->forget("historyId");
    
        $request->session()->flush();      
        return  ["is_success" =>true];
   }

    
   public function login (Request $request, $slug = null) 
    {
        $historyId =  $this->getHistoryId();
        $company_id = $this->getCompanyId();

        $dataRequestInput =[
            'username'=> $request->input("username"),
            'phoneRel'=> $request->input("phoneRel"),
            'password'=> $request->input("phoneNumber"),
            'phoneNumber'=> $request->input("phoneNumber"),
            'slug' => $slug,
            'company_id'=> $company_id,
            'historyId' => $historyId
        ];

        
        return $this->loginUser($dataRequestInput);
   }
    

   public function loginGame (Request $request, $slug = null) 
    {
        $historyId =  $this->getHistoryId();
        $company_id = $this->getCompanyId();
    
        $dataRequestInput =[
            'username'=> $request->input("username"),
            'password'=> $request->input("phoneNumber"),
            'phoneNumber'=> $request->input("phoneNumber"),
            'slug' => $slug,
            'company_id'=> $company_id,
            'historyId' => $historyId
        ];

        return $this->loginUser($dataRequestInput);
   }
    public function loginAdmin (Request $request) 
    {
       
        $loginUrl = API_BaseUrl."/".Admin_Login;
        $client = new Client();
        $res = $client->request('post',$loginUrl , [
                'json' => [
                        'username'=> $request->input("username"),
                        'password'=> $request->input("password")
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
                    

                     session(['dataSale' => $checkresult->data]);
                     session(['salePG' => true]);
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
    
    public function Register (Request $request) 
    {
        $client = new Client();
        $loginUrl = API_BaseUrl."/".EndUser_Add;
         $res = $client->request('post',$loginUrl , [
            'json' => [
                "email" => $request->input("email"),
                "google_id" => "",
                "phone" => $request->input("phone"),
                "CompanyGlobalId" =>   $this->getCompanyId(),
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
                Session::flash('isRegister', true);
                 return  [ "is_success" =>true, 
                          "dataMessage" =>"Đăng ký thành công"];
            }
            return  ["is_success" =>false];
           
         }
         return  ["is_success" =>false];

    }






}
