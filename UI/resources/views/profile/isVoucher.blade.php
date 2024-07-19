

@php
  $dataCompany = Cache::get('webinfo');
@endphp
@if(isset($dataCompany))
    <script>
        configWeb = {!! json_encode($dataCompany) !!};
        var titleGetVoucher = "CHÚC MỪNG BẠN VỪA NHẬN ĐƯỢC VOUCHER LÀM ĐẸP";
        var textSales = "Miễn phí 1.000.000 VND";
        var titleGetVoucherSuceess = "NHẬN VOUCHER THÀNH CÔNG!";
        var sendSMS = "Chúng tôi sẽ gửi mã xác nhận qua số điện thoại của bạn, hãy kiểm tra"
        if(configWeb && configWeb.form && configWeb.form.title_get_voucher){
        titleGetVoucher = configWeb.form.title_get_voucher
        };
        if(configWeb && configWeb.form && configWeb.form.textSales){
            textSales = configWeb.form.textSales
        };
        if(configWeb && configWeb.voucher && configWeb.voucher.receiveVoucherSuccess){
            titleGetVoucherSuceess = configWeb.voucher.receiveVoucherSuccess
        };
        if(configWeb && configWeb.voucher && configWeb.voucher.sendSMS){
          sendSMS = configWeb.voucher.sendSMS
        };
    </script>
@else
@endif

<div class="status_isVoucher">
  <div class="flex-item-center">
    <div class="modal-information">
      <div class="popup-voucher-no-scroll">
        <div class="loading_get_voucher">
          <div class="border-loading-spin">
            <svg class="loading-spin" viewBox="0 0 100 100">
              <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
            </svg>
          </div>
        </div>
        <div class="title_nav">
          <h6>
            @if(isset($dataCompany->form->registerGetVoucher) && $dataCompany->form->registerGetVoucher !== '')
              {{$dataCompany->form->registerGetVoucher}}
           
            @else
              Đăng ký để nhận voucher làm đẹp trị giá 1.000.000 VND
            @endif          
          </h6>
          <div class="position-close2">
            <svg onclick="close_isVoucher()" viewBox="0 0 24 24" size="24" class="sc-11csm01-0 fivNSm">
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

        </div>
        <div class="form-input mt-4">
          <form id="">
            <div class="form-group">
              <input type="text" name="nameVoucher" class="my-form-control" id="nameVoucher"
                placeholder="Tên của bạn" />
              <div id="nameVoucherError" class="errorReward">
                Họ và tên không được bỏ trống?.
              </div>
            </div>
            <div class="form-group">
              <input type="text" name="phoneVoucher" class="my-form-control" id="phoneVoucher"
                placeholder="SĐT của bạn" />

              <div id="phoneVoucherError" class="errorReward">
                Số điện thoại không đúng.
              </div>
            </div>
            <div class="mt-4">
              <button onclick="getIsVoucher()" type="button" class="btn_form btn-get-voucher" id="" style="padding:10px">
                <p>
                  @if(isset($dataCompany->form->btn_register_get_voucher) && $dataCompany->form->btn_register_get_voucher != '')
                    {{ $dataCompany->form->btn_register_get_voucher }}
                 
                  @else
                  Đăng ký ngay
                  @endif
                 
                </p>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  </div>
