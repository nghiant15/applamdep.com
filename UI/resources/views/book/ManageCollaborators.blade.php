@if (Session()->has('dataColor'))
@php
$dataColor = session('dataColor', null);
$dataCompany = Cache::get('webinfo');
$dataCompany_admin = Cache::get('webinfo_admin');
$dataSale = session('dataSale', null);
$dataUserSales = session('dataCompany', null);
$currentURL = Request::url();

if ($dataColor) {
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
    @if (isset($dataCompany))
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
    @endif
    <meta name="googlebot" content="noarchive" />
    <meta name="robots" content="noarchive" />

    <meta property="og:type" content="article" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/materia/bootstrap.min.css" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @yield('header')
    <link rel="stylesheet" href="/css/all.css">
    <link rel="stylesheet" href="/css/campaign.css">
    <link rel="stylesheet" href="/css/collaborators.css" />

    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css" />
</head>
<style>
    :root {
        --main_color: #dc3f5d;
    }
</style>
<script>
    var _id = window.location.pathname.split("/")[2];

</script>
<body>
    @if (Session()->has('dataSale'))
    @include('profile.formCustomer')
    @endif
    @if (Session()->has('dataCompany'))
    @include('profile.update')
    @include('profile.history')
    @include('profile.isVoucher')
    @else
    @include('login.login')
    @endif



    <div class="content-page">
        @include("campaign.header")

        <div class="container-collaborators">

            <div class="status-alert-register-sale">
                <div class="alert">
                    <div class="">
                        <div class="flex-center">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                                    <title>Checkmark</title>
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="32" d="M416 128L192 384l-96-96" />
                                </svg>
                            </div>
                        </div>

                        <div class="content">
                            Đăng ký thành công
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-page">
                <div class="container-layout">
            <div class="header__slug__current">
                <span class="header__slug__current--span">
                    <a href="/">Trang chủ</a>
                    <span>
                        »
                    </span>
                    <a id="my__href__collaborators">Cộng tác viên - cá nhân</a>
                    
                </span>
                </div>
                </div>
        </div>

            @if(isset($dataUser) && $dataUser->phone)
                <div class="collaborators-border-box">
                <div class="collaborators-tabs">
                    <div style="border-left: 1px solid #d8dbe0" class="collaborators-tab collaborators-tab-active"
                        onclick="ToggleView(0)">
                        Danh sách khách hàng
                    </div>
                    <div class="collaborators-tab" onclick="ToggleView(1)">

                        Tổng quan về chiến dịch
                    </div>
                    <div class="collaborators-tab" onclick="ToggleView(2)">
                        Danh số
                    </div>
                    <div class="collaborators-tab" onclick="ToggleView(3)">
                        Thống kê
                    </div>
                </div>
                <div class="collaborators-views">

                    <div class="collaborators-view block">
                        <div class="collaborators-sales collaborators-title">
                            <h1>Danh sách khách hàng</h1>
                            <div id="collaborators-list-sales" class="width-table"></div>
                        </div>

                    </div>

                    <div class="collaborators-view">
                        <div class="collaborators-campaign collaborators-title">
                            <h1>Danh sách chiến dịch</h1>
                            <div id="collaborators-list-campaign" class="width-table"></div>
                        </div>

                    </div>
                    <div class="collaborators-view">
                        <div class="collaborators-sales collaborators-title">
                            <div class="text-center">
                                <h1>Tính năng đang được nâng cấp, hãy chờ đợi!</h1>
                            </div>
                        </div>
                    </div>
                    <div class="collaborators-view">
                        <div id="renderStatistical">

                        </div>
                    </div>
                </div>
            </div>
            @else
            <div style="padding:80px 40px">
                <h1 class="text-center">Vui lòng đăng nhập!</h1>
            </div>
            @endif
        </div>
    </div>
    @include('campaign.footer')
    @include('campaign.layout')

    <div class="status-backToTop-campaign">
        <div class="back-to-top-campaign" onclick="BackToTop()">
            <div class="flex-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-chevron-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z">
                    </path>
                </svg>
            </div>
        </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="/js/templateForm.js"></script>
    <script src="/js/general.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/contant.js"></script>
    <script src="/js/campaign/collaborators.js"></script>
    <script>
        var hrefMyCollaborators = window.location.pathname.split("/")[2];
        $("#my__href__collaborators").attr("href", "/cong-tac-vien/" + hrefMyCollaborators);
        var hrefCoppy = "";
        var data = {!! json_encode($dataUser) !!};
        if (data) {
            hrefCoppy = "/" + data.phone
        };       
        renderListCampaignAndStatistical("collaborators-list-campaign","renderStatistical");
        renderListUser("collaborators-list-sales");            
    </script>
    <script src="/js/main.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/form.js"></script>
    <script src="/js/login.js"></script>
    <script src="/js/campaign/scroll.js"></script>
    <script src="/js/status.js"></script>
    <script src="/js/campaign/layout.js"></script>
</body>
</html>