@php
$dataSeo = "Soida liền tay";

    if (isset($globalData)) 
    {
        $dataSeo = $globalData->seoInfo;
    }
    else 
    {
        $dataSeo = new stdClass();
        $dataSeo->title ="Soi Da Online .Ngay tại nhà, Kiểm tra, tuổi da & hơn 40 thông số về da khác. Một lần quét, nói với bạn mọi điều .#soidaonline";
        $dataSeo->imageShare ="/images/tikitech_icon.png";
    }
    $dataSeo-> title ="Soi da online";
    $dataSeo->description ="Soi Da Online .Ngay tại nhà, Kiểm tra, tuổi da & hơn 40 thông số về da khác. Một lần quét, nói với bạn mọi điều .#soidaonline";
@endphp
@extends('layout')

@section('header')
    <meta charset="UTF-8">
    <meta name="theme-color" content="#d47690">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />

    <!-- <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script> -->

    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"></script>

     
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <link rel="stylesheet" href="./styles/global/index.css">
    <link rel="stylesheet" href="./styles/global/global_responsive.css">
    <!-- ASSETS CDN SLICK -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">

    <link rel="stylesheet" type="text/css"
        href=" https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

            <!-- @if (isset($dataSeo->title))
            
            <title>{{$dataSeo->title}} </title>
            @else
            <title>soida nhận ngay yêu thương</title>
            @endif -->

            @if($slug == "zema")

            <title>soida nhận ngay yêu thương</title>
            @elseif($slug == "zasaly")
            <title>soida nhận ngay yêu thương</title>

            @elseif($slug == "ngocdung")
            <title>soida nhận ngay yêu thương</title>
            @else 
                 soida online
            @endif

        @if (isset($dataSeo->description))
        <meta name="description" content="{{$dataSeo->description}}">
        @else

        @endif
        @if (isset($dataSeo->imageShareSeo))
        <link rel="icon" type="image/png" href="{{$dataSeo->imageShareSeo}}" />
        @else

     @endif
    
       @if (isset($dataSeo->imageShare))
       <meta property="og:image"  content="{{$dataSeo->imageShare}}">
        @else
        <meta property="og:image"  content="/images/tikitech_icon.png">
       @endif
   
