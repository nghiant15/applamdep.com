import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CButton,
  CCarousel,
  CCarouselCaption,
  CCarouselControl,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  ModalHeader, ModalBody, ModalFooter, Modal,
} from 'reactstrap';

import slide1 from './../assets/img/slide1.png'
import soida from './../assets/img/SlideSoida.png'
import icon_soida from './../assets/img/soida.png'
import CSKH from './../assets/img/CSKH.png'

import {
  TheHeaderDropdown,
  // TheHeaderDropdownMssg,
  // TheHeaderDropdownNotif,
  // TheHeaderDropdownTasks
} from './index'

const TheHeader = () => {
  const [show, setShow] = useState(true);
  const [close, setClose] = useState(true);
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (
    <CHeader withSubheader>
       
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
  
      <a href="/#/cau-hinh-tu-van"  title=" Bạn cần hỗ trợ gì? Hãy liên hệ với chúng tôi!"> <img src="/images/support.png" style={{width: "40px"}} />Liên hệ </a>

      <CHeaderNav className="d-md-down-none mr-auto">
 
        <CHeaderNavItem className="px-3" >
          {
            localStorage.getItem("type") == "0" || localStorage.getItem("type") == "1" ? "" :
              <CButton color="info" onClick={() => { setShow(true) }} style={{ color: '#ffffff' }}>Hướng dẫn người dùng</CButton>
          }
        </CHeaderNavItem>

     
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {/* <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/> */}
        <TheHeaderDropdown />
      </CHeaderNav>

      {
        localStorage.getItem("isAD") == "0" ? "" :
          <Modal size="xl" isOpen={show}>
            <ModalHeader style={{ alignSelf: 'center' }}>
              <center>
                Cảm ơn bạn đã sử dụng các tính năng AI AR & Quản lý CSKH Trang Quản lý các tính năng
              </center>
              <center>
                (Vui lòng gọi điện về Hotline 0903969952/Nhắn tin CSKH)
              </center>
            </ModalHeader>
            <ModalBody style={{ backgroundColor: 'rgba(52, 52, 52, 0.1)' }}>
              <CCarousel animate onSlideChange={(e) => { e == 2 ? setClose(false) : setClose(true) }}>
                <CCarouselIndicators />
                <CCarouselInner>
                  <CCarouselItem style={{ backgroundImage: "url(" + soida + ")", backgroundSize: "cover" }}>
                    <div className="w-100" style={{ height: '480px' }}>
                      <CCarouselCaption style={{ marginTop: '20px' }}>
                        <img className="border-dark rounded" width="180" height="200" src={icon_soida} alt="slide 2" />
                        <h3 style={{ color: 'red', marginTop: '20px' }}>Quản lý Soi Da AI Online</h3>
                      </CCarouselCaption>
                    </div>
                  </CCarouselItem>
                  <CCarouselItem style={{ backgroundImage: "url(" + slide1 + ")", backgroundSize: "cover" }}>
                    <div className="w-100" style={{ height: '480px' }}>
                      <CCarouselCaption>
                        <img className="border-dark rounded" width="180" height="200" src={"https://tikitech.vn/resources/images/services/lam_app_ban_hang_2.png"} alt="slide 2" />
                        <h3 style={{ color: 'red', marginTop: '20px' }}>Quản lý Trang Điểm AI Online</h3>
                      </CCarouselCaption>
                    </div>
                  </CCarouselItem>
                  <CCarouselItem style={{ backgroundImage: "url(" + CSKH + ")", backgroundSize: "cover" }}>
                    <div className="w-100" style={{ height: '480px' }}>
                      <CCarouselCaption>
                        <img className="border-dark rounded" width="180" height="200" src={"https://tikitech.vn/resources/images/services/cskh_2.png"} alt="slide 2" />
                        <h3 style={{ color: 'red', marginTop: '20px' }}>Quản lý và Chăm Sóc Khách Hàng</h3>
                      </CCarouselCaption>
                    </div>
                  </CCarouselItem>
                </CCarouselInner>
                {
                  close ? <CCarouselControl style={{ opacity: 1, top: 530 }} direction="next">
                    <CButton color="info">
                      Tiếp
                    </CButton>
                  </CCarouselControl> :
                    <CCarouselControl style={{ opacity: 1, top: 530 }} direction="next">
                      <CButton color="success" onClick={e => { setShow(false) }}>Đã hiểu</CButton>
                    </CCarouselControl>
                }
              </CCarousel>
            </ModalBody>

            <ModalFooter style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
              <CButton color="success" style={{ width: 400, marginRight: 150 }} onClick={e => { setShow(false) }}>Bỏ qua</CButton>
            </ModalFooter>
          </Modal>
      }
    </CHeader>
  )
}

export default TheHeader
