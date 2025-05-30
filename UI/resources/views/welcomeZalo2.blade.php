    @php
    $dataSeo = "Soida liền tay";
    $dataLikn =  session('TuVanData', null);
    $dataMinisize =  session('dataminisize', null);
    $zaloLink =  $dataLikn->zaloLink;
    $messengerLink = $dataLikn->messengerLink;
    $linkRegister = $dataMinisize->linkRegister;
    
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
    if($slug =="ngocdung")
    {
    
        $dataSeo-> title ="TMV Ngoc Dung Soi Da Online";
    }
    else if($slug =="zasaly")
    {
        $dataSeo-> title ="Zasaly Spa Soi da Online";
    }
    else if($slug =="zema")
    {
        $dataSeo-> title ="Zema Beauty Soi Da Online";
    }
    else 
    {
        $dataSeo-> title ="Soi da online";
    }
    $bannerClipAccess = $globalcompanyData->data->value->bannerClip;
    
    $dataSeo->description ="Soi Da Online .Ngay tại nhà, Kiểm tra, tuổi da & hơn 40 thông số về da khác. Một lần quét, nói với bạn mọi điều .#soidaonline";


@endphp
@extends('layoutZalo')

@section('header')
    <meta charset="UTF-8">
    <meta name="theme-color" content="#d47690">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />

    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <link rel="stylesheet" href="./styles/global/index.css">
    <link rel="stylesheet" href="./styles/global/global_responsive.css">
    <link rel ="stylesheet" href ="/css/welcomNew.css">
    <link rel ="stylesheet" href ="/css/campaign.css">
    <!-- ASSETS CDN SLICK -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
    <link rel="stylesheet" type="text/css"
        href=" https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

      

        @if (isset($dataSeo->description))
        <meta name="description" content="{{$dataSeo->description}}">
        @else

        @endif
    
    
       @if (isset($dataSeo->imageShare))
       <meta property="og:image"  content="{{$dataSeo->imageShare}}">
        @else
        <meta property="og:image"  content="/images/tikitech_icon.png">
       @endif
   
@endsection
@section('contentpage')

<a  id ="messenger" style ="display:none"  href="https://m.me/106007668343244?ref=mess" target="_blank"><div style="position:fixed;bottom:170px;right:30px; z-index:1000" class="messenger"><noscript>
    <img style="height:58px;" src="/tikiFacebook.png"/></noscript>
    <img class=" lazyloaded" style="height:58px;" src="/tikiFacebook.png" data-src="/tikiFacebook.png"></div>
</a>

<a  id ="zaloMessage" style ="display:none"  href="http://zalo.me/769304971095062899?src=qr" target="_blank"><div style="position:fixed;bottom:70px;right:30px; z-index:1000" class="messenger"><noscript>
    <img style="height:58px;" src="/zalo96.png"/></noscript>
    <img class=" lazyloaded" style="height:58px;" src="/zalo96.png" data-src="/zalo96.png"></div>
</a>

<style>
.call-btn {
    position: fixed;
    bottom: 24px;
    right: 165px;
    background: #37c837;
    text-align: center;
    color: #fff;
    box-shadow: 0px 3px 5px rgba(0,0,0,0.2);
    z-index: 99;
    transition: all .3s;
    font-weight: 700;
    border-radius: 5px;
    padding: 3px 10px 0px 38px;
    font-size: 18px;
    line-height: 25px;
}
.call-btn img {
    position: absolute;
    left: 0;
    top: 0;
    padding: 5px 7px;
    background: rgba(0,0,0,0.3);
    border-radius: 5px 0 0 5px;
    animation: blinking 1s ease-in-out infinite;
}	
	
</style>

    <script>
        var slugGlobal = {!! json_encode($slug) !!};
        var  showOrHide = {!! json_encode($showOrHide) !!};
        var  isLoginUser = {!! json_encode($isLoginUser) !!};
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
                      

                        @php
                        $isMobile = $agent->isMobile();
                        $mediaUrl = $isMobile ? $bannerClipAccess->imageVideoMobileClip : $bannerClipAccess->imageVideoClip;
                    
                        $extension = pathinfo($mediaUrl, PATHINFO_EXTENSION);
                        @endphp

                        @if (in_array(strtolower($extension), ['mp4', 'webm', 'ogg']))
                        <video class="ai-skin__skin-image__background" autoplay muted loop playsinline>
                        <source src="{{ $mediaUrl }}" type="video/{{ $extension }}">
                        Trình duyệt của bạn không hỗ trợ video.
                        </video>
                        @else
                        <img class="ai-skin__skin-image__background" src="{{ $mediaUrl }}" alt="Clip Background">
                        @endif
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

            @if($gameJoinTo == true )
            
                @php
                 $gameData  =  session('dataGame', null);
                
                 $dataImage = $gameData->des;
                @endphp 
                        
                <div id="tips" class="ai-skin__tips" style="displa">
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
                <div id="tips" class="ai-skin__tips" style="display:none">
                 
                    <div class="ai-skin__tips__content">
                        <div onclick="hideTips()"  class ="iconClose">
                           <img src="/iconClose.png">
                        </div>
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
                            <button type="button" onclick="hideTips()">ĐÃ HIỂU</button>
                        </div>
                    </div>
                </div>

            @endif
           



            
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


            <div class="nav-menu" id ="cammeraButton"  style ="display:none">


                <div class="uploadButton cameraNow" >

                    <div class="nav-avatar nav-avatar__camera" onclick="haldleOpenCamera()" style="
                    background-color: red;
                ">
                        
                        <svg class="nav-menu-svg nav-svg-camera" xmlns="http://www.w3.org/2000/svg" 
                        style="
    background-color: red;
