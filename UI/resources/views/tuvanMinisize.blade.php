
@php
     $dataMinisize =  session('dataminisize', null);
     $numberText =  3;

     if(property_exists($dataMinisize, "countDown"))
     {
        $numberText =   $dataMinisize->countDown;
     }

     $numbershowUp=  3;

     if(property_exists($dataMinisize, "showUp"))
     {
        $numbershowUp =   $dataMinisize->showUp;
     }
     
   


@endphp
<style>
    /* bannerTuVan.jpg */
    .form1{
       
    }
    .frompopup input,textarea {
        margin-bottom: 10px;
       border-color: #84b5df !important;
    }

    .tuvanform1 {
     
        border-radius: 25px;

        max-width: 380px !important;
       
        background-position: center;
    /* background-size: 100% 100%; */

    }

    .title_nav-tuvan {
        text-align: center;
        


    }
    .bottom-button img {
        width: 30px;
    }
    .body-tu-van {

        /* margin-top: 61px; */
    }
   
    .title_nav-tuvan  

    {
       
   }
   .title_nav-tuvan p {
    font-size: 15px;
    color:  rgb(252, 22, 35);


    /* -webkit-text-stroke: 0.05px  rgb(252, 22, 35); */
    font-weight: bold;
   }
   .bottom-button {
    width: 100%;
    text-align: center;
    font-size: 13px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
   }
   .bottom-button a:hover {
    opacity: 0.7;
   }
   .bottom-button a {


    height: 30px;
    display: flex;
    background-color: #9946e8;
    border-radius: 10px;
    color: #ffffff;
    font-size: 13px;

   }
   .zalobac {
    background-color: #1272e8 !important;
   }
   .bottom-button a span {
     color: #ffffff;
     text-align: center;
     margin: auto;
   }
   .des-introduction{
    text-align: center;
    color:  rgb(2, 52, 157);
    /* -webkit-text-stroke: 0.01px  rgb(241, 163, 173); */
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
   }
   .des-title{
    text-align: center;
    color:  rgb(2, 52, 157);
    /* -webkit-text-stroke: 0.6px   rgb(2, 52, 157); */
    /* font-size:22px; */
    font-weight: 600;
    /* margin-top: 58px; */
    
   }
   .des-price{
    text-align: center;
    color: rgb(247, 27, 41);
    font-size: 22px;
    font-weight: 600;
    /* -webkit-text-stroke: 0.05px rgb(247, 27, 41); */
    margin-bottom: 15px;
    margin-top: 15px;
   }
   .des-register{
    margin: ạuto;
    margin-bottom: 20px;
   
    border-radius: 10px;
    width: 100%;
    text-align: center;
    color:  rgb(250,251,254);
    font-size:17px;
    font-weight: bold;
   }
   .des-register a {
    width: max-content;
    background-color:  rgb(20, 88, 223);
    color:#ffffff;
    
    margin: auto;
border-radius:30px;
   }
   .des-register a {
    width: max-content;
    padding: 5px 14px;
   
 


   }
   .des-register img {
    width:20px;
  
 


   }
   .des-register a:hover {
    text-decoration: none;
    color:  rgb(250,251,254 )!important;
    opacity: 0.7;


   }
   .number {
    background-color: black;
    color: #ffffff;
    width: 26px;
    border-radius: 50%;
    text-align: center;
   }

   .btn_formPopup {
    height: 45px;
    font-size: 14px;
    display: flex
;
    width: 100%;
    border: 1px solid #f33f2e;
    outline: none !important;
    color: white;
    text-transform: uppercase;
    font-family: var(--font-main);
    font-style: normal;
    font-weight: 400;
    justify-content: center;
    align-items: center;
    padding: 14px;
    background: #f33f2e ;
    position: relative;
    border-radius: 8px;
}
.frompopup {
   padding-bottom:10px;
   padding-top:10px;
}



</style>

