var { auth, authEndUser } = require('../../../helpers/auth');
var { uploadBanner } = require('../../../helpers/multer');

module.exports = function (app) {

    //UserPluginModel
    const UserPluginController = require("../../../controllers/PluginController/PluginUserController");

    app.route("/api/plugin-list-user").post(UserPluginController.getListUser);
    app.route("/api/plugin-all-user").post(UserPluginController.getAllUser);
    app.route("/api/plugin-subsale-user").post(auth, UserPluginController.getSubSaleUser);
    app.route("/api/plugin-add-user").post(UserPluginController.addUser);
    app.route("/api/plugin-add-subsale").post(UserPluginController.addSubSale);
    app.route("/api/plugin-add-sale").post(UserPluginController.addSale);
    app.route("/api/plugin-update-user").post(UserPluginController.updateUser);
    app.route("/api/plugin-update-user-company").post(UserPluginController.updateUserCompany);
    app.route("/api/plugin-delete-user").post(UserPluginController.deleteUser);
    app.route("/api/plugin-reset-password").get(UserPluginController.resetPassword);
    app.route("/api/plugin-update-password").post(UserPluginController.updatePassword);
    app.route("/api/plugin-change").post(UserPluginController.ResetPassword);
    app.route("/api/plugin-check-link").post(UserPluginController.checkUsedLink);
    app.route("/api/plugin-update-status").get(UserPluginController.updateStatus);
    app.route("/api/plugin-login_admin").post(UserPluginController.LoginAdmin);
    app.route("/api/plugin-user-login").post(UserPluginController.userLogin);
    app.route("/api/plugin-forgot-password").post(UserPluginController.ForgotPassword);
    app.route("/api/plugin-get-user-byID").post(auth, UserPluginController.getUserByID);
    app.route("/api/plugin-get-user-byID-with-body").post(UserPluginController.getUserByID_withBody);


    //CompanyModel
    const CompanyPluginController = require("../../../controllers/PluginController/CompanyPluginController");
    app.route("/api/plugin-list-company").post(CompanyPluginController.getListCompany);
    app.route("/api/getAllCommpany").post(CompanyPluginController.getAllCommpany);
    app.route("/api/plugin-list-company-by-id").post(auth, CompanyPluginController.getListCompanyByID);
    app.route("/api/plugin-add-company").put(auth, CompanyPluginController.addCompany);
    app.route("/api/plugin-add-company-auto-wa").post(CompanyPluginController.addCompanyForWebApp);
    app.route("/api/plugin-update-company").post(CompanyPluginController.updateCompany);
    app.route("/api/plugin-delete-company").delete(CompanyPluginController.deleteCompany);
    app.route("/api/plugin-get-data-company").post(CompanyPluginController.getNameCompany);
    app.route("/api/plugin-update-slug").post(CompanyPluginController.updateSlug);

    //OrderModel
    const PluginOrderController = require("../../../controllers/PluginController/PluginOrderController");
    app.route("/api/updatePackage").post(PluginOrderController.updatePackage);
    app.route("/api/getOrderByInfo").post(PluginOrderController.getInfoOrderByCompany);
    app.route("/api/plugin-count-order").post(PluginOrderController.countOrder);
    app.route("/api/order/getByInfo").post(PluginOrderController.countOrder);
    app.route("/api/plugin-list-order").post(PluginOrderController.getListOrder);
    app.route("/api/plugin-list-order-by-id").post(auth, PluginOrderController.getListOrderByID);
    app.route("/api/plugin-list-order-for-admin").post(PluginOrderController.getListOrderForAdmin);
    app.route("/api/plugin-list-order-by-saleid").post(auth, PluginOrderController.getListOrderBySaleID);
    app.route("/api/plugin-add-order").put(auth, PluginOrderController.addOrder);
    app.route("/api/plugin-update-order").post(auth, PluginOrderController.updateOrder);
    app.route("/api/checkout-order").post(PluginOrderController.checkoutOrder);
    app.route("/api/plugin-delete-order").delete(PluginOrderController.deleteOrder);

    //PackageModel
    const PackageProduct = require("./../../../controllers/PluginController/PackageProductController");
    app.route("/api/list-package").post(PackageProduct.getListPackage);
    app.route("/api/add-package").put(PackageProduct.addPackage);
    app.route("/api/addPackage2").put(PackageProduct.addPackage2);
  
    app.route("/api/update-package2").post(PackageProduct.updatePackage2);
    app.route("/api/update-package").post(PackageProduct.updatePackage);
    app.route("/api/delete-package").delete(PackageProduct.deletePackage);
    app.route("/api/get-name-package").post(PackageProduct.getNamePackage);

    //FeatureModel
    const FeatureController = require("../../../controllers/PluginController/FeatureController");
    app.route("/api/list-feature").post(FeatureController.getListFeature);
    app.route("/api/add-feature").put(FeatureController.addFeature);
    app.route("/api/update-feature").post(FeatureController.updateFeature);
    app.route("/api/delete-feature").delete(FeatureController.deleteFeature);
    app.route("/api/get-feature-choose").post(FeatureController.getDataFeature);

    //RolePluginModel
    const RolePluginController = require("../../../controllers/PluginController/RolePluginController");
    app.route("/api/plugin-list-role").post(auth, RolePluginController.getListRole);
    app.route("/api/plugin-add-role").put(RolePluginController.addRole);
    app.route("/api/plugin-update-role").post(RolePluginController.updateRole);
    app.route("/api/plugin-delete-role").delete(RolePluginController.deleteRole);

    //CustomerRequestModel
    const CustomerRequestController = require("../../../controllers/PluginController/CustomerRequestController");
    app.route("/api/list-customer-request").post(CustomerRequestController.getListRequest);
    app.route("/api/list-customer-request-for-company").post(CustomerRequestController.getListRequestForCustomer);
    app.route("/api/add-customer-request").put(CustomerRequestController.addRequest);
    app.route("/api/update-customer-request").post(CustomerRequestController.updateRequest);
    app.route("/api/delete-customer-request").delete(CustomerRequestController.deleteRequest);

    //Reward Information
    const RewardInformaion = require("../../../controllers/PluginController/RewardInformaionController");
    app.route("/api/list-reward-info").post(RewardInformaion.getListReward);
    app.route("/api/list-reward-info-for-company").post(RewardInformaion.getListRewardForCompany);
    app.route("/api/add-reward-info").put(RewardInformaion.addReward);
    app.route("/api/update-reward-info").post(RewardInformaion.updateReward);
    app.route("/api/delete-reward-info").delete(RewardInformaion.deleteReward);

    //Reward Transaction
    const RewardTransaction = require("../../../controllers/PluginController/RewardTransactionController");
    app.route("/api/list-reward-trans").post(RewardTransaction.getListRewardTransaction);
    app.route("/api/add-reward-trans").put(RewardTransaction.addRewardTransaction);
    app.route("/api/update-reward-trans").post(RewardTransaction.updateRewardTransaction);
    app.route("/api/delete-reward-trans").delete(RewardTransaction.deleteRewardTransaction);

    //Contact customer
    const ContactCustomer = require("../../../controllers/PluginController/ContactCustomerController");
    app.route("/api/list-contact-customers").post(ContactCustomer.getListContact);
    app.route("/api/add-contact-customers").post(ContactCustomer.addContact);
    app.route("/api/update-contact-customers").post(ContactCustomer.updateContact);
    app.route("/api/delete-contact-customers").delete(ContactCustomer.deleteContact);
    app.route("/api/update-contact-status").delete(ContactCustomer.updateStatus);

    //Type Request
    const TypeRequestController = require("../../../controllers/PluginController/TypeRequestController");
    app.route("/api/list-type-request").post(TypeRequestController.getListTypeRequest);
    app.route("/api/add-type-request").put(TypeRequestController.addTypeRequest);
    app.route("/api/update-type-request").post(TypeRequestController.updateTypeRequest);
    app.route("/api/delete-type-request").delete(TypeRequestController.deleteTypeRequest);

    //Check URL
    const CheckAccessURL = require("../../../controllers/PluginController/CheckAccessURLController");
    app.route("/api/check-access-url").post(CheckAccessURL.checkAccessURL);
    app.route("/api/check-access-slug").post(CheckAccessURL.checkAccessSlug);
    app.route("/api/check-access-url-v2").post(CheckAccessURL.checkAccessURL_New);

    //History Skin
    const HistorySkinController = require("../../../controllers/PluginController/HistorySkinController");
    app.route("/api/list-history-skin").post(HistorySkinController.getHistorySkin);
    app.route("/api/add-history-skin").post(HistorySkinController.addHistorySkin);
    app.route("/api/add-type-contact").post(HistorySkinController.addContionType);
    app.route("/api/add-type-contact2").post(HistorySkinController.addContionType2);
    app.route("/api/add-history-skin-plugin").post(authEndUser, HistorySkinController.addHistorySkin_Plugin);
    app.route("/api/add-history-no-user").post( HistorySkinController.addHistorySkin_PluginNoUser);

    app.route("/api/add-history-skin-app").post(HistorySkinController.addHistorySkin_APP);
    app.route("/api/get-history-skin-by-id").get(authEndUser, HistorySkinController.getHistorySkinById);
    app.route("/api/get-history-skin-by-user").get(authEndUser, HistorySkinController.getHistorySkinByIdByUser);

    app.route("/api/get-history-skin-by-phone").post( HistorySkinController.getHistorySkinByPhone);
    app.route("/api/get-detail-history-skin").post(HistorySkinController.getDetailHistorySkin);
    app.route("/api/get-detail-history-by-id").post(HistorySkinController.getHistoryById);

    //History MakeUp
    const HistoryMakeUpController = require("../../../controllers/MakeUpControllerNew/HistoryMakeUpController");
    app.route("/api/list-history-makeup").post(HistoryMakeUpController.getHistoryMakeUp);
    app.route("/api/add-history-makeup").post(HistoryMakeUpController.addHistoryMakeUp);




    const BannerController = require("../../../controllers/BannerController");
    app.route("/api/add-banner").post(BannerController.addBanner);
    app.route("/api/get-banner").post(BannerController.getBanner);
    app.route("/api/upload-banner").post(uploadBanner.single('image'), BannerController.addImage);

    const ProductSpecialController = require("../../../controllers/PluginController/ProductSpecialController");
    app.route("/api/prodcut-special/add").post(ProductSpecialController.add);
    app.route("/api/prodcut-special/update").post(ProductSpecialController.update);
    app.route("/api/prodcut-special/getData").post(ProductSpecialController.getALl);
    app.route("/product-special/all").get(ProductSpecialController.getALl);
    app.route("/product-special/all/:company").get(ProductSpecialController.getALl_Company);
    app.route("/product-special/delete").post(ProductSpecialController.delete);
    //Customer
    const CustomerController = require("../../../controllers/PluginController/CustomerController");
    app.route("/api/list-customer").post(CustomerController.getListCustomer);
    app.route("/api/list-customer-for-company").post(CustomerController.getListCustomerForCompany);
    app.route("/api/list-customer-for-company-by-month").post(CustomerController.getListCustomerForCompanyByMonth);


    const GameController = require("../../../controllers/GameController");
    app.route("/api/game/getInfo").get(GameController.getInfo);
    app.route("/api/game/update").post(GameController.updateGame);
    app.route("/api/get-all-game").get(GameController.getAll);
    app.route("/api/get-game-active").get(GameController.getGame);
    app.route("/api/get-game-data-1").get(GameController.getData1);
    app.route("/api/get-game-data-11").get(GameController.getData11);


    const BookController = require("../../../controllers/BookController");
    app.route("/api/book/getAll").get(BookController.getAll);
    app.route("/api/book/fe/getAll").get(BookController.getAllFE);
    app.route("/api/book/getbySlug").get(BookController.getBookBySlug);
    app.route("/api/book/addBookTool").post(BookController.addBookTool);
    app.route("/api/book/update").post(BookController.addBook);
    app.route("/api/book/deleteItem").post(BookController.deleteBook);
    app.route("/api/book/deleteAll").post(BookController.deleteAllBook);
    //TỪ PHẦN NÀY SẼ LÀ DATABASE CỦA MAKEUP
    const UploadController = require("../../../controllers/MakeUpControllerNew/UploadController");

    app.route("/api/user-upload").post(UploadController.upload);
    app.route("/api/list-image").get(UploadController.getListImage);
    app.route("/api/remove").post(UploadController.removeImage);

    const BrandController = require("../../../controllers/MakeUpControllerNew/BrandController");
    app.route("/api/brand-list").get(BrandController.getListBrand);
    app.route("/api/sku-list").get(BrandController.getSkuMakeup);
    app.route("/api/sku").get(BrandController.getSku);
    app.route("/api/sync-data").post(BrandController.dataSync);

    app.route("/api/filterSuggestItem").post(BrandController.filterSuggestItem);
    app.route("/api/auto-create-order").post(BrandController.addOrderAutomatic);

    const BrandPluginController = require("../../../controllers/PluginController/BrandPluginController");
    app.route("/api/brand-plugin-list").get(BrandPluginController.getListBrand);

    const Showlos = require("../../../controllers/MakeUpControllerNew/ShowlosController");
    app.route("/api/showlost").get(Showlos.showlost);

    const User = require("../../../controllers/MakeUpControllerNew/User");
    app.route("/api/get-info").post(User.getInfo);
    app.route("/api/register-device").post(User.registerDevice);

    //API MakeUP
    const MakeUp = require("../../../controllers/MakeUpControllerNew/MakeUpController");
    app.route("/api/get-makeup-color").post(MakeUp.getColorNew);
    app.route("/api/get-makeup-color-new").post(MakeUp.getColorNew);
    app.route("/api/get-makeup-data").post(MakeUp.getDataMakeUpNew);
    app.route("/api/get-makeup-data-new").post(MakeUp.getDataMakeUpNew);

    const HistorySkin = require("../../../controllers/PluginController/HistorySkinController");
    app.route("/api/get-history-skin").post(HistorySkin.getHistorySkin);

    app.route("/api/get-list-history").post(HistorySkin.getDetailHistory);
    
    app.route("/api/export-history-skin").post(HistorySkin.exportHistorySkin);
    app.route("/api/get-history-skin-by-condition").post(auth, HistorySkin.getHistorySkin_byCondition);

    app.route("/api/export-history").post(auth, HistorySkin.exportHistory);
    app.route("/api/add-history-skin").post(HistorySkin.addHistorySkin);

    app.route("/api/user/getAllHistory").post(HistorySkin.getAllHistory); 

    const RoleSubAdminController = require("../../../controllers/PluginController/RoleSubAdminController");
    app.route("/api/add-role-subadmin").post(RoleSubAdminController.addRoleSubAdminModel);
    app.route("/api/get-role-subadmin-by-id").post(RoleSubAdminController.getRoleSubAdminBy_Id);

    //Type Product
    const TypeProduct = require("../../../controllers/MakeUpControllerNew/TypeProductController");
    app.route("/api/list-type-product").post(TypeProduct.getListTypeProduct);
    app.route("/api/add-type-product").put(TypeProduct.addTypeProduct);
    app.route("/api/update-type-product").post(TypeProduct.updateTypeProduct);
    app.route("/api/delete-type-product").delete(TypeProduct.deleteTypeProduct);

    //Type Product
    const TypeSDK = require("../../../controllers/MakeUpControllerNew/TypeSDKController");
    app.route("/api/list-type-sdk").post(TypeSDK.getListTypeSDK);
    app.route("/api/add-type-sdk").put(TypeSDK.addTypeSDK);
    app.route("/api/update-type-sdk").post(TypeSDK.updateTypeSDK);
    app.route("/api/delete-type-sdk").delete(TypeSDK.deleteTypeSDK);

    const ViewMiddle = require("../../../controllers/MakeUpControllerNew/ViewMiddleWareController");
    app.route("/api/list-data-view").post(ViewMiddle.getDataUsePlugin);
    app.route("/api/list-data-view-makeup").post(ViewMiddle.getDataUseMakeUp);
    app.route("/api/search-plugin").post(ViewMiddle.SearchPlugin);
    app.route("/api/search-plugin").get(ViewMiddle.SearchPluginQuery);
    app.route("/api/search-makeup").post(ViewMiddle.SearchMakeUp);
    app.route("/api/search-makeup").get(ViewMiddle.SearchMakeUpQuery);
    app.route("/api/revert-data").post(ViewMiddle.RevertData);

    const DictionaryController = require("../../../controllers/DictionaryController");
    app.route("/api/list-dictionary").post(DictionaryController.getDictionary);
    app.route("/api/add-dictionary").post(DictionaryController.addDictionary);
    app.route("/api/update-dictionary").post(DictionaryController.updateDictionary);

    //web admin
    app.route("/brand-plugin").get(BrandPluginController.getBrand);
    app.route("/brand-plugin/:company").get(BrandPluginController.getBrand_Company);
    app.route("/brands").get(BrandController.getBrand);
    app.route("/brands/:company").get(BrandController.getBrand_Company);
    app.route("/product").get(BrandController.getProduct);
    app.route("/productv2").get(BrandController.getProductv2);
    app.route("/product/:company").get(BrandController.getProduct_Company);
    app.route("/product_hair").get(BrandController.getProduct_Hair);
    app.route("/product_hair/:company").get(BrandController.getProduct_Company_Hair);
    app.route("/types/:sub_type").get(BrandController.getType);
    app.route("/types/:company/:sub_type").get(BrandController.getType_Company);
    app.route("/colors").get(BrandController.getColor);
    app.route("/colors/:company").get(BrandController.getColor_Company);
    app.route("/color-select").post(BrandController.getColorSelect);
    app.route("/users").get(User.getUser);

    app.route("/add-brand").post(BrandController.addBrand);
    app.route("/add-brand-plugin").post(BrandPluginController.addBrand);
    app.route("/add-product").post(BrandController.addProduct);
    app.route("/add-product-hair").post(BrandController.addProduct_Hair);
    app.route("/add-type").post(BrandController.addType);
    app.route("/add-color").post(BrandController.addColor);
    app.route("/add-user").post(User.addUser);

    app.route("/update-brand").post(BrandController.updateBrand);
    app.route("/update-brand-plugin").post(BrandPluginController.updateBrand);
    app.route("/update-type").post(BrandController.updateType);
    app.route("/update-color").post(BrandController.updateColor);
    app.route("/update-product").post(BrandController.updateProduct);
    app.route("/update-user").post(User.updateUser);

    app.route("/delete-color").post(BrandController.deleteColor);
    app.route("/delete-type").post(BrandController.deleteType);
    app.route("/delete-product").post(BrandController.deleteProduct);
    app.route("/delete-brand").post(BrandController.deleteBrand);
    app.route("/delete-brand-plugin").post(BrandPluginController.deleteBrand);
    app.route("/delete-user").post(User.deleteUser);

    const EndUserController = require("../../../controllers/UserController/UserController");
    app.route("/api/list-end-user").post(EndUserController.getAllUser);
    app.route("/api/list-end-userv2").post(EndUserController.getAllUserNew);
  
    app.route("/api/export-user").post(EndUserController.exportUserNew);
    app.route("/api/get-enduser-by-googleid").post(EndUserController.getUserByGoogleId);
    app.route("/api/get-end-user-byId").post(authEndUser, EndUserController.getEndUserById);
    app.route("/api/getInfoUser").get( EndUserController.getEndUserByIdv2);
    app.route("/api/login-end-user").post(EndUserController.LoginEndUser);
    app.route("/api/login-end-user2").post(EndUserController.LoginEndUserv2)
    app.route("/api/add-end-user").post(EndUserController.addUser);
    app.route("/api/update-end-user").post(authEndUser,EndUserController.updateUser);
    app.route("/api/reset-password-end-user").post(authEndUser, EndUserController.resetPassword);
    app.route("/api/update-end-user-app").post(authEndUser, EndUserController.updateUser_APP);
    app.route("/api/delete-end-user").post(EndUserController.deleteUser);
    //banner 


    const banner_embeddController = require("../../../controllers/BannerEmbeddController");
    app.route("/api/banner_embedd/add").post(banner_embeddController.add);
    app.route("/api/banner_embedd/update").post(banner_embeddController.update);
    app.route("/api/banner_embedd/delete").post(banner_embeddController.delete);
    app.route("/api/banner_embedd/getAll").get(banner_embeddController.getAll);





    
    const SliderBannerController = require("../../../controllers/PluginController/SliderBannerController");
    app.route("/api/banner/add").post(SliderBannerController.add);
    app.route("/api/banner/update").post(SliderBannerController.update);
    app.route("/api/banner/getData").post(SliderBannerController.getALl);
    app.route("/api/banner/all").get(SliderBannerController.getALl);
    app.route("/api/banner/all/:company").get(SliderBannerController.getALl_Company);
    app.route("/api/banner/delete").post(SliderBannerController.delete);

    const ConfigController = require("../../../controllers/ConfigController");
    app.route("/api/config/add").post(ConfigController.add);
    app.route("/api/config/update").post(ConfigController.update);
    app.route("/api/config/delete").post(ConfigController.delete);
    app.route("/api/config/getAll").get(ConfigController.getALl);
    app.route("/api/config/getWebBySlug").post(ConfigController.getBySlug);
    app.route("/api/config/getInfoWeb").post(ConfigController.getInfoWeb);
    const ConfigColorController = require("../../../controllers/ConfigColorController");
    app.route("/api/get-config-color/:company").get(ConfigColorController.get);
    app.route("/api/get-config-color/update").post(ConfigColorController.createOrUpdate);




    const BannerVendorController = require("../../../controllers/PluginController/VendorBannerController");
    app.route("/api/baner-vendor/add").post(BannerVendorController.add);
    app.route("/api/baner-vendor/update").post(BannerVendorController.update);
    app.route("/api/baner-vendor/getData").post(BannerVendorController.getALl);
    app.route("/api/baner-vendor/all").get(BannerVendorController.getALl);
    app.route("/api/baner-vendor/all/:company").get(BannerVendorController.getALl_Company);
    app.route("/api/baner-vendor/delete").post(BannerVendorController.delete);

    const BannerSmallController = require("../../../controllers/PluginController/BannerSmallController");
    app.route("/api/baner-small/add").post(BannerSmallController.add);
    app.route("/api/baner-small/update").post(BannerSmallController.update);
    app.route("/api/baner-small/getData").post(BannerSmallController.getALl);
    app.route("/api/baner-small/all").get(BannerSmallController.getALl);
    app.route("/api/baner-small/all/:company").get(BannerSmallController.getALl_Company);
    app.route("/api/baner-small/delete").post(BannerSmallController.delete);

    const BannerMainController = require("../../../controllers/PluginController/BannerMainController");
    app.route("/api/baner-main/add").post(BannerMainController.add);
    app.route("/api/baner-main/update").post(BannerMainController.update);
    app.route("/api/baner-main/getData").post(BannerMainController.getALl);
    app.route("/api/baner-main/all").get(BannerMainController.getALl);
    app.route("/api/baner-main/all/:company").get(BannerMainController.getALl_Company);
    app.route("/api/baner-main/delete").post(BannerMainController.delete);


    const BannerSkinController = require("../../../controllers/PluginController/BannerSkinController");
    app.route("/api/banner_soida/add").post(BannerSkinController.add);
    app.route("/api/banner_soida/update").post(BannerSkinController.update);
    app.route("/api/banner_soida/getData").post(BannerSkinController.getALl);
    app.route("/api/banner_soida/all").get(BannerSkinController.getALl);
    app.route("/api/banner_soida/all/:company").get(BannerSkinController.getALl_Company);
    app.route("/api/banner_soida/delete").post(BannerMainController.delete);


    const guestController = require("../../../controllers/guest/guestController");

    app.route("/api/guest/getInfoOpenAccount").post(guestController.getInfomation);

    const PortalController = require("../../../controllers/PortalController");
    app.route("/api/baner/getAllBannerWeb").get(PortalController.getAllBannerWeb);

    app.route("/api/Ip/getIP").get(PortalController.getIP);


    const ReportController = require("../../../controllers/ReportController");
    app.route("/api/report/getOverviewDashboard").get(ReportController.getOverviewDashboard);


    const GameBeautyController = require("../../../controllers/GameBeautyController");
    app.route("/api/gameBeauty/update").post(GameBeautyController.AddorUpdate);
    app.route("/api/gameBeauty/adminUpdate").post(GameBeautyController.updateAdmin);
    app.route("/api/gameBeauty/getInfo").get(GameBeautyController.getInfo);
    app.route("/api/gameBeauty/getInfo2").get(GameBeautyController.getInfo2);
    app.route("/api/gameBeauty/getAll").get(GameBeautyController.getAll);
    app.route("/api/get-data-beauty-user").get(GameBeautyController.getAll);



    const TuvanController = require("../../../controllers/TuvanController");
    app.route("/api/tuvan/update").post(TuvanController.AddorUpdate);
    app.route("/api/tuvan/adminUpdate").post(TuvanController.updateAdmin);
    app.route("/api/tuvan/getInfo").get(TuvanController.getInfo);
    app.route("/api/tuvan/getInfo2").get(TuvanController.getInfo2);
    app.route("/api/tuvan/getAll").get(TuvanController.getAll);
    app.route("/api/get-data-tuvan-user").get(TuvanController.getAll);
    const ParameterRecomedConfigController = require("../../../controllers/ParameterRecomedConfigController");
    app.route("/api/paramenterRecomed/add").post(ParameterRecomedConfigController.add);
    app.route("/api/paramenterRecomed/update").post(ParameterRecomedConfigController.update);
    app.route("/api/paramenterRecomed/delete").post(ParameterRecomedConfigController.delete);
    app.route("/api/paramenterRecomed/getAll").get(ParameterRecomedConfigController.getALl);
    app.route("/api/paramenterRecomed/get-tu-van-tong-quan").post(ParameterRecomedConfigController.getOverview);

    app.route("/api/paramenterRecomed/get-ket-luan-chi-tiet").post(ParameterRecomedConfigController.getKLCT);

    app.route("/api/paramenterRecomed/getAllByLevel").post(ParameterRecomedConfigController.getAllByLevel);
    app.route("/api/paramenterRecomed/getAllByLevels").post(ParameterRecomedConfigController.getAllByLevels);

    app.route("/api/paramenterRecomed/getAllCocludeDetail").post(ParameterRecomedConfigController.getAllCocludeDetail);

    app.route("/api/paramenterRecomed/getAllCocludeOverView").post(ParameterRecomedConfigController.getAllCocludeOverView);
    
    const MinisinzeController = require("../../../controllers/MinisinzeController");
    app.route("/api/minisize/update").post(MinisinzeController.addOrUpdate);

    app.route("/api/minisize/getInfo").get(MinisinzeController.getInfo);
    app.route("/api/minisize/getInfoAdmin").get(MinisinzeController.getInfoAdmin);

    // sdk and notificaion
    const sdkRouter = require("../../../controllers/MakeUpControllerNew/SdkController");
    const itemRouter = require("../../../controllers/MakeUpControllerNew/ItemController");
    const messageRouter = require("../../../controllers/MakeUpControllerNew/MessageController");


    const XemtuongController = require("../../../controllers/XemtuongController");
    app.route("/api/xemtuong/addorupdate").post(XemtuongController.addOrUpdate);
    app.route("/api/xemtuong/getInfo").get(XemtuongController.getInfo);
    app.route("/api/xemtuong/getInfoAdmin").get(XemtuongController.getInfoAdmin);
    app.route("/api/xemtuong/getAllCustomer").get(XemtuongController.getAllCustomer);
    app.route("/api/xemtuong/getallCompany").get(XemtuongController.getallCompany);

    app.use("/sdk", sdkRouter);
    app.use("/itemSdk", itemRouter);
    app.use("/message", messageRouter);
};
