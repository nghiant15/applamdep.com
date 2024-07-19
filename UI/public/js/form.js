// form thong tin user
var activeFormInformation = document.getElementById(
  "active-form-information-user"
);
if (activeFormInformation) {
  activeFormInformation.addEventListener("click", () => {
    $(".status-modal-information").show();
    document.querySelector(".status_form_isInfo").style.display = "block";
  });
}
function changeFormInfo() {
  document.querySelector(".status-modal-information").style.display = "none";
  document.querySelector(".status_form_isInfo").style.display = "block";
}

var isRequireLogin = false;
function statusFormGoiY(status) {
  if (status) {
    isRequireLogin = true;
    document.querySelector(".status_goiy_login").style.display = "block";
  } else {
    document.querySelector(".status_goiy_login").style.display = "none";
  }
};

function changeFormGoiychuyengia() {
  let statusmodalgoiychuyengia = document.querySelector(
    ".status-modal-goiychuyengia"
  );
  if (statusmodalgoiychuyengia) {
    statusmodalgoiychuyengia.style.display = "none";
  }
};

