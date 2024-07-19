let list = document.querySelectorAll(".navbar-a");
let indicator = document.querySelector(".indicator");
function setActiveClass(itemActive) {
    list.forEach(item => {
        if (itemActive === item) {
            item.classList.add("active-a-navbar");


        } else {
            item.classList.remove("active-a-navbar");

        }
    });
};
function Setindicator(e) {

    if(indicator)
    {
        indicator.style.left = e.offsetLeft + "px";
        indicator.style.width = e.offsetWidth + "px";
    }
   
};
list.forEach(item => {
    item.addEventListener("mouseover", (e) => {
        setActiveClass(item);
        Setindicator(e.target);
    });
    item.addEventListener("mouseleave", (e) => {
        if(item)
        {
            item.classList.remove("active-a-navbar");
        }
        if(indicator)
        {
            indicator.style.width = 0 + "px";
        }
       
        
        // indicator.style.left = 0 + "px";

    });
});
function BackToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function renderHrefFooter() {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });
    $.ajax({
        url: api.serve.baser_urlServer + "/" + api.serve.get_footerData,
        type: "GET",
        data: {

        },
        success: function (response) {
            if (response.is_success) {
                var listDataHref = ``;
                response.data.forEach((item, i) => {
                    listDataHref += `
                    <div class="footer__homepage--a">
                            <a href=/${item.slug}>
                                ${item.title}
                            </a>
                    </div>
            
            `;
                });
                let idRender = document.getElementById("render_href_footer");
                if (idRender) {
                    idRender.innerHTML = `${listDataHref}`
                };
            };
        },
        error: function (jqXHR, textStatus, errorThrown) { },
    });
};
renderHrefFooter();