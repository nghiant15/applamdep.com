import React, { Component } from 'react';
import CIcon from '@coreui/icons-react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';

import {
  CLabel,
  CSelect,
  CButton,
  CTextarea,
  CRow, CCol
} from '@coreui/react'

import CreatableSelect from 'react-select/creatable';
import API_CONNECT from "../../../../functions/callAPI";
import Pagination from '@material-ui/lab/Pagination';
import 'moment-timezone';
import Constants from "../../../../contants/contants";
import TextFieldGroup from "../../../Common/TextFieldGroup";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import Swal from 'sweetalert2';
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');

class SuggestItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: '',
      activePage: 1,
      page: 1,
      itemsCount: 0,
      limit: 5,
      totalActive: 0,
      modalCom: false,
      viewingUser: {},
      communities: [],
      updated: '',
      dataApi: [],
      hidden: false,
      action: 'new',
      name: "",
      image: "",
      image_show: "",
      image_link: "",
       filepdf_link: "",
      title: "",
      description: "",
      image_file: "",

      linkdetail: "",
      level: "K1",
      sdktype: "1",
      ebookFile:  "",
      brand_id: "",
      companyid: "",
      price: 0,
      type_sdk_id: "",
      type_product_id: "",
      sdkItem: [],
      currentSdkSelect: [],
      currentItemSelect: null,
      modalDelete: false,
      delete: null,
      arrPagination: [],
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      type: localStorage.getItem('type'),
      userData: localStorage.getItem('user'),
      isLoading: false,
      indexPage: 1,
      arrOptionSdkType: [],
      arrOptionProductType: [],
      arrLevel: [],
      arrBrand: [],
      arrOptionBrand: [],
      objectValueBrand: {},
      idSDK: window.location.hash.split('/')[window.location.hash.split('/').length - 1],
      totalCount: '',
      isLoadingTable: false,
      isSearch: false
    };
  }
  async componentDidMount() {
    const { type } = this.state;
    if (type == '0' || type == '1') {
      this.getData();
    } else {
      this.getData();
    }
    // this.getListTypeProduct()
    // let arr = JSON.parse(localStorage.getItem('url'));
    // for (let i = 0; i < arr.length; i++) {
    //   if (arr[i].url == window.location.hash) {
    //     if (arr[i].isHidden == true) {
    //       window.location.href = '#/'
    //     }
    //   }
    // }
  }

  onSearch = async () => {
    const { type, idSDK, key, userData } = this.state;
    if (type == '0' || type == '1') {
      this.setState({ isLoadingTable: true });

      const res_suggest = await API_CONNECT(
        Constants.SEARCH_SUGGEST_ITEM_ADMIN + idSDK + "?&key=" + key, {}, "", "GET")

      const res_sdk = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.LIST_SDK,
        method: 'GET'
      });

      const res_brand = await API_CONNECT(
        Constants.LIST_BRAND_PLUGIN_COMPANY, {}, "", "GET")

      let val = res_suggest.dataRes;

      for (let i = 0; i < val.length; i++) {
        val[i].id = i
      }

      let brand = res_brand.data;

      if (val.length == 0) {
        this.setState({
          hidden: false
        })
      } else {
        this.setState({
          hidden: true
        })
      }

      let arrTempOptionBrand = [];
      for (let i = 0; i < brand.length; i++) {
        arrTempOptionBrand.push({
          value: brand[i]._id, label: brand[i].name
        })
      }

      this.setState({
        dataApi: val,
        sdkItem: res_sdk.data,
        currentSdkSelect: res_sdk.data[0],
        arrBrand: brand,
        arrOptionBrand: arrTempOptionBrand,
        isLoadingTable: false,
        data: val,
        isSearch: true
      });

    } else {

      this.setState({ isLoadingTable: true });

      const res_suggest = await API_CONNECT(
        //http://localhost:3002/itemSdk/search/611f1461ef623903dbb4f75d/1?&key=c
        Constants.SEARCH_SUGGEST_ITEM_COMPANY + JSON.parse(userData).company_id + `/${idSDK}?&key=` + key, {}, "", "GET")

      const res_sdk = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.LIST_SDK,
        method: 'GET'
      });

      const res_brand = await API_CONNECT(
        Constants.LIST_BRAND_PLUGIN_COMPANY, {}, "", "GET")

      let val = res_suggest.dataRes;

      for (let i = 0; i < val.length; i++) {
        val[i].id = i
      }

      let brand = res_brand.data;

      if (val.length == 0) {
        this.setState({
          hidden: false
        })
      } else {
        this.setState({
          hidden: true
        })
      }

      let arrTempOptionBrand = [];
      for (let i = 0; i < brand.length; i++) {
        arrTempOptionBrand.push({
          value: brand[i]._id, label: brand[i].name
        })
      }

      this.setState({
        dataApi: val,
        sdkItem: res_sdk.data,
        currentSdkSelect: res_sdk.data[0],
        arrBrand: brand,
        arrOptionBrand: arrTempOptionBrand,
        isLoadingTable: false,
        data: val,
        isSearch: true
      });
    }

  }

  getDataPagination = async (skip, v) => {
  return;

    const { idSDK, totalCount, userData, type, arrPagination } = this.state;

    this.setState({ isLoadingTable: true });
    if (type == '0' || type == '1') {
      var res = await API_CONNECT(
        Constants.LIST_SUGGEST_ITEM_ADMIN + `${idSDK}?skip=${Number(totalCount) - Number(skip)}`, {}, "", "GET")
    } else {
      var res = await API_CONNECT(
        Constants.LIST_SUGGEST_ITEM_COMPANY + JSON.parse(userData).company_id + `/${idSDK}?skip=${Number(totalCount) - Number(skip)}`, {}, "", "GET")
    }

    let val = res.dataRes;

    if (arrPagination[v - 1].length != 0) {
      for (let i = 0; i < arrPagination[v - 1].length; i++) {
        if (i + 1 <= val.length) {
          val[i].id = arrPagination[v - 1][i]
        }
      }
    }

    this.setState({
      dataApi: val,
      isLoadingTable: false,
      isLoading: false,
      data: val,
      isSearch: false
    });
  }

  pagination(dataApi, dataResult) {
    var i, j, temparray, chunk = this.state.limit;
    var arrTotal = [];
    for (i = 0, j = dataApi.length; i < j; i += chunk) {
      temparray = dataApi.slice(i, i + chunk);
      arrTotal.push(temparray);
    }

    if (dataResult.length == 0) {
      this.setState({
        hidden: false
      })
    } else {
      this.setState({
        hidden: true
      })
    }

    if (arrTotal.length != 0) {
      for (let i = 0; i < arrTotal[0].length; i++) {
        dataResult[i].id = arrTotal[0][i]
      }
    }

    this.setState({ arrPagination: arrTotal, data: dataResult, totalCount: dataApi.length });
  }

  getData = async () => {
    const { idSDK } = this.state;

    Swal.fire({
      title: 'Đang tải sách...',
      html: 'Vui lòng chờ ...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
    var lastSlug = window.location.href.split("/").pop();
    var categoryId_input = 0;
    
    if(lastSlug == "sach-tieng-anh")
    {
      categoryId_input = 0;
    }
    else if(lastSlug == "sach-nuoi-day-con")
    {
      categoryId_input = 1;
    }
    else if(lastSlug == "tap-chi-thoi-trang")
    {
      categoryId_input = 2;
    }
    else if(lastSlug == "ly-thuyet-va-sach-noi")
    {
      categoryId_input = 3;
    }
    else if(lastSlug == "tieu-thuyet")
    {
      categoryId_input = 5;
    }
    else if(lastSlug == "truyen-ngan")
    {
      categoryId_input = 6;
    }
    else if(lastSlug == "lich-su")
    {
      categoryId_input = 7;
    }

    else if(lastSlug == "sach-van-hoc")
    {
      categoryId_input = 8;
    }
    else if(lastSlug == "sach-kinh-te")
    {
      categoryId_input = 9;
    }
    else if(lastSlug == "sach-thieu-nhi")
    {
      categoryId_input = 10;
    }
    else if(lastSlug == "sach-ky-nang-song")
    {
      categoryId_input = 11;
    }
    else if(lastSlug == "sach-ba-me-em-be")
    {
      categoryId_input = 12;
    }

    else if(lastSlug == "sach-giao-khoa-giao-trinh")
    {
      categoryId_input = 13;
    }
    else if(lastSlug == "sach-hoc-ngoai-ngu")
    {
      categoryId_input = 14;
    }
    else if(lastSlug == "sach-tham-khao")
    {
      categoryId_input = 15;
    }
    else if(lastSlug == "tu-dien")
    {
      categoryId_input = 16;
    }
    else if(lastSlug == "kien-thuc-tong-hop")
    {
      categoryId_input = 17;
    }
    else if(lastSlug == "khoa-hoc-ki-thuat")
    {
      categoryId_input = 18;
    }
    else if(lastSlug == "dien-anh-nha-hoa")
    {
      categoryId_input = 19;
    }
    else if(lastSlug == "truyen-tranh-manga-comic")
    {
      categoryId_input = 20;
    }
    else if(lastSlug == "sach-ton-giao-tam-linh")
    {
      categoryId_input = 21;
    }
    else if(lastSlug == "sach-van-hoa-dia-ly-du-lich")
    {
      categoryId_input = 22;
    }
    else if(lastSlug == "sach-chinh-tri-phap-ly")
    {
      categoryId_input = 23;
    }
    else if(lastSlug == "sach-nong-lam-ngu-nghiep")
    {
      categoryId_input = 24;
    }
    else if(lastSlug == "sach-cong-nghe-thong-tin")
    {
      categoryId_input = 25;
    }
    else if(lastSlug == "sach-y-hoc")
    {
      categoryId_input = 26;
    }
    else if(lastSlug == "tap-chi-catalogue")
    {
      categoryId_input = 27;
    }
    else if(lastSlug == "tam-ly-gioi-tinh")
    {
      categoryId_input = 28;
    }
    else if(lastSlug == "thuong-thuc-gia-dinh")
    {
      categoryId_input = 29;
    }
    else if(lastSlug == "the-duc-the-thao")
    {
      categoryId_input = 30;
    }
    
    var companyid  = this.state.type == '0' || this.state.type == '1' ? "-1" : JSON.parse(this.state.userData).company_id;

   
    const res_suggest = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.api_getAllBook +"?companyid="+companyid+"&type="+categoryId_input,
      method: 'GET'
    });
    var dataRender = res_suggest.data.data;
   

    this.setState({ dataRe: dataRender });
    Swal.close();
   
  }

  

  getListTypeProduct = async () => {
    const res_pro = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_TYPE_PRODUCT,
      method: 'POST'
    });

    const res_sdk = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_TYPE_SDK,
      method: 'POST'
    });

    this.setState({ arrOptionProductType: res_pro.data.data, arrOptionSdkType: res_sdk.data.data })
  }

  changeSdkType = (e) => {
    e.preventDefault();
    const { sdkItem } = this.state;
    let data = sdkItem.find((item) => item.name === e.target.value);
    if (data) {
      this.setState({
        currentSdkSelect: data,
        level: data.name,
        sdktype: "1",
      });
    }
  };

  changeLevel = (e) => {
    e.preventDefault();
    this.setState({
      status: e.target.value,
    });
  };

  searchKey() {
  return;
    const { key, indexPage } = this.state;
    // this.setState({ key: key })

    if (key != '') {
      let d = []

      this.state.dataApi.map(val => {
        if (val.name.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.title.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.type_product_id.Name.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.type_product_id.Name.toLocaleUpperCase().includes(key.toLocaleUpperCase())) {

          d.push(val)
        }
      })
      let active = 0

      d.map(val => {
        if (val.Status == "Actived") {
          active = active + 1
        }
      })

      this.setState({ data: d, totalActive: active })
    } else {
      this.getDataPagination(this.state.limit * Number(indexPage))
    }
  }

  actionSearch(e, name_action) {
    this.setState({
      [name_action]: e.target.value
    }, () => {
      this.searchKey();
    });
  }

  resetSearch() {
    const { indexPage } = this.state
    this.setState({ isSearch: false })
    this.getDataPagination(this.state.limit * Number(indexPage), Number(indexPage))
  }

  async toggleModal(key) {
    const { data, arrBrand } = this.state;

    if (key == 'new') {
      this.setState({
        modalCom: !this.state.modalCom,
        action: key,
        image_show: "",
        filepdf_link: "",
        name: "",
        image: "",
        title: "",
        price: 0,
        description: "",
        linkdetail: "",
        //brand_id: arrBrand[0]._id,
       
        level: "K1",
        sdktype: "1",
        hrefLink: "",
        linkCover: "",
        linkFiePdf: "",
        linkFiePdf_show: "",
        categoryId: "",
        des: "",


        type_sdk_id: this.state.arrOptionSdkType.length == 0 ? '' : this.state.arrOptionSdkType[1]._id,
        type_product_id: this.state.arrOptionProductType.length == 0 ? '' : this.state.arrOptionProductType[1]._id,
        companyid: this.state.type == '0' || this.state.type == '1' ? "" : JSON.parse(this.state.userData).company_id,
        arrLevel: this.state.arrOptionSdkType.length == 0 ? '' : this.state.arrOptionSdkType[1].Level
      })
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  async  uploadBookFile(fileUpload, hrefLink ='')
  {

    const form = new FormData();
    form.append("myFile", fileUpload);
    let options  = {
      headers: {
        'Access-Control-Allow-Origin': '*',  
      }
    };

    let hrefLinkBookPdf = "";
    let post = await axios.post("https://file.applamdep.com/uploadfile", form, options)
    .then((response) => 
    {
        let dataRes = response.data;
        let fileName = dataRes.filename;
        hrefLinkBookPdf ="https://file.applamdep.com/book/"+ fileName;
     
      
    } )
    .catch((error) => console.log(error));

    return hrefLinkBookPdf;

  }

  async addProduct() {

    Swal.fire({
      title: 'Đang xử lý...',
      html: 'Vui lòng chờ ...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
     
    const { ebookFile,
      image_file,
      title2,  author, extraInfo,
      hrefLink,linkCover, linkFiePdf,categoryId, des,_id,image, title, description, linkdetail, price,
      level,status, sdktype, type_sdk_id, brand_id, image_link,filepdf_link, arrOptionSdkType, idSDK } 
     = this.state;

    var companyidInput = this.state.type == '0' || this.state.type == '1' ? "-1" : JSON.parse(this.state.userData).company_id;
    var ebookFileLink = await this.uploadBookFile(ebookFile);
    var coverLinkImage = await this.uploadBookFile(image_file);

    var lastSlug = window.location.href.split("/").pop();

    var  categoryId_input = 0;

    if(lastSlug == "sach-tieng-anh")
    {
      categoryId_input = 0;
    }
    else if(lastSlug == "sach-nuoi-day-con")
    {
      categoryId_input = 1;
    }
    else if(lastSlug == "tap-chi-thoi-trang")
    {
      categoryId_input = 2;
    }
    else if(lastSlug == "ly-thuyet-va-sach-noi")
    {
      categoryId_input = 3;
    }
    else if(lastSlug == "tieu-thuyet")
    {
      categoryId_input = 5;
    }
    else if(lastSlug == "truyen-ngan")
    {
      categoryId_input = 6;
    }
    else if(lastSlug == "lich-su")
    {
      categoryId_input = 7;
    }

    else if(lastSlug == "sach-van-hoc")
    {
      categoryId_input = 8;
    }
    else if(lastSlug == "sach-kinh-te")
    {
      categoryId_input = 9;
    }
    else if(lastSlug == "sach-thieu-nhi")
    {
      categoryId_input = 10;
    }
    else if(lastSlug == "sach-ky-nang-song")
    {
      categoryId_input = 11;
    }
    else if(lastSlug == "sach-ba-me-em-be")
    {
      categoryId_input = 12;
    }

    else if(lastSlug == "sach-giao-khoa-giao-trinh")
    {
      categoryId_input = 13;
    }
    else if(lastSlug == "sach-hoc-ngoai-ngu")
    {
      categoryId_input = 14;
    }
    else if(lastSlug == "sach-tham-khao")
    {
      categoryId_input = 15;
    }
    else if(lastSlug == "tu-dien")
    {
      categoryId_input = 16;
    }
    else if(lastSlug == "kien-thuc-tong-hop")
    {
      categoryId_input = 17;
    }
    else if(lastSlug == "khoa-hoc-ki-thuat")
    {
      categoryId_input = 18;
    }
    else if(lastSlug == "dien-anh-nha-hoa")
    {
      categoryId_input = 19;
    }
    else if(lastSlug == "truyen-tranh-manga-comic")
    {
      categoryId_input = 20;
    }
    else if(lastSlug == "sach-ton-giao-tam-linh")
    {
      categoryId_input = 21;
    }
    else if(lastSlug == "sach-van-hoa-dia-ly-du-lich")
    {
      categoryId_input = 22;
    }
    else if(lastSlug == "sach-chinh-tri-phap-ly")
    {
      categoryId_input = 23;
    }
    else if(lastSlug == "sach-nong-lam-ngu-nghiep")
    {
      categoryId_input = 24;
    }
    else if(lastSlug == "sach-cong-nghe-thong-tin")
    {
      categoryId_input = 25;
    }
    else if(lastSlug == "sach-y-hoc")
    {
      categoryId_input = 26;
    }
    else if(lastSlug == "tap-chi-catalogue")
    {
      categoryId_input = 27;
    }
    else if(lastSlug == "tam-ly-gioi-tinh")
    {
      categoryId_input = 28;
    }
    else if(lastSlug == "thuong-thuc-gia-dinh")
    {
      categoryId_input = 29;
    }
    else if(lastSlug == "the-duc-the-thao")
    {
      categoryId_input = 30;
    }
    
    const body = {
      linkFiePdf: ebookFileLink,
      linkCover: coverLinkImage,
      categoryId: categoryId_input,
      title2: title2,
      author: author,
      extraInfo: extraInfo,
      title: title,
      des: description,
      status: 1, 
      companyid: companyidInput
      
    }
    

    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.Add_book,
      method: 'POST',
      data: body
    });
    
    if (res.status == 200) {
      debugger;
      this.getData();
      this.setState({ modalCom: !this.state.modalCom })
    } else {
   
    }

    Swal.close();
  }

  async openUpdate(item) {
    console.log(item.brand_id)
    let objValue = { value: item.brand_id == null ? "" : item.brand_id._id, label: item.brand_id == null ? "" : item.brand_id.name }
    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      name: item.name,
      image: item.image,
      image_show: "",
      image_link: item.image_link,
      title: item.title,
      description: item.description,
      linkdetail: item.linkdetail,
      level: item.level,
      id: item._id,
      
      Status: item.Status,
      // arrLevel: item.type_sdk_id.Level,
      // brand_id: item.brand_id == null ? "" : item.brand_id._id
    })
  }

  async updateProduct() {
    return;
    
  }

  openDelete = (item) => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      id: item._id
    })
  }

  async delete() {
    this.setState({ isLoading: true, isSearch: false });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.DELETE_Book_item,
      method: 'POST',
      data: {
        "id": this.state.id
      }
    });

    if (res.status == 200) {
      if (this.state.type == '0' || this.state.type == '1') {
        this.getData()
      } else {
        this.getData();
      };
      this.setState({ modalDelete: !this.state.modalDelete, delete: null })
    } else {
      alert("Xóa sản phẩm thất bại");
      this.setState({ isLoading: false });
    }

  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getBadge(status) {
    switch (status) {
      case 'Actived': return 'success'
      case 'Inactive': return 'secondary'
      case 'Locked': return 'warning'
      case 'Deactived': return 'danger'
      default: return 'primary'
    }
  }

  onChangeImage(e) {
    let files = e.target.files;
    let reader = new FileReader();
    this.setState({ image_file: files[0] })
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      this.setState({ 
         image: e.target.result,
         image_show: e.target.result })
    }
  }


  onUploadFile2(e) {
    let files = e.target.files;
    // let reader = new FileReader();
    this.setState({ ebookFile : files[0] })
    // reader.readAsDataURL(files[0])
    // reader.onload = (e) => {
    //   // this.setState({ linkFiePdf: e.target.result, linkFiePdf_show: e.target.result })
    // }
  }

  getBadge(name, defaults) {
    switch (name) {
      case 'K1': return 'Chăm sóc da hằng ngày'
      case 'K5': return 'Hỗ trợ giảm lão hoá'
      case 'K6': return 'Hỗ trợ điều trị mụn'
      case 'K7': return 'Hỗ trợ giảm quầng thâm mắt'
      case 'K8': return 'Hỗ trợ giảm lỗ chân lông'
      case 'K9': return 'Hỗ trợ giảm thâm nám da'
      default: return defaults
    }
  }

  handleChange = (newValue, actionMeta) => {
    this.setState({ objectValueBrand: newValue, brand_id: newValue.value })
    console.log(newValue.value);
  };

  render() {
    const { data,dataRe, arrPagination, arrLevel, arrOptionSdkType, key, action, isSearch, indexPage, arrOptionBrand, objectValueBrand } = this.state;
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  {/* <i className="fa fa-align-justify">Danh sách sản phẩm da mặt</i> */}
                  <div style={styles.tags}>
                    <CRow>
                      <CCol sm="12" lg="12">
                        {/* <CRow>
                         
                          <CCol sm="12" lg="4">
                            <CButton color="primary" style={{ width: '100%', marginTop: 5 }} size="sm" onClick={e => { this.onSearch() }}>Tìm kiếm theo từ khoá</CButton>
                          </CCol>
                          
                        </CRow> */}
                      </CCol>
                      <CCol sm="12" lg="12">
                        <CButton outline color="primary" style={styles.floatRight} size="sm" onClick={e => this.toggleModal("new")}>Thêm mới</CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CardHeader>
                <CardBody>
                  {
                    this.state.isLoadingTable == false ?
                      <table ble className="table table-hover table-outline mb-0  d-sm-table">
                        <thead className="thead-light">
                          <tr>
                            <th className="text-center">STT.</th>
                            {/* <th className="text-center">Tên</th> */}
                            <th className="text-center">Tên sách</th>
                            <th className="text-center">Mã sách</th>
                            <th className="text-center">Ảnh</th>
  
                            <th className="text-center">Đường dẫn File</th>
                          
                            <th className="text-center">Thông  tin sách</th>
                           
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center">Thông tin </th>
                       
                            <th className="text-center">#</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                            dataRe != undefined ?
                            dataRe.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="text-center">{i +1}</td>
                                    <td> { item.title } </td>
                                    <td> { item.code } </td>
                                    <td className="text-center">
                                      {
                                         <img src={`${item.linkCover}`} width={"60px"} height={"60px"} />
                                      }
                                    </td>
                                    <td> 
                                      <a target="_blank" href= { item.linkFiePdf }  > Link file</a>
                                   </td>
                                 
                                 
                              
                                   <td>
                                    <p> Slug: {item.slug} </p> 
                                    <p> Tác giả: {item.author} </p> 
                                    <p> Thông tin thêm: {item.extraInfo} </p> 
                                    <p> Tiêu đề 2(nếu có): {item.title2} </p> 
                                  
                                   </td>
                                 
                                    <td> { item.status=="0"? "Không hoạt động": "Hoạt động" } </td>
                                    <td> 
                                     <p>Lượt tải: { item.dowload }  </p>
                                     <p>Lượt xem: { item.dowload }  </p>
                                     
                                     </td>
                                    <td className="text-center">
                                      {/* <CButton style={styles.mgl5} outline color="primary" size="sm" onClick={async (e) => await this.openUpdate(item)} >
                                        <CIcon name="cilPencil" />
                                      </CButton>{' '} */}
                                      <CButton outline color="danger" size="sm" onClick={(e) => { this.openDelete(item) }}>
                                        <CIcon name="cilTrash" />
                                      </CButton>
                                    </td>
                                  </tr>
                                );
                              }) : ""
                          }
                        </tbody>
                      </table> :
                      <div className="sweet-loading" style={{ height: 370 }}>
                        <DotLoader css={override} size={50} color={"#123abc"} loading={this.state.isLoadingTable} speedMultiplier={1.5} />
                      </div>
                  }
                </CardBody>
              </Card>
           

            </Col>
          </Row>

          <Modal size="xl" isOpen={this.state.modalCom} className={this.props.className}>
            <ModalHeader>{this.state.action == 'new' ? `Tạo mới` : `Cập nhật`}</ModalHeader>
            <ModalBody>
              <TextFieldGroup
                field="title"
                label="Tên sách"
                value={this.state.title}
                placeholder={"Tên sách"}
                onChange={e => this.onChange("title", e.target.value)}
              />

              <TextFieldGroup
                field="image"
                label="Ảnh sách"
                type={"file"}
                onChange={e => { this.onChangeImage(e) }}
                onClick={(e) => { e.target.value = null; this.setState({ image_show: "" }) }}
              />
              {
                this.state.image == "" ? "" :
                  <img width="250" height="300" src={
                    this.state.image_show == "" ? `http://localhost:3002/public/image_plugin/${this.state.image_link}` : this.state.image} style={{ marginBottom: 20 }} />
              }

            <TextFieldGroup
                field="linkFiePdf"
                label="File sách"
                type={"file"}
                onChange={e => { this.onUploadFile2(e) }}
                onClick={(e) => { e.target.value = null; this.setState({ linkFiePdf: "" }) }}
              />
              {
                this.state.image == "" ? "" :
                  <img width="250" height="300" src={
                    this.state.linkFiePdf_show == "" ? `http://localhost:3002/public/image_plugin/${this.state.linkFiePdf_show}` : this.state.linkFiePdf} style={{ marginBottom: 20 }} />
              }


           
              <label className="control-label">Mô tả</label>
              <CTextarea
                name="description"
                rows="3"
                value={this.state.description}
                onChange={(e) => { this.setState({ description: e.target.value }) }}
                placeholder="Mô tả"
              />

 