@endsection
@section('contentpage')
    <script>
        var slugGlobal = {!! json_encode($slug) !!};
    </script>
    <div id="b-placeholder">


        <div class="ai-skin__container">

            <div class="ai-skin__skin">


                <div style="display:none" class="sctn-block h-20 a-cm sctn-action">
                    <div class="action-cta action-cta-take">

                        <input id="cameraopen" type="button" onclick="opencamera()" class="upload-file">
                        <div class="icn"><img src="./assets/photo-selfie.25ed5a17 (1).svg" alt="" class="selfie">
                        </div>
                        <div class="txt">Chụp ảnh</div>
                    </div>



                    <div class="action-cta action-cta-take">

                        <input type="button" onclick="choseImage()" class="upload-file">
                        <div class="icn"><img src="./assets/choseImage.svg" alt="" class="selfie"></div>
                        <div class="txt">Chọn ảnh</div>
                    </div>

                </div>


                <div class="ai-skin__skin-top" style="display: none;">


                    <button id="takeFile" type="button" class="ai-skin__skin-option ai-skin__skin-top__use-camera"
                        onclick="skinModule.openCamera()">
                        <span>Chụp ảnh
                            <img data-src="contain/img/icons/camera.svg" src="/img/icons/camera.svg">
                            <input type="file" name="file" id="nativeCameraInput" accept="image/*" capture="user"
                                hidden="">
                        </span>
                    </button>
                    <button id="choseImageFile" type="button" class="ai-skin__skin-option ai-skin__skin-top__choose-image"
                        onclick="skinModule.chooseImage()">
                        <span>
                            Chọn ảnh
                            <img data-src="contain/img/icons/photo.svg" src="/img/icons/photo.svg">
                            <input type="file" name="file" id="localImageInput" accept="image/*" hidden="">
                        </span>
                    </button>

                </div>

                <div class="ai-skin-skin-body">
                    <div class="ai-skin__skin-image ai-skin__skin-image--inactive" id="skinImage">
                        <img class="ai-skin__skin-image__background" data-src="/images/imageTakeCamera.png"
                            src="/images/imageTakeCamera.png">
                        <div class="ai-skin__skin-video-player" id="videoPlayer">
                            <video id="video" autoplay="" muted="" playsinline="">
                                No video available
                            </video>
                            <canvas id="canvas" hidden=""></canvas>
                        </div>
                        <div class="ai-skin__skin-image-show ai-skin__image--cropped">
                            <img id="imageShow">
                        </div>
                        <div class="ai-skin__skin-focus">
                            {{-- <img data-src="contain/img/placeholders/corner-top-left.svg" class="ai-skin__skin-focus__tl"
                            src="/img/placeholders/corner-top-left.svg">
                        <img data-src="contain/img/placeholders/corner-top-right.svg"
                            class="ai-skin__skin-focus__tr" src="/img/placeholders/corner-top-right.svg">
                        <img data-src="contain/img/placeholders/corner-bottom-left.svg"
                            class="ai-skin__skin-focus__bl" src="/img/placeholders/corner-bottom-left.svg">
                        <img data-src="contain/img/placeholders/corner-bottom-right.svg"
                            class="ai-skin__skin-focus__br"
                            src="/img/placeholders/corner-bottom-right.svg"> --}}
                        </div>
                        <img id="output" hidden="">
                    </div>

                    <div class="
            ai-skin__button
            ai-skin__button--disabled
            ai-skin__skin-body__button
          "
                        id="uploadBtn" >
                        {{-- <button type="button" onclick="skinModule.uploadImage()">
                            Tải ảnh lên và phân tích
                        </button> --}}
                    </div>

                    <div class="
            ai-skin__button
            ai-skin__button--hidden
            ai-skin__skin-body__button
          "
                        id="uploadingBtn">
                        <button type="button" style="font-size: 1rem;" disabled="">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Tải lên ...

                        </button>
                    </div>

                    <div class="
            ai-skin__button
            ai-skin__button--hidden
            ai-skin__skin-body__button
          "
                        id="captureBtn">
                        <button type="button">Chụp ảnh</button>
                    </div>

                    {{-- <div  class="nav-button" id = "captureBtnStart">

                    <a href="/start1.html"> <img src="/images/arrow.png"> BẮT ĐẦU </a>
    
                </div> --}}
                </div>
            </div>

            <!-- @if($gameJoinTo == true )
            
                @php
                 $gameData  =  session('dataGame', null);
                
                 $dataImage = $gameData->des;
                @endphp 
                        
                <div id="tips" class="ai-skin__tips" style="display:none">
                    <div class="ai-skin__tips__content" style= "width:400px">
                    <img src  = "{{$dataImage}}"/> 

                            <div class="ai-skin__button ai-skin__tips__button">
                                    <button type="button" onclick="hideTips()">Soi Da online ngay</button>
                                </div>
                      </div>
                    </div>
                </div>
            @elseif ($slug == "gametuoida")
                    <div id="tips" class="ai-skin__tips" style="display:none">
                            <div class="ai-skin__tips__content" style= "width:400px">
                            <img src  = "/gametuoida.png"/> 

                                    <div class="ai-skin__button ai-skin__tips__button">
                                            <button type="button" onclick="hideTips()">Soi Da online ngay</button>
                                        </div>
                            </div>
                            </div>
                     </div>       
            @else 
               

            @endif -->
            <div id="tips" class="ai-skin__tips" style="display:none">
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



            
            {{-- <div class="nav-menu"> --}}

                {{-- <div class="uploadButton uploadImage">

                    <div class="nav-avatar" onclick="choseImage()">
                        <img src="/images/photos.png">

                    </div>
                    <div class="text"><a href="javascript:void(0)" onclick="choseImage()"> Tải ảnh lên </a></div>
                </div> --}}
                {{-- <div class="uploadButton cameraNow" style="width: 130px">

                    <div class="nav-avatar" onclick="haldleOpenCamera()">
                        <img src="/images/cameraImage.png">

                    </div>
                    <div class="text"><a href="javascript:void(0)" onclick="haldleOpenCamera()">Chụp ảnh ngay </a>
                    </div>
                </div> --}}


            {{-- </div> --}}


            <div class="nav-menu">


                <div class="uploadButton cameraNow">

                    <div class="nav-avatar nav-avatar__camera" onclick="haldleOpenCamera()">
                        
                        <svg class="nav-menu-svg nav-svg-camera" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve">
                            <g>
                                <path d="M26,20c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S30.4,20,26,20z"></path>
                                <path d="M46,14h-5.2c-1.4,0-2.6-0.7-3.4-1.8l-2.3-3.5C34.4,7,32.7,6,30.9,6h-9.8c-1.8,0-3.5,1-4.3,2.7l-2.3,3.5   c-0.7,1.1-2,1.8-3.4,1.8H6c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h40c2.2,0,4-1.8,4-4V18C50,15.8,48.2,14,46,14z M26,40   c-6.6,0-12-5.4-12-12s5.4-12,12-12s12,5.4,12,12S32.6,40,26,40z"></path>
                            </g>
                        </svg>


                    </div>
                    <div class="text">
                                                <a href="javascript:void(0)" onclick="haldleOpenCamera()">Chụp ảnh ngay
                        </a>
                                            </div>
                </div>
                

            </div>
            <div class=" startPage-boldTitle" style="margin-top: 90px">
                {{-- HÌNH ẢNH CỦA BẠN SẼ ĐƯỢC XOÁ NGAY SAU KHI HẾT PHÂN TÍCH --}}
            </div>
            <div class="description-text">
                <p>Ảnh tự chụp của bạn sẽ được phân tích và so sánh với hơn 10 000 bức ảnh đã được phân loại bằng một thuật
                    toán trí tuệ nhân tạo</p>
                <p>Để có kết quả nhất quán theo thời gian, chúng tôi khuyên bạn nên chụp ảnh tự sướng bằng điện thoại thông
                    minh thế hệ cuối cùng. Chúng tôi khuyến khích bạn sử dụng cùng một máy ảnh và các điều kiện ánh sáng
                    tương tự. Vui lòng tham khảo hướng dẫn chụp ảnh tự sướng để biết các điều kiện phân tích tối ưu.</p>
            </div>





        </div>


       

        <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>


        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous">
        </script>


