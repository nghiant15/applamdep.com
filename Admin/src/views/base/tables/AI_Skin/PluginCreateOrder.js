import React, { Component } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import Moment from 'react-moment';
import 'moment-timezone';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';

import {
  CRow,
  CCol,
  CSelect,
  CButton,
  CLabel
} from '@coreui/react'

import CreatableSelect from 'react-select/creatable';
import 'moment-timezone';
import Constants from "../../../../contants/contants";
import axios from 'axios'
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');

class PluginCreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Company_Id: '',
      Package_Id: '',
      Feature_Id: '',
      arrayFeature: [],
      arrayChooseFeature: [],
      modalCom: false,
      updated: '',
      dataApi: [],
      action: 'new',
      modalDelete: false,
      delete: null,
      arrPagination: [],
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      company_id: localStorage.getItem('user'),
      dataPackage: [],
      dataFeature: [],
      company_name: '',
      package_name: '',
      package_time: '',
      package_key: '',
      package_unit: '',
      arrFeature: [],
      disableNext: false,
      time_expried: '',
      time_create: '',
      //So sách 2 slug nếu trùng thì thôi còn khác nhau thì update lại slug của công ty
      currentSlug: '',
      confirmSlug: '',
      isLoading: false,
      arrOptionCompany: [],
      objectValueCompany: {},
    };
  }

  async componentDidMount() {
    this.getCompanyData();
    this.getPackageData();
    this.getFeatureData();
    let arr = JSON.parse(localStorage.getItem('url'));

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url == window.location.hash) {
        if (arr[i].isHidden == true) {
          window.location.href = '#/'
        }
      }
    }

  }

  async getCompanyData() {
    const resCompany = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_LIST_COMPANY,
      method: 'POST',
    });

    let data = resCompany.data.data;
    let arrTempOptionCompany = [];
    for (let i = 0; i < data.length; i++) {
      arrTempOptionCompany.push({
        value: data[i]._id, label: data[i].Name
      })
    }

    this.setState({
      arrOptionCompany: arrTempOptionCompany, objectValueCompany: arrTempOptionCompany.length > 0 ? arrTempOptionCompany[0] : { value: "", label: "" }
    });
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
    return resCom.data.data.Name;
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
      package_name: resPackage.data.data.Name,
      package_time: resPackage.data.data.Value + " " + this.convertUnitToDate(resPackage.data.data.Unit),
      package_key: resPackage.data.data.Value, package_unit: resPackage.data.data.Unit
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

  async getPackageData() {
    const resPackage = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_PACKAGE,
      method: 'POST',
    });

    this.setState({ dataPackage: resPackage.data.data });
  }

  async getPackage_forFeature() {
    const resPackage = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_PACKAGE,
      method: 'POST',
    });

    return resPackage.data.data;
  }

  async getFeatureData() {
    const resFeature = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_FEATURE,
      method: 'POST',
    });

    this.setState({ dataFeature: resFeature.data.data });
  }

  async toggleModal(key) {

  }

  getBadge(status) {
    switch (status) {
      case 'INSTOCK': return 'success'
      case 'AVAILABLE': return 'secondary'
      case 'Locked': return 'warning'
      case 'Deactived': return 'danger'
      default: return 'primary'
    }
  }

  convertUnitToDate(unit) {
    switch (unit) {
      case '0': return 'Ngày'
      case '1': return 'Tháng'
      case '2': return 'Năm'
    }
  }

  renderSelect() {
    const { dataFeature, dataPackage, Package_Id } = this.state;
    var arrChoose = new Array();
    let arrTemp = [];
    let arrFeature = [];
    let arrSetDefault = [];
    for (let i = 0; i < dataPackage.length; i++) {
      if (dataPackage[i]._id == Package_Id && dataPackage[i].Status == "1") {
        for (let y = 0; y < dataPackage[i].Array_Feature.length; y++) {
          arrFeature.push({ name: dataPackage[i].Array_Feature[y].Key, id: dataPackage[i].Array_Feature[y]._id });
          arrSetDefault.push(dataPackage[i].Array_Feature[y]._id)
        }
      }
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
          this.setState({ arrayChooseFeature: arrChoose });
        }}
        onRemove={async (e) => {
          arrChoose = new Array();
          for (let i = 0; i < e.length; i++) {
            arrChoose.push(e[i].id);
          }
          this.setState({ arrayChooseFeature: arrChoose });
        }}
        displayValue="name"
      />
    )
  }

  async addOrderPlugin() {
    const { Company_Id, Package_Id, arrFeature, time_create, time_expried } = this.state;
    var body = {
      Company_Id: Company_Id,
      Package_Id: Package_Id,
      Array_Feature: arrFeature,
      Active_Date: time_create,
      End_Date: time_expried
    }

    const resOrder = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.ADD_PLUGIN_ORDER,
      method: 'PUT',
      data: body,
      headers: this.state.token
    });

    if (resOrder.data.is_success == true) {
      alert(resOrder.data.message);
      window.location.reload();
    } else {
      alert(resOrder.data.message);
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

  getCurrentDate(year = 0, month = 6, date = 16) {
    // setInterval(function () {
    //   var date_future = new Date(new Date().getFullYear() + year, month, date, 11, 1, 10);
    //   var date_now = new Date();

    //   var seconds = Math.floor((date_future - (date_now)) / 1000);
    //   var minutes = Math.floor(seconds / 60);
    //   var hours = Math.floor(minutes / 60);
    //   var days = Math.floor(hours / 24);

    //   hours = hours - (days * 24);
    //   minutes = minutes - (days * 24 * 60) - (hours * 60);
    //   seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    //   console.log("Time until new year: Days: " + days + " Hours: " + hours + " Minutes: " + minutes + " Seconds: " + seconds);
    // }, 1000);
    // var delta = Math.abs(new Date(Date.now() + (86400000 * 2)) - new Date(Date.now() + (8640000))) / 1000;
    // var days = Math.floor(delta / 86400);
    // delta -= days * 86400;
    // console.log("Duy: ", delta)
    // //console.log(new Date(Date.now() + (8640000)).toLocaleDateString());
    // return Number(new Date(Date.now() + (86400000 * 8)));
  }

  async onNext(Company_Id, Package_Id, arrayChooseFeature) {
    const { package_key, package_unit, currentSlug, confirmSlug } = this.state;
    if (Company_Id != '' && Package_Id != '') {
      await this.getCompanyName(Company_Id)
      await this.getPackageName(Package_Id)
      await this.getFeatureChoose(arrayChooseFeature);

      if (currentSlug != confirmSlug) {
        const res = await axios({
          baseURL: Constants.BASE_URL,
          url: Constants.UPDATE_SLUG,
          method: 'POST',
          data: {
            id: Company_Id,
            Slug: currentSlug
          }
        });

        if(res.is_success == true) {
          this.setState({ currentSlug: currentSlug })
        }
      }
    } else if (Company_Id == '') {
      alert('Chưa chọn công ty !!!')
    } else if (Package_Id != '') {
      alert('Chưa chọn gói !!!')
    }

    this.getCurrentDate();
    this.getCurrentMonth();
    this.setState({ disableNext: true, time_create: Date.now(), time_expried: this.getCurrentMonth(package_unit, Number(package_key)) })
  }

  handleChange = async (newValue, actionMeta) => {
    this.setState({ objectValueCompany: newValue, Company_Id: newValue.value, disableNext: false })
    await this.getCompanyName(newValue.value)
  };

  render() {
    const { dataPackage, Company_Id, Package_Id, arrayChooseFeature,
      company_name, package_name, package_time, arrFeature, package_key,
      package_unit, currentSlug, objectValueCompany, arrOptionCompany } = this.state;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"> Quản lý đơn hàng</i>
          </CardHeader>
          <CardBody>
            <div style={styles.tags}>
              <CRow>
                <CCol sm="12" lg="12">
                  <CRow>
                    <CCol md="2" lg="2" sm="12" xm="12" lx="2">
                      <CLabel>Chọn công ty:</CLabel>
                    </CCol>
                    <CCol md="10" lg="10" sm="12" xm="12" lx="10">
                      <CreatableSelect
                        isClearable
                        onChange={this.handleChange}
                        value={objectValueCompany}
                        // onInputChange={this.handleInputChange}
                        options={arrOptionCompany}
                      />
                    </CCol>
                  </CRow>
                </CCol>

                <CCol sm="12" lg="12">
                  <CLabel>Định danh</CLabel>
                  <Input onChange={(e) => { this.setState({ currentSlug: e.target.value }) }} value={currentSlug} />
                </CCol>

                <CCol sm="12" lg="12">
                  <div>
                    <label style={styles.flexLabel} htmlFor="tag">Chọn gói sản phẩm:    </label>
                    <CSelect style={styles.flexOption} onChange={async e => { this.setState({ Package_Id: e.target.value, disableNext: false }); await this.getPackageName(e.target.value) }}>
                      <option value={this.state.Package_Id}>-----</option>
                      {
                        dataPackage.map((item, i) => {
                          return (
                            <option value={item._id}>{`${item.Name} (${item.Value} ${this.convertUnitToDate(item.Unit)})`}</option>
                          );
                        })
                      }
                    </CSelect>
                  </div>
                </CCol>


                <CCol sm="12" lg="12">
                  <label style={styles.flexLabel} htmlFor="tag">Chọn các tính năng cho gói:    </label>
                  {
                    this.renderSelect()
                  }
                </CCol>

                <CCol sm="12" lg="12">
                  <label style={{ marginTop: 10 }} htmlFor="tag">Số lượng tính năng: {this.state.arrayChooseFeature.length == 0 ? JSON.parse(localStorage.getItem('arrFeature')).length : this.state.arrayChooseFeature.length}    </label>
                </CCol>

                <CCol sm="12" lg="12">
                  <CRow>
                    <CCol sm="12" lg="6">
                    </CCol>
                    <CCol sm="12" lg="6">
                      <CButton disabled={this.state.disableNext} outline color="primary" style={styles.floatRight} size="sm" onClick={async e => {
                        await this.onNext(Company_Id, Package_Id, arrayChooseFeature);
                      }}>Tiếp tục</CButton>
                    </CCol>
                  </CRow>
                </CCol>
                {arrFeature.length != 0 ?
                  <CCol sm="12" lg="12">
                    <CRow>
                      <CCol sm="12" lg="12">
                        KIỂM TRA LẠI ĐƠN HÀNG TRƯỚC KHI XÁC NHẬN
                      </CCol>
                      <CCol sm="12" lg="12">
                        <strong>Tên Công Ty: {company_name}</strong>
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
                      <CCol sm="12" lg="12">
                        <CButton outline color="primary" style={styles.floatRight} size="sm" onClick={async e => {
                          await this.addOrderPlugin();
                        }}>Tạo đơn hàng</CButton>
                      </CCol>
                    </CRow>
                  </CCol> : ""

                }
              </CRow>
            </div>
          </CardBody>
        </Card>

        <Modal isOpen={this.state.modalCom} >
          <ModalHeader>Danh sách phần cứng</ModalHeader>

          <ModalBody>

          </ModalBody>
          <ModalFooter>
            <CButton color="primary" onClick={e => { this.setState({ arrHardWard: this.state.arrChooseHard }); }}>Lưu</CButton>{' '}
            <CButton color="secondary" onClick={e => this.toggleModal("new")}>Close</CButton>
          </ModalFooter>
        </Modal>
      </div >

    )

  }
}

const styles = {
  pagination: {
    marginRight: '5px'
  },
  flexLabel: {
    width: '100%',
    marginTop: 6
  },
  flexOption: {
    width: '100%',
    margin: '1px'
  },
  a: {
    textDecoration: 'none'
  },
  floatRight: {
    float: 'right',
    margin: '5px'
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
    padding: 10,
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

export default PluginCreateOrder;
