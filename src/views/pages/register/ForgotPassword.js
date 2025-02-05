import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
import helpFetch from '../../../hooks/helpFetch'

import { useState } from 'react'

const Register = () => {
  let navigate = useNavigate()
  const API = helpFetch()
  const [restoreUser, setRestoreUser] = useState({
    email: '',
  })
  const [isRestored,setRestored] = useState(false);

  const handleChange = (e) => {
    setRestoreUser({
      ...restoreUser,
      [e.target.name]: e.target.value,
    })
    console.log(restoreUser)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('hola: ',restoreUser)
    restorePassword(restoreUser)
    console.log('hola')
  }

  const restorePassword = async (user) =>
  {
    console.log(user)
    const options = {
      body: user
    }
    await API.put('restorePassword',options).then(resp => {
      if(!resp.error) setRestored(true)
    })
  }

  useEffect(() => {
    if(isRestored){
      return navigate("/login");
    }
  },[isRestored])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
          <CCard className="mx-4">
              <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                  <h1>Forgot Password?</h1>
                  <p className="text-body-secondary">Restore your password</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput onChange={handleChange} name='email' placeholder="Email" value={restoreUser.email} autoComplete="email" />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color='success' type='submit'>Confirm </CButton>
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
