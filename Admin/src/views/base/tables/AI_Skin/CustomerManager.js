import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input
} from 'reactstrap';

import {
  CButton,
  CSelect,
} from '@coreui/react'

import {
  CChartBar
} from '@coreui/react-chartjs'

import Pagination from '@material-ui/lab/Pagination';
import 'moment-timezone';
import Constants from "../../../../contants/contants";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');
class CustomerManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataByMonth: [],
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
      hidden_m: false,
      action: 'new',
      UserName: '',
      FullName: '',
      Phone: '',
      Company_Id: '',
      Address: '',
      Email: '',
      Type: "0",
      Status: '',
      modalDelete: false,
      delete: null,
      arrPagination: [],
      indexPage: 0,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      company_id: localStorage.getItem('user'),
      isLoading: false,
      arrTypeRequest: [],
      type: localStorage.getItem('type'),
      dataChart: []
    };
  }
  async componentDidMount() {
    if (this.state.type == '0' || this.state.type == '1') {
      this.getData();
    } else {
      this.getDataForCompany();
    }

    this.getDataForCompanyByMonth('01');
    this.getDataForCharts();
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

  async getDataForCharts() {

    let arrMonth = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    let arrTemp = [];
    for (let i = 0; i < arrMonth.length; i++) {
      const res = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.LIST_CUSTOMER_FOR_COMPANY_BY_MONTH,
        method: 'POST',
        data: {
          Company_Id: JSON.parse(this.state.company_id).company_id,
          month: arrMonth[i]
        }
      });

      arrTemp.push(res.data.data.result.length)
    }

    this.setState({ dataChart: arrTemp })
  }

  getData = async () => {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_CUSTOMER,
      method: 'POST'
    });
    let val = res.data.data.result;

    let valCount = res.data.data.Count;
    if (res.data.is_success) {
      for (let i = 0; i < val.length; i++) {
        val[i].Count = valCount[i]
      }

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
  }

  getDataForCompany = async () => {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_CUSTOMER_FOR_COMPANY,
      method: 'POST',
      data: {
        Company_Id: JSON.parse(this.state.company_id).company_id
      }
    });

    let val = res.data.data.result;
    let valCount = res.data.data.Count;

    if (res.data.is_success) {
      for (let i = 0; i < val.length; i++) {
        val[i].Count = valCount[i]
      }

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
  }

  getDataForCompanyByMonth = async (month) => {
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_CUSTOMER_FOR_COMPANY_BY_MONTH,
      method: 'POST',
      data: {
        Company_Id: JSON.parse(this.state.company_id).company_id,
        month: month
      }
    });

    let val = res.data.data.result;
    let valCount = res.data.data.Count;

    if (res.data.is_success) {
      for (let i = 0; i < val.length; i++) {
        val[i].Count = valCount[i]
      }

      if (val.length == 0) {
        this.setState({
          hidden_m: false
        })
      } else {
        this.setState({
          hidden_m: true
        })
      }

      this.setState({ dataByMonth: val });
    }
  }

  searchKey(key) {
    this.setState({ key: key })

    if (key != '') {
      let d = []
      this.state.dataApi.map(val => {
        if ((val.UserName.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.FullName.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.Phone.toLocaleUpperCase().includes(key.toLocaleUpperCase()))) {
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
        UserName: '',
        FullName: '',
        Phone: '',
      })
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  async addRoles() {
    const { UserName, Phone, Type, FullName } = this.state

    if (UserName == null || UserName == '' ||
      Phone == null || Phone == '' || FullName == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const body = {
      UserName: UserName,
      FullName: FullName,
      Phone: Phone,
      Company_Id: this.state.type == '0' || this.state.type == '1' ? null : JSON.parse(this.state.company_id).company_id,
      Type: Type
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.CUS_RES_ADD,
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
      UserName: item.UserName,
      FullName: item.FullName,
      Phone: item.Phone,
      Type: item.Type,
      id: item['_id'],
      Status: item.Status
    })
  }

  async updateUser() {
    const { UserName, Phone, Type, FullName, Status } = this.state
    if (UserName == null || UserName == '' ||
      Phone == null || Phone == '' || FullName == null || FullName == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return

    }

    const body = {
      UserName: UserName,
      FullName: FullName,
      Phone: Phone,
      Type: Type,
      id: this.state.id,
      Status: Status
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.CUS_RES_UPDATE,
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
      url: Constants.CUS_RES_DELETE,
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
      case '0': return 'Chưa nhận quà'
      case '1': return 'Đã nhận quà'
      default: return 'primary'
    }
  }

  render() {
    const { data, arrPagination, key, type, dataByMonth, dataChart } = this.state;
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"> Thống kê lượt khách hàng</i>
                  <div style={styles.tags}>
                    <Input style={styles.searchInput} onChange={(e) => this.searchKey(e.target.value)} name="key" value={key} placeholder="Tìm kiếm" />
                  </div>
                </CardHeader>
                <CardBody>

                  <table ble className="table table-hover table-outline mb-0  d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">STT.</th>
                        <th className="text-center">Tên đăng nhập</th>
                        <th className="text-center">Tên đầy đủ</th>
                        <th className="text-center">Số điện thoại</th>
                        {
                          type == '0' || type == '1' ?
                            <th className="text-center">Công ty</th> : ""
                        }
                        <th className="text-center">Lần đến gần nhất</th>
                        
                        <th className="text-center">Số lần đến</th>
                        <th className="text-center">Lịch sử soi da</th>
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
                                <td className="text-center">{item.UserName}</td>
                                <td className="text-center">{item.FullName}</td>
                              
                                <td className="text-center">{item.Phone}</td>
                                {
                                  type == '0' || type == '1' ?
                                    <td className="text-center">{item.Company_Id == null || item.Company_Id == undefined ? "admin" : item.Company_Id.Name}</td> : ""
                                }
                                <td className="text-center">
                                  {(new Date(item.Create_Date)).toLocaleDateString() + ' ' + (new Date(item.Create_Date)).toLocaleTimeString()}
                                </td>
                                <td className="text-center">{item.Count}</td>

                                <td className="text-center">

                                 <CButton style={styles.mgl5} outline color="primary" size="sm" onClick={async (e) => {
                                          window.open("https://id.applamdep.com/#lich-su-ca-nhan/"+ item.Phone, "_blank")
                                          
                                       }} >
                                        Lịch sử soi da
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

            </Col>
          </Row>

          {
            type == "2" || type == "5" ?
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <i className="fa fa-align-justify"> Thống kê lượt khách hàng theo từng tháng</i>
                      <div style={styles.tags}>
                        Tháng
                        <CSelect onChange={async e => { this.getDataForCompanyByMonth(e.target.value) }} custom size="sm" name="selectSm" id="SelectLm">
                          <option value="01">01</option>
                          <option value="02">02</option>
                          <option value="03">03</option>
                          <option value="04">04</option>
                          <option value="05">05</option>
                          <option value="06">06</option>
                          <option value="07">07</option>
                          <option value="08">08</option>
                          <option value="09">09</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </CSelect>
                      </div>
                    </CardHeader>
                    <CardBody>

                      <table ble className="table table-hover table-outline mb-0  d-sm-table">
                        <thead className="thead-light">
                          <tr>
                            <th className="text-center">STT.</th>
                            <th className="text-center">Tên</th>
                            <th className="text-center">Tên đầy đủ</th>
                            <th className="text-center">Số điện thoại</th>
                            {
                              type == '0' || type == '1' ?
                                <th className="text-center">Công ty</th> : ""
                            }
                            <th className="text-center">Lần đến gần nhất trong tháng</th>
                            <th className="text-center">Số lần đến</th>
                            <th className="text-center">Lịch sử soi da</th>
                            <th className="text-center">#</th>
                          </tr>
                        </thead>
                        <tbody>
                          <td colSpan="10" hidden={this.state.hidden_m} className="text-center">Không tìm thấy dữ liệu</td>
                          {
                            dataByMonth != undefined ?
                              dataByMonth.map((item, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="text-center">{i + 1}</td>
                                    <td className="text-center">{item.UserName}</td>
                                    <td className="text-center">{item.FullName}</td>
                                    <td className="text-center">{item.Phone}</td>
                                    {
                                      type == '0' || type == '1' ?
                                        <td className="text-center">{item.Company_Id == null || item.Company_Id == undefined ? "admin" : item.Company_Id.Name}</td> : ""
                                    }
                                    <td className="text-center">
                                      {(new Date(item.Create_Date)).toLocaleDateString() + ' ' + (new Date(item.Create_Date)).toLocaleTimeString()}
                                    </td>
                                    <td className="text-center">{item.Count}</td>
                                    <td className="text-center">

<CButton style={styles.mgl5} outline color="primary" size="sm" onClick={async (e) => {
         window.open("https://id.applamdep.com/#lich-su-ca-nhan/"+ item.Phone, "_blank")
         
      }} >
       Lịch sử soi da
     </CButton>

</td>
                                    <td className="text-center">
                                      <CButton style={styles.mgl5} outline color="primary" size="sm" onClick={async (e) => {
                                          window.open("https://id.applamdep.com/#lich-su-ca-nhan/"+ item.Phone, "_blank")
                                          
                                       }} >
                                        Lịch sử soi da
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
                </Col>
              </Row> : ""
          }

          {
            type == "2" || type == "5" ?
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <i className="fa fa-align-justify"> Biểu đồ thể hiện lượt khách hàng theo từng tháng (Khách hàng mới sẽ được tính lại từ đầu khi sang tháng mới)</i>
                    </CardHeader>
                    <CardBody>

                      <CChartBar
                        datasets={[
                          {
                            label: 'Lượt khách hàng mới của tháng',
                            backgroundColor: '#f87979',
                            data: dataChart
                          }
                        ]}
                        labels="months"
                        options={{
                          tooltips: {
                            enabled: true
                          }
                        }}
                      />

                    </CardBody>
                  </Card>
                </Col>
              </Row> : ""
          }
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
  mgl5: {
    marginBottom: '0px'
  }
}

export default CustomerManager;