"
                        x="0px" y="0px" width="52px" height="52px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve">
                            <g>
                                <path d="M26,20c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S30.4,20,26,20z"></path>
                                <path d="M46,14h-5.2c-1.4,0-2.6-0.7-3.4-1.8l-2.3-3.5C34.4,7,32.7,6,30.9,6h-9.8c-1.8,0-3.5,1-4.3,2.7l-2.3,3.5   c-0.7,1.1-2,1.8-3.4,1.8H6c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h40c2.2,0,4-1.8,4-4V18C50,15.8,48.2,14,46,14z M26,40   c-6.6,0-12-5.4-12-12s5.4-12,12-12s12,5.4,12,12S32.6,40,26,40z"></path>
                            </g>
                        </svg>


                    </div>
                    <div class="text">
                                                <a href="javascript:void(0)" onclick="haldleOpenCamera()">Soi da ngay 
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
    .dropdown-content {
        width: max-content;
        line-height: 150%;
        color: #548135;
    }
</style>


        <script>
            //   setTimeout(() => {
                  
            //         document.getElementById("socialBLock").style.display = "block";

                    


                    
            //     }, 1000);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            
        
       
        </script>
        <script>
            // setTimeout(() => {
            //         document.getElementById("cammeraButton").style.display ="grid";
                

                    


                    
            //     }, 2500);
              function hideTips() {
                var tips = document.getElementById("tips");
                tips.style.display = "none";
                setTimeout(() => {
                    document.getElementById("cammeraButton").style.display ="grid";
                    // document.getElementById("socialBLock").style.display = "block";

                    


                    
                }, 500);
                var audio = document.createElement("AUDIO")
                document.body.appendChild(audio);
                audio.src = "/hdsd.m4a";
                audio.autoplay  = true;
                audio.muted = true;
                audio.muted = false;
                audio.play();
              
                
               
                audio.onended = function() {
                          return;
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

            function hideTips3() {
               
                var audio = document.createElement("AUDIO")
                document.body.appendChild(audio);
                audio.src = "/hdsd.m4a";
                audio.autoplay  = true;
                audio.muted = true;
                audio.muted = false;
                audio.play();
              
                
               
                audio.onended = function() {
                          return;
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

            function hideTips2() {
                var tips = document.getElementById("tips");
                tips.style.display = "none";
                setTimeout(() => {
                    document.getElementById("cammeraButton").style.display ="grid";
                    // document.getElementById("socialBLock").style.display = "block";

                    


                    
                }, 500);
               
            }
        </script>
        <script>
               var zaloLink = '{!! $zaloLink !!}';
            var messengerLink = '{!! $messengerLink !!}';
            var linkRegister = '{!! $linkRegister !!}';
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

                                

                                 
                                sessionStorage.setItem("_t", JSON.stringify(secondResponse.data));
                             
                                saveHistory(true, secondResponse.data.data);
                                
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
                        url: "https://api-ai.exomiyo.com/itemSdk/get_product_result",
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
                                imagelink = "https://api-ai.exomiyo.com/public/image_plugin/" + itemProduct
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
          
            setTimeout(() => {
                $("#choseImageFile").click();
            }, 1000);

          


        }

        function sendreward() {
            $("#btnreward").hide();
            $("#btnrewardLoading").show();
            $.ajax({
                type: "PUT",
                url: "https://api-ai.exomiyo.com/api/add-customer-request",
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
                url: "https://api-ai.exomiyo.com/api/add-customer-request",
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
            if( isLoginUser  == false)
        {
            ToggleDisplayLogin('.status-modal-account',true,'Để soi da online');
            return;
        }

            opencamera();
            return;
            // hideTips();
            setTimeout(() => {
                opencamera();
            }, 1000);
     
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

@if (1==2)
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
    ToggleDisplayFormFollow('.status-modal-follow',true);
    
}



const timeoutDisplayMessage = setTimeout(ShowZalo, 5000);

function ShowZalo() {
    
    return;
    document.getElementById("messenger").style.display = "block";
  document.getElementById("zaloMessage").style.display = "block";
}

</script>

<script>
    function openRegister ( connectionType ="minisize")
{
    
    if(slugGlobal =="exomiyo")
    { 
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSeE6wz4PQkT5BjDmWjIDVOiVKIJ2St2UcIS-H7ab85AkynwfQ/viewform?pli=1&amp;pli=1&amp;edit_requested=true",'_blank');
      }
  else 
  {
    window.open("//m.me/454950651045043",'_blank');
  }
    return;
    $("#status__text__login").click();
 
}
    var timeGet = new Date().getTime();
function OpenAction ( connectionType)
{   
 addClickZalo2(connectionType);
  setTimeout(() => {
    if(zaloLink =="")
    {
        zaloLink =  "http://zalo.me/769304971095062899?src=qr";
    }
    if(messengerLink =="")
    {
        messengerLink =  "https://m.me/106007668343244?ref=mess";
    }
    if(connectionType =="messenger")
    {
        window.open(messengerLink,'_blank');
    }
    else 
    {
        window.open(zaloLink,'_blank');
        
    }
    
  }, 1000);

}


setTimeout(() => {  
     document.getElementById("fromResiger").style.display ="block";
    //document.getElementById("socialBLock").style.display = "block";   
}, 1000);
</script>


<div class ="imagebackground2" id ="fromResiger" style ="display:none" >
    <a  onclick ="openRegister()" >
        <img src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAACWCAIAAABB+eagAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEn2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTEyLTAxPC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmMyMjhmMjc5LWNjY2YtNGFlZC05YWU4LWViZjI4NDI3NDYyZDwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5C4bqjbiBzYW8gY+G7p2EgbWluaXNpemUgLSAyMDwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6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">
    </a>
</div>

<div id ="socialBLock" class="actionToolbar_mobile toolbar_style_2  " style="display:none

">
	<div class=" container-pd">
		<div class="toolbar-wrapper d-flex justify-content-around">
			<div class="toolbar-item toolbar-item-zalo">
				<a class="toolbar-item--boxlink cta-chatzalo" onclick="OpenAction('zalo')"  target="_blank" rel="noopener noreferrer" aria-label="zalo">
					<img src ="/zaloClick.jpg"> 
					<span class="box-text">Tư vấn chăm sóc da Zalo</span>
				</a>
			</div>
			
			<div class="toolbar-item toolbar-item-msg">
				<a class="toolbar-item--boxlink cta-chatmessager" onclick="OpenAction('messenger')"  target="_blank" rel="noopener" aria-label="messenger">
					<img src ="/messengerClick.png" >
                    <span class="box-text">Tư vấn chăm sóc da Messenger</span>
				</a>
			</div>
		
		</div>
	</div>
</div>


<style>

.actionToolbar_mobile.toolbar_style_2 {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
}

@media (max-width: 991px)
.actionToolbar_mobile {
    display: block;
}
.actionToolbar_mobile {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    background: #fff;
    display: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
}
.actionToolbar_mobile.toolbar_style_2 .toolbar-wrapper {
    margin: 0 -2px;
    padding: 5px;
}
.actionToolbar_mobile.toolbar_style_2 .toolbar-item {
    padding: 0 1px;
    -webkit-flex: 1 1;
    flex: 1 1;
    max-width: 96%;
}

.actionToolbar_mobile.toolbar_style_2 .toolbar-wrapper {
    margin: 0 -2px;
    padding: 5px;
}

.justify-content-around {
    -ms-flex-pack: distribute!important;
    justify-content: space-around!important;
}

.actionToolbar_mobile.toolbar_style_2 .toolbar-item {
    padding: 0 1px;
    -webkit-flex: 1 1;
    flex: 1 1;
    max-width: 96%%;
}
.actionToolbar_mobile.toolbar_style_2 .toolbar-item-zalo .toolbar-item--boxlink {
    background: #1272e8;
}

.actionToolbar_mobile.toolbar_style_2 .toolbar-item--boxlink {
    border-radius: 20px;
    padding: 2px;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    background: var(--shop-color-main);
    color: #ffffff;
}
.actionToolbar_mobile.toolbar_style_2 .toolbar-item--boxlink svg {
    display: block;
    border-radius: 50%;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: 30px;
    height: 30px;
    border: 1px solid #ffffff;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.11);
}

.actionToolbar_mobil svg {
    overflow: hidden;
    vertical-align: middle;
}
.actionToolbar_mobile.toolbar_style_2 .toolbar-item--boxlink .box-text {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: calc(100% - 30px);
    padding: 2px 6px 2px 4px;
    line-height: 1.3;
    font-size: 10px;
    font-weight: 600;
    text-align: center;
    white-space: initial;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
}
.actionToolbar_mobile.toolbar_style_2 .toolbar-item--boxlink {
    border-radius: 20px;
    padding: 2px;
    display: -webkit-flex;
    display: -moz-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    background: var(--shop-color-main);
    color: #ffffff;
    background: #9946e8;
}
.actionToolbar_mobile img {
width: 24px;
background-color: transparent;
}
.actionToolbar_mobile a:hover {
 opacity: 0.8;
 text-decoration: none;
}
#socialBLock a:hover {
 opacity: 0.7;
 color: #ffffff;
}
</style>

