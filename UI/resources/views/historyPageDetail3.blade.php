@php
        $dataLikn =  session('TuVanData', null);

       
@endphp
@extends('layoutDetailHistory')


    <script>
      
    </script>

@include('popup.subscrible')

@section('header')
    <title>Thông tin kết quả soi da</title>
    <meta name="theme-color" content="#d47690">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />
    <link rel="stylesheet" href="/css/soidanew.css">
    <link rel="stylesheet" href="/css/tuvantongquan.css">
    <link rel="stylesheet" href="/css/reponsive.css">
    <link rel="stylesheet" href="/css/sanphamgoiy.css">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <!-- <link href="https://fonts.googleapis.com/css2?family=Lobster&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap" rel="stylesheet"> -->
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"></script>
    <!-- <link rel="stylesheet" href="http://localhost:5000/contain/css/style.css" /> -->
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/main.css">
    <!-- <link rel="stylesheet" href="https://ungdungsoida.netlify.app/contain/css/style.css" /> -->

    <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="/assets/aos/aos.css">
    <link rel="stylesheet" href="/styles/skin_screening/index.css">
    <link rel="stylesheet" href="/styles/skin_screening/responsive.css">
    <link rel="stylesheet" href="/styles/global/index.css">
    <link rel="stylesheet" href="/styles/global/global_responsive.css">
    <link rel ="stylesheet" href ="/css/welcomNew.css">
    <!-- ASSETS CDN SLICK -->
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <link rel="stylesheet" type="text/css"
        href=" https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
.animated-gradient {
  background: repeating-linear-gradient(to right, red 0%, blue 50%, red 100%);
  width: 100%;
  background-size: 200% auto;
  background-position: 0 100%;
  animation: gradient 2s infinite;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}
.record-content .record-content-tab .description .description-content {

    display: inline-grid;
}

.center-div {
   margin-bottom: 20px !important;
}


@keyframes gradient { 
  0%   { background-position: 0 0; }
  100% { background-position: -200% 0; }
}   
    </style>



