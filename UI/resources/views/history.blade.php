<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="theme-color" content="#d47690">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lobster&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap" rel="stylesheet">
    
    <!-- <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script> -->

    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"></script>
    <!-- <link rel="stylesheet" href="http://localhost:5000/contain/css/style.css" /> -->
    <link rel="stylesheet" href="/css/style.css">
    <!-- <link rel="stylesheet" href="https://ungdungsoida.netlify.app/contain/css/style.css" /> -->

    <title>Lịch sử soi da</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="./assets/aos/aos.css">
    <link rel="stylesheet" href="./styles/skin_screening/index.css">
    <link rel="stylesheet" href="./styles/skin_screening/responsive.css">
    <link rel="stylesheet" href="./styles/global/index.css">
    <link rel="stylesheet" href="./styles/global/global_responsive.css">
    <!-- ASSETS CDN SLICK -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
    
    <link rel="stylesheet" type="text/css"
        href=" https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

        <link rel="stylesheet" href="/css/main.css">

        
</head>

<body>
  <script> 
    
    var slugGlobal = {!! json_encode($slug) !!};
    
</script>
      
      <!-- Modal -->
      <div class="modal" id="historyModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog historyView"  role="document">
          <div class="modal-content">
           
            <div class="modal-body ">
             
                <iframe id="popupiframe" src="/detailHistory.html"></iframe>
            </div>


            <div class="modal-footer" id ="historyBottom">


              <button type="button" class="btn btn-secondary " id ="btnBackHistory" data-dismiss="modal">Quay lại</button>
        
            </div>
          </div>
        </div>
      </div>



  <div class="modal" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog" role="document" >
      <div class="modal-content">
        <div class="modal-header">
       
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body loginpopup">
            <form id ="formLogin">
                <button class="login-google">Tiếp tục với  google </button>
                <span class="break-line">Or     </span>
               <input  type="text" placeholder="Email hoặc SĐT" id = "userNameLogin" name="userName" class="login-input userName" required >
                <span class="errorMessage errorMessageUserName" style="display:none"> Bạn chưa nhập email hoặc số điện thoại</span>
               <input  type="password" placeholder ="Mật khẩu"  id = "passwordLogin" class="login-input password" name="password" required >
               <span class="errorMessage errorMessagePassword" style="display:none">Bạn chưa nhập mật khẩu</span>
            </form>
            <button class="login-btn" onclick="login()">Đăng nhập  </button>
            <p class="bottomPage">
                    Bạn chưa có tài khoản?
                 <a  href="javascript:void(0)" onclick="openForm(1)"> <strong>Tạo tài khoản </strong> </a>
             </p>
        </div>
  
      </div>
    </div>
  </div>


  <div class="modal" id="signUpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog" role="document" >
      <div class="modal-content">
        <div class="modal-header">
       
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body loginpopup">
            
                <form id ="formRegister">
                    <button class="login-google">Tiếp tục với  google </button>
                    <span class="break-line">Or     </span>
                <input  type="text" placeholder="Email hoặc SĐT" id= "userNameRegister" name="userName" class="login-input userName" required >
                    <span class="errorMessage errorMessageUserName" style="display:none"> Bạn chưa nhập email hoặc số điện thoại</span>
                <input  type="password" placeholder ="Mật khẩu" id ="passwordRegister" class="login-input password" name="password" required >
                <span class="errorMessage errorMessagePassword"  style="display:none">Bạn chưa nhập mật khẩu</span>
                </form>

               <button class="login-btn" onclick="register()" >Tạo tài khoản ngay  </button>

               <p class="bottomPage">Bạn đã có tài khoản? <a href="javascript:void(0)" onclick="openForm(0)"> 
                   <strong>Đăng nhập </strong> </a> 
               </p>

      
            
        </div>
  
      </div>
    </div>
  </div>



    <div id="b-placeholder">

       

        <div class="profilearea"> 

            <div class="dropdown">
                <button class="dropbtn" >
                    <span id ="profileName"> </span>
                    <img src="/assets/drop-down-arrow.png"> 
                </button>
                <div class="dropdown-content">
                <a href="/profile.html">Thông tin tài khoản</a>
                <a href="javascript:void(0)" onclick ="openHomePage()">Soi da online</a>
                <a href="javascript:void(0)" onclick ="openHistoryPage()">Lịch sử soi da</a>
                <a onclick="openSoida()">Soi da online </a>
                <a href="javascript:void(0)" onclick="logout()"  >Đăng xuất</a>
                </div>
            </div>
            </div>
   
    <div class= "areaLogin">  

           
            <ul class="right-menu">
                <li class="right-text login">
                    <a id ="myBtn" href="javascript:void(0)" data-toggle="modal" data-target="#loginModal" >Đăng nhập</a>
                </li>
                <li class="right-text login">
                    <a href=" /" href="javascript:void(0)" data-toggle="modal" data-target="#signUpModal" >Đăng ký</a>
                </li>
            </ul>   

    </div> 


        <div class="header_promo" style="
        width: 100%;
        max-width: 709px;
        margin: auto;
        ">
        <img src="/banner1.jpg">
        </div>




        <div class="ai-skin__container" >
            
              <div class="ai-skin__navigator">
                    <div class="ai-skin__navigator-inner">
                        <a onclick="backPre()">
                            <img data-src="/img/icons/back.svg" src="/img/icons/back.svg">
                        </a>
                        <span>LỊCH SỬ SOI DA</span>
                        <a onclick="openHomePage()">
                            <img data-src="/img/icons/home.svg" src="/img/icons/home.svg">
                        </a>
                    </div>
                </div>
                <div id="tips" class="ai-skin__tips" style="display:none" >
                    <div class="ai-skin__tips__content">
                        <span class="ai-skin__tips__content-header">
                            Ứng dụng sẽ chụp gương mặt của bạn. Sau đây là một số
                            hướng dẫn để có những bức ảnh chuẩn xác nhất
                        </span>
                        <ol class="ai-skin__tips__content-body">
                            <li>Giữ chặt đIện thoạI trong khi chụp</li>
                            <li>Tẩy trang &amp; làm sạch da trước khi sử dụng ứng dụng</li>
                            <li>Cột/búI tóc lên cao và cởI mắt kính (nếu có)</li>
                            <li>
                                Kiểm tra ánh sáng của phòng sử dụng camera trước để phân tích làn da bạn
                            </li>
                        </ol>
                        <div class="ai-skin__button ai-skin__tips__button">
                            <button type="button" onclick="hideTips()">TÔI ĐÃ HIỂU</button>
                        </div>
                    </div>
                </div>
                
                <table id="historySkin">
                    <tr>
                      <th >STT</th>
                      <th>Ngày</th>
                      <th>Giờ</th>
                      <th>Hành động</th>
                    </tr>
                    
                  </table>
         

                

            
        </div>
       

        <div class="footer-container-common" style="margin-top: 50vh;">

            <div class="row footer-copyright-common mx-0">
                @ Copyright 2021 TikiTech. All rights reserved.
            </div>
        </div>

        <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>


    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

    </div>
  
   
    <script>
        var dataCompany = null;
          document.addEventListener("DOMContentLoaded", function () {
         
            sessionStorage.setItem('dataCompany', JSON.stringify(dataCompany));
        });

    </script>

   
    <script type="text/javascript" src="/js/contant.js"></script>
    <script type="text/javascript" src="/js/main.js"></script>
    <script type="text/javascript" src="/js/history.js"></script>

    
    
</body>

<script> 
function btnBackHistory() {


$("#historyModel").modal('toggle');

}
   
     function bindUser( data) 
     {
        
        $("#txtname").val(data.name);
        $("#phoneNumber").val(data.phone);
        $("#address").val(data.address);
       
     }


    document.addEventListener("DOMContentLoaded", function(){
        var dataUser =  sessionStorage.getItem("dataUser");
        var objectreponse = JSON.parse(dataUser);
        var userOperator = objectreponse.data.data;
        getHistory(objectreponse.data.token);
    });
</script>

</html>