<style>
 

    .overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .popup {
      background: linear-gradient(to bottom, #639dd5, #aac8e5);
      color: #fff;
      padding: 30px 20px;
      border-radius: 12px;
      width: 380px;
      max-width: 100%;
      box-shadow: 0 0 15px rgba(0,0,0,0.3);
      text-align: center;
      position: relative;
    }

    .popup h1 {
      font-size: 18px;
      color: #ffffff;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .big-title {
      font-size: 32px;
      font-weight: bold;
      color: #7ff8ff;
      text-shadow: 1px 1px 3px #003366;
      margin-bottom: 10px;
    }

    .sub {
      font-size: 14px;
      color: #ffe97a;
      margin-bottom: 15px;
      font-weight: bold;
    }

    .countdown {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 15px;
      flex-wrap: wrap;
    }

    .time-box {
      background: #ffffff;
      color: #002b55;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 22px;
      font-weight: bold;
      min-width: 65px;
    }

    .time-box span {
      display: block;
      font-size: 12px;
      color: #777;
    }

    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 10px;
      font-size: 15px;
    }

    .btn {
      background: #fff;
      color: #002b55;
      font-weight: bold;
      padding: 6px 15px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      box-shadow: 1px 1px 2px #aaa;
      white-space: nowrap;
    }

    .highlight {
      color: #ff4444;
      font-weight: bold;
    }

    .progress-container {
      background-color: #f0f0f0;
      border-radius: 10px;
      height: 8px;
      width: 100%;
      margin-top: 10px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      width: 75%;
      background-color: #0033cc;
    }

    .close-btn {
      position: absolute;
      top: 8px;
      right: 12px;
      background: #ffffff;
      color: #333;
      border: none;
      border-radius: 50%;
      font-size: 16px;
      width: 25px;
      height: 25px;
      cursor: pointer;
      font-weight: bold;
    }

    .open-btn {
      margin: 20px auto;
      display: block;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
    }

    @media (max-width: 480px) {
      .popup {
        padding: 20px 10px;
      }

      .big-title {
        font-size: 26px;
      }

      .time-box {
        font-size: 18px;
        padding: 8px 12px;
        min-width: 55px;
      }

      .btn {
        font-size: 13px;
        padding: 5px 10px;
      }

      .popup h1 {
        font-size: 16px;
      }

      .info {
        font-size: 14px;
      }
    }
  </style>

<script>    
  var numberTextDp = {!! json_encode($numberText) !!};

  var numbershowUpDp = {!! json_encode($numbershowUp) !!};
 if(numbershowUpDp >0)
 {
    numbershowUpDp  = numbershowUpDp*1000;
 }
 function addPopup(){

    var addressPopup =  $("#txtAddressReward").val();

    var henLichBacSiPopup =  $("#txtHenLichBacSi").val();

    if(henLichBacSiPopup =="")
    {
        $("#txtHenLichBacSierrorMesssage").show();
         return;
    }
    else 
    {
         $("#txtHenLichBacSierrorMesssage").hide();
    }

    var bodyRequest =  {
            address : addressPopup,
            contentAddvice: henLichBacSiPopup,
            slug:  slugInput,
            phone: phoneNumberUser
    };
    $.ajaxSetup({
        headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });
    $.ajax({
        type: "POST",
        data: bodyRequest,
        url: "https://ai.exomiyo.com/add-popup",
        success: function(data) {
            $("#textDisplay").show();
            $("#btnReward").hide();
            document.getElementById("contentResultAI").innerHTML +=  data;
        },
        error: function(error) {
        
        }
    });
        
 }
 setTimeout(() => {
      $("#socialBLock").show();
 }, 10000);
