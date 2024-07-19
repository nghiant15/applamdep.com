import React, { Component } from 'react';
import CIcon from '@coreui/icons-react'
import { cifAU, freeSet } from '@coreui/icons';

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
  CRow,
  CCol,
  CCardFooter,
  CCard,
  CCardBody,
  CCollapse,
  CListGroup,
  CListGroupItem,
  CInputFile
} from '@coreui/react'

import CreatableSelect from 'react-select/creatable';
import Pagination from '@material-ui/lab/Pagination';
import 'moment-timezone';
import Constants from "../../../../contants/contants";
import TextFieldGroup from "../../../Common/TextFieldGroup";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import API_CONNECT from "../../../../functions/callAPI";
import lodash from "lodash";
import { object } from 'prop-types';
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: '',
      keyColor: '',
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
      type_id: '',
      brand_id: '',
      color_id: '',
      brand_name: '',
      name: '',
      href: '',
      image: '',
      price: 0,
      brands: [],
      arrOptionBrand: [],
      objectValueBrand: {},
      types: [],
      colors: [],
      modalDelete: false,
      delete: null,
      arrPagination: [],
      indexPage: 1,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      type: localStorage.getItem('type'),
      user: localStorage.getItem('user'),
      isLoading: false,
      BASE_URL: Constants.BASE_URL_CURRENT,
      arrProductColor: [],
      colorItem: [],
      colorItemUpdate: [],
      colorItemBase: [],
      colorChooseUpdate: '',
      collapse: false,
      totalCount: '',
      isLoadingTable: false,
      image_show: "",
      image_link: "",
      image_link_save: "",
    };
  }
  async componentDidMount() {
    const { type } = this.state;
    if (type == '0' || type == '1') {
      this.getData()
    } else {
      this.getData_Company()
    }
    let arr = JSON.parse(localStorage.getItem('url'));
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url == window.location.hash) {
        if (arr[i].isHidden == true) {
          window.location.href = '#/'
        }
      }
    }
  }

  getDataPagination = async (skip, v) => {

    const { token, totalCount, user, type, arrPagination, indexPage } = this.state;

    this.setState({ isLoadingTable: true });
    if (type == '0' || type == '1') {
      var res = await API_CONNECT(
        Constants.LIST_PRODUCT + `?skip=${Number(totalCount) - Number(skip)}`, {}, "", "GET")
    } else {
      var res = await API_CONNECT(
        Constants.LIST_PRODUCT_COMPANY + JSON.parse(user).company_id + `?skip=${Number(totalCount) - Number(skip)}`, {}, token, "GET")
    }

    let val = res.data;

    // console.log("arrPagination: ", arrPagination[v - 1])
    // console.log("val:" , val)
    // console.log(v)
    // console.log(indexPage)

    if (arrPagination[v - 1].length != 0) {
      for (let i = 0; i < arrPagination[v - 1].length; i++) {
        val[i].id = arrPagination[v - 1][i]
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
    this.setState({ isLoading: true });

    const res_product = await API_CONNECT(
      Constants.LIST_PRODUCT, {}, "", "GET")

    let val = res_product.data;
    let totalItem = res_product.arrTotal;

    this.pagination(totalItem, val);

    this.setState({ dataApi: val });

    let active = 0

    this.setState({ isLoading: false, totalActive: active });
  }

  getData_Company = async () => {
    this.setState({ isLoading: true });

    const res_product = await API_CONNECT(
      Constants.LIST_PRODUCT_COMPANY + JSON.parse(this.state.user).company_id, {}, this.state.token, "GET")

    if (res_product.status == 200) {
      let val = res_product.data;
      let totalItem = res_product.arrTotal;

      this.pagination(totalItem, val);


      this.setState({ isLoading: false, dataApi: val });
    }
  }

  async toggleModal(key) {

    if (key == 'new') {
      this.setState({
        modalCom: !this.state.modalCom,
        action: key,
        image_show: "",
        name: "",
        image: "",
        price: 0,
        href: "",
        type_id: this.state.types.length == 0 ? '' : this.state.types[0].type_id,
        brand_id: this.state.brands.length == 0 ? '' : this.state.brands[0]._id,
        arrProductColor: [],
        collapse: false
      }, async () => {
        if (this.state.brands.length == 0 && this.state.types.length == 0 && this.state.colors.length == 0) {
          if (this.state.type == '0' || this.state.type == '1') {
            const res_brand = await API_CONNECT(
              Constants.LIST_BRAND, {}, "", "GET")

            const res_type = await API_CONNECT(
              Constants.LIST_TYPE + "/null", {}, "", "GET")

            const res_color = await API_CONNECT(
              Constants.LIST_COLOR, {}, "", "GET")

            var brands = res_brand.data;
            var types = res_type.data;
            var colors = res_color.data;

            let arrTempOptionBrand = [];
            for (let i = 0; i < brands.length; i++) {
              arrTempOptionBrand.push({
                value: brands[i]._id, label: brands[i].name
              })
            }

            this.setState({
              brands: brands, objectValueBrand: arrTempOptionBrand[0], brand_id: arrTempOptionBrand.length == 0 ? "" : arrTempOptionBrand[0].value,
              arrOptionBrand: arrTempOptionBrand, types: types, colors: colors, colorItem: types.length == 0 ? "" : types[0].color_id
            });

          } else {
            const res_brand = await API_CONNECT(
              Constants.LIST_BRAND_COMPANY + JSON.parse(this.state.user).company_id, {}, "", "GET")

            const res_type = await API_CONNECT(
              Constants.LIST_TYPE_COMPANY + JSON.parse(this.state.user).company_id + "/null", {}, "", "GET")

            const res_color = await API_CONNECT(
              Constants.LIST_COLOR_COMPANY + JSON.parse(this.state.user).company_id, {}, "", "GET")

            var brands = res_brand.data;
            var types = res_type.data;
            var colors = res_color.data;

            let arrTempOptionBrand = [];
            for (let i = 0; i < brands.length; i++) {
              arrTempOptionBrand.push({
                value: brands[i]._id, label: brands[i].name
              })
            }
            this.setState({
              brands: brands, objectValueBrand: arrTempOptionBrand[0], brand_id: arrTempOptionBrand[0].value,
              arrOptionBrand: arrTempOptionBrand, types: types, colors: colors, colorItem: types[0].color_id
            });
          }
        }
      })
    }

  }

  onChangeImage(e) {
    let files = e.target.files;
    let reader = new FileReader();
    this.setState({ image_link: files[0].name, image_link_save: files[0] })
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      this.setState({ image: e.target.result, image_show: e.target.result })
    }
  }

  onChangeImage_ADD(e, index) {
    const { arrProductColor } = this.state;
    let files = e.target.files;
    arrProductColor[Number(index)].image_link = files[0].name
    arrProductColor[Number(index)].data_image = files[0]
    this.setState({ arrProductColor: arrProductColor })

    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      arrProductColor[Number(index)].image = e.target.result;
      this.setState({ arrProductColor: arrProductColor })
    }
  }

  async addProduct() {
    const { name, href, type_id, brand_id, arrProductColor, price } = this.state

    if (name == null || name == '' ||
      href == null || href == '' ||
      type_id == null || type_id == '' ||
      brand_id == null || brand_id == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    if (arrProductColor.length == 0) {
      alert("Chưa thêm bất kì sản phẩm nào, thêm sản phẩm thất bại !!!");
      this.setState({ modalCom: !this.state.modalCom })
    } else {
      for (let i = 0; i < arrProductColor.length; i++) {
        if (arrProductColor[i].color_id == "") {
          alert("Sản phẩm thứ " + (i + 1) + " chưa được chọn màu");
          return;
        }
      }

      //run api here

      const body = {
        type_id: type_id,
        brand_id: brand_id,
        name: name,
        price: price,
        href: href,
        dataProductColor: arrProductColor,
        company_id: this.state.type == '0' || this.state.type == '1' ? null : JSON.parse(this.state.user).company_id
      }

      this.setState({ isLoading: true });
      const res = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.ADD_PRODUCT,
        method: 'POST',
        data: body
      });

      if (res.status == 200) {
        for (let i = 0; i < arrProductColor.length; i++) {
          const form = new FormData();
          form.append("image", arrProductColor[i].data_image);

          await API_CONNECT(Constants.UPLOAD_IMAGE_MAKEUP, form, "", "POST")
        }

        if (this.state.type == '0' || this.state.type == '1') {
          this.getData()
        } else {
          this.getData_Company()
        }
        this.setState({ modalCom: !this.state.modalCom })
      } else {
        alert("Thêm sản phẩm thất bại");
        this.setState({ isLoading: false });
      }
    }
  }

  async openUpdate(item) {
    const { brands, types, colors } = this.state;
    let objValue = { value: item.brand_id == null ? "" : item.brand_id._id, label: item.brand_id == null ? "" : item.brand_id.name }
    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      name: item.name,
      image: item.image,
      image_link: item.image_link,
      href: item.href,
      type_id: item.type_id.type_id,
      brand_id: item.brand_id._id,
      price: item.price,
      objectValueBrand: objValue,
      color_id: item.color_id == null ? null : item.color_id,
      colorChooseUpdate: item.color_id == null ? null : item.color_id.hex,
      brand_name: item.brand_id.name,
      id: item['_id'],
      arrProductColor: [],
      colorItemUpdate: item.type_id.color_id,
      colorItemBase: item.type_id.color_id,
      collapse: false,
      image_show: ""
    }, async () => {
      if (brands.length == 0 && types.length == 0 && colors.length == 0) {
        if (this.state.type == '0' || this.state.type == '1') {
          const res_brand = await API_CONNECT(
            Constants.LIST_BRAND, {}, "", "GET")

          const res_type = await API_CONNECT(
            Constants.LIST_TYPE + "/null", {}, "", "GET")

          const res_color = await API_CONNECT(
            Constants.LIST_COLOR, {}, "", "GET")

          let arrTempOptionBrand = [];
          for (let i = 0; i < res_brand.data.length; i++) {
            arrTempOptionBrand.push({
              value: res_brand.data[i]._id, label: res_brand.data[i].name
            })
          }
          this.setState({ brands: res_brand.data, arrOptionBrand: arrTempOptionBrand, types: res_type.data, colors: res_color.data, colorItem: res_type.data.length == 0 ? "" : res_type.data[0].color_id });

        } else {
          const res_brand = await API_CONNECT(
            Constants.LIST_BRAND_COMPANY + JSON.parse(this.state.user).company_id, {}, "", "GET")

          const res_type = await API_CONNECT(
            Constants.LIST_TYPE_COMPANY + JSON.parse(this.state.user).company_id + "/null", {}, "", "GET")

          const res_color = await API_CONNECT(
            Constants.LIST_COLOR_COMPANY + JSON.parse(this.state.user).company_id, {}, "", "GET")

          let arrTempOptionBrand = [];
          for (let i = 0; i < res_brand.data.length; i++) {
            arrTempOptionBrand.push({
              value: res_brand.data[i]._id, label: res_brand.data[i].name
            })
          }
          this.setState({ brands: res_brand.data, arrOptionBrand: arrTempOptionBrand, types: res_type.data, colors: res_color.data, colorItem: res_type.data.length == 0 ? "" : res_type.data[0].color_id });
        }
      }
    })
  }

  async updateProducts() {
    const { name, image, href, type_id, brand_id, color_id, image_link, indexPage, image_link_save, price } = this.state

    const form = new FormData();
    form.append("image", image_link_save);

    await API_CONNECT(Constants.UPLOAD_IMAGE_MAKEUP, form, "", "POST")

    if (name == null || name == '' ||
      href == null || href == '' ||
      type_id == null || type_id == '' ||
      brand_id == null || brand_id == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    this.setState({ modalCom: !this.state.modalCom })

    const body = {
      type_id: type_id,
      brand_id: brand_id,
      name: name,
      href: href,
      image: image,
      price: price,
      image_link: image_link,
      color_id: color_id,
      id: this.state.id
    }

    this.setState({ isLoadingTable: true, isSearch: false });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.UPDATE_PRODUCT,
      method: 'POST',
      data: body
    });

    if (res.status == 200) {
      this.getDataPagination(this.state.limit * Number(indexPage), Number(indexPage))

    } else {
      alert("Cập nhật thất bại");
      this.setState({ isLoadingTable: false });
    }
  }

  openDelete = (item) => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      id: item._id
    })
  }

  async delete() {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.DELETE_PRODUCT,
      method: 'POST',
      data: {
        "id": this.state.id
      }
    });

    if (res.status == 200) {
      if (this.state.type == '0' || this.state.type == '1') {
        this.getData()
      } else {
        this.getData_Company()
      };
      this.setState({ modalDelete: !this.state.modalDelete, delete: null })
    } else {
      alert("Xóa sản phẩm thất bại");
      this.setState({ isLoading: false });
    }

  }

  onChange(key, val) {
    this.setState({ [key]: val })
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

  searchKey() {
    const { indexPage, key, type } = this.state;
    // this.setState({ key: key })
    if (key != '') {
      let d = []
      this.state.dataApi.map(val => {
        if (val.name.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.brand_id.name.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.type_id.name.toLocaleUpperCase().includes(key.toLocaleUpperCase())) {

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
      if (type == '0' || type == '1') {
        this.getData()
      } else {
        this.getData_Company()
      }
    }
  }

  actionSearch(e, name_action) {
    this.setState({
      [name_action]: e.target.value
    }, () => {
      this.searchKey();
    });
  }

  onChooseColor(color_id, index, hex) {
    const { arrProductColor } = this.state;
    arrProductColor[Number(index)].color_id = color_id;
    arrProductColor[Number(index)].collapse = false;
    arrProductColor[Number(index)].hex = hex;
    this.setState({ arrProductColor: arrProductColor, keyColor: '' })
  }

  resetSearch() {
    this.setState({
      key: ''
    }, () => {
      this.searchKey();
    });
  }

  searchColor() {
    const { keyColor, colorItem, colors } = this.state;

    if (keyColor != '') {
      let d = []
      colorItem.map(val => {
        if (val.hex.toLocaleUpperCase().includes(keyColor.toLocaleUpperCase())) {

          d.push(val)
        }
      })

      this.setState({ colorItem: d })
    } else {
      this.setState({ colorItem: colors })
    }
  }

  actionSearchColor(e, name_action) {
    this.setState({
      [name_action]: e
    }, () => {
      this.searchColor();
    });
  }

  searchColorUpdate() {
    const { keyColor, colorItemBase, colorItemUpdate } = this.state;

    if (keyColor != '') {
      let d = []
      colorItemUpdate.map(val => {
        if (val.hex.toLocaleUpperCase().includes(keyColor.toLocaleUpperCase())) {

          d.push(val)
        }
      })

      this.setState({ colorItemUpdate: d })
    } else {
      this.setState({ colorItemUpdate: colorItemBase })
    }
  }

  actionSearchColorUpdate(e, name_action) {
    this.setState({
      [name_action]: e
    }, () => {
      this.searchColorUpdate();
    });
  }

  renderFormAdd() {
    const { types, arrProductColor, colorItem, keyColor, type_id, objectValueBrand, arrOptionBrand } = this.state;
    return (
      <div>
        <ModalHeader>Thêm mới</ModalHeader>
        <ModalBody>
          <TextFieldGroup
            field="name"
            label="Tên sản phẩm"
            value={this.state.name}
            placeholder={"Tên sản phẩm"}
            onChange={e => this.onChange("name", e.target.value)}
          />

          <TextFieldGroup
            field="price"
            label="Giá sản phẩm"
            value={this.state.price}
            placeholder={"Giá sản phẩm"}
            onChange={e => this.onChange("price", e.target.value)}
          />

          <TextFieldGroup
            field="href"
            label="Đường dẫn"
            value={this.state.href}
            placeholder={"Đường dẫn"}
            onChange={e => this.onChange("href", e.target.value)}
          />

          <CRow>
            <CCol md="2" lg="2" sm="12" xm="12" lx="2">
              <CLabel>Thương hiệu:</CLabel>
            </CCol>
            <CCol md="10" lg="10" sm="12" xm="12" lx="10">
              <CreatableSelect

                isClearable
                onChange={this.handleChange}
                value={objectValueBrand}
                // onInputChange={this.handleInputChange}
                options={arrOptionBrand}
              />
            </CCol>
          </CRow>

          <CLabel>Danh mục:</CLabel>
          <div style={{ width: "100%" }}>
            <CSelect onChange={async e => {

              var song = lodash.find(types, { _id: e.target.value });

              this.setState({ type_id: e.target.value, colorItem: song.color_id });
            }} custom size="sm" name="selectSm" id="SelectLm">
              {
                types.map((item, i) => {
                  if (item.type_id == type_id) {
                    return (
                      <option selected key={i} value={item._id}>{item.name}</option>
                    );
                  } else {
                    return (
                      <option key={i} value={item._id}>{item.name}</option>
                    );
                  }
                })
              }
            </CSelect>
          </div>


          <div className={"mt-2"}>
            <CLabel>Màu và hình ảnh cho sản phẩm</CLabel>
            <CCard>
              <CRow>
                {
                  arrProductColor.map((item, i) => {
                    var id = i;
                    return (
                      <CCol xs="6" sm="6" lg="6">
                        <CCardBody style={{ border: '1px solid black', borderRadius: 20, margin: 2 }}>
                          <CButton className="mb-2" style={{ float: 'right' }} color="danger" onClick={e => {
                            arrProductColor.splice(i, 1);
                            this.setState({ arrProductColor: arrProductColor })
                          }}>X</CButton>
                          <CRow>
                            <CCol xs="8" sm="8" lg="8">
                              <CCollapse show={item.collapse}>
                                <CListGroup>
                                  <CListGroupItem style={{ backgroundColor: "#000000" }}>
                                    <Input style={{ width: '100%' }} onChange={(e) => {
                                      this.actionSearchColor(e.target.value, "keyColor");
                                    }} name="keyColor" value={keyColor} placeholder="Tìm kiếm" />
                                  </CListGroupItem>
                                  <div style={{ height: '200px', overflowY: 'scroll' }}>
                                    {
                                      colorItem.map((item, i) => {
                                        return (
                                          <CListGroupItem style={{ cursor: 'pointer' }} key={i} onClick={() => {
                                            this.onChooseColor(item._id, id, item.hex)
                                          }}>
                                            <CRow>
                                              <CCol lg="5">{item.hex}</CCol>
                                              <CCol lg="7"><div style={{ backgroundColor: item.hex, width: '100%', height: 20 }}></div></CCol>
                                            </CRow>
                                          </CListGroupItem>
                                        );
                                      })
                                    }
                                  </div>
                                </CListGroup>
                              </CCollapse>

                              <CButton
                                color="primary"
                                style={{ width: '100%' }}
                                onClick={() => { arrProductColor[i].collapse = !item.collapse; this.setState({ arrProductColor: arrProductColor }) }}
                                className={'mb-1'}
                              >{
                                  !item.collapse ? "Chọn màu" : "Đóng"
                                }</CButton>
                            </CCol>
                            <CCol xs="4" sm="4" lg="4">
                              {arrProductColor[i].hex}
                              <div style={{ backgroundColor: arrProductColor[i].hex, width: '100%', height: 14, borderRadius: 20 }}></div>
                            </CCol>
                          </CRow>

                          <div className={"m-2"}>
                            <CLabel>Ảnh sản phẩm</CLabel>
                            <CInputFile name="image" onChange={e => { this.onChangeImage_ADD(e, i) }} onClick={(e) => { e.target.value = null }} id="file-input" name="file-input" />
                          </div>

                          <center>
                            <img width="150" height="180" src={arrProductColor[i].image} style={{ marginBottom: 20 }} />
                          </center>
                        </CCardBody>
                      </CCol>
                    );
                  })
                }
              </CRow>
              <CCardFooter>
                <CButton color="primary" style={{ float: 'right', width: '100%' }} onClick={e => {
                  arrProductColor.push({ color_id: "", image: "", collapse: false, hex: '' })
                  this.setState({ arrProductColor: arrProductColor })
                }}>Thêm một màu và hình ảnh nữa</CButton>
              </CCardFooter>
            </CCard>
          </div>


        </ModalBody>
        <ModalFooter>
          <CButton color="primary" onClick={e => {
            this.addProduct()
          }} disabled={this.state.isLoading}>Lưu</CButton>{' '}
          <CButton color="secondary" onClick={e => this.setState({ modalCom: !this.state.modalCom })}>Đóng</CButton>
        </ModalFooter>
      </div>
    )
  }

  handleChange = (newValue, actionMeta) => {
    this.setState({ objectValueBrand: newValue, brand_id: newValue.value })
    console.log(newValue.value);
  };

  render() {
    const { data, arrPagination, arrOptionBrand, objectValueBrand,
      price, types, key, collapse, keyColor, colorItemUpdate, colorChooseUpdate } = this.state;
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify">Danh sách sản phẩm</i>
                  <div style={styles.tags}>
                    <CRow>
                      <CCol sm="12" lg="12">
                        <CRow>
                          <CCol sm="12" lg="6">
                            <div>
                              <Input style={styles.searchInput} onChange={(e) => {
                                this.actionSearch(e, "key");
                              }} name="key" value={key} placeholder="Từ khóa" />
                            </div>
                          </CCol>
                          <CCol sm="12" lg="6">
                            <CButton color="primary" style={{ width: '100%', marginTop: 5 }} size="sm" onClick={e => { this.resetSearch() }}>Làm mới tìm kiếm</CButton>
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol sm="12" lg="12">
                        <CButton outline color="primary" style={styles.floatRight} size="sm" onClick={async e => await this.toggleModal("new")}>Thêm</CButton>
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
                            <th className="text-center">Danh mục cấp 2</th>
                            <th className="text-center">Thương hiệu</th>
                            <th className="text-center">Tên sản phẩm</th>
                            <th className="text-center">Giá</th>
                            <th className="text-center">Màu</th>
                            <th className="text-center">Đường dẫn</th>
                            <th className="text-center">Ảnh</th>
                            <th className="text-center">#</th>
                          </tr>
                        </thead>
                        <tbody>
                          <td colSpan="10" hidden={this.state.hidden} className="text-center">Không tìm thấy dữ liệu</td>
                          {
                            data != undefined ?
                              data.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="text-center">{item.id + 1}</td>
                                    <td className="text-center">{item.type_id == null ? "" : item.type_id.name}</td>
                                    <td className="text-center">{item.brand_id == null ? "" : item.brand_id.name}</td>
                                    <td className="text-center">{item.name}</td>
                                    <td className="text-center">{item.price}</td>
                                    <td className="text-center">
                                      {item.color_id == null ? "" : item.color_id.hex}
                                      <div style={{ backgroundColor: item.color_id == null ? "" : item.color_id.hex, width: '100%', height: '30px' }}> </div>
                                    </td>
                                    <td className="text-center">
                                      <a
                                        href={item.href}
                                        target="_blank"
                                      >{`Open web`}</a>
                                    </td>
                                    <td className="text-center" style={{ width: '10%' }}>
                                      {
                                        <img src={item.image_link == null ? item.image : `https://api-soida.applamdep.com/public/image_makeup/${item.image_link}`} width={"60px"} height={"60px"} />
                                      }
                                    </td>
                                    <td className="text-center">
                                      <CButton style={styles.mgl5} outline color="primary" size="sm" onClick={async (e) => await this.openUpdate(item)} >
                                        <CIcon name="cilPencil" />
                                      </CButton>
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
              <div style={{ float: 'right' }}>
                <Pagination count={arrPagination.length} color="primary" onChange={async (e, v) => {
                  this.setState({ indexPage: v })
                  await this.getDataPagination(this.state.limit * (v), v)
                }} />
              </div>
            </Col>
          </Row>

          <Modal size="xl" isOpen={this.state.modalCom} className={this.props.className}>
            {
              this.state.action == "new" ? this.renderFormAdd() :
                <div>
                  <ModalHeader>Cập nhật</ModalHeader>
                  <ModalBody>
                    <TextFieldGroup
                      field="name"
                      label="Tên sản phẩm"
                      value={this.state.name}
                      placeholder={"Tên sản phẩm"}
                      // error={errors.title}
                      onChange={e => this.onChange("name", e.target.value)}
                    // rows="5"
                    />

                    <TextFieldGroup
                      field="href"
                      label="Đường dẫn"
                      value={this.state.href}
                      placeholder={"Đường dẫn"}
                      // error={errors.title}
                      onChange={e => this.onChange("href", e.target.value)}
                    // rows="5"
                    />

                    <TextFieldGroup
                      field="image"
                      label="Ảnh sản phẩm"
                      type={"file"}
                      // error={errors.title}
                      onChange={e => { this.onChangeImage(e) }}
                      onClick={(e) => { e.target.value = null; this.setState({ image_show: "" }) }}
                    // rows="5"
                    />
                    {
                      this.state.image == "" ? "" :
                        <img width="250" height="300" src={
                          this.state.image_show == "" ? `https://api-soida.applamdep.com/public/image_makeup/${this.state.image_link}` : this.state.image
                        } style={{ marginBottom: 20 }} />
                    }
                    {/* <div style={{ width: "100%" }}> */}
                    <CRow>
                      <CCol md="2" lg="2" sm="12" xm="12" lx="2">
                        <CLabel>Thương hiệu:</CLabel>
                      </CCol>
                      <CCol md="10" lg="10" sm="12" xm="12" lx="10">
                        <CreatableSelect
                          isClearable
                          onChange={this.handleChange}
                          value={objectValueBrand}
                          // onInputChange={this.handleInputChange}
                          options={arrOptionBrand}
                        />
                      </CCol>
                    </CRow>

                    <TextFieldGroup
                      field="price"
                      label="Giá sản phẩm"
                      value={price}
                      // error={errors.title}
                      onChange={e => { this.onChange("price", e.target.value) }}
                    // rows="5"
                    />

                    <CLabel>Danh mục:</CLabel>
                    <div style={{ width: "100%" }}>
                      <CSelect onChange={async e => {
                        this.setState({ type_id: JSON.parse(e.target.value)._id, colorItemUpdate: JSON.parse(e.target.value).color_id });
                      }} custom size="sm" name="selectSm" id="SelectLm">
                        {
                          types.map((item, i) => {
                            if (item.type_id == this.state.type_id) {
                              return (
                                <option selected key={i} value={JSON.stringify(item)}>{item.name}</option>
                              );
                            } else {
                              return (
                                <option key={i} value={JSON.stringify(item)}>{item.name}</option>
                              );
                            }
                          })
                        }
                      </CSelect>
                    </div>
                    <div className="mt-2">
                      <div className="text-center m-5">
                        <CLabel><strong>Màu đã chọn: </strong></CLabel> {' '}
                        {colorChooseUpdate}
                        <div style={{ backgroundColor: colorChooseUpdate, width: '100%', height: '30px' }}> </div>
                      </div>
                      <CCollapse show={collapse}>
                        <CListGroup>
                          <CListGroupItem style={{ backgroundColor: "#000000" }}>
                            <Input style={{ width: '100%' }} onChange={(e) => {
                              this.actionSearchColorUpdate(e.target.value, "keyColor");
                            }} name="keyColor" value={keyColor} placeholder="Tìm kiếm" />
                          </CListGroupItem>
                          <div style={{ height: '200px', overflowY: 'scroll' }}>
                            {
                              colorItemUpdate.map((item, i) => {
                                return (
                                  <CListGroupItem style={{ cursor: 'pointer' }} key={i} onClick={() => {
                                    this.setState({ color_id: item._id, colorChooseUpdate: item.hex })
                                  }}>
                                    <CRow>
                                      <CCol lg="2">{item.hex}</CCol>
                                      <CCol lg="10"><div style={{ backgroundColor: item.hex, width: '100%', height: 20 }}></div></CCol>
                                    </CRow>
                                  </CListGroupItem>
                                );
                              })
                            }
                          </div>
                        </CListGroup>
                      </CCollapse>
                    </div>
                    <CButton
                      color="primary"
                      style={{ width: '100%' }}
                      onClick={() => { this.setState({ collapse: !collapse }) }}
                      className={'mb-1'}
                    >{
                        !collapse ? "Chọn màu" : "Đóng"
                      }</CButton>

                  </ModalBody>
                  <ModalFooter>
                    <CButton color="primary" onClick={e => this.updateProducts()} disabled={this.state.isLoading}>Lưu</CButton>{' '}
                    <CButton color="secondary" onClick={e => this.setState({ modalCom: !this.state.modalCom })}>Đóng</CButton>
                  </ModalFooter>
                </div>
            }
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
    margin: '5px'
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

export default Product;
