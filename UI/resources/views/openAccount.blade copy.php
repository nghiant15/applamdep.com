<html><head>
    <title>Mở tài khoản online</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <script src="/assets/account/main.js"></script>

    <link href="/assets/account/main.css" rel="stylesheet">
</head>

<body>

   
    <div class="modal fade" id="popupOpen" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" id="modelBody" role="document">
            <div class="modal-content">
                <div class="modal-header">

                    <button type="button" class="close closepopup" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
                </div>
                <div class="modal-body">
                    <a href="javascript:void(0)">
                        <img id="imageBackground" src="./assets/account/desktop/1.png">
                    </a>
                </div>

            </div>
        </div>
    </div>


    <div class="modal fade" id="popupResult" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body">

                    <p>
                        Dựa trên thông tin nhập, chúng tôi đang khởi tạo tài khoản cho bạn. Vui lòng chờ đơị trong giây lát.
                    </p>
                    <p>
                        Trong quá trình tạo, quý khách không nên tắt trình duyệt.
                    </p>
                    <div class="align-center">
                        <div class="spinner-grow text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-secondary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>


                    </div>

                </div>

            </div>
        </div>
    </div>

    <form id="formrequest" class="row g-3 needs-validation" novalidate="">
        <div class="container register">
            <div class="row" id="formRequest">
                <div class="col-md-3 register-left">

                    <a id="btnLoginMobile" href="https://id.applamdep.com" class="component__link button button--one button--small button--secondary button--primary__on-stuck" data-event="clicked" data-uuid="ba69ef51-92-link-text" data-event-component="linkButton" data-event-container="navbar" data-schema-version="1" data-product-key="bitbucket" style="
                 
                    padding: 2px;
                    position: absolute;
                    right: 25;
                    top: 0;
                    color: #fff;
                    border-bottom: solid 2px #fff;
                    ">Đăng nhập
                    </a>
                    <img src="https://tikitech.vn/assets/images/logo_head.png" alt="">
                    <h3>Chào mừng</h3>


                    <a id="btnLoginDesktop" href="https://id.applamdep.com">

                        <input type="button" name="" id="btnSubmnit" value="Đăng nhập"><br>
                    </a>

                </div>
                <div class="col-md-9 register-right">

                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h3 class="register-heading">Mở tài khoản </h3>


                            <div class="row register-form">
                                <div class="col-md-12">
                                    <div class="form-group alignRight">
                                        <span> 
                                            Yêu cầu nhập thông tin  <span class="requiredTip "> (*) </span>
                                        </span>
                                    </div>

                                    <div class="form-group">
                                        <div id="messageError" style="display:none">
                                            <p class="tip">
                                                Tạo tài không thành công, có các lỗi sau:
                                            </p>
                                            <p class="tip" id="txtErrorMessage">

                                            </p>
                                        </div>

                                        <input style="display:none" type="text" id="txtfullName" name="Name" class="form-control">

                                       

                                    </div>




                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Tên đăng nhập: <span class="requiredTip"> (*) </span></label>
                                        <input type="text" id="txtUserName" name="UserName" onchange="genslug()" class="form-control">
                                        <!-- <p class="tip">
                                            
                                        </p> -->
                                        <div class="error" id="txterrorUserName">
                                            Bạn chưa nhập tên đăng nhập
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Mật khẩu: <span class="requiredTip"> (*) </span></label>
                                        <input type="password" name="Password" id="txtPassword" class="form-control" placeholder="Mật khẩu" value="">
                                        <!-- <p class="tip">
                                            Mật khẩu là mã bạn đăng nhập vào hệ thống. mật khẩu càng mạnh thì càng an toàn.
                                        </p> -->
                                        <div class="error" id="txterrorPassword">
                                            Bạn chưa nhập mật khẩu đăng nhập
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Nhập lại mật khẩu: <span class="requiredTip"> (*) </span></label>
                                        <input type="password" name="repeatPassword" id="txtRePassword" class="form-control" placeholder="Mật khẩu" value="">
                                        <!-- <p class="tip">
                                            Mật khẩu là mã bạn đăng nhập vào hệ thống. mật khẩu càng mạnh thì càng an toàn.
                                        </p> -->
                                        <div class="error" id="txterrorPassword">
                                            Bạn chưa xác nhận lại mật khẩu đã nhập.
                                        </div>
                                        <div class="error" id="txtErrorRepeatAgain">
                                            Hai mật khẩu không trùng khớp, vui lòng nhập lại.
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-12">

                                            <label for="exampleInputEmail1">Số điện thoai: <span class="requiredTip"> (*) </span></label>
                                            <input type="text" minlength="10" id="txtphoneNumber" maxlength="10" name="Phone" class="form-control" placeholder="" value="">
                                            <!-- <p class="tip">
                                                    Số điện thoại đăng ký hệ thống.
                                                </p> -->
                                            <div class="error" id="txtphoneNumberError">
                                                Bạn chưa nhập số điện thoại
                                            </div>

                                        </div>
                                        {{-- <div class="col-sm-6">

                                            <label for="exampleInputEmail1">Địa chỉ Email:</label>
                                            <input type="text" name="Email" id="txtEmail" class="form-control">

                                        </div> --}}
                                    </div>


                                    <div class="form-group" hidden="">
                                        <label for="exampleInputEmail1">Nhãn hàng:</label>
                                        <input type="text" name="Slug" id="txteSlug" class="form-control">
                                        <!-- <p class="tip">
                                            Định danh của bạn, Người dùng có thể nhìn thấy link của công ty (shop) bạn đăng ký như: <br> https:/ungdungsoida.com/tiktiech
                                        </p> -->
                                        <p class="tip" id="txtslugInput">
                                            https:/ungdungsoida.com/tiktiech
                                        </p>
                                        <div class="error" id="txterSlug">
                                            Bạn chưa nhập Nhãn hàng
                                        </div>
                                    </div>
                                    <div class="form-group" style ="display:none">
                                        <label for="exampleInputEmail1">Mã giảm giá</label>
                                        <input type="text" name="Sale_Code" class="form-control" placeholder="Số điện thoại người giới thiệu" value="">
                                        <p class="tip">
                                            Mã khuyến mãi để được hưởng ưu đãi khi là thành viên ( mã khuyến mãi có thể là số diện thoại người giới thiêu,...)
                                        </p>
                                    </div>


                                    <div class="form-group row">
                                        <div class="col-sm-6">

                                            <label for="exampleInputEmail1">Chọn gói sản phẩm: <span class="requiredTip"> (*) </span></label>
                                            <select class="form-control form-select" id = "selectPackage" name ="packageId" >
                                                    <option value="" selected disabled hidden>Chọn gói sản phẩm</option>
                                                    @foreach ( $data->dataPackage as $item )
                                                        <option value="{{$item->Value }}">{{$item->Name }}</option>
                                                    @endforeach
                                            </select>
                                              
                                            <!-- <p class="tip">
                                                    Số điện thoại đăng ký hệ thống.
                                                </p> -->
                                            <div class="error" id="txtphoneNumberError">
                                                Bạn chưa chọn gói sản phẩm
                                            </div>

                                        </div>

                                        <div class="col-sm-6">

                                            <label for="exampleInputEmail1">Nhân viên tư vấn: <span class="requiredTip"> (*) </span></label>
                                           
                                            <select class="form-control form-select" id = "txtEmployee" name ="saleId">

                                                <option value="" selected disabled hidden>Chọn nhân viên tư vấn </option>
                                                @foreach ( $data->dataSale as $item )
                                                <option value="{{$item->_id }}">{{$item->Name }}</option>
                                                @endforeach
                                               
                                              </select>
                                            <div class="error" id="txtphoneNumberError">
                                                Bạn chưa chọn nhân viên tư vấn
                                            </div>

                                        </div>
                                        {{-- <div class="col-sm-6">

                                            <label for="exampleInputEmail1">Địa chỉ Email:</label>
                                            <input type="text" name="Email" id="txtEmail" class="form-control">

                                        </div> --}}
                                    </div>

                                    <div class="form-group" hidden="">
                                        <label for="exampleInputEmail1">Lĩnh vực hoạt động:</label>
                                        <select class="form-control" name="Type">
                                                    <option class="hidden" selected="" disabled="">Chọn lĩnh vực</option>
                                                    <option>Spa, clinic &amp; dịch vụ làm đẹp
                                                    </option>
                                                    <option>Trang điểm, Sâm mi…. 
                                                    </option>
                                                    <option>Shop Mỹ Phẩm, Làm đẹp, Thực  Phẩm Chức Năng
                                                    </option>

                                                    <option>Gian Hàng Shopee, tiki, Lazada, Sendo..

                                                    </option>

                                                    <option>Nhà thuốc 


                                                    </option>
                                         </select>


                                    </div>


                                    <button type="button" class="btnRegister btnResterLoading" value="Đăng ký">
                                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Đang tạo
                                    </button>
                                    <button type="button" onclick="submitRequest()" class="btnRegister" value="Đăng ký">Mở tài khoản
                                    </button>


                                </div>



                            </div>

                        </div>
                        <div class="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                        </div>
                    </div>



                </div>
            </div>

            <div class="row" id="result">
                <div class="col-md-12 register-left">
                    <img src="https://tikitech.vn/assets/images/logo_head.png" alt="">
                    <h3>Bạn đã đăng ký thành công</h3>
                    <p style="padding-bottom: 5%;">
                        Vui lòng đăng nhập lại tài khoản để đăgn nhập hệ thống
                    </p>
                    <a href="https://id.applamdep.com" style="border: none;
                    border-radius: 1.5rem;
                    padding: 2%;
                    width: 60%;
                    background: #f8f9fa;
                    font-weight: bold;
                    color: #383d41;
                    margin-top: 30%;
                    margin-bottom: 3%;
                    cursor: pointer;">
                        Đăng nhập
                    </a>

                </div>
            </div>

        </div>
    </form>



</body></html>