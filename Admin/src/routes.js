import React from 'react';

const Dashboard = React.lazy(() => import('./views/DashBoard/Dashboard'));
const TableUser = React.lazy(() => import('./views/base/tables/TableUser'));
const TableCompany = React.lazy(() => import('./views/base/tables/Company'));
const TableKey = React.lazy(() => import('./views/base/tables/Key'));
const TableKeyOrder = React.lazy(() => import('./views/base/tables/KeyOrder'));
const TablePakageSale = React.lazy(() => import('./views/base/tables/PakageSale'));
const TablePakageSaleLog = React.lazy(() => import('./views/base/tables/PakageSaleLog'));
const TableRole = React.lazy(() => import('./views/base/tables/Role'));
const TableTypeKey = React.lazy(() => import('./views/base/tables/TypeKey'));
const TableLink = React.lazy(() => import('./views/base/tables/Link'));
const HistorySkinUser = React.lazy(() => import('./views/base/tables/HistorySkinUser'));

const ListShopManager = React.lazy(() => import('./views/base/tables/ListShopManager'));
const ListSale = React.lazy(() => import('./views/base/tables/ListSale'));
const ListCustomer = React.lazy(() => import('./views/base/tables/ListCustomer'));
const HardWare = React.lazy(() => import('./views/base/tables/HardWare'));
const Order = React.lazy(() => import('./views/base/tables/CreateOrder'));
const OrderTable = React.lazy(() => import('./views/base/tables/OrderTable'));
const TransactionTable = React.lazy(() => import('./views/base/tables/Transaction'));
const HardWareManager = React.lazy(() => import('./views/base/tables/HardWareManager'));
const Profile = React.lazy(() => import('./views/users/ProfileUser'));
const SPENDING = React.lazy(() => import('./views/base/tables/SpendingOrder'));
const RoleManager = React.lazy(() => import('./views/base/tables/AI_Skin/RoleManager'));
const PluginManager = React.lazy(() => import('./views/base/tables/AI_Skin/PluginManager'));
const PackageManger = React.lazy(() => import('./views/base/tables/AI_Skin/PackageManger'));
const PluginCustomer = React.lazy(() => import('./views/base/tables/AI_Skin/PluginCustomerManager'));
const PluginCreateOrder = React.lazy(() => import('./views/base/tables/AI_Skin/PluginCreateOrder'));
const FeatureTable = React.lazy(() => import('./views/base/tables/AI_Skin/FeatureTable'));
const PluginOrderTable = React.lazy(() => import('./views/base/tables/AI_Skin/PluginOrderTable'));
const PluginUserTable = React.lazy(() => import('./views/base/tables/AI_Skin/PluginUserTable'));
const RewardInfomation = React.lazy(() => import('./views/base/tables/AI_Skin/RewardInfomation'));
const ListFeatureOfCustomer = React.lazy(() => import('./views/base/tables/AI_Skin/ListFeatureOfCustomer'));
const CusRequest = React.lazy(() => import('./views/base/tables/AI_Skin/CustomerRequestTable'));
const TypeRequest = React.lazy(() => import('./views/base/tables/AI_Skin/TypeRequestModel'));
const CustomerManager = React.lazy(() => import('./views/base/tables/AI_Skin/CustomerManager'));
const HistorySkin = React.lazy(() => import('./views/base/tables/AI_Skin/HistorySkin'));
const HistorySkinWithUser = React.lazy(() => import('./views/base/tables/AI_Skin/HistorySkinWithUser'));


const ContactCustomer = React.lazy(() => import('./views/base/tables/AI_Skin/ContactCustomer'));
const UpdatePackage = React.lazy(() => import('./views/base/tables/UpdatePackage'));
const BrandPlugin = React.lazy(() => import('./views/base/tables/AI_Skin/BrandPlugin'));
const ProductPlugin = React.lazy(() => import('./views/base/tables/Prouduct/ProductSpecialPlugin'));

const BrandSlider = React.lazy(() => import('./views/base/tables/Banner/BrandSlider'));


const vendorSpecial = React.lazy(() => import('./views/base/tables/vendorSpecial/BrandSlider'));

const bannerSmall = React.lazy(() => import('./views/base/tables/bannerSmall/BrandSlider'));

const bannermain = React.lazy(() => import('./views/base/tables/bannermain/BrandSlider'));

const bannerLuotSoi = React.lazy(() => import('./views/base/tables/bannerLuotSoi/BrandSlider'));


const PluginSubSaleTable = React.lazy(() => import('./views/base/tables/AI_Skin/PluginSubSaleTable'));

//User
const EndUserPlugin = React.lazy(() => import('./views/base/tables/User/EndUser'));
const EndUser2Plugin = React.lazy(() => import('./views/base/tables/AI_Skin/userRegiger'));
// config skin AI
const configSkinDisplay = React.lazy(() => import('./views/skin/configDisplay'));

