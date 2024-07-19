@if (Session()->has('dataColor'))
@php
$dataColor = session('dataColor', null);
$dataCompany = Cache::get('webinfo');



 $dataCompany_admin = Cache::get('webinfo_admin');


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
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
    <meta property="og:image" content="/images/tikitech_icon.png" />
    <link rel="icon" type="" href="/images/tikitech_icon.png">
    @if (isset($dataCompany))


    @isset($dataCompany->seoInfo->description)
    <meta name="description" content=" 100% Miễn Phí Trọn Đời, Nâng tầm shop mỹ phẩm bạn, với Hệ Thống Soi Da & Tư Vấn Online .Ngay tại nhà, Kiểm tra & tư vấn, tuổi da & hơn 40 thông số về da khác. Một lần quét, nói với bạn mọi điều .#soidaonline" />

    @endisset


    @isset($dataCompany->seoInfo->key)

    <meta name="keywords" content="{{ $dataCompany->seoInfo->key }}" />

    @endisset
    @isset($dataCompany->seoInfo->author)

    <meta name="author" content="{{ $dataCompany->seoInfo->author }}">

    @endisset
    @isset($dataCompany->seoInfo->imageShare)
    @endisset
    <title> 100% Miễn Phí Trọn Đời, Nâng tầm shop mỹ phẩm bạn, với Hệ Thống Soi Da & Tư Vấn Online .Ngay tại nhà, Kiểm tra & tư vấn, tuổi da & hơn 40 thông số về da khác. Một lần quét, nói với bạn mọi điều .#soidaonline
    </title>
    @endif
    <meta name="googlebot" content="noarchive" />
    <meta name="robots" content="noarchive" />

    <meta property="og:type" content="article" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/materia/bootstrap.min.css" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/all.css">

   
    <link rel="stylesheet" href="/css/campaign.css">

    @yield('header')


</head>

<style>

@keyframes example {
  from {color: #ffffff;}
  to {color:    ;}
}
    :root {
        --main_color: #dc3f5d;
    }

    #myVideo {
  
  width: 100%;
  height: auto;
}
</style>

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
  
    <div id="alert-web">

    </div>
    <div class="content-page">
       
        @include("campaign.header")
        <div class="banner_evoucher">
            <a href="/zasaly">
            <video autoplay muted loop id="myVideo">
                <source src="/hero-banner.mp4" type="video/mp4">
                Your browser does not support HTML5 video.
              </video>
            </a>
        </div>
        <section class="banner_section1">
            <div class="container-layout">

                <div class="banner_evoucher_2">
                    <div id="carouselExampleIndicators2" class="carousel slide classRenderCarousel2"
                        data-ride="carousel">

                    </div>
                </div>
            </div>

        </section>
        
        <section class="banner_section3">
            <div class="container-layout">
                <div class="title-section ">
                    <h2>
                            Nhà cung cấp nổi bật
                    </h2>
                </div>
                <div class="row  js-scroll" id="renderBanner-new" style="margin:0">
                </div>
            </div>
        </section>
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/js/templateForm.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/contant.js"></script>
    <script src="/js/campaign/bannerCampaignHome.js"></script>
    <script src="/js/main.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/form.js"></script>
    <script src="/js/general.js"></script>

    <script src="/js/login.js"></script>
    <script src="/js/status.js"></script>
    <script src="/js/campaign/layout.js"></script>
    <script>
        setTimeout(() => {
            hideIntroSkinCare();
        }, 10000);
        function hideIntroSkinCare(){
            $('.intro__skin-care').hide();
        }
        function renderCarousel2() {
            let data = {!!json_encode($dataGlobal->bannerSmall) !!};
        var li = ``;
        var itemCarousel = ``;
        var html = ``;
        data.forEach((item, i) => {
      
            var imageLink = "http://localhost:3002/public/image_brand/" +item.image_link;
        if (i === 0) {
        li +=
        `<li data-target="#carouselExampleIndicators2" data-slide-to=${i} class="active"></li>`;
        } else {
        li += `<li data-target="#carouselExampleIndicators2" data-slide-to=${i}></li>`;
        };

        if (i === 0) {
        itemCarousel += `
        <div class="carousel-item banner-box-img active  ">
            <a href=${item.hrefLink} target="_blank">        
                <div class="bg-image banner-box-img" style= "background-size: contain; background-image:url('${imageLink}')">
                
                </div>
            </a>
        </div>
        `;
        } else {
        itemCarousel += `
        <div class="carousel-item banner-box-img  ">
     
            <a href=${item.href} target="_blank" >     
                <div class="banner-box-img bg-image"  style="background-size: contain; background-image:url('${imageLink}')">
    
                </div>
            </a>
        </div>

        `;
        };
        });
        html += `
        <ol class="carousel-indicators carousel-indicators1">
            ${li}
        </ol>
        <div class="carousel-inner" style='border-radius:15px'>
            ${itemCarousel}
        </div>
        

        `
        let idRender = document.querySelector(".classRenderCarousel2");

        if (idRender) {
        idRender.innerHTML = html;
        }
    }
    renderCarousel2();
    function renderCarousel1() {
        let data = {!!json_encode($dataGlobal->bannermain) !!};
        var li = ``;
        var itemCarousel = ``;
        var html = ``;
        data.forEach((item, i) => {
           

        var imageLink = "http://localhost:3002/public/image_brand/" +item.image_link;
        if (i === 0) {
        li +=
        `<li data-target="#carouselExampleIndicators1" data-slide-to=${i} class="active"></li>`;
        } else {
        li += `<li data-target="#carouselExampleIndicators1" data-slide-to=${i}></li>`;
        };

        if (i === 0) {
        itemCarousel += `
        <div class="carousel-item carousel-item-banner1 active banner1-box-img ">
            <a href=${item.hrefLink} target="_blank">
                <div class="bg-image carousel-item-banner1" style="background-image:url('${imageLink}')">
                        
                </div>
            </a>
        </div>
        `;
        } else {
        itemCarousel += `
        <div class="carousel-item carousel-item-banner1 banner1-box-img">
            <a href=${item.hrefLink} target="_blank">
                <div class=" carousel-item-banner1  bg-image" style="background-image:url('${imageLink}')">
            

                </div>
            </a>
        </div>

        `;
        };
        });
        html += `
        <ol class="carousel-indicators carousel-indicators1 carousel-indicators2">
            ${li}
        </ol>
        <div class="carousel-inner">
            ${itemCarousel}
        </div>
        <a class="carousel-control-prev a-none-hover" href="#carouselExampleIndicators1" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next a-none-hover" href="#carouselExampleIndicators1" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        `
        let idRender = document.querySelector(".classRenderCarousel1");

        if (idRender) {
        idRender.innerHTML = html;
        }
    }
    renderCarousel1();

    $('.carousel').carousel({
        interval: 2000
    });
    async function callApiWeb(){
    // await getAllCampaign("renderBanner", "0");
    await getAllCampaign("renderBanner-new", "1");
    // let loadingweb = document.querySelector(".loading-bg");
    // if(loadingweb){
    // loadingweb.style.display = "none";
    // }
    };


    var dataWeb = {!!json_encode($dataGlobal) !!};
    callApiWeb();
        
    
    </script>
</body>

</html>