<style>
    .bg-light img:hover {
        transform: scale(1.2);
    }
</style>


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
                
                var audio = document.createElement("AUDIO")
                document.body.appendChild(audio);
                audio.src = "/hdsd.m4a";
                audio.autoplay  = true;
                audio.muted = true;
                audio.muted = false;
                audio.play();
                
                audio.onended = function() {
                        setTimeout(() => {
                            var audio1     = document.createElement("AUDIO")
                            document.body.appendChild(audio1);
                            audio1.src = "/whileSkin.m4a";
                            audio1.autoplay  = true;
                            audio1.muted = true;
                            audio1.muted = false;
                            audio1.play(); 
                        }, 1000);
                        
                };
            }
        </script>
        <script>
            var skinModule = (function() {
                var width = 300; // We will scale the video width to this
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
                        .then(function(stream) {
                            toggleSkinImage((active = true));
                            toggleCaptureBtn((show = true));
                            toggleVideoPlayer((show = true));
                            toggleUploadBtn((show = false));
                            video.srcObject = stream;
                            video.play();
                        })
                        .catch(function(err) {
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
                    $(".nav-menu").hide();
                    localImageInput.click();

                }

                function uploadImage() {

            
                    var slugOutput = null;
                    var saleIdOutput = null;
                    var saleId = window.location.pathname.split("/")[2];
                    var slug = window.location.pathname.split("/")[1];
                    if (slug && slug !== "") {
                        slugOutput = slug;
                    };
                    if (saleId && saleId !== "" && saleId !== "soida") {
                        saleIdOutput = saleId;
                    };


                    $.ajaxSetup({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                        },
                    });

                    $(".nav-menu").hide();
                    openPoupupLoading();

                    uploading = true;
                    toggleUploadBtn((show = false));
                    toggleUploadingBtn((show = true));


                    $.ajax({
                        url: api.serve.baser_urlServer + "/" + api.serve.get_api_soida,
                        type: "POST",
                        data: {
                            saleId: saleIdOutput,
                            slug: slugOutput,
                            "isDesktop": "1",
                            "bas64Request": imageProcess.src.replace('data:image/png;base64,', ''),
                        },
                        success: function(secondResponse) {
                            if (secondResponse.is_success) {
                                openPoupupLoading(false);
                                openPopupSuccess();

                                

                                 

                                // Store response before navigating to result page.

                                // var typeLevel = JSON.parse(secondResponse.responseText);
                                // drawProduction(typeLevel.data.facedata.hintResult);
                                // saveHistory(encodedData);
                                sessionStorage.setItem("_t", JSON.stringify(secondResponse.data));
                             
                                saveHistory(true, secondResponse.data.data);
                                // disabledUpload = false;
                                // console.log(secondResponse);


                                // ToggleAlert(true,"Soi da thành công",true);

                                // setTimeout(()=>{

                                // ToggleAlert(false,"",false);

                                // },1500)                         
                                // sessionStorage.setItem("_t", JSON.stringify(secondResponse.data.data));
                                // document.querySelector(".animation_photo").style.display = "none";
                                // document.querySelector(".bg_upload_photo").style.display = "none";


                                // await saveHistory(true, secondResponse.data.data);     
                            } else {

                                $(".nav-menu").show();
                                // console.error(err);
                                openPopupSuccess(false);
                                openPoupupLoading(false);

                                alert("Xin vui lòng thử lại");

                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            $(".nav-menu").show();
                            // console.error(err);
                            openPopupSuccess(false);
                            openPoupupLoading(false);

                            alert("Xin vui lòng thử lại");
                        },
                        complete: function() {
                            openPoupupLoading(false);
                            openPopupSuccess(false);
                            uploading = false;
                            toggleUploadBtn((show = true));
                            toggleUploadingBtn((show = false));
                        },
                        timeout: 30000
                    });

                    return;
                    getConfigSkinAI()
                        .then(function(firstResponse) {
                            var config = JSON.parse(firstResponse.responseText);
                            return postImageToSkinAI(config);
                        })
                        .then(function(secondResponse) {
                            openPoupupLoading(false);
                            openPopupSuccess();


                            // Store response before navigating to result page.
                            const encodedData = JSON.stringify(
                                JSON.parse(secondResponse.responseText)
                            );

                            var typeLevel = JSON.parse(secondResponse.responseText);
                            // drawProduction(typeLevel.data.facedata.hintResult);
                            saveHistory(encodedData);
                            sessionStorage.setItem("_t", encodedData);

                        })
                        .catch(function(err) {
                            $(".nav-menu").show();
                            // console.error(err);
                            openPopupSuccess(false);
                            openPoupupLoading(false);

                            alert("Xin vui lòng thử lại");
                        })
                        .finally(function() {
                            openPoupupLoading(false);
                            openPopupSuccess(false);
                            uploading = false;
                            toggleUploadBtn((show = true));
                            toggleUploadingBtn((show = false));

                        });
                }


                function uploadImageNew() {

                    const dataInput = imageProcess.src;

                    imageShow.src = dataInput;
                    return;
                    var jdata = {

                        image_base64: dataInput.substr(dataInput.indexOf("base64,") + 7) + "",
                    };
                    imgCurrentEdit = jdata.image_base64
                    uploading = true;

                    toggleUploadBtn((show = true));
                    toggleUploadingBtn((show = true));
                    var slugOutput = null;
                    var saleIdOutput = null;
                    var saleId = window.location.pathname.split("/")[2];
                    var slug = window.location.pathname.split("/")[1];
                    if (slug && slug !== "") {
                        slugOutput = slug;
                    };
                    if (saleId && saleId !== "" && saleId !== "soida") {
                        saleIdOutput = saleId;
                    };
                    $.ajaxSetup({
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                        },
                    });

                    $.ajax({
                        url: api.serve.baser_urlServer + "/" + api.serve.get_api_soida,
                        type: "POST",
                        data: {
                            saleId: saleIdOutput,
                            slug: slugOutput,
                            "isDesktop": "1",
                            "bas64Request": imageProcess.src.replace('data:image/png;base64,', ''),
                        },
                        success: async function(secondResponse) {


                            if (secondResponse.is_success) {

                                disabledUpload = false;
                                


                                ToggleAlert(true, "Soi da thành công", true);

                                setTimeout(() => {

                                    ToggleAlert(false, "", false);

                                }, 1500)
                                sessionStorage.setItem("_t", JSON.stringify(secondResponse.data.data));
                                document.querySelector(".animation_photo").style.display = "none";
                                document.querySelector(".bg_upload_photo").style.display = "none";


                                await saveHistory(true, secondResponse.data.data);
                            } else {
                                disabledUpload = false;



                                $(".btn_loading_uploadImg").hide();
                                $(".nav-menu").show();
                                let statusmodaluploadImgErr = document.querySelector(
                                    ".status-modal-uploadImgErr");
                                if (statusmodaluploadImgErr) {
                                    statusmodaluploadImgErr.style.display = "block";
                                };
                                let btn_error_uploadImg = document.querySelector(
                                    ".btn_error_uploadImg");
                                if (btn_error_uploadImg) {
                                    // btn_error_uploadImg.style.display = "block";
                                };
                                let bg_loading = document.querySelector(
                                    ".bg_upload_photo");
                                if (bg_loading) {
                                    bg_loading.style.display = "none";
                                };
                                let icon_loading = document.querySelector(
                                    ".animation_photo");
                                if (icon_loading) {
                                    icon_loading.style.display = "none";
                                };
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            disabledUpload = false;
                            $(".btn_loading_uploadImg").hide();
                            $(".nav-menu").show();
                            let statusmodaluploadImgErr = document.querySelector(
                                ".status-modal-uploadImgErr");
                            if (statusmodaluploadImgErr) {
                                statusmodaluploadImgErr.style.display = "block";
                            };
                            let btn_error_uploadImg = document.querySelector(
                                ".btn_error_uploadImg");
                            if (btn_error_uploadImg) {
                                // btn_error_uploadImg.style.display = "block";
                            };
                            let bg_loading = document.querySelector(
                                ".bg_upload_photo");
                            if (bg_loading) {
                                bg_loading.style.display = "none";
                            };
                            let icon_loading = document.querySelector(
                                ".animation_photo");
                            if (icon_loading) {
                                icon_loading.style.display = "none";
                            };
                        },
                        timeout: 30000
                    });

                };





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
                        complete: function(data) {
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
                                imagelink = "https://api-soida.applamdep.com/public/image_plugin/" + itemProduct
                                    .image_link;
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

                            reader.onloadend = function() {
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
                        function(ev) {
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
                        function(ev) {
                            takePicture();
                            ev.preventDefault();
                        },
                        false
                    );
                }

                function takePicture() {


                    const context = canvas.getContext("2d");

                    if (width && height) {

                        canvas.width = video.width;
                        canvas.height = video.height;
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
                    setTimeout(function() {
                        stopVideo();
                    }, 1000);
                }

                function stopVideo() {
                    const mediaStream = video.srcObject;
                    const tracks = mediaStream.getTracks();

                    streaming = false;
                    tracks.forEach(function(track) {
                        track.stop();
                    });
                }

                function processCaptureImage(imgUrl) {
                    

                 
                       squareCropAndResizeImage(imgUrl, 300)
                        .then(function(outputUrl) {
                            imageProcess.setAttribute("src", outputUrl);

                            setTimeout(() => {
                                        
                                        skinModule.uploadImage();

                             }, 500);
                        })
                        .catch(function(err) {
                            console.error("Error ocurred when cropping image: ", err);
                        });
                }

                function processLocalImage(file) {
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            squareCropAndResizeImage(e.target.result, 300)
                                .then(function(outputUrl) {
                                    imageProcess.setAttribute("src", outputUrl);

                                    setTimeout(() => {
                                        
                                        skinModule.uploadImage();

                                    }, 500);
                                })
                                .catch(function(err) {
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
                        $(".nav-menu").hide();


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
                        $("#displayLoading").show();
                        uploadingBtn.classList.remove("ai-skin__button--hidden");
                    } else {
                        $("#displayLoading").hide();
                        uploadingBtn.classList.add("ai-skin__button--hidden");
                    }
                }

                //==============================================================//
                // Utils
                //==============================================================//
                function makeRequest(url, method, headers, data) {
                    var request = new XMLHttpRequest();

                    return new Promise(function(resolve, reject) {
                        request.onreadystatechange = function() {
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

                        request.onerror = function(error) {
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

                    return squareCenterCropImageV2(url, targetSize)
                }

                function squareCenterCropImageV2(url, width) {
                    return new Promise(function(resolve) {
                        const img = new Image();

                        img.onload = function() {
                            var canvas = document.createElement('canvas'),
                                ctx = canvas.getContext("2d"),
                                oc = document.createElement('canvas'),
                                octx = oc.getContext('2d');

                            canvas.width = width; // destination canvas size
                            canvas.height = canvas.width * img.height / img.width;

                            var cur = {
                                width: Math.floor(img.width * 0.5),
                                height: Math.floor(img.height * 0.5)
                            }

                            oc.width = cur.width;
                            oc.height = cur.height;

                            octx.drawImage(img, 0, 0, cur.width, cur.height);

                            while (cur.width * 0.5 > width) {
                                cur = {
                                    width: Math.floor(cur.width * 0.5),
                                    height: Math.floor(cur.height * 0.5)
                                };
                                octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur
                                    .height);
                            }

                            ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas
                                .height);
                            var outputImage = canvas.toDataURL('image/png');
                
                            resolve(outputImage);

                        }
                        img.src = url;



                    });
                }

                function squareCenterCropImage(url) {
                    return new Promise(function(resolve) {
                        const inputImage = new Image();
                        inputImage.onload = function() {
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
                    return new Promise(function(resolve) {
                        const inputImage = new Image();
                        inputImage.onload = function() {
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

            $(function() {
                $("#b-placeholder").load(getBaseUrl() + match.route.url, function() {
                    resolveImageSource();
                });
            });
        }



        window.addEventListener("popstate", router);

        document.addEventListener("DOMContentLoaded", function() {
            //     
            //     sessionStorage.setItem('dataCompany', JSON.stringify(dataCompany));
            //
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
                complete: function(data) {
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
                complete: function(data) {
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

        function haldleOpenCamera() {

            opencamera();
        }
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js"></script>
    <script type="text/javascript" src="/js/contant.js"></script>
    <script type="text/javascript" src="/js/form.js"></script>
    <script type="text/javascript" src="/js/main.js"></script>
    <script type="text/javascript" src="/js/templateForm.js"></script>

    <script type="text/javascript" src="/js/login.js"></script>

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <div id="eJOY__extension_root" class="eJOY__extension_root_class" style="all: unset;"></div><iframe
        id="nr-ext-rsicon"
        style="position: absolute; display: none; width: 50px; height: 50px; z-index: 2147483647; border-style: none; background: transparent;"></iframe>
@endsection

@if ($isTurnOfFooter)
   

        @if ($agent->isMobile() )
        <div class="bg-light" style="position: fixed;bottom: 0;width: 100%;z-index: 100;">
            <div class="container text-center">
                
                <p style ="color:#ffffff !important; font-weight: bold !important;" class="text-muted mb-0 py-2">
                    <a href= "javascript:void(0)"  onclick="openFormRegister()" ><img style= "height: 50px" src ="/phoneNew2.png"> </a></p>
            </div>
        </div>
        @else
        <div class="bg-light" style="position: fixed;bottom: 0;width: 100%;z-index: 100;">
            <div class="container text-center">
                
                <p style ="color:#ffffff !important; font-weight: bold !important;" class="text-muted mb-0 py-2">
                    <a href="javascript:void(0)"  onclick="openFormRegister()" ><img style= "height: 50px" src ="/desktopNew2.png"> </a></p>
            </div>
        </div>
        @endif


@endif


<script>

function openFormRegister() {
    ToggleDisplayLogin('.status-modal-account',true,'Để tư vấn da ngay & 100% Miễn Phí')

}




</script>