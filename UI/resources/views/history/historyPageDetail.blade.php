@extends('layout.layout')

@section('header')

<title>Lich sử soi da</title>
<meta name="theme-color" content="#d47690">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" />

<link rel="stylesheet" href="/css/tuvantongquan.css">
<link rel="stylesheet" href="/css/reponsive.css">

<link rel="preconnect" href="https://fonts.gstatic.com">

<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.5/dist/html2canvas.min.js"></script>

<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/main.css">


<link rel="stylesheet" href="/assets/css/bootstrap.min.css">
<link rel="stylesheet" href="/assets/aos/aos.css">
<link rel="stylesheet" href="/styles/skin_screening/index.css">
<link rel="stylesheet" href="/styles/skin_screening/responsive.css">

<!-- ASSETS CDN SLICK -->
<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<link rel="stylesheet" type="text/css"
    href=" https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<style>

</style>
@endsection
@section('contentpage')

<script>
    var slugGlobal = {!! json_encode($slug) !!};
   
</script>

<div id="alert-web">

</div>
<div id="b-placeholder">
    <div class="centerText recomendProduct">
        <p>
            LỊCH SỬ SOI DA
        </p>
        <img src="/images/step3.png">
    </div>

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
                <div class="ai-skin__result-checkContainer">
                    <div class="rowcolum1">
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

                    <div class="rowcolum1 column2">
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
                    Bây giờ hãy khám phá các <br>dấu hiệu lão hoá da của bạn một cách chi tiết

                </p>
            </div>

            <div class="resultNote">

                <p class="text-title-paragraph">

                    Thông tin tổng quan
                </p>
            </div>
            <div id="idGeneralResult">

                {{-- <div class="record-content">
                    <div class="record-content-tab">
                        <div class="image">
                            <img src="/images/face1.png">

                        </div>
                        <div class="description">

                            <div class="description-content">
                                <div class="center-div">

                                    <p class="title-description-content"> Tuổi da </p>

                                    <p class="content-paragraph"> Tuổi da vào khoảng 30</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="record-content">
                    <div class="record-content-tab">
                        <div class="image">
                            <img src="/images/tongquan-step2.png">

                        </div>
                        <div class="description">

                            <div class="description-content">
                                <div class="center-div">

                                    <p class="title-description-content"> Da kết hợp giữa khô và dầu </p>

                                    <p class="content-paragraph">Vùng da nhờn với các vùng da khô</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="record-content">
                    <div class="record-content-tab">
                        <div class="image">
                            <img src="/images/tongquan-step3.png">

                        </div>
                        <div class="description">

                            <div class="description-content">
                                <div class="center-div">

                                    <p class="title-description-content"> Nhận diện tone màu da </p>

                                    <p class="content-paragraph"> Màu sắc của da: Vàng</p>
                                    <p class="content-paragraph"> Độ sáng màu da: Ngăm đen</p>
                                    <p class="content-paragraph">Cấp độ bảng màu quốc tế: 96</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="record-content">
                    <div class="record-content-tab">
                        <div class="image">
                            <img src="/images/tongquan-step3.png">

                        </div>
                        <div class="description">

                            <div class="description-content">
                                <div class="center-div">

                                    <p class="title-description-content">Nốt ruồi </p>

                                    <p class="content-paragraph"> Số nốt ruồi 0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> --}}

            </div>



            <div class="poupupContainer">
                <div class="modalpopup">

                    <p class="maincontent">
                        Chúng tôi muốn bạn có thể dễ dàng nắm bắt mọi thông tin và hiểu hơn trước khi vào sâu chi tiết
                    </p>
                    {{-- <p class="descriptionContent">
                        Chúng tôi sẽ chia ra thành các thành phần trong phần tổng quan để bạn nắm rõ một số thứ trước
                        khi chúng ta vào các phần chi tiết, hãy đọc hết tất cả các thành phần tổng quan để rõ hơn nhé.
                    </p> --}}
                </div>
            </div>


            <div class="resultNote">

                <p class="text-title-paragraph">

                    Các vấn đề cần lưu ý nhất trên làn da
                </p>

                <p class="description">
                    Hiểu chi tiết hơn về làn da giúp bạn biết cách chăm sóc và có làn da tuyệt vời nhất
                </p>
            </div>




            <div class="result-list" id="danhsachketquatungphan">

                {{-- <div class="result-item">
                    <div class="avatar-image">

                        <img src="/images/ezgif.com-gif-maker.png">

                    </div>

                    <div class="content-description">
                        <span class="title-bold">
                            Các dấu hiệu lão hoá da
                        </span>

                        <ul>
                            <li> Nhăn đuôi mắt trái: Không </li>
                            <li> Nhăn đuôi mắt phải: Không </li>
                            <li> Kết quả phân tích nếp nhăn nông dưới mắt trái: 0.1419 % </li>
                            <li> Kết quả phân tích nếp nhăn nông dưới mắt phải: 0.1784 % </li>

                            <li> Nếp nhăn nông dưới mắt trái: Không </li>
                            <li> Nếp nhăn nông dưới mắt phải: Không </li>
                            <li>Nếp nhăn sâu dưới mắt trái: Không </li>
                            <li>Nếp nhăn sâu dưới mắt phải: Không </li>
                            <li>Nhăn trên trán: Không </li>
                            <li>Nhăn cánh mũi trái: Không </li>
                            <li>Nhăn cánh mũi phải: Không </li>

                        </ul>

                    </div>

                </div>

                <div class="result-item">
                    <div class="avatar-image">

                        <img src="/images/ezgif.com-gif-maker.png">

                    </div>

                    <div class="content-description">
                        <span class="title-bold">
                            Nhận diện mụn và mụn viêm đỏ:
                        </span>

                        <ul>
                            <li> Nhăn đuôi mắt trái: Không </li>
                            <li> Nhăn đuôi mắt phải: Không </li>
                            <li> Kết quả phân tích nếp nhăn nông dưới mắt trái: 0.1419 % </li>
                            <li> Kết quả phân tích nếp nhăn nông dưới mắt phải: 0.1784 % </li>

                            <li> Nếp nhăn nông dưới mắt trái: Không </li>
                            <li> Nếp nhăn nông dưới mắt phải: Không </li>
                            <li>Nếp nhăn sâu dưới mắt trái: Không </li>
                            <li>Nếp nhăn sâu dưới mắt phải: Không </li>
                            <li>Nhăn trên trán: Không </li>
                            <li>Nhăn cánh mũi trái: Không </li>
                            <li>Nhăn cánh mũi phải: Không </li>

                        </ul>

                    </div>

                </div>


                <div class="result-item">
                    <div class="avatar-image">

                        <img src="/images/ezgif.com-gif-maker.png">

                    </div>

                    <div class="content-description">
                        <span class="title-bold">
                            Nhận diện Đốm thâm nám và mụn viêm đỏ:
                        </span>

                        <ul>
                            <li> Nhăn đuôi mắt trái: Không </li>
                            <li> Nhăn đuôi mắt phải: Không </li>
                            <li> Kết quả phân tích nếp nhăn nông dưới mắt trái: 0.1419 % </li>
                            <li> Kết quả phân tích nếp nhăn nông dưới mắt phải: 0.1784 % </li>

                            <li> Nếp nhăn nông dưới mắt trái: Không </li>
                            <li> Nếp nhăn nông dưới mắt phải: Không </li>
                            <li>Nếp nhăn sâu dưới mắt trái: Không </li>
                            <li>Nếp nhăn sâu dưới mắt phải: Không </li>
                            <li>Nhăn trên trán: Không </li>
                            <li>Nhăn cánh mũi trái: Không </li>
                            <li>Nhăn cánh mũi phải: Không </li>

                        </ul>

                    </div>

                </div>


                <div class="result-item">
                    <div class="avatar-image">

                        <img src="/images/ezgif.com-gif-maker.png">

                    </div>

                    <div class="content-description">
                        <span class="title-bold">
                            Nhận diện các vấn đề do lỗ chân lông::
                        </span>

                        <ul>
                            <li> Nhăn đuôi mắt trái: Không </li>
                            <li> Nhăn đuôi mắt phải: Không </li>
                            <li> Kết quả phân tích nếp nhăn nông dưới mắt trái: 0.1419 % </li>
                            <li> Kết quả phân tích nếp nhăn nông dưới mắt phải: 0.1784 % </li>

                            <li> Nếp nhăn nông dưới mắt trái: Không </li>
                            <li> Nếp nhăn nông dưới mắt phải: Không </li>
                            <li>Nếp nhăn sâu dưới mắt trái: Không </li>
                            <li>Nếp nhăn sâu dưới mắt phải: Không </li>
                            <li>Nhăn trên trán: Không </li>
                            <li>Nhăn cánh mũi trái: Không </li>
                            <li>Nhăn cánh mũi phải: Không </li>

                        </ul>

                    </div>

                </div> --}}


            </div>


            <div class="title-overview">
                <div class="hcn">

                </div>
                <div class="title-larger">
                    Tư vấn tổng quát
                </div>

            </div>

            <div id="idtuvantongquan">


            </div>

            {{-- <div class="box-class-center" style="height:77px">
                <p>Với thói quen chăm sóc da phù hợp và thói quen lành mạnh, <br>
                    bạn có thể giúp làn da của mình khoẻ mạnh hơn </p>
            </div>
        </div> --}}

        {{-- <div class="description-tuvan">

            <div class="content-tuvan">
                <h6>Bảo vệ và chăm sóc</h6>

                <ul>
                    <li> Trang bị kem chống nắng tí nhất là SPF 35 hoặc cao hơn. </li>
                    <li> Hãy đội mũ trở thành một phần của quần áo và đồ thể thao hàng ngày của bạn, đồng thời đeo kính
                        râm để chống lại tia UV. </li>
                    <li>Chúng ta có thể giúp chống lại và thậm chí sửa chữa những tổn thương da hàng ngày bằng cách thoa
                        một loại huyết thanh chống oxy hoá như vitamin C</li>
                </ul>
            </div>
            <div class="image-demo">
                <img src="/images/86336.png">
            </div>

        </div> --}}

        {{-- <div class="description-tuvan column-second">


            <div class="image-demo">
                <img src="/images/86336.png">
            </div>
            <div class="content-tuvan">
                <h6>Thực hiện các lựa chọn lối sống lành mạnh khi có thể</h6>

                <ul>
                    <li>Ăn một chế độ ăn uống lành mạnh. </li>
                    <li> Giảm lượng đường. </li>
                    <li>Giữ đủ nước</li>
                    <li>Giảm uống rượu</li>
                    <li>Đừng hút thuốc </li>
                    <li>Tập thể dục </li>
                    <li>Nghỉ ngơi </li>
                    <li>Gỉảm căng thẳng </li>
                </ul>
            </div>

        </div>

        <div class="box-class-center" style="height:77px">
            <p>Với thói quen chăm sóc da phù hợp và thói quen lành mạnh, <br>
                bạn có thể giúp làn da của mình khoẻ mạnh hơn </p>
        </div>







    </div> --}}
