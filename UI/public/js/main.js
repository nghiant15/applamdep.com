  // function validateFormLogin () 
// {

//     var indexError = 0;

//     var formInput = $("#formLogin")[0];
//     var usserNameInput =formInput.getElementsByClassName("userName")[0];
//     var errorMessageUserName =formInput.getElementsByClassName("errorMessageUserName")[0];

//     if( usserNameInput.value =="" || usserNameInput.value.length <1)
//     {
//         errorMessageUserName.textContent =  "Bạn chưa nhập tên đăng nhập";

//         errorMessageUserName.style.display = "block";
//         indexError ++;
//     }
//     else 
//     {
//         errorMessageUserName.style.display = "none";
//     }


//     var usserPasswordInput =formInput.getElementsByClassName("password")[0];
//     var errorMessagePassword =formInput.getElementsByClassName("errorMessagePassword")[0];

//     if( usserPasswordInput.value =="" || usserPasswordInput.value.length <1)
//     {
//         errorMessagePassword.textContent =  "Bạn chưa nhập mật khẩu đăng nhập";
//         errorMessagePassword.style.display = "block";
//         indexError ++;
//     }
//     else 
//     {
//         errorMessagePassword.style.display = "none";
//     }


//     return indexError <1;
// }

// function validateFormRegister () 
// {

//     var indexError = 0;

//     var formInput = $("#formRegister")[0];
//     var usserNameInput =formInput.getElementsByClassName("userName")[0];
//     var errorMessageUserName =formInput.getElementsByClassName("errorMessageUserName")[0];

//     if( usserNameInput.value =="" || usserNameInput.value.length <1)
//     {
//         errorMessageUserName.textContent =  "Bạn chưa nhập tên đăng nhập";

//         errorMessageUserName.style.display = "block";
//         indexError ++;
//     }
//     else 
//     {
//         errorMessageUserName.style.display = "none";
//     }


//     var usserPasswordInput =formInput.getElementsByClassName("password")[0];
//     var errorMessagePassword =formInput.getElementsByClassName("errorMessagePassword")[0];

//     if( usserPasswordInput.value =="" || usserPasswordInput.value.length <1)
//     {
//         errorMessagePassword.textContent =  "Bạn chưa nhập mật khẩu đăng nhập";
//         errorMessagePassword.style.display = "block";
//         indexError ++;
//     }
//     else 
//     {
//         errorMessagePassword.style.display = "none";
//     }
//     return indexError <1;


// }

// function login ()
// { 
//     if(validateFormLogin() ==false)
//     {
//         return;
//     }
//     else 

//     $.ajax({
//         url: api.baser_url + ""+ api.api_loginUser,
//         type: "post",
//         data: {
//                 "username": $("#userNameLogin").val(),
//                 "password": $("#passwordLogin").val()
//         } ,
//         success: function (response) {
          

//             if(response.is_success)
//             {
           
//                 sessionStorage.setItem('dataUser', JSON.stringify(response) );
            
               
//                     Swal.fire(
//                         {
//                         position: 'top-center',
//                         icon: 'success',
//                         title: 'Đăng nhập thành công',
//                         showConfirmButton: false,
//                         timer: 1000
//                     }).then(() => {
//                             $('#loginModal').modal('hide');
//                             $('#signUpModal').modal('hide');
                        
//                             $(".login").hide();
//                             $("#profileName").textContent= response.data.data.Name;
//                             $("#profileName").show();
//                             location.reload();
//                     });               
//             }
//             else
//             {
//                 Swal.fire({
//                     position: 'top-center',
//                     icon: 'error',
//                     title: 'Đăng nhập thất bại',
//                     showConfirmButton: false,
//                     timer: 1000
//                 })

//             }
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
           
//         }
//     });

   
    
    
   
//  }

//  function register ()

// { 
//     if(validateFormRegister() ==false)
//     {
//         return
//     }
//     else 
//     $.ajax({
//         url: api.baser_url + ""+ api.api_addUrl,
//         type: "post",
//         data: {
//             "name": $("#userNameRegister").val(),
//             "email": "",
//             "phone": "",
//             "Address": "",
//             "Company_Id": "6134e13410bfea17bff4000d",
//             "username": $("#userNameRegister").val(),
//             "password": $("#passwordRegister").val()
//         } ,

     		
//         success: function (response) {
           
          

//             if(response.is_success)
//             {
//                 $('#loginModal').modal('hide');
//                 $('#signUpModal').modal('hide');
//                 $("#profileName").textContent  = "Nguyễn Trường Tộ";
//                 $(".login").hide();
//                 Swal.fire({
//                     position: 'top-center',
//                     icon: 'success',
//                     title: 'Tạo thành công, vui lòng đăng nhập lại',
//                     showConfirmButton: false,
//                     timer: 1000
//                 })

