import React, { Component } from 'react';
import Multiselect from 'multiselect-react-dropdown';
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
  CBadge,
  CRow,
  CCol,
  CSelect,
  CLabel,
  CButton,
  CTooltip
} from '@coreui/react'

// import { makeStyles, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import 'moment-timezone';
import Constants from "./../../../../contants/contants";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');

class PluginOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: '',
      keyStatus: '',
      activePage: 1,
      page: 1,
      itemsCount: 0,
      limit: 20,
      totalActive: 0,
      modalCom: false,
      viewingUser: {},
      communities: [],
      updated: '',
      dataApi: [],
      action: 'new',
      Company_Id: '',
      Package_Id: '',
      Array_Feature: [],
      Status: '',
      modalDelete: false,
      delete: null,
      arrPagination: [],
      indexPage: 0,
      currentCompany: '',
      hidden: false,
      company_name: '',
      package_name: '',
      package_unit: '',
      package_key: '',
      package_time: '',
      currentSlug: '',
      confirmSlug: '',
      dataPackage: [],
      arrayChooseFeature: [],
      arrFeature: [],
      dataFeature: [],
      dataPackage_All: [],
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      current_status: '',
      isUpdate: '',
      role: localStorage.getItem('role'),
      type: localStorage.getItem('type'),
      arrName: [],
      arrPackage: [],
      isLoading: false,
      isLoadingTable: false,
      totalCount: ''
    };
  }
  async componentDidMount() {
    if (this.state.type == '0') {
      await this.getData();
    } else {
      await this.getDataBySale()
    }

    // this.getCompanyData();
    let arr = JSON.parse(localStorage.getItem('url'));

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url == window.location.hash) {
        if (arr[i].isHidden == true) {
          window.location.href = '#/'
        }
      }
    }
  }

  // async getCompanyData(company_id) {

  //   const resCom = await axios({
  //     baseURL: Constants.BASE_URL,
  //     url: Constants.PLUGIN_DATA_COMPANY,
  //     method: 'POST',
  //     data: {
  //       company_id: company_id
  //     }
  //   });

  //   this.setState({ company_name: resCom.data.data.Name })

  // }

  pagination(dataApi, dataResult) {
    var i, j, temparray, chunk = 5;
    var arrTotal = [];
    for (i = 0, j = dataApi.length; i < j; i += chunk) {
      temparray = dataApi.slice(i, i + chunk);
      arrTotal.push(temparray);
    }

    if (arrTotal.length == 0) {
      this.setState({
        hidden: false
      })
    } else {
      this.setState({
        hidden: true
      })
    }
    this.setState({ arrPagination: arrTotal, data: dataResult, totalCount: dataApi.length });
  }

  getData = async () => {
    this.setState({ isLoading: true });

    const totalOrder = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.COUNT_PLUGIN_ORDER,
      method: 'POST'
    });

    let totalCount = totalOrder.data.data
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_PLUGIN_ORDER,
      method: 'POST',
      data: {
        skip: Number(totalCount.length) - 5
      }
    });

    let val = res.data.data;

    this.pagination(totalCount, val);
    this.setState({ dataApi: val, arrName: res.data.data.company, arrPackage: res.data.data.package, isLoading: false });
  }

  getDataPagination = async (skip) => {
    // console.log(Number(this.state.totalCount))
    // console.log(Number(skip))

    this.setState({ isLoadingTable: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_PLUGIN_ORDER,
      method: 'POST',
      data: {
        skip: Number(this.state.totalCount) - Number(skip)
      }
    });

    let val = res.data.data;
    this.setState({
      dataApi: val,
      arrName: res.data.data.company,
      arrPackage: res.data.data.package,
      isLoadingTable: false,
      data: val
    });
  }

  getDataBySale = async () => {
    this.setState({ isLoading: true });

    const totalOrder = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.COUNT_PLUGIN_ORDER,
      method: 'POST'
    });

    let totalCount = totalOrder.data.data

    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_ORDER_BY_SALE,
      method: 'POST',
      headers: this.state.token,
      data: {
        skip: Number(totalCount.length) - 5
      }
    });

    let val = res.data.data;

    this.pagination(totalCount, val);
    this.setState({ dataApi: val, arrName: res.data.data.company, arrPackage: res.data.data.package, isLoading: true });
  }

  searchKey() {
    const { indexPage, key, keyStatus } = this.state;

    if (key != '' || keyStatus != '') {
      let d = []
      this.state.dataApi.map(val => {
        if (val.Status.toLocaleUpperCase().includes(keyStatus.toLocaleUpperCase()) &&
        (val.Company_Id.Name.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
        val.Package_Id.Name.toLocaleUpperCase().includes(key.toLocaleUpperCase()))) {
          console.log(val)
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
      let active = 0

      this.state.dataApi.map(val => {
        if (val.Status == "Actived") {
          active = active + 1
        }
      })

      this.setState({ data: this.state.arrPagination[indexPage], totalActive: active })
    }
  }

  toggleModal(key) {
    if (key == 'new') {
      this.setState({
        modalCom: !this.state.modalCom,
        action: key,
        Company_Id: '',
        Package_Id: '',
        Array_Feature: [],
        Status: '',
      })
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  async addCompany() {

  }

  openUpdate(item) {

    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      id: item['_id'],
      Status: item.Status
    })
  }

  async updateCompany() {
    const { Status, Company_Id, Package_Id, arrFeature, time_create, time_expried } = this.state
    if (Company_Id == null || Company_Id == ''
      || Package_Id == null || Package_Id == ''
      || arrFeature.length == 0) {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const body = {
      Company_Id: Company_Id,
      Package_Id: Package_Id,
      Array_Feature: arrFeature,
      Active_Date: time_create,
      End_Date: time_expried,
      Status: Status,
      id: this.state.id
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.UPDATE_PLUGIN_ORDER,
      method: 'POST',
      data: body,
      headers: this.state.token
    });

    if (res.data.is_success == true) {
      this.getData();
      this.setState({ modalCom: !this.state.modalCom })
    } else {
      alert(res.data.message);
      this.setState({ isLoading: false });
    }
  }

  async checkOutOrder(active, end) {
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.CHECK_OUT,
      method: 'POST',
      data: {
        Array_Feature: this.state.arrFeature,
        Active_Date: active,
        End_Date: end,
        id: this.state.id
      }
    });

    if (res.data.is_success == true) {
      this.getData();
      this.setState({ modalCom: !this.state.modalCom })
    } else {
      alert(res.data.message);
      this.setState({ isLoading: false });
    }
  }
  openDelete = (item) => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      delete: item
    })
  }

  async delete() {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.DELETE_PLUGIN_ORDER,
      method: 'DELETE',
      data: {
        "id": this.state.delete['_id']
      }
    });

    if (res.data.is_success == true) {
      this.getData();
      this.setState({ modalDelete: !this.state.modalDelete, delete: null })
    } else {
      alert(res.data.message);
      this.setState({ isLoading: false });
    }

  }

  getBadge(status) {
    switch (status) {
      case "0": return 'danger'
      case "1": return 'success'

      default: return 'primary'
    }
  }

  getBadge_string(status) {
    switch (status) {
      case "0": return 'ĐANG CHỜ DUYỆT'
      case "1": return 'ĐÃ DUYỆT'

      default: return 'primary'
    }
  }

  toggle(action = '') {
    this.setState({
      modal: !this.state.modal,
      image: '',
      url: '',
      isActive: false,
      isLoading: false,
      errors: {},
      action,
      position: 1,
      data: [],
      updated: '',
    });
  }
  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  goSearch() {
    this.getUsers();
  }

  actionSearch(e, name_action) {
    this.setState({
      [name_action]: e.target.value
    }, () => {
      this.searchKey();
    });
  }

  resetSearch() {
    this.setState({
      key: '',
      keyStatus: ''
    }, () => {
      this.searchKey();
    });
  }

  getBadge_type(status) {
    switch (status) {
      case "0": return 'primary'
      case "1": return 'success'

      default: return 'primary'
    }
  }

  getBadge_type_string(status) {
    switch (status) {
      case "0": return 'Đã duyệt'
      case "1": return 'Chưa duyệt'

      default: return 'primary'
    }
  }

  renderSelect() {
    const { dataFeature, dataPackage, Package_Id } = this.state;
    var arrChoose = new Array();
    let arrTemp = [];
    let arrFeature = [];
    let arrSetDefault = [];
    for (let i = 0; i < dataPackage.length; i++) {
      arrFeature.push({ name: dataPackage[i].Key, id: dataPackage[i]._id });
      arrSetDefault.push(dataPackage[i]._id)
    }

    localStorage.setItem('arrFeature', JSON.stringify(arrSetDefault));
    //Đang lấy đúng config của multiselect để đổ dữ liệu vào cho multi select
    for (let i = 0; i < dataFeature.length; i++) {
      //if (dataFeature[i].Type == "1") {
      arrTemp.push({ name: dataFeature[i].Key, id: dataFeature[i]._id })
      //}
    }
    return (
      <Multiselect
        options={arrTemp}
        selectedValues={arrFeature}
        onSelect={async (e) => {
          arrChoose = new Array();
          for (let i = 0; i < e.length; i++) {
            arrChoose.push(e[i].id);
          }
          this.setState({ arrayChooseFeature: arrChoose, arrFeature: [] });
        }}
        onRemove={async (e) => {
          arrChoose = new Array();
          for (let i = 0; i < e.length; i++) {
            arrChoose.push(e[i].id);
          }
          this.setState({ arrayChooseFeature: arrChoose, arrFeature: [] });
        }}
        displayValue="name"
      />
    )
  }

  async onNext(Company_Id, Package_Id, arrayChooseFeature) {
    const { package_key, package_unit, currentSlug, confirmSlug } = this.state;
    if (Package_Id != '') {
      await this.getCompanyName(Company_Id)
      await this.getPackageName(Package_Id)
      await this.getFeatureChoose(arrayChooseFeature);

      if (currentSlug != confirmSlug) {
        await axios({
          baseURL: Constants.BASE_URL,
          url: Constants.UPDATE_SLUG,
          method: 'POST',
          data: {
            id: Company_Id,
            Slug: currentSlug
          }
        });

        this.setState({ currentSlug: currentSlug })
      }
    } else {
      alert('Vui lòng nhập đầy đủ thông tin !!!')
    }
  }

  getCompanyName = async (company_id) => {
    const resCom = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_DATA_COMPANY,
      method: 'POST',
      data: {
        company_id: company_id
      }
    });

    this.setState({
      company_name: resCom.data.data.Name,
      currentSlug: resCom.data.data.Slug, confirmSlug: resCom.data.data.Slug
    })
  }

  getPackageName = async (package_id) => {
    const resPackage = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_DATA_PACKAGE,
      method: 'POST',
      data: {
        package_id: package_id
      }
    });

    this.setState({
      package_key: resPackage.data.data.Value, package_unit: resPackage.data.data.Unit,
      package_name: resPackage.data.data.Name,
      package_time: resPackage.data.data.Value + " " + this.convertUnitToDate(resPackage.data.data.Unit),
      time_create: Date.now(),
      time_expried: this.getCurrentMonth(resPackage.data.data.Unit, Number(resPackage.data.data.Value))
    })
    return resPackage.data.data.Name;
  }

  getFeatureChoose = async (feature) => {
    const resPackage = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.DATA_CHOOSE_FEATURE,
      method: 'POST',
      data: {
        feature: feature.length == 0 ? JSON.parse(localStorage.getItem('arrFeature')) : feature
      }
    });
    this.setState({ arrFeature: resPackage.data.data })
    return resPackage.data.data;
  }

  getCurrentMonth(unit, value) {
    var today = new Date();
    switch (unit) {
      case "0":
        var date = today.setDate(today.getDate() + value);
        return date;

      case "1":
        var month = today.setMonth(today.getMonth() + value);
        return month;
      case "2":
        var year = today.setFullYear(today.getFullYear() + value);
        return year;

      default:
        break;
    }
  }

  async getCompanyData() {
    const resCompany = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_LIST_COMPANY,
      method: 'POST',
    });

    this.setState({ dataCompany: resCompany.data.data });
  }

  async getPackageData(package_arr) {
    let arrTemp = [];
    const resPackage = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_PACKAGE,
      method: 'POST',
    });

    this.setState({ dataPackage: package_arr, dataPackage_All: resPackage.data.data });
  }

  async getFeatureData() {
    const resFeature = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_FEATURE,
      method: 'POST',
    });

    this.setState({ dataFeature: resFeature.data.data });
  }

  convertUnitToDate(unit) {
    switch (unit) {
      case '0': return 'Ngày'
      case '1': return 'Tháng'
      case '2': return 'Năm'
    }
  }

  renderTable(arrFeature, company_name, package_name, package_time) {
    const { currentSlug } = this.state;
    return (
      <table ble className="table table-hover table-outline mb-0  d-sm-table">
        <thead className="thead-light">
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Thời hạn</th>
            <th className="text-center">Tên tính năng</th>
            <th className="text-center">Đường dẫn</th>
          </tr>
        </thead>
        <tbody>
          <td colSpan="10" hidden={true} className="text-center">Không tìm thấy dữ liệu</td>
          {
            arrFeature != undefined || arrFeature.length != 0 || arrFeature != null ?
              arrFeature.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{package_time}</td>
                    <td className="text-center">{item.Key}</td>
                    <td className="text-center">{item.Value + currentSlug}</td>
                  </tr>
                );
              }) : ""
          }
        </tbody>
      </table>
    )
  }

  render() {
    const { data, arrPagination, currentSlug, type, Company_Id, Package_Id, arrayChooseFeature, arrFeature,
      company_name, package_name, package_unit, package_key, package_time, dataPackage_All, current_status, key } = this.state;

    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <p style={styles.success}>{this.state.updated}</p>
              <p style={styles.danger}>{this.state.deleted}</p>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify">Danh sách đơn hàng</i>
                  <div style={styles.tags}>
                    <CRow>
                      <CCol sm="12" lg="12">
                        <CRow>
                          <CCol sm="12" lg="4">
                            <div>
                              <Input style={styles.searchInput} onChange={(e) => {
                                this.actionSearch(e, "key");
                              }} name="key" value={key} placeholder="Từ khóa" />
                            </div>
                          </CCol>
                          <CCol sm="12" lg="4">
                            <CSelect style={styles.flexOption} onChange={e => {

                              this.actionSearch(e, "keyStatus");

                            }} custom>
                              {
                                [0, 1].map((item, i) => {
                                  return (
                                    <option value={item}>{item == '0' ? 'Chưa duyệt' : 'Đang chờ duyệt'}</option>
                                  );
                                })
                              }
                            </CSelect>
                          </CCol>
                          <CCol sm="12" lg="4">
                            <CButton color="primary" style={{ width: '100%', marginTop: 5, marginRight: 55 }} size="sm" onClick={e => { this.resetSearch() }}>Làm mới tìm kiếm</CButton>
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol sm="12" lg="12">
                        <CButton outline color="primary" style={styles.floatRight} size="sm" onClick={e => { window.location.href = '#/plugin_create_order' }}>Thêm mới</CButton>
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
                            <th className="text-center">Công ty</th>
                            <th className="text-center">Gói tính năng</th>
                            <th className="text-center">Tính năng</th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center">Sale giới thiệu</th>
                            <th className="text-center">Ngày tạo</th>
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
                                    <td className="text-center">{i + 1}</td>
                                    <td className="text-center">{item.Company_Id == null ? "" : item.Company_Id.Name}</td>
                                    <td className="text-center">{item.Package_Id == null ? "" : item.Package_Id.Name}</td>
                                    <td className="text-center">
                                      {item.Array_Feature.map((item, i) => {
                                        if (i < 1) {
                                          return (
                                            <div><a href={item.Value} target="_blank" key={i}>{item.Value}</a></div>
                                          )
                                        }
                                      })}
                                      {
                                        (item.Array_Feature.length - 2) <= 0 ? "" : item.Array_Feature.length - 2 + " mores..."
                                      }
                                    </td>
                                    <td className="text-center">
                                      <CBadge color={this.getBadge(item.Status)}>
                                        {this.getBadge_string(item.Status)}
                                      </CBadge>
                                    </td>
                                    <td className="text-center">
                                      {
                                        item.Sale_Id != undefined ? item.Sale_Id.Name : "admin"
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        new Date(item.Create_Date).toLocaleDateString()
                                      }
                                    </td>
                                    <td className="text-center">
                                      {
                                        type == '0' ? <CTooltip content="Duyệt đơn hàng">
                                          <CButton style={{ margin: 1 }} outline color="success" size="sm" onClick={async (e) => {
                                            this.openUpdate(item);
                                            this.setState({ Company_Id: item.Company_Id, Package_Id: item.Package_Id });
                                            this.getCompanyData();
                                            this.getPackageData(item.Array_Feature);
                                            this.getFeatureData();
                                            await this.getCompanyName(item.Company_Id);
                                            this.setState({ arrFeature: [], current_status: item.Status, isUpdate: false })
                                          }}>
                                            <CIcon name="cilCheck" />
                                          </CButton>
                                        </CTooltip> : ""
                                      }
                                      {' '}
                                      <CTooltip content="Cập nhật đơn hàng">
                                        <CButton style={{ margin: 1 }} outline color="primary" size="sm"
                                          onClick={async (e) => {
                                            this.openUpdate(item);
                                            this.setState({ Company_Id: item.Company_Id, Package_Id: item.Package_Id });
                                            this.getCompanyData();
                                            this.getPackageData(item.Array_Feature);
                                            this.getFeatureData();
                                            await this.getCompanyName(item.Company_Id);
                                            this.setState({ arrFeature: [], current_status: item.Status, isUpdate: true })
                                          }}
                                        ><CIcon name="cilPencil" /></CButton>
                                      </CTooltip>{' '}
                                      {
                                        type == '0' ? <CButton style={{ margin: 1 }} outline color="danger" size="sm" onClick={(e) => { this.openDelete(item) }}>
                                          <CIcon name="cilTrash" />
                                        </CButton> : ""
                                      }
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
                  //this.setState({ data: arrPagination[v - 1], indexPage: v - 1 })

                  await this.getDataPagination(5 * (v))
                }} />
              </div>

            </Col>
          </Row>

          <Modal size="xl" isOpen={this.state.modalCom} className={this.props.className}>
            <ModalHeader>{this.state.action == 'new' ? `Tạo mới` : `Cập nhật đơn hàng của ${this.state.company_name}`}</ModalHeader>
            <ModalBody>
              <CRow>
                <CCol sm="12" lg="12">
                  <CLabel>Slug</CLabel>
                  <Input onChange={(e) => { this.setState({ currentSlug: e.target.value }) }} value={currentSlug} />
                </CCol>

                <CCol sm="12" lg="12">
                  <div>
                    <label htmlFor="tag">Chọn gói sản phẩm:    </label>
                    <CSelect onChange={async e => {
                      this.setState({ Package_Id: e.target.value, arrFeature: [] });
                    }}>
                      <option value={this.state.Package_Id}>-----</option>
                      {
                        dataPackage_All.map((item, i) => {
                          if (item._id == Package_Id._id) {
                            return (
                              <option selected value={item._id}>{`${item.Name} (${item.Value} ${this.convertUnitToDate(item.Unit)})`}</option>
                            );
                          } else {
                            return (
                              <option value={item._id}>{`${item.Name} (${item.Value} ${this.convertUnitToDate(item.Unit)})`}</option>
                            );
                          }
                        })
                      }
                    </CSelect>
                  </div>
                </CCol>


                <CCol sm="12" lg="12">
                  <label htmlFor="tag">Chọn các tính năng cho gói:    </label>
                  {
                    this.renderSelect()
                  }
                </CCol>
                <CCol sm="12" lg="12">
                  <CRow>
                    <CCol sm="12" lg="6">
                    </CCol>
                    <CCol sm="12" lg="6">
                      <CButton outline color="primary" style={styles.floatRight} size="sm" onClick={async e => {
                        await this.onNext(Company_Id, Package_Id, arrayChooseFeature);
                      }}>Kiểm tra ( BẮT BUỘC )</CButton>
                    </CCol>
                  </CRow>
                </CCol>
                {arrFeature.length != 0 ?
                  <CCol sm="12" lg="12" disabled={true}>
                    <CRow>
                      <CCol sm="12" lg="12">
                        KIỂM TRA LẠI ĐƠN HÀNG TRƯỚC KHI CẬP NHẬT
                      </CCol>
                      <CCol sm="12" lg="12">
                        <strong>Tên Công Ty : {company_name}</strong>
                      </CCol>
                      <CCol sm="12" lg="12">
                        <strong>Tên Gói: {package_name}</strong>
                      </CCol>
                      <CCol sm="12" lg="12">
                        <strong>Thời gian kích hoạt dự kiến: {(new Date(Date.now())).toLocaleDateString()}</strong>
                      </CCol>
                      <CCol sm="12" lg="12">
                        <strong>Thời gian hết hạn dự kiến: {new Date(this.getCurrentMonth(package_unit, Number(package_key))).toLocaleDateString()}</strong>
                      </CCol>

                      <CCol sm="12" lg="12">
                        {
                          this.renderTable(arrFeature, company_name, package_name, package_time)
                        }
                      </CCol>
                    </CRow>
                  </CCol> : ""

                }
              </CRow>
              {/* <CCol sm="12" lg="12">
                {
                  action == 'new' ? "" : <div>
                    <label style={styles.flexLabel} htmlFor="tag">Trạng thái    </label>
                    <select style={styles.flexOption} name="Status" onChange={e => this.onChange("Status", e.target.value)}>
                      <option value={this.state.Status}>{this.state.Status == '' ? ` - - - - - - - - - - ` : this.state.Status}</option>
                      {
                        ["0", "1"].map((item, i) => {
                          if (item == this.state.Status) {
                            return (
                              <option selected value={item}>{item == 0 ? 'Tắt' : 'Bật'}</option>
                            );
                          } else {
                            return (
                              <option value={item}>{item == 0 ? 'Tắt' : 'Bật'}</option>
                            );
                          }

                        })
                      }
                    </select>
                  </div>
                }
              </CCol> */}


            </ModalBody>

            <ModalFooter>
              {
                this.state.isUpdate ?
                  <CButton color="primary" onClick={e => { this.state.action === 'new' ? this.addCompany() : this.updateCompany() }} disabled={arrFeature.length == 0 || current_status == "1" ? true : false}>Cập nhật</CButton> :
                  <CButton color="primary" onClick={async e => { await this.checkOutOrder(Date.now(), this.getCurrentMonth(package_unit, Number(package_key))) }} disabled={arrFeature.length == 0 || current_status == "1" ? true : false}>Duyệt đơn</CButton>
              }
              {' '}
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
        </div >
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
    width: 160,
    margin: '1px'
  },
  a: {
    textDecoration: 'none'
  },
  floatRight: {
    float: 'right',
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
  wh12: {
    width: "8%",
    float: "left",
    height: "80px"
  },
  wh15: {
    width: "15%",
    float: "left",
    height: "80px"
  },
  w5: {
    width: "12%",
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
    marginLeft: '5px'
  },
  tags: {
    float: "right",
    marginRight: "5px"
  },
  searchInput: {
    width: "160px",
    display: 'inline-block',
    margin: '1px'
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
  mgl5: {
    marginBottom: '5px'
  }
}

export default PluginOrder;
