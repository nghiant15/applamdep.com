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
<div class="slidebanner" style="display:none;">
    <div class="slidebannerItem">
        <div class="avatar"> 
            <img  src="/images/step1.png" >
        </div> 
        <div class="text-column">
             <span>Tháo kính tẩy trang </span>
        </div>
     </div>
     <div class="slidebannerItem">
        <div class="avatar"> 
            <img  src="/images/step1.png" >
        </div> 
        <div class="text-column">
             <span>Chụp cận mặt </span>
        </div>
     </div>
     <div class="slidebannerItem">
        <div class="avatar"> 
            <img  src="/images/step1.png" >
        </div> 
        <div class="text-column last-item">
             <span>Giữ biểu cảm của bạn trung tính và sử dụng ánh sáng tự nhiên, dịu nhẹ </span>
        </div>
     </div>

    

</div>

<div class="takeCamera">
    <img src="/images/imageTakeCamera.png"> 
</div>



<div class="nav-menu"> 
    
    <div class="uploadButton uploadImage"> 
       
        <div class="nav-avatar"> 
            <img src="/images/photos.png">
            
        </div>
        <div class="text"><a > Tải ảnh lên </a></div>
    </div>
    <div class="uploadButton cameraNow"> 
       
        <div class="nav-avatar"> 
            <img src="/images/photos.png">

        </div>
        <div class="text"><a  href="/camera.html">Chụp ảnh ngay </a></div>
    </div>
    

</div>
<div class=" startPage-boldTitle">
    HÌNH ẢNH CỦA BẠN SẼ ĐƯỢC XOÁ NGAY SAU KHI HẾT PHÂN TÍCH
</div>
<div class="description-text"> 
         <p>Ảnh tự chụp của bạn sẽ được phân tích và so sánh với hơn 10 000 bức ảnh đã được phân loại bằng một thuật toán trí tuệ nghệ thuật</p>
         <p>Để có kết quả nhất quán theo thời gian, chúng tôi khuyên bạn nên chụp ảnh tự sướng bằng điện thoại thông minh thế hệ cuối cùng. Chúng tôi khuyến khích bạn sử dụng cùng một máy ảnh và các điều kiện ánh sáng tương tự. Vui lòng tham khảo hướng dẫn chụp ảnh tự sướng để biết các điều kiện phân tích tối ưu.</p>
</div>

@endsection