//                 setTimeout(() => {
//                     openForm(2);
//                 }, 1200);
//             }
//             else
//             {
//                 Swal.fire({
//                     position: 'top-center',
//                     icon: 'error',
//                     title: 'Tạo thất bại',
//                     showConfirmButton: false,
//                     timer: 1000
//                 })

//             }
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
           
//         }
//     });
//  }


function openForm (status)
{


    if(status ==1)
    {
        $('#loginModal').modal('hide');
        $('#signUpModal').modal('show');

    }
    else 
    
    {
        $('#loginModal').modal('show');
        $('#signUpModal').modal('hide'); 
    }

}
var globalUser = null;

document.addEventListener("DOMContentLoaded", function(){

    
     checkslug();
     var urlcurrent =  window.location.href;

     if(!urlcurrent.includes("ket-qua"))
     {
          $(".scoreBeauty").show();
     }

     
    
    var dataUser =  sessionStorage.getItem("dataUser");

    var tips = document.getElementById("tips");

    var isHasTips = sessionStorage.getItem("tips");
 

    // if(isHasTips || isHasTips ==true)
    // {
    //     if(tips != null)
    //     {
         
    //         tips.style.display ="none";
    //     }     
    // }
    // else 
    // { 
    //     if(tips != null)
    //     {
           

    //         setTimeout(() => {
    //           tips.style.display ="block";
    //           sessionStorage.setItem("tips", true);
    //         }, 3000);
           
    //     }
       
        

        
    // }
 
    setTimeout(() => {
      if(tips)
      {
        tips.style.display ="block";
        sessionStorage.setItem("tips", true);
      }
      
 
    }, 2000);
   
    if(dataUser != null)
    {
        
        var objectreponse = JSON.parse(dataUser);
        globalUser = objectreponse.data.data;
        $(".profilearea").show();
        $(".areaLogin").hide();
        $("#profileName").text(globalUser.username);
    

        
    }

});
function logout () 
{


    if(globalUser != null)
    {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
   
        });
    }
    sessionStorage.clear();

    var urldirect = window.location.origin + "/" +window.location.pathname.split("/")[1];

    // location.reload();
    window.open(urldirect,"_self")
}

