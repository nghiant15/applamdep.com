// function getHistory(data) 
// {
//     var tokenHeader = data;

//     $.ajax({
//         url: api.baser_url + ""+ api.api_getHistory,
//         type: "post",saveHistory
//         headers: {
//             Authorization: 'Bearer '+tokenHeader
//         },
//          success: function (response) {
             
//             drawHistory(response.data);
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
           
//         }
//     });
// }


// function drawHistory (dataHistory)  {
  
//     var indexRow = 0;
//     dataHistory.forEach(itemHistory => {
//             var datetext = itemHistory.Create_Date;
//             datetextArray = datetext.split(" ");
//             console.log(itemHistory);   
            
//             indexRow ++;
//              var htmlTemplate = '\
//             <tr>\
//             <td>'+indexRow+ '</td>\
//             <td>'+datetextArray[0]+'</td>\
//             <td>'+datetextArray[1]+'</td>';
//             htmlTemplate+=  '<td>';
            
//             htmlTemplate +='  <a onclick="openHistory(' +"'" +itemHistory._id+ "'" +')"> Xem chi tiết</a>';
//             htmlTemplate+= '</td></tr>';
//             $('#historySkin tr:last').after(htmlTemplate);
//     });

    

//   }

// //   function openHistory(itemHistory) 
// //   {
// //       var hrefLocation = "/detailHistory.html?id=" +itemHistory;
// //      $('#popupiframe').attr('src', hrefLocation);
// //      $("#historyModel").modal("show");


// //   }

//   function openHistory(itemHistory) 
//   {
//     var hrefLocation = "/lich-su-soi-da/" +itemHistory;
//     if( typeof slugGlobal === "undefined" || slugGlobal == null )
//     {
       

//     }
//     else 
//     {
//      hrefLocation ='/'+slugGlobal+ "/lich-su-soi-da/" +itemHistory;
//     }
   
//      $('#popupiframe').attr('src', hrefLocation);
//      $("#historyModel").modal("show");
//   }


function saveHistory(isRedirect, result = null) {
  


  var loading = document.querySelector(".status-loader-22");
  
  if (result == null) {
    if (sessionStorage.getItem("_t") === null) {
      return;
    }
   let dataHistory = JSON.parse(sessionStorage.getItem("_t"));
  result = dataHistory;
}

var slugOutput = null;
var saleIdOutput = null;
var saleId = window.location.pathname.split("/")[2];
var slug = window.location.pathname.split("/")[1];
if (slug && slug !== "") {
  slugOutput = slug;
};


// if (saleId && saleId !== "" && saleId !== "soida") {
//   saleIdOutput = saleId;
// };
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
    Result: JSON.stringify(result),
 

  }),
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: async function (data) {
     return;
    

  },
  complete: function (data) {
    setTimeout(() => {
              
            
              var base_url = window.location.origin + "/" + "soida/ket-qua";
              if(slugGlobal != null  &&  slugGlobal !== "")
              {
                  base_url = window.location.origin + "/" + slugGlobal +"/" + "ket-qua";
          
              }
              if(slugGlobal =="book")
              {
                var bookSlug =  window.location.pathname.split("/").pop();
                base_url = window.location.origin + "/" + slugGlobal +"/"+ bookSlug +"/" + "ket-qua";
              }
              window.open(base_url,"_self")
          
          
          }, 1000);


  },
});
}
function getHistory(data) {
  var tokenHeader = data;

  $.ajax({
    url: api.baser_url + "" + api.api_getHistory,
    type: "post",
    headers: {
      Authorization: "Bearer " + tokenHeader,
    },
    success: function (response) {
      drawHistory(response.data);
    },
    error: function (jqXHR, textStatus, errorThrown) {},
  });
}

function addContionType(typeConnection) {
  
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });
  $.ajax({
    type: "POST",
    url: api.serve.baser_urlServer + "/AddClickZalo",
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
function saveHistoryNoAction(isRedirect, result = null) {
  var loading = document.querySelector(".status-loader-22");
  
  if (result == null) {
    if (sessionStorage.getItem("_t") === null) {
      return;
    }
    let dataHistory = JSON.parse(sessionStorage.getItem("_t"));
    result = dataHistory;
  }

  var slugOutput = "";
  var saleIdOutput = "";
  var saleId = window.location.pathname.split("/")[2];
  var slug = window.location.pathname.split("/")[1];
  if (saleId && saleId !== "" && slug && slug !== "") {
    saleIdOutput = saleId;
    slugOutput = slug;
  }

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
      Result: JSON.stringify(result),
    }),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: async function (data) {
   
    },
    complete: function (data) {},
  });
}
function drawHistory(dataHistory) {
  var indexRow = 0;
  dataHistory.forEach((itemHistory) => {
    var datetext = itemHistory.Create_Date;
    datetextArray = datetext.split(" ");

    indexRow++;
    var htmlTemplate =
      "\
            <tr>\
            <td>" +
      indexRow +
      "</td>\
            <td>" +
      datetextArray[0] +
      "</td>\
            <td>" +
      datetextArray[1] +
      "</td>";
    htmlTemplate += "<td>";

    htmlTemplate +=
      '  <a onclick="openHistory(' +
      "'" +
      itemHistory._id +
      "'" +
      ')"> Xem chi tiết</a>';
    htmlTemplate += "</td></tr>";
    $("#historySkin tr:last").after(htmlTemplate);
  });
}

