import React, { Component } from 'react';

import {
  Card,
  CardHeader,
  CardFooter,
} from 'reactstrap';

import {
  CBadge,
  CModalTitle,
  CButton,
  CTooltip
} from '@coreui/react'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons';
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import Constants from "./../../../../contants/contants";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
class ListFeatureOfCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
      modalDelete: false,
      delete: null,
      dataCompany: [],
      currentCompany: '',
      dataTypeKey: [],
      currentTypeKey: '',
      dataHardWare: [],
      currentHardWare: '',
      arrPagination: [],
      indexPage: 0,
      hidden: true,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      role: localStorage.getItem('role'),
      company_id: localStorage.getItem('user'),
      link_shop: true,
      data_link_shop: '',
      link_recommand: true,
      data_link_recommand: '',
      link_sku: true,
      data_link_sku: '',
      toggleView: false,
      company_name: '',
      arrDetailPackage: [],
      phone_number: '',
      current_slug: '',
      arrTotalPackage: [],
      isChange: true,
      current_package: '',
      isLoading: false
    };
  }
  async componentDidMount() {
    this.getData();

    let arr = JSON.parse(localStorage.getItem('url'));

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url == window.location.hash) {
        if (arr[i].isHidden == true) {
          window.location.href = '#/'
        }
      }
    }
  }

  getCompanyName = async (company_id) => {
    const resCom = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_DATA_COMPANY,
      method: 'POST',
      data: {
        company_id: company_id
      }
    });

    this.setState({ current_slug: resCom.data.data.Slug })
    return resCom.data.data == null ? "" : resCom.data.data.Name;
  }


  getBadge(status) {
    switch (status) {
      case 'Actived': return 'success'
      case 'Deactived': return 'danger'
      default: return 'primary'
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

    await this.onView(val.Name, val.Company_Id, val.Phone);

    this.setState({ dataApi: res.data.data, data: val, isLoading: false, current_slug: val.Company_Id.Slug });
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

  async getPackageData() {
    const resPackage = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_PLUGIN_ORDER_BY_ID,
      method: 'POST',
      headers: this.state.token
    });
    let val = resPackage.data.data;

    this.setState({ arrTotalPackage: val, current_package: val.length == 0 ? '' : val[0].Package_Id.Name })
    return val;
  }

  async onView(name, com_id, phone_number) {
    let data = await this.getPackageData(com_id)
    this.setState({
      toggleView: !this.state.toggleView, company_name: name,
      arrDetailPackage: data.length == 0 ? [] : data[0].Array_Feature, phone_number: phone_number
    })
  }

  renderDetailPackage() {
    return (
      <table ble className="table table-hover table-outline mb-0  d-sm-table">
        <thead className="thead-light">
          <tr>
            <th className="text-center">STT.</th>
            <th className="text-center">Tên dịch vụ</th>
            <th className="text-center">Đường dẫn</th>
            <th className="text-center">#</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.arrDetailPackage.length == 0 ?
              <td colSpan="10" hidden={false} className="text-center">Không tìm thấy dữ liệu</td> :
              <td colSpan="10" hidden={true} className="text-center">Không tìm thấy dữ liệu</td>

          }

          {
            this.state.arrDetailPackage != undefined || this.state.arrDetailPackage.length != 0 || this.state.arrDetailPackage != null ?
              this.state.arrDetailPackage.map((item, i) => {
                return (
                  <tr key={i}>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{item.Key}</td>
                    <td className="text-center">{item.Value + this.state.current_slug}</td>
                    <td className="text-center">
                      <CTooltip content="Copy">
                        <CopyToClipboard text={item.Value + this.state.current_slug}
                          onCopy={() => { }}>
                          <CIcon content={freeSet.cilCopy} />
                        </CopyToClipboard>
                      </CTooltip>
                    </td>
                  </tr>
                );
              }) : ""
          }
        </tbody>
      </table>
    )
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

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  calDateLeft(end, active) {
    return this.CalculatorDateLeft(new Date(end), new Date(active))
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

  async updatePassword(id, password) {
    console.log(id)
    console.log(password)
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

  render() {
    const { arrTotalPackage, current_package, } = this.state;
    if (!this.state.isLoading) {

      return (
        <div className="animated fadeIn">
          <Card style={{ padding: 15 }}>
            <CardHeader closeButton>
              <CModalTitle>Danh sách đơn hàng</CModalTitle>
            </CardHeader>
            <table ble className="table table-hover table-outline mb-0  d-sm-table">
              <thead className="thead-light">
                <tr>
                  <th className="text-center">STT.</th>
                  <th className="text-center">Tên Gói</th>
                  <th className="text-center">Gói</th>
                  <th className="text-center">Ngày kích hoạt</th>
                  <th className="text-center">Ngày hết hạn</th>
                  <th className="text-center">Thời gian hết hạn</th>
                  <th className="text-center">Trạng thái</th>
                  <th className="text-center" style={{ width: '300px' }}>Tính năng</th>
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
                        <tr key={i} style={{ justifyContent: 'center' }}>
                          <th className="text-center">{i + 1}</th>
                          <th className="text-center">{item.Package_Id.Name}</th>
                          <th className="text-center">{`${item.Package_Id.Value} ${this.convertUnitToDate(item.Package_Id.Unit)}`}</th>
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

                          <th className="text-center">
                            {item.Array_Feature.map((item, i) => {
                              if(i < 2){
                                return (
                                  <div><a href={item.Value} target="_blank" key={i}>{item.Value}</a></div>
                                )
                              }
                            })}
                            {
                              (item.Array_Feature.length - 2) <= 0 ? "" : "..."
                            }
                          </th>

                          <td className="text-center">
                            <CButton outline color="info" size="sm"
                              onClick={async (e) => {
                                this.setState({
                                  arrDetailPackage: item.Array_Feature, current_package: item.Package_Id.Name
                                })
                              }}>
                              {/* <CIcon name="cil-magnifying-glass" />  */}
                              Xem chi tiết tính năng
                            </CButton>
                          </td>
                        </tr>
                      )
                    }) : ""
                }
              </tbody>
            </table>
            <br />
            <CardHeader>
              <CModalTitle>Chi tiết tính năng ({current_package})</CModalTitle>
            </CardHeader>
            {
              this.renderDetailPackage()
            }

          </Card>
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
  mgl5: {
    marginBottom: '0px'
  }
}

export default ListFeatureOfCustomer;
