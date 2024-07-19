import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ModalHeader, ModalBody, ModalFooter, Modal } from "reactstrap";
import Swal from "sweetalert2";
import TextFieldGroup from "../../views/Common/TextFieldGroup";
import API_CONNECT from "../../../src/functions/callAPI";
import { CButton } from "@coreui/react";
import "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import Constants from "./../../contants/contants";
import axios from "axios";
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import { IoLogoBuffer } from "@react-icons/all-files/io/IoLogoBuffer";
import Chats from "./configWeb/Chats";
import Embeds from "./configWeb/InfoCompany";
import BannerAia from "./configWeb/BannerAia";
import Logo from "./configWeb/Logo";
import SlideShow from "./configWeb/SlideShow";
import Mxh from "./configWeb/Mxh";
import Voucher from "./configWeb/Voucher";
import Form from "./configWeb/Form";
import Seo from "./configWeb/Seo";
import ButtonConfig from "./configWeb/Button";
import ChangeColor from "./configWeb/Color";
import Homepage from "./configWeb/Homepage";
import { BiSlideshow } from 'react-icons/bi';
import { MdOutlinePermDataSetting } from 'react-icons/md';
import { BsChatDots } from 'react-icons/bs';
import { IoLogoInstagram ,IoColorPaletteOutline} from 'react-icons/io5';


let headers = new Headers();
const auth = localStorage.getItem("auth");