function openHistory(itemHistory) {
  var hrefLocation = "/lich-su-soi-da-with-iframe/" + itemHistory;
  if (typeof slugGlobal === "undefined" || slugGlobal == null) {
  } else {
    hrefLocation =
      "/" + slugGlobal + "/lich-su-soi-da-with-iframe/" + itemHistory;
  }
  $("#popupiframe").attr("src", hrefLocation);
  $("#historyModel").modal("show");
}

function callApiMyHistory() {
  var slug = window.location.pathname.split("/")[1];

  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });
  $.ajax({
    url: api.serve.baser_urlServer + "/" + api.serve.get_all_history,
    type: "get",
    data: {
      slug: slug,
    },
    success: function (response) {

      if (response.is_success) {
        renderMyHistory(response.data.data);
      } else {
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {},
  });
}

function renderMyHistory(dataHistoryReponse) {
  if (dataHistoryReponse == null) {
  }
  let dataHistoryUser = dataHistoryReponse.data;
  let mapHtml = ``;
  dataHistoryUser.forEach((info, index) => {
    let img = ``;
    mapHtml += `<tr>
    <td>${index + 1}</td>
    <td>${new Date(info.Create_Date).toLocaleDateString()}
    </td>
  
    <td>
      <a href="javascript:void()" onclick ="openDetailPage('${
        info._id
      }',true)" class="btn_openIframeHistorySoida">Xem lịch sử</a>
    </td>
    
</tr>`;
  });

  var historyTableUser = document.getElementById("table_newSoida");
  if (historyTableUser == null) {
    return;
  }
  historyTableUser.innerHTML = `
                                <table>
                                          <thead>
                                            <tr>
                                              <th>STT</th>
                                              <th>Thời gian</th>
                                              <th>Hành động</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                              ${mapHtml}
                                          </tbody>
                                        </table>
                                    <div class="status_iframeHistorySoida">
                                  <div class="flex-item-center">
                                      <div class="modal-information">
                                          <div class="form_historyIframe">
                                          <div class="text-center title-table-history form-information-user-title mt-2">
                                          <div class="center-right">
                                          <h3>LỊCH SỬ SOI DA</h3>
                                            <svg id="btn_closeIframeHistorySoida" onclick="openDetailPage(null,false)" viewBox="0 0 24 24" size="24" class="sc-11csm01-0 fivNSm">
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
                                          
                                              <iframe id="AppFrame" class="mt-3" src="" width="100%" height="100%" name="LichSuSoiDa"
                                                  frameborder="0">                                               
                                                  </iframe>
                                          </div>
                                      </div>
                                  </div>
                              </div>`;
  if (dataHistoryUser.length == 0) {
    historyTableUser.innerHTML = `
                                <table>
                                          <thead>
                                            <tr>
                                              <th>STT</th>
                                              <th>Thời gian</th>
                                              <th>Hành động</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                              <tr>
                                                <td colspan="3" class="history-none">Bạn chưa có lịch sử soi da cũ! </td>
                                              </tr>
                                          </tbody>
                                        </table>`;
  }
}
function openDetailPage(idHistory, status) {
  let hreftLinkDetail = "/lich-su-soi-da-with-iframe/" + idHistory;
  openDetaiIfram(hreftLinkDetail, status);
}
function openDetaiIfram(hreflinkTarget = null, isShow = true) {
  if (hreflinkTarget == null) {
    isShow = false;
  }
  let statusHistoryIframe = document.querySelector(
    ".status_iframeHistorySoida"
  );
  if (statusHistoryIframe == null) {
    return;
  }

  if (isShow) {
    var iframehistory = document.getElementById("AppFrame");
    if (iframehistory) {
      document.getElementById("AppFrame").setAttribute("src", hreflinkTarget);

      statusHistoryIframe.style.display = "block";
    }
  } else {
    statusHistoryIframe.style.display = "none";
  }
}
function openHistoryPage() {
  if (typeof slugGlobal === "undefined" || slugGlobal == null) {
    window.location.href = "/lich-su-soi-da-with-iframe";
  } else {
    window.location.href = "/" + slugGlobal + "/lich-su-soi-da-with-iframe";
  }
}
