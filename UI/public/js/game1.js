function showRule() {
    var tips = document.getElementById("tipsGuildLine");
    tips.style.display = "block";
}

function hidetipGame() {
    var tips = document.getElementById("tipsGuildLine");
    tips.style.display = "none"; 
    var tips = document.getElementById("tips");
    tips.style.display = "block";
}

function registerGame(success = true) {
    
    var fullNameInput = document.getElementById("fullNamePoupGame").value;

    var phoneInput = document.getElementById("phoneNumberPoupGame").value;

    if(fullNameInput=="")
    {
        $("#fullNamePoupGameError").show();
    }
    else 
    {
        $("#fullNamePoupGameError").hide();
    }


    if(phoneInput=="")
    {
      
        $("#phoneNumberPoupGameErro").show();
    }
    else 
    {
        $("#phoneNumberPoupGameErro").hide();


    }
    handleLoginGame();
}


async function handleLoginGame() {
   
    var loading = document.querySelector(".status-loader-22");
   
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
        username: $("#fullNamePoupGame").val(),
        phoneNumber: $("#phoneNumberPoupGame").val(),
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
                    }
                     else {
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
      
      },
    });
  //  saveHistoryAfterSkinScreen();
  }



  async function handleLoginView() {
   
  


    

    Swal.fire({
    title: 'Đang xử lý...',
    position: 'bottom-center',
    html: 'Vui lòng chờ',
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
        Swal.showLoading()
    }
    });

   

    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
    await $.ajax({
      url: api.serve.baser_urlServer + "/" + api.serve.api_loginServerGame,
      type: "post",
      data: {
        username: $("#txtNameCon").val(),
        phoneNumber: $("#txtPhoneCon").val(),
      },
      success: function (response) {
      
        Swal.close();
                    if (response.is_success) {
                       
                        Swal.fire({
                            position: 'top-center',
                            icon: 'success',
                            title: 'Thao tác thành công',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        .then(function () {
                             sessionStorage.setItem("popupReward", true);
                             location.reload();
                        });
                        $("#subscribleId").hide();
                        isRequireLogin = false;
                        saveHistory(false);
                }
      },
      error: function (jqXHR, textStatus, errorThrown) {
      
      },
    });

  }

function CloseFormPopupGame ()
{   
    $('#popupGame').hide();
}

function CloseFormPopupGameFail () {

    $('#popupGameFailed').hide();
}

function showPupupSuccess() 
{
    $('#popupGame').show();
}


function showPupupFailed() 
{
    $('#popupGameFailed').show();
}

// setTimeout(() => {
    
//     displayGame();
    
// }, 1000);

function  displayGameReuslt()
{
    if(turnOnGame ==false)
    {
        return;
    }
    if(isLogin)
    {
        return;

    }
    if(successGameTrue ==true)
    {
        showPupupSuccess();
    }
    else 
    {
        showPupupFailed();
    }

    
}


$( document ).ready(function() {

    var urlCurrent = window.location.href;


    if(urlCurrent.includes("ket"))
    {

        setTimeout(() => {
            displayGameReuslt();
        }, 4000);
        return;
    }
    if(turnOnGame ==true)
    {
        $("#poupgameJoin").show();
    }
    else 
    {
       
    }

    // setTimeout(() => {
    //     var tips = document.getElementById("tips");
    //    if(tips != null)
    //     {
    //         tips.style.display ="block";
    //         sessionStorage.setItem("tips", true);
        
    //     }
        
    // }, 3000);
});