@endsection
@section('contentpage')






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
    @include("popupGame.popupFailed")

    @include("game.popupRegigerGame")
    @include ("popupGame.popup")
    <script>
        var slugGlobal = {!! json_encode($slug) !!};
    </script>
    {{-- <div class="modal" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body loginpopup">
                <form id="formLogin">
                    <button class="login-google">Tiếp tục với google </button>
                    <span class="break-line">Hoặc </span>
                    <input type="text" placeholder="Email hoặc SĐT" id="userNameLogin" name="userName"
                        class="login-input userName" required>
                    <span class="errorMessage errorMessageUserName" style="display:none"> Bạn chưa nhập email hoặc
                        số điện thoại</span>
                    <input type="password" placeholder="Mật khẩu" id="passwordLogin" class="login-input password"
                        name="password" required>
                    <span class="errorMessage errorMessagePassword" style="display:none">Bạn chưa nhập mật
                        khẩu</span>
                </form>
                <button class="login-btn" onclick="login()">Đăng nhập/Đăng ký </button>
                <p class="bottomPage">
                    Bạn chưa có tài khoản?
                    <a href="javascript:void(0)" onclick="openForm(1)"> <strong>Tạo tài khoản </strong> </a>
                </p>
            </div>

        </div>
    </div>
</div>

<div class="modal" id="signUpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">

                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body loginpopup">

                <form id="formRegister">
                        <button class="login-google">Tiếp tục với google </button>
                        <span class="break-line">Hoặc </span>
                        <input type="text" placeholder="Email hoặc SĐT" id="userNameRegister" name="userName"
                            class="login-input userName" required>
                        <span class="errorMessage errorMessageUserName" style="display:none"> Bạn chưa nhập email hoặc
                            số điện thoại</span>
                        <input type="password" placeholder="Mật khẩu" id="passwordRegister" class="login-input password"
                            name="password" required>
                        <span class="errorMessage errorMessagePassword" style="display:none">Bạn chưa nhập mật
                            khẩu</span>
                </form>

                <button class="login-btn" onclick="register()">Tạo tài khoản ngay </button>

                <p class="bottomPage">Bạn đã có tài khoản? <a href="javascript:void(0)" onclick="openForm(0)">
                        <strong>Đăng nhập </strong> </a>
                </p>



            </div>

        </div>
    </div>
</div> --}}

    <div id="b-placeholder">
        <div class="centerText recomendProduct">
            <p>
                KẾT QUẢ PHÂN TÍCH
            </p>
            <img src="/images/step3.png">
        </div>
     

        <span  id ="scoreAvg" class="score">  </span>  

        {{-- <div class="profilearea">

        <div class="dropdown">
            <button class="dropbtn" >
                <span id ="profileName"> </span>
                <img src="/assets/drop-down-arrow.png"> 
            </button>
            <div class="dropdown-content">
            <a href="javascript:void(0)" onclick ="openAccountPage()">Thông tin tài khoản</a>
            <a href="javascript:void(0)" onclick ="openHomePage()">Soi da online</a>
            <a href="javascript:void(0)" onclick ="openHistoryPage()">Lịch sử soi da</a>
            <a href="javascript:void(0)" onclick="logout()"  >Đăng xuất</a>
            </div>
        </div>
    </div> --}}

        {{-- <div class="areaLogin">


        <ul class="right-menu">




            <li class="right-text login">
                <a id="myBtn" href="javascript:void(0)" data-toggle="modal" data-target="#loginModal">Đăng nhập/Đăng ký</a>
            </li>
            <li class="right-text login">
                <a href=" https://applamdep.com/" href="javascript:void(0)" data-toggle="modal"
                    data-target="#signUpModal">Đăng ký</a>
            </li>
        </ul>

    </div> --}}

        <style>
            .slick-slide img {
                width: 100% !important;
            }

            .slick-slide {
                height: unset !important;
            }

            .ai-skin__result {
                display: block !important
            }
        </style>

       

        <div class="ai-skin__container">
            <div id="output">
                <div class="ai-skin__result-top">
                    <div class="ai-skin__result-image ai-skin__image--cropped">
                        <img id="imageResult">
                        <div id="spotContainer" class="ai-skin__result-plot"> </div>
                        <div id="blackHeadContainer" class="ai-skin__result-plot"> </div>
                        <div id="pimpleContainer" class="ai-skin__result-plot"> </div>
                        <div id="acneContainer" class="ai-skin__result-plot">
                            <div class="ai-skin__result-plot__box"
                                style="width: 5.00292px; height: 4.66571px; top: 102.585px; left: 155.757px; color: rgb(255, 255, 0); border-color: rgb(255, 255, 0);">
                            </div>
                        </div>
                        <div id="moleContainer" class="ai-skin__result-plot"></div>
                    </div>
                    <div class="ai-skin__result-checkContainer" style="justify-content: center;">
                        <div class="rowcolum1 hideWrapper" >
                            <label class="ai-skin__result-checkbox">
                                <span class="ai-skin__result-checkbox-input">
                                    <input type="checkbox" id="myCheckSpot" onclick="resultModule.toggleSpot()">
                                    <span class="ai-skin__result-checkmark">
                                        <span></span>
                                    </span>
                                </span>
                                <span class="ai-skin__result-checkbox-label">Đốm tàn nhan</span>
                            </label>
                            <label class="ai-skin__result-checkbox">
                                <span class="ai-skin__result-checkbox-input">
                                    <input type="checkbox" id="myCheckAcne" onclick="resultModule.toggleAcne()"
                                        checked="true">
                                    <span class="ai-skin__result-checkmark">
                                        <span></span>
                                    </span>
                                </span>
                                <span class="ai-skin__result-checkbox-label"> Mụn trứng cá</span>
                            </label>
                        </div>

                        <div class="rowcolum1 column2 hideWrapper">
                            <label class="ai-skin__result-checkbox">
                                <span class="ai-skin__result-checkbox-input">
                                    <input type="checkbox" id="myCheckPimple" onclick="resultModule.togglePimple()">
                                    <span class="ai-skin__result-checkmark">
                                        <span></span>
                                    </span>
                                </span>
                                <span class="ai-skin__result-checkbox-label">Mụn sưng viêm</span>
                            </label>
                            <label class="ai-skin__result-checkbox">
                                <span class="ai-skin__result-checkbox-input">
                                    <input type="checkbox" id="myCheckBlackhead" onclick="resultModule.toggleBlackhead()">
                                    <span class="ai-skin__result-checkmark">
                                        <span></span>
                                    </span>
                                </span>
                                <span class="ai-skin__result-checkbox-label">Mụn đầu đen</span>
                            </label>
                        </div>
                        <div class="rowcolum1 column3">
                            <label class="ai-skin__result-checkbox">
                                <span class="ai-skin__result-checkbox-input">
                                    <input type="checkbox" id="myCheckMole" onclick="resultModule.toggleMole()">
                                    <span class="ai-skin__result-checkmark">
                                        <span></span>
                                    </span>
                                </span>
                                <span class="ai-skin__result-checkbox-label">Nốt ruồi</span>
                            </label>
                        </div>


                    </div>

                </div>

                <div class="box-modal-suggestion">
                    <p class="text-center-box">
                        Ban khám phá nốt ruồi <br>
                        & tướng số ngay bây giờ

                    </p>
                </div>

                <div class="resultNote" id ="viewhistory">

                    <p class="text-title-paragraph">

                        Thông tin kết quả
                    </p>
                </div>
                <div id="idGeneralResult">

               
                </div>
              

            </div>
       

      

        </div>

            
       



        <script>
        
            function openRecomendProduct() {

                var base_url = window.location.origin + "/" + "soida/nhan-de-xuat-cham-soc-da";


                if (slugGlobal != null && slugGlobal !== "") {

                    base_url = window.location.origin + "/" + slugGlobal + "/" + "nhan-de-xuat-cham-soc-da";
              }

                window.open(base_url, "_self");
                return;



                if (slugGlobal == null) {
                    window.location.href = "/nhan-de-xuat-cham-soc-da";
                } else {
                    window.location.href = "/" + slugGlobal + "/nhan-de-xuat-cham-soc-da";
                }

                window.location.href = "/nhan-de-xuat-cham-soc-da";

                return;
                if (slugGlobal == null) {
                    window.location.href = "/nhan-de-xuat-cham-soc-da";
                } else {
                    window.location.href = "/" + slugGlobal + "/nhan-de-xuat-cham-soc-da";
                }

            }

            function jsonPath(obj, expr, arg) {
                var P = {
                    resultType: (arg && arg.resultType) || "VALUE",
                    result: [],
                    normalize: function(expr) {
                        var subx = [];
                        return expr
                            .replace(/[\['](\??\(.*?\))[\]']/g, function($0, $1) {
                                return "[#" + (subx.push($1) - 1) + "]";
                            })
                            .replace(/'?\.'?|\['?/g, ";")
                            .replace(/;;;|;;/g, ";..;")
                            .replace(/;$|'?\]|'$/g, "")
                            .replace(/#([0-9]+)/g, function($0, $1) {
                                return subx[$1];
                            });
                    },
                    asPath: function(path) {
                        var x = path.split(";"),
                            p = "$";
                        for (var i = 1, n = x.length; i < n; i++)
                            p += /^[0-9*]+$/.test(x[i]) ? "[" + x[i] + "]" : "['" + x[i] + "']";
                        return p;
                    },
                    store: function(p, v) {
                        if (p)
                            P.result[P.result.length] =
                            P.resultType == "PATH" ? P.asPath(p) : v;
                        return !!p;
                    },
                    trace: function(expr, val, path) {
                        if (expr) {
                            var x = expr.split(";"),
                                loc = x.shift();
                            x = x.join(";");
                            if (val && val.hasOwnProperty(loc))
                                P.trace(x, val[loc], path + ";" + loc);
                            else if (loc === "*")
                                P.walk(loc, x, val, path, function(m, l, x, v, p) {
                                    P.trace(m + ";" + x, v, p);
                                });
                            else if (loc === "..") {
                                P.trace(x, val, path);
                                P.walk(loc, x, val, path, function(m, l, x, v, p) {
                                    typeof v[m] === "object" &&
                                        P.trace("..;" + x, v[m], p + ";" + m);
                                });
                            } else if (/,/.test(loc)) {
                                // [name1,name2,...]
                                for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
                                    P.trace(s[i] + ";" + x, val, path);
                            } else if (/^\(.*?\)$/.test(loc))
                                // [(expr)]
                                P.trace(
                                    P.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) +
                                    ";" +
                                    x,
                                    val,
                                    path
                                );
                            else if (/^\?\(.*?\)$/.test(loc))
                                // [?(expr)]
                                P.walk(loc, x, val, path, function(m, l, x, v, p) {
                                    if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m))
                                        P.trace(m + ";" + x, v, p);
                                });
                            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc))
                                // [start:end:step]  phyton slice syntax
                                P.slice(loc, x, val, path);
                        } else P.store(path, val);
                    },
                    walk: function(loc, expr, val, path, f) {
                        if (val instanceof Array) {
                            for (var i = 0, n = val.length; i < n; i++)
                                if (i in val) f(i, loc, expr, val, path);
                        } else if (typeof val === "object") {
                            for (var m in val)
                                if (val.hasOwnProperty(m)) f(m, loc, expr, val, path);
                        }
                    },
                    slice: function(loc, expr, val, path) {
                        if (val instanceof Array) {
                            var len = val.length,
                                start = 0,
                                end = len,
                                step = 1;
                            loc.replace(
                                /^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g,
                                function($0, $1, $2, $3) {
                                    start = parseInt($1 || start);
                                    end = parseInt($2 || end);
                                    step = parseInt($3 || step);
                                }
                            );
                            start = start < 0 ? Math.max(0, start + len) : Math.min(len, start);
                            end = end < 0 ? Math.max(0, end + len) : Math.min(len, end);
                            for (var i = start; i < end; i += step)
                                P.trace(i + ";" + expr, val, path);
                        }
                    },
                    eval: function(x, _v, _vname) {
                        try {
                            return $ && _v && eval(x.replace(/@/g, "_v"));
                        } catch (e) {
                            throw new SyntaxError(
                                "jsonPath: " +
                                e.message +
                                ": " +
                                x.replace(/@/g, "_v").replace(/\^/g, "_a")
                            );
                        }
                    },
                };

                var $ = obj;
                if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
                    P.trace(P.normalize(expr).replace(/^\$;/, ""), obj, "$");
                    return P.result.length ? P.result : false;
                }
            }
        </script>
        <script>
            var resultModule = (function() {
                const IMAGE_INFO_SELECTOR = "$.facedata.['image_info']";
                const SKIN_SPOT_SELECTOR =
                    "$.facedata.specialResult.data[*].data[?(@.key == 'SkinSpot')]";
                const SKIN_ACNE_SELECTOR =
                    "$.facedata.specialResult.data[*].data[?(@.key == 'SkinAcne')]";
                const SKIN_PIMPLE_SELECTOR =
                    "$.facedata.specialResult.data[*].data[?(@.key == 'SkinPimple')]";
                const SKIN_BLACKHEADS_SELECTOR =
                    "$.facedata.specialResult.data[*].data[?(@.key == 'SkinBlackHeads')]";
                const SKIN_MOLE_SELECTOR =
                    "$.facedata.generalResult.data[*].data[?(@.key == 'SkinMole')]";
                // "$.data.facedata.generalConclusion.data[*].data[?(@.key == 'SkinMole')]";

                const SKIN_DRAWERS = [{
                    selector: SKIN_SPOT_SELECTOR,
                    checkboxId: "myCheckSpot",
                    plotContainerId: "spotContainer",
                    plotColor: "#FEA500",
                }, {
                    selector: SKIN_ACNE_SELECTOR,
                    checkboxId: "myCheckAcne",
                    plotContainerId: "acneContainer",
                    plotColor: "#FFFF00",
                }, {
                    selector: SKIN_PIMPLE_SELECTOR,
                    checkboxId: "myCheckPimple",
                    plotContainerId: "pimpleContainer",
                    plotColor: "##00A853",
                }, {
                    selector: SKIN_BLACKHEADS_SELECTOR,
                    checkboxId: "myCheckBlackhead",
                    plotContainerId: "blackHeadContainer",
                    plotColor: "#FF50AF",
                }, {
                    selector: SKIN_MOLE_SELECTOR,
                    checkboxId: "myCheckMole",
                    plotContainerId: "moleContainer",
                    plotColor: "#FE0000",
                }, ];

                var dataJson = null;

                // startup();

                return {
                    toggleAcne: toggleAcne,
                    toggleBlackhead: toggleBlackhead,
                    toggleMole: toggleMole,
                    togglePimple: togglePimple,
                    toggleSpot: toggleSpot,
                    startup: startup
                };

                function startup() {

                    try {
                        dataJson = objectReponse;
                    } catch (e) {
                        console.error(e);
                    }
                    dataJson && showResult(dataJson);

                    const imageSizeChangedObserver = new ResizeObserver(function() {
                        dataJson && renderSkinIssues(dataJson);
                    });
                    imageSizeChangedObserver.observe(
                        document.getElementById("imageResult")
                    );

                }

                function showResult(dataJSON) {
                    dataJSON.facedata.generalConclusion.data = dataJSON.facedata.generalConclusion.data.slice(
                        0, 2)
                    renderSkinIssues(dataJSON);


                }

                function renderSkinIssues(data) {
                    const imageInfos = jsonPath(data, IMAGE_INFO_SELECTOR);
                    const imageInfo = imageInfos && imageInfos[0];
                    if (!imageInfo) return;
                    const img = document.getElementById("imageResult");
                    img.src = imageInfo.url;

                    const imagePlottedWidth = img.width;
                    const originalWidth = imageInfo.width;
                    const scaleRatio = imagePlottedWidth / originalWidth;

                    clearDrawData();
                    SKIN_DRAWERS.forEach(function(item) {
                        const skinItems = jsonPath(data, item.selector);
                        const skinItem = skinItems && skinItems[0];

                        if (skinItem && skinItem.value > 0) {
                            document
                                .getElementById(item.checkboxId)
                                .setAttribute("checked", true);

                            drawData(
                                skinItem.drawArr,
                                item.plotContainerId,
                                item.plotColor,
                                scaleRatio
                            );
                        }
                    });
                }

                function renderData(itemInput, idParse = "demo", titleDefault = "") {
                    var outputs = "";
                    outputs += "<details open>"
                    if (itemInput.title !== undefined) {
                        outputs += "<summary class='summary-txt'>" +
                            itemInput.title.vi + "\n" + "</summary>";
                    } else if (titleDefault !== "") {
                        outputs += "<summary class='summary-txt'>" + titleDefault
                        outputs += "</summary>";
                    }
                    // console.log('outputs', outputs)
                    let dataInput1 = ""
                    for (var i = 0; i < itemInput.data.length; i++) {
                        let itemData = itemInput.data[i];
                        // console.log('itemData', itemData)
                        if (itemData !== null) {
                            let itemOutput = "";
                            if (itemData.title !== undefined && itemData.title.vi !== undefined) {
                                itemOutput += "<li class='title-txt'>" + itemData.title.vi + ": " + "\n" + "</li>";
                            } {
                                itemData.data !== undefined ?
                                    itemData.data.forEach((item, i) => {
                                        itemOutput += "<li class='description-txt'>" + item.valueVI + "\n" +
                                        "</li>";
                                    }) :
                                    null;
                            } {
                                itemData.valueEN !== undefined && itemData.valueVI !== undefined ?
                                    (itemOutput += "<li class='description-txt'>" + itemData.valueVI + "\n" + "</li>") :
                                    null;
                            }
                            // console.log('itemOutput', itemOutput)
                            dataInput1 += "<ul>" + itemOutput + "</ul>";
                        }
                    }
                    outputs += dataInput1 + "</details>"

                    document.getElementById(idParse).innerHTML = outputs;
                }

                function renderSpecialData(itemInput, idParse = "demo") {
                    var outputs = "";
                    outputs += "<details open>"
                    if (itemInput.title !== undefined) {
                        outputs +=
                            "<summary class='summary-txt'>" +
                            itemInput.title.vi +
                            "</summary>";
                    }
                    let dataInput1 = ""
                    for (let j = 0; j < itemInput.data.length; j++) {
                        let tempData = itemInput.data[j];
                        for (let k = 0; k < tempData.length; k++) {
                            let itemData = tempData[k];
                            if (itemData.data !== undefined) {
                                if (itemData !== null) {
                                    // outputs += "<li>" + "-------------" + "</li>";
                                    let itemOutput = "";
                                    if (itemData.title !== undefined) {
                                        itemOutput += "<li class='title-txt'>" + itemData.title.vi + "\n" + "</li>";
                                    } {
                                        itemData.data !== undefined ?
                                            itemData.data.vi.forEach((item, i) => {
                                                itemOutput += "<li class='description-txt'>" + item + "\n" +
                                                "</li>";
                                            }) :
                                            null;
                                    } {
                                        itemData.valueEN !== undefined &&
                                            itemData.valueVI !== undefined ?
                                            (itemOutput += "<li class='description-txt'>" + itemData.valueVI + "\n" +
                                                "</li>") :
                                            null;
                                    }
                                    outputs += "<ul>" + itemOutput + "</ul>";
                                }
                            }
                        }
                    }
                    outputs += dataInput1 + "</details>"

                    document.getElementById(idParse).innerHTML = outputs;
                }

                function drawData(arr, itemId, color = "red", scaleRatio = 1) {
                   if(itemId != "moleContainer")
                   {
                    return;
                   }
                    if (arr && arr.length > 0) {
                        for (var i = 0; i < arr.length; i++) {
                            renderDivItem(itemId, arr[i], scaleRatio, color);
                        }
                    }
                }

                function clearDrawData() {
                    document
                        .querySelectorAll(".ai-skin__result-plot__box")
                        .forEach(function(item) {
                            item.remove();
                        });
                }

                function renderDivItem(itemId, data, scaleRatio = 1, color = "red") {
                    var div = document.createElement("div");

                    div.style.width = data.width * scaleRatio + "px";
                    div.style.height = data.height * scaleRatio + "px";
                    div.style.top = data.top * scaleRatio + "px";
                    div.style.left = data.left * scaleRatio + "px";
                    div.style.color = color;
                    div.style.borderColor = color;

                    div.className = "ai-skin__result-plot__box";
                    let el = document.getElementById(itemId);
                    el.appendChild(div);
                }

                function toggleSpot() {
                    toggleSkinIssue("myCheckSpot", "spotContainer");
                }

                function toggleAcne() {
                    toggleSkinIssue("myCheckAcne", "acneContainer");
                }

                function togglePimple() {
                    toggleSkinIssue("myCheckPimple", "pimpleContainer");
                }

                function toggleBlackhead() {
                    toggleSkinIssue("myCheckBlackhead", "blackHeadContainer");
                }

                function toggleMole() {
                    toggleSkinIssue("myCheckMole", "moleContainer");
                }

                function toggleSkinIssue(toggleId, containerId) {
                  
                
                    var checkBox = document.getElementById(toggleId);
                    var plotContainer = document.getElementById(containerId);

                    if (checkBox.checked == true) {
                        plotContainer.style.display = "block";
                    } else {
                        plotContainer.style.display = "none";
                    }
                }

            })();
        </script>

        <script>
            // Check for valid email syntax
            function validateEmail(email) {
                var re =
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }

            function closeForm() {
                document.contactform.name.value = '';
                document.contactform.email.value = '';
                document.contactform.message.value = '';
                document.contactform.phone.value = '';
                document.contactform.address.value = '';

                $('.email').removeClass('typing');
                $('.name').removeClass('typing');
                $('.message').removeClass('typing');
                $('.phone').removeClass('typing');
                $('.address').removeClass('typing');

                $('.cd-popup').removeClass('is-visible');
                $('.notification').addClass('is-visible');
                $('#notification-text').html("Cám ơn bạn đã tin dùng dịch vụ chúng tôi!");
            }
        </script>

        <script>
        



           


            $(document).ready(function($) {

                //loadDataRecomendProductNew();
                $(document).keyup(function(event) {
                    if (event.which == '27') {
                        $('.cd-popup').removeClass('is-visible');
                    }

                });

            

             

             

                
            });

      
        </script>


    </div>







    <script>
       
    </script>
    
    <script>
        function getBaseUrl() {
            // return "https://ungdungsoida.netlify.app/";
            return "./";
        }
    </script>

    <script>
        document.addEventListener("DOMContentLoaded", function() {

           


        });
    </script>

    
    <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>


    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous">
    </script>


 
    <script type="text/javascript" src="/js/templateForm.js"></script>

  


    <script type="text/javascript" src="/js/contant.js"></script>
  
  
    

    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
     
        
     var resultCheck =  {!! json_encode($result) !!};
            
    var objectReponse = resultCheck.Result;
    var  resultHi = objectReponse;