</div>
<div class="status_alert_isVoucher">
  <div class="modal-information">
    <div class="popup__info-voucher">
      <div class="position-close2" onclick="closeIsInfoVoucherGift()">
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
      <div>
        <h6 class="popup__info-voucher--title">
          Thông tin voucher
        </h6>
        <div id="renderFormMyVoucher">

        </div>
        <div class="popup__info-voucher--content">
          <div>         
            <div>
              <span>Ưu đãi</span>
              <p>
                @if(isset($dataCompany->voucher->voucherEndow) && $dataCompany->voucher->voucherEndow != '')
                  {{ $dataCompany->voucher->voucherEndow }}
               
                @else
                  Chưa có
                @endif
              </p>
            </div>
            <div>
              <span>Có hiệu lực</span>
              <p>
                @if(isset($dataCompany->homepage->voucherExpiry) && $dataCompany->homepage->voucherExpiry != '')
                  {{ $dataCompany->homepage->voucherExpiry }}
                  
                @else
                30 ngày kể từ ngày nhận voucher
                @endif
                
              </p>
            </div>
            <div>
              <span>Nhà cung cấp</span>
              <p>
                @if(isset($dataCompany->voucher->voucherSupplier) && $dataCompany->voucher->voucherSupplier != '')
                  {{ $dataCompany->voucher->voucherSupplier }}
                 
                @else
                  Chưa có
                @endif          
              </p>
            </div>
            <div>
              <span>Điều kiện</span>
              <p>
                @if(isset($dataCompany->voucher->voucherCondition) && $dataCompany->voucher->voucherCondition != '')
                 
                  {{ $dataCompany->voucher->voucherCondition }}
                @else
                Sử dụng một lần 
                @endif 
                
              </p>
            </div>
           
              <p>
                @if(isset($dataCompany->voucher->sendSMS) && $dataCompany->voucher->sendSMS !== "")
                {{ $dataCompany->voucher->sendSMS }}
                @else
                Hãy lưu lại mã voucher, chúng tôi sẽ liên hệ bạn qua số điện thoại để xác nhận voucher
                @endif
              </p>
           
            {{-- <div class="text-center">
              <p>
                
                <a href='javascript:void(0)'>Click xem hướng dẫn</a>

              </p>
            </div> --}}
          </div>
        </div>
      </div>
    </div>
    <div class="form_notifyDesk form_isVoucher">
      <div class="position-close2" onclick="backSuccessVoucher()">
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
      <div id="renderGetVoucher">

      </div>
    </div>
  </div>
