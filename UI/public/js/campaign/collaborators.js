
const thCampaign = [
    {
        name: "STT",
    },
    {
        name: "Tên",
    },
    {
        name: "Nhà cung cấp",

    },
    {
        name: "Số lượng voucher",


    },
    {
        name: "Tỷ lệ checkIn",



    },
    {
        name: "Trạng thái",
        class: "none-mobile",
    },

    {
        name: "Thời gian",
        class: "none-mobile",
    },
    {
        name: "",


    }
]
const thSales = [
    {
        name: "STT",
    },
    {
        name: "Tên",
    },
  
    {
        name: "Số điện thoại",


    },
    {
        name: "Trạng thái",


    },
 
    {
        name: "Nhà cung cấp",
    },
    {
        name: "Địa chỉ",
        class: "none-mobile",
    },
    {
        name: "Thời gian",
        class: "none-mobile",
    },


]
const checkStatusUserVoucherColor = (status) => {
    const statusColorMap = {
        A: "#2eb85c",
        1: "#2db7f5",
        2: "#87d068",
        3: "#dc0e04",
    };

    return statusColorMap[status] || "#FF0004";
};
const checkStatusUserVoucherContent = (status) => {
    const statusContentMap = {
        A: "Đã nhận voucher",
        1: "Đã checkIn",
        2: "Hoàn thành",
        3: "Hủy bỏ",
    };

    return statusContentMap[status] || "Chưa xác nhận";
};
const checkStatusUserCampaign = (status) => {
    const statusContentMap = {
        A: "Hoạt động",
        1: "Đã checkIn",
        2: "Hoàn thành",
        3: "Hủy bỏ",
    };

    return statusContentMap[status] || "Chưa xác nhận";
};