var arraySkinMoleArray = [
  
];

var arraySkinMoleArray1 = resultHi.facedata.generalResult.data[3].data;

if(arraySkinMoleArray1.length >0)
{
  arraySkinMoleArray = arraySkinMoleArray1[0].drawArr;
}

var faceArea = {
  "height": 100.6203,
  "left": 102.71003,
  "top": 62.76482,
  "width": 105.47623
};
faceArea= resultHi.rectangle;

var xAnumber = faceArea.left;
var yAnumber = faceArea.top;
var ratex = faceArea.width/5;
var ratey = faceArea.height/2;
var ratexy= 0.2;
var htmlElement = '';

        document.addEventListener("DOMContentLoaded", function() {


          

            resultModule.startup();

            reDrawInfomation();

           
            drawConcludeDetail(objectReponse.facedata.hintResult);

            drawConcludeOverview(objectReponse.facedata.hintResult);
           
          
          
        
                
        });
    </script>
@endsection


<script>
   var refreshIntervalId;


 


setTimeout(() => {  
    document.getElementById("fromResiger").style.display ="block";
   
}, 5000);

function myTimer() {

        
   
}




function isOnScreen(element)
{
    var curPos = element.offset();
    var curTop = curPos.top;
    var screenHeight = $(window).height();
    return (curTop > screenHeight) ? false : true;
}
function openFormRegister() {
    if(!isLogin)
    {
        ToggleDisplayFormFollow3('.status-modal-follow',true);
    }
    
    
}


function openFormRegister2() {
    if(!isLogin)
    {
        ToggleDisplayFormFollow2('.status-modal-follow',true);
    }
    
    
    
}



const timeoutDisplayMessage = setTimeout(ShowZalo, 5000);

function ShowZalo() {
    return;
  document.getElementById("socialBLock").style.display = "block";

  
}

var timeGet = new Date().getTime();
function OpenAction ( connectionType)
{   
}


    function openRegister ( connectionType ="minisize")
{   

    ToggleDisplayLogin('.status-modal-account',true,'Để xem lịch sử soi da online');
 
}