//ADMIN MakeUp
const SuggestItem = React.lazy(() => import('./views/base/tables/MakeUp/SuggestItem'));
const Brand = React.lazy(() => import('./views/base/tables/MakeUp/Brand'));
const Product = React.lazy(() => import('./views/base/tables/MakeUp/Product'));
const ProductHair = React.lazy(() => import('./views/base/tables/MakeUp/ProductHair'));
const SubType = React.lazy(() => import('./views/base/tables/MakeUp/SubType'));
const SubTypeHair = React.lazy(() => import('./views/base/tables/MakeUp/SubTypeHair'));
const SubTypeMakeUp = React.lazy(() => import('./views/base/tables/MakeUp/SubTypeMakeUp'));
const Color = React.lazy(() => import('./views/base/tables/MakeUp/Color'));
const TypeOne = React.lazy(() => import('./views/base/tables/MakeUp/TypeOne'));

const BookOne = React.lazy(() => import('./views/base/tables/Book/TypeOne'));

const configWeb = React.lazy(() => import("./views/config/configWeb"));
const configMinisize = React.lazy(() => import("./views/minisize/configBeauty"));

const configGame = React.lazy(() => import("./views/game/configWeb"));

const configBeauty = React.lazy(() => import("./views/beauty/configBeauty"));

const configBeauty2 = React.lazy(() => import("./views/tuvan/configBeauty"));