function renderListUser(id) {
    var slug = window.location.pathname.split("/")[2];

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: api.serve.baser_urlServer + "/" + api.serve.api_getCollaborators,
        type: "POST",
        data: {
            saleId: slug
        },
        success: function (response) {
            var tdMap = ``;
            var tdMapMobi = ``;
            response.data.data.forEach((item, index) => {

                tdMap += `<tr>
                            <td>${index + 1}</td>
                            <td>
                                ${item.fullName}
                            </td>
                            
                            <td class="">
                            ${item.phoneNumber}
                            </td>
                            <td class="">
                            <div class="status-tag" style="background-color : ${checkStatusUserVoucherColor(item.status)};color: #fff;padding: 2px;">
                            ${checkStatusUserVoucherContent(item.status)}
                            </div>
                            </td>
                            
                            <td>
                            ${item.slug}
                            </td>
                            <td class="none-mobile">
                            ${item.address ? item.address : "Tp.Hồ Chí Minh"}
                            
                            </td>
                            <td class="none-mobile">
                            ${new Date(item.create_at).toLocaleTimeString() + " ngày " + new Date(item.create_at).toLocaleDateString()}
                            
                            </td>

                        </tr>`;
            });
            var table = document.getElementById(id);

            if (table == null) {
                return;
            }
            var thMap = ``;
            var thMapMobi = ``;
            thSales.forEach((th, i) => {
                thMap += `
        <th class="${th.class}">${th.name}</th>
        `
            })
            table.innerHTML = `
            <div class="">
                    <table  id="table-list-customer" class="table-center w-100 collaborators-table table table-striped ">
                    <thead>
                <tr>
                ${thMap}
                </tr>
                </thead>
                <tbody>
                ${tdMap}
                </tbody>
                </table>
                </div>
                       `
            $(document).ready(function () {
                $('#table-list-customer').DataTable();
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
};

function renderListCampaignAndStatistical(id, idStatistical) {
    var slug = window.location.pathname.split("/")[2];

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: api.serve.baser_urlServer + "/" + api.serve.api_getCampaignCollaborators,
        type: "POST",
        data: {
            saleId: slug
        },
        success: function (response) {
            var tdMap = ``;
            var thMap = ``;
            response.listData.forEach((item, index) => {
                tdMap += `<tr>
                            <td>${index + 1}</td>
                            <td style="min-width:180px">${item.name}</td>
                            <td>${item.vendorName}</td>
                            <td>${item.totalVoucher}</td>
                            <td>${item.rateCheckIn} %</td>
                            <td class="none-mobile">
                            <div class="text-center ">
                            
                            <span class="status-tag" style="background-color :#2eb85c">
                            Hoạt động
                            
                            </span>
                            </div>
                            </td>
                            <td class="none-mobile">
                            
                            ${new Date(item.from).toLocaleDateString()}
                            -
                            ${new Date(item.to).toLocaleDateString()}
                        </td>
                            <td>
                            
                            <div class="flex-center-space" style="gap:10px">
                                <div
                                    class="position-copy"                                                         
                                >
                                    <svg
                                    onclick="CopyCollaborator('https://deal24h.vn/${item.slug + "/" + item.saleSlug}',${index})"
                                    width="28"
                                    class="copy-collaborators${index}"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    role="presentation"
                                    >
                                    <g fill="var(--font-black)">
                                        <path
                                        d="M10 19h8V8h-8v11zM8 7.992C8 6.892 8.902 6 10.009 6h7.982C19.101 6 20 6.893 20 7.992v11.016c0 1.1-.902 1.992-2.009 1.992H10.01A2.001 2.001 0 018 19.008V7.992z"
                                        ></path>
                                        <path
                                        d="M5 16V4.992C5 3.892 5.902 3 7.009 3H15v13H5zm2 0h8V5H7v11z"
                                        ></path>
                                    </g>
                                    </svg>
                                    
                                </div>
                                <div class="fb network-collaborators">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="32" viewBox="0 0 24 24" width="32"><path d="m22 12c0-5.52286-4.4771-10.00001-10-10.00001-5.52285 0-10 4.47715-10 10.00001 0 4.9913 3.65686 9.1283 8.4375 9.8785v-6.9879h-2.53906v-2.8906h2.53906v-2.20314c0-2.50625 1.4929-3.89062 3.7771-3.89062 1.0941 0 2.2385.19531 2.2385.19531v2.46094h-1.261c-1.2422 0-1.6296.77084-1.6296 1.56171v1.8758h2.7734l-.4433 2.8906h-2.3301v6.9879c4.7806-.7502 8.4375-4.8872 8.4375-9.8785z" fill="#1877f2"/><path d="m15.8926 14.8906.4433-2.8906h-2.7734v-1.8758c0-.79086.3874-1.5617 1.6296-1.5617h1.261v-2.46094s-1.1444-.19531-2.2385-.19531c-2.2842 0-3.7771 1.38437-3.7771 3.89062v2.20313h-2.53906v2.8906h2.53906v6.9879c.5091.0799 1.0309.1215 1.5625.1215s1.0534-.0416 1.5625-.1215v-6.9879z" fill="#fff"/></svg>
                                </div>
                                <div class="zalo network-collaborators">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.782 0.166016H27.199C33.2653 0.166016 36.8103 1.05701 39.9572 2.74421C43.1041 4.4314 45.5875 6.89585 47.2557 10.0428C48.9429 13.1897 49.8339 16.7347 49.8339 22.801V27.1991C49.8339 33.2654 48.9429 36.8104 47.2557 39.9573C45.5685 43.1042 43.1041 45.5877 39.9572 47.2559C36.8103 48.9431 33.2653 49.8341 27.199 49.8341H22.8009C16.7346 49.8341 13.1896 48.9431 10.0427 47.2559C6.89583 45.5687 4.41243 43.1042 2.7442 39.9573C1.057 36.8104 0.166016 33.2654 0.166016 27.1991V22.801C0.166016 16.7347 1.057 13.1897 2.7442 10.0428C4.43139 6.89585 6.89583 4.41245 10.0427 2.74421C13.1707 1.05701 16.7346 0.166016 22.782 0.166016Z" fill="#0068FF"/>
                                <path opacity="0.12" fill-rule="evenodd" clip-rule="evenodd" d="M49.8336 26.4736V27.1994C49.8336 33.2657 48.9427 36.8107 47.2555 39.9576C45.5683 43.1045 43.1038 45.5879 39.9569 47.2562C36.81 48.9434 33.265 49.8344 27.1987 49.8344H22.8007C17.8369 49.8344 14.5612 49.2378 11.8104 48.0966L7.27539 43.4267L49.8336 26.4736Z" fill="#001A33"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.779 43.5892C10.1019 43.846 13.0061 43.1836 15.0682 42.1825C24.0225 47.1318 38.0197 46.8954 46.4923 41.4732C46.8209 40.9803 47.1279 40.4677 47.4128 39.9363C49.1062 36.7779 50.0004 33.22 50.0004 27.1316V22.7175C50.0004 16.629 49.1062 13.0711 47.4128 9.91273C45.7385 6.75436 43.2461 4.28093 40.0877 2.58758C36.9293 0.894239 33.3714 0 27.283 0H22.8499C17.6644 0 14.2982 0.652754 11.4699 1.89893C11.3153 2.03737 11.1636 2.17818 11.0151 2.32135C2.71734 10.3203 2.08658 27.6593 9.12279 37.0782C9.13064 37.0921 9.13933 37.1061 9.14889 37.1203C10.2334 38.7185 9.18694 41.5154 7.55068 43.1516C7.28431 43.399 7.37944 43.5512 7.779 43.5892Z" fill="white"/>
                                <path d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z" fill="#0068FF"/>
                                <path d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z" fill="#0068FF"/>
                                <path d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z" fill="#0068FF"/>
                                <path d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z" fill="#0068FF"/>
                                <path d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z" fill="#0068FF"/>
                                </svg>
                                </div>
                            </div>
                            </td>
                        </tr>`;
            });
            var table = document.getElementById(id);

            if (table == null) {
                return;
            }

            thCampaign.forEach((th, i) => {
                thMap += `
                            <th class="${th.class}">${th.name}</th>
                            `
            })
            table.innerHTML = `
                    <div class="">
                            <table  id="table-list-customer" class="table-center w-100 collaborators-table table table-striped ">
                            <thead>
                        <tr>
                        ${thMap}
                        </tr>
                        </thead>
                        <tbody>
                        ${tdMap}
                        </tbody>
                        </table>
                        </div>
                            `
            var statistical = document.getElementById(idStatistical);
            statistical.innerHTML += `
                    <div class="collaborators-sales collaborators-title">
                    <div class="text-center">
                        <h1>Thống kê</h1>

                    </div>
                </div>
                <div class="box-statistical-collaborators">

                    <div class="grid">
                        <div>
                            <h6> Số lượng chiến dịch </h6>
                        </div>
                        <div class="text-center">

                            <a>
                                ${response.overvivewDashboard.sumTotalCampaign}
                            </a>

                        </div>
                    </div>
                    <div class="grid">
                        <div>
                            <h6> Tổng số lượng voucher đã phát </h6>
                        </div>
                        <div class="text-center">

                            <a>
                            ${response.overvivewDashboard.sumTotalVoucher}

                            </a>

                        </div>
                    </div>
                    <div class="grid">
                        <div>
                            <h6> Tổng số lượng CheckIn</h6>
                        </div>
                        <div class="text-center">

                            <a>
                            ${response.overvivewDashboard.sumTotalVoucherCheckin}

                            </a>

                        </div>
                    </div>
                    <div class="grid">
                        <div>
                            <h6> Tỉ lệ CheckIn </h6>
                        </div>
                        <div class="text-center">

                            <a>
                            ${response.overvivewDashboard.ratedCheckin} %

                            </a>

                        </div>
                    </div>
                    <div>

                    </div>
                </div>
                    `;

        }
    });
};

function ToggleView(id) {
    var i, tab, view;

    view = document.getElementsByClassName("collaborators-view");
    tab = document.getElementsByClassName("collaborators-tab");
    for (i = 0; i < view.length; i++) {
        if (i === id) {
            tab[i].classList.add("collaborators-tab-active");
            view[i].classList.add("block");
            view[i].style.animation = "collaborators_tab_show 1s ease-in-out";

        } else {
            view[i].classList.remove("block");
            tab[i].classList.remove("collaborators-tab-active");
            view[i].style.animation = "none";
        }
    }
}

function CopyCollaborator(href = "", index) {
    classChange = `.copy-collaborators${index}`

    tippy(classChange, {
        content: 'Đã sao chép',
        animation: 'fade',
    });
    navigator.clipboard.writeText(href);
}
function isVietnamesePhoneNumberValid(number) {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
}

function CheckFormCollaboratos() {

    const salesName = document.getElementById("salesNameRegister");
    const salesNameError = document.getElementById("salesNameRegisterError");
    const salesNumberRegister = document.getElementById("salesNumberRegister");
    const salesNumberRegisterError = document.getElementById("salesNumberRegisterError");
    const salesEmailRegister = document.getElementById("salesEmailRegister");
    const salesEmailRegisterError = document.getElementById("salesEmailRegisterError");
    const salesNumberIntroduceRegister = document.getElementById("salesNumberIntroduceRegister");
    const salesNumberIntroduceRegisterError = document.getElementById(
        "salesNumberIntroduceRegisterError");

    var index = 0;
    if (salesName.value === '') {
        index++;
        salesNameError.style.display = 'block';
        salesNameError.innerHTML = "Họ và tên bắt buộc"
    } else {
        salesNameError.style.display = 'none';
        salesNameError.innerHTML = ""

    };
    if (salesNumberRegister.value === '') {
        index++;
        salesNumberRegisterError.style.display = 'block';
        salesNumberRegisterError.innerHTML = "Số điện thoại bắt buộc"
    } else if (isVietnamesePhoneNumberValid(salesNumberRegister.value) === false) {
    
       if(salesNumberRegister.value.length > 6)
        {

            index++;
            salesNumberRegisterError.style.display = 'block';
            salesNumberRegisterError.innerHTML = "Sai số điện thoại"
        }else{
            salesNumberRegisterError.style.display = 'none';
        salesNumberRegisterError.innerHTML = ""
        }
      
    } else {
        salesNumberRegisterError.style.display = 'none';
        salesNumberRegisterError.innerHTML = ""

    };
    if (salesNumberIntroduceRegister.value === '') {
        index++;
        salesNumberIntroduceRegisterError.style.display = 'block';
        salesNumberIntroduceRegisterError.innerHTML = "Số điện thoại bắt buộc"
    } else if (isVietnamesePhoneNumberValid(salesNumberIntroduceRegister.value) === false) {
        index++;
        salesNumberIntroduceRegisterError.style.display = 'block';
        salesNumberIntroduceRegisterError.innerHTML = "Sai số điện thoại"
    } else {
        salesNumberIntroduceRegisterError.style.display = 'none';
        salesNumberIntroduceRegisterError.innerHTML = ""

    };
    if (index > 0) {
        return false;
    }
    return true;

}
function RegisterCollaborators() {
    const check = CheckFormCollaboratos();
    if (check) {
     
    };
}

function CopyCollaborator(href) {
    navigator.clipboard.writeText(href);
}

function CheckFormCollaboratos() {
    const salesAccountRegister = document.getElementById("salesAccountRegister");
    const salesAccountRegisterError = document.getElementById("salesAccountRegisterError");

    const salesNumberRegister = document.getElementById("salesNumberRegister");
    const salesNumberRegisterError = document.getElementById("salesNumberRegisterError");
    const salesEmailRegister = document.getElementById("salesEmailRegister");
    const salesEmailRegisterError = document.getElementById("salesEmailRegisterError");
    const salesNumberIntroduceRegister = document.getElementById("salesNumberIntroduceRegister");
    const salesNumberIntroduceRegisterError = document.getElementById("salesNumberIntroduceRegisterError");

    var index = 0;

    if (salesAccountRegister.value === '') {
        index++;
        salesAccountRegisterError.style.display = 'block';
        salesAccountRegisterError.innerHTML = "Tài khoản bắt buộc"
    } else {
        salesAccountRegisterError.style.display = 'none';
        salesAccountRegisterError.innerHTML = ""

    };
    if (salesNumberRegister.value === '') {
        index++;
        salesNumberRegisterError.style.display = 'block';
        salesNumberRegisterError.innerHTML = "Số điện thoại bắt buộc"
    } else if (isVietnamesePhoneNumberValid(salesNumberRegister.value) === false) {
        if(salesNumberRegister.value.length > 6)
        {

            index++;
            salesNumberRegisterError.style.display = 'block';
            salesNumberRegisterError.innerHTML = "Sai số điện thoại"
        }else{
            salesNumberRegisterError.style.display = 'none';
        salesNumberRegisterError.innerHTML = ""
        }
    } else {
        salesNumberRegisterError.style.display = 'none';
        salesNumberRegisterError.innerHTML = ""

    };
 
    if (index > 0) {
        return false;
    }
    return true;

}

function CopyById(id) {
    var str = document.getElementById(id);
    window.getSelection().selectAllChildren(str);
    document.execCommand("Copy");
}
function closePopupLink() {
    $("#popup-link").html("");
}
function hrefAdministration(number) {
    closePopupLink();
    window.location.href = `/cong-tac-vien/${number}`
}