document.addEventListener("DOMContentLoaded", function(event) {
     var htmlElement2 ='';
        arraySkinMoleArray.forEach(itemSkinMole => {
            
             var outPutRule = checknumber12( itemSkinMole, faceArea);
             if(outPutRule < 0)
             {
                outPutRule = checknumber34(itemSkinMole, faceArea);

                if(outPutRule <0 )
                {
                    outPutRule = checknumber56(itemSkinMole, faceArea);
                    if(outPutRule <0)
                    {
                        outPutRule = checknumber78(itemSkinMole, faceArea);
                            if(outPutRule <0)
                        {
                            outPutRule = checknumber78dowm(itemSkinMole, faceArea);
                            if(outPutRule <0)
                    {
                        outPutRule = checknumber910(itemSkinMole, faceArea);
                        if(outPutRule<0)
                        {
                          
                            outPutRule = checknumber1112dowm(itemSkinMole, faceArea);
                            if(outPutRule<0)
                            {  
                              outPutRule = checknumber13(itemSkinMole, faceArea);

                              if(outPutRule<0)
                              {
                                outPutRule = checknumber1415(itemSkinMole, faceArea);
                                if(outPutRule < 0)
                                {
                                  outPutRule = checknumber1617(itemSkinMole, faceArea);

                                  if(outPutRule <0)
                                  {
                                    outPutRule = checknumber2324(itemSkinMole, faceArea);
                                    if(outPutRule <0)
                                    {
                                      outPutRule = checknumber2122(itemSkinMole, faceArea);

                                      if(outPutRule <0)
                                      {
                                        outPutRule = checknumber18(itemSkinMole, faceArea);
                                        if(outPutRule <0)
                                        {
                                          outPutRule = checknumber20(itemSkinMole, faceArea);
                                          
                                          if(outPutRule <0)
                                          {
                                            outPutRule = checknumber19(itemSkinMole, faceArea);

                                          }
                                        }
                                       
                                      }
                                     
                                    }
                                  }
                                }
                              }

                            }
                        }
                    }
                        }
                    }
                }
            

             }
             var titlepa = '';
             var contentPa ='';
    
             
             if(outPutRule == 1)
             {
                titlepa =  'Nốt ruồi số 1';
                contentPa = 'Người sở hữu nốt ruồi ở vị trí này là người có số khắc cha mẹ, hay xảy ra mâu thuẫn, cuộc sống đều phải tự thân vận động mới có </strong></p></div>';
             }
            else if(outPutRule == 2)
             {
                titlepa =  'Nốt ruồi số 2';
                contentPa = 'Dễ gặt hái được nhiều thành công, nhưng không được lâu dài</br> Dễ vướng vào thị phi ';
             }
             else if(outPutRule == 3)
             {
                titlepa =  'Nốt ruồi số 3';
                contentPa = 'Nốt ruồi ở trên mặt tại vị trí này là người có số khắc cha mẹ từ nhỏ, không sống chung được với cha mẹ</br>Là người thích sống bình dự, luôn bằng lòng với cuộc sống ';
             }
             else if(outPutRule == 4)
             {
                titlepa =  'Nốt ruồi số 4';
                contentPa = 'Được hưởng cuộc sống hạnh phúc, đầy đủ<br> Có số giàu sang <br>Gặp được quý nhân giúp đỡ khi gặp khó khăn';
             }
             else if(outPutRule == 5)
             {
                titlepa =  'Nốt ruồi số 5';
                contentPa = 'Là người có tấm lòng từ bi, nhân hậu</br>Người sở hữu nốt ruồi trên mặt tại vị trí này công việc làm ăn luôn gặp nhiều thuận lợi, được quý nhân giúp đỡ</br>Là người có địa vị trọng xã hội, được mọi người kính trọng';
             }
             else if(outPutRule == 6)
             {
                titlepa =  'Nốt ruồi số 6';
                contentPa = 'Đây là nốt ruồi không tốt, hay gặp phải thị phi, tai tiếng';
             }

             else if(outPutRule == 7)
             {
                titlepa =  'Nốt ruồi số 7';
                contentPa = 'Thường xuyên phải đi làm xa gia đình</br> Sức khỏe không được tốt </br> Gia đình hay xảy ra nhiều mâu thuẫn, cãi vã</br> Nên cẩn trọng trong việc làm ăn, kinh doanh';
             }
             else if(outPutRule == 71)
             {
                titlepa =  'Nốt ruồi số 7';
                contentPa = 'Giải mã nốt ruồi ở mặt xét thấy đây là người đa tài, am hiểu nhiều lĩnh vực khác nhau</br>Nhưng, gặp nhiều khó khăn trong công việc, nếu kiên trì sẽ vượt qua tất cả';
             }
             else if(outPutRule == 81)
             {
                titlepa =  'Nốt ruồi số 8';
                contentPa = 'Công danh, tiền tài đều rất tốt</br>Là người nhanh nhạy, thông minh</br>Chú ý nhiều hơn đến sức khỏe, tránh các bệnh về đường hô hấp';
             }
             else if(outPutRule == 9)
             {
                titlepa =  'Nốt ruồi số 9';
                contentPa = 'Là người sống bôn ba, tha hương</br> Sẽ có cuộc sống đầy đủ, sung túc</br>Dù Gặp nhiều khó khăn trong cuộc sống, nếu quyết tâm vượt qua, sẽ có được kết quả tốt';
             }

             else if(outPutRule == 10)
             {
                titlepa =  'Nốt ruồi số 10';
                contentPa = 'Đây là vị trí nốt ruồi trên khuôn mặt phú quý, có được nhiều thành tựu nhờ sự nỗ lực của bản thân</br>Xem nốt ruồi ở trên mặt cho biết đây là người am hiểu, hiểu biết sâu rộng';
             }

             else if(outPutRule == 11)
             {
                titlepa =  'Nốt ruồi số 11';
                contentPa = 'Dễ gặp được người tài giỏi, có quyền chức cao</br>Gặp nhiều bất lợi trong cuộc sống</br>Coi nốt ruồi trên mặt cho hay đây là vị trí nốt ruồi tốt, mang lại nhiều tài lộc';
             }

             else if(outPutRule == 12)
             {
                titlepa =  'Nốt ruồi số 12';
                contentPa = 'Làm ăn kinh doanh nên cẩn trọng, tránh thua lỗ</br>có sức đề kháng kém';
             }

             else if(outPutRule == 13)
             {
                titlepa =  'Nốt ruồi số 13';
                contentPa = 'Làm ăn xa sẽ rất dễ thành công<br>Nhưng, Vợ chồng hay xảy ra mâu thuẫn ';
             }

             else if(outPutRule == 131)
             {
                titlepa =  'Nốt ruồi số 13';
                contentPa = 'Người có nốt ruồi ở vị trí này là người biết lắng nghe, ngoan ngoãn, hiền lành</br>Nhưng Chuyện tình duyên hay lận đận';
             }
             else if(outPutRule == 14)
             {
                titlepa =  'Nốt ruồi số 14';
                contentPa = 'Hay can thiệp vào chuyện của người khác</br>Gặp nhiều chuyện bất lợi đưa tới';
             }
             else if(outPutRule == 15)
             {
                titlepa =  'Nốt ruồi số 15';
                contentPa = 'Là người hay nóng giận, khó kiềm chế cảm xúc';
             }

             else if(outPutRule == 16)
             {
                titlepa =  'Nốt ruồi số 16';
                contentPa = 'Thường suy nghĩ nông nổi';
             }
             else if(outPutRule == 17)
             {
                titlepa =  'Nốt ruồi số 17';
                contentPa = 'Là người có tham vọng lớn';
             }
             else if(outPutRule == 18)
             {
                titlepa =  'Nốt ruồi số 18';
                contentPa = 'Là người tốt bụng, hay giúp đỡ người khác<br/>Hay giúp đỡ mọi người xung quanh, có tấm lòng nhân hậu</br>Nhưng Đường con cái không được mấy thuận lợi, gặp nhiều khó khăn ';
             }
             else if(outPutRule == 19)
             {
                titlepa =  'Nốt ruồi số 19';
                contentPa = 'Là người có ý chí, khát vọng lớn <br/>Nhưng Thường suy nghĩ nông nổi ';
             }
             else if(outPutRule == 20)
             {
                titlepa =  'Nốt ruồi số 20';
                contentPa = 'Có  nhiều cơ hội thăng tiến trong sự nghiệp </br>Là người thông minh, nhanh nhạy</br>Nhưng thường dễ nản lòng khi gặp khó khăn</br>Là người không chịu được nhiều áp lực, đặc biệt là trong công việc</br>Là người sống tình cảm, lãng mạn</br> ';
             }

             else if(outPutRule == 23)
             {
                titlepa =  'Nốt ruồi số 23';
                contentPa = 'Hay xảy ra xung khắc với cha, phải lập nghiệp xa quê mới có được thành tựu </br> Là người tự lập, tự chủ về tài chính, biết cách quản lý chi tiêu';
             }
             else if(outPutRule == 24)
             {
                titlepa =  'Nốt ruồi số 24';
                contentPa = 'Gặp được nhiều may mắn </br> Cuộc sống hạnh phúc, không phải lo nghĩ về tiền bạc </br> Nốt ruồi trên mặt ở vị trí 37 cho biết bạn là người hay nổi nóng, không kiềm chế được bản thân  ';
             }

             else if(outPutRule == 21)
             {
                titlepa =  'Nốt ruồi số 21';
                contentPa = 'Hay vướng vào các chuyện thị phi không đáng có </br> Chú ý đến việc đi lại, nên cẩn trọng';
             }
             else if(outPutRule == 22)
             {
                titlepa =  'Nốt ruồi số 22';
                contentPa = 'Là một người rất chung thủy, yêu thương gia đình</br> Nhưng hay nóng giận, khó kiềm chế cảm xúc ';
             }

             if(titlepa != '')
             {
              var template = '<div class="center-div"> \
              <p class="title-description-content">' +titlepa  +' </p>\
              <p class="content-paragraph">Nội dung: </br> <strong>'+contentPa+' </strong></p></div>';
 
              htmlElement2 += template;
             }
            
          
            
          });
          
          setTimeout(() => {
            console.log(htmlElement2);

             document.getElementById("xemtuongResult").innerHTML += htmlElement2;
          }, 200);
      //   $("#xemtuongResult").html(htmlElement2);
       
          
});

function checknumber12(skinMole,faceArea )
{
    console.log("1",skinMole);
    console.log("2",faceArea);


  var isConditionX = (faceArea.left + ratex*2.2 <= skinMole.left
      &&  skinMole.left <= faceArea.left + ratex*3 );
    
      if( isConditionX ==false)
  {
      return -1;
  }
  


  var isConditionY = (faceArea.top -ratey   <= skinMole.top
                      && skinMole.top  <= faceArea.top +  ratey/3 );
 
            
  if( isConditionY ==false)
  {
      return -1;
  }

  if(skinMole.top <= faceArea.top -ratey/2.2 )
  {
      return 1;
  }
  else if(skinMole.top <= faceArea.top )
  {
  
    
     return  2;
  }
  else 
  {
   
     return 2;

  }


}

function checknumber34(skinMole,faceArea )
{

  var isConditionY = (faceArea.top -ratey   <= skinMole.top  &&  skinMole.top  <= faceArea.top-ratey/4 );
  
  if( isConditionY ==false)
  {
    return -1;
  }
  

  var isConditionX = (faceArea.left +ratex*5/2 <= skinMole.left
  && skinMole.left <= faceArea.left +ratex*5  );

  if( isConditionX ==false)
  {
      return -1;
  }
      //2,4
  if(skinMole.left <= faceArea.left +ratex*3.65 )
  {
      return 3;
  }
   //6,8,10
  else 
  {
      return 4;


  }
  return false;
}

function checknumber56(skinMole,faceArea )
{
  
var isConditionY = (faceArea.top -ratey   <= skinMole.top 
&& skinMole.top  <= faceArea.top-ratey/6 );

if( isConditionY ==false)
{
return -1;
}
var isConditionX = (skinMole.left   <= faceArea.left + ratex + ratex/3 );

if( isConditionX ==true)
{
    return 6 ;
}

else return 5;
  
 
}
//check
function checknumber78(skinMole,faceArea )
{
    var isConditionY = (faceArea.top <= skinMole.top 
        && skinMole.top  <= faceArea.top + ratey/2*0.9 );
    

        if( isConditionY ==false)
    {
        return -1;
    }
    
  
  if(skinMole.left <= faceArea.left +ratex*1.1 )
  {
    return 8;
  }
  else if( skinMole.left <= faceArea.left +ratex*2.1   )
  {
    return 7;
  }
   return -1;

 
}

//check
function checknumber78dowm(skinMole,faceArea )
{
    var isConditionY = (faceArea.top + ratey/2*0.9  < skinMole.top 
     && skinMole.top  <=  faceArea.top + ratey/2*0.9 + ratey/3);
    if( isConditionY ==false)
    {
        return -1;
    }

    
  
  if(skinMole.left <= faceArea.left +ratex*1.3 )
  {
    return 81;
  }
  else if( skinMole.left <= faceArea.left +ratex*2.1   )
  {
    return 71;
  }
   return -1;

 
}



function checknumber910(skinMole,faceArea )
{
    var isConditionY = (faceArea.top <= skinMole.top 
        && skinMole.top  <= faceArea.top + ratey/3 );
    

        if( isConditionY ==false)
    {
        return -1;
    }
    
    
  
  if(skinMole.left >= faceArea.left +ratex*3.7 )
  {
    return 10;
  }
  else if( skinMole.left >= faceArea.left +ratex*3 )
  {
    return 9;
  }
   return -1;

 
}

function checknumber1112dowm(skinMole,faceArea )
{
    
    
    var isConditionY = (faceArea.top + ratey/3  < skinMole.top 
     && skinMole.top  <=  faceArea.top + ratey/2*0.9 + ratey/3);
   
     if( isConditionY ==false)
    {
        return -1;
    }
   
    
  
    if(skinMole.left >= faceArea.left +ratex*3.7 )
    {
      return 12;
    }
    else if( skinMole.left >= faceArea.left +ratex*3 )
    {
      return 11;
    }
     return -1;
 

 
}


function checknumber13(skinMole,faceArea )
{
    var isConditionx = (faceArea.left + ratex*2.2   < skinMole.left
        && skinMole.left <= faceArea.left +ratex*3);
    if(isConditionx ==false)
    {
        return -1;
    }

    
    if(faceArea.top < skinMole.top  &&  skinMole.top <= faceArea.top+ ratey/2+ ratey/6)
    { 
     
  
        return 13;
    }
    else if( skinMole.top < faceArea.top +ratey + ratey/6)
    {  
        return 131;
    }
     return -1;
 

 
}