</div>
<div class="status_alert_isVoucher-gift">
  <div class="modal-gift">
    <div class="popup__info-voucher">
      <div class="position-close2" onclick="closeIsInfoVoucherGift()">
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
      <div>
        <h6 class="popup__info-voucher--title">
          Thông tin voucher
        </h6>
        <div class="relative flex-center-space bg-code-voucher mt-3 mb-3 form__isVoucher__font">
          <div class="paper-voucher">
            Voucher
          </div>
          <div class="saw-voucher">
            <div class="saw-voucher2">
              <div class="saw-voucher3">
                <div class="saw-voucher4">

                </div>
              </div>
            </div>
          </div>
          <div class="flex-a-center body-voucher">
            <div class="my-voucher__column">
              <h6>Mã voucher của bạn</h6>

              <span id="myCodeVoucher-gift2"> ***********</span>
            </div>
            <div class="line-voucher">

            </div>
          </div>
          <div class="save-voucher">
            <div class="save-voucher2">
              <button onclick="copyCodeVoucherById('myCodeVoucher-gift2')" type="button" class="save-voucher-btn"
                aria-disabled="false">
                <p class="save-voucher--content">
                Lưu
                </p>
              </button>
            </div>
          </div>
        </div>
        <div class="popup__info-voucher--content">
          <div>         
            <div>
              <span>Ưu đãi</span>
              <p>
                @if(isset($dataCompany->voucher->voucherEndow) && $dataCompany->voucher->voucherEndow != "")
                  {{ $dataCompany->voucher->voucherEndow }}
                
                @else
                  Chưa có
                @endif
              </p>
            </div>
            <div>
              <span>Có hiệu lực</span>
              <p>
                @if(isset($dataCompany->homepage->voucherExpiry) && $dataCompany->homepage->voucherExpiry != "")
                  {{ $dataCompany->homepage->voucherExpiry }}
                 
                @else
                30 ngày kể từ ngày nhận voucher
                @endif
                
              </p>
            </div>
            <div>
              <span>Nhà cung cấp</span>
              <p>
                @if(isset($dataCompany->voucher->voucherSupplier) && $dataCompany->voucher->voucherSupplier != '')
                 
                  {{ $dataCompany->voucher->voucherSupplier }}
                @else
                  Chưa có
                @endif          
              </p>
            </div>
            <div>
              <span>Điều kiện</span>
              <p>
                @if(isset($dataCompany->voucher->voucherCondition) && $dataCompany->voucher->voucherCondition != '')
                  {{ $dataCompany->voucher->voucherCondition }}
                  
                @else
                Sử dụng một lần 
                @endif 
                
              </p>
            </div>
           
              <p>
                @if(isset($dataCompany->voucher->sendSMS) && $dataCompany->voucher->sendSMS !== "")
                {{ $dataCompany->voucher->sendSMS }}
                @else
                Hãy lưu lại mã voucher, chúng tôi sẽ liên hệ bạn qua số điện thoại để xác nhận voucher
                @endif
              </p>
           
            {{-- <div class="text-center">
              <p>
                
                <a href='javascript:void(0)'>Click xem hướng dẫn</a>

              </p>
            </div> --}}
          </div>
        </div>
      </div>
    </div>
    <div class="form_notifyDesk form_isVoucher">
      <div class="status-loader-22-register-voucher">
        <div class="border-loading-spin">
          <svg class="loading-spin" viewBox="0 0 100 100">
            <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
          </svg>
        </div>
      </div>
      <div class="position-close2" onclick="closeIsVoucherGift()">
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
      <div id="renderGetVoucherGift" style="width:100%">
        
        <p style="color: var(--main_color)" class="title_get_voucher" id="title_isVoucher-gift">
          @if(isset($dataCompany->form->title_get_voucher) && $dataCompany->form->title_get_voucher != '')
  
          {{ $dataCompany->form->title_get_voucher }}
          @else
            Chúc mừng bạn vừa nhận được voucher làm đẹp miễn phí
          @endif
          
        </p>
        <p style="color: var(--main_color)" class="title_get_voucher" id="title_isVoucher-gift">
          @if(isset($dataCompany->form->textSales) && $dataCompany->form->textSales != '')
           
          {{ $dataCompany->form->textSales }}
          @else
          Trị giá 1.000.000 VND
          @endif
          
        </p>
        @if(isset($dataCompany->voucher->imageFormVoucher))
          @if(isset($dataCompany->voucher->classImageVoucher) && $dataCompany->voucher->classImageVoucher === true)
            {{-- <div id="form__voucher__image__voucher" class="bg-image form__voucher__image__voucher bg-image__mobi-full" style="background-image:url('{{ $dataCompany->voucher->imageFormVoucher }}')">
            </div>     --}}
            <img id="form__voucher__image__voucher" style="height: auto;width:100%;margin-top:10px" src="{{ $dataCompany->voucher->imageFormVoucher }}"/>
          @else
            {{-- <div id="form__voucher__image__voucher" class="bg-image form__voucher__image__voucher" style="background-image:url('{{ $dataCompany->voucher->imageFormVoucher }}')">
            </div>     --}}
            <img id="form__voucher__image__voucher" style="height: auto;width:100%;margin-top:10px" src="{{ $dataCompany->voucher->imageFormVoucher }}"/>
          @endif
          
        @else
         
        @endif
        
        <div id="form__voucher__code--hide">
          <div  class="relative flex-center-space bg-code-voucher mt-3 mb-3">
            <div class="paper-voucher">
              Voucher
            </div>
            <div class="saw-voucher">
              <div class="saw-voucher2">
                <div class="saw-voucher3">
                  <div class="saw-voucher4">

                  </div>
                </div>
              </div>
            </div>
            <div class="flex-a-center body-voucher">
              <div class="my-voucher__column">
                <h6>Mã voucher của bạn</h6>

                <span id="myCodeVoucher-gift"> ***********</span>
              </div>
              <div class="line-voucher">

              </div>
            </div>
            <div class="save-voucher">
              <div class="save-voucher2">
                <button onclick="copyCodeVoucherById('myCodeVoucher-gift')" type="button" class="save-voucher-btn"
                  aria-disabled="false">
                  <p class="save-voucher--content">
                    Lưu
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <h4 id="isVoucher-gift_alert-send-to-phone"></h4>
        <h4 class="form-voucher-gift-input form-voucher-gift-input-title" style="line-height: 30px;font-weight:700">
              @if(isset($dataCompany->form->loginWatchVoucher) && $dataCompany->form->loginWatchVoucher != '')
               
                {{ $dataCompany->form->loginWatchVoucher }}
              @else
                Hãy nhập thông tin của bạn để xem mã voucher !
              @endif
          
        </h4>
        <div class="form-input mt-4 form-voucher-gift-input" id="">
          <form id="">
            <div class="form-group">
              <input type="text" class="my-form-control" name="nameVoucher2" id="nameVoucher2"
                placeholder="Tên của bạn" />
              <div id="nameVoucher2Error" class="errorReward">
                Họ và tên không được bỏ trống?.
              </div>
            </div>
            <div class="form-group">
              <input type="text" name="phoneVoucher2" class="my-form-control" id="phoneVoucher2"
                placeholder="SĐT của bạn" />

              <div id="phoneVoucher2Error" class="errorReward">
                Số điện thoại không đúng.
              </div>
            </div>

          </form>

          <div class="mt-4">
            <button onclick="registerGetIsVoucher()" type="button" class="btn_form btn-get-voucher"
              style="padding:10px">
              <p>
                @if(isset($dataCompany->voucher->btn_get_voucher) && $dataCompany->voucher->btn_get_voucher != '')
               
                {{ $dataCompany->voucher->btn_get_voucher }}
                @else
                Nhận ngay voucher
                @endif
                
              </p>
            </button>
          </div>
        </div>
        <div class="form-voucher-gift-back">
          <div class="flex-center mt-4 " id="">
            <button onclick="openIsInfoVoucherGift()" type="button" class="btn_form">
              <p>Xem thông tin voucher</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
