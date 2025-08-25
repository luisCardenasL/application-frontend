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
import '../../../assets/images/Fachada-UNEFA-1000x600.jpeg' // Import para asegurar que Vite procese la imagen

import { useState } from 'react'

// Estilo para el fondo
const forgotBgStyle = {
  backgroundImage: `url('/src/assets/images/Fachada-UNEFA-1000x600.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

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
    <div className="forgot-bg min-vh-100 d-flex flex-row align-items-center" style={forgotBgStyle}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>¿Olvidaste tu contraseña?</h1>
                  <p className="text-body-secondary">Restaura tu contraseña</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput onChange={handleChange} name='email' placeholder="Correo electrónico" value={restoreUser.email} autoComplete="email" />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color='success' type='submit'>Confirmar</CButton>
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
