import React, { Component } from 'react';
import CIcon from '@coreui/icons-react'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Input,
  Label,
  ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';
import {
  CButton,
  CRow,
  CCol,
  CSelect
} from '@coreui/react'

import API_CONNECT from "../../../../functions/callAPI";
import Pagination from '@material-ui/lab/Pagination';
import 'moment-timezone';
import Constants from "../../../../contants/contants";
import TextFieldGroup from "../../../Common/TextFieldGroup";
import axios from 'axios'
import md5 from 'md5'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');
let XLSX = require("xlsx");
class EndUserv2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      company_id: JSON.parse(localStorage.getItem('user')).company_id,
      key: '',
      totalActive: 0,
      modalCom: false,
      updated: '',
      dataApi: [],
      hidden: false,
      action: 'new',
      email: "",
      username: "",
      phone: "",
      modalDelete: false,
      delete: null,
      arrPagination: [],
      dataCompany: [],
      indexPage: 0,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      type: localStorage.getItem('type'),
      user: localStorage.getItem('user'),
      isLoading: false
    };
  }
  async componentDidMount() {
    const { type } = this.state;

    this.getData()

    let arr = JSON.parse(localStorage.getItem('url'));
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].url == window.location.hash) {
        if (arr[i].isHidden == true) {
          window.location.href = '#/'
        }
      }
    }

    if(this.state.company_id == undefined)
    {
      this.getAllDataCompany();
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

         this.setState({ arrPagination: 2, data: dataApi  });
  }
  setStateByName = (name, value) => {
    this.props.setStateByName(name, value);
  };
  getData = async () => {
    const { company_id } = this.state;
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_END_USER2,
      data: {
        company_id : company_id, 
        limit: 10, 
        page: 1
      },
      method: 'POST'
    });

    let val = res.data.data;
    this.pagination(val);
    this.setState({ dataApi: val });

    let active = 0

    this.setState({ isLoading: false, totalActive: active });
  }
  getAllDataCompany = async () => {
   

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.List_All_company,
     
      method: 'POST'
    });

    let data = res.data;

    this.setState({ dataCompany:data.data.dataCompany });
  };

  searchKey() {
    const { indexPage, key, fromDate, endDate,company_idSearch } = this.state;
    // this.setState({ key: key })

    if (key != '') {
      let d = []
      this.state.dataApi.map(val => {
        if (val.email.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.phone.toLocaleUpperCase().includes(key.toLocaleUpperCase())) {

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

  async openUpdate(item) {
    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      email: item.email,
      phone: item.phone,
      username: item.username,
      id: item['_id']
    })
  }

  async updateUser() {
    const { email, phone, password, username } = this.state

    if (email == null || email == '' ||
      phone == null || phone == '' ||
      username == null || username == '') {
      alert("Hãy nhập đầy đủ trường !!!");
      return
    }

    const body = {
      email: email,
      phone: phone,
      username: username,
      id: this.state.id,
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.UPDATE_END_USER,
      method: 'POST',
      data: body
    });

    if (res.status == 200) {

      this.getData()

      this.setState({ modalCom: !this.state.modalCom })
    } else {
      alert("Cập nhật thất bại");
      this.setState({ isLoading: false });
    }
  }

  openDelete = (item) => {
    this.setState({
      modalDelete: !this.state.modalDelete,
      id: item._id
    })
  }
 
  openHistory = (item) => {

    window.open("http://localhost:3003/#/historyskin?phoneNumber="+ item.phone,"_blank");
    
  }
  

  async delete() {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.DELETE_END_USER,
      method: 'POST',
      data: {
        "id": this.state.id
      }
    });

    if (res.status == 200) {

      this.getData()

      this.setState({ modalDelete: !this.state.modalDelete, delete: null })
    } else {
      alert("Xóa sản phẩm thất bại");
      this.setState({ isLoading: false });
    }

  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  exportFile = async () => {


    const { activePage,fromDate, endDate, itemPerPage ,company_id,phoneNumber} = this.state;
   
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.EXPORT_ENDUSER,
      method: 'POST',
      data: {
        page: activePage,
        limit: itemPerPage,
        fromDate: fromDate,
        endDate: endDate,
        phoneNumber: phoneNumber,
        company_id: company_id
       
      
      },
      headers: this.state.token
    });

    let data = res.data.data
    this.setState({ isLoading: false });
    this.exportDataExcel(data);

    
}


