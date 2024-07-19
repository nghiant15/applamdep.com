import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Button, Input,
  ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';

import {
  CBadge,
  CRow,
  CCol,
  CSelect,
} from '@coreui/react'

import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import Constants from "./../../../contants/contants";
import axios from 'axios'
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');
class PackageSale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: '',
      keyName: '',
      keyActive: '',
      keyEnd: '',
      keyStatus: '',
      keyCode: '',
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
      Name: "",
      Active_Date: new Date(),
      End_Date: new Date(),
      Status: "",
      modalDelete: false,
      delete: null,
      dataCompany: [],
      currentCompany: '',
      arrPagination: [],
      indexPage: 0,
      role: localStorage.getItem('role'),
      company_id: localStorage.getItem('user'),
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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

  getBadge(status) {
    switch (status) {
      case 'ENABLE': return 'success'
      case 'DISABLE': return 'secondary'
      default: return 'primary'
    }
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
      url: Constants.LIST_HARDWARE_CHECKOUT,
      method: 'POST',
      headers: this.state.token
    });

    this.pagination(res.data.data);
    this.setState({ dataApi: res.data.data });

    let active = 0

    this.setState({ isLoading: false, totalActive: active });
  }

  searchKey() {
    const { key, keyStatus } = this.state;

    if (key != '' || keyStatus != '') {
      let d = []
      this.state.dataApi.map(val => {
        if ((val.Transaction_ID.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.HardWard_ID.toLocaleUpperCase().includes(key.toLocaleUpperCase())) &&
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

      this.setState({ data: this.state.dataApi, totalActive: active })
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
    this.setState({
      keyName: '',
      keyActive: new Date(),
      keyEnd: new Date(),
      keyStatus: '',
      keyCode: ''
    }, () => {
      this.searchKey();
    });
  }

  async toggleModal(key) {
    if (key == 'new') {
      this.setState({
        modalCom: !this.state.modalCom,
        action: key,
        Name: "",
        Active_Date: new Date(),
        End_Date: new Date()
      })
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  async addPackageSale() {

  }

  async openUpdate(item) {
    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      id: item['_id'],
      Status: item.Status
    })
  }

  async updateStatus() {
    const { Status } = this.state

    const body = {
      id: this.state.id,
      Status: Status
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.UPDATE_STATUS_CHECKOUT,
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
      modalDelete: !this.state.modalDelete,
      delete: item
    })
  }

  async delete() {

  }

  getUsers(page = 1) {
    const limit = this.state.limit;
    const key = this.state.key || '';
    const fetchData = {
      method: 'GET',
      headers: headers
    };
    fetch(global.BASE_URL + '/admin/users?key=' + key + '&page=' + page + '&limit=' + limit, fetchData).then(users => {
      users.json().then(result => {
        this.setState({
          data: result.data,
          itemsCount: result.total,
          activePage: page,
          totalActive: result.totalActive,
          updated: '',
        });
      })
    }).catch(console.log);
  }
  async handlePageChange(pageNumber) {
    this.getUsers(pageNumber);
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

  render() {
    const { data, key, action, arrPagination, indexPage } = this.state;
    if (!this.state.isLoading) {
      return (
        <div>
          <Card>
            <CardHeader>
              Danh sách phần cứng chủ quản (Page: {this.state.indexPage + 1})
              <div style={styles.tags}>
                <CRow>
                  <CCol sm="6" lg="12">
                    <CRow>
                      <CCol sm="6" lg="4">
                        <div>
                          <Input style={styles.searchInput} onChange={(e) => {
                            this.actionSearch(e, "key");
                          }} name="key" value={key} placeholder="Từ khóa" />
                        </div>
                      </CCol>

                      <CCol sm="6" lg="4">
                        <CSelect style={styles.flexOption} onChange={e => {

                          this.actionSearch(e, "keyStatus");

                        }} custom>
                          {
                            ['ENABLE', 'DISABLE'].map((item, i) => {
                              return (
                                <option value={item}>{item}</option>
                              );
                            })
                          }
                        </CSelect>
                      </CCol>
                      <CCol sm="6" lg="4">
                        <Button color="primary" style={{ width: '100%', marginTop: 5 }} size="sm" onClick={e => { this.resetSearch() }}>Làm mới tìm kiếm</Button>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </div>
            </CardHeader>
            <CardBody>
              <table className="table table-hover table-outline mb-0  d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">STT.</th>
                    <th className="text-center">Mã giao dịch</th>
                    <th className="text-center">Mã phần cứng</th>
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
                            <td className="text-center">
                              <Button outline color="primary" size="sm" onClick={(e) => this.openUpdate(item)} >Cập nhật</Button>
                            </td>
                          </tr>
                        );
                      }) : ""
                  }
                </tbody>
              </table>
            </CardBody>
          </Card>
          {
            arrPagination.length == 1 ? "" :
              <div style={{ float: 'right', marginRight: '10px', padding: '10px' }}>
                <tr style={styles.row}>
                  {
                    arrPagination.map((item, i) => {
                      return (
                        <td>
                          <Button style={{ marginRight: '5px' }} color={i == indexPage ? 'primary' : 'danger'} onClick={e => { this.setState({ data: arrPagination[i], indexPage: i }) }}>{i + 1}</Button>{' '}
                        </td>
                      );
                    })
                  }
                </tr>
              </div>
          }



          <Modal isOpen={this.state.modalCom} className={this.props.className}>
            <ModalHeader>{this.state.action == 'new' ? `Tạo mới` : `Cập nhật`}</ModalHeader>
            <ModalBody>
              {
                action == 'new' ? "" : <div>
                  <label style={styles.flexLabel} htmlFor="tag">Trạng thái:</label>
                  <select style={styles.flexOption} name="Status" onChange={e => this.onChange("Status", e.target.value)}>
                    <option value={this.state.Status}>{this.state.Status == '' ? ` - - - - - - - - - - ` : this.state.Status}</option>
                    {
                      ['ENABLE', 'DISABLE'].map((item, i) => {
                        if (item == this.state.Status) {
                          return (
                            <option selected value={item}>{item}</option>
                          );
                        } else {
                          return (
                            <option value={item}>{item}</option>
                          );
                        }
                      })
                    }
                  </select>
                </div>
              }
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={e => { this.state.action === 'new' ? this.addPackageSale() : this.updateStatus() }} disabled={this.state.isLoading}>Lưu</Button>{' '}
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
        </div>
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
  datePicker: {
    marginBottom: 20
  },
  flexLabel: {
    width: 100
  },
  flexOption: {
    width: 200,
    margin: '1px'
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
  wa10: {
    width: "5%",
    float: "left",
    height: "80px"
  },
  wh16: {
    width: "17%",
    float: "left",
    height: "80px"
  },
  wh15: {
    width: "20%",
    float: "left",
    height: "80px"
  },
  w5: {
    width: "20%",
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
    width: "200px",
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

export default PackageSale;
