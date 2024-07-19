import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import axios from 'axios'
import Constants from "./../../../contants/contants";
import Logo from "./../../../../src/assets/img/logo_head.png";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password_cf: '',
    }
  }

  async componentDidMount() {
    const check = await axios({
      baseURL: Constants.BASE_URL,
      url: Constants.PLUGIN_CHECK_LINK,
      method: 'POST',
      data: {
        code: window.location.hash.split("/")[2]
      }
    });

    if (check.data.status != 200) {
      window.location.href = "#/login"
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    if(this.state.password == this.state.password_cf){
      const res = await axios({
        baseURL: Constants.BASE_URL,
        url: Constants.PLUGIN_CHANGE_PASSWORD,
        method: 'POST',
        data: {
          code: window.location.hash.split("/")[2],
          password: this.state.password
        }
      });

      if (res.status == 200) {
        window.location.href = "#/login"
      }
    } else {
      alert("Mật khẩu không khớp")
    }

  }

  onChange(e, name) {
    this.setState({ [name]: e.target.value });
  }

  render() {
    const { errors, isLoading } = this.state;
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <form onSubmit={async e => await this.onSubmit(e)}>
                      <h1>Quên mật khẩu</h1>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Nhập mật khẩu" name="password" onChange={e => this.onChange(e, 'password')}/>
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Nhập lại mật khẩu" name="password" onChange={e => this.onChange(e, 'password_cf')}/>
                      </CInputGroup>

                      <Row>
                        <Col xs="12" lg="12" sm="12">
                          <Button color="primary" className="px-4" >Đặt lại mật khẩu</Button>
                        </Col>
                      </Row>

                    </form>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}
export default Login;