exportDataExcel (dataReder)  {
  debugger;
var DataExport = dataReder;
var listData =[];
var indexSTT =0;
DataExport.forEach(element => {
        indexSTT ++;
        var item = {
          indexSTT: indexSTT, 
          username: element.username, 
          name: element.name,
          Phone: element.phone, 
          create_Date: element.create_date
        };
        listData.push(item);
 });


let workBook = XLSX.utils.book_new();
const Heading = [
    [
      'STT', 'Tên đăng nhập', 'Họ tên','Số điện thoại', 'Ngày tham gia'
    ]
];
  
const workSheet = XLSX.utils.json_to_sheet(listData,  
    { 
      origin: 'A2', skipHeader: true }
    );
XLSX.utils.sheet_add_aoa(workSheet, Heading, { origin: 'A1' });
XLSX.utils.book_append_sheet(workBook, workSheet, `data`);

let exportFileName = `user.xls`;
 XLSX.writeFile(workBook,exportFileName);

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
  changeCompanySet = (e) => {
    e.preventDefault();
    this.setState({
      company_idSearch: e.target.value,
    });
  };
  render() {
    const { data, arrPagination, key } = this.state;
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify">Danh sách người dùng </i>
                  <div style={styles.tags}>

                 

                  </div>
                </CardHeader>


                <CardBody>
                    <CRow> 

                    <CCol sm="12" lg="6">
                        <Label for="exampleDate">
                        Từ ngày
                        </Label>
                        <Input
                        id="fromDate"
                        name="fromDate"
                       
                        placeholder="date placeholder"
                        type="date"
                        onChange={(e) => {
                       
                        }}
                        />
                        </CCol>
                        <CCol sm="12" lg="6">
<Label for="exampleDate">
     Đến ngày
    </Label>
    <Input
  
      name="endDate"
    
      placeholder="date placeholder"
      type="date"
      onChange={(e) => {
   
      }}
    />
    </CCol>

                    </CRow>
                    <CRow> 

                

                        {

                  this.state.dataCompany.length >0 ? (
                    <CCol sm="12" lg="6">
                    <div className="">
                      <p className="title_filter">Công ty</p>
                    <CSelect onChange={
                      async e => {this.changeCompanySet(e)}
                      
                    } custom size="sm" name="company_idSearch" id="company_idSearch">
                     
                     <option selected  value ="">
 Chọn công ty
</option>
                      {


                         this.state.dataCompany.map((item, i) => {
                          return (
                            <option  value={item._id}>
                             {item.Name}
                            </option>
                          );                     
                            
                          })
                      }
                    </CSelect>
                    
                         
                    </div>
                    </CCol>
                  ) : null
                }

                         <CCol sm="12" lg="6">
                            <div>
                            <p className="title_filter">từ khóa tìm kiếm</p>
                              <Input style={styles.searchInput} onChange={(e) => {
                                this.actionSearch(e, "key");
                              }} name="key" value={key} placeholder="Từ khóa" />
                            </div>
                      </CCol>

                    </CRow>
                    <CRow>
                         
                         
                          <CCol sm="12" lg="6">
                            <CButton color="primary" style={{ width: '100%', marginTop: 5 }} size="sm" onClick={e => { this.resetSearch() }}>Làm mới tìm kiếm</CButton>
                            <CButton color="primary" style={{ width: '100%', marginTop: 5 }} size="sm" onClick={e => { this.exportFile() }}>Xuất file </CButton>
                          </CCol>

                        </CRow>
                  <table ble className="table table-hover table-outline mb-0  d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">STT.</th>
                        <th className="text-center">Tên đăng nhập</th>
                        <th className="text-center">Họ tên</th>
                        <th className="text-center">Số điện thoại</th>

              
                        <th className="text-center">Ngày tham gia </th>

                        <th className="text-center">Điểm đẹp 2 </th>
                        <th className="text-center">Lịch sử soi da</th>
                        
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
                                <td className="text-center">{item.username}</td>
                                 <td className="text-center">{item.name}</td>
                                <td className="text-center">{item.phone}</td>
                    
                                <td className="text-center">
                                  
                                  <p>{(new Date(item.create_date)).toLocaleDateString()} </p> 
                                  <p>{(new Date(item.create_date)).toLocaleTimeString()} </p>
                                  
                                  </td>
                               
                                <td className="text-center">{item.score}</td>
                                <td className="text-center">

<CButton style={styles.mgl5} outline color="primary" size="sm" onClick={async (e) => {
         window.open("https://id.applamdep.com/#lich-su-ca-nhan/"+ item.Phone, "_blank")
         
      }} >
       Lịch sử soi da
     </CButton>

</td>
                                <td className="text-center">
                                  <CButton style={styles.mgl5} outline color="primary" size="sm" onClick={async (e) => await this.openUpdate(item)} >
                                    <CIcon name="cilPencil" />
                                  </CButton>{' '}
                                  <CButton outline color="danger" size="sm" onClick={(e) => { this.openDelete(item) }}>
                                    <CIcon name="cilTrash" />
                                  </CButton>
                                  <CButton outline color="danger" size="sm" onClick={(e) => { this.openHistory(item) }}>
                                    <CIcon name="cilPencil" />
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
                <Pagination count={arrPagination} color="primary" onChange={(e, v) => {
                  this.setState({ data: arrPagination[v - 1], indexPage: v - 1 })
                }} />
              </div>
            </Col>
          </Row>

          <Modal isOpen={this.state.modalCom} className={this.props.className}>
            <ModalHeader>{this.state.action == 'new' ? `Tạo mới` : `Cập nhật`}</ModalHeader>
            <ModalBody>
              <TextFieldGroup
                field="username"
                label="Tên đăng nhập"
                value={this.state.username}
                placeholder={"Tên đăng nhập"}
                // error={errors.title}
                onChange={e => this.onChange("username", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="name"
                label="Email"
                value={this.state.email}
                placeholder={"Email"}
                type={"email"}
                // error={errors.title}
                onChange={e => this.onChange("email", e.target.value)}
              // rows="5"
              />

              <TextFieldGroup
                field="phone"
                label="Số điện thoại"
                value={this.state.phone}
                placeholder={"Số điện thoại"}
                // error={errors.title}
                onChange={e => this.onChange("phone", e.target.value)}
              // rows="5"
              />

            </ModalBody>
            <ModalFooter>
              <CButton color="primary" onClick={e => { this.state.action === 'new' ? this.addRoles() : this.updateUser() }} disabled={this.state.isLoading}>Lưu</CButton>{' '}
              <CButton color="secondary" onClick={e => this.setState({ modalCom: !this.state.modalCom })}>Đóng</CButton>
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
    marginLeft: '5px'
  },
  tags: {
    float: "right",
    marginRight: "5px"
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

export default EndUserv2;
