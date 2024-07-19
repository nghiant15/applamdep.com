@php
    $dataColor =  "#1a214f";

    
    $dataUser = null;


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
<link rel="stylesheet" href="/css/button.css">
<link rel="stylesheet" href="/css/layout.css">
<link rel="stylesheet" href="/css/animation.css">
<link rel="stylesheet" href="/css/table.css">
    <style> 
    
    :root{
        --main_color : #1a214f;
        --color_button_dark: #015C92;
        --color_button_light: #53A6D8;
        --color_title: #53A6D8;
        --color_title_section: #015C92;
        --color_letter_white: #FFFFFF;
        --main_letter_dark: #212326;
        --main_letter_blue: #53A6D8;
        --gralident1: #7DC387;
        --gralident2: #6CFF95;
        --white: #FFFFFF;
        --circle-small: #E5E5E5;
        --bg-white: #FAFAFA;
        --black-50: #F2F2F2;
        --success_color: #3bb54a;
        --error_color: #3d0d13;
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



{{-- <div class="hadernav">
    <div class="title-header">
        <span class="soida"> SOI DA </span>
        <span class="online"> ONLINE </span>
        <span class="ai">AI </span>
    </div>

    <div class="sologan">
        <img src="/images/navabar.svg">
        <span>Ứng dụng soi da với công nghệ AI hiện đại *</span>
    </div>


</div> --}}

<div id="alert-web">

</div>
                @yield('contentpage')

        </div>
    </div>

    @include('new.popupLoading')

    @include('new.popupSuccess')

    
</body>

<script type="text/javascript" src="/js/history.js"></script>

</html>