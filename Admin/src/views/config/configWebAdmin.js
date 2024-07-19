import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ModalHeader, ModalBody, ModalFooter, Modal } from "reactstrap";
import Swal from "sweetalert2";
import TextFieldGroup from "../Common/TextFieldGroup";
import API_CONNECT from "../../functions/callAPI";
import InfoIcon from "@mui/icons-material/Info";
import { CButton, CTextarea } from "@coreui/react";
import "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import Constants from "../../contants/contants";
import axios from "axios";
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome";
import { IoLogoBuffer } from "@react-icons/all-files/io/IoLogoBuffer";
import Banner1 from "./configWebAdmin/Banner1";
import Banner2 from "./configWebAdmin/Banner2";
import Footer from "./configWebAdmin/Footer";
import Logos from "./configWebAdmin/Logo";
import GuideVoucher from "./configWebAdmin/GuideVoucher";
import VoucherPartner from "./configWebAdmin/VoucherPartner";
import { BiSlideshow } from 'react-icons/bi';
import { RiGuideLine } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';


let headers = new Headers();
const auth = localStorage.getItem("auth");

headers.append("Authorization", "Bearer " + auth);
headers.append("Content-Type", "application/json");
class ConfigWebAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerCampaign : [],
      actionModalBannerCampaign : "new",
      modalBannerCampaign : false,
      tabNameConfig: [
        {
          _id: "1",
          name: "Banner Slide Lớn",
          icon: <BiSlideshow style={{ width: "24px ", height: "24px " }}/>,
        },
        {
          _id: "2",
          name: "Banner Slide Nhỏ",
          icon: (
            <BiSlideshow style={{ width: "24px ", height: "24px " }}/>
          ),
        },

        {
          _id: "3",
          name: "Logos",
          icon: <IoLogoBuffer style={{ width: "24px ", height: "24px " }} />,
        },
        {
          _id: "5",
          name: "Hướng dẫn sử dụng voucher",
          icon: <RiGuideLine style={{ width: "24px ", height: "24px " }} />,
        },
   
        {
          _id: "4",
          name: "Thông tin footer",
          icon: <AiOutlineInfoCircle style={{ width: "24px ", height: "24px " }} />,
        },
      ],
      company_id: JSON.parse(localStorage.getItem("user")).company_id
        ? JSON.parse(localStorage.getItem("user")).company_id
        : "-1",
      colorWebCurrent: localStorage.getItem("colorpicker"),
      action: "new",
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
      actionBanner: "new",
      modalBanner: false,
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
    this.getDataConfigWeb();
    this.getData();
    let arr = JSON.parse(localStorage.getItem("url"));
    for (let i = 0; i < arr.length; i++) {
      if ("#" + arr[i].to == window.location.hash) {
        if (arr[i].hidden == true) {
          window.location.href = "#/";
        }
      }
    }
  }

  async getDataConfigWeb() {
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "api/config/getAll";
    const newComany_id = JSON.parse(this.state.company_id).company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    await axios
      .get(url, {
        params: {
          key: "webinfo_admin",
          company_id: Output_newComany_id,
        },
      })
      .then((res) => {
        if (res.data.data.length > 0) {
          let dataConfig = res.data.data[0];

          let valueConfig = JSON.parse(dataConfig.Value);
          console.log(valueConfig);

          this.setState(
            {
              dataConfigWeb: valueConfig,
              idUpdate: dataConfig._id,
              chats: valueConfig.value.chats,
              logos: valueConfig.value.logos,
              seoInfo: valueConfig.value.seoInfo,
              homepage: valueConfig.value.homepage,
              slideShow: valueConfig.value.slideShow,
              mxh: valueConfig.value.mxh,
              configData: valueConfig.value.statusConfig,
              banner: valueConfig.value.banner,
              guideVoucher: valueConfig.value.guideVoucher,
              bannerCampaign : valueConfig.value.bannerCampaign,
            },
            () => {
              const {
                homepage,
                seoInfo,
                logos,
                chats,
                bannerCampaign,
                configData,
                mxh,
                guideVoucher,
                banner,
              } = this.state;
              if(guideVoucher){
                this.setState({
                  guideVoucher: this.state.guideVoucher
                })
              }
              if(bannerCampaign){
                this.setState({
                  bannerCampaign: this.state.bannerCampaign
                })
              }
              if (banner) {
                this.setState({
                  image_banner1: this.state.banner.banner1,
                  bannerSlide: this.state.banner.bannerSlide,
                  bannerMainSlide: this.state.banner.bannerMainSlide,
                });
              }
              if (homepage) {
                this.setState({
                  imageLogoCompany: this.state.homepage.LogoCompany,

                  textAi: this.state.homepage.textAi,
                  titlePen1: this.state.homepage.title1,
                  titlePen2: this.state.homepage.title2,
                  sologan: this.state.homepage.sologan,
                  introduce: this.state.homepage.introduction,

                  image1: this.state.homepage.image1,
                  image1_show: this.state.homepage.image1,
                  image1_link: this.state.homepage.image1,

                  image3_link: this.state.homepage.image3,
                  image3: this.state.homepage.image3,
                  image3_show: this.state.homepage.image3,

                  image2_link: this.state.homepage.image2,
                  image2: this.state.homepage.image2,
                  image2_show: this.state.homepage.image2,
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

                  keywordSeo: this.state.seoInfo.key,
                  authorSeo: this.state.seoInfo.author,
                });
              }
              if (logos) {
                this.setState({
                  hrefLogoHeader: valueConfig.value.logos.header.href,
                  hrefLogoFooter: valueConfig.value.logos.footer.href,
                  image: valueConfig.value.logos.header.logo,
                  imgLogoFooter: valueConfig.value.logos.footer.logo,
                  imgLogoAdmin: valueConfig.value.logos.webAdmin.logo,
                });
              }
              if (chats) {
                this.setState({
                  codeChat: this.state.chats.tawk,
                  codeMess: this.state.chats.mess,
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
            key: "webinfo_admin",
            value: {},
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
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "api/config/add";
    axios
      .post(url, {
        company_id: this.state.company_id,
        dataType: "1",
        key: "webinfo_admin",
        value: JSON.stringify(this.state.dataConfigWeb),
        type: "system",
      })
      .then((res) => {});
  }
  async getFooter() {
    var baseUrlapi = Constants.BASE_URL;
    let urlCall = Constants.GET_FOOTER;
    let url = baseUrlapi + urlCall;
    const newComany_id = JSON.parse(this.state.company_id).company_id;
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
  async deleteFooter(item) {
    var baseUrlapi = Constants.BASE_URL;
    let urlCall = Constants.DELETE_FOOTER;
    let url = baseUrlapi + urlCall;
    const newComany_id = JSON.parse(this.state.company_id).company_id;
    let Output_newComany_id;
    if (newComany_id) {
      Output_newComany_id = newComany_id;
    } else {
      Output_newComany_id = "-1";
    }
    await axios
      .post(url, {
        id: item._id,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 700,
        });
        this.getFooter();
      });
  }
  async updateFooter() {
    const { slugFooter, updateLink, contentFooter, updateTitle } = this.state;
    var baseUrlapi = Constants.BASE_URL;
    let urlCall = Constants.UPDATE_FOOTER;
    let url = baseUrlapi + urlCall;
    const newComany_id = JSON.parse(this.state.company_id).company_id;
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
    const newComany_id = JSON.parse(this.state.company_id).company_id;
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
    } = this.state;
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "api/config/update";
    const newComany_id = JSON.parse(this.state.company_id).company_id;
    let itOutput = "-1";
    if (newComany_id) {
      itOutput = newComany_id;
    }
    let coppyData = {
      ...dataConfigWeb,
    };

    if(change === "guideVoucher"){
      coppyData.value.guideVoucher = this.state.guideVoucher;
    }
    if(change === "bannerCampaign"){
      coppyData.value.bannerCampaign = this.state.bannerCampaign;
    }
    if (change === "logoCompany") {
      let newImage1 = await this.postImage(this.state.imageLogoCompany_link);
      if (newImage1) {
        coppyData.value.homepage.LogoCompany = `${Constants.BASE_URL}image_brand/${newImage1}`;
      }
    }
    if (change === "banner") {
      let newImage1 = await this.postImage(this.state.image_banner1_link);
      if (newImage1) {
        coppyData.value.banner.banner1 = `${Constants.BASE_URL}image_brand/${newImage1}`;
      }
    }
    if (change === "mxh") {
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
    if (change === "chats") {
      coppyData.value.chats.tawk = this.state.codeChat;
      coppyData.value.chats.mess = this.state.codeMess;
    }
    if (change === "homepage") {
      coppyData.value.homepage.title1 = this.state.titlePen1;
      coppyData.value.homepage.title2 = this.state.titlePen2;
      coppyData.value.homepage.textAi = this.state.textAi;
      coppyData.value.homepage.sologan = sologan;
      coppyData.value.homepage.introduction = introduce;
      let newImage1 = await this.postImage(image1_link);
      let newImage2 = await this.postImage(image2_link);
      let newImage3 = await this.postImage(image3_link);
      if (newImage1) {
        coppyData.value.homepage.image1 = `${Constants.BASE_URL}image_brand/${newImage1}`;
      }
      if (newImage2) {
        coppyData.value.homepage.image2 = `${Constants.BASE_URL}image_brand/${newImage2}`;
      }
      if (newImage3) {
        coppyData.value.homepage.image3 = `${Constants.BASE_URL}image_brand/${newImage3}`;
      }
    }
    if (change === "seoInfo") {
      coppyData.value.seoInfo.title = titleSeo;
      coppyData.value.seoInfo.titleSEO = titleSeo2;
      coppyData.value.seoInfo.description = descSeo;
      coppyData.value.seoInfo.author = authorSeo;
      coppyData.value.seoInfo.key = keywordSeo;
      let newImage4 = await this.postImage(imgLayout_link);
      if (newImage4) {
        coppyData.value.seoInfo.imageShare = `${Constants.BASE_URL}image_brand/${newImage4}`;
      }
      this.setState({
        dataConfigWeb: coppyData,
      });
    }
    if (change === "logos") {
      let newImage3 = await this.postImage(this.state.imgLogoAdmin_link);
      if (newImage3) {
        coppyData.value.logos.webAdmin.logo = `${Constants.BASE_URL}image_brand/${newImage3}`;
      }
      let newImage = await this.postImage(this.state.image_link);
      if (newImage) {
        coppyData.value.logos.header.logo = `${Constants.BASE_URL}image_brand/${newImage}`;
      }
      let newImage2 = await this.postImage(this.state.imgLogoFooter_link);
      if (newImage2) {
        coppyData.value.logos.footer.logo = `${Constants.BASE_URL}image_brand/${newImage2}`;
      }
      coppyData.value.logos.footer.href = this.state.hrefLogoFooter;
      coppyData.value.logos.header.href = this.state.hrefLogoHeader;
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

    const newComany_id = JSON.parse(this.state.company_id).company_id;
    var baseUrlapi = Constants.BASE_URL;
    let url = baseUrlapi + "api/config/update";
    await axios.post(url, {
      value: JSON.stringify(dataConfigWeb),
      dataType: "1",
      type: "system",
      company_id: newComany_id,
      id: this.state.idUpdate,
    });
  }
  getData = async () => {
    const newComany_id = JSON.parse(this.state.company_id).company_id;
    let idOutput = "-1";
    if (newComany_id) {
      idOutput = newComany_id;
    }
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.CONFIG_THEME_GET + "/" + idOutput,
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
  openFormAddFooter = () => {
    this.setState({
      action: "new",
      contentFooter: "",
      updateLevel: "1",
      statusModalUpdate: true,
      updateLink: "",
      updateTitle: "",
      slugFooter: "",
    });
  };
  openFormEditFooter = async (item, i) => {
    this.setState({
      action: "edit",
      updateLevel: item.Level,
      slugFooter: item.slug,
      idFooterEditor: item._id,
      updateTitle: item.title,
      contentFooter: item.content,
      statusModalUpdate: true,
      updateLink: item.link,
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
  openFormAddBanner = (value) => {
    this.setState({
      positionBannerActive: value,
      actionBanner: "new",
      modalBanner: true,
      image_banner2: "",
      contentBanner: "",
      hrefBanner: "",
    });
  };

  saveAddSlide = async () => {
    const { contentSlide, dataConfigWeb, imageSlide_link } = this.state;
    let newImage = await this.postImage(imageSlide_link);
    let imageOutput;
    if (newImage) {
      imageOutput = `${Constants.BASE_URL}image_brand/${newImage}`;
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
  };

  saveAddBanner = async () => {
    const { contentBanner, dataConfigWeb, image_banner2_link, hrefBanner } =
      this.state;
    let newImage = await this.postImage(image_banner2_link);
    let imageOutput;
    if (newImage) {
      imageOutput = `${Constants.BASE_URL}image_brand/${newImage}`;
    } else {
      imageOutput = "";
    }
    let ob = {
      image: imageOutput,
      content: contentBanner,
      href: hrefBanner,
    };
    let coppy = { ...dataConfigWeb };
    if (this.state.positionBannerActive === "1") {
      coppy.value.banner.bannerMainSlide.unshift(ob);
    } else {
      coppy.value.banner.bannerSlide.unshift(ob);
    }

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
            modalBanner: false,
          });
          this.getDataConfigWeb();
        });
      }
    );
  };

  openFormEditBanner = (value, item, i) => {
    this.setState({
      actionBanner: "edit",
      positionBannerActive: value,
      modalBanner: true,
      image_banner2: item.image,
      contentBanner: item.content,
      hrefBanner: item.href,
      indexBannerEditor: i,
    });
  };

  deleteBanner = async (value, i) => {
    const { dataConfigWeb } = this.state;
    let coppyData = {
      ...dataConfigWeb,
    };
    if (value === "1") {
      coppyData.value.banner.bannerMainSlide.splice(i, 1);
    } else {
      coppyData.value.banner.bannerSlide.splice(i, 1);
    }
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

  async saveEditBanner() {
    const {
      image_banner2,
      contentBanner,
      dataConfigWeb,
      indexBannerEditor,
      hrefBanner,
    } = this.state;
    let ob = {
      image: image_banner2,
      content: contentBanner,
      href: hrefBanner,
    };
    let coppy = { ...dataConfigWeb };
    if (this.state.positionBannerActive === "1") {
      coppy.value.banner.bannerMainSlide[indexBannerEditor] = ob;
    } else {
      coppy.value.banner.bannerSlide[indexBannerEditor] = ob;
    }

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
          modalBanner: false,
        });
        await this.onUpdate();

        this.getDataConfigWeb();
      }
    );
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
      imageOutput = `${Constants.BASE_URL}image_brand/${newImage}`;
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
      imageOutput = `${Constants.BASE_URL}image_brand/${newImage}`;
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
            <div class="tab">
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
                <Banner1
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  openFormAddBanner={this.openFormAddBanner}
                  openFormEditBanner={this.openFormEditBanner}
                  deleteBanner={this.deleteBanner}
                  setStateByName={this.setStateByName}
                  bannerMainSlide={this.state.bannerMainSlide}
                />
              </div>
              <div id="tabcontent3" className="tabcontent ">
                <Logos
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  onChangeImage={this.onChangeImage}
                  image={this.state.image}
                  hrefLogoHeader={this.state.hrefLogoHeader}
                  imgLogoFooter={this.state.imgLogoFooter}
                  hrefLogoFooter={this.state.hrefLogoFooter}
                  imgLogoAdmin={this.state.imgLogoAdmin}
                />
              </div>
              <div id="tabcontent2" className="tabcontent ">
                <Banner2
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  openFormAddBanner={this.openFormAddBanner}
                  openFormEditBanner={this.openFormEditBanner}
                  deleteBanner={this.deleteBanner}
                  bannerSlide={this.state.bannerSlide}
                />
              </div>
              <div id="tabcontent5" className="tabcontent ">
                <GuideVoucher
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  guideVoucher={this.state.guideVoucher}
                />
              </div>
              <div id="tabcontent6" className="tabcontent ">
                <VoucherPartner
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  bannerCampaign={this.state.bannerCampaign}
                  modalBannerCampaign={this.state.modalBannerCampaign}
                  actionModalBannerCampaign={this.state.actionModalBannerCampaign}
                  nameBannerCampaign={this.state.nameBannerCampaign}
                  image_banner_campaign={this.state.image_banner_campaign}
                  contentBannerCampaign={this.state.contentBannerCampaign}
                  hrefBannerCampaign={this.state.hrefBannerCampaign}
                  outputBannerCampaign={this.state.outputBannerCampaign}
                  setStateByName={this.setStateByName}
                  openFormAddBannerCampaign={this.openFormAddBannerCampaign}
                  openEditBannerCampaign={this.openEditBannerCampaign}
                  deleteBannerCampaign={this.deleteBannerCampaign}
                  saveAddBannerCampaign={this.saveAddBannerCampaign}
                  saveEditBannerCampaign={this.saveEditBannerCampaign}
                  onChangeImage={this.onChangeImage}
                />
              </div>
              <div id="tabcontent4" className="tabcontent ">
                <Footer
                  SaveAllConfigWeb={this.SaveAllConfigWeb}
                  setStateByName={this.setStateByName}
                  openFormAddFooter={this.openFormAddFooter}
                  openFormEditFooter={this.openFormEditFooter}
                  deleteFooter={this.deleteFooter}
                  dataFooter={this.state.dataFooter}
                  hidden={this.state.hidden}
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
                style={{ height: "300px" }}
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
          <Modal
            size="xl"
            isOpen={this.state.modalBanner}
            className={this.props.className}
          >
            <ModalHeader>
              {this.state.actionBanner === "new" ? `Tạo mới` : `Cập nhật`}
            </ModalHeader>
            <ModalBody>
              <TextFieldGroup
                field="image_banner2"
                label="Hình ảnh: (1110px * 287px)"
                type={"file"}
                className="mt-5"
                onChange={(e) => {
                  this.onChangeImage(
                    e,
                    "image_banner2",
                    "image_banner2_link",
                    "image_banner2_show"
                  );
                }}
                onClick={(e) => {
                  e.target.value = null;
                  this.setState({ image_banner2_show: "" });
                }}
              />
              <div class="text-center">
                <img
                  alt=""
                  style={{ width: "300px", marginBottom: 20 }}
                  height="auto"
                  src={this.state.image_banner2}
                />
              </div>

              <div className="mt-3"></div>
              <label>Mô tả</label>
              <CTextarea
                name="contentBanner"
                rows="4"
                value={this.state.contentBanner}
                onChange={(e) => {
                  this.setState({ contentBanner: e.target.value });
                }}
              />
              <TextFieldGroup
                field="hrefBanner"
                label="Đường dẫn"
                value={this.state.hrefBanner}
                placeholder={"Tiêu đề"}
                onChange={(e) => {
                  this.setState({ hrefBanner: e.target.value });
                }}
              />
            </ModalBody>
            <ModalFooter>
              <CButton
                color="primary"
                onClick={() => {
                  this.state.actionBanner === "new"
                    ? this.saveAddBanner()
                    : this.saveEditBanner();
                }}
                disabled={this.state.isLoading}
              >
                Lưu
              </CButton>{" "}
              <CButton
                color="secondary"
                onClick={() => {
                  this.setState({
                    modalBanner: false,
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

export default ConfigWebAdmin;
