@if (Session()->has('dataColor'))
@php
$dataColor = session('dataColor', null);
$dataCompany = Cache::get('webinfo');
$dataCompany_admin = Cache::get('webinfo_admin');
$dataSale = session('dataSale', null);
$dataUserSales = session('dataCompany', null);

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
    <meta name="googlebot" content="noarchive" />
    <meta name="robots" content="noarchive" />

    <meta property="og:type" content="article" />


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.5.2/materia/bootstrap.min.css" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/all.css">
    <link rel="stylesheet" href="/css/campaign.css">
    <link rel="stylesheet" href="/css/collaborators.css" />
    @yield('header')
</head>
<style>
    :root {
        --main_color: #dc3f5d;
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

    <div class="status-loading-register-collaborators">
        <div class="loading_get_voucher2">
            <div>
                <div class="position-loading_get_voucher2">
                    <div class="border-loading-spin">
                        <svg class="loading-spin" viewBox="0 0 100 100">
                            <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="content-page">
        @include("campaign.header")

        <div class="container ">

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
            <div class="header__slug__current">
                <span class="header__slug__current--span">
                    <a href="/">Trang chủ</a>
                    <span>
                        »
                    </span>
                    <a href="/cong-tac-vien/dang-ky">Đăng ký cộng tác viên</a>
                    
                </span>
            </div>
            <div class="box-register-collaborators  ">
                <h1 class="title-collaborators-register">

                    ĐĂNG KÝ CỘNG TÁC VIÊN
                </h1>
                <form class="well form-horizonta form-collaborators">
                    <fieldset class=" text-center">
                        <div class="row" style="padding: 0;margin:0">
                            <div class="form-group col-w50-mobi col-md-6  col-sm-12" style="padding:0 8px">
                                <label class=" control-label">Tài khoản<span>(*)</span></label>
                                <div class=" inputGroupContainer">
                                    <div class="input-group">

                                        <input name="salesNameRegister" id="salesAccountRegister"
                                            placeholder="Tên tài khoản" class="my-form-control" type="text">

                                    </div>
                                    <div class="errorMesssage" id="salesAccountRegisterError">
                                        Không dược bỏ trống
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-w50-mobi col-md-6  col-sm-12" style="padding:0 8px">
                                <label class="control-label">SĐT liên hệ <span>(*)</span></label>
                                <div class=" inputGroupContainer">
                                    <div class="input-group">

                                        <input name="last_name" id="salesNumberRegister" placeholder="Số điện thoại"
                                            class="my-form-control" type="text">

                                    </div>
                                    <div class="errorMesssage" id="salesNumberRegisterError">
                                        Không dược bỏ trống
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="padding: 0;margin:0">
                            <div class="form-group col-w50-mobi col-md-6  col-sm-12" style="padding:0 8px">
                                <label class=" control-label">E-Mail</label>
                                <div class=" inputGroupContainer">
                                    <div class="input-group">

                                        <input name="salesEmailRegister" placeholder="E-Mail" class="my-form-control"
                                            type="text" id="salesEmailRegister">

                                    </div>
                                    <div class="errorMesssage" id="salesEmailRegisterError">
                                        Không dược bỏ trống
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-w50-mobi col-md-6 col-sm-12" style="padding:0 8px">
                                <label class=" control-label">SĐT giới thiệu </label>
                                <div class="inputGroupContainer">
                                    <div class="input-group">

                                        <input name="last_name" id="salesNumberIntroduceRegister"
                                            placeholder="Số điện thoại" class="my-form-control" type="text">

                                    </div>
                                    <div class="errorMesssage" id="salesNumberIntroduceRegisterError">
                                        Không dược bỏ trống
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <div class="collaborators-rules">
                            Bằng việc tiếp tục, bạn đồng ý với <a href="/dieu-khoan-va-su-dung">điều khoản sử dụng </a>
                            của
                            deal24h.vn
                        </div>
                        <div>
                            <div class="flex-center flex-center" style="padding:0 8px;    margin-bottom: 1rem;">
                                <div class="flex-center">
                                    <input checked type="checkbox" id="checkboxRegister" class="checkbox-style"
                                        name="hosting" />

                                    <label class="control-label2" style="margin:auto 6px !important;width:auto">
                                        Đồng ý
                                    </label>
                                </div>

                            </div>
                            <div class="errorMesssage text-center" style="" id="checkboxRegisterError">
                                Không dược bỏ trống
                            </div>
                        </div>
                    </fieldset>
                </form>
                <div style="width:100%;padding:0 8px;" class="flex-center">

                    <button type="submit" onclick="RegisterCollaborators()" class="btn_form btn-shadow">
                        <p>Đăng ký ngay</p>
                    </button>
                </div>

            </div>
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
    <div id="popup-share-link">
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="/js/templateForm.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/contant.js"></script>
    <script src="/js/campaign/collaborators.js"></script>
    <script src="/js/general.js"></script>
    
    <script src="/js/main.js"></script>
    <script src="/js/welcome.js"></script>
    <script src="/js/form.js"></script>
    <script src="/js/login.js"></script>
    <script src="/js/campaign/scroll.js"></script>
    <script src="/js/status.js"></script>
    <script src="/js/campaign/layout.js"></script>
    <script>
        var phoneUser;
        var titleHrefShare = 'Đường dẫn liên kết Seoulspa của Bạn';
        var hrefShare = 'https://deal24h.vn/seoulspa/';
            
        function RegisterCollaborators() {       
                const checkbox = document.getElementById("checkboxRegister");
                if (checkbox.checked) {
                    $("#checkboxRegisterError").css('display', 'none');
                    const check = CheckFormCollaboratos();
                    
                    if (check) {
                        const phoneRegister = $("#salesNumberRegister").val();
                        $(".status-loading-register-collaborators").css("display", "block");
                        $.ajaxSetup({
                            headers: {
                                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                            }
                        });
                        $.ajax({
                            url: api.serve.baser_urlServer + "/" + api.serve.api_registerCollaborators,
                            type: "post",
                            data: {
                                "username": $("#salesAccountRegister").val(),
                                "email": $("#salesEmailRegister").val(),
                                "phone": $("#salesNumberRegister").val(),
                                "address": "",
                                "name": "",
                                "relCode": $("#salesNumberIntroduceRegister").val(),
                                "introduction": $("#salesNumberIntroduceRegister").val(),
                                "password": "",
                            },
                            success: function(response) {
                                if (response.is_success) {
                                    let phoneInputLogin;
                                        if($("#salesPassword").val() !== ""){
                                            phoneInputLogin = $("#salesPassword").val()
                                        }else{
                                            phoneInputLogin = $("#salesNumberRegister").val()
                                        }
                                        
                                    $.ajaxSetup({
                                                    headers: {
                                                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                                                    }
                                                });

                                    $.ajax({
                                                url: api.serve.baser_urlServer + "/" + api.serve.api_loginServer,
                                                type: "post",
                                                data: {

                                                    "username": $("#salesAccountRegister").val(),
                                                    "phoneNumber": $("#salesNumberRegister").val(),
                                                },
                                                success: function (response) {
                                                
                                                },
                                                error: function (jqXHR, textStatus, errorThrown) {

                                                }
                                    });
                                    setTimeout(() => {
                                        $(".status-loading-register-collaborators").css("display", "none");                                           
                                        
                                        ToggleAlert(true, "Đăng ký thành công, đến quản trị", true);   

                                        setTimeout(()=>{
                                            ToggleAlert(false, "", false);                
                                                              
                                            window.location.href = `/cong-tac-vien/${phoneRegister}`                                          
                                        },1200);
                                    }, 1000)
                                  
                                } else {
                                    $(".status-loading-register-collaborators").css("display", "none");

                                    Swal.fire({
                                        position: 'top-center',
                                        icon: 'error',
                                        title: 'Tài khoản hoặc số điện thoại đã được sủ dụng',
                                        showConfirmButton: false,
                                        timer: 1000
                                    })
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown) {

                            }
                        });
                    }
                } else {
                    $("#checkboxRegisterError").css('display', 'block');
                    $("#checkboxRegisterError").html('Hãy chấp nhận điều khoản của chúng tôi !');
                }
            };
    
    </script>
</body>

</html>