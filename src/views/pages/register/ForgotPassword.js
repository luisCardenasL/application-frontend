import React from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import PasswordRecuperationModal from '../../../components/PasswordRecuperationModal'

import { useState } from 'react'

const Register = () => {

  const [email, setEmail] = useState()

const handleChange = (e) => {
  setEmail(e.target.value)
  console.log(email)
}

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Forgot Password?</h1>
                  <p className="text-body-secondary">Restore your password</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput onChange={handleChange} name='email' placeholder="Email" value={email} autoComplete="email" />
                  </CInputGroup>
                  <div className="d-grid">
                    <PasswordRecuperationModal email={email}/>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
