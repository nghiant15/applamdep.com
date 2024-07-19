<head>
    <title>Mở tài khoản online</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <script src="/assets/account/main.js"></script>

    <link href="/assets/account/successPage.css" rel="stylesheet">
</head>

<body>

    <div class="register">


        <div class="row" id="result">
            <div class="col-md-12 register-left">


                <img src="https://tikitech.vn/assets/images/logo_head.png" alt="" />
                <h3>Đăng ký thành công</h3>

                <div class="descrption">
                    <p> Giao diện người dùng </p>

                </div>
                <div class="boxContaner" id="linkBox">

                    <!-- <div class="boxLink"> <a>Soi da online</a> </div>
                    <div class="boxLink"> <a>Trang điểm </a> </div>
                    <div class="boxLink"><a>Salon tóc</a> </div> -->

                </div>

                <div class="descrption">

                    <p> Trang admin quản lý </p>

                </div>

                <div class="boxContaner">

                    <div class="boxLink"> <a href="https://id.applamdep.com">Đăng nhập</a> </div>


                </div>





            </div>

        </div>

    </div>


    <script>
        document.addEventListener("DOMContentLoaded", function() {

            debugger;
            
            var dataobject = window.sessionStorage.getItem("dataFontEnd");
            var dataSlug = window.sessionStorage.getItem("dataSlug");
            

            if (dataobject != null) {
                var obejctlink = JSON.parse(dataobject);
                var htmelement = "";
                var indexrow = 0;
                obejctlink.forEach(element => {
                    if(indexrow >0)
                       return;
                    var urlkey = element.Value.replace("soida/", "");
                    htmelement += '<div class="boxLink" target ="_blank"> <a href ="' + urlkey + dataSlug +    '">' + element.Key + '</a> </div>';
                    indexrow ++;
                });
                
                var elementBoxlink = document.getElementById("linkBox");
                elementBoxlink.innerHTML += htmelement;
                
            }

        

        });
    </script>
</body>