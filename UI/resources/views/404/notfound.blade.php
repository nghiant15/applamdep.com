
@if (Session()->has('dataColor'))
@php
$dataColor = session('dataColor', null);
$dataCompany = Cache::get('webinfo');
$dataCompany_admin = Cache::get('webinfo_admin');
$listFooterItems = Cache::get("allFooter",[]);
$dataSale = session('dataSale', null);
$dataUserSales = session('dataCompany', null);


if($dataColor)
{
$dataColor = $dataColor->data;
}

@endphp

@else
@php

@endphp
@endif
<html>

<head>

    <meta charset="UTF-8">
    <meta name="theme-color" content="#d47690">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta property="og:image" content="/images/deal.png" />
    <link rel="icon" type="" href="/images/deal.png">
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
    <meta name="googlebot" content="noarchive" />
    <meta name="robots" content="noarchive" />
    <meta property="og:type" content="article" />
    <title>Trang này đang được cập nhật</title>

    @if(isset($dataCompany->seoInfo->description))
    <meta name="description" content="{{ $dataCompany->seoInfo->description }}" />
    @else
    @endif
    @if(isset($dataCompany->seoInfo->key))
    <meta name="keywords" content="{{ $dataCompany->seoInfo->key }}" />
    @else

    @endif
    @if(isset($dataCompany->seoInfo->author))
    <meta name="author" content="{{ $dataCompany->seoInfo->author }}">
    @else

    @endif


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/materia/bootstrap.min.css" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('header')
    <link rel="stylesheet" href="/css/campaign.css">
    <link rel="stylesheet" href="/css/all.css">
    <link rel="stylesheet" href="/css/notFound.css">

</head>
<style>
    :root {
        --main_color2: #dc3f5d;
        --main_color: #dc3f5d;
    }
</style>

<body>
    @if (Session()->has('dataCompany'))
    @include('profile.update')
    @else
    @include('login.login')
    @endif
    <div class="intro__skin-care">
        <div class="intro__skin-care--close" onclick="hideIntroSkinCare()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20" height="20"></rect><g><path d="M14.95 6.46L11.41 10l3.54 3.54-1.41 1.41L10 11.42l-3.53 3.53-1.42-1.42L8.58 10 5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"></path></g></svg>
        </div>
        <div class="intro__skin-care--row">
            <p class="intro__skin-care--title">Soi da nhận ngay e-voucher MIỄN PHÍ</p>
            <a href="/NGOCDUNG">
                <button class="intro__skin-care--button">
                    <p class="intro__skin-care--button--p">Soi da ngay</p>
                </button>
            </a>
        </div>
    </div>
    <div class="content-page">
        @include("campaign.header")
        <div class="container-layout">
            <div class="padding-top-content-page">

            </div>
            <h1 class="text-center notfound__title">Trang này đang được cập nhật</h1>
            <div class="flex-center">
                <button class="notfound__button">
                    <a class="notfound__a" href="/"> Quay về trang chủ </a>
                </button>
            </div>

            <p class="notfound__p"> Chúng tôi không thể tìm thấy đường dẫn trang web của bạn trong hệ thống, hãy kiểm tra lại đường dẫn. Nếu
                có thắc mắc hãy liên hệ với <a href="/" target="_blank"> chúng tôi</a>
            </p>
        </div>

    </div>
    @include('campaign.layout')
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/js/templateForm.js"></script>
    {{-- <script src="/js/welcome.js"></script> --}}
    <script src="/js/contant.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/form.js"></script>
    <script src="/js/login.js"></script>
    <script src="/js/campaign/scroll.js"></script>
    <script src="/js/status.js"></script>
    <script src="/js/campaign/layout.js"></script>
</body>

</html>
            