</div>


{{-- <div class="sectionText ">

    <span>Sản phẩm phù hợp</span>
</div>

<div id="formProductSuggestion">


</div>
<div class=" banner1">
    <a href="javascript:void(0)" onclick="closePopup(this)">x</a>
    <img src="/assets/bannernew/1.png">

</div>

<div class=" sectionText">

    <span>Form đăng ký nhận thông tin quà tặng</span>
</div>

<div class="formReward" id="formContact">

    <form>
        <div class="form-row">
            <div class="col">
                <input type="text" class="form-control" placeholder="Họ và tên">
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Số điện thoại">
            </div>
        </div>



    </form>

    <div class="row">
        <div class="col-12 text-center">

            <button class="btn-countinue ai-skin__result-option ai-skin__result-bottom__download" id="btnreward"
                onclick="sendreward()">

                <i class="fas fa-award" style="
                        font-size: 20px;
                        "></i>
                Nhận quà
            </button>


            <button id="btnrewardLoading" style="display:none"
                class="btn btn-countinue ai-skin__result-option ai-skin__result-bottom__download" type="button"
                disabled="">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Đang gửi yêu cầu
            </button>

        </div>




    </div>

</div>


<div class="card custom-card-contact" id="result" style="display:none">
    <div style="
        text-align: center;
        padding: 20px;
        font-weight: 700;
        ">
        <h4 style="
        text-align: te;
        ">
            Chúng tôi đã nhận thông tin, bạn sẽ cơ hội nhận được quà tặng </h4>

    </div>
</div>



<div class="ai-skin__result-bottom">
    <button type="button" class="ai-skin__result-option ai-skin__result-bottom__download" onclick="saveImage()">
        <span>
            Lưu về máy
            <img data-src="contain/img/icons/download.svg" src="/img/icons/download.svg">
        </span>
    </button>


    <button type="button" class="ai-skin__result-option ai-skin__result-bottom__share" id="contact">
        <span>
            Liên hệ tư vấn
            <img data-src="contain/img/icons/share.svg" src="/img/icons/share.svg">
        </span>
    </button>
</div> --}}



