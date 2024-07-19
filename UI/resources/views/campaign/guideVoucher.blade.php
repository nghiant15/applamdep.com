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
    @if(isset($dataCompany->seoInfo))
    <meta name="description" content="{{ $dataCompany->seoInfo->description }}" />
    <meta name="keywords" content="{{ $dataCompany->seoInfo->key }}" />
    <meta name="author" content="{{ $dataCompany->seoInfo->author }}">
    <title>Hướng dẫn sử dụng voucher</title>
    @endif
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/materia/bootstrap.min.css" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('header')
    <link rel="stylesheet" href="/css/all.css">

    <link rel="stylesheet" href="/css/campaign.css">
    <link rel="stylesheet" href="/css/collaborators.css" />

</head>
<style>
    :root {
        --main_color: #dc3f5d;
    }
</style>

<body>
    @if (Session()->has('dataCompany'))
    @include('profile.update')
    @else
    @include('login.login')
    @endif

    <div class="content-page">
        @include("campaign.header")
        <div class="container-layout">
            <div class="header__slug__current">
                <span class="header__slug__current--span">
                    <a href="/">Trang chủ</a>
                    <span>
                        »
                    </span>
                    <a href="/huong-dan-su-dung-voucher">Hướng dẫn sử dụng voucher</a>
                    
                </span>
            </div>
            <div class="">
                <h5 class="guide__voucher__title">
                    Bật mí cách dùng voucher quà tặng hiệu quả khi mua sắm tiêu dùng
                </h5>
                <div class="guide__voucher__box-img">
                    <img src="/images/Evoucher/guide-voucher.webp" />
                </div>
                <div class="guide__voucher__content">
                    @if (isset($dataCompany_admin->guideVoucher))
                    {!!$dataCompany_admin->guideVoucher!!}
                    @endif
                </div>
            </div>
        </div>

    </div>
    @include('campaign.footer')
    @include('campaign.layout')
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/js/templateForm.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/contant.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/form.js"></script>
    <script src="/js/general.js"></script>
    <script src="/js/login.js"></script>
    <script src="/js/campaign/scroll.js"></script>
    <script src="/js/status.js"></script>
    <script src="/js/campaign/layout.js"></script>
</body>

</html>