function checknumber1415(skinMole,faceArea )
{

    var isConditionx = (faceArea.left + ratex*2   < skinMole.left
        && skinMole.left <= faceArea.left +ratex*3-ratex/3);
       
  
    if(isConditionx ==true)
    {
    
      if(skinMole.top <= faceArea.top+ ratey*3/2 &&  skinMole.top >  faceArea.top +ratey*3/2 - ratey/2  )
      { 
        return 14;
      }
      else 
      {
        return -1;
      }
    }
    else 
    {

    
      isConditionx = (faceArea.left + ratex*2 -ratex/2  < skinMole.left
        && skinMole.left <= faceArea.left +ratex*2.5);
        
        if(isConditionx)
        {
          if(skinMole.top <= faceArea.top + ratey + ratey/3   &&  skinMole.top >= faceArea.top + ratey +ratey/6  )
          {
            return  15;
          }
          
        }
    
    }

  
     return -1;
 

 
}
function checknumber1617(skinMole,faceArea )
{
    return -1;
   var isConditionx = (faceArea.left + ratex*2   < skinMole.left
        && skinMole.left <= faceArea.left +ratex*3-ratex/2-ratex/7 );
       
  
    if(isConditionx ==true)
    {
    
      if(  faceArea.top+ ratey*3/2 <= skinMole.top  &&  skinMole.top <=  faceArea.top +ratey*2 - ratey/6  )
      { 
        return 16;
      }
      else 
      {
        return -1;
      }
    }
    else 
    {

    
      isConditionx = (faceArea.left + ratex*3   < skinMole.left
        && skinMole.left <= faceArea.left +ratex*4+ratex/3);
        

        if(isConditionx)
        {
          if(skinMole.top <= faceArea.top + ratey + ratey/2   &&  skinMole.top >= faceArea.top + ratey + ratey/3  )
          {
            return  15;
          }
          
        }
    
    }

  
     return -1;
 

 
}



function checknumber2324(skinMole,faceArea )
{
    

   var isConditionx = (faceArea.left < skinMole.left &&  skinMole.left <= faceArea.left + ratex*1 + ratex/2 -ratex/6 );

       
  
    if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/6  <=  skinMole.top &&  faceArea.top + ratey +ratey/2-ratey/5  )
      { 
        return 24;
      }
      
    }
    isConditionx = (faceArea.left + ratex/3   < skinMole.left
      && skinMole.left <= faceArea.left + ratex*2 +ratex/6);
      

      if(isConditionx)
      {
        if( faceArea.top + ratey/2  <= skinMole.top 
        
        && skinMole.top  <= faceArea.top + ratey + ratey/6  )
        {
          return  23;
        }
        
      }

  
     return -1;
 

 
}

function checknumber2122(skinMole,faceArea )
{

   var isConditionx = (
     faceArea.left + ratex*2.7 + ratex/7 < skinMole.left 
      &&  skinMole.left<= faceArea.left + ratex*4.75 );
   if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/4 >=  skinMole.top &&
      skinMole.top >=  faceArea.top + ratey  -ratey/3  )
      { 
        return 21;
      }
      
    }
    isConditionx = ( 
    faceArea.left + ratex*2.9 + ratex/7 < skinMole.left 
    &&  skinMole.left<= faceArea.left + ratex*4.5
    );
      

      if(isConditionx)
      {
        if(  faceArea.top + ratey + ratey/2 +ratex/7  >=  skinMole.top &&
        skinMole.top >=  faceArea.top + ratey +ratey/4   )
        {
          return  22;
        }
        
      }

  
     return -1;
 

 
}

function checknumber18(skinMole,faceArea )
{
  
   var isConditionx = (
     faceArea.left + ratex*2.5 - ratex/7 < skinMole.left 
      &&  skinMole.left<= faceArea.left + ratex*2.5 +ratex/7 );
   if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/2 <=  skinMole.top &&
      skinMole.top <=  faceArea.top + ratey *1.82  )
      { 
        return 18;
      }
      
    }
   
     return -1;
 

 
}

function checknumber20(skinMole,faceArea )
{
  
   var isConditionx = (
     faceArea.left + ratex*2.5 + ratex/7 -1 < skinMole.left 
      &&  skinMole.left<= faceArea.left + ratex*4 -ratex/7 );
   if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/2- ratey/7.6 <=  skinMole.top &&
      skinMole.top <=  faceArea.top + ratey *1.7  )
      { 
        return 20;
      }
      
    }
   
     return -1;
 

 
}
function checknumber19(skinMole,faceArea )
{
   var isConditionx = (
     faceArea.left + ratex*2.5 - ratex/6 -1> skinMole.left 
      &&  skinMole.left<= faceArea.left + ratex*1.7 );
   if(isConditionx ==true)
    {
    
      if( faceArea.top + ratey + ratey/2- ratey/5 <=  skinMole.top &&
      skinMole.top <=  faceArea.top + ratey *2  )
      { 
        return 20;
      }
      
    }
   
     return -1;
 

 
}



function reDrawInfomation() {
 
 var objectInformation = objectReponse;

 var faceData = objectReponse.facedata;
 var imageInfo = faceData.image_info;
 $("#imageResult").attr("src",imageInfo.url);

var generalResult  = faceData.generalResult;
var specialResult = faceData.specialResult;


drawContentTongQuan(faceData.generalResult);
drawContentKetLuanTungPhan(faceData.specialResult);

drawContentTuVanTongQuat(faceData.generalConclusion);

// drawContentketLuanChiTiet(faceData.specialConclusion);
return;
// drawContent(generalResult);
// drawContent(specialResult);
// drawContentDetail(faceData.specialConclusion);
// drawContentDetail1(faceData.generalConclusion);

}

function drawContentTuVanTongQuat(generalResult )
{

return;
var index =0;
generalResult.data.forEach((ketquatongquanItem) => {

index ++;

if( index%2 == 0)
{
var html= '<div class="description-tuvan"> \
\
<div class="content-tuvan">\
<h6>'+ketquatongquanItem.title+'</h6>\
\
<ul>';

html  +=   '<li class="content-paragraph">'+ketquatongquanItem.valueVI+'</li>';

  
html+= '</ul>\
</div>\
<div class="image-demo"> \
  <img src ="/images/86336.png"></div></div>';
$("#idtuvantongquan").append(html);

}
else 
{
var html= ' <div class="description-tuvan column-second"> \
\
<div class="image-demo"> \
   <img src ="/images/86336.png"> \
</div>\
<div class="content-tuvan">\
<h6>'+ketquatongquanItem.title+'</h6>\
\
<ul>';



html  +=   '<li class="content-paragraph">'+ketquatongquanItem.valueVI+'</li>';

   
html += '</ul>\
</div>\
\
</div>';
$("#idtuvantongquan").append(html);
}

});


}

function drawContentTongQuan(generalResult )
{


var index =0;
generalResult.data.forEach((ketquatongquanItem) => {
  if(ketquatongquanItem.title.vi =="Nhận diện tông màu da")
          {
            ketquatongquanItem.title.vi  =  "Nhận diện tone màu da";
          }

 if( ketquatongquanItem.title.vi != "Nhận diện tuổi da" && 
 
 ketquatongquanItem.title.vi != "Nhận diện nốt ruồi"
 ) 
 {
     return;
  
 }

index ++;
if(index >2)
{
index =1;
}
var html= '<div class="record-content">\
<div class="record-content-tab">\
 <div class="image">\
     <img src="/images/face'+index+'.png">\
\
 </div>\
 <div class="description">';

 if( ketquatongquanItem.title.vi == "Nhận diện tuổi da")
 {
   html += '<div class="description-content" id ="xemtuongResult">\
   <div class="center-div">';
 }
 else 
  {
   html += '<div class="description-content">\
   <div class="center-div">';
  }
     
         
         if( ketquatongquanItem.title.vi == "Nhận diện tuổi da")
         {
           // html += '<p class="title-description-content"> '+ 'Nốt ruồi số 1 ' + ' </p>';
           // html  +=   '<p class="content-paragraph">' +'Nội dung: '+ '<strong>'+'Người sở hữu nốt ruồi ở vị trí này là người có số khắc cha mẹ, hay xảy ra mâu thuẫn, cuộc sống đều phải tự thân vận động mới có'+' </strong>' +'</p>';
         }
         
         else {
           html += '<p class="title-description-content"> '+ ketquatongquanItem.title.vi + ' </p>';
        
           var dataList = ketquatongquanItem.data;
           dataList.forEach(function (item, index) {
             var tempValue = item.valueVI;
          
             if(item.valueVI.includes("29"))
             {
               
               tempValue = tempValue.replace("29","30")
             }
            
              var templateText = tempValue.split(":");
              var tile1 = templateText[0]+":";
              var tile2 = templateText[1];
             
              html  +=   '<p class="content-paragraph">'+tile1 + '<strong>'+tile2+' </strong>' +'</p>';
            });
          
         }
        
        
        html+= '</div>\
     </div>\
 </div>\
</div>\
</div>';
$("#idGeneralResult").append(html);
});


}

function isNumeric(n) {
return !isNaN(parseFloat(n)) && isFinite(n);
}


function drawContentKetLuanTungPhan(ketLuanTungPhan )
{
 return;

let dataFace = objectReponse.faceAttitude;


let indexDraw =0;
ketLuanTungPhan.data.forEach((ketLuanTungPhanItem) => {
indexDraw ++;
let dataDrawFace  = " https://applamdep.com/images/image1.png";
https://applamdep.com/images/image1.png
if(dataFace)
{
switch(indexDraw) {
case 1:

  dataDrawFace = dataFace.faceLeft;
  // code block
  break;
case 2:
  dataDrawFace = dataFace.faceRight;
  // code block
  break;

  case 3:
    dataDrawFace = dataFace.eyeRight;
    // code block
    break;
    case 4:
      dataDrawFace = dataFace.faceRightOriginal;
      // code block
      break;

      case 5:
        dataDrawFace = dataFace.faceLeftOriginal;
        // code block
        break;

  default:
    dataDrawFace = dataFace.faceLeftOriginal;
       break;
  // code block
}
}
else 
{

}


var html= ' <div class="result-item"> \
<div class="avatar-image">\
\
<img src="'+dataDrawFace+'">\
\
</div>\
\
<div class="content-description">\
<span class="title-bold"> \
  ' + ketLuanTungPhanItem.title.vi+ '\
</span>\
\
<ul>';

var dataList = ketLuanTungPhanItem.data;
dataList.forEach(function (item, index) {

const arr = item.valueVI.split(':');
var value = arr[1];

;        if(isNumeric(value))
{
   value =  Math.round(value * 100) / 100

  
}
if((value+'').endsWith("%"))
{
    value =  value.replace('%','').trim();
   

    if(isNumeric(value))
    {
       value =  Math.round(value * 100) / 100;
       value = '' +value + '%';

      
    }
  

}
 html  +=   '<li class="content-paragraph">'+"<span>" + arr[0]+":"  +"<strong class='boldText'>"+value+" </strong>" + "</span>"+'</li>';
});

html+=          '</ul></div></div> ';
$("#danhsachketquatungphan").append(html);
});


}

function drawContent(input) {

var htmlTemplage = '<fieldset class="fldset-class">\
<legend class="legend-class">'+input.title.vi+'</legend>';
var dataDraw = input.data;
dataDraw.forEach(element => {
htmlTemplage +='<ul class="recordRecived">';
var title = element.title.vi;
var description = element.descript.vi;

var dataChilds = element.data;
htmlTemplage+= ' <li>  '+ title + '  </li>';
dataChilds.forEach(itemChild => {
    var text = itemChild.valueVI;
    htmlTemplage+= ' <li>  '+ text + '  </li>';
    
});
htmlTemplage +='</ul>';

});
htmlTemplage+= ' </fieldset>';

$("#contentResult").append(htmlTemplage);
}