headers.append("Authorization", "Bearer " + auth);
headers.append("Content-Type", "application/json");
class ConfigWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerCampaign : [],
      actionModalBannerCampaign : "new",
      modalBannerCampaign : false,
      centerFooterLeft: true,
      centerFooterRight: true,
      configData: [],
      tabNameConfig: [
       
       
        {
          _id: "9",
          name: "Banner trang",
          icon: (
            <BiSlideshow style={{ width: "24px ", height: "24px " }} />
          ),
        },
        {
          _id: "3",
          name: "Cấu hình SEO",
          icon: (
            <MdOutlinePermDataSetting style={{ width: "24px ", height: "24px " }} />
          ),
        },
        {
          _id: "4",
          name: "Logos",
          icon: <IoLogoBuffer style={{ width: "24px ", height: "24px " }} />,
        },
        // {
        //   _id: "5",
        //   name: "Mã Chat",
        //   icon: <BsChatDots style={{ width: "24px ", height: "24px " }} />,
        // },
       
    
        {
          _id: "8",
          name: "Cấu hình theme",
          icon: (
            <IoColorPaletteOutline style={{ width: "24px ", height: "24px " }} />
          ),
        },
        {
          _id: "10",
          name: "Thông tin mạng xã hội",
          icon: <BsChatDots style={{ width: "24px ", height: "24px " }} />,
        },
     
        
      ],
      company_id: JSON.parse(localStorage.getItem("user")).company_id
        ? JSON.parse(localStorage.getItem("user")).company_id
        : null,

      action: "new",
      codeChat: "",
      idUpdate: "",
      checkFb: false,
      checkGg: true,
      data: [],
      updated: "",
      dataApi: [],
      delete: null,
      hidden: true,
      token: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      role: localStorage.getItem("role"),
      type: localStorage.getItem("type"),
      current_slug: "",
      companyID: "",
      arrTotalPackage: [],
      isChange: true,
      isChangeSlug: true,
      currentPassword: "",
      isLoading: false,
      isDisable: true,
      Email: "",

      updateLevel: "1",

      statusModalUpdate: false,
      dataConfigWeb: null,
      idUpdateCurrent: null,
      loadingSaveLogo: false,
      htmlFuncWeb: null,
      openHomeItem: false,
      modalSlide: false,
      actionSlide: "new",
    };
  }

  ToggleViewConfigWeb(id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tablinks = document.getElementsByClassName("tablinks");
    const { tabNameConfig } = this.state;
    for (i = 0; i < tabNameConfig.length; i++) {
      if (tabNameConfig[i]._id === id) {
        tablinks[i].classList.add("tabcontent-left-active");
      } else {
        tablinks[i].classList.remove("tabcontent-left-active");
      }
    }
    for (i = 0; i < tabcontent.length; i++) {
      if (tabcontent[i].id.replace("tabcontent", "") === id) {
        tabcontent[i].classList.add("defaultOpen");
        tabcontent[i].style.animation = "hideOpa 1s ease-in-out";
      } else {
        tabcontent[i].classList.remove("defaultOpen");
        tabcontent[i].style.animation = "none";
      }
    }
  }
  onChangeImage = (e, value, valueLink, valueShow) => {
    let files = e.target.files;
    let reader = new FileReader();
    this.setState({ [valueLink]: files[0] });
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({ [value]: e.target.result, [valueShow]: e.target.result });
    };
  };
  async componentDidMount() {
    await this.getFooter();
    await this.getDataConfigWeb();
    await this.getData();
    let arr = JSON.parse(localStorage.getItem("url"));
    for (let i = 0; i < arr.length; i++) {
      if ("#" + arr[i].to == window.location.hash) {
        if (arr[i].hidden == true) {
          window.location.href = "#/";
        }
      }
    }

    this.ToggleViewConfigWeb("9");
  }

  async getDataConfigWeb() {
    
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/config/getAll";
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    await axios
      .get(url, {
        params: {
          key: "webinfo",
          company_id: Output_newComany_id,
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          let dataConfig = res.data.data[0];

          let valueConfig = JSON.parse(dataConfig.Value);
          console.log("webinfo", valueConfig);
          this.setState(
            {
              dataConfigWeb: valueConfig,
              idUpdate: dataConfig._id,
              chats: valueConfig.value.chats,
              embeds:valueConfig.value.embeds,
              logos: valueConfig.value.logos,
              seoInfo: valueConfig.value.seoInfo,
              homepage: valueConfig.value.homepage,
              slideShow: valueConfig.value.slideShow,
              mxh: valueConfig.value.mxh,
              
              statusConfig: valueConfig.value.statusConfig,
              configData: valueConfig.value.statusConfig,
              footer: valueConfig.value.footer,
              banner: valueConfig.value.banner,
              button: valueConfig.value.button,
              voucher: valueConfig.value.voucher,
              form: valueConfig.value.form,
              aia: valueConfig.value.aia,
              bannerCampaign : valueConfig.value.bannerCampaign,
              embedHotline: valueConfig.value.embedHotline,
              embeddFacebook: valueConfig.value.embeddFacebook,
              embeddZalo: valueConfig.value.embeddZalo


            },
            () => {
              const {
                homepage,
                seoInfo,
                logos,
                chats,
                embeds,
                configData,
                mxh,
                footer,
                banner,
                button,
                voucher,
                form,
                aia,
                bannerCampaign,
                embedHotline,
                embeddFacebook,
                embeddZalo

              } = this.state;
              if (aia) {
                this.setState({
                  titleGetVoucherAia: this.state.aia.titleGetVoucherAia,
                  titleListCam: this.state.aia.titleListCam,
                  titleSuggestFormLoginGetVoucher:
                    this.state.aia.titleSuggestFormLoginGetVoucher,
                  titleFormGetVoucherAfterLoginFormSuggest:
                    this.state.aia.titleFormGetVoucherAfterLoginFormSuggest,
                });
              }
              if (form) {
                this.setState({
                  titleLogin: this.state.form.titleLogin,
                  btn_login: this.state.form.btn_login,
                  titleUpdate: this.state.form.titleUpdate,
                  btn_update: this.state.form.btn_update,
                  registerGetVoucher: this.state.form.receiveVoucher,
                  loginWatchVoucher: this.state.form.loginWatchVoucher,
                  receiveVoucher: this.state.form.receiveVoucher,
                  textSales: this.state.form.textSales,
                  btn_register_get_voucher : this.state.form.btn_register_get_voucher,
                  title_get_voucher: this.state.form.title_get_voucher,
                  receiveVoucherSuccess:
                    this.state.form.receiveVoucherSuccess,
                    
                });
              }
              if (button) {
                this.setState({
                  btn_soida: this.state.button.btn_soida,
                  btn_get_voucher: this.state.button.btn_get_voucher,
                  btn_get_voucher2: this.state.button.btn_get_voucher2,
                  btn_register_get_voucher:
                    this.state.button.btn_register_get_voucher,
                });
              }
              if (voucher) {
                this.setState({
                  voucherEndow: this.state.voucher.voucherEndow,
                  voucherExpiry: this.state.voucher.voucherExpiry,
                  voucherSupplier: this.state.voucher.voucherSupplier,
                  voucherCondition: this.state.voucher.voucherCondition,
                  infoVoucher: this.state.voucher.infoVoucher,
                  imageFormVoucher: this.state.voucher.imageFormVoucher,
                  sendSMS: this.state.voucher.sendSMS,     
                  classImageVoucher: this.state.voucher.classImageVoucher,               
                });
              }
              if (banner) {
                this.setState({
                  hrefImageBannerMobile:
                    this.state.banner.hrefImageBannerMobile,
                  hrefImageBannerDesktop:
                    this.state.banner.hrefImageBannerDesktop,

                  imageBannerDesktop: this.state.banner.imageBannerDesktop,
                  imageBannerDesktop_link: this.state.banner.imageBannerDesktop,
                  imageBannerDesktop_show: this.state.banner.imageBannerDesktop,

                  imageBannerMobile: this.state.banner.imageBannerMobile,
                  imageBannerMobile_link: this.state.banner.imageBannerMobile,
                  imageBannerMobile_show: this.state.banner.imageBannerMobile,
                });
              }
              if(bannerCampaign){
                this.setState({
                  bannerCampaign: this.state.bannerCampaign
                })
              }
              if (footer) {
                this.setState({
                  footerLeft: this.state.footer.footerLeft,
                  footerRight: this.state.footer.footerRight,
                  centerFooterRight: this.state.footer.centerFooterRight,
                  centerFooterLeft: this.state.footer.centerFooterLeft,
                });
              }

              if (homepage) {
                this.setState({
                  loginViewResult1: this.state.homepage.loginViewResult1,
                  loginViewResult2: this.state.homepage.loginViewResult2,
                  loginViewResult3: this.state.homepage.loginViewResult3,
                  loginViewResult4: this.state.homepage.loginViewResult4,
                  textResultDepthSkin: this.state.homepage.textResultDepthSkin,
                  titleResultDepthSkin:
                    this.state.homepage.titleResultDepthSkin,
                  textResultSkin: this.state.homepage.textResult,
                  titleResultSkin: this.state.homepage.titleResult,
                  textAi: this.state.homepage.textAi,
                  titlePen1: this.state.homepage.title1,
                  titlePen2: this.state.homepage.title2,
                  sologan: this.state.homepage.sologan,
                  introduce: this.state.homepage.introduction,
                  titlePhoto: this.state.homepage.titlePhoto,
                  titleButtonPhoto: this.state.homepage.titleButtonPhoto,
                  titleButtonChoose: this.state.homepage.titleButtonChoose,
                  buttonSuggestLogin1: this.state.homepage.buttonSuggestLogin1,
                  buttonSuggestLogin2: this.state.homepage.buttonSuggestLogin2,
                  titleStep2: this.state.homepage.titleStep2,
                  titleStep1: this.state.homepage.titleStep1,
                  titleStep3: this.state.homepage.titleStep3,
                  image1: this.state.homepage.image1,
                  image1_show: this.state.homepage.image1,
                  image1_link: this.state.homepage.image1,
                  image3_link: this.state.homepage.image3,
                  image3: this.state.homepage.image3,
                  image3_show: this.state.homepage.image3,
                  image2_link: this.state.homepage.image2,
                  image2: this.state.homepage.image2,
                  image2_show: this.state.homepage.image2,
                  imagePhoto: this.state.homepage.imagePhoto,
                  imagePhoto_link: this.state.homepage.imagePhoto,
                  imagePhoto_show: this.state.homepage.imagePhoto,
                });
              }
              if (seoInfo) {
                this.setState({
                  titleSeo: this.state.seoInfo.title,
                  titleSeo2: this.state.seoInfo.titleSEO,
                  descSeo: this.state.seoInfo.description,
                  imgLayout: this.state.seoInfo.imageShare,
                  imgLayout_show: this.state.seoInfo.imageShare,
                  imgLayout_link: this.state.seoInfo.imageShare,

                  imageShareSeo: this.state.seoInfo.imageShareSeo,
                  imageShareSeo_link: this.state.seoInfo.imageShareSeo,
                  imageShareSeo_show: this.state.seoInfo.imageShareSeo,

                  keywordSeo: this.state.seoInfo.key,
                  authorSeo: this.state.seoInfo.author,
                });
              }
              if (logos) {
                this.setState({
                  classLogo : valueConfig.value.logos.classLogo,
                  hrefLogoHeader: valueConfig.value.logos.header.href,
                  hrefLogoFooter: valueConfig.value.logos.footer.href,
                  image: valueConfig.value.logos.header.logo,
                  imgLogoFooter: valueConfig.value.logos.footer.logo,
                });
              }
              if (chats) {
                this.setState({
                  codeChat: this.state.chats.tawk,
                  codeMess: this.state.chats.mess,
                });
              }

              if (embeds) {

                this.setState({
                  embeddFacebook: this.state.embeds.embeddFacebook,
                  embeddZalo: this.state.embeds.embeddZalo,
                  embedHotline: this.state.embeds.embedHotline
                });
              }
              


              if (mxh) {
                this.setState({
                  keyAppFb: this.state.mxh.facebook.appid,
                  PassFb: this.state.mxh.facebook.password,
                  hrefFb: this.state.mxh.facebook.href,

                  keyAppZalo: this.state.mxh.zalo.appid,
                  PassZalo: this.state.mxh.zalo.password,
                  hrefZalo: this.state.mxh.zalo.href,

                  keyAppGg: this.state.mxh.google.appid,
                  PassGg: this.state.mxh.google.password,
                  hrefGg: this.state.mxh.google.href,
                });
              }
            }
          );
        } else {
          let templateDataConfigWeb = {
            key: "webinfo",
            value: {
              logos: {
                footer: {
                  logo: "",
                  href: "",
                },
                header: {
                  logo: "",
                  href: "",
                },
              },
              chats: {
                tawk: "",
              },
              embeds: {
                embeddFacebook: "",
                embeddZalo: "",
                embedHotline: ""
              },
              slideShow: [],
              statusConfig: [],

              homepage: {},
              seoInfo: {},

              mxh: {
                facebook: {
                  appid: "",
                  password: "",
                  href: "",
                },
                google: {
                  appid: "",
                  password: "",
                  href: "",
                },
                zalo: {
                  appid: "",
                  password: "",
                  href: "",
                },
              },
            },
          };

          this.setState(
            {
              dataConfigWeb: templateDataConfigWeb,
            },
            () => {
              this.addDataConfig();
            }
          );
        }
      });
  }
  async addDataConfig() {
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/config/add";
    axios
      .post(url, {
        dataType: "1",
        company_id: Output_newComany_id,
        key: "webinfo",
        value: JSON.stringify(this.state.dataConfigWeb),
        type: "system",
      })
      .then((res) => {});
  }
  async getFooter() {
    var baseUrlapi = Constants.BASE_URL;
    let urlCall = Constants.GET_FOOTER;
    let url = baseUrlapi + urlCall;
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    axios
      .get(url, {
        params: {
          company_id: Output_newComany_id,
        },
      })
      .then((res) => {
        this.setState({
          dataFooter: res.data.data,
        });
      });
  }

  async updateFooter() {
    const { slugFooter, updateLink, contentFooter, updateTitle } = this.state;
    var baseUrlapi = Constants.BASE_URL;
    let urlCall = Constants.UPDATE_FOOTER;
    let url = baseUrlapi + urlCall;
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    await axios
      .post(url, {
        id: this.state.idFooterEditor,
        title: updateTitle,
        content: contentFooter,
        slug: slugFooter,
        link: updateLink,
        company_id: Output_newComany_id,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 700,
        });
        this.setState({
          statusModalUpdate: false,
        });
        this.getFooter();
      });
  }
  async addFooter() {
    const { slugFooter, updateLink, contentFooter, updateTitle } = this.state;
    var baseUrlapi = Constants.BASE_URL;
    let urlCall = Constants.ADD_FOOTER;
    let url = baseUrlapi + urlCall;
    const newComany_id = this.state.company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    await axios
      .post(url, {
        title: updateTitle,
        content: contentFooter,
        slug: slugFooter,
        link: updateLink,
        company_id: Output_newComany_id,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Thêm mới thành công",
          showConfirmButton: false,
          timer: 700,
        });
        this.setState({
          statusModalUpdate: false,
        });
        this.getFooter();
      });
  }
  async postImage(link) {
    var newImage = "";
    debugger;
    if (link && link !== "") {
      const form = new FormData();

      form.append("image", link);

      await API_CONNECT(Constants.UPLOAD_IMAGE_BRAND, form, "", "POST").then(
        (res) => {}
      );

      newImage = link.name;
      return newImage;
    } else {
      return newImage;
    }
  }
  SaveAllConfigWeb = async (change) => {
    const {
      dataConfigWeb,
      introduce,
      sologan,
      titleSeo,
      titleSeo2,
      descSeo,
      authorSeo,
      keywordSeo,
      imgLayout_link,
      image1_link,
      image2_link,
      image3_link,
      embeddFacebook,
      embeddZalo,
      embedHotline
    } = this.state;
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/config/update";
    const newComany_id = this.state.company_id;
    let itOutput = "-1";
    if (newComany_id) {
      itOutput = newComany_id;
    }
    let coppyData = {
      ...dataConfigWeb,
    };

    if (change === "mxh") {
      if (!coppyData.value.mxh) {
        coppyData.value.mxh = {};
      };
      // coppyData.value.statusConfig = this.state.configData;
      coppyData.value.mxh.facebook.appid = this.state.keyAppFb;
      coppyData.value.mxh.facebook.password = this.state.PassFb;
      coppyData.value.mxh.facebook.href = this.state.hrefFb;
      coppyData.value.mxh.google.appid = this.state.keyAppGg;
      coppyData.value.mxh.google.password = this.state.PassGg;
      coppyData.value.mxh.google.href = this.state.hrefGg;
      coppyData.value.mxh.zalo.appid = this.state.keyAppZalo;
      coppyData.value.mxh.zalo.password = this.state.PassZalo;
      coppyData.value.mxh.zalo.href = this.state.hrefZalo;
    }
    if(change === "bannerCampaign"){
      coppyData.value.bannerCampaign = this.state.bannerCampaign;
    }
    if (change === "chats") {
      coppyData.value.chatMess = this.state.codeMess;
      coppyData.value.tawk = this.state.codeChat;
    }

    if (change === "embeds") {
      coppyData.value.embeddFacebook = this.state.embeddFacebook;
      coppyData.value.embeddZalo = this.state.embeddZalo;
      coppyData.value.embedHotline = this.state.embedHotline;
    }
    if (change === "voucher") {
      if (!coppyData.value.voucher) {
        coppyData.value.voucher = {};
      }
      
    coppyData.value.voucher.classImageVoucher = this.state.classImageVoucher;

    coppyData.value.voucher.voucherEndow = this.state.voucherEndow;
    coppyData.value.voucher.voucherExpiry = this.state.voucherExpiry;
    coppyData.value.voucher.voucherSupplier = this.state.voucherSupplier;
    coppyData.value.voucher.voucherCondition = this.state.voucherCondition;

    coppyData.value.voucher.sendSMS = this.state.sendSMS;
    coppyData.value.voucher.registerGetVoucher =
    this.state.registerGetVoucher;

    coppyData.value.voucher.infoVoucher = this.state.infoVoucher;
    coppyData.value.voucher.loginWatchVoucher = this.state.loginWatchVoucher;
    coppyData.value.voucher.receiveVoucher = this.state.receiveVoucher;
    coppyData.value.voucher.textSales = this.state.textSales;
    coppyData.value.voucher.receiveVoucherSuccess =
    this.state.receiveVoucherSuccess;
      let newImage = await this.postImage(this.state.imageFormVoucher_link);
      if (newImage) {
        coppyData.value.voucher.imageFormVoucher = `${Constants.BASE_URL}image_brand/${newImage}`;
      }
    }
    if (change === "button") {
      if (!coppyData.value.button) {
        coppyData.value.button = {};
      }
      coppyData.value.button.btn_register_get_voucher =
        this.state.btn_register_get_voucher;
      coppyData.value.button.btn_soida = this.state.btn_soida;
      coppyData.value.button.btn_get_voucher = this.state.btn_get_voucher;
      coppyData.value.button.btn_get_voucher2 = this.state.btn_get_voucher2;
    }
    if (change === "aia") {
      if (!coppyData.value.aia) {
        coppyData.value.aia = {};
      }
      coppyData.value.aia.titleListCam = this.state.titleListCam;
      coppyData.value.aia.titleGetVoucherAia = this.state.titleGetVoucherAia;
      coppyData.value.aia.titleSuggestFormLoginGetVoucher =
        this.state.titleSuggestFormLoginGetVoucher;
      coppyData.value.aia.titleFormGetVoucherAfterLoginFormSuggest =
        this.state.titleFormGetVoucherAfterLoginFormSuggest;
    }

    if (change === "form") {
      if (!coppyData.value.form) {
        coppyData.value.form = {};
      }
      
      coppyData.value.form.title_get_voucher = this.state.title_get_voucher;
      coppyData.value.form.registerGetVoucher = this.state.registerGetVoucher;
      coppyData.value.form.btn_register_get_voucher = this.state.btn_register_get_voucher;
      coppyData.value.form.receiveVoucher = this.state.registerGetVoucher;
      coppyData.value.form.textSales = this.state.textSales;
      coppyData.value.form.loginWatchVoucher = this.state.loginWatchVoucher;

      
      coppyData.value.form.btn_update = this.state.btn_update;
      coppyData.value.form.titleUpdate = this.state.titleUpdate;

      coppyData.value.form.btn_login = this.state.btn_login;
      coppyData.value.form.titleLogin = this.state.titleLogin;
    }
    if (change === "homepage") {
      debugger;
      if (!coppyData.value.homepage) {
        coppyData.value.homepage = {};
      }
      coppyData.value.homepage.loginViewResult1 = this.state.loginViewResult1;
      coppyData.value.homepage.loginViewResult2 = this.state.loginViewResult2;
      coppyData.value.homepage.loginViewResult3 = this.state.loginViewResult3;
      coppyData.value.homepage.loginViewResult4 = this.state.loginViewResult4;
      coppyData.value.homepage.titleResultDepthSkin =
        this.state.titleResultDepthSkin;
      coppyData.value.homepage.textResultDepthSkin =
        this.state.textResultDepthSkin;
      coppyData.value.homepage.titleResult = this.state.titleResultSkin;
      coppyData.value.homepage.textResult = this.state.textResultSkin;
      coppyData.value.homepage.titleButtonPhoto = this.state.titleButtonPhoto;
      coppyData.value.homepage.titleButtonChoose = this.state.titleButtonChoose;
      coppyData.value.homepage.buttonSuggestLogin1 =
        this.state.buttonSuggestLogin1;
      coppyData.value.homepage.buttonSuggestLogin2 =
        this.state.buttonSuggestLogin2;
      coppyData.value.homepage.titleStep1 = this.state.titleStep1;
      coppyData.value.homepage.titleStep2 = this.state.titleStep2;
      coppyData.value.homepage.titleStep3 = this.state.titleStep3;
      coppyData.value.homepage.titlePhoto = this.state.titlePhoto;
      coppyData.value.homepage.title1 = this.state.titlePen1;
      coppyData.value.homepage.title2 = this.state.titlePen2;
      coppyData.value.homepage.textAi = this.state.textAi;
      coppyData.value.homepage.sologan = sologan;
      coppyData.value.homepage.introduction = introduce;
      let imgLink = await this.postImage(this.state.imagePhoto_link);
      let newImage2 = await this.postImage(image2_link);
      let newImage3 = await this.postImage(image3_link);
      if (imgLink) {
        coppyData.value.homepage.imagePhoto = `${Constants.BASE_URL}/image_brand/${imgLink}`;
      }
      if (newImage2) {
        coppyData.value.homepage.image2 = `${Constants.BASE_URL}/image_brand/${newImage2}`;
      }
      if (newImage3) {
        coppyData.value.homepage.image3 = `${Constants.BASE_URL}/image_brand/${newImage3}`;
      }
    }
    if (change === "seoInfo") {
      if (!coppyData.value.seoInfo) {
        coppyData.value.seoInfo = {};
      }
      coppyData.value.seoInfo.title = titleSeo;
      coppyData.value.seoInfo.titleSEO = titleSeo2;
      coppyData.value.seoInfo.description = descSeo;
      coppyData.value.seoInfo.author = authorSeo;
      coppyData.value.seoInfo.key = keywordSeo;
      let newImage4 = await this.postImage(imgLayout_link);
      if (newImage4) {
        coppyData.value.seoInfo.imageShare = `${Constants.BASE_URL}/image_brand/${newImage4}`;
      }
      let imageShare = await this.postImage(this.state.imageShareSeo_link);
      if (imageShare) {
        coppyData.value.seoInfo.imageShareSeo = `${Constants.BASE_URL}/image_brand/${imageShare}`;
      }
      this.setState({
        dataConfigWeb: coppyData,
      });
    }
    if (change === "footer") {
      if (!coppyData.value.footer) {
        coppyData.value.footer = {};
      }
      coppyData.value.footer.footerLeft = this.state.footerLeft;
      coppyData.value.footer.footerRight = this.state.footerRight;
      coppyData.value.footer.centerFooterRight = this.state.centerFooterRight;
      coppyData.value.footer.centerFooterLeft = this.state.centerFooterLeft;
      this.setState({
        dataConfigWeb: coppyData,
      });
    }
    if (change === "logos") {
      if (!coppyData.value.logos) {
        coppyData.value.logos = {};
      }
      coppyData.value.logos.classLogo = this.state.classLogo;
      let newImage = await this.postImage(this.state.image_link);
      if (newImage) {
        coppyData.value.logos.header.logo = `${Constants.BASE_URL}/image_brand/${newImage}`;
      }
      let newImage2 = await this.postImage(this.state.imgLogoFooter_link);
      if (newImage2) {
        coppyData.value.logos.footer.logo = `${Constants.BASE_URL}/image_brand/${newImage2}`;
      }
      coppyData.value.logos.footer.href = this.state.hrefLogoFooter;
      coppyData.value.logos.header.href = this.state.hrefLogoHeader;
      this.setState({
        dataConfigWeb: coppyData,
      });
    }
    if (change === "banner") {
      if (!coppyData.value.banner) {
        coppyData.value.banner = {};
      }
      let newImage = await this.postImage(this.state.imageBannerDesktop_link);
      if (newImage) {
        coppyData.value.banner.imageBannerDesktop = `${Constants.BASE_URL}/image_brand/${newImage}`;
      }
      let newImage2 = await this.postImage(this.state.imageBannerMobile_link);
      if (newImage2) {
        coppyData.value.banner.imageBannerMobile = `${Constants.BASE_URL}/image_brand/${newImage2}`;
      }

      coppyData.value.banner.hrefImageBannerDesktop =
        this.state.hrefImageBannerDesktop;
      coppyData.value.banner.hrefImageBannerMobile =
        this.state.hrefImageBannerMobile;

      this.setState({
        dataConfigWeb: coppyData,
      });
    }
    await axios
      .post(url, {
        value: JSON.stringify(coppyData),
        dataType: "1",
        type: "system",
        company_id: itOutput,
        id: this.state.idUpdate,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Lưu thành công",
          showConfirmButton: false,
          timer: 700,
        });
        this.getDataConfigWeb();
      });
  };
  async onUpdate() {
    const { dataConfigWeb } = this.state;

    const newComany_id = this.state.company_id;
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "/api/config/update";
    await axios.post(url, {
      value: JSON.stringify(dataConfigWeb),
      dataType: "1",
      type: "system",
      company_id: newComany_id,
      id: this.state.idUpdate,
    });
  }
  getData = async () => {
    const newComany_id = this.state.company_id;

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.CONFIG_THEME_GET + "/" + newComany_id,
      method: "GET",
      headers: this.state.token,
    });
    let val = res.data.data;

    this.setState({
      dataApi: val,
      data: val,
      currentPassword: val.Password,
      isLoading: false,
      current_slug:
        val.Company_Id == null || val.Company_Id == undefined
          ? null
          : val.Company_Id.Slug,
      companyID:
        val.Company_Id == null || val.Company_Id == undefined
          ? null
          : val.Company_Id._id,

      mainColor: val.mainColor,
      sub_mainColor: val.sub_mainColor,
      Phone: val.Phone,
      Address: val.Address,
      UserName: val.UserName,
      Message_Code: val.Message_Code,
      sub2_mainColor: val.sub2_mainColor,
      button_color: val.button_color,
      sucess_color: val.sucess_color,
      error_color: val.error_color,
      text_mainColor: val.text_mainColor,
      isDisable: true,
    });
  };
  closeFormEdit = () => {
    this.setState({ statusModalUpdate: false });
  };
  openFormAddSlide = () => {
    this.setState({
      actionSlide: "new",
      modalSlide: true,
      imageSlide: "",
      imageSlide_link: "",
      imageSlide_show: "",
      contentSlide: "",
    });
  };
  async saveAddSlide() {
    const { contentSlide, dataConfigWeb, imageSlide_link } = this.state;
    let newImage = await this.postImage(imageSlide_link);
    let imageOutput;
    if (newImage) {
      imageOutput = `${Constants.BASE_URL}/image_brand/${newImage}`;
    } else {
      imageOutput = "";
    }
    let ob = {
      image: imageOutput,
      content: contentSlide,
    };
    let coppy = { ...dataConfigWeb };
    coppy.value.slideShow.push(ob);
    this.setState(
      {
        dataConfigWeb: coppy,
      },
      async () => {
        await this.onUpdate().then(() => {
          Swal.fire({
            icon: "success",
            title: "Thêm mới thành công",
            showConfirmButton: false,
            timer: 700,
          });
          this.setState({
            modalSlide: false,
          });
          this.getDataConfigWeb();
        });
      }
    );
  }
  openFormEditSlide = (item, i) => {
    this.setState({
      actionSlide: "edit",

      modalSlide: true,

      imageSlide: item.image,
      imageSlide_show: item.image,
      contentSlide: item.content,
      indexSlideUpdate: i,
    });
  };
  deleteSlide = async (i) => {
    const { dataConfigWeb } = this.state;
    let coppyData = {
      ...dataConfigWeb,
    };
    coppyData.value.slideShow.splice(i, 1);
    this.setState(
      {
        dataConfigWeb: coppyData,
      },
      async () => {
        await this.onUpdate().then(() => {
          Swal.fire({
            icon: "success",
            title: "Xóa thành công",
            showConfirmButton: false,
            timer: 700,
          });
          this.getDataConfigWeb();
        });
      }
    );
  };
  async saveEditSlide() {
    const { imageSlide, contentSlide, dataConfigWeb, indexSlideUpdate } =
      this.state;
    let ob = {
      image: imageSlide,
      content: contentSlide,
    };
    let coppy = { ...dataConfigWeb };
    coppy.value.slideShow[indexSlideUpdate] = ob;

    await this.setState(
      {
        dataConfigWeb: coppy,
      },
      async () => {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 700,
        });
        this.setState({
          modalSlide: false,
        });
        await this.onUpdate();

        this.getDataConfigWeb();
      }
    );
  }
  updateColor = async(e)=> {
    e.preventDefault();
    const {
      mainColor,
      sub_mainColor,
      button_color,
      sucess_color,
      error_color,
      text_mainColor,
      Phone,
      sub2_mainColor,
      Address,
      UserName,
      data,
      Message_Code,
    } = this.state;

    if (mainColor == null || mainColor == "") {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return;
    }

    const newComany_id = this.state.company_id;

    const body = {
      isHash: false,
      sub_mainColor: sub_mainColor,
      mainColor: mainColor,
      sub2_mainColor: sub2_mainColor,
      company_id: newComany_id,
      button_color: button_color,
      sucess_color: sucess_color,
      error_color: error_color,
      text_mainColor: text_mainColor,
    };

    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.CONFIG_THEME_UPDATE,
      method: "POST",
      data: body,
    });

    if (res.data.is_success == true) {
      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        showConfirmButton: false,
        timer: 700,
      });
      await this.getData();
    } else {
      alert(res.data.message);
    }
  }
  setStateByName = (name, value) => {
    this.setState({ [name]: value });
  };
  openFormAddBannerCampaign = () => {
    console.log("1")
    this.setState({
      nameBannerCampaign: "",
      image_banner_campaign: "",
      image_banner_campaign_link: "",
      image_banner_campaign_show: "",
      contentBannerCampaign: "",
      hrefBannerCampaign: "",
      outputBannerCampaign: "",
      modalBannerCampaign : true,
      actionModalBannerCampaign: "new"
    })
  }
  openEditBannerCampaign = (item,i) => {
    
    this.setState({
      indexBannerUpdate : i,
      nameBannerCampaign: item.name,
      image_banner_campaign: item.image,
      image_banner_campaign_link: item.image,
      image_banner_campaign_show: item.image,
      contentBannerCampaign: item.content,
      hrefBannerCampaign: item.link,
      outputBannerCampaign: item.output,
      modalBannerCampaign : true,
      actionModalBannerCampaign: "edit"
    })
  }
  deleteBannerCampaign = async (i) => {
    const { dataConfigWeb } = this.state;
    let coppyData = {
      ...dataConfigWeb,
    };
    coppyData.value.bannerCampaign.splice(i, 1);
    this.setState(
      {
        dataConfigWeb: coppyData,
      },
      async () => {
        await this.onUpdate().then(() => {
          Swal.fire({
            icon: "success",
            title: "Xóa thành công",
            showConfirmButton: false,
            timer: 700,
          });
          this.getDataConfigWeb();
        });
      }
    );
  }
  saveAddBannerCampaign = async () => {
    let newImage = await this.postImage(this.state.image_banner_campaign_link);
    let imageOutput;
    if (newImage) {
      imageOutput = `${Constants.BASE_URL}/image_brand/${newImage}`;
    } else {
      imageOutput = "";
    }
    let ob = {
      image: imageOutput,
      name : this.state.nameBannerCampaign,
      content: this.state.contentBannerCampaign,
      link: this.state.hrefBannerCampaign,
      output : this.state.outputBannerCampaign,
    };
    let coppy = { ...this.state.dataConfigWeb };
    if(!coppy.value.bannerCampaign){
      coppy.value.bannerCampaign = []
    }
    coppy.value.bannerCampaign.push(ob);
    this.setState(
      {
        dataConfigWeb: coppy,
      },
      async () => {
        await this.onUpdate().then(() => {
          Swal.fire({
            icon: "success",
            title: "Thêm mới thành công",
            showConfirmButton: false,
            timer: 700,
          });
          this.setState({
            modalBannerCampaign: false,
          });
          this.getDataConfigWeb();
        });
      }
    );
  }
  saveEditBannerCampaign = async () => {
    let newImage = await this.postImage(this.state.image_banner_campaign_link);
    let imageOutput = this.state.image_banner_campaign;
    if (newImage) {
      imageOutput = `${Constants.BASE_URL}/image_brand/${newImage}`;
    }
      let ob = {
        image: imageOutput,
        name : this.state.nameBannerCampaign,
        content: this.state.contentBannerCampaign,
        link: this.state.hrefBannerCampaign,
        output : this.state.outputBannerCampaign,
      };
    let coppy = { ...this.state.dataConfigWeb };

    coppy.value.bannerCampaign[this.state.indexBannerUpdate] = ob;
    await this.setState(
      {
        dataConfigWeb: coppy,
      },
      async () => {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 700,
        });
        this.setState({
          modalBannerCampaign: false,
        });
        await this.onUpdate();

        this.getDataConfigWeb();
      }
    );
  }
  render() {
    const { contentSlide } = this.state;

    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <div className="flex-tabs">
            <div className="tab">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                {this.state.tabNameConfig
                  ? this.state.tabNameConfig.map((item, i) => {
                      return (
                        <ListItemButton
                          key={item._id}
                          className={
                            i === 0
                              ? " tablinks tabcontent-left-active"
                              : " tablinks"
                          }
                          onClick={() => this.ToggleViewConfigWeb(item._id)}
                          sx={{ pl: 4 }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText
                            className="tabcontent-left"
                            style={{
                              fontSize: "14px !important",
                              color: "rgb(52, 71, 103)",
                            }}
                            primary={item.name}
                          />
                        </ListItemButton>
                      );
                    })
                  : null}
              </List>
            </div>
            <div className="tabcontents">
              <div id="tabcontent1" className="tabcontent defaultOpen">
                <Homepage
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  onChangeImage={this.onChangeImage}
                  titlePen1={this.state.titlePen1}
                  titlePen2={this.state.titlePen2}
                  sologan={this.state.sologan}
                  introduce={this.state.introduce}
                  imagePhoto={this.state.imagePhoto}
                  titlePhoto={this.state.titlePhoto}
                  titleButtonPhoto={this.state.titleButtonPhoto}
                  titleButtonChoose={this.state.titleButtonChoose}
                  buttonSuggestLogin1={this.state.buttonSuggestLogin1}
                  buttonSuggestLogin2={this.state.buttonSuggestLogin2}
                  titleStep1={this.state.titleStep1}
                  titleStep2={this.state.titleStep2}
                  titleStep3={this.state.titleStep3}
                  titleResultSkin={this.state.titleResultSkin}
                  textResultSkin={this.state.textResultSkin}
                  titleResultDepthSkin={this.state.titleResultDepthSkin}
                  textResultDepthSkin={this.state.textResultDepthSkin}
                  loginViewResult1={this.state.loginViewResult1}
                  loginViewResult2={this.state.loginViewResult2}
                  loginViewResult3={this.state.loginViewResult3}
                  loginViewResult4={this.state.loginViewResult4}
                />
              </div>
              <div id="tabcontent11" className="tabcontent">
                <ButtonConfig
                title_get_voucher={this.state.title_get_voucher}
                 textSales={this.state.textSales}
                 receiveVoucherSuccess={this.state.receiveVoucherSuccess}
                 loginWatchVoucher={this.state.loginWatchVoucher}
                 registerGetVoucher={this.state.registerGetVoucher}
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  btn_soida={this.state.btn_soida}
                  btn_get_voucher={this.state.btn_get_voucher}
                  btn_register_get_voucher={this.state.btn_register_get_voucher}
                  btn_get_voucher2={this.state.btn_get_voucher2}
                />
              </div>
              <div id="tabcontent12" className="tabcontent">
                <Form
              title_get_voucher={this.state.title_get_voucher}
              textSales={this.state.textSales}
              receiveVoucherSuccess={this.state.receiveVoucherSuccess}
              loginWatchVoucher={this.state.loginWatchVoucher}
              registerGetVoucher={this.state.registerGetVoucher}
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  btn_login={this.state.btn_login}
                  titleUpdate={this.state.titleUpdate}
                  titleLogin={this.state.titleLogin}
                  btn_update={this.state.btn_update}
                  btn_soida={this.state.btn_soida}
                  btn_get_voucher={this.state.btn_get_voucher}
                  btn_register_get_voucher={this.state.btn_register_get_voucher}
                  btn_get_voucher2={this.state.btn_get_voucher2}
                />
              </div>
            
              <div id="tabcontent11" className="tabcontent">
                <Voucher
                  classImageVoucher={this.state.classImageVoucher}

                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  onChangeImage={this.onChangeImage}
                  receiveVoucher={this.state.receiveVoucher}
                  textSales={this.state.textSales}
                  receiveVoucherSuccess={this.state.receiveVoucherSuccess}
                  loginWatchVoucher={this.state.loginWatchVoucher}
                  registerGetVoucher={this.state.registerGetVoucher}
                  sendSMS={this.state.sendSMS}
                  imageFormVoucher={this.state.imageFormVoucher}
                  infoVoucher={this.state.infoVoucher}
                  voucherEndow={this.state.voucherEndow}
                  voucherExpiry={this.state.voucherExpiry}
                  voucherSupplier={this.state.voucherSupplier}
                  voucherCondition={this.state.voucherCondition}
                />
              </div>
              <div id="tabcontent2" className="tabcontent">
                <SlideShow
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  onChangeImage={this.onChangeImage}
                  openFormEditSlide={this.openFormEditSlide}
                  deleteSlide={this.deleteSlide}
                  openFormAddSlide={this.openFormAddSlide}
                  slideShow={this.state.slideShow}
                />
              </div>
              <div id="tabcontent3" className="tabcontent">
                <Seo
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  onChangeImage={this.onChangeImage}
                  titleSeo={this.state.titleSeo}
                  titleSeo2={this.state.titleSeo2}
                  imageShareSeo={this.state.imageShareSeo}
                  keywordSeo={this.state.keywordSeo}
                  descSeo={this.state.descSeo}
                  authorSeo={this.state.authorSeo}
                  imgLayout={this.state.imgLayout}
                />
              </div>
              <div id="tabcontent4" className="tabcontent ">
                <Logo
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  onChangeImage={this.onChangeImage}
                  image={this.state.image}
                  hrefLogoHeader={this.state.hrefLogoHeader}
                  imgLogoFooter={this.state.imgLogoFooter}  
                  hrefLogoFooter={this.state.hrefLogoFooter}
                  classLogo={this.state.classLogo}
                />
              </div>
              {/* <div id="tabcontent5" className="tabcontent ">
                <Chats
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  codeChat={this.state.codeChat}
                  codeMess={this.state.codeMess}
                />
              </div> */}

            
              {/* <div id="tabcontent6" className="tabcontent">
                <Mxh
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  configData={this.state.configData}
                  setStateByName={this.setStateByName}
                  keyAppFb={this.state.keyAppFb}
                  PassFb={this.state.PassFb}
                  hrefFb={this.state.hrefFb}
                  keyAppGg={this.state.keyAppGg}
                  PassGg={this.state.PassGg}
                  hrefGg={this.state.hrefGg}
                  keyAppZalo={this.state.keyAppZalo}
                  PassZalo={this.state.PassZalo}
                  hrefZalo={this.state.hrefZalo}
                />
              </div>
               */}
              <div id="tabcontent8" className="tabcontent">
                <ChangeColor
                  setStateByName={this.setStateByName}
                  updateColor={this.updateColor}
                  isDisable={this.state.isDisable}
                  mainColor={this.state.mainColor}
                  button_color={this.state.button_color}
                />
              </div>
              <div id="tabcontent9" className="tabcontent">
                <BannerAia
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  onChangeImage={this.onChangeImage}
                  imageBannerDesktop={this.state.imageBannerDesktop}
                  hrefImageBannerDesktop={this.state.hrefImageBannerDesktop}
                  imageBannerMobile={this.state.imageBannerMobile}
                  hrefImageBannerMobile={this.state.hrefImageBannerMobile}
                />
              </div>
              <div id="tabcontent10" className="tabcontent ">
                <Embeds
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  embeddFacebook={this.state.embeddFacebook}
                  embeddZalo={this.state.embeddZalo}
                  embedHotline={this.state.embedHotline}
                />
              </div>
            </div>
          </div>
          <Modal
            size="xl"
            isOpen={this.state.statusModalUpdate}
            className={this.props.className}
          >
            <ModalHeader>
              {this.state.action === "new" ? `Tạo mới` : `Cập nhật`}
            </ModalHeader>
            <ModalBody>
              <TextFieldGroup
                field="updateTitle"
                label="Tiêu đề"
                value={this.state.updateTitle}
                placeholder={"Tiêu đề"}
                onChange={(e) => {
                  this.setState({ updateTitle: e.target.value });
                }}
              />
              <label className="control-label">Nội dung</label>

              <CKEditor
                editor={ClassicEditor}
                data={this.state.contentFooter}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();

                  this.setState({ contentFooter: data });
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
              />
              <TextFieldGroup
                field="updateLink"
                label="Link tham chiếu"
                value={this.state.updateLink}
                placeholder={"Link"}
                onChange={(e) => {
                  this.setState({ updateLink: e.target.value });
                }}
              />
              <TextFieldGroup
                field="slugFooter"
                label="Slug"
                value={this.state.slugFooter}
                placeholder={"Link"}
                onChange={(e) => {
                  this.setState({ slugFooter: e.target.value });
                }}
              />
            </ModalBody>
            <ModalFooter>
              <CButton
                color="primary"
                onClick={() => {
                  this.state.action === "new"
                    ? this.addFooter()
                    : this.updateFooter();
                }}
                disabled={this.state.isLoading}
              >
                Lưu
              </CButton>{" "}
              <CButton
                color="secondary"
                onClick={() => {
                  this.closeFormEdit();
                }}
              >
                Đóng
              </CButton>
            </ModalFooter>
          </Modal>
          <Modal
            size="xl"
            isOpen={this.state.modalSlide}
            className={this.props.className}
          >
            <ModalHeader>
              {this.state.actionSlide === "new" ? `Tạo mới` : `Cập nhật`}
            </ModalHeader>
            <ModalBody>
              <TextFieldGroup
                field="contentSlide"
                label="Mô tả"
                value={contentSlide}
                placeholder={"Tiêu đề"}
                onChange={(e) => {
                  this.setState({ contentSlide: e.target.value });
                }}
              />
              <TextFieldGroup
                field="imageSlide"
                label="Hình ảnh: (180px x 190px)"
                type={"file"}
                className="mt-5"
                onChange={(e) => {
                  this.onChangeImage(
                    e,
                    "imageSlide",
                    "imageSlide_link",
                    "imageSlide_show"
                  );
                }}
                onClick={(e) => {
                  e.target.value = null;
                  this.setState({ imageSlide_show: "" });
                }}
              />

              <img
                alt=""
                style={{ width: "140px", marginBottom: 20 }}
                height="auto"
                src={this.state.imageSlide}
              />
            </ModalBody>
            <ModalFooter>
              <CButton
                color="primary"
                onClick={() => {
                  this.state.actionSlide === "new"
                    ? this.saveAddSlide()
                    : this.saveEditSlide();
                }}
                disabled={this.state.isLoading}
              >
                Lưu
              </CButton>{" "}
              <CButton
                color="secondary"
                onClick={() => {
                  this.setState({
                    modalSlide: false,
                  });
                }}
              >
                Đóng
              </CButton>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

    return (
      <div className="sweet-loading">
        <DotLoader
          css={override}
          size={50}
          color={"#123abc"}
          loading={this.state.isLoading}
          speedMultiplier={1.5}
        />
      </div>
    );
  }
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default ConfigWeb;
