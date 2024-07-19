
<style>
    /* bannerTuVan.jpg */
    .tuvanform1 {
        background-image: url("/bannerTuVan.png");
        background-size: cover;
        border-radius: 25px;

    }

    .title_nav-tuvan {
        text-align: center;
        


    }
    .bottom-button img {
        width: 30px;
    }
    .body-tu-van {

        margin-top: 50px;
    }
   
    .title_nav-tuvan  h4 {
    font-size: 22px !important;
    color: red;
    font-weight: bolder !important;
   }
   .bottom-button {
    width: 80%;
    text-align: center;
    font-size: 13px;
    margin: auto;
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
    font-size: 22px !important;
    color: black;
    text-align: center;
    margin-bottom: 14px;
    margin-bottom: 10px;
    font-weight: bolder !important;
   }
</style>
<div class="status-modal-account tuvanform " >
    
    <div class="modal-information ">
        <div class="form-information-user tuvanform1"  id="formTuVan">
            <div class="status-loader-22">
                <div class="border-loading-spin">
                    <svg class="loading-spin" viewBox="0 0 100 100">
                        <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
                    </svg>
                </div>
            </div>
            <div class="position-close2" onclick="changeFormTuvan()">
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
                   
                <div class="">
                    <div class="title_nav-tuvan">
                        <h4>Đăng ký </h4>
                        <h4>Tư vấn chăm sóc da Online </h4>
                   </div>
                  
                    <div class ="des-introduction">
                            Cùng các chuyên gia Da Liễu
                    </div>

                   <div class ="bottom-button">
                        <a class ="zalobac" onclick="OpenAction('zalo')" >
                             <img src = "/zaloClick.jpg">  
                             <span> Tư vấn chăm sóc da Zalo </span>   
                        </a>
                        
                    </div>

                    <div class ="bottom-button">
                        <a onclick="OpenAction('messenger')">
                             <img src = "/messengerClick.png">  
                             <span> Tư vấn chăm sóc da Messenger </span>   
                        </a>
                        
                    </div>

                   
                </div>
            </div>

        
        </div>
    </div>
</div>






<script>
    function changeFormTuvan(){
        $('.status-modal-account').hide();
    }
</script>