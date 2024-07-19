   <!-- $dataColor =  "#1a214f"; -->
@php
   $dataColor  = null;
   $bannerPage = null;
   
    if (isset($globalColor)) {
        $dataColor = $globalColor->mainColor;

    }
    else 
    {
        $dataColor = "#1a214f";
    }
   

    if (isset($globalData) && isset($globalData->banner)) {
        $bannerPage = $globalData->banner;

       
        
    }
    else 
    {
        $bannerPage =   new \stdClass();
        $bannerPage->imageBannerDesktop= "http://localhost:3002/image_brand/applamdep1320 (1).png";
        $bannerPage->imageBannerMobile  = "http://localhost:3002/image_brand/applamdep1320 (1).png";
        
    }
    
    $dataUserSales = session('dataCompany', null);

    
    $beautyData = session('beautyData', null);
    

    $dataUser = null;


        if($dataUserSales)
        {
            $dataUser = $dataUserSales->data;

           
        }
    
 

 
 
@endphp
<html>

<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/status.css">
    <link rel="stylesheet" href="/css/soidanew.css">
    <link rel="stylesheet" href="/css/reponsive.css">
    <link rel="stylesheet" href="/css/general.css">
    <link rel="stylesheet" href="/css/form.css">
    <link rel="stylesheet" href="/css/welcome.css">
    <link rel="stylesheet" href="/css/button.css">
    <link rel="stylesheet" href="/css/layout.css">
    <link rel="stylesheet" href="/css/animation.css">
    <link rel="stylesheet" href="/css/table.css">
    <style> 
    
        :root{
            --main_color : {{$dataColor}};
            --color_button_dark: {{$dataColor}};
            --color_button_light: {{$dataColor}};
            --color_title: {{$dataColor}};
            --color_title_section: {{$dataColor}};
            --color_letter_white:{{$dataColor}};
            --main_letter_dark: {{$dataColor}};
            --main_letter_blue: {{$dataColor}};
            --gralident1: {{$dataColor}};
            --gralident2: {{$dataColor}};
            --white: {{$dataColor}};
            --circle-small: {{$dataColor}};
            --bg-white: {{$dataColor}};
            --black-50: {{$dataColor}};
            --success_color: #3bb54a;
            --error_color: #3d0d13;
        }
        .recomendProduct p {
            color: {{$dataColor}} !important; 
        }
        .text-center-box{
            color: {{$dataColor}} !important;
        }
        .description-text p{
           color: {{$dataColor}} !important; 
        }
        .hadernav span {
            color: {{$dataColor}} !important; 
        }
        .account_hover a {
            color: {{$dataColor}} !important; 
        }
        .rule{
        
           
        }
    </style>

    <style>
        /* LEFT FIXED SIDEBAR */

