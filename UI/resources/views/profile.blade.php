<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="theme-color" content="#d47690">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lobster&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap" rel="stylesheet">

    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"></script>
    <!-- <link rel="stylesheet" href="http://localhost:5000/contain/css/style.css" /> -->
    <link rel="stylesheet" href="/css/style.css">
    <!-- <link rel="stylesheet" href="https://ungdungsoida.netlify.app/contain/css/style.css" /> -->

    <title>Ứng dụng soi da</title>
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
                   <strong>Đăng nhập/Đăng ký </strong> </a> 
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
                <a href="javascript:void(0)" onclick ="openAccountPage()">Thông tin tài khoản</a>
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




        <div class="ai-skin__container">
            
              <div class="ai-skin__navigator">
                    <div class="ai-skin__navigator-inner">
                        <a onclick="backPre()">
                            <img data-src="/img/icons/back.svg" src="/img/icons/back.svg">
                        </a>
                        <span>THÔNG TIN TÀI KHOẢN</span>
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


                <form class="frm-input">
                    <div class="form-group">
                      <label >Họ và tên</label>
                      <input type="text" class="form-control" id="txtname" aria-describedby="emailHelp" placeholder="Enter email">
               
                    </div>
                    <div class="form-group">
                      <label for="" >Số điện thoại</label>
                      <input  type="text" class="form-control" id="phoneNumber" placeholder="Password">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Địa chỉ</label>
                        <input type="text" class="form-control" id="address" placeholder="Địa chỉ">
                     </div>

                     <div class="form-group page-bottom">
                        <a onclick="updateUser()" class="btn btn-primary">Cập nhật</a>
                    </div>
                 
                   
               </form>
                  
         

                

            
        </div>
        <!-- FOOTER -->

        <div class="footer-container-common">

            <div class="row footer-copyright-common mx-0">
                @ Copyright 2021 TikiTech. All rights reserved.
            </div>
        </div>

        <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>


    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>



        <script>
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        </script>
        <script>
            function hideTips() {
                var tips = document.getElementById("tips");
                tips.style.display = "none";
            }
        </script>
        <script>
            var skinModule = (function () {
                var width = 320; // We will scale the video width to this
                var height = 0; // This will be computed based on the input stream

                var streaming = false;

                var video = null;
                var canvas = null;
                var captureBtn = null;
                var imageShow = null;
                var imageProcess = null;
                var skinImage = null;
                var videoPlayer = null;
                var uploadBtn = null;
                var captureBtn = null;
                var localImageInput = null;
                var nativeCameraInput = null;
                var uploadingBtn = null;
                var uploading = false;

                startup();

                return {
                    openCamera: openCamera,
                    chooseImage: chooseImage,
                    uploadImage: uploadImage,
                };

                function startup() {
                    video = document.getElementById("video");
                    canvas = document.getElementById("canvas");
                    imageShow = document.getElementById("imageShow");
                    imageProcess = document.getElementById("output");
                    skinImage = document.getElementById("skinImage");
                    videoPlayer = document.getElementById("videoPlayer");
                    uploadBtn = document.getElementById("uploadBtn");
                    captureBtn = document.getElementById("captureBtn");
                    uploadingBtn = document.getElementById("uploadingBtn");
                    localImageInput = document.getElementById("localImageInput");
                    nativeCameraInput = document.getElementById("nativeCameraInput");

                    addEventListenerForCamera();
                    addEventListenerForChooseImage();
                }

                function isIOSMoble() {
                    return (
                        [
                            "iPad Simulator",
                            "iPhone Simulator",
                            "iPod Simulator",
                            "iPad",
                            "iPhone",
                            "iPod",
                        ].includes(navigator.platform) ||
                        // iPad on iOS 13 detection
                        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
                    );
                }

                function openCamera() {
                    // Do nothing when video is streaming or image are being uploaded to server
                    if (streaming || uploading) return;

                    clearImageFromPreviousSession();
                    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                    // Support for old browsers which do not support WebRTC
                    const supported = "mediaDevices" in navigator;
                    if (!supported || isMobile) {
                        // toggleVideoPlayer((show = false));
                        // toggleUploadBtn((show = true));
                        // enableUploadBtn();
                        toggleSkinImage((active = true));
                        toggleVideoPlayer((show = false));
                        toggleUploadBtn((show = true));
                        enableUploadBtn();
                        nativeCameraInput.click();

                        return;
                    }

                    navigator.mediaDevices
                        .getUserMedia({
                            video: true,
                            audio: false,
                        })
                        .then(function (stream) {
                            toggleSkinImage((active = true));
                            toggleCaptureBtn((show = true));
                            toggleVideoPlayer((show = true));
                            toggleUploadBtn((show = false));
                            video.srcObject = stream;
                            video.play();
                        })
                        .catch(function (err) {
                            //if there's no compatible camera connected, or the user denied access
                            console.error(err);
                            alert("Không thể kết nối camera");
                        });
                }

                function chooseImage() {
                    // Do nothing when video is streaming or image are being uploaded to server
                    if (streaming || uploading) return;
                    clearImageFromPreviousSession();
                    toggleSkinImage((active = true));
                    toggleVideoPlayer((show = false));
                    toggleUploadBtn((show = true));
                    enableUploadBtn();

                    localImageInput.click();
                }

                function uploadImage() {
                    const getConfigSkinAI = function () {
                        return makeRequest(
                            "https://raw.githubusercontent.com/ktpm489/admin-demo/master/config3.js",
                            "GET"
                        );
                    };

                    const postImageToSkinAI = function (config) {
                        const dataInput = imageProcess.src;
                        const jdata = {
                            email: config.configSkin.email,
                            image_base64: dataInput.substr(dataInput.indexOf("base64,") + 7) + "",
                        };

                        const headers = {
                            "Content-Type": "application/json",
                            apikey: config.configSkin.key,
                        };

                        return makeRequest(
                            config.configSkin.link,
                            "POST",
                            headers,
                            JSON.stringify(jdata)
                        );
                    };

                    uploading = true;
                    toggleUploadBtn((show = false));
                    toggleUploadingBtn((show = true));

                    getConfigSkinAI()
                        .then(function (firstResponse) {
                            var config = JSON.parse(firstResponse.responseText);
                            return postImageToSkinAI(config);
                        })
                        .then(function (secondResponse) {
                            // Store response before navigating to result page.
                            const encodedData = JSON.stringify(
                                JSON.parse(secondResponse.responseText)
                            );
                            $('.slick-carousel').slick({
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                arrows: true,
                                infinite: false,
                                touchThreshold: 1000,
                                prevArrow: '<button class="slide-arrow prev-arrow"></button>',
                                nextArrow: '<button class="slide-arrow next-arrow"></button>',
                                responsive: [{
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 3,

                                        slidesToScroll: 1,
                                    },
                                }, {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 3,

                                        slidesToScroll: 1,
                                        arrows: false,
                                    },
                                },],
                            });
                            var typeLevel = JSON.parse(secondResponse.responseText);
                            drawProduction(typeLevel.data.facedata.hintResult);
                            saveHistory(encodedData);
                            sessionStorage.setItem("_t", encodedData);

                        })
                        .catch(function (err) {
                            console.error(err);
                            alert("Xin vui lòng thử lại");
                        })
                        .finally(function () {
                            uploading = false;
                            toggleUploadBtn((show = true));
                            toggleUploadingBtn((show = false));

                        });
                }

                function saveHistory(result) {

                    if (sessionStorage.getItem("dataCompany") === null) {

                        return;
                    }
                    var company = JSON.parse(sessionStorage.getItem("dataCompany"));
                    if (company == null)
                        return;
                    $.ajax({
                        type: "POST",
                        url: "https://api-soida.applamdep.com/api/add-history-skin",
                        data: JSON.stringify({
                            "UserName": null,
                            "Result": result,
                            "User_Id": null,
                            "Company_Id": company._id
                        }),
                        contentType: "application/json",
                        dataType: "json",
                        complete: function (data) {

                        },
                    });
                }


                function drawProduction(dataRequest) {


                    if (sessionStorage.getItem("dataCompany") === null) {

                        return;
                    }
                    var company = JSON.parse(sessionStorage.getItem("dataCompany"));

                    var companyId = "";
                    if (company == null) {

                    } else {
                        companyId = company._id;
                    }



                    var bodyRequest = {

                        "company_id": companyId,
                        "result": dataRequest

                    };
                    $.ajax({
                        type: "POST",
                        url: "https://api-soida.applamdep.com/itemSdk/get_product_result",
                        data: JSON.stringify(bodyRequest),
                        contentType: "application/json",
                        dataType: "json",
                        complete: function (data) {


                            drawSuggessProduct(data.responseJSON);



                        },
                    });
                }

                function drawSuggessProduct(dataDraw) {

                    var htmlTemplate = "";
                    var dataAll = dataDraw.data;
                    for (let i = 0; i < dataAll.length; i++) {
                        var item = dataAll[i];
                        var itemValue = Object.keys(item);
                        var nameKey = "";
                        if (itemValue.length > 0) {
                            nameKey = itemValue[0];
                        } else {
                            continue;
                        }
                        var valueItem = item[nameKey];
                        htmlTemplate += '<div class="row mx-0 justify-content-center mb-3">\
                <div class="titleProductRecomend">' + valueItem.title + '\
                </div>\
                </div>';
                        htmlTemplate += '<div class="ai-skin__container" style="    padding-left: 10px;\
                  padding-right: 10px;">\
                <div class="slick-carousel mb-3">';
                        var listProduct = valueItem.list_product;
                        for (let i = 0; i < listProduct.length; i++) {
                            var imagelink = "https://i.postimg.cc/W3WBCxvs/KEM-D-NG-BAN-M-Q10.jpg";
                            var itemProduct = listProduct[i];

                            if (itemProduct.image_link.length > 0) {
                                imagelink = "https://api-soida.applamdep.com/public/image_plugin/" + itemProduct.image_link;
                            } else {
                                imagelink = itemProduct.image;
                            }


                            htmlTemplate += '<div class="card mr-2">\
                    <img src="' + imagelink + '" alt="">\
                    <a href= "' + itemProduct.linkdetail + '">\
                    <div class="product-title">\
                        <div>\
                            ' + itemProduct.title + ' \
                        </div>\
                    </div>\
                    </a>\
                     </div>';
                        }
                        htmlTemplate += '</div> </div>';

                    }

                    sessionStorage.setItem("htmlTemplate", htmlTemplate)
                    
                    // navigateTo("/result");
                     window.location.href = "/result.html";

                }

                function addEventListenerForChooseImage() {
                    function handler(e) {
                        const files = e.target.files;

                        if (files.length) {
                            const reader = new FileReader();

                            reader.onloadend = function () {
                                imageShow.src = reader.result;
                                // imageShow.className = isIOSMoble() ? "rotation-class" : "";
                            };

                            reader.readAsDataURL(files[0]);
                            processLocalImage(files[0]);
                        }
                    }

                    localImageInput.addEventListener("change", handler, false);
                    nativeCameraInput.addEventListener("change", handler, false);
                }

                function addEventListenerForCamera() {
                    video.addEventListener(
                        "canplay",
                        function (ev) {
                            if (!streaming) {
                                height = video.videoHeight / (video.videoWidth / width);

                                if (isNaN(height)) {
                                    height = width / (4 / 3);
                                }
                                video.setAttribute("width", width);
                                video.setAttribute("height", height);
                                canvas.setAttribute("width", width);
                                canvas.setAttribute("height", height);
                                streaming = true;
                            }
                        },
                        false
                    );

                    captureBtn.addEventListener(
                        "click",
                        function (ev) {
                            takePicture();
                            ev.preventDefault();
                        },
                        false
                    );
                }

                function takePicture() {
                    const context = canvas.getContext("2d");
                    if (width && height) {
                        canvas.width = width;
                        canvas.height = height;
                        context.translate(width, 0);
                        context.scale(-1, 1);
                        context.drawImage(video, 0, 0, width, height);

                        const imgUrl = canvas.toDataURL("image/png");
                        imageShow.setAttribute("src", imgUrl);
                   

                        processCaptureImage(imgUrl);
                    }

                    toggleCaptureBtn((show = false));
                    toggleVideoPlayer((show = false));
                    toggleUploadBtn((show = true));
                    enableUploadBtn();

                    // Attempt to fix not response on Chrome Android after capture photo
                    setTimeout(function () {
                        stopVideo();
                    }, 1000);
                }

                function stopVideo() {
                    const mediaStream = video.srcObject;
                    const tracks = mediaStream.getTracks();

                    streaming = false;
                    tracks.forEach(function (track) {
                        track.stop();
                    });
                }

                function processCaptureImage(imgUrl) {
                    squareCropAndResizeImage(imgUrl, 300)
                        .then(function (outputUrl) {
                            imageProcess.setAttribute("src", outputUrl);
                        })
                        .catch(function (err) {
                            console.error("Error ocurred when cropping image: ", err);
                        });
                }

                function processLocalImage(file) {
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            squareCropAndResizeImage(e.target.result, 300)
                                .then(function (outputUrl) {
                                    imageProcess.setAttribute("src", outputUrl);
                                })
                                .catch(function (err) {
                                    console.error("Error ocurred when cropping image: ", err);
                                });
                        };
                        reader.readAsDataURL(file);
                    }
                }

                function clearImageFromPreviousSession() {
                    imageShow.removeAttribute("src");
                    imageProcess.removeAttribute("src");
                }

                function toggleSkinImage() {
                    if (active) {
                        skinImage.classList.remove("ai-skin__skin-image--inactive");
                        skinImage.classList.add("ai-skin__skin-image--active");
                    } else {
                        skinImage.classList.remove("ai-skin__skin-image--active");
                        skinImage.classList.add("ai-skin__skin-image--inactive");
                    }
                }

                function toggleCaptureBtn(show) {
                    if (show) {
                        captureBtn.classList.remove("ai-skin__button--hidden");
                    } else {
                        captureBtn.classList.add("ai-skin__button--hidden");
                    }
                }

                function toggleVideoPlayer(show) {
                    if (show) {
                        videoPlayer.style.display = "block";
                    } else {
                        videoPlayer.style.display = "none";
                    }
                }

                function enableUploadBtn() {
                    uploadBtn.classList.remove("ai-skin__button--disabled");
                }

                function toggleUploadBtn(show) {
                    if (show) {
                        uploadBtn.style.display = "block";
                    } else {
                        uploadBtn.style.display = "none";
                    }
                }

                function toggleUploadingBtn(show) {
                    if (show) {
                        uploadingBtn.classList.remove("ai-skin__button--hidden");
                    } else {
                        uploadingBtn.classList.add("ai-skin__button--hidden");
                    }
                }

                //==============================================================//
                // Utils
                //==============================================================//
                function makeRequest(url, method, headers, data) {
                    var request = new XMLHttpRequest();

                    return new Promise(function (resolve, reject) {
                        request.onreadystatechange = function () {
                            // Only run when request is completed
                            if (request.readyState != 4) return;

                            if (request.status >= 200 && request.status < 300) {
                                resolve(request);
                            } else {
                                reject({
                                    status: request.status,
                                    statusText: request.statusText,
                                });
                            }
                        };

                        request.onerror = function (error) {
                            reject(error);
                        };

                        request.open(method || "GET", url, true);

                        if (headers) {
                            for (var key in headers) {
                                request.setRequestHeader(key, headers[key]);
                            }
                        }

                        if (data) {
                            request.send(data);
                        } else {
                            request.send();
                        }
                    });
                }

                function squareCropAndResizeImage(url, targetSize = 500) {
                    // targetSize = 500;

                    // return squareCenterCropImage(url).then(function(croppedUrl) {
                    //     return resizeImage(croppedUrl, targetSize);
                    // });
                    // return squareCenterCropImage(url)
                    return squareCenterCropImageV2(url, targetSize)
                }

                function squareCenterCropImageV2(url, width) {
                    return new Promise(function (resolve) {
                        const inputImage = new Image();

                        inputImage.onload = function () {
                       
                            var rolaticeSize = 0.5;
                            try {
                                var canvas = document.createElement('canvas'),
                                    ctx = canvas.getContext("2d"),
                                    oc = document.createElement('canvas'),
                                    octx = oc.getContext('2d');

                                canvas.width = width; // destination canvas size
                                canvas.height = canvas.width * inputImage.height / inputImage.width;

                                var cur = {
                                    width: Math.floor(inputImage.width * rolaticeSize),
                                    height: Math.floor(inputImage.height * rolaticeSize)
                                }
                                oc.width = cur.width;
                                oc.height = cur.height;

                                octx.drawImage(inputImage, 0, 0, cur.width, cur.height);

                                while (cur.width * rolaticeSize > width) {
                                    cur = {
                                        width: Math.floor(cur.width * rolaticeSize),
                                        height: Math.floor(cur.height * rolaticeSize)
                                    };
                                    octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
                                }

                                ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);

                                resolve(canvas.toDataURL('image/png'));

                            } catch (e) {
                              
                            }

                        };

                        inputImage.src = url;
                    });
                }

                function squareCenterCropImage(url) {
                    return new Promise(function (resolve) {
                        const inputImage = new Image();
                        inputImage.onload = function () {
                            const inputWidth = inputImage.naturalWidth;
                            const inputHeight = inputImage.naturalHeight;

                            let croppedWidth = inputWidth;
                            let croppedHeight = inputHeight;

                            const croppedX = (croppedWidth - inputWidth) * 0.5;
                            const croppedY = (croppedHeight - inputHeight) * 0.5;

                            // create a canvas that will present the output image
                            const canvas = document.createElement("canvas");
                            canvas.width = croppedWidth;
                            canvas.height = croppedHeight;

                            // draw our image at position 0, 0 on the canvas
                            const context = canvas.getContext("2d");

                            // context.drawImage(inputImage, croppedX, croppedY);
                            context.drawImage(inputImage, 0, 0);
                            resolve(canvas.toDataURL("image/png"));
                        };

                        inputImage.src = url;
                    });
                }

                function resizeImage(url, targetSize = 500) {
                    return new Promise(function (resolve) {
                        const inputImage = new Image();
                        inputImage.onload = function () {
                            var canvas = document.createElement("canvas");
                            canvas.width = targetSize;
                            canvas.height = targetSize;
                            var context = canvas.getContext("2d");

                            if (isIOSMoble()) {
                                context.save();
                                context.scale(-1, 1);
                                context.drawImage(
                                    inputImage, -targetSize,
                                    0,
                                    targetSize,
                                    targetSize
                                );
                                context.restore();
                            } else {
                                context.drawImage(inputImage, 0, 0, targetSize, targetSize);
                            }

                            resolve(canvas.toDataURL("image/png"));
                        };

                        inputImage.src = url;
                    });
                }
            })();
        </script>

    </div>
    <script>
        var dataCompany = null;
    </script>
    <script>
        function getBaseUrl() {
            // return "https://ungdungsoida.netlify.app/";
            return "./";
        }
    </script>
    <script>
        function resolveImageSource() {
            var baseUrl = getBaseUrl();
            var images = document.querySelectorAll("img[data-src]");
            for (var i = 0; i < images.length; i++) {
                var img = images[i];
                img.src = baseUrl + img.getAttribute("data-src");
            }
        }
    </script>
    <script>
        function pathToRegex(path) {
            return new RegExp(
                "^" +
                path
                    .replace(new RegExp("\/", "g"), "\\/")
                    .replace(new RegExp(":\w+", "g"), "(.+)") +
                "$"
            );
        }

        function router() {
            const routes = [
            //     {
            //     path: "/",
            //     url: "contain/skin.html",
            // }, {
            //     path: "/welcome",
            //     url: "contain/welcome.html",
            // }, {
            //     path: "/skin",
            //     url: "contain/skin.html",
            // }, {
            //     path: "/result",
            //     url: "contain/result.html",
            // },
        ];


            const potentialMatches = routes.map((route) => {
                return {
                    route,
                    result: location.pathname.match(pathToRegex(route.path)),
                };
            });

            var match = potentialMatches.find((p) => p.result !== null);

            if (!match) {
                match = {
                    route: routes[0],
                    result: [location.pathname],
                };
            } else {

            }

            $(function () {
                $("#b-placeholder").load(getBaseUrl() + match.route.url, function () {
                    resolveImageSource();
                });
            });
        }

        function navigateTo(url) {
            history.pushState(null, null, url);
            router();
        }

        window.addEventListener("popstate", router);

        document.addEventListener("DOMContentLoaded", function () {
            router();
            sessionStorage.setItem('dataCompany', JSON.stringify(dataCompany));


        });

    </script>

    <script>
        function opencamera() {

            $("#takeFile").click();

        }

        function choseImage() {
            $("#choseImageFile").click();
        }

        function sendreward() {
            $("#btnreward").hide();
            $("#btnrewardLoading").show();
            $.ajax({
                type: "PUT",
                url: "https://api-soida.applamdep.com/api/add-customer-request",
                data: JSON.stringify({
                    UserName: "TIKITECH",
                    Phone: $("#mobilePhone").val(),
                    Type: 0,
                }),
                contentType: "application/json",
                dataType: "json",
                complete: function (data) {
                    $("#btnreward").show();
                    $("#btnrewardLoading").hide();
                    $("#formContact").hide();
                    $("#result").show();

                },
            });
        }

        function sendreward() {
            $("#btnreward").hide();
            $("#btnrewardLoading").show();
            $.ajax({
                type: "PUT",
                url: "https://api-soida.applamdep.com/api/add-customer-request",
                data: JSON.stringify({
                    UserName: "TIKITECH",
                    Phone: $("#mobilePhone").val(),
                    Type: 0,
                }),
                contentType: "application/json",
                dataType: "json",
                complete: function (data) {
                    $("#btnreward").show();
                    $("#btnrewardLoading").hide();
                    $("#formContact").hide();
                    $("#result").show();

                },
            });
        }

        function closePopup(elementclose) {

            var elementRemove = elementclose.closest("div");
            var elementParrent = elementclose.closest(".ai-skin__container");
            elementParrent.removeChild(elementRemove);


        }
    </script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js"></script>
     <script type="text/javascript" src="/js/contant.js"></script>
   <script type="text/javascript" src="/js/main.js"></script>

   <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <div id="eJOY__extension_root" class="eJOY__extension_root_class" style="all: unset;"></div><iframe
        id="nr-ext-rsicon"
        style="position: absolute; display: none; width: 50px; height: 50px; z-index: 2147483647; border-style: none; background: transparent;"></iframe>
</body>

<script> 

   
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

        getInfomationUser(objectreponse.data.token);


    });
</script>

</html>