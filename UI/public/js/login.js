function isVietnamesePhoneNumber(number) {

    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
  }
  function saveHistoryAfterSkinScreen() {

    var pathname = window.location.pathname;
    if( pathname == "/soida")
    {
      return;
    }
    let dataHistory = JSON.parse(sessionStorage.getItem("_t"));
    if (dataHistory) {
      var slugOutput = "";
      var saleIdOutput = "";
      var saleId = window.location.pathname.split("/")[2];
      var slug = window.location.pathname.split("/")[1];
      if (saleId && slug) {
        saleIdOutput = saleId;
        slugOutput = slug;
      }
      // if(slug === "aiavietnam"){
      //   saleIdOutput = "02838122777";
      // }
      $.ajaxSetup({
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
      });
      $.ajax({
        type: "POST",
        url: api.serve.baser_urlServer + "/" + api.serve.api_saveHistory,
        data: JSON.stringify({
          saleId: saleIdOutput,
          slug: slugOutput,
          Result: JSON.stringify(dataHistory),
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: async function (data) {
          //   sessionStorage.removeItem("_t");
        },
      });
    }
  }
  
  function register() {

    alert("3");
    var loading = document.querySelector(".status-loader-22");
  
    if (!validateFormRegister()) {
      return;
    }
    if (loading) {
      loading.classList.add("block");
    }
  
    var slugOutput = "";
    var saleIdOutput = "";
    var saleId = window.location.pathname.split("/")[2];
    var slug = window.location.pathname.split("/")[1];
    if (saleId && saleId !== "" && slug && slug !== "") {
      saleIdOutput = saleId;
      slugOutput = slug;
    }
    const valueName = $("#fullNameRegister").val(),
      valuePhone = $("#phoneNumberRegister").val();
  
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
    $.ajax({
      url: api.serve.baser_urlServer + "/" + api.serve.api_registerUser,
      type: "post",
      data: {
        email: "",
        google_id: "",
        phone: $("#phoneNumberRegister").val(),
        name: $("#fullNameRegister").val(),
        // "username": $("#fullNameRegister").val(),
        password: $("#phoneNumberRegister").val(),
        saleId: saleIdOutput,
        slug: slugOutput,
      },
      success: function (response) {
        if (response.is_success) {
          setTimeout(() => {
            if (document.body.clientWidth > 600) {
              ToggleAlert(true, "Tạo thành công, đang đăng nhập", true);
            } else {
              ToggleAlert(true, "Đăng ký thành công", true);
            }
            if (loading) {
              loading.classList.add("block");
            }
            setTimeout(() => {
              ToggleAlert(false, "", false);
              $("#nameLogin").val(valueName);
              $("#phoneNumber").val(valuePhone);
              $.ajaxSetup({
                headers: {
                  "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
              });
              $.ajax({
                url: api.serve.baser_urlServer + "/" + api.serve.api_loginServer,
                type: "post",
                data: {
                  username: valueName,
                  phoneNumber: valuePhone,
                },
                success: function (response) {
                  if (response.is_success) {
                    if (isRequireLogin == null || isRequireLogin == false) {
                      location.reload();
                    } else {
                      isRequireLogin = false;
                      saveHistory(false);
                    }
                  } else {
                    Swal.fire({
                      position: "top-center",
                      icon: "error",
                      title: "Đăng nhập thất bại",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                  }
                },
                error: function (jqXHR, textStatus, errorThrown) {},
              });
            }, 1000);
          }, 1000);
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Đăng ký thất bại",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {},
    });
  }
  function validateFormRegister() {
    var indexError = 0;
  
    var formInput = $("#formRegister")[0];
    var usserNameInput = document.getElementById("fullNameRegister");
    var errorMessageUserName = document.getElementById("fullNameRegisterError");
  
    var fullNameRegister = document.getElementById("phoneNumberRegister");
    var fullNameRegisterError = document.getElementById(
      "phoneNumberRegisterError"
    );
  
    if (usserNameInput.value == "" || usserNameInput.value.length < 1) {
      errorMessageUserName.textContent = "Bạn chưa nhập họ và tên";
      errorMessageUserName.style.display = "block";
      indexError++;
    } else {
      errorMessageUserName.style.display = "none";
    }
  
    if (fullNameRegister.value == "" || fullNameRegister.value.length < 1) {
      fullNameRegisterError.textContent = "Bạn chưa nhập tên đăng nhập";
  
      fullNameRegisterError.style.display = "block";
      indexError++;
    } else {
      fullNameRegisterError.style.display = "none";
    }
  
    return indexError < 1;
  }
  function openPageHistory() {

    

    // var base_url = window.location.origin + "/" + "lichsu-soida";
    // if(slugGlobal != null  &&  slugGlobal !== "")
    // {

    //    base_url = window.location.origin + "/" + slugGlobal +"/" + "lichsu-soida";

    // }

    var base_url = window.location.origin + "/" + "lichsu-soida";
    if(slugGlobal != null  &&  slugGlobal !== "")
    {

       base_url = window.location.origin + "/" + slugGlobal +"/" + "lichsu-soida";

    }



    window.open(base_url,"_self")
 return;
    url = url.replace(base_url, "");
    alert(url);
     window.location.href  =url;

    return;
  debugger;
  var slug = window.location.pathname.split("/")[1];

  var id = null;
  if (
    id &&
    id !== "soida" &&
    id !== "lichsu-soida" &&
    id !== "thongtin-voucher"
  ) {
    window.location.href = `/${slug}/lichsu-soida`;
  } else {
        if(slug == null || slug == "" )
        {
          window.location.href = "/lichsu-soida";
        }
        else 
        {
          window.location.href = `/${slug}/lichsu-soida`;
        }
    
  }
  }
  async function login() {
    

     var pathname = window.location.pathname;
    
    var loading = document.querySelector(".status-loader-22");
    if (validateFormLogin() == false) {
      return;
    }
  
    if (loading) {
      loading.classList.add("block");
    }
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
    await $.ajax({
      url: api.serve.baser_urlServer + "/" + api.serve.api_loginServer,
      type: "post",
      data: {
        phoneRel: $("#phoneRel").val(), 
        username: $("#nameLogin").val(),
        phoneNumber: $("#phoneNumber").val(),
      },
      success: function (response) {

        if (response.is_success) {
          
          if (isRequireLogin == null || isRequireLogin == false) {
            setTimeout(() => {
              if (loading) {
                loading.classList.remove("block");
              }
              ToggleAlert(true, "Thao tác thành công!", true);
            }, 1000);
                 setTimeout(() => {
              ToggleAlert(false, "", false);
              location.reload();
            }, 2000);
          } else {
            
            ToggleAlert(true, "Đăng nhập thành công!", true);
            var frmLogin = document.querySelector(".status-modal-account");
            if (frmLogin) {
              frmLogin.style.display = "none";
            }
            isRequireLogin = false;
            if( pathname != "/soida")
            {
              saveHistory(false);
            }
           
          }
        } else {
          if (loading) {
            loading.classList.remove("block");
          }
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Hãy kiểm tra lại thông tin tài khoản",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        debugger;
      },
    });

   
   saveHistoryAfterSkinScreen();
  }

  async function loginGame() {
   
    var loading = document.querySelector(".status-loader-22");
    if (validateFormLoginGame() == false) {
      return;
    }
    if (loading) {
      loading.classList.add("block");
    }
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
    await $.ajax({
      url: api.serve.baser_urlServer + "/" + api.serve.api_loginServerGame,
      type: "post",
      data: {
        username: $("#nameLoginGame").val(),
        phoneNumber: $("#phoneNumberGame").val(),
      },
      success: function (response) {
       
        if (response.is_success) {
      
     
          if (isRequireLogin == null || isRequireLogin == false) {
            setTimeout(() => {
              if (loading) {
                loading.classList.remove("block");
              }
              ToggleAlert(true, "Thao tác thành công!", true);
            }, 1000);
                 setTimeout(() => {
              ToggleAlert(false, "", false);
              location.reload();
            }, 2000);
          } else {
            
            ToggleAlert(true, "Đăng nhập thành công!", true);
            var frmLogin = document.querySelector(".status-modal-account");
            if (frmLogin) {
              frmLogin.style.display = "none";
            }
            isRequireLogin = false;
            saveHistory(false);
          }
        } else {
          if (loading) {
            loading.classList.remove("block");
          }
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Hãy kiểm tra lại thông tin tài khoản",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        debugger;
      },
    });
  //  saveHistoryAfterSkinScreen();
  }
  function loginGetVoucherAia() {
    var loading = document.querySelector(".status-loader-22-get-voucher-aia");
    if (validateFormLoginGetVoucher() == false) {
      return;
    }
    if (loading) {
      loading.classList.add("block");
    }
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
    $.ajax({
      url: api.serve.baser_urlServer + "/" + api.serve.api_loginServer,
      type: "post",
      data: {
        username: $("#nameLoginGetVoucher").val(),
        phoneNumber: $("#phoneNumberGetVoucher").val(),
      },
      success: async function (response) {
        userNameInputGetVoucher = $("#nameLoginGetVoucher").val();
        phoneInputGetVoucher = $("#phoneNumberGetVoucher").val();
        if (response.is_success) {
          setTimeout(() => {
            if (loading) {
              loading.classList.remove("block");
            }
            ToggleAlert(true, "Thao tác thành công!", true);
  
            setTimeout(() => {
              ToggleAlert(false, "", false);
              $(".status-modal-account-get-voucher--aia").hide();
  
              sessionStorage.setItem("userNameLogin", userNameInputGetVoucher);
              $("#name_after_login").html(userNameInputGetVoucher);
              $("#name_after_login").show();
              $("#status__text__login").hide();
  
              $(".result-list").show();
              $("#suggest-login-title").show();
              $("#suggest-login-content").hide();
              $("#suggest-login-circle").hide();
              setTimeout(() => {
                $("#title__form__get-voucher--logined").html(
                  "Hãy chọn thương hiệu mà bạn mong muốn"
                );
                checkLoginUserVoucher = true;
  
                $(".status_isVoucher_logined").show();
              }, 400);
            }, 1200);
          }, 1000);
        } else {
          if (loading) {
            loading.classList.remove("block");
          }
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Hãy kiểm tra lại thông tin tài khoản",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {},
    });
    saveHistoryAfterSkinScreen();
  };
  
  async function loginInputGetVoucherAia() {
    $("#btnLoginInputGetVoucher").attr("disabled", true);
    if (validateFormLoginInputGetVoucher() == false) {
      $("#btnLoginInputGetVoucher").attr("disabled", false);
      return;
    }
    $(".status-loader-22--input-get-voucher-aia").show();
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
    await $.ajax({
      url: api.serve.baser_urlServer + "/" + api.serve.api_loginServer,
      type: "post",
      data: {
        username: $("#nameLoginInputGetVoucher").val(),
        phoneNumber: $("#phoneNumberInputGetVoucher").val(),
      },
      success: async function (response) {
        userNameInputGetVoucher = $("#nameLoginInputGetVoucher").val();
        phoneInputGetVoucher = $("#phoneNumberInputGetVoucher").val();
    
        const responseGetVoucher = await callApiGetVoucher(comapany_head, userNameInputGetVoucher, phoneInputGetVoucher);
        $(".status-loader-22--input-get-voucher-aia").hide();
        $(".status-modal-input-get-voucher--aia").hide();
            if(responseGetVoucher.is_success){
              let voucher = renderGetVoucherSuccess(responseGetVoucher.data.data.voucherCode);
              let formVoucherCode = renderFormVoucherCode(responseGetVoucher.data.data.voucherCode);  
              $("#renderFormMyVoucher").html(formVoucherCode);
              $("#renderGetVoucher").html(voucher);
  
              $("#popup__info-voucher--company_name").html(company_name);
              $("#popup__info-voucher--content-sales").html(contentSales);
            }else {
                let voucher = renderGetVoucherError(responseGetVoucher.data.message);
                $("#renderGetVoucher").html(voucher);
            };
              
            $(".status_alert_isVoucher").show();                     
            $("#btnLoginInputGetVoucher").attr("disabled", false);
        
            if (response.is_success) {  
              sessionStorage.setItem("userNameLogin", userNameInputGetVoucher);          
              $("#name_after_login").html(userNameInputGetVoucher);
              $("#name_after_login").show();
              toggleContentResult();
              // $('#title__form__get-voucher--logined').html("Hãy chọn thương hiệu mà bạn mong muốn");
              checkLoginUserVoucher = true;
        }
         else {
  
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Hãy kiểm tra lại thông tin tài khoản",
              showConfirmButton: false,
              timer: 1000,
            });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {},
    });
    
    saveHistoryAfterSkinScreenAia(comapany_head);
  
  };
  
  function validateFormLogin() {
 
    var indexError = 0;
    var formInput = $("#formLogin")[0];
    var usserNameInput = document.getElementById("nameLogin");
    var errorMessageUserName = document.getElementById("fullNameerrorMesssage");
    if (usserNameInput.value == "" || usserNameInput.value.length < 1) {
      errorMessageUserName.textContent = "Hãy cho chúng tôi biết tên";
  
      errorMessageUserName.style.display = "block";
      indexError++;
    } else {
      errorMessageUserName.style.display = "none";
    }
  
    var phoneNumber = document.getElementById("phoneNumber");
    var errorMessagePassword = document.getElementById(
      "phoneNumbererrorMesssage"
    );
  
    if (phoneNumber.value == "" || phoneNumber.value.length < 1) {
      errorMessagePassword.textContent = "Bạn chưa nhập số điện thoại";
      errorMessagePassword.style.display = "block";
      indexError++;
    }else if(isVietnamesePhoneNumber(phoneNumber.value) == false){
   
      errorMessagePassword.style.display = 'block';
      errorMessagePassword.innerHTML = "Số điện thoai không đúng, số điện thoại gồm 10 chữ số";
      indexError++;
      // if(phoneNumber.value.length  > 6)
      // {
  
      //   indexError++;
      //     errorMessagePassword.style.display = 'block';
      //     errorMessagePassword.innerHTML = "Sai số điện thoại"
      // }else{
      //       errorMessagePassword.style.display = 'none';
      //   errorMessagePassword.innerHTML = ""
      // }
    }
    else {
      errorMessagePassword.style.display = "none";
    }
  
  

    return indexError < 1;
  }

  function validateFormLoginGame() {
 
    var indexError = 0;
    var formInput = $("#formLogin")[0];
    var usserNameInput = document.getElementById("nameLoginGame");
    var errorMessageUserName = document.getElementById("fullNameerrorMesssageGame");
    if (usserNameInput.value == "" || usserNameInput.value.length < 1) {
      errorMessageUserName.textContent = "Hãy cho chúng tôi biết tên";
  
      errorMessageUserName.style.display = "block";
      indexError++;
    } else {
      errorMessageUserName.style.display = "none";
    }
  
    var phoneNumber = document.getElementById("phoneNumberGame");
    var errorMessagePassword = document.getElementById(
      "phoneNumbererrorMesssageGame"
    );
  
    if (phoneNumber.value == "" || phoneNumber.value.length < 1) {
      errorMessagePassword.textContent = "Bạn chưa nhập số điện thoại";
      errorMessagePassword.style.display = "block";
      indexError++;
    }else if(isVietnamesePhoneNumber(phoneNumber.value) == false){
   
      errorMessagePassword.style.display = 'block';
      errorMessagePassword.innerHTML = "Số điện thoai không đúng, số điện thoại gồm 10 chữ số";
      indexError++;
      // if(phoneNumber.value.length  > 6)
      // {
  
      //   indexError++;
      //     errorMessagePassword.style.display = 'block';
      //     errorMessagePassword.innerHTML = "Sai số điện thoại"
      // }else{
      //       errorMessagePassword.style.display = 'none';
      //   errorMessagePassword.innerHTML = ""
      // }
    }
    else {
      errorMessagePassword.style.display = "none";
    }
  
  

    return indexError < 1;
  }
  function validateFormLoginGetVoucher() {
    var indexError = 0;
    var usserNameInput = document.getElementById("nameLoginGetVoucher");
    var errorMessageUserName = document.getElementById("fullNameerrorMesssage1");
    if (usserNameInput.value == "" || usserNameInput.value.length < 1) {
      errorMessageUserName.textContent = "Hãy cho chúng tôi biết tên";
  
      errorMessageUserName.style.display = "block";
      indexError++;
    } else {
      errorMessageUserName.style.display = "none";
    }
  
    var phoneNumber = document.getElementById("phoneNumberGetVoucher");
    var errorMessagePassword = document.getElementById(
      "phoneNumbererrorMesssage1"
    );
  
    if (phoneNumber.value == "" || phoneNumber.value.length < 1) {
      errorMessagePassword.textContent = "Bạn chưa nhập số điện thoại";
      errorMessagePassword.style.display = "block";
      indexError++;
    }else if(isVietnamesePhoneNumber(phoneNumber.value) == false){
      if(phoneNumber.value.length > 6)
      {
  
        indexError++;
          errorMessagePassword.style.display = 'block';
          errorMessagePassword.innerHTML = "Sai số điện thoại"
      }else{
          errorMessagePassword.style.display = 'none';
      errorMessagePassword.innerHTML = ""
      }
    } else {
      errorMessagePassword.style.display = "none";
    }
  
    return indexError < 1;
  }
  function validateFormLoginInputGetVoucher() {
    var indexError = 0;
    var usserNameInput = document.getElementById("nameLoginInputGetVoucher");
    var errorMessageUserName = document.getElementById("fullNameerrorMesssage2");
    if (usserNameInput.value == "" || usserNameInput.value.length < 1) {
      errorMessageUserName.textContent = "Hãy cho chúng tôi biết tên";
  
      errorMessageUserName.style.display = "block";
      indexError++;
    } else {
      errorMessageUserName.style.display = "none";
    }
  
    var phoneNumber = document.getElementById("phoneNumberInputGetVoucher");
    var errorMessagePassword = document.getElementById(
      "phoneNumbererrorMesssage2"
    );
  
    if (phoneNumber.value == "" || phoneNumber.value.length < 1) {
      errorMessagePassword.textContent = "Bạn chưa nhập số điện thoại";
      errorMessagePassword.style.display = "block";
      indexError++;
    }else if(isVietnamesePhoneNumber(phoneNumber.value) == false){
      if(phoneNumber.value.length > 6)
      {
        indexError++;
          errorMessagePassword.style.display = 'block';
          errorMessagePassword.innerHTML = "Sai số điện thoại"
      }else{
          errorMessagePassword.style.display = 'none';
          errorMessagePassword.innerHTML = ""
      }
    } else {
      errorMessagePassword.style.display = "none";
    }
  
    return indexError < 1;
  }
  function questionLogout() {
    logoutUser();
  }
  function directToBegin(){
    // var baser_url = window.location.href;
    // let bare_urlNew = baser_url.replace('/ket-qua','');
    // bare_urlNew  = bare_urlNew.replace('/lichsu-soida','');
    // bare_urlNew  = bare_urlNew.replace('/thongtin-voucher','');
    // bare_urlNew  = bare_urlNew.replace('/nhan-de-xuat-cham-soc-da','');
    
    // window.location.href = bare_urlNew;
    var urldirect = window.location.origin + "/" +window.location.pathname.split("/")[1];

    // location.reload();
    window.open(urldirect,"_self")
  }
  function logoutUser() {
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
    $.ajax({
      url: api.serve.baser_urlServer + "/" + api.serve.api_logoutUser,
      type: "post",
      success: function (response) {
        if (response.is_success) {
        sessionStorage.removeItem("userNameLogin");
          directToBegin();
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Có lỗi đăng xuất",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {},
    });
  }