function getInfomationUser(data) 
{
    var tokenHeader = data;

    $.ajax({
        url: api.baser_url + ""+ api.api_getInfo,
        type: "post",
        headers: {
            Authorization: 'Bearer '+tokenHeader
        },
         success: function (response) {
            bindUser(response.data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           
        }
    });
}



  function checkslug ( ) {
    
    return;
    var dataCompany =  sessionStorage.getItem("dataCompany");
    // if(dataCompany != null)
    // {
    //     return;;
    // }
    $.ajax({
        url: api.baser_url + ""+ api.api_CheckUrl,
        type: "post",
        data: {
            "slug": "DashuVietNam"
            
        } ,
         success: function (response) {
         
            if(response.is_success)
            {
            
               var dataCompanyItem =  response.data;
               sessionStorage.setItem("dataCompany",JSON.stringify(dataCompanyItem));
            }
            else
            {

            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           
        }
    });

  }



function updateUser ( ) {
    
    var dataUser =  sessionStorage.getItem("dataUser");
    var objectreponse = JSON.parse(dataUser);


    $.ajax({
        url: api.baser_url + ""+ api.api_updateUser,
        type: "post",
        headers: {
            Authorization: 'Bearer '+objectreponse.data.token
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



  function openHomePage() {

    if(location.href.includes("ket-qua") )
    {
      alert("3");
        // sessionStorage.setItem("lastname", "Smith");
    }

    if( typeof slugGlobal === "undefined" || slugGlobal == null )
    {
     window.location.href = "/";

    }
    else
    {
        window.location.href = "/"+slugGlobal;
    }



}


function openHistoryPage() {

    if( typeof slugGlobal === "undefined" || slugGlobal == null )
    {
     window.location.href = "/lich-su-soi-da";

    }
    else
    {
        window.location.href = "/"+slugGlobal +"/lich-su-soi-da";
    }


}



function openAccountPage() {

    if( typeof slugGlobal === "undefined" || slugGlobal == null )
    {
     window.location.href = "/thong-tin-tai-khoan";

    }
    else
    {
        window.location.href = "/"+slugGlobal +"/thong-tin-tai-khoan";
    }


}


function backPre
() {

    window.location=document.referrer;
    
}   

function loginwithGoogle()
{
  
    $("#googleSignin").trigger('click');
}





function ToggleDisplayClass(myClass, status) {
 
    if (document.querySelector(myClass)) {
      if (status) {
        document.querySelector(myClass).style.display = "block";
      } else {
        document.querySelector(myClass).style.display = "none";
      }
    }
  }


  function ToggleDisplayLoginbook(myClass, status, title = '') {

    var lastSegement = window.location.pathname.split("/").pop();

    var typeLogin = null;
    if( lastSegement == "ket-qua" )
    {
       title = 'Để Xem kết luận chi tiết & tư vấn tổng quát';
       typeLogin ="2";
    }

    if(title =="Để xem lịch sử soi da online")
    {
      typeLogin ="3";
    }

    if(title =="Để tư vấn da ngay & 100% Miễn Phí")
    {
      typeLogin ="1";
    }

    if(title =="Để tư vấn da ngay & 100% Miễn Phí")
    {
      typeLogin ="1";
    }
    title = "ĐỂ LẠI THÔNG TIN, ĐỂ TẢI SÁCH MIỄN PHÍ";

    if( title != '')
    {
        $("#titleLogin").html(title);
    }
    var urlUpdate = api.serve.baser_urlServer + "/" + "typeLogin/setType";
  
    $.ajax({
      type: "post",
      url: urlUpdate,
      data: {
        typeLogin: typeLogin
      },
  
      success: function (data) {
        if (data.is_success) {         
        }
      },
      error: function (data) {},
    });


      if (document.querySelector(myClass)) {
        if (status) {
          document.querySelector(myClass).style.display = "block";
        } else {
          document.querySelector(myClass).style.display = "none";
        }
      }
  }

  function ToggleDisplayLogin(myClass, status, title = '') {
  

    var lastSegement = window.location.pathname.split("/").pop();

    var typeLogin = null;
    // if( lastSegement == "ket-qua" )
    // {
    //    title = 'Để Xem kết luận chi tiết & tư vấn tổng quát';
    //    typeLogin ="2";
    // }
    if( lastSegement == "ket-qua" )
    {
       title = title;
       typeLogin ="2";
    }
  

    if(title =="Để xem lịch sử soi da online")
    {
      typeLogin ="3";
    }

    if(title =="Để tư vấn da ngay & 100% Miễn Phí")
    {
      typeLogin ="1";
    }

    if(title =="Để tư vấn da ngay & 100% Miễn Phí")
    {
      typeLogin ="1";
    }

    if( title != '')
    {
        $("#titleLogin").html(title);
    }
    var urlUpdate = api.serve.baser_urlServer + "/" + "typeLogin/setType";
  
    $.ajax({
      type: "post",
      url: urlUpdate,
      data: {
        typeLogin: typeLogin
      },
  
      success: function (data) {
        if (data.is_success) {         
        }
      },
      error: function (data) {},
    });


      if (document.querySelector(myClass)) {
        if (status) {
          document.querySelector(myClass).style.display = "block";
        } else {
          document.querySelector(myClass).style.display = "none";
        }
      }
  }

  function ToggleDisplayLogin2(myClass, status, title = '') {

    var lastSegement = window.location.pathname.split("/").pop();

    var typeLogin = null;
    // if( lastSegement == "ket-qua" )
    // {
    //    title = 'Để Xem kết luận chi tiết & tư vấn tổng quát';
    //    typeLogin ="2";
    // }

    if(title =="Để xem lịch sử soi da online")
    {
      typeLogin ="3";
    }

    if(title =="Để tư vấn da ngay & 100% Miễn Phí")
    {
      typeLogin ="1";
    }

    if(title =="Để tư vấn da ngay & 100% Miễn Phí")
    {
      typeLogin ="1";
    }

    if( title != '')
    {
        $("#titleLogin").html(title);
    }
    var urlUpdate = api.serve.baser_urlServer + "/" + "typeLogin/setType";
  
    $.ajax({
      type: "post",
      url: urlUpdate,
      data: {
        typeLogin: typeLogin
      },
  
      success: function (data) {
        if (data.is_success) {         
        }
      },
      error: function (data) {},
    });


      if (document.querySelector(myClass)) {
        if (status) {
          document.querySelector(myClass).style.display = "block";
        } else {
          document.querySelector(myClass).style.display = "none";
        }
      }
  }



  function ToggleDisplayFormFollow(myClass, status) {

      // var lastSegement = window.location.pathname.split("/").pop();

      // if (status) {
      //   document.querySelector(myClass).style.display = "block";
      // } else {
      //   document.querySelector(myClass).style.display = "none";
      // }
      // ToggleDisplayLogin('.status-modal-account',true,'ĐỂ XEM KẾT LUẬN CHI TIẾT & TƯ VẤN TỔNG QUÁT');
      ToggleDisplayLogin('.status-modal-account',true,"ĐỂ XEM LỊCH SỬ SOI DA ONLINE");
  }

  function ToggleDisplayFormFollow2(myClass, status) {

    // var lastSegement = window.location.pathname.split("/").pop();

    // if (status) {
    //   document.querySelector(myClass).style.display = "block";
    // } else {
    //   document.querySelector(myClass).style.display = "none";
    // }
    ToggleDisplayLogin2('.status-modal-account',true,'ĐỂ TƯ VẤN DA NGAY & 100% MIỄN PHÍ');
    // ToggleDisplayLogin('.status-modal-account',true,"ĐỂ XEM LỊCH SỬ SOI DA ONLINE");
}



function ToggleDisplayFormFollow3(myClass, status) {

  // var lastSegement = window.location.pathname.split("/").pop();

  // if (status) {
  //   document.querySelector(myClass).style.display = "block";
  // } else {
  //   document.querySelector(myClass).style.display = "none";
  // }
  ToggleDisplayLogin2('.status-modal-account',true,'ĐỂ XEM KẾT LUẬN CHI TIẾT & TƯ VẤN TỔNG QUÁT');
  // ToggleDisplayLogin('.status-modal-account',true,"ĐỂ XEM LỊCH SỬ SOI DA ONLINE");
}

  function updateInfoUser() {
  

    var index = 0;
  
    var fullName = $("#myNameInfo").val();
    if (fullName == null || fullName.replace(/\s/g, "") == "") {
      $("#myNameInfoError").text("Họ và tên không được bỏ trống !");
      $("#myNameInfoError").show();
      index++;
    } else {
      $("#myNameInfoError").hide();
    }
  
    let phoneNumber = $("#idphoneNumber").val();
    if (phoneNumber == null || phoneNumber.replace(/\s/g, "") == "") {
      $("#idphoneNumberError").text("Số điện thoại không được bỏ trống");
      $("#idphoneNumberError").show();
      index++;
    } else if (isNaN(phoneNumber) || phoneNumber.length < 10) {
      $("#idphoneNumberError").text("Số điện thoại không đúng");
      $("#idphoneNumberError").show();
      index++;
    } else {
      $("#idphoneNumberError").hide();
    }
  
    if (index > 0) {
      return;
    }
  
    
    var loadingCurrent = document.querySelector(
      ".status-loader-22-info"
    );
  
    if (loadingCurrent) {
      loadingCurrent.style.display = "block";
    }
    
  
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
  
    var urlUpdate = api.serve.baser_urlServer + "/" + api.api_updateUser;
    var frm = $("#frmUpdateUser");
    $.ajax({
      type: "post",
      url: urlUpdate,
      data: frm.serialize(),
  
      success: function (data) {
        if (data.is_success) {
          setTimeout(() => {
                loadingCurrent.style.display = "none";
                ToggleAlert(true, "Cập nhật thành công!", true)
                
                setTimeout(() => {
                ToggleAlert(false, "", false);
                $('.status-modal-information').hide();
                }, 1000);

                 

          }, 1000);

          setTimeout(() => {
            location.reload();
            }, 1500);   
        }
      },
      error: function (data) {},
    });
  
    // $("#btnrewardLoading").show();
  }

  function openHomePage ()
  {

    if(location.href.includes("ket-qua") )
    {
         $("#buttonRecomand").show();

         $("#subscribleId").hide();

            $(".blurdiv").removeClass( "blurdiv" );

            setTimeout(() => {
              document.getElementById('viewhistory').scrollIntoView();
              
            }, 300);
        return;
    }

    if(location.href.includes("lichsu"))
    {
      sessionStorage.setItem("showRecomend",true);
      var locationHost = window.location.origin;
      const firstPath = window.location.pathname.split('/')[1] +"/ket-qua";


        window.open(locationHost+"/" +firstPath,"_self");
        return;
    }
    // sessionStorage.getItem("showRecomend");


    var locationHost = window.location.origin;
    const firstPath = window.location.pathname.split('/')[1]; 

    if(firstPath == null || firstPath == "")
    {
      window.open(locationHost);
    }
    else 
    {
      window.open(locationHost+"/" +firstPath,"_self");
    }
   
    
    }
    function openSoida() {

      var locationHost = window.location.origin;
    const firstPath = window.location.pathname.split('/')[1]; 

    if(firstPath == null || firstPath == "")
    {
      window.open(locationHost);
    }
    else 
    {
      window.open(locationHost+"/" +firstPath,"_self");
    }
    }


    function addClickZalo2(typeConnection) {

      $.ajaxSetup({
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
      });
      $.ajax({
        type: "post",
        url: api.serve.baser_urlServer + "/addtype2",
        data: JSON.stringify({
          connectionType: typeConnection
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: async function (data) {
       
        },
        complete: function (data) {},
      });
    }

