import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Button, Input,
  ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';

import {
  CBadge,
  CRow,
  CCol,
  CSelect
} from '@coreui/react'

import 'moment-timezone';
import Constants from "./../../../contants/contants";
import axios from 'axios'
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');
class Transaction extends Component {
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
      Status: '',
      dataApi: [],
      action: 'new',
      modalDelete: false,
      delete: null,
      arrPagination: [],
      indexPage: 0,
      dataCompany: [],
      currentCompany: '',
      currentID: '',
      currenCom: '',
      currenCom_ID: '',
      currentSale_ID: '',
      curentStatus: '',
      dataOrderDetail: [],
      DATA_COMPANY: '',
      hiddenDetail: true
    };
  }
  async componentDidMount() {
    this.getData();

    let arr = JSON.parse(localStorage.getItem('url'));
    for (let i = 0; i < arr.length; i++) {
      if ("#" + arr[i].to == window.location.hash) {
        if (arr[i].hidden == true) {
          window.location.href = '#/'
        }
      }
    }
  }

  async getCompanyData() {
    const resCompany = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_COMPANY,
      method: 'POST'
    });
    this.setState({ dataCompany: resCompany.data.data });
  }

  pagination(dataApi) {
    var i, j, temparray, chunk = 5;
    var arrTotal = [];
    for (i = 0, j = dataApi.length; i < j; i += chunk) {
      temparray = dataApi.slice(i, i + chunk);
      arrTotal.push(temparray);
    }
    this.setState({ arrPagination: arrTotal, data: arrTotal[this.state.indexPage] });
  }

  getData = async () => {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_TRANSACTION,
      method: 'POST',
    });

    for (let i = 0; i < res.data.data.length; i++) {
      const resCom = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.LIST_COMPANY,
        method: 'POST',
        data: {
          condition: {
            _id: res.data.data[i].Company_Id
          }
        }
      });
      res.data.data[i].Com_Name = resCom.data.data[0].Name;
    }

    this.pagination(res.data.data);
    this.setState({ dataApi: res.data.data });

    let active = 0

    res.data.data.map(val => {
      if (val.Status == "Actived") {
        active = active + 1
      }
    })

    this.setState({ isLoading: false, totalActive: active });
  }

  getOrderDetail = async (trans_id, company_id) => {
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_CHECK_OUT,
      method: 'POST',
      data: {
        condition: {
          "isDelete": false,
          "Transaction_ID": trans_id
        }
      }
    });

    const resCom = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_COMPANY,
      method: 'POST',
      data: {
        condition: {
          _id: company_id
        }
      }
    });

    this.setState({ dataOrderDetail: res.data.data, currenCom: resCom.data.data[0].Name, currenCom_ID: company_id });
  }

  searchKey() {
    const { indexPage, key, keyStatus } = this.state;
    // this.setState({ key: key })

    if (key != '' || keyStatus != '') {
      let d = []
      this.state.dataApi.map(val => {
        if (val.Company_Id.toLocaleUpperCase().includes(key.toLocaleUpperCase()) &&
          val.Status.toLocaleUpperCase().includes(keyStatus.toLocaleUpperCase())) {

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
        Name: '',
        Email: '',
        Phone: '',
        Fax: '',
        Address: '',
        Website: '',
        Code: '',
        Status: '',
        username: '',
        password: ''
      })
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  async addCompany() {
    const { Email, Name, Phone, Fax, Address, Website, Code, UserName, Password } = this.state

    if (Email == null || Email == ''
      || Name == null || Name == ''
      || Phone == null || Phone == ''
      || Address == null || Address == ''
      || UserName == null || UserName == ''
      || Password == null || Password == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const body = {
      Name: Name,
      Email: Email,
      Phone: Phone,
      Fax: Fax,
      Address: Address,
      Website: Website,
      Code: Code
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.ADD_COMPANY,
      method: 'PUT',
      data: body
    });

    if (res.data.is_success == true) {
      this.getData();

      const bodyAddUser = {
        "Name": Name,
        "Email": Email,
        "Phone": Phone,
        "Address": Address,
        "Company_Id": res.data.data._id,
        "Role_Id": "60e6a98b39d7243f689a123c",
        "UserName": UserName,
        "Password": Password,
        "Code": res.data.data._id,
        "Status": "Actived"
      }

      await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.ADD_USER,
        method: 'POST',
        data: bodyAddUser
      });
      console.log(res.data.data)

      this.setState({ modalCom: !this.state.modalCom })
    } else {
      alert(res.data.message);
      this.setState({ isLoading: false });
    }
  }

  openUpdate(item) {

    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      id: item['_id'],
      Status: item.Status,
      DATA_COMPANY: item
    })
  }

  async addTransaction() {
    const body = {
      company_id: this.state.DATA_COMPANY.Company_Id
    }

    let result = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.ADD_TRANSACTION,
      method: 'POST',
      data: body
    });

    if (result.data.is_success != true) {
      alert("Có lỗi xảy ra khi thêm dữ liệu vào Transaction")
    }

    return result;
  }

  async updateOrder() {
    const { Status, DATA_COMPANY } = this.state

    const body = {
      Status: Status,
      id: this.state.id
    }

    let result = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.UPDATE_STATUS_ORDER,
      method: 'POST',
      data: body
    });

    if (result.data.is_success == true) {
      if (DATA_COMPANY.Status == 'SPENDING') {
        let res = await this.addTransaction();
        if (res.data.is_success) {
          this.getData();
          this.setState({ modalCom: !this.state.modalCom })
          this.setState({ isLoading: true });
        } else {
          await axios({
            baseURL: Constants.BASE_URL,
            url: Constants.UPDATE_STATUS_ORDER,
            method: 'POST',
            data: {
              Status: 'SPENDING',
              id: this.state.id
            }
          });

          this.setState({ isLoading: false });
        }
      }
    } else {
      alert(result.data.message);
      this.setState({ isLoading: false });
    }
  }

  getBadge(status) {
    switch (status) {
      case 'ENABLE': return 'primary'
      default: return 'success'
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


  render() {
    const { data, key, action, arrPagination,
      indexPage, dataOrderDetail } = this.state;
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <p style={styles.success}>{this.state.updated}</p>
              <p style={styles.danger}>{this.state.deleted}</p>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"> Danh sách giao dich (Page: {this.state.indexPage + 1})</i>
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
                          {/* <CCol sm="6" lg="2">
                            <CInput type="date" onChange={e => {
                              this.actionSearch(e, "keyDateCreate");
                            }} value={keyDateCreate} placeholder="Create Date" />
                          </CCol> */}
                          <CCol sm="12" lg="4">
                            <CSelect style={styles.flexOption} onChange={e => {

                              this.actionSearch(e, "keyStatus");

                            }} custom>
                              {
                                ['ACTIVE', 'DISABLE'].map((item, i) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  );
                                })
                              }
                            </CSelect>
                          </CCol>
                          <CCol sm="12" lg="4">
                            <Button color="primary" style={{ width: '100%', marginTop: 5 }} size="sm" onClick={e => { this.resetSearch() }}>Làm mới tìm kiếm</Button>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </div>
                </CardHeader>
                <CardBody>
                  <table ble className="table table-hover table-outline mb-0  d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">STT.</th>
                        <th className="text-center">Mã công ty</th>
                        <th className="text-center">Ngày mua</th>
                        <th className="text-center">Ngày kích hoạt</th>
                        <th className="text-center">Ngày hết hạn</th>
                        <th className="text-center">Trạng thái</th>
                        <th className="text-center">#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data != undefined ?
                          data.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td className="text-center">{i + 1}</td>
                                <td className="text-center">{item.Com_Name}</td>
                                <td className="text-center">
                                  {(new Date(item.Create_At)).toLocaleDateString() + ' ' + (new Date(item.Create_At)).toLocaleTimeString()}
                                </td>
                                <td className="text-center">
                                  {(new Date(item.Active_Date)).toLocaleDateString() + ' ' + (new Date(item.Active_Date)).toLocaleTimeString()}
                                </td>
                                <td className="text-center">
                                  {(new Date(item.End_Date)).toLocaleDateString() + ' ' + (new Date(item.End_Date)).toLocaleTimeString()}
                                </td>
                                <td className="text-center">
                                  <CBadge color={this.getBadge(item.Status)}>
                                    {item.Status}
                                  </CBadge>
                                </td>
                                <td className="text-center">
                                  {/* <Button outline color="primary" size="sm" onClick={(e) => this.openUpdate(item)} >Cập nhật</Button>{' '} */}
                                  <Button outline color="primary" size="sm" onClick={async (e) => { await this.getOrderDetail(item._id, item.Company_Id) }} >Chi tiết</Button>
                                  {/* <Button outline color="danger" size="sm" onClick={(e) => { this.openDelete(item) }}>Xoá</Button> */}
                                </td>
                              </tr>
                            );
                          }) : ""
                      }
                    </tbody>
                  </table>

                </CardBody>
                <CardFooter>
                  {
                    arrPagination.length == 1 ? "" :
                      <div style={{ float: 'right', marginRight: '10px', padding: '10px' }}>
                        <tr style={styles.row}>
                          {
                            arrPagination.map((item, i) => {
                              return (
                                <td>
                                  <Button style={styles.pagination} color={i == indexPage ? 'primary' : 'danger'} onClick={e => { this.setState({ data: arrPagination[i], indexPage: i }) }}>{i + 1}</Button>
                                </td>
                              );
                            })
                          }
                        </tr>
                      </div>
                  }
                </CardFooter>
              </Card>


              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"> Chi tiết giao dịch của {this.state.currenCom} (Mã công ty: {this.state.currenCom_ID}) (Page: {this.state.indexPage + 1})</i>
                </CardHeader>
                <CardBody>
                  <table ble className="table table-hover table-outline mb-0  d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">STT.</th>
                        <th className="text-center">Mã giao dịch</th>
                        <th className="text-center">Mã phần cứng</th>
                        <th className="text-center">Ngày kích hoạt</th>
                        <th className="text-center">Ngày hết hạn</th>
                        <th className="text-center">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dataOrderDetail != undefined ?
                          dataOrderDetail.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td className="text-center">{i + 1}</td>
                                <td className="text-center">{item.Transaction_ID}</td>
                                <td className="text-center">{item.HardWard_ID}</td>
                                <td className="text-center">
                                  {(new Date(item.Active_Date)).toLocaleDateString() + ' ' + (new Date(item.Active_Date)).toLocaleTimeString()}
                                </td>
                                <td className="text-center">
                                  {(new Date(item.End_Date)).toLocaleDateString() + ' ' + (new Date(item.End_Date)).toLocaleTimeString()}
                                </td>
                                <td className="text-center">
                                  <CBadge color={this.getBadge(item.Status)}>
                                    {item.Status}
                                  </CBadge>
                                </td>
                              </tr>
                            );
                          }) : ""
                      }
                    </tbody>
                  </table>

                </CardBody>
              </Card>

            </Col>
          </Row>

          <Modal isOpen={this.state.modalCom} className={this.props.className}>
            <ModalHeader>{this.state.action == 'new' ? `Tạo mới` : `Cập nhật`}</ModalHeader>
            <ModalBody>
              {
                action == 'new' ? "" : <div>
                  <label style={styles.flexLabel} htmlFor="tag">Trạng thái    </label>
                  <select style={styles.flexOption} name="Status" onChange={e => this.onChange("Status", e.target.value)}>
                    <option value={this.state.Status}>{this.state.Status == '' ? ` - - - - - - - - - - ` : this.state.Status}</option>
                    {
                      ['SPENDING', 'COMPLETE'].map((item, i) => {
                        return (
                          <option value={item}>{item}</option>
                        );
                      })
                    }
                  </select>
                </div>
              }

            </ModalBody>

            <ModalFooter>
              <Button color="primary" onClick={e => { this.state.action === 'new' ? this.addCompany() : this.updateOrder() }} disabled={this.state.isLoading}>Lưu</Button>{' '}
              <Button color="secondary" onClick={e => this.toggleModal("new")}>Đóng</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalDelete} toggle={e => this.setState({ modalDelete: !this.state.modalDelete, delete: null })} className={this.props.className}>
            <ModalHeader toggle={e => this.setState({ modalDelete: !this.state.modalDelete, delete: null })}>{`Xoá`}</ModalHeader>
            <ModalBody>
              <label htmlFor="tag">{`Do you want to delete user "${this.state.delete ? this.state.delete.Email : ''}" ?`}</label>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={e => this.delete()} disabled={this.state.isLoading}>Xoá</Button>{' '}
              <Button color="secondary" onClick={e => this.setState({ modalDelete: !this.state.modalDelete, delete: null })}>Đóng</Button>
            </ModalFooter>
          </Modal>
        </div >
      );
    }
    return (
      <div id="page-loading">
        <div className="three-balls">
          <div className="ball ball1"></div>
          <div className="ball ball2"></div>
          <div className="ball ball3"></div>
        </div>
      </div>
    );
  }
}

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
}

export default Transaction;
