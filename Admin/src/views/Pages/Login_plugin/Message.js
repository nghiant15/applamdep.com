import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
import axios from 'axios'
import Constants from "./../../../contants/contants";

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
      email: ''
    }
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
                    Đường dẫn để đặt lại mật khẩu của bạn đã được gửi qua mail !!!
                    <Row style={{ marginTop: 20 }}>
                      <Col xs="12" lg="12" sm="12">
                        <Button color="primary" className="px-4" onClick={() => { window.location.href = "#/login" }}>Trở về đăng nhập</Button>
                      </Col>
                    </Row>
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
