import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

import {
  CLabel,
  CRow,
  CCol,
} from '@coreui/react'
import 'moment-timezone';
import "react-datepicker/dist/react-datepicker.css";
import API_CONNECT from "../../../../functions/callAPI";
import Constants from "./../../../../contants/contants";
import TextFieldGroup from "../../../Common/TextFieldGroup";
import { css } from "@emotion/react";
import DotLoader from "react-spinners/DotLoader";
let headers = new Headers();
const auth = localStorage.getItem('auth');
headers.append('Authorization', 'Bearer ' + auth);
headers.append('Content-Type', 'application/json');
class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      company_id: JSON.parse(localStorage.getItem('user')).company_id,
      isLoading: false,
      banner: "",
      sub_banner: "",
      image_banner: "",
      image_sub_banner: "",
      link_banner: "",
      link_sub_banner: ""
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
    const { company_id } = this.state;
    this.setState({ isLoading: true });
    const res = await API_CONNECT(Constants.GET_BANNER, { company_id: company_id }, "", "POST")

    let data = res.data;

    this.setState({ isLoading: false, banner: data.banner, sub_banner: data.sub_banner });
  }

  onChangeImageBanner(e) {
    const { company_id, link_sub_banner, sub_banner } = this.state;

    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      this.setState({ banner: "", image_banner: e.target.result, link_banner: `${Constants.BASE_URL}/public/image_banner/${files[0].name}`}, async () => {
        const form = new FormData();
        form.append("image", files[0]);

        await API_CONNECT(Constants.UPLOAD_BANNER, form, "", "POST")
        await API_CONNECT(Constants.ADD_BANNER, {
          company_id: company_id,
          banner: `${Constants.BASE_URL}/public/image_banner/${files[0].name}`,
          sub_banner: link_sub_banner != "" ? link_sub_banner : sub_banner
        }, "", "POST")
      })
    }
  }

  onChangeImageSubBanner(e) {
    const { company_id, link_banner, banner } = this.state;

    let files = e.target.files;
    let reader = new FileReader();
    this.setState({ sub_banner: "" })
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      this.setState({ sub_banner: "", image_sub_banner: e.target.result, link_sub_banner: `${Constants.BASE_URL}/public/image_banner/${files[0].name}` }, async () => {
        const form = new FormData();
        form.append("image", files[0]);

        await API_CONNECT(Constants.UPLOAD_BANNER, form, "", "POST")
        await API_CONNECT(Constants.ADD_BANNER, {
          company_id: company_id,
          banner: link_banner != "" ? link_banner : banner,
          sub_banner: `${Constants.BASE_URL}/public/image_banner/${files[0].name}`
        }, "", "POST")
      })
    }
  }

  render() {
    const { banner, sub_banner, image_banner, image_sub_banner } = this.state;

    if (!this.state.isLoading) {
      return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  THÔNG TIN BANNER
                </CardHeader>
                <CardBody>
                  <CRow>
                    <CCol sm="12" lg="12">
                      <CRow>
                        <CCol sm="12" lg="12">
                          <CLabel><strong>Banner chính: <a href={`${banner}`}>{`${banner}`}</a></strong></CLabel>
                          <TextFieldGroup
                            field="image"
                            type={"file"}
                            onChange={e => { this.onChangeImageBanner(e) }}
                          />
                          {
                            banner != "" ?
                              <img width="100%" height="400" src={`${banner}`} style={{ marginBottom: 20, paddingLeft: 150, paddingRight: 150 }} /> :
                              <img width="100%" height="400" src={`${image_banner}`} style={{ marginBottom: 20, paddingLeft: 150, paddingRight: 150 }} onError={(e)=>{e.target.onerror = null; e.target.src="https://aina.vn/wp-content/uploads/2021/08/default-image-620x600-1.jpg"}}/>
                          }
                        </CCol>
                        <CCol sm="12" lg="12">
                          <CLabel><strong>Banner phụ: <a href={`${sub_banner}`}>{`${sub_banner}`}</a></strong></CLabel>
                          <TextFieldGroup
                            field="image"
                            type={"file"}
                            onChange={e => { this.onChangeImageSubBanner(e) }}
                          />
                          {
                            sub_banner != "" ?
                              <img width="100%" height="400" src={`${sub_banner}`} style={{ marginBottom: 20, paddingLeft: 150, paddingRight: 150 }} /> :
                              <img width="100%" height="400" src={`${image_sub_banner}`} style={{ marginBottom: 20, paddingLeft: 150, paddingRight: 150 }} onError={(e)=>{e.target.onerror = null; e.target.src="https://aina.vn/wp-content/uploads/2021/08/default-image-620x600-1.jpg"}}/>
                          }

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

export default Banner;