setTimeout(() => {  
    
    if( showOrHide  == "false" ||  showOrHide =="0") 
        return;

    $(".tuvanform").show();

    const myInterval = setInterval(myTimer, 1000);


 var countdown = numberTextDp;
 function myTimer() {
    countdown = countdown-1;
    if( countdown <1)
    {
        myStop();
    }
    let countDownText = countdown +'';
    if(countdown < 10)
    {
        countDownText = '0'+ countdown;
    }
    $("#numberText").text(countDownText);


    function myStop() {
    
    $("#numberText").hide();
    setTimeout(() => {
        $("#closeButton").show();
    }, 300);
  clearInterval(myInterval);
}

    
}
   
}, 15000);





let countdownInterval;
  function startCountdown() {
    clearInterval(countdownInterval);
    const countdownTime = new Date().getTime() + 25 * 60 * 1000;

    countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTime - now;

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      document.getElementById('hours').innerText = String(hours).padStart(2, '0');
      document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
      document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

      if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
      }
    }, 1000);
  }

 startCountdown();
 
</script>
<div class="status-modal-account tuvanform " >
    
    <div class="modal-information form1 ">
        <div class="form-information-user tuvanform1" id="formTuVan" style="
        padding: 8px !important;
    ">
            <div class="status-loader-22">
                <div class="border-loading-spin">
                    <svg class="loading-spin" viewBox="0 0 100 100">
                        <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
                    </svg>
                </div>
            </div>

            <div class="position-close2 position-close3" onclick="changeFormTuvan()">
               <span class ="number" id ="numberText" >6 </span>
            </div>

           
            <div class="status__isLogin body-tu-van" style="
            font-family: 'SFU Futura';
        ">
                   
                
                    <!-- <img src ="{{ $dataMinisize->imageLink }}">  -->

                     <div class="popup">
    <button class="close-btn" onclick="changeFormTuvan()">×</button>
    <h1>ĐẶT HÀNG LIỀN TAY NHẬN NGAY</h1>
    <div class="big-title">Ưu đãi khủng</div>
    <div class="sub">Thời gian ưu đãi kết thúc sau</div>

    <div class="countdown">
      <div class="time-box"><span id="hours">00</span><span>Giờ</span></div>
      <div class="time-box"><span id="minutes">00</span><span>Phút</span></div>
      <div class="time-box"><span id="seconds">00</span><span>Giây</span></div>
    </div>

    <div class="info">
      <div class="btn">Nhanh tay lên</div>
      <div>Số lượng chỉ còn <span class="highlight">68</span> sản phẩm</div>
    </div>

    <div class="progress-container">
      <div class="progress-bar"></div>
    </div>
  </div>
                    <form class="formReward frompopup" id="formLogin" style="overflow: hidden">
                    <div class="form-group">
                    <input  type="text" class="my-form-control fullName" id="txtAddressReward" placeholder="Địa chỉ nhận quà">
                    <div class="errorMesssage" id="txtAddressRewardError">
                    Yêu cầu nhập địa chỉ nhận quà
                    </div>
                    </div>
                    <div class="form-group">
                    <div id="toggleNumber">
                    <textarea   type="text" rows = "4" class="my-form-control userName" id="txtHenLichBacSi"
                      placeholder="Thời gian mong muốn được tư vấn "></textarea >
                    <div class="errorMesssage" id="txtHenLichBacSierrorMesssage">
                    Thời gian mong muốn được tư vấn,...
                    </div>
                    </div>
                    </div>


                    <p id ="textDisplay" style="display:none;
                    font-weight: bold;
                    text-align: center;
                    color: red;
                    ">Bạn đã đặt lịch thành công, hãy để ý điện thoại."</p>
                    <div class="mt-4">



                  <button type="button" id="btnReward" onclick="addPopup()" class="btn_formPopup btn-shadow">
                        <p style="
                        margin: auto;
                        ">
                        Đăng ký tư vấn miễn phí
                        </p>
                    
                    </button>
                    </div>
                    </form>
                   

                   
            </div>

        
        </div>
    </div>
</div>






<script>
    function changeFormTuvan(){
        $('.status-modal-account').hide();
      
    }

</script>