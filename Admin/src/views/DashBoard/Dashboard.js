import React, { lazy } from 'react'

import {
  CCard,
  CCardBody,
} from '@coreui/react'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {

  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-medium-emphasis">January - July 2021</div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
