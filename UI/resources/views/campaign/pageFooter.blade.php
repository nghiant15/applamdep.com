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
    @if(isset($dataCompany->seoInfo->description))
    <meta name="description" content="{{ $dataCompany->seoInfo->description }}" />
    @else
    @endif
    @if(isset($dataCompany->seoInfo->key))
    <meta name="description" content="{{ $dataCompany->seoInfo->key }}" />
    @else
    @endif
    @if(isset($dataCompany->seoInfo->author))
    <meta name="description" content="{{ $dataCompany->seoInfo->author }}" />
    @else
    @endif
    <title>Deal24h.vn - Khám Phá Soi Da, Thử Trang Điểm & được tư vấn 100% Online để nhận Miễn Phí các Evoucher cực hấp
        dẫn</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/materia/bootstrap.min.css" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('header')
    <link rel="stylesheet" href="/css/campaign.css">
    <link rel="stylesheet" href="/css/all.css">
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
        <div class="title_page_footer">
            <h1>
                @if ($contentFooter)
                {!!$contentFooter -> title!!}
                @endif
            </h1>
        </div>
        <div class="container-layout">
            <div class="body_page_footer">

                <h5>
                    Chúng tôi tôn trọng quyền riêng tư cá nhân của bạn.
                </h5>
                @if ($contentFooter)
                {!!$contentFooter -> content!!}
                @endif

            </div>
        </div>

    </div>
    @include('campaign.footer')
    @include('campaign.layout')
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/js/general.js"></script>
    <script src="/js/templateForm.js"></script>
    <script src="/js/welcome.js"></script>
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