import React, { Component } from 'react';
import Swal from "sweetalert2";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';
import CIcon from '@coreui/icons-react'
import {
  CBadge,
  CRow,
  CCol,
  CSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CTooltip
} from '@coreui/react'

import Pagination from '@material-ui/lab/Pagination';
import 'moment-timezone';
import Constants from "./../../../../contants/contants";
import TextFieldGroup from "../../../../views/Common/TextFieldGroup";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
class PluginCustomerManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: '',
      UserName: "",
      keyStatus: '',
      itemsCount: 0,
      modalCom: false,
      updated: '',
      dataApi: [],
      action: 'new',
      Name: '',
      Email: '',
      idDelete: '',
      Phone: '',
      dataPackage_All: [],
      Fax: '',
      Address: '',
      Website: '',
      Code: '',
      Slug: '',
      Status: '',
      orderId: '',
      modalDelete: false,
      arrPagination: [],
      indexPage: 0,
      toggleView: false,
      orderEdit: false,
      company_name: '',
      current_package: '',
      arrTotalPackage: [],
      arrDetailPackage: [],
      phone_number: '',
      current_slug: '',
      type: localStorage.getItem('type'),
      province: [],
      current_province: '',
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      isLoading: false,
      hidden: false,
      countPage:  1,
      limitPage: 10
    };
  }
  async componentDidMount() {
    if (this.state.type == "0") {
      this.getData();
    } else {
      this.getData_ByID();
    }
   
    this.getProvince();
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



   handlePageChanged = (e, page) => {
   
      this.setState({ indexPage:page});
      debugger;
      this.setState({
        indexPage:page
    },() => {
        this.getData();
    });

   };
  // onChange={(e, v) => {
                     
  //   this.setState({ indexPage: v-1});
  //   this.getData();
  // }}
  pagination(dataApi) {
    
    // debugger;
   
    // var i, j, temparray, chunk = 50;
    // var arrTotal = [];
    // for (i = 0, j = dataApi.length; i < j; i += chunk) {
    //   temparray = dataApi.slice(i, i + chunk);
    //   arrTotal.push(temparray);
    // }

    // if (arrTotal.length == 0) {
    //   this.setState({
    //     hidden: false
    //   })
    // } else {
    //   this.setState({
    //     hidden: true
    //   })
    // }

    this.setState({ 
      arrPagination: dataApi, 
      
    data: dataApi});
  }
  async getPackageData1() {
    let arrTemp = [];
    const resPackage = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_PACKAGE,
      method: 'POST',
    });

    this.setState({ dataPackage_All: resPackage.data.data });
  }
  getData = async () => {
   
    this.setState({ isLoading: true });
    const { indexPage, key, keyStatus } = this.state;
   
    const article = { title: 'Axios POST Request Example' };
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_LIST_COMPANY,
      data: {
        indexPage:indexPage , // This is the body part
        limit: 10
      },
      method: 'POST',
    });
    let val = res.data.data.dataCompany;
    let totalPage = res.data.data.total;
    let countPage = totalPage/10;
    

    this.setState({ countPage: countPage});
    this.setState({ dataApi: val, isLoading: false });

    this.pagination(val);
  }

  getData_ByID = async () => {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_LIST_COMPANY_BY_ID,
      method: 'POST',
      headers: this.state.token
    });
    let val = res.data.data;

    this.pagination(val);
    this.setState({ dataApi: val });

    this.setState({ isLoading: false });
  }

  async onView(name, com_id, phone_number, slug) {
    let data = await this.getPackageData(com_id)
    try {
      this.setState({
        toggleView: !this.state.toggleView, company_name: name, current_package: data.length == 0 ? '' : data[0].Name,
        arrDetailPackage: data.length == 0 ? [] : data[0].Array_Feature, phone_number: phone_number, current_slug: slug
      })
    } catch (error) {
      throw error;
    }
  }

  async onEDitOrder(name, com_id, phone_number, slug, orderId) {

   
    let data = await this.getPackageData(com_id)
    this.getPackageData1();
    try {
      this.setState({
        orderEdit: !this.state.orderEdit, 
        company_name: name, 
        orderId: orderId, 
        current_package: data.length == 0 ? '' : data[0].Name,
        arrDetailPackage: data.length == 0 ? [] : data[0].Array_Feature, phone_number: phone_number, current_slug: slug
      })
    } catch (error) {
      throw error;
    }
  }
  
  searchKey() {
    const { indexPage, key, keyStatus } = this.state;
    // this.setState({ key: key })

    if (key != '' || keyStatus != '') {
      let d = []
      this.state.dataApi.map(val => {
        if ( val.Name.toLocaleUpperCase().includes(key.toLocaleUpperCase())) {

          d.push(val)
        }
      })

      this.setState({ data: d })
    } else {
      this.setState({ data: this.state.arrPagination[indexPage] })
    }
  }

  openUpdate(item) {
    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      Name: item.Name,
      Email: item.Email,
      Phone: item.Phone,
      Fax: item.Fax,
      Address: item.Address == null || item.Address == undefined ? "" : item.Address.length < 1 ? item.Address + ", " + this.state.province[0].province_name : item.Address,
      Slug: item.Slug,
      Website: item.Website,
      UserName: item.UserName,
      Code: item._id,
      id: item['_id'],
      Status: item.Status,
      current_province:  item.Address == null || item.Address == undefined ? "" : item.Address.length < 1 ? this.state.province[0].province_name :
        item.Address.split(',')[item.Address.split(',').length - 1]
    })
  }
  

  async updatePackage() {
   
    const {orderId, Package_IdSelect} = this.state;
    if ( Package_IdSelect == null || Package_IdSelect == '') {
      alert("Chưa chọn thông tin gói");
    
     }
       const body = {
      _id: orderId,
      packageId: Package_IdSelect
    }
     this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.Package_updatePackage,
      method: 'POST',
      data: body
    });

    if (res.data.data == true) {
      Swal.fire({
        icon: "success",
        title: "Thay đổi gói thành công",
        showConfirmButton: false,
        timer: 700,
      });
      this.setState({ isLoading: false });
      this.getData();
      this.setState({ orderEdit: !this.state.orderEdit })
    } else {
      alert("có lỗi xảy ra");
      // this.setState({ isLoading: false });
    }
  }
  async updateCompany() {
    const { Email, Name, Phone, Fax, Address, Website, Slug, Status, current_province, UserName } = this.state

    if (
      // Email == null || Email == ''
      // || Name == null || Name == ''
      // || Phone == null || Phone == ''
      // ||
       Slug == null || Slug == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    let add = Address.split(',');
    add.splice(Address.split(',').length - 1, 1)

    const body = {
      Name: Name,
      Email: Email,
      Phone: Phone,
      Fax: Fax,
      Address: add + "," + current_province,
      Website: Website,
      Slug: Slug,
      Code: this.state.id,
      Status: Status,
      UserName: UserName,
      id: this.state.id
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_UPDATE_COMPANY,
      method: 'POST',
      data: body
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
      idDelete: item._id
    })
    this.setState({
      modalDelete: !this.state.modalDelete
    })
  }

  async delete() {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_DELETE_COMPANY,
      method: 'DELETE',
      data: {
        "id": this.state.idDelete
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

  async getPackageData(company_id) {
    let arrTemp = []
    const resPackage = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_PLUGIN_ORDER_FOR_ADMIN,
      method: 'POST',
      data: {
        company_id: company_id
      }
    });
    let val = resPackage.data.data.result;

    for (let i = 0; i < val.length; i++) {
      let data = await this.getPackageName(val[i].Package_Id);
      val[i].Name = data.Name
      val[i].Unit = data.Unit
      val[i].Value = data.Value
      arrTemp.push(val[i])
    }
    
    this.setState({ arrTotalPackage: arrTemp })
    return arrTemp;
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
    return resPackage.data.data;
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

  getBadgeStatus(status) {
    switch (status) {
      case "0": return 'danger'
      case "1": return 'success'
      default: return 'primary'
    }
  }

  getStatus(status) {
    switch (status) {
      case "0": return 'Chờ duyệt'
      case "1": return 'Đã duyệt'
      default: return 'primary'
    }
  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
      keyEmail: '',
      keyPhone: '',
      keyFax: '',
      keyAddress: '',
      keyWebsite: '',
      keyCode: '',
      keyCompany: '',
      keyDateCreate: new Date(),
      keyStatus: ''
    }, () => {
      this.searchKey();
    });
  }

  convertUnitToDate(unit) {
    switch (unit) {
      case '0': return 'Ngày'
      case '1': return 'Tháng'
      case '2': return 'Năm'
    }
  }

  CalculatorDateLeft(dateStart, dateEnd) {
    return Math.ceil(Math.abs(new Date(dateEnd) - new Date(dateStart)) / (1000 * 60 * 60 * 24))
  }

  renderDetailPackage() {
    return (
      <table ble className="table table-hover table-outline mb-0  d-sm-table">
        <thead className="thead-light">
          <tr>
            <th className="text-center">STT.</th>
            <th className="text-center">Tên dịch vụ</th>
            <th className="text-center">Đường dẫn</th>
          </tr>
        </thead>
        <tbody>
          {/* {
            this.state.data.length == 0 ?
              <td colSpan="10" hidden={false} className="text-center">Không tìm thấy dữ liệu</td> :
              <td colSpan="10" hidden={true} className="text-center">Không tìm thấy dữ liệu</td>

          } */}

          {
         
            this.state.arrDetailPackage != undefined || this.state.arrDetailPackage.length != 0 || this.state.arrDetailPackage != null ?
              this.state.arrDetailPackage.map((item, i) => {

                let packageNameText = item.Value.replace("/soida/","/");
                
                return (
                  <tr key={i}>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{item.Key}</td>
                    <td className="text-center">{packageNameText + this.state.current_slug}</td>
                  </tr>
                );
              }) : ""
          }
        </tbody>
      </table>
    )
  }

  calDateLeft(end, active) {
    return this.CalculatorDateLeft(new Date(end), new Date(active))
  }

  async getProvince() {
    const res = await axios({
      baseURL: 'https://vapi.vnappmob.com',
      url: '/api/province',
      method: 'GET',
    });

    this.setState({ province: res.data.results })
  }
  onChange(key, val) {
    this.setState({ [key]: val })
  }

  render() {
    const { data, key, action, arrPagination, type, current_province, UserName,
      arrTotalPackage,dataPackage_All, indexPage, company_name, current_package, phone_number, province,
      countPage,Package_Id
    } = this.state;

      let pageNumber = countPage;
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"> Danh sách Shop/Sale</i>
                 
                </CardHeader>
                <CardBody>
                  <table ble className="table table-hover table-outline mb-0  d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">STT.</th>
                        <th className="text-center">Tên Công Ty</th>
                        <th className="text-center">Email - SĐT</th>

                        <th className="text-center">Thông tin gói</th>
                        <th className="text-center">Ngày kích hoạt</th>
                        <th className="text-center">Ngày hết hạn</th>
                        {/* <th className="text-center">Địa chỉ</th> */}
                        <th className="text-center">Người tạo</th>
                        <th className="text-center">Ngày tạo</th>
                        {/* <th className="text-center">Trạng thái</th> */}
                        <th className="text-center">#</th>

                      </tr>
                    </thead>
                    <tbody>
                     
                      {
                      
                 
                        data != undefined ?
                          data.map((item, i) => {

                            console.log("33",item);
                           
                           let packageNamme = "";

                            let  dataOrderDetail = item.pluginOrder;
                            let endateText ="";
                            let activeDate = "";
                            let orderId = "";
                          

                            if(item.PluginOrder.length >0 )
                            {
                              dataOrderDetail = item.PluginOrder[0];
                              activeDate = new Date(dataOrderDetail.Active_Date).toLocaleDateString();
                              endateText = new Date(dataOrderDetail.End_Date).toLocaleDateString();
                              if(dataOrderDetail.Package_Id == "63958719afe196f92b9c79c1")
                              {
                                packageNamme ="Gói 3 tháng";
                              }
                              if(dataOrderDetail.Package_Id == "6395873bafe196f92b9c79ca")
                              {
                                packageNamme ="Gói 12 tháng";
                              }
                              if(dataOrderDetail.Package_Id == "610a3cf1c8412a193924bb48")
                              {
                                packageNamme ="Gói Dùng Thử 2 Tháng";
                              }
                              if(dataOrderDetail.Package_Id == "63958903afe196f92b9c79ff")
                              {
                                
                                packageNamme ="50 lượt soi/ tháng";
                              }
                              orderId = dataOrderDetail._id;

                            }
                            else 
                            {

                            }
                           
                            
                            return (
                              <tr key={i}>
                                <td className="text-center">{ ( (indexPage<1?0:(indexPage-1))*10) + i +1}</td>
                                <td className="text-center">{item.Name}</td>
                                <td className="text-center">
                                  <div>{item.Email}</div>
                                  <div>------------</div>
                                  <div>{item.Phone}</div>
                                </td>
                                <td className="text-center packageNammeWidth">{packageNamme}</td>
                                <td className="text-center">
                                  {activeDate}
                                
                                  </td>
                                <td className="text-center">
                                  {endateText }
                                
                                  </td>
                                {/* <td className="text-center">{item.Address}</td> */}
                                <td className="text-center">{item.Create_By == null ? "ADMIN" : item.Create_By.Name}</td>
                                <td className="text-center">
                                  {(new Date(item.Create_Date)).toLocaleDateString()}
                                </td>
                               
                                <td className="text-center display-flex"  >

                                  <CButton style={{ margin: 1 }} outline color="primary" size="sm" onClick={(e) => this.openUpdate(item)} >
                                    <CIcon name="cilPencil" />
                                  </CButton>{' '}
                                  {
                                    type == "0" ?
                                      <CButton style={{ margin: 1 }} outline color="danger" size="sm" onClick={(e) => { this.openDelete(item) }}>
                                        <CIcon name="cilTrash" />
                                      </CButton> : ""
                                  }
                                 
                                  <CTooltip content="Xem chi tiết đơn hàng">
                                    <CButton style={{ margin: 1 }} outline color="info" size="sm" onClick={async (e) => { await this.onView(item.Name, item._id, item.Phone, item.Slug) }}>
                                      <CIcon name="cil-magnifying-glass" />
                                    </CButton>
                                  </CTooltip>
                                  {' '}
                                  <CTooltip content="Chỉnh sửa thông tin gói">
                                    <CButton style={{ margin: 1 }} outline color="info" size="sm" onClick={async (e) => { await this.onEDitOrder(item.Name, item._id, item.Phone, item.Slug, orderId) }}>
                                    <CIcon  />
                                    </CButton>
                                  </CTooltip>
                                </td>
                              </tr>
                            );
                          }) : ""
                      }
                    </tbody>
                  </table>

                </CardBody> 
              </Card>
              <div style={{ float: 'right' }}>
                      
                <Pagination count={pageNumber} 
                color="primary"
                page={this.state.indexPage>0?this.state.indexPage:1}
                onChange={
                  
                      (e, v) => {
          
                        this.setState({ indexPage:v});
                       
                        this.setState({
                        indexPage:v
                        },() => {
                        this.getData();
                        });
                }}
               />
              </div>
            </Col>
          </Row>

          <CModal
            show={this.state.toggleView}
            onClose={() => { this.setState({ toggleView: !this.state.toggleView }) }}
            size="xl"
          >
            <CModalHeader closeButton>
              <CModalTitle>Danh sách đơn hàng của {company_name}</CModalTitle>
              <CModalTitle style={{ marginLeft: 50 }}>Số điện thoại: {phone_number}</CModalTitle>
            </CModalHeader>

            <CModalBody>
              <table ble className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">STT.</th>
                    <th className="text-center">Tên Gói</th>
                    <th className="text-center">Tính năng</th>
                    <th className="text-center">Gói</th>
                    <th className="text-center">Ngày kích hoạt</th>
                    <th className="text-center">Ngày hết hạn</th>
                    <th className="text-center">Thời gian hết hạn</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">#</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    arrTotalPackage == 0 ?
                      <td colSpan="10" hidden={false} className="text-center">Không tìm thấy dữ liệu</td> :
                      <td colSpan="10" hidden={true} className="text-center">Không tìm thấy dữ liệu</td>
                  }
                  {
                    arrTotalPackage != undefined ?
                      arrTotalPackage.map((item, i) => {
                        
                        return (
                          <tr key={i}>
                            <th className="text-center">{i + 1}</th>
                            <th className="text-center">{item.Name}</th>
                            <th className="text-center">

                              {item.Array_Feature.map((item, i) => {
                                let slugText = this.state.current_slug;
                                let textFeauter = item.Value;
                                if(slugText != "soida")
                                {
                                  textFeauter = textFeauter.replace("/soida/", "/");
                                }
                                if (i < 2) {
                                  return (
                                    <div><a href={textFeauter + this.state.current_slug} target="_blank" key={i}>{textFeauter + this.state.current_slug}</a></div>
                                  )
                                }
                              })
                              }
                              {
                                (item.Array_Feature.length - 2) <= 0 ? "" : item.Array_Feature.length - 2 + " mores..."
                              }
                            </th>
                            <th className="text-center">{`${item.Value} ${this.convertUnitToDate(item.Unit)}`}</th>
                            <th className="text-center">
                              {item.Status == "1" ? new Date(item.Active_Date).toLocaleDateString() : "-----"}
                            </th>
                            <th className="text-center">
                              {item.Status == "1" ? new Date(item.End_Date).toLocaleDateString() : "-----"}
                            </th>
                            {
                              item.Status == "1" ? <th className="text-center" style={
                                this.calDateLeft(item.End_Date, Date.now()) > 30 ? { color: 'green' } :
                                  this.calDateLeft(item.End_Date, Date.now()) < 15 ? { color: 'yellow' } : { color: 'red' }
                              }>
                                {
                                  this.calDateLeft(item.End_Date, Date.now())
                                } ngày nữa
                              </th> : <th className="text-center">-----</th>
                            }
                            <th className="text-center" >
                              <CBadge color={this.getBadgeStatus(item.Status)}>
                                {this.getStatus(item.Status)}
                              </CBadge>
                            </th>

                            <td className="text-center">
                              <CButton outline color="info" size="sm"
                                onClick={async (e) => {
                                 
                                  this.setState({
                                    arrDetailPackage: item.Array_Feature, current_package: item.Name
                                  })
                                }}>
                                <CIcon name="cil-magnifying-glass" />
                              </CButton>
                            </td>
                          </tr>
                        )
                      }) : ""
                  }
                </tbody>
              </table>
              <br />
              <CModalHeader>
                <CModalTitle>Chi tiết tính năng ({current_package})</CModalTitle>
              </CModalHeader>
              {
                this.renderDetailPackage()
              }
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => { this.setState({ toggleView: !this.state.toggleView }) }}>Đóng</CButton>
            </CModalFooter>
          </CModal>

          <Modal isOpen={this.state.modalCom} className={this.props.className}>
            <ModalHeader>{this.state.action == 'new' ? `Tạo mới` : `Cập nhật`}</ModalHeader>
            <ModalBody>
              <TextFieldGroup
                field="Email"
                label="Email"
                value={this.state.Email}
                type={"email"}
                placeholder={"Emal"}
                // error={errors.title}
                onChange={e => this.onChange("Email", e.target.value)}
              // rows="5"
              />
              <TextFieldGroup
                field="Name"
                label="Tên công ty"
                value={this.state.Name}
                placeholder={"Tên công ty"}
                // error={errors.title}
                onChange={e => this.onChange("Name", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="UserName"
                label="Tên đăng nhập"
                value={UserName}
                placeholder={"Tên đăng nhập"}
                // error={errors.title}
                onChange={e => this.onChange("UserName", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Phone"
                label="Số điện thoại"
                value={this.state.Phone}
                placeholder={"Số điện thoại"}
                onChange={e => this.onChange("Phone", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Fax"
                label="Fax"
                value={this.state.Fax}
                placeholder={"Fax"}
                // error={errors.title}
                onChange={e => this.onChange("Fax", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Address"
                label="Địa chỉ"
                value={this.state.Address}
                placeholder={"Địa chỉ"}
                // error={errors.title}
                onChange={e => this.onChange("Address", e.target.value)}
              // rows="5"
              />

              <label style={styles.flexLabel} htmlFor="tag">Tỉnh  </label>
              <CSelect onChange={async e => { this.setState({ current_province: e.target.value }) }} custom size="sm" name="selectSm" id="SelectLm">
                {
                  province.map((item, i) => {
                    if (item.province_name == current_province) {
                      return (
                        <option selected value={item.province_name}>{item.province_name}</option>
                      );
                    } else {
                      return (
                        <option value={item.province_name}>{item.province_name}</option>
                      );
                    }
                  })
                }
              </CSelect>

              <TextFieldGroup
                field="Slug"
                label="Slug"
                value={this.state.Slug}
                placeholder={"Slug"}
                // error={errors.title}
                onChange={e => this.onChange("Slug", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Website"
                label="Website"
                value={this.state.Website}
                placeholder={"Website"}
                // error={errors.title}
                onChange={e => this.onChange("Website", e.target.value)}
              // rows="5"
              />
              {
                action == 'new' ? "" : <div>
                  <label style={styles.flexLabel} htmlFor="tag">Trạng thái    </label>
                  <select style={styles.flexOption} name="Status" onChange={e => this.onChange("Status", e.target.value)}>
                    <option value={this.state.Status}>{this.state.Status == '' ? ` - - - - - - - - - - ` : this.state.Status}</option>
                    <option value={'Actived'}>Actived</option>
                    <option value={'Deactived'}>Deactived</option>
                  </select>
                </div>
              }

            </ModalBody>

            <ModalFooter>
              <CButton color="primary" onClick={e => { this.state.action === 'new' ? this.addCompany() : this.updateCompany() }} disabled={this.state.isLoading}>Lưu</CButton>{' '}
              <CButton color="secondary" onClick={e => {this.setState({ modalCom: !this.state.modalCom })}}>Đóng</CButton>
            </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.orderEdit} className={this.props.className}>
            <ModalHeader>Cập nhật sửa chữa đơn hàng</ModalHeader>
            <ModalBody>
              
             

             <div>
                    <label htmlFor="tag">Chọn gói sản phẩm:    </label>
                    <CSelect onChange={async e => {
                      this.setState({ Package_IdSelect: e.target.value });
                    }}>
                      <option value={this.state.Package_Id}>-----</option>
                      {
                        dataPackage_All.map((item, i) => {
                          console.log(item);
                          return (
                            <option value={item._id}>{`${item.Name} (${item.Value} ${this.convertUnitToDate(item.Unit)})`}</option>
                          );
                          // if (item._id == Package_Id._id) {
                          //   return (
                          //     <option selected value={item._id}>{`${item.Name} (${item.Value} ${this.convertUnitToDate(item.Unit)})`}</option>
                          //   );
                          // } else {
                          //   return (
                          //     <option value={item._id}>{`${item.Name} (${item.Value} ${this.convertUnitToDate(item.Unit)})`}</option>
                          //   );
                          // }
                        })
                      }
                    </CSelect>


                   

               </div>

             
             
            </ModalBody>

            <ModalFooter>
              <CButton color="primary" onClick={e => { this.state.action === 'new' ? this.updatePackage() : this.updateCompany() }} disabled={this.state.isLoading}>Lưu</CButton>{' '}
              <CButton color="secondary" onClick={e => {this.setState({ orderEdit: !this.state.orderEdit })}}>Đóng</CButton>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.modalDelete} toggle={e => this.setState({ modalDelete: !this.state.modalDelete })} className={this.props.className}>
            <ModalHeader toggle={e => this.setState({ modalDelete: !this.state.modalDelete })}>{`Xoá`}</ModalHeader>
            <ModalBody>
              <label htmlFor="tag">{`Xác nhận xóa !!!`}</label>
            </ModalBody>
            <ModalFooter>
              <CButton color="primary" onClick={e => this.delete()} disabled={this.state.isLoading}>Xoá</CButton>{' '}
              <CButton color="secondary" onClick={e => this.setState({ modalDelete: !this.state.modalDelete })}>Đóng</CButton>
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

export default PluginCustomerManager;
