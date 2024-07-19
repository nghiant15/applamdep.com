import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Button, Input,
  ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';

import {
  CSelect,
  CRow,
  CCol,
  CBadge
} from '@coreui/react'

import { connect } from 'react-redux';
import {
  onSaveID,
  onSaveSeed
} from '../../../redux/data/actions'
import 'moment-timezone';
import Constants from "./../../../contants/contants";
import TextFieldGroup from "../../../views/Common/TextFieldGroup";
import axios from 'axios'
import ReactLoading from 'react-loading';

let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: '',
      keyName: '',
      keyEmail: '',
      keyPhone: '',
      keyGender: '',
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
      Email: '',
      Address: '',
      Name: '',
      Phone: '',
      Gender: 'Nam',
      Company_Id: '',
      Role_Id: '',
      UserName: '',
      Password: '',
      Sale_Id: '',
      Code: '',
      Status: '',
      modalDelete: false,
      delete: null,
      dataCompany: [],
      currentCompany: '',
      dataSale: [],
      currentSale: '',
      dataRole: [],
      currentRole: '',
      arrPagination: [],
      indexPage: 0,
      arrPagination_All: [],
      indexPage_All: 0,
      role: localStorage.getItem('role'),
      company_id: localStorage.getItem('user'),
      see_detail: true,
      month: 0,
      arrTemp: [],
      arrMonth: [
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
      ],
      arrMonthWithDefault: [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
      ],
      isLoading: true,
      hidden: false,
      nameSale: '',
      dataAll: [],
      hidden_all: false,
      isSale: false,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      arrAllUser: []
    };
  }
  async componentDidMount() {
    this.getAllData();
    let arr = JSON.parse(localStorage.getItem('url'));
    for (let i = 0; i < arr.length; i++) {
      if ("#" + arr[i].to == window.location.hash) {
        if (arr[i].hidden == true) {
          window.location.href = '#/'
        }
      }
    }
  }

  async getSeeder() {
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.GET_SEEDER,
      method: 'POST',
      data: {
        "email": "ktpm489@gmail.com"
      }
    })
    this.props.onSaveSeed(res.data.data);
    this.props.history.push('/history')
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

  pagination_all(dataApi) {
    var i, j, temparray, chunk = 5;
    let arrTotal = [];
    for (i = 0, j = dataApi.length; i < j; i += chunk) {
      temparray = dataApi.slice(i, i + chunk);
      arrTotal.push(temparray);
    }
    if (arrTotal.length == 0) {
      this.setState({
        hidden_all: false
      })
    } else {
      this.setState({
        hidden_all: true
      })
    }
    this.setState({ arrPagination_All: arrTotal, dataAll: arrTotal[this.state.indexPage_All] });
  }

  getUserSale = async (sale_id) => {
    const { company_id } = this.state;
    this.setState({ isLoading: true });
    var id = JSON.parse(company_id);

    var bodyCustomer = {
      condition: {
        Company_Id: id.company_id,
        Sale_Id: sale_id
      }
    }

    var res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_CUSTOMER,
      method: 'POST',
      data: bodyCustomer,
      headers: this.state.token
    })

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

  countType(arr, phone) {
    const count = arr.filter(data => data.Phone == phone);
    return count.length;
  }

  getAllData = async () => {
    const { company_id } = this.state;
    this.setState({ isLoading: true });

    var resAll = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_CUSTOMER,
      method: 'POST',
      headers: this.state.token
    })

    let arrCount_All_User = [];

    // this.getSaleDataOfUser()

    for (let i = 0; i < resAll.data.data.length; i++) {
      //check if exits in arr
      //if (!arrCount_All_User.some(item => resAll.data.data[i].Name == item.Name)) {
      var data = await this.getSaleDataOfUser(resAll.data.data[i].Sale_Id);
      resAll.data.data[i].Address = data.Address;
      resAll.data.data[i].NameSale = data.Name;
      arrCount_All_User.push(resAll.data.data[i])
      //}
    }
    // console.log(arrCount_All_User)
    if (arrCount_All_User.length == 0) {
      this.setState({
        hidden_all: false
      })
    } else {
      this.setState({
        hidden_all: true
      })
    }

    this.setState({ dataApi: arrCount_All_User });

    this.pagination_all(arrCount_All_User);
    this.setState({ isLoading: false });
  }

  getData = async () => {
    const { company_id, role } = this.state;
    this.setState({ isLoading: true });
    var id = JSON.parse(company_id);

    var bodyUser = {
      company_id: id.company_id
    }

    var bodyCustomer = {
      condition: {
        Company_Id: id.company_id,
        Sale_Id: id.sale_id
      }
    }
    if (role == 'ADMIN' || role == 'ADMINSALE') {
      var res = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.GET_SHOP,
        method: 'POST',
        headers: this.state.token
      });

    } else if (role == 'SHOPMANAGER') {
      var res = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.GET_SALE,
        method: 'POST',
        data: bodyUser,
        headers: this.state.token
      });

    } else if (role == 'SALES') {
      var res = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.LIST_CUSTOMER,
        method: 'POST',
        data: bodyCustomer,
        headers: this.state.token
      })
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

  async getSaleDataOfUser(sale_id) {
    let res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.DATA_SALE,
      method: 'POST',
      data: {
        sale_id: sale_id
      }
    });
    console.log(res.data.data[0])
    return { Address: res.data.data[0].Address, Name: res.data.data[0].Name } ;

  }

  async getRoleData(id) {
    const resRole = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_ROLE,
      method: 'GET',
      headers: this.state.token
    });

    if (id != '' || id != undefined) {
      const currentRole = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.LIST_ROLE_WITH_ID + id,
        method: 'GET',
        headers: this.state.token
      });
      if (currentRole.data.data != null || currentRole.data.data != undefined) {
        this.setState({ currentRole: currentRole.data.data.Name });
      }
    }
    this.setState({ dataRole: resRole.data.data });
  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async getDataUser_ForSale(month) {
    const { role } = this.state;
    if (role == 'SALES') {
      this.setState({ isSale: true, month: month })
      await this.tableUserSale_forSale(month);
    }
  }

  async check(e) {
    if (e.target.value == "00") {
      this.getData();
      this.setState({ isSale: false })
    } else {
      await this.getDataUser_ForSale(e.target.value);
      this.setState({ month: e.target.value })
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

  searchKey() {
    const { indexPage_All, key, keyStatus } = this.state;

    if (key != '' || keyStatus != '') {
      let d = []
      this.state.dataApi.map(val => {
        if ((val.Name.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.Email.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.Phone.toLocaleUpperCase().includes(key.toLocaleUpperCase())) &&
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

      this.setState({ dataAll: d, totalActive: active })
    } else {
      let active = 0

      this.state.dataApi.map(val => {
        if (val.Status == "Actived") {
          active = active + 1
        }
      })

      this.setState({ dataAll: this.state.arrPagination_All[indexPage_All], totalActive: active })
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
      keyEmail: '',
      keyPhone: '',
      keyGender: '',
      keyStatus: ''
    }, () => {
      this.searchKey();
    });
  }

  render() {
    const { key, dataCompany, dataAll, arrPagination_All, indexPage_All,
      currentCompany, action, dataRole, currentRole, hidden_all } = this.state;

    if (!this.state.isLoading) {
      return (
        <div>
          <Card>
            <CardHeader>

              Danh sách Shop/Sale ( Page: {this.state.indexPage + 1} )

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
                            ['Actived', 'Deactived', 'Locked'].map((item, i) => {
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
                  <CCol sm="6" lg="12">
                    {/* <Button outline color="primary" style={styles.floatRight} size="sm" onClick={e => this.toggleModal("new")}>Thêm mới</Button> */}
                  </CCol>
                </CRow>
              </div>
            </CardHeader>
            <CardBody>
              {
                <table className="table table-hover table-outline mb-0  d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">STT.</th>
                      <th className="text-center">Tên</th>
                      <th className="text-center">Tên Sale</th>
                      <th className="text-center">Địa chỉ shop</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Số điện thoại</th>
                      <th className="text-center">Giới tính</th>
                      <th className="text-center">Trạng thái</th>
                      <th className="text-center">Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td colSpan="8" hidden={hidden_all} className="text-center">Không tìm thấy dữ liệu</td>
                    {
                      dataAll != undefined ?
                        dataAll.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td className="text-center">{item.Name}</td>
                              <td className="text-center">{item.NameSale}</td>
                              <td className="text-center">{item.Address}</td>
                              <td className="text-center">{item.Email}</td>
                              <td className="text-center">{item.Phone}</td>
                              <td className="text-center">{item.Gender}</td>
                              <td className="text-center">
                                <CBadge color={this.getBadge(item.Status)}>
                                  {item.Status}
                                </CBadge>
                              </td>
                              <td className="text-center">
                                {(new Date(item.Create_Date)).toLocaleDateString() + ' ' + (new Date(item.Create_Date)).toLocaleTimeString()}
                              </td>
                            </tr>
                          );
                        }) : ""
                    }
                  </tbody>
                </table>
              }
            </CardBody>
          </Card>
          {
            arrPagination_All.length == 1 ? "" :
              <div style={{ float: 'right', marginRight: '10px', padding: '10px' }}>
                <tr style={styles.row}>
                  {
                    arrPagination_All.map((item, i) => {
                      return (
                        <td>
                          <Button style={styles.pagination} color={i == indexPage_All ? 'primary' : 'danger'} onClick={e => { this.setState({ dataAll: arrPagination_All[i], indexPage_All: i }) }}>{i + 1}</Button>
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
              <TextFieldGroup
                field="Email"
                label="Email"
                value={this.state.Email}
                placeholder={"Email"}
                type={'email'}
                onChange={e => this.onChange("Email", e.target.value)}
              // rows="5"
              />
              <TextFieldGroup
                field="Address"
                label="Address"
                value={this.state.Address}
                placeholder={"Email"}
                type={'email'}
                onChange={e => this.onChange("Address", e.target.value)}
              // rows="5"
              />
              <TextFieldGroup
                field="Name"
                label="Name"
                value={this.state.Name}
                placeholder={"Name"}
                // error={errors.title}
                onChange={e => this.onChange("Name", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Password"
                label="Password"
                value={this.state.Password}
                type={"password"}
                placeholder={"Password"}
                readOnly={action == 'new' ? false : true}
                onChange={e => this.onChange("Password", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Code"
                label="Code"
                placeholder={"Code"}
                value={this.state.Code}
                // error={errors.title}
                onChange={e => this.onChange("Code", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="UserName"
                label="UserName"
                placeholder={"Username"}
                value={this.state.UserName}
                // error={errors.title}
                onChange={e => this.onChange("UserName", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Phone"
                label="Phone"
                value={this.state.Phone}
                placeholder={"Phone"}
                // error={errors.title}
                onChange={e => this.onChange("Phone", e.target.value)}
              // rows="5"
              />

              <div>
                <label style={styles.flexLabel} htmlFor="tag">Gender:    </label>
                <select style={styles.flexOption} name="Gender" onChange={e => this.onChange("Gender", e.target.value)}>
                  <option value={this.state.Gender}>{this.state.Gender == '' ? ` - - - - - - - - - - ` : this.state.Gender}</option>
                  <option value={'Nam'}>Nam</option>
                  <option value={'Nữ'}>Nữ</option>
                </select>
              </div>

              <div>
                <label style={styles.flexLabel} htmlFor="tag">Company:    </label>
                <select style={styles.flexOption} name="Company_Id" onChange={e => this.onChange("Company_Id", e.target.value)}>
                  <option value={this.state.Company_Id}>-----</option>
                  {
                    dataCompany.map((item, i) => {
                      if (item.Name == currentCompany) {
                        return (
                          <option selected value={item._id}>{item.Name}</option>
                        );
                      } else {
                        return (
                          <option value={item._id}>{item.Name}</option>
                        );
                      }
                    })
                  }
                </select>
              </div>

              <div>
                <label style={styles.flexLabel} htmlFor="tag">Role:    </label>
                <select style={styles.flexOption} name="Role_Id" onChange={e => this.onChange("Role_Id", e.target.value)}>
                  <option value={this.state.Role_Id}>-----</option>
                  {
                    dataRole.map((item, i) => {
                      if (item.Name == currentRole) {
                        return (
                          <option selected value={item._id}>{item.Name}</option>
                        );
                      } else {
                        return (
                          <option value={item._id}>{item.Name}</option>
                        );
                      }
                    })
                  }
                </select>
              </div>

              {/* <div>
                <label style={styles.flexLabel} htmlFor="tag">Sale:    </label>
                <select style={styles.flexOption} name="Sale_Id" onChange={e => this.onChange("Sale_Id", e.target.value)}>
                  <option value={this.state.Sale_Id}>-----</option>
                  {
                    dataSale.map((item, i) => {
                      if (item.Name == currentSale) {
                        return (
                          <option selected value={item._id}>{item.Name}</option>
                        );
                      } else {
                        return (
                          <option value={item._id}>{item.Name}</option>
                        );
                      }
                    })
                  }
                </select>
              </div> */}
            </ModalBody>
            <ModalFooter>

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
      <div className="d-flex justify-content-center">
        <ReactLoading type={"balls"} color={"orange"} height={'5%'} width={'5%'} />
      </div>
    );
  }
}

const styles = {
  wa10: {
    width: "5%",
    float: "left",
    height: "60px"
  },
  sale_times: {
    width: "8%",
    float: "left",
    height: "60px",
    textAlign: 'center'
  },
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
  wh12: {
    width: "11%",
    float: "left",
    height: "60px",
    textAlign: 'center'
  },
  ws12: {
    width: "13%",
    float: "left",
    height: "60px",
    textAlign: 'center'
  },
  wh15: {
    width: "15%",
    float: "left",
    height: "60px",
    textAlign: 'center'
  },
  w5: {
    width: "22%",
    float: "left",
    height: "60px"
  },
  w5_10: {
    width: "5%",
    float: "left",
    height: "60px"
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

const mapStateToProps = state => {
  return {
    data: state.getData_AllAPI
  }
}


export default connect(mapStateToProps, { onSaveID, onSaveSeed })(Users);

