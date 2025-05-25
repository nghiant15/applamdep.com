
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

<script>    
  var numberTextDp = {!! json_encode($numberText) !!};

  var numbershowUpDp = {!! json_encode($numbershowUp) !!};
 if(numbershowUpDp >0)
 {
    numbershowUpDp  = numbershowUpDp*1000;
 }
 function addPopup(){

    var addressPopup =  $("#txtAddressReward").val();
    if(addressPopup =="")
    {
        $("#txtAddressRewardError").show();
        return;
    }
    else {
          $("#txtAddressRewardError").hide();
    }
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
   
}, numbershowUpDp);


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

            <div class="position-close2 position-close3" id ="closeButton" style ="display:none" onclick="changeFormTuvan()">
                <svg viewBox="0 0 24 24" size="24" class="sc-11csm01-0 fivNSm">
                    <path
                        d="M14.8284 12L19.4142 16.5858C20.1953 17.3668 20.1953 18.6332 19.4142 19.4142
                            C18.6332 20.1953 17.3668 20.1953 16.5858 19.4142L12 14.8284L7.41421 19.4142
                            C6.63317 20.1953 5.36684 20.1953 4.58579 19.4142C3.80474 18.6332 3.80474 17.3668 4.58579 16.5858L9.17157 12
                            L4.58579 7.41421C3.80474 6.63317 3.80474 5.36684 4.58579 4.58579
                            C5.36684 3.80474 6.63317 3.80474 7.41421 4.58579L12 9.17157L16.5858 4.58579
                            C17.3668 3.80474 18.6332 3.80474 19.4142 4.58579C20.1953 5.36684 20.1953 6.63317 19.4142 7.41421L14.8284 12Z"
                        transform=""></path>
                </svg>
            </div>
           
            <div class="status__isLogin body-tu-van" style="
            font-family: 'SFU Futura';
        ">
                   
                
                    <img src ="{{ $dataMinisize->imageLink }}"> 
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
                      placeholder="Hẹn lịch bác sĩ "></textarea >
                    <div class="errorMesssage" id="txtHenLichBacSierrorMesssage">
                    Đặt lịch hẹn, tư vấn,...
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