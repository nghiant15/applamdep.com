<html>

<head>
    <title>Soi da </title>
    <meta name="theme-color" content="#d47690">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="/css/soidanew.css">
    <link rel="stylesheet" href="/css/reponsive.css">
    <link rel="stylesheet" href="/css/reward.css">
    <script src="/js/main.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    
</head>

<body>
    <div class="content-page"> 
  
  <div class="content-plugin">
    <div class="banner">
             <span class="titleBanner"> BANNER</span>
     </div>
   
     <div class="hadernav">
         <div  class="title-header">
             <span class="soida">SOI DA</span> 
             <span class="online">ONLINE</span>
             <span class="ai">AI </span>
         </div> 
   
         <div class="sologan"> 
             <img src= "/images/navabar.svg">
             <span>Ứng dụng soi da với công nghệ AI hiện đại *</span>
         </div>
   
           <div class="text-center-paragrapb"> 
             <p> 
                 4- Điền form nhận quà hấp dẫn
             </p>
             <img src="/images/start-direct.png"> 
   
           </div>
   
           
             
   
          
   
   
     </div>
     <div class="form-input" >
           
       <form id ="formReward">
         <div class="form-row">
                 <div class="col">
   
                   <div class="form-group">
                     <label for="exampleFormControlInput1">Họ và tên</label>
                     <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Nhập họ và tên">
                   </div>
                 </div>
                 <div class="col">
                   <div class="form-group">
                     <label for="exampleFormControlInput1">Tuổi</label>
                     <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Nhập tuổi của bạn">
                   </div>
                 </div>
         </div>

         <div class="form-group">
            <label >Địa chỉ email</label>
            <input type="email" class="form-control"  placeholder="Địa chỉ email">

          </div>
   
          <div class="form-group">
            <label >Số điện thoại</label>
            <input type="email" class="form-control"  aria-describedby="phoneNumber" placeholder="Nhập số điện thoại liên lạc">
            <small id="emailHelp" class="form-text text-muted">Trường này yêu cầu bắt buộc nhập.</small>
          </div>
   
   
       <div class="submit-form">
         <button> <img src="/images/arrow.png"> Nhận quà </button> 
       </div>
         
   
       </form>
   
   
     </div>
     
                 
         </div>
     </div>
     
    @include('new.popupLoading')

    @include('new.popupSuccess')
</body>

</html>