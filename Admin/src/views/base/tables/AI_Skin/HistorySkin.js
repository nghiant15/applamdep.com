import React, { Component } from 'react';
import CIcon from '@coreui/icons-react';
import moment from 'moment'
import {

  CLabel, CSelect, CRow, CCol
} from "@coreui/react";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Label,
  Button,
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
let XLSX = require("xlsx");

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
      fromDate: moment().subtract(1, 'months'), 
      endDate: moment().add(1, 'days'), 

      dataCompany: [],
      company_id: JSON.parse(localStorage.getItem('user')).company_id
    };
    this.closeModal = this.closeModal.bind(this)
  }
  async componentDidMount() {
    this.getAllDataCompany();
    if (this.state.type == '0') {
      this.getData()
    } else {
      this.getData_ByCondition()
    }
    if(this.state.company_id == undefined)
    {
      this.getAllDataCompany();
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

  getData = async () => {
    const {fromDate,endDate, customerName, activePage, itemPerPage ,phoneNumber} = this.state;
   
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_HISTORY_SKIN,
      data: {
        page: activePage,
        fromDate: fromDate,
        customerName: customerName,
        endDate: endDate, 
        limit: itemPerPage,
        phoneNumber: phoneNumber
      },
      method: 'POST'
    });
    let data = res.data.data;

    this.setState({ dataApi: data.data, data: data.data, isLoading: false, itemsCount: data.total });
  }

  getAllDataCompany = async () => {
    const { activePage, fromDate,endDate,customerName, itemPerPage ,phoneNumber} = this.state;

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.List_All_company,
      data: {
        page: activePage,
        limit: itemPerPage,
        customerName: customerName,
        fromDate: fromDate,
        endDate: endDate, 
        phoneNumber: phoneNumber
      },
      method: 'POST'
    });

    let data = res.data;
    this.setState({ dataCompany : data.data.dataCompany });
  }

  

  handlePageChange = async (pageNumber) => {
    const { type } = this.state;
    console.log(type)
    this.setState({ activePage: pageNumber }, () => {
      if (type == '0' || type == '1') {
        this.getData()
      } else {
        this.getData_ByCondition()
      }
    });
  };
  getTimeConver = (datetime) => {
    if(datetime ==null )
            return '';
     return  moment(datetime).format('YYYY-MM-DD');
  
  }
  getData_ByCondition = async () => {
  
    const { activePage, itemPerPage ,endDate,fromDate,company_id,phoneNumber} = this.state;
 
  
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_HISTORY_SKIN,
      method: 'POST',
      data: {
        page: activePage,
        limit: itemPerPage,
        endDate: endDate,
        fromDate: fromDate,
        phoneNumber: phoneNumber,
        company_id: company_id,
      
      },
      headers: this.state.token
    });

    let data = res.data.data

    this.setState({ isLoading: false, itemsCount: data.total, dataApi: data.data, data: data.data });
  }


  searchData = async () => {
  
    const { activePage,fromDate,endDate , itemPerPage ,company_id,phoneNumber,customerName, company_idSearch} = this.state;

    let company_id1 = company_id;
    if(company_idSearch )
    {
      company_id1 = company_idSearch;
    }
 
  
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.LIST_HISTORY_SKIN,
      method: 'POST',
      data: {
        page: activePage,
        limit: itemPerPage,
        fromDate: fromDate,
        endDate: endDate,

        customerName: customerName,
        company_id: company_id1, 

        phoneNumber: phoneNumber,
      
      
      },
      headers: this.state.token
    });

    let data = res.data.data

    this.setState({ isLoading: false, itemsCount: data.total, dataApi: data.data, data: data.data });
  }

  searchKey(key) {
    this.setState({ key: key })

    if (key != '') {
      let d = []
      this.state.dataApi.map(val => {
        if (val.UserName.toLocaleUpperCase().includes(key.toLocaleUpperCase())) {
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
  exportFile = async () => {

    
        const { activePage,fromDate, endDate, itemPerPage,customerName ,company_id,phoneNumber,company_idSearch} = this.state;

        let company_id1 = company_id;
        if(company_idSearch )
        {
          company_id1 = company_idSearch;
        }
        this.setState({ isLoading: true });
        const res = await axios({
          baseURL: Constants.BASE_URL,
          url: Constants.LIST_HISTORY_Skin_export,
          method: 'POST',
          data: {
            page: activePage,
            fromDate: fromDate,
            endDate: endDate,
            limit: itemPerPage,
            customerName: customerName,
            company_id: company_id1, 
    
            phoneNumber: phoneNumber,
           
          
          },
          headers: this.state.token
        });

        let data = res.data.data;
        console.log(data);
        this.exportDataExcel(data);

        
  }


 exportDataExcel (dataReder)  {
  var DataExport = dataReder.data;

  
   var listData =[];
   var indexSTT =0;
    DataExport.forEach(element => {
            indexSTT ++;
            var region =element.dataCheckRegion;
            var regionName = '';
            if(region)
            {
              regionName = region.regionName;
            }
            var x =  this.state.dataCompany.find(x => x._id ===  element.Company_Id);
           
            var compnayName ="";

          
            if(x)
            {
              compnayName  = x.Name;
            }
            var saleText ="";
            
            if(element.saleName !="")
            {
                saleText= compnayName;
                compnayName =  element.saleName;
                

            }


            let connectionType =  '';
            let timetext = '';

            if(element.connectionType =="zalo" ||  element.connectionType =="messenger")
            {
               connectionType=  element.connectionType;
               timetext= (new Date(element.timeConnection)).toLocaleString();
            }
            var item = {
              indexSTT: indexSTT, 
              userName: element.UserName, 
              Phone: element.Phone, 
              Image: element.Image,
              linkDetail: "https://applamdep.com/xemchitietlichsu/"+ element._id,
              Slug: compnayName,
              ipClient: element.ipClient,
              regionName: regionName, 
              create_Date: element.Create_Date,
              SaleName: saleText,
              clickType: connectionType,
              timeclick: timetext


            };
            listData.push(item);
     });
   
 
    let workBook = XLSX.utils.book_new();
    const Heading = [
    [
      'STT', 'Tên', 'Số điện thoại','Link hình ảnh', 'Link xem soi da','Công ty','IP','Tỉnh thành(Dự đoán)', 'Ngày soi da' ,  'SaleName', 'Thông tin click'
    ]
    ];
      
    const workSheet = XLSX.utils.json_to_sheet(listData,  
        { origin: 'A2', skipHeader: true }
        );
    XLSX.utils.sheet_add_aoa(workSheet, Heading, { origin: 'A1' });
    XLSX.utils.book_append_sheet(workBook, workSheet, `data`);

    let exportFileName = `history.xls`;
     XLSX.writeFile(workBook,exportFileName);

}
changeCompanySet = (e) => {
  e.preventDefault();
  this.setState({
    company_idSearch: e.target.value,
  });
};

  render() {
    const arrLevel = [
      {
        item : "1"
      },
      {
        item : "2"
      },
      {
        item : "3"
      },
    ];
   
    const { data, activePage, itemPerPage, itemsCount, toggleHistory, idHistory } = this.state;
     return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify">Lịch sử soi da</i>
              </CardHeader>

              <CRow className="removeMargin"> 

<CCol sm="12" lg="6">
<Label for="exampleDate">
Từ ngày
</Label>
<Input
name="fromDate"
placeholder="date placeholder"
type="date"
onChange={(e) => {
  this.setState({ "fromDate": e.target.value });
}}
value={this.getTimeConver(this.state.fromDate)}
/>
</CCol>
<CCol sm="12" lg="6">
<Label for="endDate">
Đến ngày
</Label>
<Input

name="endDate"
placeholder="date placeholder"
type="date"
onChange={(e) => {
  this.setState({ "endDate": e.target.value });
}}
value={this.getTimeConver(this.state.endDate)}
/>
</CCol>

</CRow>
              <CRow className="removeMargin">
                  <CCol md={3} className="mt">
                    <div className="">
                      <p className="title_filter">Tên khách hàng</p>
                      <Input
                        style={styles1.searchInput}
                        onChange={(e) => {
                          this.setState({ customerName: e.target.value });
                        }}
                        name="customerName"
                        value={this.state.customerName}
                        placeholder="Tên"
                      />
                    </div>
                  </CCol>

                  <CCol md={3} className="mt">
                    <div className="">
                      <p className="title_filter">Số điện thoại</p>
                      <Input
                        style={styles1.searchInput}
                        onChange={(e) => {
                          this.setState({ phoneNumber: e.target.value });
                        }}
                        type="text"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        placeholder="Số điện thoại"
                      />
                    </div>
                  </CCol>
                    {
                      this.state.company_id == undefined  && 1==2   ? <CCol md={3} className="mt">
                      <div className="">
                        <p className="title_filter">Công ty</p>
                        {
                  this.state.dataCompany != undefined ? (
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
                  ) : null
                }
                      </div>
                    </CCol>:<></>
                    }
                  
                
                 
                   
              </CRow>
              <CRow className=" removeMargin searchArea ">
              <Button color="primary"  size="sm" onClick={e => { this.exportFile() }}>Xuất file</Button>
              <Button color="primary"  size="sm" onClick={e => { this.searchData() }}>Tìm kiếm</Button>
                
              </CRow>
              <CardBody>
                <table ble className="table table-hover table-outline mb-0  d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center">STT.</th>
                      <th className="text-center">Tên</th>
                      <th className="text-center">Số điện thoại</th>
                      <th className="text-center">Hình ảnh</th>
                      <th className="text-center"> Tuổi da</th>
                      <th className="text-center">Kết quả</th>
                      <th className="text-center">Thông tin click</th>
                    
                      <th className="text-
                      center">Công ty</th>
                        <th className="text-
                    center">Shop/Sale</th>
                      <th className="text-center">Thông tin</th>
{/*                   
                      <th className="text-center">Sale</th> */}
                      {/* <th className="text-center">Đăng ký tư vấn </th>   */}
                      <th className="text-center">Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <td colSpan="10" hidden={data.length > 0 ? true : false} className="text-center">Không tìm thấy dữ liệu</td>
                    {
                      data != undefined ?
                        data.map((item, i) => {

                          let  resultItem  =JSON.parse (item.Result);

                           let companyName = (  item.Company_Id == "" || item.Company_Id == undefined ? "" : item.Company_Id.Name);
                           let saleNameText = (  item.saleName == "" || item.saleName == undefined ? "" : item.saleName);
                          if(resultItem.data)
                          {
                            resultItem=  resultItem.data;
                          }
                          let nameUser = item.UserName;
                          if(item.Name) 
                          {
                            nameUser =  item.Name;
                          }
                          
                           let connectionType =  '';
                           let timetext = '';

                           if(item.connectionType =="zalo" ||  item.connectionType =="messenger")
                           {
                              connectionType=  item.connectionType;
                              timetext= (new Date(item.timeConnection)).toLocaleString();
                           }
                          return (

                      
                        
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td className="text-center">{nameUser}</td>
                              <td className="text-center">{item.Phone}</td>
                              <td className="text-center">
                               
                                <img src={item.Result != undefined ? resultItem.facedata.image_info.url : ""} style={{ width: '50%', height: 50 }} />
                              </td>
                              <td className="text-center">{resultItem.facedata.generalResult.data[0].data[0].value}</td>
                              <td className="text-center">
                                <CButton outline color="primary" onClick={e => {
                                  this.setState({
                                      idHistory: item._id,
                                      toggleHistory: !toggleHistory
                                    })
                                }}><CIcon name="cil-magnifying-glass" /> Xem chi tiết</CButton>
                              </td>
                            
                                

<td className="text-left displayblock">
    { connectionType != "" && <><span> 
      Loại click:  <strong>{connectionType}</strong>
    </span>
    <span >
      Thời gian: <strong>{timetext}</strong> 

    </span></>}
     
</td>
                              <td className="text-center displayblock ">{
                             
                              }
                              { 
                              saleNameText!="" && (<><span>{ saleNameText} </span></>)
                              
                              
                              }
                            {
                              saleNameText=="" && (<><span>Admin tikitech  </span> </>)
                            }

                              </td>
                              <td className="text-center displayblock ">
                                {companyName}
                         

                            </td>
                              <td className="text-left displayblock">

                                            <span> 
                                              Loại game:  {item.gameType}
                                            </span>
                                            <span >
                                              Địa chỉ: <strong>{item.regionName }</strong> 
                                            
                                            </span>
                                            <span>IP: {item.ipClient }</span>
                                            <span>
                                              Đăng ký tư vấn: {item.typeLogin == "1" ? "Có": ""}
                                            </span>

                                           
                               </td>
                          
                              {/* <td className="text-center">{item.Sale_Id == null ? "ADMIN" : item.Sale_Id.Name}</td> */}
                         
                              <td className="text-center">
                                <p>{(new Date(item.Create_Date)).toLocaleDateString()} </p> 
                                <p>{(new Date(item.Create_Date)).toLocaleTimeString()} </p>
                             
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