.left-sidebar {
    position: fixed;
    left: 30px;
    bottom: 100px;
    z-index: 30;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.left-sidebar a {
    display: block;
    width: 45px;
    height: 45px;
    margin-bottom: 15px;
    transition: ease-in-out .3s all;
}

.left-sidebar a:hover {
    transform: scale(1.25);
}
.bg-light1  p:first-child  {
    color: #0017a9;
    font-weight: bolder;
    font-size: 32px !important;
}

.bg-light1  p {
    color: #0017a9;
    font-weight: bolder;
    font-size: 24px !important;
}
.bg-light1  strong {
   background-color: rgb(24, 129, 210) !important;
   width: 100px;
   border-radius: 15px;
   color: #ffffff !important;
   padding: 3px;
}
.bg-light1{
    background-color: #e9cf81 !important;
}
.clickGame {
  text-decoration: none;

}
.clickGame:hover {
    text-decoration: none !important;
}
.clickGame:hover p{

    color: red !important;
    text-decoration: none !important;
}


@media only screen and (max-width: 600px) {
    .bg-light1  p:first-child  {
    color: #0017a9;
    font-weight: bolder;
    font-size: 22px !important;
}

.bg-light1  p {
    color: #0017a9;
    font-weight: bolder;
    font-size: 16px !important;
}
.bg-light1  strong {
   background-color: rgb(24, 129, 210) !important;
 
   border-radius: 15px;
   color: #ffffff !important;
   padding: 3px;
}
}

    </style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    @yield('header')
    
</head>

<body>
<div class=" bg-light1" style=" background-color: #f9be0d ;position: fixed;bottom: 0;width: 100%;z-index: 1000;">
                <div class="container text-center">
                    
                    {{-- <p style ="color:#ffffff !important; font-weight: bold !important;" class="text-muted mb-0 py-2">
                    <a href="javascript:void(0)"  onclick="skinSoida()" ><img style= "height: 50px" src ="/iconSkin2.jpg"> </a></p> --}}
                   <a class ="clickGame" onclick="skinSoida()" > <p>Soi da ngay & Tải ebook miễn phí </p>
                    <p>100% Miễn phí & không cài đặt </p> </a>
                </div>
  </div>
    <script>
        var isLogin = false;

        var turnOnGame = false;

        var slug;
    </script>

    @if (Session()->has('dataCompany'))
    <script>
        var isLogin = true;
    </script>
    @endif
   

    @if (Session()->has('turnOnGame'))
    <script>
         turnOnGame = true;
         
    </script>
    @endif

    @if (Session()->has('dataCompany'))
            @include('profile.update')
            @include('profile.history')
            @include('profile.isVoucher')
            @include('loginZalo.login2')
    @else
            @include('profile.update')
            @include('profile.history')
            @include('profile.isVoucher')
            @include('loginZalo.login2')

    @endif

    @include('loginZalo.login')
    <div class="content-page">

    <div class="content-plugin">
    <div class="banner">


    @if ($agent->isMobile())
  
        <img id ="bannerId" src="{{$bannerPage->imageBannerMobile}}">
    @else 

         <img id ="bannerId" src="{{$bannerPage->imageBannerDesktop}}">
    @endif

  

   
</div>

 
<div class="box-position-header">
    <div class="position_header">
        <div class="banner_header flex-center-space">
            <div class="banner__header--left" style ="width:40%">
                <a href ="javascript:void(0)" onclick="openHomePage()">
<svg width="24px" id="Layer_1" fill="{{$dataColor}}" style="enable-background:new 0 0 16 16;" version="1.1" 
    viewBox="0 0 16 16" width="16px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d="M15.45,7L14,5.551V2c0-0.55-0.45-1-1-1h-1c-0.55,0-1,0.45-1,1v0.553L9,0.555C8.727,0.297,8.477,0,8,0S7.273,0.297,7,0.555  L0.55,7C0.238,7.325,0,7.562,0,8c0,0.563,0.432,1,1,1h1v6c0,0.55,0.45,1,1,1h3v-5c0-0.55,0.45-1,1-1h2c0.55,0,1,0.45,1,1v5h3  c0.55,0,1-0.45,1-1V9h1c0.568,0,1-0.437,1-1C16,7.562,15.762,7.325,15.45,7z"/>
</svg>    
                 </a>
               
            </div>
            <div class="flex-center banner__header--right">
                <div class="hoverBlock_form_account relative">

           
                    @if (session()->has('dataCompany'))
                    <div class="account_hover">
                        <a href="javascript:void(0)" class="btn btn_nav scroll-nav-font navbar-a"
                        style="margin:auto;box-shadow:none">
                        @if(isset($dataUser->name))
                        {!!$dataUser->name!!}
                        @else
                        Tài khoản
                        @endif
                    </a>
                        <div class="status-form-function-user position_form_information_user">
                            <div class="form-function-user">
                                <div>
                                    <p id="active-form-information-user">Thông tin cá nhân</p>
                                </div>
                                <p onclick="openPageHistory()">Lịch sử soi da</p>
                                <a onclick="openSoida()">Soi da online </a>
                                <hr />
                                <div class="flex-center" onclick="questionLogout()">
                                    <p  style="color:var(--main_color)">
                                        Đăng xuất</p>
                                    <svg style="width:16px !important; height:16px !important"
                                        onclick="logoutUser()" xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="var(--main_color)"
                                        class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path fill-rule="evenodd"
                                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    @else
                            @if($slug !="bibabo")
                                <div class="flex" >
                                     <a  id ="poupgameJoin" class ="popupgame" style="display:none" onclick ="showRule()" href ="javascript:void(0)" >Luật chơi</a>
                                     <a onclick="ToggleDisplayLogin('.status-modal-account',true,'Để xem lịch sử soi da online')"
                                        href="javascript:void(0)"
                                        id="status__text__login"
                                        class=" btn_nav btn_nav-no-after navbar-a navbar-a"
                                        style="margin:auto;box-shadow:none; display: inline-block;">
                                      
                                        Để xem lịch sử soi da online  
                                        {{-- <i class="fa fa-gift" style="font-size:20px;color:red;"></i> --}}
                                    </a>
                    
                                   

                                  
                                    <div class="hover-after-login" >
                                        <a id="name_after_login" href="javascript:void(0)"
                                            
                                            class=" btn_nav  navbar-a navbar-a"
                                            style="margin:auto;box-shadow:none">
                                            
                                        </a>
                                        <div class="status-form-after-login position_form_information_user">
                                            <div class="form-function-user">
                                                <p onclick="reloadWeb()">Click để xem thông tin</p>
                                            </div>
                                        </div>
                                    </div>

                                   
                                </div>
                            @endif
                    


                    @endif
                    <div class="indicator"></div>
                </div>
                @if (Session()->has('dataCompany'))
                <a class="hover_historySoida_a" href="javascript:void(0)"
                    onclick="openPageHistory()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 10L8 16" stroke="{{ $dataColor }}" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 12V16" stroke="{{ $dataColor }}" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 8V16" stroke="{{ $dataColor }}" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <rect x="3" y="4" width="18" height="16" rx="2"
                            stroke="{{ $dataColor }}" stroke-width="2" />
                    </svg>
                </a>
                @endif
            </div>
        </div>
    </div>
</div>

@php
    $turnOnGameBeauty = false;
    $scoreDis = 0;
    $scoreMaxDis =0;



@endphp

@if ($turnOnGameBeauty)
@if ($dataUser)

@php
 $scoreDisplay= $dataUser->score;
 if($scoreDisplay < 1)
 {
    $scoreDisplay = 0;
 }
@endphp


<div class="scoreBeauty"> 
        <div class ="title-main"> 
             Điểm đẹp:<strong>{{$scoreDisplay }} đ</strong>(1 điểm = 1 vnđ)
        </div>
   
       <p>( Thưởng {{$scoreDis }} điểm/ lần soi & tối đa {{ $scoreMaxDis }} đ/ngày)</p>

</div>
@else 

<div class="scoreBeauty"> 
      <p> Thưởng {{$scoreDis }} điểm/ lần soi & tối đa {{ $scoreMaxDis }} đ/ngày</p>

</div>
@endif    

@endif


<div class="hadernav">
    <div class="title-header">
        <span class="soida"> SOI DA </span>
        <span class="online"> ONLINE </span>
        <span class="ai">AI </span>
    </div>

    <div class="sologan">
        <img src="/images/navabar.svg">
        <span>Ứng dụng soi da với công nghệ AI hiện đại *</span>
    </div>


</div>

        <div id="alert-web">

        </div>
        @yield('contentpage')

        </div>
    </div>

    @include('new.popupLoading')

    @include('new.popupSuccess')

{{-- @if($slug == "ngocdung")

<footer class="bg-smoke">
    <div class="content-page">
        <div class="content-plugin">
            <div class="row" style="padding: 20px 0;margin:0">                     
                <div class="footer__col1--padding">   
                    <div class="desktop-inline">
                    <div class="footer__col1--column">
                        <img class="footer__logo-shynh" src="/footerLogo.png" alt="logo">
                        <div class="footer__global-title text-center font--main">
                            <a>
                                <span class="font--main">
                                    
                                </span>
                            </a>
                        </div>  
                        
                    </div>   
                    </div>   
                </div>   
                             
                <div class="footer__col2--padding">             
                        <div div="" class="footer__space--mobi">
                        </div>    
                            <div class="footer__global-title font--main">
                                <span> Công ty TNHH Thẩm Mỹ Ngọc Dung  </span>
                            </div>
                         
                            <div class="footer__global font--main">
                            Số ĐKKD 0307935853 do Sở KHĐT Tp. HCM cấp ngày 20/07/2009
                            </div> 
                           
                            <div class="footer__global font--main"> 
                                Email: <a class="font--main" href="mailto:thammyngocdung2023@gmail.com">thammyngocdung2023@gmail.com</a>
                            </div>    
                </div>
            </div>
        </div>
    </div>

  
</footer> 

@elseif($slug == "zema")

<footer class="bg-smoke">
    <div class="content-page">
        <div class="content-plugin">
            <div class="row" style="padding: 20px 0;margin:0">                     
                <div class="footer__col1--padding">   
                    <div class="desktop-inline">
                    <div class="footer__col1--column">
                        <img class="footer__logo-shynh" src="/footerLogo.png" alt="logo">
                        <div class="footer__global-title text-center font--main">
                            <a>
                                <span class="font--main">
                                    
                                </span>
                            </a>
                        </div>  
                        
                    </div>   
                    </div>   
                </div>   
                             
                <div class="footer__col2--padding">             
                        <div div="" class="footer__space--mobi">
                        </div>    
                            <div class="footer__global-title font--main">
                                <span> CÔNG TY TNHH ZEMA VIỆT NAM  </span>
                            </div>
                            <div class="footer__global font--main">
                            Mã số thuế 0315426909
                            </div> 
                             <div class="footer__global font--main">
                             Địa chỉ: Số 146 đường 6A, Khu nhà ở Rạch Bà Tánh, Ấp 5, Xã Bình Hưng, Huyện Bình Chánh, Thành phố Hồ Chí Minh, Việt Nam
                            </div> 
                            <div class="footer__global font--main"> 
                                Email: <a class="font--main" href="info@zema.com.vn">info@zema.com.vn</a>
                            </div>   
                </div>
            </div>
        </div>
    </div>

  
</footer> 

@elseif($slug == "zasaly")
        <footer class="bg-smoke">
            <div class="content-page">
                <div class="content-plugin">
                    <div class="row" style="padding: 20px 0;margin:0">                     
                        <div class="footer__col1--padding">   
                            <div class="desktop-inline">
                            <div class="footer__col1--column">
                                <img class="footer__logo-shynh" src="/footerLogo.png" alt="logo">
                                <div class="footer__global-title text-center font--main">
                                    <a>
                                        <span class="font--main">
                                            
                                        </span>
                                    </a>
                                </div>  
                                
                            </div>   
                            </div>   
                        </div>   
                                    
                        <div class="footer__col2--padding">             
                                <div div="" class="footer__space--mobi">
                                </div>    
                                    <div class="footer__global-title font--main">
                                        <span> Công ty TNHH Zasaly  </span>
                                    </div>
                                    <div class="footer__global font--main">
                                    Số đăng ký kinh doanh: 0316541679
                                    </div> 
                                   
                                    <div class="footer__global font--main"> 
                                        Email: <a class="font--main" href="info@zasaly.com">info@zasaly.com</a>
                                    </div>   
                        </div>
                    </div>
                </div>
            </div>

        
        </footer> 

@else 
<footer class="bg-smoke">
    <div class="content-page">
        <div class="content-plugin">
            <div class="row" style="padding: 20px 0;margin:0">                     
                <div class="footer__col1--padding">   
                    <div class="desktop-inline">
                    <div class="footer__col1--column">
                        <img class="footer__logo-shynh" src="/footerLogo.png" alt="logo">
                        <div class="footer__global-title text-center font--main">
                            <a>
                                <span class="font--main">
                                    
                                </span>
                            </a>
                        </div>  
                        
                    </div>   
                    </div>   
                </div>   

                <div class="footer__col2--padding">             
                    <div div="" class="footer__space--mobi">
                    </div>    
                          <div class="footer__global-title font--main">
                                <span> CÔNG TY TNHH CÔNG NGHỆ TIKITECH  </span>
                            </div>
                         
                            <div class="footer__global font--main">
                            Số 91 Đường N1, Khu dân cư Hiệp Thành, Phường Hiệp Thành, Quận 12, Thành phố Hồ Chí Minhh
                            </div> 
                            <div class="footer__global font--main">
                                Hotline: <a class="font--main" href="tel:0917 891 007">0917 891 007</a> 
                                
                            </div> 
                            <div class="footer__global font--main"> 
                                Email: <a class="font--main" href="mailto:hi@tikitech.vn">hi@tikitech.vn</a>
                            </div>    
                </div>
            </div>
        </div>
    </div>

  
</footer> 

@endif --}}
<div   class= "bg-smoke"   style ="height:50px">

</div>

<div id="tipsGuildLine" class="ai-skin__tips" style="display:none">
                    <div class="ai-skin__tips__content">
                       

                         <p class ="titleMain"> 
                                 Thử thách gì nhỉ?

                         </p>

                        <br>
                      
                         <p class="des"> 
                         Nếu sau khi soi da online, tuổi da của bạn BẰNG với tuổi da trên banner, bạn nhận được quà từ Shop

                         </p>
                         <br>
                         <p class="des"> 
                                Bạn có thể thử nhiều lần miễn là soi da online tự nhiên
                                Mỗi tuần shop sẽ update MỘT tuổi da nhất định
                        </p>
                        <br>
                        <p class ="titleMain2"> 
                        Chúc bạn ngày càng xinh đẹp
                        </p>
                        <br>
                        <div class="ai-skin__button ai-skin__tips__button">
                            <button type="button" onclick="hidetipGame()">Chơi game</button>
                        </div>
                    </div>
                </div>
                @php
    
                $fabookLink =  null;
                
                $zaloLink =  null;
                $hotlineLink =null;
                
                if (isset($globalData)) {
                  
                        $fabookLink =  null;
                        if( property_exists( get_class($globalData), 'embeddFacebook' ) ){
                              $fabookLink =  $globalData->embeddFacebook;
                        }
                   
                    
                        $zaloLink =  null;
                        if( property_exists( get_class($globalData), 'embeddZalo' ) ){
                              $zaloLink =  $globalData->embeddZalo;
                        }

                        $hotlineLink = null;
                        if( property_exists( get_class($globalData), 'embedHotline' ) ){
                            $hotlineLink =  $globalData->embedHotline;
                        }
               
                   
            
                }
             
            
            
            @endphp
            

                @if ($hotlineLink)
                <a href="tel:{{ $hotlineLink }}" title="" class="left-hotline">
                    <strong>{{ $hotlineLink }}</strong>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path>
                          </svg>
                    </span>
                </a>
   
                @endif

             



                <div class="left-sidebar">
                    {{-- <a href="tel:0906606986" rel="nofollow">
                        <img src="https://tikitech.vn/resources/images/sidebar/phone2.svg" alt="phone">
                    </a> --}}
        
                    {{-- <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=hi@tikitech.vn" target="_blank"><img src="https://tikitech.vn/resources/images/sidebar/email.png" alt="mail"></a>
         --}}
                
                        @if ( $zaloLink)

                        <a href="{{ $zaloLink }}" target="_blank" rel="nofollow"><img src="https://tikitech.vn/resources/images//sidebar/zalo.png" alt="zalo"></a>

                        @endif


                    @if ( $fabookLink)
                             <a href="{{$fabookLink}}" target="_blank" rel="nofollow"><img src="https://tikitech.vn/resources/images/sidebar/mess.png" alt="facebook"></a>
         
                    @endif

         
                 
                 
        
                  
                </div>

                
</body>

        <script type="text/javascript" src="/js/history.js"></script>
        <script type="text/javascript" src="/js/game1.js"></script>
        

      

</html>