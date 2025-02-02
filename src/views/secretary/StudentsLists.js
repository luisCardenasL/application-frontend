import React, { useState } from 'react'
import classNames from 'classnames'

import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CProgress,
    CRow,
    CSpinner,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CInputGroup,
    CInputGroupText,
    CFormSelect,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import { cilPeople, cilLockLocked, cilUser } from '@coreui/icons'

  import Loader from '../../components/Loader'

const StudentLists = () => {
    const [loading,setLoading] = useState(false)

    return(
        <>
        <CCard className="mb-4">
        <CCardHeader>List of Student</CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary">Student_Cod</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">ID_Document</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Militar</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Carrer</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Modify</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Delete</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {loading && <Loader></Loader>}
          </CTable>
        </CCardBody>
      </CCard>
        </>
    )
}

export default StudentLists