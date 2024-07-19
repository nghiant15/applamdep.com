import React, { Component } from 'react';

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
  CButton,
  CFormGroup, CInputCheckbox, CLabel
} from '@coreui/react'

import Pagination from '@material-ui/lab/Pagination';
import 'moment-timezone';
import Constants from "./../../../../contants/contants";
import TextFieldGroup from "../../../../views/Common/TextFieldGroup";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import API_CONNECT from "../../../../functions/callAPI";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: '',
      keyRole: '',
      keyStatus: '',
      modalCom: false,
      dataApi: [],
      action: 'new',
      Name: '',
      Email: '',
      Phone: '',
      Address: '',
      Company_Id: '',
      UserName: '',
      Password: '',
      Status: '',
      modalDelete: false,
      modalRole: false,
      arrPagination: [],
      indexPage: 0,
      dataCompany: [],
      dataRole: [],
      isLoading: false,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      userData: localStorage.getItem('user'),
      hidden: false,
      arrRoleSubAdmin: [],
      idChangeRole: ""
    };
  }
  async componentDidMount() {
    this.getData();
    this.getAllRole();
    let arr = JSON.parse(localStorage.getItem('url'));

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url == window.location.hash) {
        if (arr[i].isHidden == true) {
          window.location.href = '#/'
        }
      }
    }
  }

  async getAllRole() {
    const resRole = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_LIST_ROLE,
      method: 'POST',
      headers: this.state.token
    });
    this.setState({ dataRole: resRole.data.data });
  }

  pagination(dataApi) {
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

    this.setState({ arrPagination: arrTotal, data: arrTotal[this.state.indexPage] });
  }

  getData = async () => {
    const { userData } = this.state;
    this.setState({ isLoading: true });
    const res = await API_CONNECT(Constants.PLUGIN_SUBSALE_USER, {
      company_id: JSON.parse(userData).company_id
    }, this.state.token, "POST")

    let val = res.data;
    this.pagination(val);
    this.setState({ dataApi: val });

    let active = 0

    val.map(val => {
      if (val.Status == "Actived") {
        active = active + 1
      }
    })

    this.setState({ isLoading: false, totalActive: active });
  }

  searchKey() {
    const { indexPage, key, keyStatus, keyRole } = this.state;
    // this.setState({ key: key })

    if (key != '' || keyStatus != '' || keyRole != '') {
      let d = []
      this.state.dataApi.map(val => {
        if ((val.Email.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.Name.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.Phone.toLocaleUpperCase().includes(key.toLocaleUpperCase())) &&
          val.Status.toLocaleUpperCase().includes(keyStatus.toLocaleUpperCase()) &&
          val.Role_Id.toLocaleUpperCase().includes(keyRole.toLocaleUpperCase())) {

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

  toggleModal(key) {
    if (key == 'new') {
      this.setState({
        modalCom: !this.state.modalCom,
        action: key,
        Name: '',
        Email: '',
        Phone: '',
        Address: '',
        UserName: '',
        Password: ''
      })
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  async addUsers() {
    const { Email, Name, Phone, Address, UserName, Password, userData } = this.state

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
      Address: Address,
      UserName: UserName,
      Password: Password,
      Company_Id: JSON.parse(userData).company_id,
      isSale: true
    }

    this.setState({ isLoading: true });

    const res = await API_CONNECT(Constants.PLUGIN_ADD_SUBSALE, body, "", "POST")

    if (res.is_success == true) {
      this.getData();
      this.setState({ modalCom: !this.state.modalCom })
    } else {
      alert(res.message);
      this.setState({ isLoading: false });
    }
  }

  openUpdate(item) {

    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      Name: item.Name,
      Email: item.Email,
      Phone: item.Phone,
      Address: item.Address,
      UserName: item.UserName,
      Password: item.Password,
      id: item['_id'],
      Status: item.Status
    })
  }

  async updateUsers() {
    const { Email, Name, Phone, Address, Status, UserName, Password } = this.state

    if (Email == null || Email == ''
      || Name == null || Name == ''
      || Phone == null || Phone == ''
      || Address == null || Address == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const body = {
      Name: Name,
      Email: Email,
      Phone: Phone,
      Address: Address,
      UserName: UserName,
      Password: Password,
      Status: Status,
      id: this.state.id
    }

    this.setState({ isLoading: true });
    const res = await API_CONNECT(Constants.PLUGIN_UPDATE_USER, body, "", "POST")

    if (res.is_success == true) {
      this.getData();
      this.setState({ modalCom: !this.state.modalCom })
    } else {
      alert(res.message);
      this.setState({ isLoading: false });
    }
  }

  openDelete = (item) => {
    console.log(item)
    this.setState({
      modalDelete: !this.state.modalDelete,
      delete: item
    })
  }

  async delete() {
    this.setState({ isLoading: true });
    console.log(this.state.delete['_id'])
    const res = await API_CONNECT(Constants.PLUGIN_DELETE_USER, {
      "id": this.state.delete['_id']
    }, "", "POST")

    if (res.is_success == true) {
      this.getData();
      this.setState({ modalDelete: !this.state.modalDelete, delete: null })
    } else {
      alert(res.message);
      this.setState({ isLoading: false });
    }

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

  getLableRole(type) {
    switch (type) {
      case '0': return 'Quản lý soi da'
      case '1': return 'Quản lý trang điểm và tóc'
      case '2': return 'Quản lý khách hàng'
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

  async onChangeRole(item) {
    let body = {
      "user_id": item._id,
    }
    const res = await API_CONNECT(Constants.GET_ROLE_SUBADMIN, body, "", "POST")
    this.setState({ modalRole: !this.state.modalRole, arrRoleSubAdmin: res.data.sidebar_id, idChangeRole: item._id })
  }

  async onSaveRole() {
    const { arrRoleSubAdmin, idChangeRole } = this.state;
    let body = {
      "user_id": idChangeRole,
      "sidebar": arrRoleSubAdmin
    }

    const res = await API_CONNECT(Constants.ADD_ROLE_SUBADMIN, body, "", "POST")
    if (res.is_success == true) {
      this.getData();
      this.setState({ modalRole: !this.state.modalRole, arrRoleSubAdmin: [] })
    } else {
      alert(res.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { data, key, action, arrPagination, arrRoleSubAdmin } = this.state;
    const { classes } = this.props;
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <p style={styles.success}>{this.state.updated}</p>
              <p style={styles.danger}>{this.state.deleted}</p>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify">Quản lý tài khoản hệ thống</i>
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
                                ["Actived", 'Deactived', 'Locked'].map((item, i) => {
                                  return (
                                    <option value={item}>{item}</option>
                                  );
                                })
                              }
                            </CSelect>
                          </CCol>
                          <CCol sm="12" lg="4">
                            <CButton color="primary" style={{ width: '100%', marginTop: 5 }} size="sm" onClick={e => { this.resetSearch() }}>Làm mới tìm kiếm</CButton>
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol sm="12" lg="12">
                        <CButton outline color="primary" style={styles.floatRight} size="sm" onClick={e => this.toggleModal("new")}>Thêm mới tài khoản Sale</CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CardHeader>
                <CardBody>
                  <table ble className="table table-hover table-outline mb-0  d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">STT.</th>
                        <th className="text-center">Tên Sale</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Số điện thoại</th>
                        <th className="text-center">Địa chỉ</th>
                        <th className="text-center">Trạng thái</th>
                        <th className="text-center">#</th>

                      </tr>
                    </thead>
                    <tbody>
                      <td colSpan="9" hidden={this.state.hidden} className="text-center">Không tìm thấy dữ liệu</td>
                      {
                        data != undefined ?
                          data.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td className="text-center">{i + 1}</td>
                                <td className="text-center">{item.Name}</td>
                                <td className="text-center">{item.Email}</td>
                                <td className="text-center">{item.Phone}</td>
                                <td className="text-center">{item.Address}</td>
                                <td className="text-center">
                                  <CBadge color={this.getBadge(item.Status)}>
                                    {item.Status}
                                  </CBadge>
                                </td>
                                <td className="text-center">
                                  <CButton outline color="primary" size="sm" onClick={(e) => this.openUpdate(item)} >Cập nhật</CButton>{' '}
                                  <CButton outline color="danger" size="sm" onClick={(e) => { this.openDelete(item) }}>Xoá</CButton>{' '}
                                  <CButton outline color="success" size="sm" onClick={(e) => { this.onChangeRole(item) }}>Quyền</CButton>
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
                <Pagination count={arrPagination.length} color="primary" onChange={(e, v) => {
                  this.setState({ data: arrPagination[v - 1], indexPage: v - 1 })
                }} />
              </div>
            </Col>
          </Row>

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
                label="Tên Sale"
                value={this.state.Name}
                placeholder={"Tên Sale"}
                // error={errors.title}
                onChange={e => this.onChange("Name", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="UserName"
                label="Tên đăng nhập"
                value={this.state.UserName}
                placeholder={"Tên đăng nhập"}
                // error={errors.title}
                onChange={e => this.onChange("UserName", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Password"
                label="Mật khẩu"
                type={"password"}
                value={this.state.Password}
                placeholder={"Mật khẩu"}
                // error={errors.title}
                onChange={e => this.onChange("Password", e.target.value)}
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
                field="Address"
                label="Địa chỉ"
                value={this.state.Address}
                placeholder={"Địa chỉ"}
                // error={errors.title}
                onChange={e => this.onChange("Address", e.target.value)}
              // rows="5"
              />

              {
                action == 'new' ? "" : <div>
                  <label style={styles.flexLabel} htmlFor="tag">Trạng thái:    </label>
                  <select style={styles.flexOption} name="Status" onChange={e => this.onChange("Status", e.target.value)}>
                    <option value={this.state.Status}>{this.state.Status == '' ? ` - - - - - - - - - - ` : this.state.Status}</option>
                    <option value={'Actived'}>Actived</option>
                    <option value={'Locked'}>Locked</option>
                    <option value={'Deactived'}>Deactived</option>
                  </select>
                </div>
              }

            </ModalBody>

            <ModalFooter>
              <CButton color="primary" onClick={e => { this.state.action === 'new' ? this.addUsers() : this.updateUsers() }} disabled={this.state.isLoading}>Lưu</CButton>{' '}
              <CButton color="secondary" onClick={e => this.toggleModal("new")}>Đóng</CButton>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.modalRole} toggle={e => this.setState({ modalRole: !this.state.modalRole })} className={this.props.className}>
            <ModalHeader toggle={e => this.setState({ modalRole: !this.state.modalRole })}>{`Phân quyền`}</ModalHeader>
            <ModalBody>
              {
                ['0', '1', '2'].map((item, i) => {
                  return (
                    <CFormGroup variant="checkbox" className="checkbox">
                      <CInputCheckbox
                        id={item}
                        defaultChecked={arrRoleSubAdmin.includes(item) == true ? true : false}
                        name={item}
                        value={item}
                        onChange={(e) => {
                          if(e.target.checked == true) {
                            arrRoleSubAdmin.push(item);
                            this.setState({ arrRoleSubAdmin: arrRoleSubAdmin })
                          } else {
                            const index = (indx) => indx == item;
                            var currentIndex = arrRoleSubAdmin.findIndex(index)
                            arrRoleSubAdmin.splice(currentIndex, 1);
                            this.setState({ arrRoleSubAdmin: arrRoleSubAdmin })
                          }
                        }}
                      />
                      <CLabel variant="checkbox" className="form-check-label" htmlFor={item}>{this.getLableRole(item)}</CLabel>
                    </CFormGroup>
                  );
                })
              }
            </ModalBody>
            <ModalFooter>
              <CButton color="primary" onClick={e => { this.onSaveRole() }}>Lưu</CButton>{' '}
              <CButton color="secondary" onClick={e => this.setState({ modalRole: !this.state.modalRole })}>Đóng</CButton>
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
}

export default User;
