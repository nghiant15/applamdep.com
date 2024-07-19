<script>
  var listCampaignRender = [

];
</script>
@php
$dataCompany = Cache::get('webinfo');
$dataWebinfoAdmin = Cache::get('webinfo_admin');

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
@if(isset($dataCompany->bannerCampaign))
    <script>
        listCampaignRender = {!! json_encode($dataCompany->bannerCampaign) !!};
    </script>
@else
@endif
<div class="status_isVoucher_logined">
  <div class="flex-item-center">
    <div class="modal-information">
      <div class="popup-voucher-aia" style="max-height:100%">
        <div class="loading_get_voucher-logined">
          <div class="border-loading-spin">
            <svg class="loading-spin" viewBox="0 0 100 100">
              <circle class="loading-draw" cx="50" cy="50" r="45"></circle>
            </svg>
          </div>
        </div>
        <div class="title_nav">
          <h6 id="title__form__get-voucher--logined">
            @if(isset($dataCompany->aia->titleGetVoucherAia))
            {{ $dataCompany->aia->titleGetVoucherAia }}
            @else
              Chúc mừng bạn vừa nhận được voucher làm đẹp
            @endif
          </h6>
          <div class="position-close2">
            <svg onclick="close_isVoucher_logined()" viewBox="0 0 24 24" size="24" class="sc-11csm01-0 fivNSm">
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
      
        <div class="form__get-voucher-aia--title-list-campaign mt-2">
          @if(isset($dataCompany->aia->titleListCam))
          {{ $dataCompany->aia->titleListCam }}
          @else
          Danh sách thương hiệu
          @endif
          
        </div>
        <div class="form__get-voucher-input__scroll-campaign--has-login">
          <div class="form-campaign" id="render_form_campaign2">

          </div>
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
              <p id="popup__info-voucher--content-sales">
                         
              </p>
            </div>
            <div>
              <span>Có hiệu lực</span>
              <p>
                @if(isset($dataCompany->homepage->voucherExpiry))
                  {{ $dataCompany->homepage->voucherExpiry }}
                @else
                30 ngày kể từ ngày nhận voucher
                @endif
                
              </p>
            </div>
            <div>
              <span>Nhà cung cấp</span>
              <p id="popup__info-voucher--company_name">
                        
              </p>
            </div>
            <div>
              <span>Điều kiện</span>
              <p>
                @if(isset($dataCompany->voucher->voucherCondition))
                  {{ $dataCompany->voucher->voucherCondition }}
                @else
                Sử dụng một lần 
                @endif 
                
              </p>
            </div>
           
              <p>
                @if(isset($dataCompany->voucher->sendSMS))
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

<script>
function openIsInfoVoucherGift(){
  $(".popup__info-voucher").show();
};
function closeIsInfoVoucherGift(){
  $(".popup__info-voucher").hide();
};

let renderListCampaign = ``;
let renderListCampaign2 = ``;

if(listCampaignRender.length > 0){
  listCampaignRender.map((item=>{
  renderListCampaign2 += `
  <div class="form-campaign-item">
              <a href="javascript:void(0)">
                <img src="${item.image}" class="form-campaign-item-box-img bg-image"   />
              </a>
              <div class="flex-center-space content-space-campaign">
                <div class="content">
                  <div class="content--left">
                    <div class="tags_trademark">
                      Thương hiệu
                    </div>

                    <a href=${item.link} target="_blank">
                      <span>
                        ${item.name}
                      </span>
                    </a>
                  </div>
                  
                </div>
                <button class="btn-get-voucher" onclick="getVoucherPartnerLogined('${item.output}','${item.name}','${item.content}')">
                  <p>
                    Nhận voucher
                  </p>
                </button>
              </div>             
  </div>
  `;
}));
}


$("#render_form_campaign2").html(renderListCampaign2);


function close_isVoucher() {
  $(".status_isVoucher").hide();
};

function close_isVoucher_logined() {
  $(".status_isVoucher_logined").hide();
};

async function getVoucherPartnerLogined(head,name,content) { 

    $(".loading_get_voucher-logined").show();
    turnOffButtonAll('.btn-get-voucher');
    $(".gift-box-right-sceen").css("display", "none");
    const response = await callApiGetVoucher(head,userNameInputGetVoucher,phoneInputGetVoucher);
    showPopupVoucher = true;
    if(response.is_success){
      toggleContentResult();
                let voucher = renderGetVoucherSuccess(response.data.data.voucherCode);   
                let formVoucherCode = renderFormVoucherCode(response.data.data.voucherCode);  
              $("#renderFormMyVoucher").html(formVoucherCode);

              $("#renderGetVoucher").html(voucher);  
              $("#popup__info-voucher--company_name").html(name);
              $("#popup__info-voucher--content-sales").html(content);
    }else{
      let voucher = renderGetVoucherError(response.data.message);
      $("#renderGetVoucher").html(voucher);   
    }
    setTimeout(() => {
              $(".loading_get_voucher-logined").hide();
              $(".status_alert_isVoucher").show();
              turnOnButtonAll('.btn-get-voucher');
          }, 500);
  saveHistoryAfterSkinScreenAia(head);

};

</script>