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
  CBadge
} from '@coreui/react'


import { makeStyles, withStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
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
class RewardInfomation extends Component {
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
      Subject: '',
      Content: '',
      Templates: '',
      Link: '',
      Status: '',
      modalDelete: false,
      delete: null,
      arrPagination: [],
      indexPage: 0,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      isLoading: false,
      company_id: localStorage.getItem('user'),
      type: localStorage.getItem('type')
    };
  }
  async componentDidMount() {
    if (this.state.type == '0' || this.state.type == '1') {
      this.getData();
    } else {
      this.getDataForCompany();
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
      url: Constants.REWARD_INFO_LIST,
      method: 'POST'
    });

    let val = res.data.data;
    console.log(val)
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

  getDataForCompany = async () => {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.REWARD_INFO_LIST_COMPANY,
      method: 'POST',
      data: {
        Company_Id: JSON.parse(this.state.company_id).company_id
      }
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
        if ((val.Subject.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.Content.toLocaleUpperCase().includes(key.toLocaleUpperCase()))) {
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
        Subject: '',
        Content: '',
        Templates: '',
        Link: ''
      })
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  async addRoles() {
    const { Subject, Content, Templates, Link } = this.state

    if (Subject == null || Subject == '' ||
      Content == null || Content == '' ||
      Templates == null || Templates == '' ||
      Link == null || Link == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const body = {
      Subject: Subject,
      Content: Content,
      Company_Id: this.state.type == '0' || this.state.type == '1' ? null : JSON.parse(this.state.company_id).company_id,
      Templates: Templates,
      Link: Link
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.REWARD_INFO_ADD,
      method: 'PUT',
      data: body
    });

    if (res.data.is_success == true) {
      if (this.state.type == '0' || this.state.type == '1') {
        this.getData();
      } else {
        this.getDataForCompany();
      }
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
      Subject: item.Subject,
      Content: item.Content,
      Templates: item.Templates,
      id: item['_id'],
      Status: item.Status,
      Link: item.Link
    })
  }

  async updateUser() {
    const { Subject, Content, Templates, Status, Link } = this.state

    if (Subject == null || Subject == '' ||
      Content == null || Content == '' ||
      Templates == null || Templates == '' ||
      Link == null || Link == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const body = {
      Subject: Subject,
      Content: Content,
      Templates: Templates,
      id: this.state.id,
      Status: Status,
      Link: Link
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.REWARD_INFO_UPDATE,
      method: 'POST',
      data: body
    });

    if (res.data.is_success == true) {
      if (this.state.type == '0' || this.state.type == '1') {
        this.getData();
      } else {
        this.getDataForCompany();
      }
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
      url: Constants.REWARD_INFO_DELETE,
      method: 'DELETE',
      data: {
        "id": this.state.delete['_id']
      }
    });

    if (res.data.is_success == true) {
      if (this.state.type == '0' || this.state.type == '1') {
        this.getData();
      } else {
        this.getDataForCompany();
      }
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
      case '0': return 'Đã ẩn'
      case '1': return 'Đang kích hoạt'
      default: return 'primary'
    }
  }

  render() {
    const { data, arrPagination, type } = this.state;
    if (!this.state.isLoading) {

      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <p style={styles.success}>{this.state.updated}</p>
              <p style={styles.danger}>{this.state.deleted}</p>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify">Danh sách nội dung chương trình khuyến mãi</i>
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
                        {
                          type == '0' || type == '1' ? <th className="text-center">Công ty</th> : ""
                        }
                        <th className="text-center">Tiêu đề</th>
                        <th className="text-center">Nội dung</th>
                        <th className="text-center">Templates</th>
                        <th className="text-center">Đường dẫn kèm theo</th>
                        <th className="text-center">Ngày tạo</th>
                        <th className="text-center">Trạng thái</th>
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
                                {
                                  type == '0' || type == '1' ? <td className="text-center">{item.Company_Id == null || item.Company_Id == "null" ? "Admin" : item.Company_Id.Name }</td> : ""
                                }
                                <td className="text-center">{item.Subject}</td>
                                <td className="text-center">{item.Content}</td>
                                <td className="text-center">{item.Templates}</td>
                                <td className="text-center">
                                  <a href={item.Link} target="_blank">{item.Link}</a>
                                </td>
                                <td className="text-center">
                                  {(new Date(item.Create_Date)).toLocaleDateString() + ' ' + (new Date(item.Create_Date)).toLocaleTimeString()}
                                </td>
                                <td className="text-center">
                                  <CBadge color={this.getBadge(item.Status)}>
                                    {this.getBadge_String(item.Status)}
                                  </CBadge>
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
              <div style={{ float: 'right' }}>
                <Pagination count={arrPagination.length} color="primary" onChange={(e, v) => {
                  this.setState({ data: arrPagination[v - 1], indexPage: v - 1 })
                }} />
              </div>
              {/* {
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
              } */}
            </Col>
          </Row>

          <Modal isOpen={this.state.modalCom} className={this.props.className}>
            <ModalHeader>{this.state.action == 'new' ? `Tạo mới` : `Cập nhật`}</ModalHeader>
            <ModalBody>
              <TextFieldGroup
                field="Subject"
                label="Tiêu đề"
                value={this.state.Subject}
                placeholder={"Tiêu đề"}
                // error={errors.title}
                onChange={e => this.onChange("Subject", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Content"
                label="Nội dung"
                value={this.state.Content}
                placeholder={"Nhập nội dung"}
                // error={errors.title}
                onChange={e => this.onChange("Content", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Templates"
                label="Nhập nội dung sms"
                value={this.state.Templates}
                placeholder={"Nhập nội dung sms"}
                // error={errors.title}
                onChange={e => this.onChange("Templates", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="Link"
                label="Đường dẫn kèm theo"
                value={this.state.Link}
                placeholder={"Đường dẫn kèm theo"}
                // error={errors.title}
                onChange={e => this.onChange("Link", e.target.value)}
              // rows="5"
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

export default RewardInfomation;
