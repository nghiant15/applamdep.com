import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button, Input,
} from 'reactstrap';

import {
  CLabel,
  CRow,
  CCol,
  CButton,
  CTooltip,
  CTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import Constants from "./../../contants/contants";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updated: '',
      dataApi: [],
      delete: null,
      hidden: true,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      role: localStorage.getItem('role'),
      type: localStorage.getItem('type'),
      company_id: localStorage.getItem('user'),
      current_slug: '',
      companyID: '',
      arrTotalPackage: [],
      isChange: true,
      isChangeSlug: true,
      currentPassword: '',
      isLoading: false,
      isDisable: true,
      Email: "",
      Name: "",
      Phone: "",
      Address: "",
      UserName: "",
      Message_Code: ""
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

  getData = async () => {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_GET_USER_BYID,
      method: 'POST',
      headers: this.state.token
    });
    let val = res.data.data

    this.setState({
      dataApi: val, data: val, currentPassword: val.Password,
      isLoading: false,
      current_slug: val.Company_Id == null || val.Company_Id == undefined ? null : val.Company_Id.Slug,
      companyID: val.Company_Id == null || val.Company_Id == undefined ? null : val.Company_Id._id,
      Email: val.Email,
      Name: val.Name,
      Phone: val.Phone,
      Address: val.Address,
      UserName: val.UserName,
      Message_Code: val.Message_Code,
      isDisable: true
    });
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  openUpdate(name_link) {
    this.setState({
      [name_link]: !this.state[name_link]
    });
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

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async updatePassword(id, password) {
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_UPDATE_PASSWORD,
      method: 'POST',
      data: {
        id: id,
        new_password: password
      }
    });

    if (res.data.is_success == true) {
      this.getData();
      this.setState({ isChange: true });
    } else {
      alert(res.data.message);
      this.setState({ isLoading: false });
    }
  }

  async updateSlug() {
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.UPDATE_SLUG,
      method: 'POST',
      data: {
        id: this.state.companyID,
        Slug: this.state.current_slug,
      }
    });

    if (res.data.is_success == true) {
      this.getData();
      this.setState({ isChangeSlug: true });
    } else {
      alert(res.data.message);
      this.setState({ isChangeSlug: false });
    }
  }

  async updateCompany() {
    const { Email, Name, Phone, Address, UserName, data, Message_Code } = this.state

    if (Name == null || Name == ''
      || Phone == null || Phone == ''
      || UserName == null || UserName == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const body = {
      isHash: false,
      Name: Name == "" ? data.Name : Name,
      Email: Email == "" ? data.Email : Email,
      Phone: Phone == "" ? data.Phone : Phone,
      Address: Address == "" ? data.Address : Address,
      UserName: UserName == "" ? data.UserName : UserName,
      Message_Code: Message_Code == "" || Message_Code == null ? data.Message_Code : Message_Code,
      Password: data.Password,
      Status: data.Status,
      id: data._id
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_UPDATE_USER_COMPANY,
      method: 'POST',
      data: body
    });

    if (res.data.is_success == true) {
      this.getData();
    } else {
      alert(res.data.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { data, current_slug, isChange, currentPassword, isChangeSlug, type, isDisable,
      Email, Name, Phone, Address, UserName, Message_Code } = this.state;

    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <p style={styles.success}>{this.state.updated}</p>
              <p style={styles.danger}>{this.state.deleted}</p>
              <Card>
                <CardHeader>
                  LỰA CHỌN KẾT QỦA KHI RECOMEND SẢN PHẨM THEO NHÓM SẢN PHẨM 
                </CardHeader>
                <CardBody>
                  <CRow>
                    <CCol sm="12" lg="12">
                      <CRow>
                        <CCol sm="12" lg="10">
                          <CLabel><strong>DANH SÁCH NHÓM SẢN PHẨM THEO PHÂN LOẠI</strong></CLabel>
                        </CCol>
                        {
                          type == '0' || type == '1' ? "" :
                            <CCol sm="12" lg="2">
                              <CTooltip content="Xem chi tiết đơn hàng">

                                {
                                  isDisable ?
                                    <CButton outline color="info" size="xm" onClick={async (e) => {
                                      this.setState({ isDisable: !isDisable })
                                    }}>
                                      <CIcon name="cil-pencil" /> Cập nhật
                                    </CButton> :
                                    <CButton outline color="info" size="sm" onClick={async (e) => {
                                      this.updateCompany()
                                    }}>
                                      <CIcon name="cil-pencil" /> Xác nhận cập nhật
                                    </CButton>
                                }

                              </CTooltip>
                            </CCol>
                        }
                      </CRow>
                      <CRow>
                        <CCol sm="12" lg="12">
                           
                        </CCol>

                      

                      

                     

                        
                       


                        

                        

                      

                      </CRow>
                    </CCol>
                  </CRow>
                </CardBody>
              </Card>
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
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const styles = {
  datePicker: {
    marginBottom: 20
  },
  wa10: {
    width: "5%",
    float: "left",
    height: "80px"
  },
  pagination: {
    marginRight: '5px'
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
  wh12: {
    width: "10%",
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
    width: '100%',
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

export default Users;
