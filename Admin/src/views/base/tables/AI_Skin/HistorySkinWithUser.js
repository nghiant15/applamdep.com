import React, { Component } from 'react';
import CIcon from '@coreui/icons-react';

import {

  CLabel, CSelect, CRow, CCol
} from "@coreui/react";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input
} from 'reactstrap';
import { DatePicker, Space, Spin } from "antd";
import {
  CButton
} from '@coreui/react'

import IframeModal from '../../../components/Iframe';
import styles from '../../../../../src/assets/styles/styles';
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
const dateFormat = "DD/MM/YYYY";
class HistorySkin extends Component {
 
  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    const phoneNumber = query.get('phoneNumber')

    this.state = {
      data: [],
      key: '',
      page: 1,
      phoneNumber: phoneNumber,
      limit: 20,
      totalActive: 0,
      activePage: 1,
      numPage: 1,
      itemsCount: 0,
      itemPerPage: 5,
      hidden: false,
      indexPage: 0,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      isLoading: false,
      type: localStorage.getItem('type'),
      toggleHistory: false,
      idHistory: "",
      company_id: JSON.parse(localStorage.getItem('user')).company_id
    };
    this.closeModal = this.closeModal.bind(this)
  }
  async componentDidMount() {
   
    this.getData();
   
  }

  getData = async () => {

    var keyText = window.location.href.split("/").pop();

    const { activePage, itemPerPage ,phoneNumber} = this.state;
    
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_HISTORY_SKIN,
      data: {
        page: activePage,
        keyText:  keyText,
        limit: itemPerPage
      },
      method: 'POST'
    });

    let data = res.data.data;

    this.setState({ dataApi: data.data, data: data.data, isLoading: false, itemsCount: data.total });
  }

  handlePageChange = async (pageNumber) => {
    const { type } = this.state;
    console.log(type)
    this.setState({ activePage: pageNumber }, () => {
      this.getData();
    });
  };



  onChange(key, val) {
    this.setState({ [key]: val })
  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  closeModal() {
    const { toggleHistory } = this.state;
    this.setState({ toggleHistory: !toggleHistory });
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

  render() {
    const { data, activePage, itemPerPage, itemsCount, toggleHistory, idHistory } = this.state;


    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify">Chi tiết lịch sử soi da</i>
              </CardHeader>
              <CardBody>
                <table ble className="table table-hover table-outline mb-0  d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">STT.</th>
                      <th className="text-center">Tên</th>
                      <th className="text-center">Số điện thoại</th>
                      <th className="text-center">Hình ảnh</th>
                      <th className="text-center">Tỉnh thành</th>          
                      <th className="text-center">Kết quả</th>
                      <th className="text-center">Công ty</th>
                      <th className="text-center">Sale</th>
                      <th className="text-center">Đăng ký tư vấn </th>  
                      <th className="text-center">Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td colSpan="10" hidden={data.length > 0 ? true : false} className="text-center">Không tìm thấy dữ liệu</td>
                    {
                      data != undefined ?
                        data.map((item, i) => {

                          let  resultItem  =JSON.parse (item.Result);
                          if(resultItem.data)
                          {
                            resultItem=  resultItem.data;
                          }
                          let nameUser = item.UserName;
                          if(item.Name) 
                          {
                            nameUser =  item.Name;
                          }
                          return (
                            
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td className="text-center">{nameUser}</td>
                              <td className="text-center">{item.Phone}</td>
                              <td className="text-center">
                               
                                <img src={item.Result != undefined ? resultItem.facedata.image_info.url : ""} style={{ width: '50%', height: 50 }} />
                              </td>
                              <td className="text-center">
                                {
                                  item.regionName
                                }
                                {/* {
                                  item?.location?.x && item?.location?.y ? <a target='_blank' href={`https://www.google.com/maps/place/${item?.location?.x},${item?.location?.y}`}>
                                  <CButton outline color="primary">Xem trên map</CButton>
                                  </a> : 'Không có thông tin'
                                } */}
                                
                              </td>
                              <td className="text-center">
                                <CButton outline color="primary" onClick={e => {
                                  this.setState({
                                    idHistory: item._id,
                                    toggleHistory: !toggleHistory
                                  })
                                }}><CIcon name="cil-magnifying-glass" /> Xem chi tiết</CButton>
                              </td>
                              <td className="text-center">{item.Company_Id == "" || item.Company_Id == undefined ? "" : item.Company_Id.Name}</td>
                              <td className="text-center">{item.Sale_Id == null ? "ADMIN" : item.Sale_Id.Name}</td>
                              <td className="text-center">{item.typeLogin == "1" ? "Có": ""}</td>
                              <td className="text-center">
                                {(new Date(item.Create_Date)).toLocaleDateString() + ' ' + (new Date(item.Create_Date)).toLocaleTimeString()}
                              </td>
                            </tr>
                          );
                        }) : ""
                    }
                  </tbody>
                </table>
                {/* :
                    <div className="sweet-loading">
                      <DotLoader css={override} size={50} color={"#123abc"} loading={this.state.isLoading} speedMultiplier={1.5} />
                    </div> */}


              </CardBody>
            </Card>


            <div style={{ float: 'right' }}>
              <Pagination count={Math.ceil(itemsCount / itemPerPage)} color="primary" onChange={(e, v) => {
                this.handlePageChange(v)
              }} />
            </div>
          </Col>
        </Row>

        <IframeModal toggleView={toggleHistory} link={Constants.BASE_URL_HISTORY_SKIN + idHistory} closeModal={this.closeModal} />
      </div>
    );
  }
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default HistorySkin;
const styles1 = {
  dateForm : {
    width: "200px"
  },
  pagination: {
    marginRight: "5px",
  },
  flexLabel: {
    width: 100,
  },
  flexOption: {
    width: 300,
  },
  a: {
    textDecoration: "none",
  },
  floatRight: {
    float: "right",
    marginTop: "3px",
  },
  spinner: {
    width: "30px",
  },
  center: {
    textAlign: "center",
  },
  tbody: {
    height: "380px",
    overflowY: "auto",
  },
  wh25: {
    width: "25%",
    float: "left",
    height: "80px",
  },
  w5: {
    width: "15%",
    float: "left",
    height: "80px",
  },
  icon: {
    fontSize: "16px",
    height: "20px",
    width: "20px",
  },
  wa10: {
    width: "5%",
    float: "left",
    height: "80px",
  },
  row: {
    float: "left",
    width: "100%",
  },
  success: {
    color: "green",
  },
  danger: {
    color: "red",
  },
  mgl5: {
    marginLeft: "5px",
  },
  tags: {
    float: "right",
    marginRight: "5px",
  },
  searchInput: {
    width: "200px",
    display: "inline-block",
    
  },
  userActive: {
    color: "green",
  },
  userPending: {
    color: "red",
  },
  nagemonNameCol: {
    width: "328px",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "99999px",
  },
};