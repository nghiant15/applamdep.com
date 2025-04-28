
function drawResultAI() {

        var textQuestion =  $("#idGeneralResult").text() +  $("#danhsachketquatungphan").text() 
          + "; output" + dataConfigAI.question   +  " " + dataConfigAI.noted;
        try {
        $.ajaxSetup({
          headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
          },
        });
          $.ajax({
              type: "POST",
              data: {
                  "question": textQuestion
              },
              url: "https://applamdep.com/getResultAI",
              success: function(data) {
                    Swal.close();
                    document.getElementById("contentResultAI").innerHTML +=  data;
                  
              },
              error: function(error) {
              
              }
          });
        } catch (e) {
          

        }

}





