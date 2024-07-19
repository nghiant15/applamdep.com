
<div class="status-modal-follow " style="display:none"  >
    
    <div class="modal-information">
        <div class="form-information-user1" id="formAccountReq1">
            <div class="status-loader-22">
                <div class="border-loading-spin">
                    <svg class="loading-spin" viewBox="0 0 100 100">
                        <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
                    </svg>
                </div>
            </div>
            <div class="position-close2 position-close3" >
                <svg viewBox="0 0 24 24" size="24" class="sc-11csm01-0 fivNSm" onclick="changeFormLoginFolow()">
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

            <div class="status__isLogin">
                <div class="title-form">
                    <p>Danh sách nhóm zalo</p>

                    <p>Tư vấn chăm sóc da chuyên sâu</p>
                    <p>100% miễn phí</p>

                    
                   
                </div>

                
            </div>
            <div class ="data-follow">
                <div class ="avatar-folow">
            
                    <div class= "fist-column" >
                    <img src ="/zaloGroup/R1.jpg">
                       <span> Nhóm Tư vấn Da cơ bản</span>
                   </div>
                   <a href ="javascript:void(0)" onclick="openZaloGroup()"  href="javascript:void(0)" onclick ="openZaloPage()" class ="follow">Follow </a> 
   
                 
               </div>
    
            </div>
            
         
        </div>

      
    </div>
</div>





<script>

    function changeFormLoginFolow(){
        $('.status-modal-follow').hide();
    }
    function openZaloFollow(){

       var already =  sessionStorage.getItem("follow");
      
       if(already =="true")
       {
       
        $('.status-modal-follow').hide();
       }
       else 
       {
    
        $('.status-modal-follow').show();
       }
   

    }


    function openZaloFollowHomePage(){

var already =  sessionStorage.getItem("followHP");

if(already =="true")
{

    $('.status-modal-follow').show();
}
else 
{

 $('.status-modal-follow').show();
}


}

    function openZaloPage() {
    
        
    }
    function openZaloGroup() {
        sessionStorage.setItem("follow", true);
        window.location.href = "https://zalo.me/g/ziezam154";

        setTimeout(() => {
            changeFormLoginFolow();
        }, 2000);

    }
    
</script>