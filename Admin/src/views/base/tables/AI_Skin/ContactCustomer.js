import React, { Component } from 'react';
import CIcon from '@coreui/icons-react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Button
} from 'reactstrap';

import {
  CButton,
  CRow, CCol, CBadge
} from '@coreui/react'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import 'moment-timezone';
import Constants from "../../../../contants/contants";
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
class ContactCustomer extends Component {
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
  componentWillMount() {
    if (this.state.type == '0' || this.state.type == '1') {
      this.setState({ isError: false })
    } else {
      this.setState({ isError: true })
      //window.history.back();
    }
  }
  async componentDidMount() {
    this.getData()
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
      url: Constants.LIST_CONTACT_CUSTOMER,
      method: 'POST'
    });

    let val = res.data.data
    this.pagination(val);

    console.log(val)

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
    const { indexPage, key } = this.state;
    // this.setState({ key: key })

    if (key != '') {
      let d = []
      this.state.dataApi.map(val => {
        if (val.Name.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.Phone.toLocaleUpperCase().includes(key.toLocaleUpperCase())) {

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
      key: ''
    }, () => {
      this.searchKey();
    });
  }

  onChange(key, val) {
    this.setState({ [key]: val })
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
      case '0': return 'Đang chờ sale gọi'
      case '1': return 'Đã gọi'
      default: return 'primary'
    }
  }

  openUpdateStatus = async (item) => {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.UPDATE_CONTACT_STATUS,
      method: 'DELETE',
      data: {
        id: item['_id'],
        Status: "1"
      }
    });

    if (res.data.is_success == true) {
      this.getData();
    } else {
      alert(res.data.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { data, arrPagination, indexPage, key } = this.state;
    if (!this.state.isError) {
      if (!this.state.isLoading) {
        return (
          <div className="animated fadeIn">
            <Row>
              <Col>
                <p style={styles.success}>{this.state.updated}</p>
                <p style={styles.danger}>{this.state.deleted}</p>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"> Danh sách liên hệ</i>
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
                      </CRow>
                    </div>
                  </CardHeader>
                  <CardBody>

                    <table ble className="table table-hover table-outline mb-0  d-sm-table">
                      <thead className="thead-light">
                        <tr>
                          <th className="text-center">STT.</th>
                          <th className="text-center">Họ và tên</th>
                          <th className="text-center">Số điện thoại</th>
                          <th className="text-center">Trạng thái</th>
                          <th className="text-center">Loại yêu cầu</th>
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
                                  <td className="text-center">{item.Name}</td>
                                  <td className="text-center">{item.Phone}</td>
                                  <td className="text-center">
                                    <CBadge color={this.getBadge(item.Status)}>
                                      {this.getBadge_String(item.Status)}
                                    </CBadge>
                                  </td>
                                  <td className="text-center">{item.Type_Request}</td>
                                  <td className="text-center">
                                    {(new Date(item.Create_Date)).toLocaleDateString() + ' ' + (new Date(item.Create_Date)).toLocaleTimeString()}
                                  </td>
                                  <td className="text-center">
                                    {
                                      item.Status == "0" ?
                                        <Button outline color="danger" size="sm" onClick={(e) => { this.openUpdateStatus(item) }}>Chưa gọi</Button> :
                                        <Button outline color="success" size="sm" onClick={(e) => { }}>Đã gọi</Button>
                                    }
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
    width: "500px"
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

export default ContactCustomer;
