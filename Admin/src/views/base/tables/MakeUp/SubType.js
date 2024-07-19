import React, { Component } from 'react';
import CIcon from '@coreui/icons-react'
import lodash from 'lodash';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  ModalHeader, ModalBody, ModalFooter, Modal,
  Input,
  Button
} from 'reactstrap';

import {
  CButton,
  CLabel,
  CSelect,
  CRow,
  CCol,
  CListGroup,
  CListGroupItem,
  CCollapse,
} from '@coreui/react'

import Pagination from '@material-ui/lab/Pagination';
import 'moment-timezone';
import Constants from "../../../../contants/contants";
import TextFieldGroup from "../../../Common/TextFieldGroup";
import axios from 'axios'
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
import API_CONNECT from "../../../../functions/callAPI";
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');

class SubType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      key: '',
      keyColor: '',
      modalCom: false,
      updated: '',
      dataApi: [],
      hidden: false,
      action: 'new',
      vi: '',
      image: '',
      hover: '',
      sub_type: '',
      color_id: [],
      isNull: false,
      modalDelete: false,
      delete: null,
      arrPagination: [],
      arrColor: [],
      arrColorChoose: [],
      arrShowColor: [],
      indexPage: 0,
      token: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      type: localStorage.getItem('type'),
      user: localStorage.getItem('user'),
      isLoading: false,
      collapse: false
    };
  }
  async componentDidMount() {
    const { type } = this.state;
    if (type == '0' || type == '1') {
      this.getData()
    } else {
      this.getData_Company()
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

    console.log(arrTotal[0])

    this.setState({ arrPagination: arrTotal, data: arrTotal[0] });
  }

  getData = async () => {
    this.setState({ isLoading: true });

    const res_product = await API_CONNECT(
      Constants.LIST_TYPE + "/null", {}, "", "GET")

    const res_color = await API_CONNECT(
      Constants.LIST_COLOR_SELECT, { isADMIN: true, company_id: null }, "", "POST")

    let val = res_product.data;

    this.pagination(val);
    this.setState({ dataApi: val, isLoading: false, arrColor: res_color.data, arrColorChoose: res_color.data });

  }

  getData_Company = async () => {
    this.setState({ isLoading: true });
    const res_product = await API_CONNECT(
      Constants.LIST_TYPE_COMPANY + JSON.parse(this.state.user).company_id + "/null", {}, "", "GET")

    const res_color = await API_CONNECT(
      Constants.LIST_COLOR_SELECT, {
      isADMIN: false, company_id: JSON.parse(this.state.user).company_id
    }, "", "POST")

    let val = res_product.data;

    this.pagination(val);
    this.setState({ dataApi: val, isLoading: false, arrColor: res_color.data, arrColorChoose: res_color.data  });
  }

  searchKey() {
    const { indexPage, key } = this.state;
    // this.setState({ key: key })

    if (key != '') {
      let d = []
      this.state.dataApi.map(val => {
        if (val.name.toLocaleUpperCase().includes(key.toLocaleUpperCase()) ||
          val.vi.toLocaleUpperCase().includes(key.toLocaleUpperCase())) {

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

  searchColor() {
    const { keyColor, arrColorChoose, arrColor } = this.state;

    if (keyColor != '') {
      let d = []
      arrColorChoose.map(val => {
        if (val.hex.toLocaleUpperCase().includes(keyColor.toLocaleUpperCase())) {

          d.push(val)
        }
      })

      this.setState({ arrColorChoose: d })
    } else {
      this.setState({ arrColorChoose: arrColor })
    }
  }

  actionSearchColor(e, name_action) {
    this.setState({
      [name_action]: e
    }, () => {
      this.searchColor();
    });
  }

  async toggleModal(key) {
    const { type } = this.state;

    if (type == '0' || type == '1') {
      var res_color = await API_CONNECT(
        Constants.LIST_COLOR, {}, "", "GET")
    } else {
      var res_color = await API_CONNECT(
        Constants.LIST_COLOR_COMPANY + JSON.parse(this.state.user).company_id, {}, "", "GET")
    }

    if (key == 'new') {
      this.setState({
        modalCom: !this.state.modalCom,
        action: key,
        vi: "",
        image: "",
        hover: '',
        arrColorChoose: res_color.data,
        arrShowColor: [],
        collapse: false
      })
    }
  }

  onChange(key, val) {
    this.setState({ [key]: val })
  }

  async addRoles() {
    const { vi, image, hover, sub_type, color_id } = this.state
    if (vi == null || vi == '' ||
      image == null || image == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }

    const body = {
      vi: vi,
      image: image,
      company_id: this.state.type == '0' || this.state.type == '1' ? "" : JSON.parse(this.state.user).company_id,
      hover: hover,
      sub_type: sub_type,
      color_id: color_id
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.ADD_TYPE,
      method: 'POST',
      data: body
    });

    if (res.status == 200) {
      if (this.state.type == '0' || this.state.type == '1') {
        this.getData()
      } else {
        this.getData_Company()
      };
      this.setState({ modalCom: !this.state.modalCom })
    } else {
      alert("Thêm sản phẩm thất bại");
      this.setState({ isLoading: false });
    }
  }

  async openUpdate(item) {
    const { type } = this.state;
    if (type == '0' || type == '1') {
      var res_color = await API_CONNECT(
        Constants.LIST_COLOR, {}, "", "GET")
    } else {
      var res_color = await API_CONNECT(
        Constants.LIST_COLOR_COMPANY + JSON.parse(this.state.user).company_id, {}, "", "GET")
    }

    let arrTemp = [];
    let setData = item.color_id == undefined ? [] : item.color_id
    for (let i = 0; i < setData.length; i++) {
      arrTemp.push(setData[i])
    }

    this.setState({
      modalCom: !this.state.modalCom,
      action: "update",
      vi: item.vi || item.name,
      image: item.image,
      isNull: item.isNull,
      id: item['_id'],
      hover: item.hover,
      sub_type: item.sub_type,
      color_id: item.color_id == undefined ? [] : item.color_id,
      arrColorChoose: res_color.data,
      arrShowColor: arrTemp,
      collapse: false
    })
  }

  async updateUser() {
    const { image, vi, isNull, hover, sub_type, arrShowColor } = this.state
    if (vi == null || vi == '' ||
      image == null || image == '') {
      alert("Vui lòng nhập đầy đủ trường !!!");
      return
    }



    const body = {
      vi: vi,
      image: image,
      id: this.state.id,
      status: isNull,
      hover: hover,
      sub_type: sub_type,
      color_id: arrShowColor
    }

    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.UPDATE_TYPE,
      method: 'POST',
      data: body
    });

    if (res.status == 200) {
      if (this.state.type == '0' || this.state.type == '1') {
        this.getData()
      } else {
        this.getData_Company()
      };
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

  async delete() {
    this.setState({ isLoading: true });
    const res = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.DELETE_TYPE,
      method: 'POST',
      data: {
        "id": this.state.id
      }
    });

    if (res.status == 200) {
      if (this.state.type == '0' || this.state.type == '1') {
        this.getData()
      } else {
        this.getData_Company()
      };
      this.setState({ modalDelete: !this.state.modalDelete, delete: null })
    } else {
      alert("Xóa sản phẩm thất bại");
      this.setState({ isLoading: false });
    }

  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

  onChangeImage(e) {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      this.setState({ image: e.target.result })
    }
  }

  onChooseColor(data) {
    const { arrShowColor, arrColorChoose } = this.state;
    const dataColor = data.split('/')
    arrShowColor.push({ _id: dataColor[0], hex: dataColor[1] })
    lodash.remove(arrColorChoose, {
      hex: dataColor[1]
    });
    this.actionSearchColor('', 'keyColor')
    this.setState({ arrShowColor: arrShowColor, arrColorChoose: arrColorChoose })
  }

  onRemoveColor(data) {
    const { arrShowColor, arrColorChoose } = this.state;

    const dataColor = data.split('/')
    arrColorChoose.push({ _id: dataColor[0], hex: dataColor[1] })

    lodash.remove(arrShowColor, {
      hex: dataColor[1]
    });

    this.setState({ arrShowColor: arrShowColor, arrColorChoose: arrColorChoose })
  }

  renderSelect() {
    const { arrColorChoose, arrShowColor, collapse, keyColor } = this.state;

    return (
      <div>
        <CCollapse show={collapse}>
          <CListGroup>
            <CListGroupItem style={{ backgroundColor: "#000000" }}>
              <Input style={{ width: '100%' }} onChange={(e) => {
                this.actionSearchColor(e.target.value, "keyColor");
              }} name="keyColor" value={keyColor} placeholder="Tìm kiếm" />
            </CListGroupItem>
            <div style={{ height: '200px', overflowY: 'scroll' }}>
              {
                arrColorChoose.map((item, i) => {
                  return (
                    <CListGroupItem style={{ cursor: 'pointer' }} key={i} onClick={() => { this.onChooseColor(item._id + "/" + item.hex) }}>
                      <CRow>
                        <CCol lg="2">{item.hex}</CCol>
                        <CCol lg="10"><div style={{ backgroundColor: item.hex, width: '100%', height: 20 }}></div></CCol>
                      </CRow>
                    </CListGroupItem>
                  );
                })
              }
            </div>
          </CListGroup>
        </CCollapse>

        <CButton
          color="primary"
          style={{ width: '100%' }}
          onClick={() => { this.setState({ collapse: !collapse }) }}
          className={'mb-1'}
        >{
            !collapse ? "Chọn màu" : "Đóng"
          }</CButton>

        <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid black', padding: 10 }}>
          <CLabel style={{ fontWeight: 'bolder' }}>Danh sách màu đã chọn</CLabel>
          <CRow>
            {
              arrShowColor.map((item, i) => {
                return (
                  <CCol xs="3" sm="3" lg="3" key={i}>

                    {item.hex}
                    <div style={{ backgroundColor: item.hex, width: '100%', height: '20px', margin: 1, border: "1px solid black" }}>
                      <div onClick={() => { this.onRemoveColor(item._id + "/" + item.hex) }} style={{ marginTop: 3, cursor: 'pointer', marginLeft: 5, width: 15, height: 15, color: '#ffffff', float: 'right', fontSize: 10 }}>X</div>
                    </div>

                  </CCol>
                );
              })
            }
          </CRow>
        </div>
      </div>
    )
  }

  renderSelectUpdate() {
    const { arrColorChoose, arrShowColor, collapse, keyColor } = this.state;

    for (let i = 0; i < arrShowColor.length; i++) {
      lodash.remove(arrColorChoose, {
        hex: arrShowColor[i].hex
      });
    }

    return (
      <div>
        <CCollapse show={collapse}>
          <CListGroup>
            <CListGroupItem style={{ backgroundColor: "#000000" }}>
              <Input style={{ width: '100%' }} onChange={(e) => {
                this.actionSearchColor(e.target.value, "keyColor");
              }} name="keyColor" value={keyColor} placeholder="Tìm kiếm" />
            </CListGroupItem>
            <div style={{ height: '200px', overflowY: 'scroll' }}>
              {
                arrColorChoose.map((item, i) => {
                  return (
                    <CListGroupItem style={{ cursor: 'pointer' }} key={i} onClick={() => { this.onChooseColor(item._id + "/" + item.hex) }}>
                      <CRow>
                        <CCol lg="2">{item.hex}</CCol>
                        <CCol lg="10"><div style={{ backgroundColor: item.hex, width: '100%', height: 20 }}></div></CCol>
                      </CRow>
                    </CListGroupItem>
                  );
                })
              }
            </div>
          </CListGroup>
        </CCollapse>

        <CButton
          outline
          color="primary"
          style={{ width: '100%' }}
          onClick={() => { this.setState({ collapse: !collapse }) }}
          className={'mb-2'}
        >{
            !collapse ? "Nhấn để chọn màu" : "Đóng"
          }</CButton>

        <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid black', padding: 10 }}>
          <CLabel style={{ fontWeight: 'bolder' }}>Danh sách màu đã chọn</CLabel>
          <CRow>
            {
              arrShowColor.map((item, i) => {
                return (
                  <CCol xs="3" sm="3" lg="3" key={i}>

                    {item.hex}
                    <div style={{ backgroundColor: item.hex, width: '100%', height: '20px', margin: 1, border: "1px solid black" }}>
                      <div onClick={() => { this.onRemoveColor(item._id + "/" + item.hex) }} style={{ marginTop: 3, cursor: 'pointer', marginLeft: 5, width: 15, height: 15, color: '#ffffff', float: 'right', fontSize: 10 }}>X</div>
                    </div>

                  </CCol>
                );
              })
            }
          </CRow>
        </div>
      </div>
    )
  }

  render() {
    const { data, arrPagination, key } = this.state;
    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify">Danh mục</i>
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
                      <CCol sm="12" lg="12">
                        <CButton outline color="primary" style={styles.floatRight} size="sm" onClick={e => this.toggleModal("new")}>Thêm mới</CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CardHeader>
                <CardBody>

                  <table ble className="table table-hover table-outline mb-0  d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">STT.</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Hình ảnh</th>
                        <th className="text-center">Vi</th>
                        <th className="text-center">Màu</th>
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
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">
                                  <img src={item.image} style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td className="text-center">{item.vi}</td>
                                <td className="text-center" style={{ width: 200 }}>
                                  {item.color_id == undefined ? 0 : item.color_id.length}
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
            </Col>
          </Row>

          <Modal size="lg" isOpen={this.state.modalCom} className={this.props.className}>
            <ModalHeader>{this.state.action == 'new' ? `Tạo mới` : `Cập nhật`}</ModalHeader>
            <ModalBody>
              <TextFieldGroup
                field="vi"
                label="Tên"
                value={this.state.vi}
                placeholder={"Tên"}
                onChange={e => this.onChange("vi", e.target.value)}
              />

              <TextFieldGroup
                field="image"
                label="Ảnh thương hiệu"
                type={"file"}
                onChange={e => { this.onChangeImage(e) }}
                onClick={(e) => { e.target.value = null }}
              />
              {
                this.state.image == "" ? "" :
                  <img width="100" height="150" src={this.state.image} style={{ marginBottom: 20 }} />
              }

              {/* <TextFieldGroup
                field="hover"
                label="Hover"
                value={this.state.hover}
                placeholder={"Hover"}
                // error={errors.title}
                onChange={e => this.onChange("hover", e.target.value)}
              // rows="5"
              /> */}

              <div>
                <CLabel>Loại danh mục</CLabel>
                <div style={{ width: "100%" }}>
                  <CSelect onChange={async e => { this.setState({ sub_type: e.target.value }) }} custom size="sm" name="selectSm" id="SelectLm">
                    <option>-----</option>
                    {
                      ["0", "1"].map((item, i) => {
                        if (item == this.state.sub_type) {
                          return (
                            <option selected key={i} value={item}>{item == "0" ? "Make Up" : "Tóc"}</option>
                          );
                        } else {
                          return (
                            <option key={i} value={item}>{item == "0" ? "Make Up" : "Tóc"}</option>
                          );
                        }
                      })
                    }
                  </CSelect>
                </div>
              </div>

              <div>
                <CLabel>Chọn màu</CLabel>
                <div style={{ width: "100%" }}>
                  {
                    this.state.action == 'new' ? this.renderSelect() : this.renderSelectUpdate()
                  }
                </div>
              </div>
              {/* {
                this.state.action == 'new' ? "" :
                  <div>
                    <CLabel>Ẩn danh mục ?</CLabel>
                    <div style={{ width: "100%" }}>
                      <CSelect onChange={async e => { this.setState({ brand_id: e.target.value }) }} custom size="sm" name="selectSm" id="SelectLm">
                        {
                          [true, false].map((item, i) => {
                            if (item == this.state.isNull) {
                              return (
                                <option selected key={i} value={item}>{String(item)}</option>
                              );
                            } else {
                              return (
                                <option key={i} value={item}>{String(item)}</option>
                              );
                            }
                          })
                        }
                      </CSelect>
                    </div>
                  </div>

              } */}

            </ModalBody>
            <ModalFooter>
              <CButton color="primary" onClick={e => {
                this.state.action === 'new' ? this.addRoles() : this.updateUser()
              }} disabled={this.state.isLoading}>Lưu</CButton>{' '}
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
    marginLeft: '5px'
  },
  tags: {
    float: "right",
    marginRight: "5px"
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

export default SubType;
