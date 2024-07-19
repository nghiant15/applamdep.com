var slug = window.location.pathname.split("/")[1];

if (slug !== "") {
  slug += "/";
}
if(slug === 'cong-tac-vien/' || slug === 'chinh-sach-va-bao-mat/' || slug === 'dieu-khoan-va-su-dung/' ||slug === 'chinh-sach-bao-hanh/' ||slug === 'chinh-sach-tra-hang/' || slug ==='chinh-sach-bao-mat-thanh-toan/' || slug ==='van-chuyen-va-giao-hang/'){
  slug = '';
}
var  api =  {

    baser_url:  "http://localhost:3002",
    api_addUrl: "api/add-end-user",
    api_loginUser: "api/login-end-user",

    api_getInfo: "api/get-end-user-byId",
    api_getHistory: "api/get-history-skin-by-id",
    api_getHistoryById:  "api/get-detail-history-skin",

    api_CheckUrl: "api/check-access-slug",

    api_addUrl: `${slug}api/add-end-user`,
    api_loginUser: `${slug}api/login-end-user`,
    api_loginAdmin: `${slug}api/plugin-login_pg`,
    api_createByPg: `${slug}them-moi-khach-hang`,
  
    api_updateUser: `update-end-user`,
    api_getInfo: `${slug}api/get-end-user-byId`,
    api_getHistory: `${slug}api/get-history-skin-by-id`,
    api_getHistoryById: `${slug}api/get-detail-history-skin`,
    api_CheckUrl: `${slug}api/check-access-slug`,
  

    serve: {
        baser_urlServer: "https://applamdep.com",
        get_banner: `api/evoucher/banner/getAll`,
        api_logoutUser: `${slug}dang-xuat-he-thong`,
        api_registerUser: `${slug}dang-ky-nguoi-dung`,
        api_getCollaborators: `cong-tac-vien/get-all-customer`,
        get_all_voucher: `get-all-voucher`,
        get_all_history: `get-all-history`,
        api_get_all_company : `api/plugin-list-company`,
        api_get_information_config : `get-infomation-config`,
        api_registerCollaborators: `cong-tac-vien/them-moi-doi-tac`,
        api_getCampaignCollaborators: `cong-tac-vien/get-infomation-campaign`,
        api_loginServer: `${slug}dang-nhap-plugin`,
        api_loginServerGame: `${slug}dang-nhap-plugin-game`,
        api_saveHistory: `${slug}skin/add-history-skin-plugin`,
        api_getRecomendProduct: `${slug}skin/get-product-recomendProduct`,
        get_listHistory: `${slug}skin/get-list-history`,
        get_color: `${slug}make-up/get-makeup-color-by-typeId`,
        post_datlich: `${slug}user/booking`,
    
        get_api_soida: `${slug}skin/call-soi-da`,
        get_api_makeup: `${slug}skin/call-makup`,
        get_kltq2: `/${slug}get-ket-luan-chi-tiet`,
        get_tvtq2: `/${slug}get-tu-van-tong-quan`,
    
        get_campaign: `${slug}api/campaign/getAll`,
        get_banner: `api/evoucher/banner/getAll`,
        get_footerData: `api/footerPage/getAll`,
    
        checkSlug: `api/check-access-url`,
        get_evoucher: `${slug}api/customer/requestVoucher`,
      },

};