function drawContentDetail(input) {

var htmlTemplage = '<fieldset class="fldset-class">\
<legend class="legend-class">'+input.title.vi+'</legend>';
var dataDraw = input.data;
dataDraw.forEach(element => {

element.forEach( eleteDetail => {
    htmlTemplage +='<ul class="recordRecived">';

    var title = eleteDetail.title.vi;
    // var description = eleteDetail.descript.vi;

    var dataChilds = eleteDetail.data;
    htmlTemplage+= ' <li>  '+ title + '  </li>';
    // dataChilds.forEach(itemChild => {
    //     var text = itemChild.valueVI;
    //     htmlTemplage+= ' <li>  '+ text + '  </li>';
        
    // });
    var text = dataChilds.vi;
    htmlTemplage+= ' <li>  '+ text + '  </li>';
    htmlTemplage +='</ul>';
});

});
htmlTemplage+= ' </fieldset>';

$("#contentResult").append(htmlTemplage);
}

function drawContentDetail1(input) {

var htmlTemplage = '<fieldset class="fldset-class">\
<legend class="legend-class">'+input.title.vi+'</legend>';
var dataDraw = input.data;
htmlTemplage +='<ul class="recordRecived">';

dataDraw.forEach(element => {

   
    var title = element.title;
    // var description = eleteDetail.descript.vi;

    var dataChilds = element.valueVI;
    if(title)
    {
        htmlTemplage+= ' <li class ="bold-text">  '+ title + '  </li>';
    }
  
    // dataChilds.forEach(itemChild => {
    //     var text = itemChild.valueVI;
    //     htmlTemplage+= ' <li>  '+ text + '  </li>';
        
    // });
    var text = dataChilds;
    htmlTemplage+= ' <li>  '+ text + '  </li>';
 

});
htmlTemplage +='</ul>'; 
htmlTemplage+= ' </fieldset>';

$("#contentResult").append(htmlTemplage);
}

function drawRecomendProduct ( ) {

var dataUser =  sessionStorage.getItem("dataUser");
var objectreponse = JSON.parse(dataUser);


$.ajax({
url: api.baser_url + ""+ api.a,
type: "post",
headers: {
    Authorization: 'Bearer '+objectReponse.token
},
data: {
    "name": $("#txtname").val(),
    "email": "",
    "phone": $("#phoneNumber").val(),
    "Address": $("#address").val(),
    "Company_Id": "6134e13410bfea17bff4000d",
    "username": globalUser.username,
} ,
 success: function (response) {
       if(response.is_success)
    {
    
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Cập nhật thành công',
            showConfirmButton: false,
            timer: 1000
        })

    }
    else
    {
        Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Cập nhật thất bại',
            showConfirmButton: false,
            timer: 1000
        })

    }
},
error: function(jqXHR, textStatus, errorThrown) {
   
}
});

}


function drawProduction(dataRequest) {

var company =null  ;

if (sessionStorage.getItem("dataCompany") === null) {

  company = companyIdGlobal;
}
else 
{
  company = JSON.parse(sessionStorage.getItem("dataCompany"));
  company = company.company_data;



}


var bodyRequest = {

"company_id": company,
"result": dataRequest

};
$.ajax({
type: "POST",
url: "http://localhost:3002/itemSdk/get_product_result",
data: JSON.stringify(bodyRequest),
contentType: "application/json",
dataType: "json",
complete: function(data) {
 
     drawSuggessProduct(data.responseJSON);
},
});
}

function drawConcludeOverview(dataRequest) {

var company =null  ;





if (sessionStorage.getItem("dataCompany") === null) {

company = companyIdGlobal;
}
else 
{
company = JSON.parse(sessionStorage.getItem("dataCompany"));
company = company.company_data;
}

var bodyRequest = {

"company_id": company,
"result": dataRequest

};
$.ajax({
type: "POST",
url: "http://localhost:3002/api/paramenterRecomed/getAllCocludeOverView",
data: JSON.stringify(bodyRequest),
contentType: "application/json",
dataType: "json",
success:function(data)
{ 


drawConcludeOverviewItem(data.data.K5);
 drawConcludeOverviewItem(data.data.K6);
 drawConcludeOverviewItem(data.data.K7);
 drawConcludeOverviewItem(data.data.K8);
drawConcludeOverviewItem(data.data.K9);
}
});
}

var indexstt =1;

function drawConcludeOverviewItem (item) 
{

if(item)
{
for (var i = 0; i < item.length; i++) {


  var itemIndex = item[i];
  var tilte = itemIndex.Title;
  var des = itemIndex.Content;

  var level = itemIndex.Level;

  var iconImage = itemIndex.Icon;
  var htmltemplate ='\
  <div class="description-tuvan">   <div class="content-tuvan">      <h6>'+''+indexstt +'. '+ tilte +'</h6>        <ul><li class="content-paragraph">'+des+'</li></ul>   </div>   <div class="image-demo">           <img src="'+iconImage+'"></div></div>\
  ';
  if(indexstt %2 !=0)
  {
    htmltemplate =  '<div class="description-tuvan column-second">  <div class="image-demo">            <img src="'+iconImage+'">     </div>    <div class="content-tuvan">       <h6>'+''+indexstt +'. '+tilte+'</h6>       <ul><li class="content-paragraph">'+ des+'</li></ul>    </div>    </div>';
  }
  indexstt ++;

  $("#idtuvantongquan").append(htmltemplate);

}
}
}

function drawConcludeDetail(dataRequest) {

 for (var i = 0; i < dataRequest.length; i++)
 {
     var item = dataRequest[i];
   
     var groupK = item['level'];
     if(groupK < "K5") 
        continue;
     var valueGroupK = item['sdktype'];
     drawConcludev2( groupK, valueGroupK, item);
 }

return;
if (sessionStorage.getItem("dataCompany") === null) {

company = companyIdGlobal;
}
else 
{
company = JSON.parse(sessionStorage.getItem("dataCompany"));
company = company.company_data;
}

var bodyRequest = {

"company_id": company,
"result": dataRequest

};
$.ajax({
type: "POST",
url: "http://localhost:3002/api/paramenterRecomed/getAllCocludeDetail",
data: JSON.stringify(bodyRequest),
contentType: "application/json",
dataType: "json",
success:function(data)
{
drawConclude(data.data.K5);
drawConclude(data.data.K6);
drawConclude(data.data.K7);
drawConclude(data.data.K8);
drawConclude(data.data.K9);
}
});
}

function drawConcludeOverview( dataRequest)
{

 for (var i = 0; i < dataRequest.length; i++)
 {
   var item = dataRequest[i];
     var groupK = item['level'];
     if(groupK < "K5") 
        continue;
     var valueGroupK = item['sdktype'];
     drawConcludeOverview2( groupK, valueGroupK, item);

     
   
 }
}