<div class="content-plugin">
    {{-- <div class="title-page"> --}}
        {{-- <img src="/images/group79.png"> --}}
        {{-- <span> KẾT LUẬN CHI TIẾT </span>

    </div> --}}
    {{-- <div class="section-introduction">
        <div class="image-result">
            <img src="/images/tongquantitle.png">

        </div>
        <div class="content-result">
            <div class="content-result-border">
                <div>
                    <p>Kết luận chi tiết </p>
                    <p>Cấp độ 2</p>
                    <p> Nguyên nhân mụn đậu đen</p>
                    <p> Nguyên nhân mụn viêm</p>
                </div>

            </div>

        </div>

    </div> --}}
    <div class="title-overview">
        <div class="hcn">

        </div>
        <div class="title-larger">
            Kết luận chi tiết
        </div>

    </div>
    <div class="text-paragraph">
        <p> <strong>Cấp độ 2: </strong> Các vết mụn không viêm, các vùng sẩn, là những mụn đỏ rắn, nhỏ trên bề mặt da
        </p>

    </div>
    <div class="description-tuvan">

        <div class="content-tuvan">
            <h6>Nguyên nhân Mụn đầu đen</h6>

            <p>
                Mụn đầu đen xảy ra khi lỗ chân lông bị tắc do sự kết hợp của bã nhờn và tế bào da chết. Phần trên cùng
                của lỗ chân lông vẫn mở, mặc dù phần còn lại của nó bị tắc nghẽn. Điều này dẫn đến màu đen đặc trưng
                nhìn thấy trên bề mặt.

            </p>
        </div>
        <div class="image-demo">
            <img src="/images/klct1.png">
        </div>

    </div>

    <div class="description-tuvan column-second">


        <div class="image-demo">
            <img src="/images/klct2.png">
        </div>
        <div class="content-tuvan">
            <h6>Nguyên nhân mụn viêm</h6>

            <p>
                Mặc dù bã nhờn và tế bào da chết góp phần gây ra mụn viêm, vi khuẩn cũng có thể đóng một vai trò trong
                việc làm tắc nghẽn lỗ chân lông. Vi khuẩn có thể gây nhiễm trùng sâu bên dưới bề mặt da. Điều này có thể
                dẫn đến những nốt mụn sưng tấy và khó loại bỏ.

            </p>
        </div>

    </div>





