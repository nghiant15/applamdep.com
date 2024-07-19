@extends('layout')

@section('header')
<title>Soi da </title>
      <meta name="theme-color" content="#d47690">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="/css/soidanew.css">
      <link rel="stylesheet" href="/css/reponsive.css">
      <link rel="stylesheet" href="/css/sanphamgoiy.css">
      <link rel="stylesheet" href="/css/reward.css">
      <script src="/js/form.js"></script>
      <script src="/js/contant.js"></script>
      <script src="/js/main.js"></script>
      <script src="/js/result.js"></script>
      <script src="/js/login.js"></script>
      <script src="/js/templateForm.js"></script>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

      <!-- ASSETS CDN SLICK -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
@endsection
@section('contentpage')
<script> 
    
  var slugGlobal = {!! json_encode($slug) !!};

  var companyId = {!! json_encode($companyId) !!};

</script>
<div class="recomend-title-box"> 

      <div class="centerText"> 
      <p>GỢI Ý TỪ CHUYÊN GIA</p>
      <img src="/images/start-direct.png"> 

      </div>
      <div  class="title-strong"> 
      <p> GỢI Ý CHĂM SÓC DA CHO BẠN ĐƯỢC CHUYÊN GIA DA LIỄU ĐỀ XUẤT</p>
      </div>
</div>




<div id = "list-product">



</div>

  




{{-- <div class="nav-bar-product-item">
<div class="button-control">
      <img src ="/images/arrowback.png" > 
</div> 

<div class="nav-button-slide">
    <span class="active"> </span>
    <span class="active"> </span>
    <span > </span> 
    <span > </span>
</div> 
<div class="button-control right-text">
<img src ="/images/arrorwnext.png" > 
</div>

</div>   --}}






<div class="box-class-center" style ="height:77px">
<p>Hãy nhớ đặt lịch thăm khám thường xuyên với bác sĩ da liễu của bạn 
  để được kiểm tra da toàn diện
   </p>
</div>







@if( $slug == 'bibabo' )
<div class="nav-button-reward">

<a href="javasript:void(0)" > <img src="/images/arrow.png"> THAM GIA ĐIỀN FORM NHẬN QUÀ HẤP DẤN </a> 
</div>

<div class="form-input">
           
  <form id="formReward">
    <div class="form-row">
            <div class="col">

              <div class="form-group">
                <label for="exampleFormControlInput1">Họ và tên  <span>(*)</span></label>
                <input type="text" class="form-control" id="idFullName" placeholder="Nhập họ và tên">
                <div id ="fullNameError" class="errorReward">
                 Họ và tên không được bỏ trống?.
                </div>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="exampleFormControlInput1">Số điện thoại <span>(*)</span> </label>
                <input type="text" class="form-control" id="idphoneNumber" placeholder="Nhập số điện liên lạc">

                <div id = "phoneError" class="errorReward">
                  Số điện thoại không được bỏ trống.
                </div>
              </div>
            </div>
    </div>

    <div class="form-group">
       <label>Địa chỉ email</label>
       <input type="email" class="form-control" id ="email"  placeholder="Địa chỉ email">

     </div>


  <div class="submit-form">
    <a id ="btnRewardClick" href="javascript:void(0)" onclick="submitreward()"> <img src="/images/arrow.png" > Nhận quà </a> 

    <a id="btnrewardLoading"  type="button" disabled="">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
       Đang gửi yêu cầu
    </a>
  </div>

  
    

  </form>


</div>

<div class="form-result-success"> 
    <h2> CHÚNG TÔI VỪA GHI NHẬN THÔNG TIN CỦA BẠN</h2>
    <p>Sẽ liên hệ lại với bạn trong thời gian sớm nhất </p>

</div>
@endif








{{-- <div class="button-nav-page-container">

  <div class="button-nav-page">
    <button> Quay lại </button>


  <button> Trang chủ </button>
  </div>
  
</div> --}}

{{-- <div class="nav-button-row btnRecomend">
<a href="javascript:void(0)"> <img src="/images/arrow.png"> Lưu kết quả về máy </a> 
<a href="javascript:void(0)"> <img src="/images/arrow.png"> Liên hệ tư vấn </a> 
</div> --}}

<script> 

var companyIdGlobal = {!! json_encode($companyId) !!};
$(document).ready(function(){ 


  var resultCheck = sessionStorage.getItem("_t");
            if(resultCheck ==null)
            {
                
                window.location.href ="/";

            }
            else 
            {
                 objectReponse = JSON.parse(resultCheck);
            }
            
        
            
        

            drawProduction(objectReponse.data.facedata.hintResult);

            

}) 

</script>
@endsection