<TextFieldGroup
                field="title"
                label="Tiêu đề phụ(2)"
                value={this.state.title2}
                placeholder={"Tiêu đề phụ(2)"}
                onChange={e => this.onChange("title2", e.target.value)}
              />

<TextFieldGroup
                field="author"
                label="Tác giả"
                value={this.state.author}
                placeholder={"Tác giả"}
                onChange={e => this.onChange("author", e.target.value)}
              />

          <TextFieldGroup
                field="extraInfo"
                label="Thông tin thêm"
                value={this.state.extraInfo}
                placeholder={"Thông tin thêm"}
                onChange={e => this.onChange("extraInfo", e.target.value)}
              />
              {/* <div style={{ width: "100%" }} className="mt-3">
                <CLabel>Trạng thái:</CLabel>
                <CSelect onChange={async e => { this.changeLevel(e) }}  value = {this.state.status} custom size="sm" name="selectSm" id="SelectLm">
                      
                       <option  value = "-1" >
                          Chọn trạng thái
                        </option>
                          <option  value = "1" >
                          Hoạt động
                        </option>

                          <option value = "0" >
                          Không Hoạt động
                        </option>
                      
                    </CSelect>
              </div> */}

             
            </ModalBody>
            <ModalFooter>
              <CButton color="primary" onClick={e => { this.state.action === 'new' ? this.addProduct() : this.updateProduct() }} disabled={this.state.isLoading}>Lưu</CButton>{' '}
              <CButton color="secondary" onClick={e => this.toggleModal("new")}>Đóng</CButton>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalDelete} toggle={e => this.setState({ modalDelete: !this.state.modalDelete, delete: null })} className={this.props.className}>
            <ModalHeader toggle={e => this.setState({ modalDelete: !this.state.modalDelete, delete: null })}>{`Xoá`}</ModalHeader>
            <ModalBody>
              <label htmlFor="tag">{`Xác nhận xóa !!!`}</label>
            </ModalBody>
            <ModalFooter>
              <CButton color="primary" onClick={e => this.delete()} disabled={this.state.isLoading}>Xoá</CButton>{' '}
              <CButton color="secondary" onClick={e => this.setState({ modalDelete: !this.state.modalDelete, delete: null })}>Đóng</CButton>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
    return (
      <div className="sweet-loading">
        <DotLoader css={override} size={50} color={"#123abc"} loading={this.state.isLoading} speedMultiplier={1.5} />
      </div>
    );
  }
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const styles = {
  pagination: {
    marginRight: '5px'
  },
  flexLabel: {
    width: 100
  },
  flexOption: {
    width: 300
  },
  a: {
    textDecoration: 'none'
  },
  floatRight: {
    float: "right",
    marginTop: '3px'
  },
  spinner: {
    width: "30px"
  },
  center: {
    textAlign: "center"
  },
  tbody: {
    height: "380px",
    overflowY: "auto"
  },
  wh25: {
    width: "25%",
    float: "left",
    height: "80px"
  },
  w5: {
    width: "15%",
    float: "left",
    height: "80px"
  },
  wa10: {
    width: "5%",
    float: "left",
    height: "80px"
  },
  row: {
    float: "left",
    width: "100%"
  },
  success: {
    color: 'green'
  },
  danger: {
    color: 'red'
  },
  mgl5: {
    margin: '2px'
  },
  tags: {
    float: "right",
    marginRight: "5px"
  },
  searchInput: {
    width: "190px",
    display: 'inline-block',
  },
  userActive: {
    color: 'green'
  },
  userPending: {
    color: 'red'
  },
  nagemonNameCol: {
    width: '328px'
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '99999px'
  },
}

export default SuggestItem;