const Banner = React.lazy(() => import('./views/base/tables/Banner/Banner'));
const configContent = React.lazy(() => import('./views/skin/content'));
const configOverView = React.lazy(() => import('./views/skin/overView'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', name: 'Users', component: TableUser },
  { path: '/company', name: 'Company', component: TableCompany },
  { path: '/key', name: 'Key', component: TableKey },
  { path: '/key_order', name: 'Key', component: TableKeyOrder },
  { path: '/pakage_sale', name: 'Sale', component: TablePakageSale },
  { path: '/pakage_sale_log', name: 'SaleLog', component: TablePakageSaleLog },
  { path: '/type_key', name: 'TypeKey', component: TableTypeKey },
  { path: '/role', name: 'Role', component: TableRole },
  { path: '/link', name: 'Key', component: TableLink },
  { path: '/history', name: 'HistorySkin', component: HistorySkinUser },
  { path: '/lich-su-ca-nhan/:key', name: 'historyPersonal', component: HistorySkinWithUser },

  { path: '/sales', name: 'ShopManager', component: ListSale },
  { path: '/shopmanager', name: 'ShopManager', component: ListShopManager },
  { path: '/customers', name: 'Customers', component: ListCustomer },
  { path: '/hardware', name: 'HardWares', component: HardWare },
  { path: '/orders', name: 'Orders', component: Order },
  { path: '/order_table', name: 'Order Table', component: OrderTable },
  { path: '/transaction', name: 'Transaction', component: TransactionTable },
  { path: '/hardwaremanager', name: 'HardWare', component: HardWareManager },
  { path: '/profile', name: 'Profile', component: Profile },

  { path: '/spending_order', name: 'SPENDING', component: SPENDING },
  { path: '/role_manager', name: 'Role Manager', component: RoleManager },
  { path: '/plugin_manager', name: 'Plugin Manager', component: PluginManager },
  { path: '/manager-package', name: 'Plugin Manager', component: PackageManger },
  
  { path: '/danh-sach-khach-hang', name: 'Customer Manager', component: PluginCustomer },
  { path: '/plugin_create_order', name: 'Create Order', component: PluginCreateOrder },
  { path: '/feature', name: 'Feature', component: FeatureTable },
  { path: '/list_order', name: 'Order Plugin', component: PluginOrderTable },
  { path: '/saleAdmin', name: 'SALE', component: PluginUserTable },
  { path: '/reward_info', name: 'REWARD_INFO', component: RewardInfomation },
  { path: '/feature_customer', name: 'REWARD_INFO', component: ListFeatureOfCustomer },
  { path: '/cus_request', name: 'REWARD_INFO', component: CusRequest },
  { path: '/type_request', name: 'REWARD_INFO', component: TypeRequest },
  { path: '/customer', name: 'Customer Manager', component: CustomerManager },
  { path: '/historyskin', name: 'History Skin', component: HistorySkin },
  { path: '/update_package', name: 'UpdatePackage', component: UpdatePackage },
  { path: '/contact', name: 'Contact', component: ContactCustomer },
  { path: '/brand_skin', name: 'Brand Skin', component: BrandPlugin },
  { path: '/subsale', name: 'Sub Sale', component: PluginSubSaleTable },
  { path: '/skin/config', name: 'confgSkinDisplay', component: configSkinDisplay },
  //admin product
  { path: '/products-special', name: 'productSpecial', component: ProductPlugin },
  {
    path: "/cau-hinh-trang-web",
    name: "configWeb",
    component: configWeb,
  },
  {
    path: "/banner-ket-qua",
    name: "configBeauty",
    component: configMinisize,
  },
  {
    path: "/game-tuoi-da",
    name: "configGame",
    component: configGame,
  },

  {
    path: "/quan-ly-diem-dep",
    name: "configBeauty",
    component: configBeauty,
  },
  
  {
    path: "/cau-hinh-tu-van",
    name: "configTuVan",
    component: configBeauty2,
  },

  //User
  { path: '/end_user', name: 'End User', component: EndUserPlugin },
  { path: '/danh-sach-nguoi-dung', name: 'End Userv2', component: EndUser2Plugin },

  
  { path: '/banner', name: 'Banner User', component: Banner },
                                    
  { path: '/quan-ly-banner', name: 'BannerSlider', component: BrandSlider },

  { path: '/quan-ly-banner-nhieu-luot-soi', name: 'banner2', component: bannerLuotSoi },
  { path: '/quan-ly-banner-nho', name: 'banner2', component: bannerSmall },
  { path: '/quan-ly-banner-chinh', name: 'bannermain', component: bannermain },
  { path: '/nha-cung-cap-noi-bat', name: 'vendorSpecial', component: vendorSpecial },
  //Admin MakeUp
  { path: '/suggest', name: 'SuggestItem', component: SuggestItem },
  { path: '/brand', name: 'BRAND', component: Brand },
  { path: '/product', name: 'BRAND', component: Product },
  { path: '/product_hair', name: 'BRAND', component: ProductHair },
  { path: '/subtype', name: 'Sub Type', component: SubType },
  { path: '/subtype_hair', name: 'Sub Type', component: SubTypeHair },
  { path: '/subtype_makeup', name: 'Sub Type', component: SubTypeMakeUp },
  { path: '/color', name: 'Color', component: Color },
  { path: '/items/0', name: 'K1', component: TypeOne },
  { path: '/items/1', name: 'K2', component: TypeOne },
  { path: '/items/2', name: 'K3', component: TypeOne },
  { path: '/items/3', name: 'K4', component: TypeOne },
  { path: '/items/4', name: 'K5', component: TypeOne },
  { path: '/items/5', name: 'K6', component: TypeOne },
 
  { path: '/book/sach-tieng-anh', name: 'book1', component: BookOne },
  { path: '/book/sach-nuoi-day-con', name: 'book2', component: BookOne },
  { path: '/book/tap-chi-thoi-trang', name: 'book3', component: BookOne },
  
  { path: '/book/ly-thuyet-va-sach-noi', name: 'book4', component: BookOne },
  { path: '/book/tieu-thuyet', name: 'book5', component: BookOne },
  { path: '/book/truyen-ngan', name: 'book6', component: BookOne },
  { path: '/book/lich-su', name: 'book7', component: BookOne },
  { path: '/book/sach-van-hoc', name: 'book1', component: BookOne },
  { path: '/book/sach-kinh-te', name: 'book2', component: BookOne },
  { path: '/book/sach-thieu-nhi', name: 'book3', component: BookOne },
  
  { path: '/book/sach-ky-nang-song', name: 'book4', component: BookOne },
  { path: '/book/sach-ba-me-em-be', name: 'book5', component: BookOne },
  { path: '/book/sach-giao-khoa-giao-trinh', name: 'book6', component: BookOne },
  { path: '/book/sach-hoc-ngoai-ngu', name: 'book7', component: BookOne },


  { path: '/book/sach-tham-khao', name: 'book4', component: BookOne },
  { path: '/book/tu-dien', name: 'book5', component: BookOne },
  { path: '/book/kien-thuc-tong-hop', name: 'book6', component: BookOne },
  { path: '/book/khoa-hoc-ki-thuat', name: 'book7', component: BookOne },


  { path: '/book/dien-anh-nha-hoa', name: 'book4', component: BookOne },
  { path: '/book/truyen-tranh-manga-comic', name: 'book5', component: BookOne },
  { path: '/book/sach-ton-giao-tam-linh', name: 'book6', component: BookOne },
  { path: '/book/sach-van-hoa-dia-ly-du-lich', name: 'book7', component: BookOne },


  { path: '/book/sach-chinh-tri-phap-ly', name: 'book4', component: BookOne },
  { path: '/book/sach-nong-lam-ngu-nghiep', name: 'book5', component: BookOne },
  { path: '/book/sach-cong-nghe-thong-tin', name: 'book6', component: BookOne },
  { path: '/book/sach-y-hoc', name: 'book7', component: BookOne },

  { path: '/book/tap-chi-catalogue', name: 'book7', component: BookOne },
  { path: '/book/tam-ly-gioi-tinh', name: 'book7', component: BookOne },
  { path: '/book/thuong-thuc-gia-dinh', name: 'book7', component: BookOne },
  { path: '/book/the-duc-the-thao', name: 'book7', component: BookOne },



  
  { path: '/history/:phoneNumber', name: 'historyview', component: HistorySkin },

  { path: '/skin/configContent', name: 'configContent', component: configContent },
  { path: '/skin/configOverView', name: 'configOverView', component: configOverView },
];

export default routes;