</div>


</div>


<!-- <div class="banner3 " style="background-image: url('/assets/bannernew/2.png">


    </div> -->

<!-- FOOTER -->




<script>
    function openRecomendProduct()
        {
            if( slugGlobal == null)
                {
                    window.location.href = "/nhan-de-xuat-cham-soc-da";
                }
                else {
                    window.location.href = "/"+slugGlobal + "/nhan-de-xuat-cham-soc-da";
                }
        
        }

        function jsonPath(obj, expr, arg) {
            var P = {
                resultType: (arg && arg.resultType) || "VALUE",
                result: [],
                normalize: function (expr) {
                    var subx = [];
                    return expr
                        .replace(/[\['](\??\(.*?\))[\]']/g, function ($0, $1) {
                            return "[#" + (subx.push($1) - 1) + "]";
                        })
                        .replace(/'?\.'?|\['?/g, ";")
                        .replace(/;;;|;;/g, ";..;")
                        .replace(/;$|'?\]|'$/g, "")
                        .replace(/#([0-9]+)/g, function ($0, $1) {
                            return subx[$1];
                        });
                },
                asPath: function (path) {
                    var x = path.split(";"),
                        p = "$";
                    for (var i = 1, n = x.length; i < n; i++)
                        p += /^[0-9*]+$/.test(x[i]) ? "[" + x[i] + "]" : "['" + x[i] + "']";
                    return p;
                },
                store: function (p, v) {
                    if (p)
                        P.result[P.result.length] =
                            P.resultType == "PATH" ? P.asPath(p) : v;
                    return !!p;
                },
                trace: function (expr, val, path) {
                    if (expr) {
                        var x = expr.split(";"),
                            loc = x.shift();
                        x = x.join(";");
                        if (val && val.hasOwnProperty(loc))
                            P.trace(x, val[loc], path + ";" + loc);
                        else if (loc === "*")
                            P.walk(loc, x, val, path, function (m, l, x, v, p) {
                                P.trace(m + ";" + x, v, p);
                            });
                        else if (loc === "..") {
                            P.trace(x, val, path);
                            P.walk(loc, x, val, path, function (m, l, x, v, p) {
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
                            P.walk(loc, x, val, path, function (m, l, x, v, p) {
                                if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m))
                                    P.trace(m + ";" + x, v, p);
                            });
                        else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc))
                            // [start:end:step]  phyton slice syntax
                            P.slice(loc, x, val, path);
                    } else P.store(path, val);
                },
                walk: function (loc, expr, val, path, f) {
                    if (val instanceof Array) {
                        for (var i = 0, n = val.length; i < n; i++)
                            if (i in val) f(i, loc, expr, val, path);
                    } else if (typeof val === "object") {
                        for (var m in val)
                            if (val.hasOwnProperty(m)) f(m, loc, expr, val, path);
                    }
                },
                slice: function (loc, expr, val, path) {
                    if (val instanceof Array) {
                        var len = val.length,
                            start = 0,
                            end = len,
                            step = 1;
                        loc.replace(
                            /^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g,
                            function ($0, $1, $2, $3) {
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
                eval: function (x, _v, _vname) {
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
    var resultModule = (function () {
            const IMAGE_INFO_SELECTOR = "$.data.facedata.['image_info']";
            const SKIN_SPOT_SELECTOR =
                "$.data.facedata.specialResult.data[*].data[?(@.key == 'SkinSpot')]";
            const SKIN_ACNE_SELECTOR =
                "$.data.facedata.specialResult.data[*].data[?(@.key == 'SkinAcne')]";
            const SKIN_PIMPLE_SELECTOR =
                "$.data.facedata.specialResult.data[*].data[?(@.key == 'SkinPimple')]";
            const SKIN_BLACKHEADS_SELECTOR =
                "$.data.facedata.specialResult.data[*].data[?(@.key == 'SkinBlackHeads')]";
            const SKIN_MOLE_SELECTOR =
                "$.data.facedata.generalResult.data[*].data[?(@.key == 'SkinMole')]";
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
            },];

            var dataJson = null;

            // startup();

            return {
                toggleAcne: toggleAcne,
                toggleBlackhead: toggleBlackhead,
                toggleMole: toggleMole,
                togglePimple: togglePimple,
                toggleSpot: toggleSpot,
                startup:  startup
            };

            function startup() {
            
                try {
                    dataJson =objectReponse;
                } catch (e) {
                    console.error(e);
                }
                dataJson && showResult(dataJson);

                const imageSizeChangedObserver = new ResizeObserver(function () {
                    dataJson && renderSkinIssues(dataJson);
                });
                imageSizeChangedObserver.observe(
                    document.getElementById("imageResult")
                );

            }

            function showResult(dataJSON) {
                dataJSON.data.facedata.generalConclusion.data = dataJSON.data.facedata.generalConclusion.data.slice(0, 2)
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
                SKIN_DRAWERS.forEach(function (item) {
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
                                    itemOutput += "<li class='description-txt'>" + item.valueVI + "\n" + "</li>";
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
                                            itemOutput += "<li class='description-txt'>" + item + "\n" + "</li>";
                                        }) :
                                        null;
                                } {
                                    itemData.valueEN !== undefined &&
                                        itemData.valueVI !== undefined ?
                                        (itemOutput += "<li class='description-txt'>" + itemData.valueVI + "\n" + "</li>") :
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
                if (arr && arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        renderDivItem(itemId, arr[i], scaleRatio, color);
                    }
                }
            }

            function clearDrawData() {
                document
                    .querySelectorAll(".ai-skin__result-plot__box")
                    .forEach(function (item) {
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
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    function loadDataRecomendProductNew() {
            var decoded = sessionStorage.getItem("_t");
            let dataJson = null
            try {
                dataJson = JSON.parse(decoded);
            } catch (e) {
                console.error(e);
            }
            // console.log('dataJson',)
            sessionStorage.removeItem("_t");
            if (dataJson !== null) {
                try {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        data: {
                            "data": dataJson.data.facedata.hintResult
                        },
                        url: "https://csgvietnam.com/itemSdk/multiItem",
                        success: function (data) {
                            let res = data
                            if (res.data !== undefined) {
                                loadRecommendData(res.data)
                                showSlides(1)
                            }
                        },
                        error: function (error) {
                            jsonValue = jQuery.parseJSON(error.responseText);
                        }
                    });
                } catch (e) {
                    // console.log('e1111', e)
                    callDefaultRecommend()
                }
            } else {
                callDefaultRecommend()
            }

            function callDefaultRecommend() {
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "https://csgvietnam.com/itemSdk",
                    success: function (data) {
                        let res = data
                        if (res.data !== undefined) {
                            // loadRecommendData(res.data)

                        }
                    },
                    error: function (error) {
                        jsonValue = jQuery.parseJSON(error.responseText);
                    }
                });
            }


        }




        function loadRecommendData(data = null) {

            return;
            var htmlTemplate = sessionStorage.getItem("htmlTemplate");

            $("#formProductSuggestion").empty();
            $("#formProductSuggestion").html(htmlTemplate);


            $('.slick-carousel').slick({
                slidesToShow: 3,
                settings: "unslick",
                slidesToScroll: 1,
                arrows: true,
                infinite: false,
                touchThreshold: 100,
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
                        arrows: true,
                    },
                }, {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 2,

                        slidesToScroll: 1,
                        arrows: true,
                    },
                }


                ],
            });

            return;


            var slideItemData = ''
            var slideControlItem = ''
            var slidesDiv = document.getElementById("slidbannerProduct");
            // var dotsDiv = document.getElementById("slideshow-control");

            for (i = 0; i < data.length; i++) {
                var item = data[i];

                slideItemData += '<div class="card mr-2">\
                    <img src="' + item.image + '" alt="">\
                    <div class="product-title">\
                        <div>\
                             ' + item.title + ' \
                        </div>\
                    </div>\
                </div>';




            }

            for (i = 0; i < data.length; i++) {
                var item = data[i];
                slideItemData += '<div class="card mr-2">\
                    <img src="' + item.image + '" alt="">\
                    <div class="product-title">\
                        <div>\
                             ' + item.title + ' \
                        </div>\
                    </div>\
                </div>';
            }

            $("#slidbannerProduct").empty();
            $("#slidbannerProduct").html(slideItemData);
            $("#slidbannerProduct2").empty();
            $("#slidbannerProduct2").html(slideItemData);
            $("#slidbannerProduct3").html(slideItemData);
            $("#slidbannerProduct4").html(slideItemData);
            $("#slidbannerProduct5").html(slideItemData);
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
            showSlides(1)
        };


        $(document).ready(function ($) {

            //loadDataRecomendProductNew();
            $(document).keyup(function (event) {
                if (event.which == '27') {
                    $('.cd-popup').removeClass('is-visible');
                }

            });
        }
        );
</script>


</div>

<script>
    function getBaseUrl() {
        // return "https://ungdungsoida.netlify.app/";
        return "./";
    }
</script>

<script>
    document.addEventListener("DOMContentLoaded", function () {

        // sessionStorage.setItem('dataCompany', JSON.stringify(dataCompany));


    });

</script>

<script>
    function sendreward() {
        $("#btnreward").hide();
        $("#btnrewardLoading").show();
        $.ajax({
            type: "PUT",
            url: "http://localhost:3002/api/add-customer-request",
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

<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>


<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous">
</script>

<script type="text/javascript" src="/js/contant.js"></script>
<script type="text/javascript" src="/js/main.js"></script>
<script type="text/javascript" src="/js/result.js"></script>

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
    var objectReponse = {!! json_encode($result) !!};
    


    var slugGlobal = {!! json_encode($slug) !!};
    
    
    
    document.addEventListener("DOMContentLoaded", function(){
        
        var resultCheck =objectReponse;
        if(resultCheck ==null)
        {
            
            window.location.href ="/";

        }
        else 
        {
            objectReponse = resultCheck.Result;
        
        }
        
        resultModule.startup();
        
        reDrawInfomation();

        drawProduction(objectReponse.data.facedata.hintResult);

        

    });
</script>
@endsection