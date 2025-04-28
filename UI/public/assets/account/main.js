function validate() {
    var indexeror = 0;
    // var txtfullName = $("#txtfullName").val();
    // if (txtfullName == "") {
    //     $("#txtfullNameError").show();
    //     indexeror++;
    // } else {
    //     $("#txtfullNameError").hide();

    // }

    var txtUserName = $("#txtUserName").val();
    if (txtUserName == "") {
        $("#txterrorUserName").show();
        indexeror++;
    } else {
        $("#txterrorUserName").hide();
    }


    var txtPassword = $("#txtPassword").val();
    if (txtPassword == "") {
        $("#txterrorPassword").show();
        indexeror++;
    } else {
        $("#txterrorPassword").hide();
    }


    var repeatPasswrod = $("#txtRePassword").val();
    if (repeatPasswrod == "") {
        $("#txtRePasswordError").show();
        indexeror++;
    } else {
        $("#txtRePasswordError").hide();
    }

    if (repeatPasswrod != txtPassword) {
        $("#txtErrorRepeatAgain").show();
        indexeror++;
    } else {
        $("#txtErrorRepeatAgain").hide();
    }

    var txtphoneNumberError = $("#txtphoneNumber").val();
    if (txtphoneNumberError == "") {
        $("#txtphoneNumberError").show();
        indexeror++;
    } else {
        $("#txtphoneNumberError").hide();
    }


    return indexeror < 1;
}

function submitRequest() {
    $("#messageError").hide();
    if (validate() == false)
        return;



    $(".btnRegister").hide();
    $(".btnResterLoading").hide();

    $('#popupResult').modal('show');



    var txtfullName = $("#txtfullName");
    txtfullName.val($("#txtUserName").val());

    var form = $("#formrequest");
    $.ajax({
        url: "https://api-soida.applamdep.com/api/plugin-add-company-auto-wa",
        type: "post",
        data: form.serialize(),
        success: function(response) {
           
            if (response.is_success) {
                $("#formRequest").hide();
                // $("#result").show();

                $('#popupResult').modal('toggle');
              
                sessionStorage.setItem("dataSlug",$("#txtUserName").val());
                sessionStorage.setItem("dataFontEnd", JSON.stringify(response.data.feature))
                window.location.href = "/mo-tai-khoan-thanh-cong";

            } else {

                sessionStorage.setItem("hreftSoiDa", "Smith");
                sessionStorage.setItem("hrefTrangDiem", "Smith");
                sessionStorage.setItem("hrefSalonToc", "Smith");

                

                $(".btnRegister").show();
                $(".btnResterLoading").hide();
                $("#txtErrorMessage").text(response.message);
                $("#messageError").show();
                $('#popupResult').modal('toggle');
            }


        },
        error: function(jqXHR, textStatus, errorThrown) {

        }
    });

}

function genslug() {

    var txteSlug = $("#txteSlug");
    txteSlug.val($("#txtUserName").val());

}

$(document).ready(function() {

    var width = document.body.clientWidth;
    if (width > 992) {
        $("#modelBody").addClass("modal-lg");


    } else {
        $("#modelBody").addClass("modal-md");
        $("#imageBackground").attr("src", "./asset/mobile/3.png");

    }
    // $('#popupOpen').modal('show');
});