function drawConcludeOverview2 ( groupk, valuek, item) 
{
 var tilte = "";
 var des = "";
 
 var text = "Mức độ nhẹ";
 var valueRel =  item['avg'];
 if( typeof(valueRel) =="undefined")
 {
   return;
 }

 if(  valueRel < 1)
 {
   valuek = 1;
 }
 else if( valueRel < 2)
 {
   valuek = 2;
 }
 else if( valueRel < 3)
 {
   valuek = 3;
 }

 if(valuek >3)
   valuek = 3;
   
   valuek=  valuek+'';


 
   switch(groupk) {
     case "K5":
       tilte = "Lão hoá da";

       switch (valuek) {
         case  "1":
           des = 'Đầu tiên, hãy chống nắng cho làn da thật kỹ nhé. <br>Sau đó, hãy cung cấp độ ẩm cho làn da mỗi ngày bằng collagen, Hyaluronic acid… <br>Đừng quên làm sạch da nhẹ nhàng và thật kỹ.';
           break;
         case "2":
           des = 'Khi da bắt đầu ở giai đoạn lão hoá này, bạn hãy kiên nhẫn chăm sóc làn da mỗi ngày bằng cách sử dụng các sản phẩm đặc trị có chứa vitamin C, Retinoids, AHA, BHA Collagen, Hyaluronic Acid, Ceramide..<br> Đừng quên chống nắng là bước quan trong nhất dành cho làm da bạn nhé. <br>Ngoài ra, Massage cơ mặt, 1 tinh thần lạc quan và 1 chế độ ăn uống hợp lý sẽ giúp bạn chăm sóc da lão hoá hiệu quả hơn.';
           break;
         case "3":
           des = 'Ở mức độ này, Bạn cần có một liệu trình chăm sóc và điều trị thật nghiêm túc nhé.<br> Sử dụng những công nghệ cao tại các Spa có chuyên môn sẽ giúp bạn của thiện nhanh chóng hơn, <br>Bên cạnh đó, hãy cung cấp cho làn da các thành phần cần thiết như vitamin C, Retinoids, AHA, BHA Collagen, Hyaluronic Acid, Ceramide Đừng quên làm sạch da nhẹ nhàng và chống nắng mỗi ngày.';
           break;
         default:
           
           break;
       }
       break;

     case "K6":
       tilte = "Mụn và mụn viêm đỏ";
       switch (valuek) {
         case  "1":
           des = 'Hãy làm sạch da 2 lần/ngày, Đối với những nốt mụn viêm hãy sử dụng những sản phẩm có chứa có các thành phần như ﻿Hydroxy Complex có chứa các hợp chất tẩy tế bào chết có hiệu quả cao - Glycolic Acid, Salicylic Acid và Polyhydroxy Acid - giúp tái tạo làn da, thông thoáng lỗ chân lông, giảm vi khuẩn, loại bỏ tế bào da chết và ngăn ngừa mụn mới xuất hiện.';
           break;
         case "2":
           des = 'Làm sạch da bằng nước tẩy trang và sửa rửa mặt dịu nhẹ ít bọt. Chọn một sản phẩm điều trị có thể kiểm soát được nhận mụn và giảm thâm . Và cuối cùng cấp đủ độ ẩm cho da , chống nắng kĩ càng hạn chế việc các vết mụn nặng hơn . <br>Rửa mặt làm sạch da nhẹ nhàng nhưng hiệu quả loại bỏ bẩn, cặn trang điểm và chất bả nhờn dư thừa trên da. Giữ làn da cảm giác sạch , tươi mát và mềm mại.';
           break;
         case "3":
           des = 'Ngưng các hoạt chất điều trị, làm sạch da 2 lần/ngày , và đến bác sĩ da liễu tư vấn để kê toa điều trị tốt nhất. <br>Phải thật cân nhắc khi sử dụng các sản phẩm có chứa corticoid.';
           break;
         default:
           
           break;
       }
       break;
     case "K7":
       tilte ="Quầng thâm mắt";
       switch (valuek) {
         case  "1":
           des = 'Ngủ đủ giấc và massage mắt.';
           break;
         case "2":
           des = 'Bổ sung nhiều hơn vitamin A,C.. Sử dụng một số loại kem tăng cường collagen. Điều trị laser nếu thực sự cần thiết.';
           break;
         case "3":
           des = 'Sử dụng những loại kem đặc trị chứa các thành phần như Collagen, Acid Hyaluronic, Q10… Laser Filler.';
           break;
         default:
            break;
       }
       break;

     case "K8":
       tilte ="Lỗ chân lông";

       switch (valuek) {
         case  "1":
           des = 'Vệ sinh da thật kỹ nhé hạn chế gây bít tắc, hoặc vi khuẩn xâm nhập. Lưa chọn loại tẩy tế bào chết phù hợp Cung cấp độ ẩm cho da đều mỗi ngày.';
           break;
         case "2":
           des = 'Bị lỗ chân lông ở mức độ trung bình thì đầu tiên bạn phải tẩy trang kĩ càng đảm bảo là da mặt đã sạch bụi bẩn . Sau khi tẩy trang thì da mặt sẽ bị khô và mất nước bạn cần cung cấp độ ẩm cho da bằng các loại kem dưỡng , xịt khoáng để đám bảo là da mặt không bị qúa khô. Và bạn nên chống nắng thật kĩ trước khi ra ngoài để tránh tia UV và bổ sung thêm một số dưỡng chất như vitamin C có thể hỗ trợ dầu thừa và kết cấu da.';
           break;
         case "3":
           des = 'Da đang ở tình trạng lỗ chân lông vì thế việc ưu tiên của bạn chính là tẩy trang , rửa mặt đều đặn cho da. Và nhớ tẩy da chết đều đặn 2 lần / tuần giúp loại bỏ sạch sẽ bã nhờn trên da , nhớ cân bằng lại độ ph trên da sau khi làm sạch để da có đủ độ ẩm làm giảm thiểu tình trạng da bị khô mất nước bằng cách dùng nước cân bằng cho da và khóa ẩm bằng kem dưỡng ẩm hoặc xịt khoáng.';
           break;
         default:
           
           break;
       }
     break;

     case "K9":
       tilte ="Đốm thâm nám";
       switch (valuek) {
         case  "1":
           des = 'Luôn chống nắng bạn nhé. Bôi cách nhau 2 tiếng và sử dụng lượng kem vừa đủ. Luôn cấp ẩm để cân bằng dầu nước cho da. Tránh để làn da bị khô.';
           break;
         case "2":
           des = 'Làn da đang cần được chăm sóc kỹ hơn, Lựa chọn loại kem chống nắng phù hợp cho làn da. Các sản phẩm có những thành phần sau được ưu tiên Vitamin C, Retinoid, tyrosinase nên nó đóng vai trò như một chất ức chế cạnh tranh, hạn chế hình thành các tiền chất của melanin.';
           break;
         case "3":
           des = 'Sử dụng Laser, Peel da và dứoi sứ chăm sóc thật kỹ từ spa, Thẩm mỹ có chuyên môn để có kết quả nhanh hơn Bên cạnh đó phải luôn đảm bảo da được chống nắng đúng cách. Bổ sung cho làn da những loại kem có chứa cá thành phần như Arbutin, Glycolid acid, Hydroquynone.';
           break;
     
         default:
           
           break;
       }
       break;
     
     default:
       // code block
   }


  if(valuek ==2)
  {
      text = "Mức độ trung bình";
    
  }

  if(valuek >=3)
  {
      text = "Mức độ nặng";
    
  }


  if(valuek>3)
     valuek =3;

    var valueLevel = valuek*1 + 0.3;

    if(valueLevel >3)
     valueLevel = 3;
  var percentage =  Math.round((valueLevel /3) * 100);
  
  
  var htmlTemp = '<div class ="tuvantongquanItem"> \
  <p class ="titletvtq">'+ tilte + ': </p>\
  <p class ="paragraphText">'+des+ '</p> </div> ';
$("#idtuvantongquan").append(htmlTemp);

}

var sumScoreAvg  =0;

function drawConcludev2 ( groupk, valuek, item) 
{
 return;
 var tilte = "";
 var des = "";
 var valueRel =  item['avg'];
 if( typeof(valueRel) =="undefined")
 {
   return;
 }
 if(  valueRel<= 1)
 {
   valuek = 1;
 }
 else if( valueRel <= 2)
 {
   valuek = 2;
 }
 else if( valueRel <= 3)
 {
   valuek = 3;
 }
 var text = "Tốt";

   valuek=  valuek+'';
 


   switch(groupk) {
     case "K5":
       tilte = "Lão hoá da";

       switch (valuek) {
         case  "1":
           des = 'Làn da bạn đang ở mức độ lão hoá nhẹ. Ở một số vị trí, da của bạn bắt đầu khô hơn, không được căng đầy, có dấu hiệu xuất hiện các rãnh nhăn.';
           break;
         case "2":
           des = 'Làn da bạn đang ở mức độ lão hoá nhẹ. Ở một số vị trí, da của bạn bắt đầu khô hơn, không được căng đầy, có dấu hiệu xuất hiện các rãnh nhăn.';
           break;
         case "3":
           des = 'Làn da bạn đang ở mức độ lão hoá nhiều và cần được chăm sóc ngay. Các rãnh nhăn xuất hiện ở nhiều vị trí trên khuôn mặt. Da khô và mất tính đàn hồi ở một số điểm. Da không đều màu.';
           break;
         default:
           
           break;
       }
       break;

     case "K6":
       tilte = "Mụn và mụn viêm đỏ";
       switch (valuek) {
         case  "1":
           des = 'Mụn ở mức độ nhẹ. Số lượng mụn không nhiều, lượng dầu tiết trên da tương đối.';
           break;
         case "2":
           des = 'Mụn ở mức độ tương đối nhiều,làn da bạn cần được chăm sóc do Da bóng nhờn do lượng bã dầu tiết ra nhiều. Có thể lây sang những vùng da khác.';
           break;
         case "3":
           des = 'Mụn ở mức độ nặng. Da bạn đang tiết nhiều bã nhờn. Vi khuẩn Acne đang xuất hiện và tấn công các vùng da lân cận. Cần được thăm khám và điều trị đúng hoạt chất.';
           break;
         default:
           
           break;
       }
       break;
     case "K7":
       tilte ="Quầng thâm mắt";
       switch (valuek) {
         case  "1":
           des = 'Mắt bạn đang xuất hiện quầng thâm với mức độ nhẹ. Quanh vùng mắt có vẻ thiếu nước, và tối màu.';
           break;
         case "2":
           des = 'Vùng da quanh mắt tối màu đậm hơn, da không được căng, nhìn mất sức sống.';
           break;
         case "3":
           des = 'Bạn đang gặp vấn đề nặng về quầng thâm mắt. Vùng da quanh mắt tối màu, Xuất hiện rãnh nhăn. Cần được chăm sóc và điều trị để tươi trẻ hơn.';
           break;
         default:
            break;
       }
       break;

     case "K8":
       tilte ="Lỗ chân lông";

       switch (valuek) {
         case  "1":
           des = 'Lỗ chân lông của bạn ở mức độ không đáng lo ngại, Chỉ một số vị trí có lỗ chân lông hơi to, tương đối.';
           break;
         case "2":
           des = 'Lỗ chân lông ở mức độ trung bình, nhiều điểm trên khuôn mặt có lỗ chân lông, nhìn làn da chưa được mịn màng.';
           break;
         case "3":
           des = 'Lỗ chân lông ở mức độ báo động, da có nhiều lỗ chân lông to, nhìn da không được mịn màng.';
           break;
         default:
           
           break;
       }
     break;

     case "K9":
       tilte ="Đốm thâm nám";
       switch (valuek) {
         case  "1":
           des = 'Mức độ thâm/nám của bạn nhẹ, da chưa đồng đều màu. Có xuất hiện các điểm đậm màu trên bề mặt da.';
           break;
         case "2":
           des = 'Mức đô thâm/nám của bạn trung bình, đã xuất hiện nhiều điểm thâm/nám trên bề mặt và có khả năng dưới da đang xuất hiện nhiền melanin.';
           break;
         case "3":
           des = 'Mức độ thâm/nám của bạn khá nặng. Có rất nhiều điểm đậm màu trên làn da bạn và có dấu hiệu lan rộng hơn. Nhiều hơn melanin đang xuất hiện.';
           break;
     
         default:
           
           break;
       }
       break;
     
     default:
       // code block
   }


  if(valuek ==2)
  {
      text = "Bình thường";
    
  }

  if(valuek >=3)
  {
      text = "Có nhiều vấn đề về da";
    
  }


  if(valuek>3)
     valuek =3;

    var valueLevel1 = valueRel*1;

    if(valueLevel1 >3)
    valueLevel1 = 3;




 
  var percentage =  Math.round((valueLevel1/3) * 100);

  var valuerel2 =  Math.round(valueRel/3*10);

  var value23 = Math.round(10 - valuerel2);
  sumScoreAvg+= value23;

   percentage =  Math.round((value23/10) * 100);

  
  
  var htmlTemp = ' <div class="ConcludeItem"><p class ="paragraph-text-pa"> <span class ="bold-text-pa">'+tilte+': </span>\
<span class ="leveldegree"> '+text+' (Mức '+value23 +'/10) </span>\
  </p > \
  <div class="progress-bar-container">\
      <div class="progress-bar-indicator" style ="width: '+percentage+'%;" >\
      \
      </div> \
\
      <span class="tooltip-target">\
              <span class="tooltip-content" style =" left: calc('+percentage +'% - 35px);"><p class ="title-score"> Điểm của bạn</p><p class="titleScore2"> <span class ="score2">'+value23+'</span>/10</p> </span>\
      </span>\
  </div>\
  <div id="textbox">\
  <p class="alignleft">0</p>\
  <p class="aligncenter">Điểm trung bình</p>\
  <p class="alignright">10</p>\
  </div>\
  <div style="clear: both;"></div>\
   <div class="concludeDetalText" style="">\
   <span class="" style=" font-weight: bold; text-decoration: underline; ">Kết luận:</span>\
              <span class="description-text-1">\
              '+ des +' </span>\
               </div>\
               </div>';
$("#ConcludeItemArea").append(htmlTemp);

}



