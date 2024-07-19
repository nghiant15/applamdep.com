@extends('layout')

@section('header')
<title>Trang chủ </title>
<meta name="theme-color" content="#d47690">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
<link rel="stylesheet" href="/css/soidanew.css">
<link rel="stylesheet" href="/css/reponsive.css">
<script src="/js/main.js"></script> 
@endsection
@section('contentpage')


<div class="body-image">
    <div class="img-top">
        <img src="/images/Group3.png">
    </div>
    <div class="image-body">
        <img src="/images/avatar.png">
    </div>
    <div class="img-bottom">
        <img src="/images/Group4.png">
    </div>
</div>

<div class="nav-button">

    <a href="bat-dau-soi-da"> <img src="/images/arrow.png"> BẮT ĐẦU </a>

</div>

<div class="introduction">
    <img src="/images/introductionImage.png">
    <div class="introduction-text">
        <span class="bold-text">

            Được tạo bởi <br>
            Công nghệ Trí tuệ nhân tạo
        </span>
        <span class="normal-text ">
            Phát hiện, phân tích và so sánh <br> <span class="bold-text">7 dấu hiệu lão hóa</span> và tiếp
            nhận thói quen chăm sóc da <span class="bold-text">phù hợp với bạn</span>.
        </span>
    </div>


</div>

<div class="content-avatar2">
    <img src="/images/bodyimage2.png">
</div>

<div class="content-avata3">
    <img src="/images/Group16.png">

</div>

<div class="homepage-bottom">
    <p class="bold-text"> Chỉ với 3 bước: </p>

    <span class="normal-text ">Phân tích và so sánh các dấu hiệu lão hoá của bạn</span>
    <span class="normal-text ">Cho một làn da khoẻ mạnh </span>

    <div class="row_bottom">
        <div class="coumn-nav-menu nav-column1">
            <img src="/images/icon1.png">
            <span class="bold-text">1 - Chọn một bức hình</span>
        </div>
        <div class="coumn-nav-menu nav-column2">
            <img src="/images/profile.png">
            <span class="bold-text">2 - Điền thông tin</span>
            <span class="bold-text"> của bạn </span>
        </div>

        <div class="coumn-nav-menu nav-column3">
            <img src="/images/matrix.png">
            <span class="bold-text">3 - Khám phá ma trận</span>
            <span class="bold-text"> làn da của bạn</span>
        </div>
    </div>

</div>
@endsection