import React from 'react'
import PropTypes from 'prop-types'
import Iframes from 'react-iframe'

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

function Iframe({ toggleView, link, closeModal }) {

  const handleClose = () => {
    if (closeModal) {
      closeModal();
    }
  }

  return (
    <CModal
      show={toggleView}
      size="xl"
    >
      <CModalHeader closeButton>
        <CModalTitle>Chi tiết soi da</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Iframes url={link}
          width="100%"
          height="500px"
          display="initial"
          position="relative" />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => { handleClose() }}>Đóng</CButton>
      </CModalFooter>
    </CModal>
  )
}

Iframe.propTypes = {
  link: PropTypes.string,
  toggleView: PropTypes.bool
}

Iframe.defaultProps = {
  link: "",
  toggleView: false
};

export default Iframe

