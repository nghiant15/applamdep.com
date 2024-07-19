
function ToggleAlert(statusAlert, mess, statusShow) {
  var html = ``;
  if (statusShow) {
    if (statusAlert) {
      html += `
        <div class="alert">
        <div class="">
            <div class="flex-center">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
                        <title>Checkmark</title>
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="32" d="M416 128L192 384l-96-96" />
                    </svg>
                </div>
            </div>
            <div class="content">
                  ${mess}
            </div>
        </div>
      </div>
        `;
    } else {
      html += `
        <div class="alert">
        <div class="">
            <div class="flex-center">
                <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
                </div>
            </div>
  
            <div class="content">
                  ${mess}
            </div>
        </div>
      </div>
        `;
    }
    let idRender = document.getElementById('alert-web');
    if (idRender) {
      idRender.innerHTML = html;
    }
  } else {
    html += "";
    let idRender = document.getElementById('alert-web');
    if (idRender) idRender.innerHTML = html;
  }
};