function openIsInfoVoucherGift(){
  $(".popup__info-voucher").show();
};
function closeIsInfoVoucherGift(){
  $(".popup__info-voucher").hide();
};
function closeIsVoucherGift(){
  $(".status_alert_isVoucher-gift").css("display", "none");
  $(".popup__info-voucher").hide();
};
function close_isVoucher() {
  $(".status_isVoucher").css("display", "none");
};
async function getIsVoucher() {
  turnOffButtonAll('.btn-get-voucher');

  var indexError = 0;
  let phoneVoucher = document.getElementById("phoneVoucher");
  var phoneVoucherError = document.getElementById("phoneVoucherError");
  var nameVoucher = document.getElementById("nameVoucher");
  var nameVoucherError = document.getElementById("nameVoucherError");

  if (isVietnamesePhoneNumber(phoneVoucher.value)) {
      phoneVoucherError.style.display = "none";
  } else {
      phoneVoucherError.textContent = "Số điện thoại không chính xác. Vui lòng kiểm tra và nhập lại";

      phoneVoucherError.style.display = "block";
      indexError++;
  }
  if (nameVoucher === "" || nameVoucher.value.length < 1) {
      nameVoucherError.textContent = "Hãy cho chúng tôi biết tên của bạn";

      nameVoucherError.style.display = "block";
      indexError++;
  } else {
      nameVoucherError.style.display = "none";
  }

  if (indexError > 0) {
    turnOnButtonAll('.btn-get-voucher');
  } else {
      $(".loading_get_voucher").show();

      await callApiLogin(nameVoucher.value, phoneVoucher.value);
      await saveHistoryAfterSkinScreen();
      
      generalNameLogin = nameVoucher.value;
        $('.result-list').show();
                $('#suggest-login-title').show();
                $('#suggest-login-content').hide();
                $('#suggest-login-circle').hide();

      $("#name_after_login").html(nameVoucher.value);
      $("#name_after_login").show();
      $("#status__text__login").hide();

      var id = window.location.pathname.split("/")[2];
      var slug = window.location.pathname.split("/")[1];
      var saleId = null;
      if (id === 'soida') {
        saleId = slug;
      } else {
        saleId = id;
      };
      $.ajaxSetup({
          headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
          },
      });
      $.ajax({
          url: api.serve.baser_urlServer + "/" + api.serve.get_evoucher,
          type: "POST",
          data: {
              saleId: saleId,
              slug: slug,
              fullName: nameVoucher.value,
              phoneNumber: phoneVoucher.value,
          },
          success: function (response) {
              if (response.is_success) {
                $(".gift-box-right-sceen").css("display", "none");
                $(".sticky-button-result").css("display", "none");

                showPopupVoucher = true;
                  let voucher = renderGetVoucherSuccess(response.data.data.voucherCode); 
                  let formVoucherCode = renderFormVoucherCode(response.data.data.voucherCode);              
                  $('#renderGetVoucher').html(voucher);
                  $("#renderFormMyVoucher").html(formVoucherCode);


              } else {    
                  let voucher = renderGetVoucherError(response.data.message);
                  $('#renderGetVoucher').html(voucher);
              }
              setTimeout(() => {
                  $(".loading_get_voucher").hide();
                  $(".status_isVoucher").hide();
                  $(".status_alert_isVoucher").show();
                  turnOnButtonAll('.btn-get-voucher');
              }, 500)
          },
          error: function (jqXHR, textStatus, errorThrown) {
            $(".loading_get_voucher").hide();
            $(".status_isVoucher").hide();
            ToggleAlert(false, "Có lỗi xảy ra", true);
            setTimeout(() => {
              ToggleAlert(false, "", false);
              turnOnButtonAll('.btn-get-voucher');
            }, 1200);
          },
      });
  }
};
async function registerGetIsVoucher() {
  showPopupVoucher = true;

  turnOffButtonAll('.btn-get-voucher');
  let indexError = 0;
  let phoneVoucher = document.getElementById("phoneVoucher2");
  let phoneVoucherError = document.getElementById("phoneVoucher2Error");
  let nameVoucher = document.getElementById("nameVoucher2");
  let nameVoucherError = document.getElementById("nameVoucher2Error");
  if (isVietnamesePhoneNumber(phoneVoucher.value)) {
      phoneVoucherError.style.display = "none";
  } else {
      phoneVoucherError.textContent = "Số điện thoại bạn nhập không chính xác";
      phoneVoucherError.style.display = "block";
      indexError++;
  }
  if (nameVoucher === "" || nameVoucher.value.length < 1) {
      nameVoucherError.textContent = "Hãy cho chúng tôi biết tên của bạn";
      nameVoucherError.style.display = "block";
      indexError++;
  } else {
      nameVoucherError.style.display = "none";
  }
  if (indexError > 0) {
      turnOnButtonAll('.btn-get-voucher');
  } else {
      $(".status-loader-22-register-voucher").css("display", "block");

      await callApiLogin(nameVoucher.value, phoneVoucher.value);
      await saveHistoryAfterSkinScreen();
      sessionStorage.setItem("userNameLogin", nameVoucher.value);
      $("#name_after_login").html(nameVoucher.value);
      $("#name_after_login").show();
      $("#status__text__login").hide();

      
      $('.result-list').show();
                  $('#suggest-login-title').show();
                  $('#suggest-login-content').hide();
                  $('#suggest-login-circle').hide();
 
      $(".gift-box-right-sceen").css("display", "none");
      $(".sticky-button-result").css("display", "none");
      var id = window.location.pathname.split("/")[2];
      var slug = window.location.pathname.split("/")[1];
      var saleId = null;
      if (id === 'soida') {
        saleId = slug;
      } else {
        saleId = id;
      };
      
      $.ajaxSetup({
          headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
          },
      });
      $.ajax({
          url: api.serve.baser_urlServer + "/" + api.serve.get_evoucher,
          type: "POST",
          data: {
              saleId: saleId,
              slug: slug,
              fullName: nameVoucher.value,
              phoneNumber: phoneVoucher.value,
          },
          success: function (response) {
              if (response.is_success) {            
                  setTimeout(() => {
                      ToggleAlert(true, "Đăng ký thành công, Hãy lưu lại mã voucher", true);
                      $(".status-loader-22-register-voucher").css("display", "none");
                      setTimeout(() => {              
                          $('.form-voucher-gift-input').css("display", "none");
                          $('.form-voucher-gift-back').css("display", "block");

                          $(".gift-box-right-sceen").css("display", "none");
                          $(".sticky-button-result").css("display", "none");
                          turnOnButtonAll('.btn-get-voucher');

                          ToggleAlert(false, "", false);
                          $("#myCodeVoucher-gift").html(response.data.data.voucherCode);
                          $("#myCodeVoucher-gift2").html(response.data.data.voucherCode);
                          $("#title_isVoucher-gift").html(titleGetVoucherSuceess);
                          $("#isVoucher-gift_alert-send-to-phone").html(sendSMS);
                          $('#form__voucher__image__voucher').hide();
                          $('#form__voucher__code--hide').show();
                      }, 1200);
                  }, 1000);
              } else {
                $(".status-loader-22-register-voucher").css("display", "none");

                  ToggleAlert(false, response.data.message, true);

                  $(".gift-box-right-sceen").css("display", "none");
                  $(".sticky-button-result").css("display", "none");

                  turnOnButtonAll('.btn-get-voucher');

                  setTimeout(() => {
                      ToggleAlert(false, "", false);
                  }, 1200);
              };
          },
          error: function (jqXHR, textStatus, errorThrown) { 
            ToggleAlert(false, "Có lỗi xảy ra", true);
            $(".status-loader-22-register-voucher").css("display", "none");

                  $(".gift-box-right-sceen").css("display", "none");
                  $(".sticky-button-result").css("display", "none");

                  turnOnButtonAll('.btn-get-voucher');

                  setTimeout(() => {
                      ToggleAlert(false, "", false);
                  }, 1200);
          },
      });
  }
};
</script>