function drawConclude (item) 
{

if(item)
{


for (var i = 0; i < item.length; i++) {
var itemIndex = item[i];
  var tilte = itemIndex.Title;
  var des = itemIndex.Content;
  var text = "Tốt";
 

  var level = itemIndex.Level;

  if(level ==2)
  {
      text = "Bình thường";
    
  }

  if(level ==3)
  {
      text = "Có nhiều vấn đề về da";
    
  }


  if(level>3)
    level =3;

    var valueLevel = level*1 + 0.3;

    if(valueLevel >3)
    valueLevel = 3;
  var percentage =  Math.round((valueLevel /3) * 100);
  
  
  var htmlTemp = ' <div class="ConcludeItem"><p class ="paragraph-text-pa"> <span class ="bold-text-pa">'+tilte+': </span>\
<span> '+text+' (Mức '+level +'/3) </span>\
  </p > \
  <div class="progress-bar-container">\
      <div class="progress-bar-indicator" style ="width: '+percentage+'%;" >\
      \
      </div> \
\
      <span class="tooltip-target">\
              <span class="tooltip-content" style =" left: calc('+percentage +'% - 35px);"><p class ="title-score"> Điểm của bạn</p><p class="titleScore2"> <span class ="score2">'+valueLevel+'</span>/3</p> </span>\
      </span>\
  </div>\
  <div id="textbox">\
  <p class="alignleft">0</p>\
  <p class="aligncenter">Điểm trung bình</p>\
  <p class="alignright">3</p>\
  </div>\
  <div style="clear: both;"></div>\
   <div class="concludeDetalText" style="">\
   <span class="" style=" font-weight: bold; text-decoration: underline; ">Kết luận:</span>\
              <span class="description-text-1">\
              '+ des +' </span>\
               </div>\
               </div>';
$("#ConcludeItemArea").append(htmlTemp);

}
}
}


function drawSuggessProduct(listProduct) 
{


var dataProducts = listProduct.data;


dataProducts.forEach(groupProduct => {
var dataProducts = groupProduct[Object.keys(groupProduct)[0]];
var listDataProducts = dataProducts.list_product;

var htmlItem = '\
<div class="title-category"> \
\
<span>'+dataProducts.title+' </span>\
\
</div>\
<div class="product-list">';

listDataProducts.forEach(element => {

var pathImage = 'http://localhost:3002/public/image_plugin/' +'' +element.image_link +'';

var xhr = new XMLHttpRequest();
xhr.open('HEAD', pathImage, false);
xhr.send();

if (xhr.status == "404") {
htmlItem+=  '<div class="product-item1">\
\
<div class="image-avatar"> \
 <a href = "'+element.linkdetail+'">  <img src="/imageNo.jpg"></a>\
</div>\
<div class="content-product">\
    <div class="brand"><a href="'+element.linkdetail+'">'+element.title+'</a> </div>\
</div>\
\
</div>'; 
       

} else {
htmlItem+=  '<div class="product-item1">\
\
<div class="image-avatar"> \
<a href = "'+element.linkdetail+'"> <img src="'+pathImage+'"></a>\
</div>\
<div class="content-product">\
    <div class="brand"><a href="'+element.linkdetail+'">'+element.title+'</a> </div>\
</div>\
\
</div>'; 
       
}


 

});

htmlItem+= '</div>';
$("#list-product").append(htmlItem);            
   

});


// });
//  $("#formProductSuggestion").append(htmlTemplate);


$('.product-list').slick({
infinite: true,
slidesToShow:3,
initialSlide:0,
draggable:true,
mobileFirst:true,
speed:500,

arrows: false,
slidesToScroll:  1,
responsive: [
    {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ,
     {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  
  ]
});


}


function drawSuggessProduct1(listProduct) 
{


var dataProducts = listProduct.data;

var htmlTemplate ="";
dataProducts.forEach(groupProduct => {
var dataProducts = groupProduct[Object.keys(groupProduct)[0]];
htmlTemplate+= '<div class="row">\
<div class="titleProductRecomend">'+dataProducts.title+' </div>\
</div>';
htmlTemplate+='  <div class="dataProduct">';

   
     dataProducts.list_product.forEach(itemProduct =>  {

        htmlTemplate += '<div class="product-item">\
                        <div> \
                        <img\
                        src="http://localhost:3002/public/image_plugin/toner-Dashu-0x0.jpg"\
                        alt="">\
                        </div>\
                        <div class="product-title">\
                        <div> Nước Hoa Hồng Cho Nam Dashu Tăng Độ Ẩm Cho Da, Dưỡng Trắng Da 153ml\
                        </div>\
                        </div>\
                        </div>';
                      

            
      

     


      



    });


htmlTemplate+='  </div>';
htmlTemplate+='  </div>';


});
$("#formProductSuggestion").append(htmlTemplate);

$('.dataProduct').slick({
infinite: true,
slidesToShow:3,
initialSlide:0,
draggable:true,
mobileFirst:true,
speed:500,

arrows: false,
slidesToScroll:  1,
responsive: [
    {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ,
     {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  
  ]
});


}


function avgScore()
{
 return;
 var x = JSON.parse(sessionStorage._t);

 var dataSpeech =  x.data.facedata.generalConclusion.data;

 var ageITem = null;
 dataSpeech.forEach(element => {
     if(element.key =='SkinAge')
     {
       ageITem = element;
       return;
     }
 });
  var vulueAge = ageITem.value;

  var avgAge = 0;

  if( vulueAge <20)
  {
     avgAge =0;
  }
  else if(vulueAge <30 )
  {
   avgAge =1;
  }
  else if(vulueAge<40)
  {
   avgAge =2;
  }
  else 
  {
   avgAge =3;
  }

   var hintScore = x.data.facedata.hintResult;
   var sumAvg = 0;

   hintScore.forEach(item1 => {

     if(item1.sdktype < 5 )
     {
      
     }
     else 
     {
       sumAvg+=  item1.avg*1.0;
     }
     
   });

   let avgFinal = sumAvg;
   avgFinal = (sumAvg+avgAge)/6;
   
   var textDegree = "Ổn";
  
   if(avgFinal <1)
   {
     textDegree = "Ổn";
   }
   else if( avgFinal  <= 2 )
   {
     textDegree = "Bình thường";
   }
   else 
   {
     textDegree = "Có nhiều vấn đề về da";
   }
   let avgfinal2 = (sumScoreAvg/5);
   avgFinal = avgFinal/3*10;
   avgFinal = (10 - avgFinal);

   

  document.getElementById("score2").textContent =  ""+ parseFloat(avgfinal2).toFixed(1) +"/10";
   document.getElementById("scoreAvg").textContent = "   ( " + textDegree + " )" ;

  

}


function avgScorev2(dataDraw)
{
 var x =dataDraw.data;

 var dataSpeech =  x.facedata.generalResult.data;

 var ageITem = null;
 dataSpeech.forEach(element => {
   element.data.forEach(element => {
     if(element.key =='SkinAge')
     {
       ageITem = element;
       return;
     }
     });
   
 });
  var vulueAge = ageITem.value;

  var avgAge = 0;

  if( vulueAge <20)
  {
     avgAge =0;
  }
  else if(vulueAge <30 )
  {
   avgAge =1;
  }
  else if(vulueAge<40)
  {
   avgAge =2;
  }
  else 
  {
   avgAge =3;
  }

   var hintScore = x.facedata.hintResult;
   var sumAvg = 0;

   hintScore.forEach(item1 => {

     if(item1.sdktype < 5 )
     {
      
     }
     else 
     {
       sumAvg+=  item1.avg*1.0;
     }
     
   });

   let avgFinal = sumAvg;
   avgFinal = (sumAvg+avgAge)/6;
   if(avgFinal <1)
   {
     textDegree = "Ổn";
   }
   else if( avgFinal  <= 2 )
   {
     textDegree = "Bình thường";
   }
   else 
   {
     textDegree = "Có nhiều vấn đề về da";
   }
 
   
   avgFinal = avgFinal/3*10;


   let avgfinal2 = (sumScoreAvg/5);

   avgFinal = (10 - avgFinal);
                                                              
   document.getElementById("score2").textContent =  ""+ parseFloat(avgfinal2).toFixed(1) +"/10";
   document.getElementById("scoreAvg").textContent = "   ( " + textDegree + " )" ;

}


function readTextConclude()
{
 var x = JSON.parse(sessionStorage._t);
 var hintScore = x.data.facedata.hintResult;

   let text ='';
   let begintext ="";
   hintScore.forEach(item1 => {
     if(item1.sdktype*1.0 <5)
         return;
     let avg = item1.avg*1.0;
     let textDegree = "";
     let endpoint ="";
   
     if(avg <= 1 )
     {
       textDegree =" Tốt";
     }
     else if(avg <=2)
     {
       textDegree =" Bình thường";
     }
     else if(avg <=3)
     {
       textDegree =" Nặng";

     }

     var valuerel2 =  Math.round(avg/3*10);
     var value23 = Math.round(10 - valuerel2);

     endpoint= " " +value23 + " trên 10 ;";
 

     
     switch (item1.sdktype) {
       case "5":
              begintext+= "Bạn có dấu hiệu Lão Hóa Da tình trạng";
              break;
      
         case "6":
           begintext+= "Bạn có mụn và mụn viêm đỏ tình trạng ";
         break;
         case "7":
           begintext+= "Bạn có Quầng thâm mắt tình trạng ";
         break;
         case "8":
           begintext+= "Bạn có các vấn đề do lỗ chân lông tình trạng ";
         break;
         case "9":
           begintext+= "Bạn có Đốm thâm nám tình trạng ";
         break;
     
       default:
         break;
     }
     begintext+= ""+textDegree+""+endpoint;

   
   });
   let d = begintext;
   $.ajax({
     url: "https://api.fpt.ai/hmi/tts/v5?api_key",
     type: "post",
     contentType: "application/json",
     headers: {
          "api_key": "TcvP5klkJ5BZnVp4B9oZH52MOKDR7hn4",
          "voice": "banmai"
   
       },
     data: JSON.stringify(d),
     success: function (response) {
         
     
     
        setTimeout(() => {
      
        var  ourAudio = document.createElement('audio'); // Create a audio element using the DOM
         ourAudio.style.display = "none"; // Hide the audio element
         ourAudio.src = response.async;
         ourAudio.preload = "auto";
         ourAudio.autoplay = true; // Automatically play sound
         ourAudio.onended = function() {
           this.remove(); // Remove when played.
         };
         document.body.appendChild(ourAudio);
        }, 15000);
         
      
     },
     error: function (jqXHR, textStatus, errorThrown) {},
   })

 }
   
     


 

</script>



<div id ="socialBLock" class="actionToolbar_mobile toolbar_style_2  " style="
    display: none;
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
    font-size: 8px;
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
#socialBLock a:hover {
 opacity: 0.7;
 color: #ffffff;
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


