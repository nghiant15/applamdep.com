import React, { Component } from 'react';
import CIcon from '@coreui/icons-react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';

import {
  CButton,
  CTextarea
} from '@coreui/react'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import 'moment-timezone';
import Constants from "../../../../contants/contants";
import TextFieldGroup from "../../../Common/TextFieldGroup";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));
class TypeRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: '',
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
      hidden: false,
      action: 'new',
      Value: '',
      Description: '',
      Status: '',
      modalDelete: false,
      delete: null,
      arrPagination: [],
      indexPage: 0,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      isLoading: false,
      type: localStorage.getItem('type'),
      isError: false
    };
  }
  componentWillMount(){
    if(this.state.type == '0' || this.state.type == '1'){
      this.setState({ isError: false })
    } else {
      this.setState({ isError: true })
      //window.history.back();
    }
  }
  async componentDidMount() {
    if(this.state.type == '0' || this.state.type == '1'){
      this.getData()
    } else {
      console.log(this.state.isError)
      //window.history.back();
    }
    //this.getData()

    let arr = JSON.parse(localStorage.getItem('url'));

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url == window.location.hash) {
        if (arr[i].isHidden == true) {
          window.location.href = '#/'
        }
      }
    }
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
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.TYPE_REQUEST_LIST,
      method: 'POST'
    });

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

  searchKey(key) {
    this.setState({ key: key })

    if (key != '') {
      let d = []
      this.state.dataApi.map(val => {
        if ((val.Vale.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.Description.toLocaleUpperCase().includes(key.toLocaleUpperCase()))) {
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

  async toggleModal(key) {
    if (key == 'new') {
      this.setState({
        modalCom: !this.state.modalCom,
        action: key,
        Value: '',
        Description: ''
      })
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  async addRoles() {
    const { Value, Description } = this.state

    if (Value == null || Value == '' ||
      Description == null || Description == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const body = {
      Value: Value,
      Description: Description
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.TYPE_REQUEST_ADD,
      method: 'PUT',
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

  async openUpdate(item) {
    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      Value: item.Value,
      Description: item.Description,
      id: item['_id'],
      Status: item.Status
    })
  }

  async updateUser() {
    const { Value, Description, Status } = this.state
    if (Value == null || Value == '' ||
      Description == null || Description == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return

    }

    const body = {
      Value: Value,
      Description: Description,
      id: this.state.id,
      Status: Status
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.TYPE_REQUEST_UPDATE,
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
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.TYPE_REQUEST_DELETE,
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

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getBadge(status) {
    switch (status) {
      case '0': return 'danger'
      case '1': return 'success'
      default: return 'primary'
    }
  }

  getBadge_String(status) {
    switch (status) {
      case '0': return 'danger'
      case '1': return 'success'
      default: return 'primary'
    }
  }

  render() {
    const { data, arrPagination, indexPage } = this.state;
    if(!this.state.isError){
      if (!this.state.isLoading) {
        return (
          <div className="animated fadeIn">
            <Row>
              <Col>
                <p style={styles.success}>{this.state.updated}</p>
                <p style={styles.danger}>{this.state.deleted}</p>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify">Quản lý loại yêu cầu</i>
                    <div style={styles.tags}>
                      {/* <div>
                      <Input style={styles.searchInput} onChange={(e) => this.searchKey(e.target.value)} name="key" value={key} placeholder="Tìm kiếm" /> */}
                      <CButton outline color="primary" style={styles.floatRight} size="sm" onClick={async e => await this.toggleModal("new")}>Thêm mới</CButton>
                      {/* </div> */}
                    </div>
                  </CardHeader>
                  <CardBody>

                    <table ble className="table table-hover table-outline mb-0  d-sm-table">
                      <thead className="thead-light">
                        <tr>
                          <th className="text-center">STT.</th>
                          <th className="text-center">Giá trị</th>
                          <th className="text-center">Mô tả</th>
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
                                  <td className="text-center">{item.Value}</td>
                                  <td className="text-center">{item.Description}</td>
                                  <td className="text-center">
                                    {(new Date(item.Create_Date)).toLocaleDateString() + ' ' + (new Date(item.Create_Date)).toLocaleTimeString()}
                                  </td>
                                  <td className="text-center">
                                    <CButton style={styles.mgl5} outline color="primary" size="sm" onClick={async (e) => await this.openUpdate(item)} >
                                      <CIcon name="cilPencil" />
                                    </CButton>{' '}
                                    <CButton outline color="danger" size="sm" onClick={(e) => { this.openDelete(item) }}>
                                      <CIcon name="cilTrash" />
                                    </CButton>
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
                                <CButton style={styles.pagination} color={i == indexPage ? 'primary' : 'danger'} onClick={e => { this.setState({ data: arrPagination[i], indexPage: i }) }}>{i + 1}</CButton>
                              </td>
                            );
                          })
                        }
                      </tr>
                    </div>
                }
              </Col>
            </Row>

            <Modal isOpen={this.state.modalCom} className={this.props.className}>
              <ModalHeader>{this.state.action == 'new' ? `Tạo mới` : `Cập nhật`}</ModalHeader>
              <ModalBody>
                <TextFieldGroup
                  field="Value"
                  label="Nhập giá trị"
                  value={this.state.Value}
                  placeholder={"Nhập giá trị"}
                  // error={errors.title}
                  onChange={e => this.onChange("Value", e.target.value)}
                // rows="5"
                />

                {/* <TextFieldGroup
                field="Phone"
                label="Số điện thoại"
                value={this.state.Phone}
                placeholder={"Số điện thoại"}
                // error={errors.title}
                onChange={e => this.onChange("Phone", e.target.value)}
              // rows="5"
              /> */}

                <label className="control-label">Mô tả</label>
                <CTextarea
                  name="Description"
                  rows="9"
                  onChange={(e) => { this.setState({ Description: e.target.value }) }}
                  placeholder="Mô tả"
                />
                {/* {
                action == 'new' ? "" : <div>
                  <label style={styles.flexLabel} htmlFor="tag">Trạng thái:</label>
                  <select style={styles.flexOption} name="Status" onChange={e => this.onChange("Status", e.target.value)}>
                    <option value={this.state.Status}>{this.state.Status == '' ? ` - - - - - - - - - - ` : this.state.Status}</option>
                    <option value={'Actived'}>Actived</option>
                    <option value={'Locked'}>Locked</option>
                    <option value={'Deactived'}>Deactived</option>
                  </select>
                </div>
              } */}
              </ModalBody>
              <ModalFooter>
                <CButton color="primary" onClick={e => { this.state.action === 'new' ? this.addRoles() : this.updateUser() }} disabled={this.state.isLoading}>Lưu</CButton>{' '}
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
    return (
      <div className="sweet-loading">
        Bạn không có đủ quyền để sử dụng chức năng này !!! Vui lòng liên hệ Admin để biết thêm chi tiết
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
    marginLeft: '5px'
  },
  tags: {
    float: "right",
    marginRight: "5px",
    width: "250px"
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

export default TypeRequest;
