
function drawResultAI() {

        var textQuestion =  $("#idGeneralResult").text() +  $("#danhsachketquatungphan").text() 
          + "; output" + dataConfigAI.question   +  " " + dataConfigAI.noted;

              var historyId = sessionStorage.historyId;
        try {
        $.ajaxSetup({
          headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
          },
        });
          $.ajax({
              type: "POST",
              data: {
                "historyId": historyId,
                  "question": textQuestion
              },
              url: "https://ai.exomiyo.com/getResultAI",
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





