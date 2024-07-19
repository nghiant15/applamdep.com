
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
    </style>

   
    @yield('header')
    
</head>

<body>
    <script>
        var isLogin = false;

        var slug;
    </script>

    @if (Session()->has('dataCompany'))
    <script>
        var isLogin = true;
    </script>
    @endif
   
    


    

    <div class="content-page">

    <div class="content-plugin">
    <div class="banner">
</div>

 
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

 <div style ="padding-bottom:30px">
 </div>



</body>

        <script type="text/javascript" src="/js/history.js"></script>

        

</html>