import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import react from 'react'
import helpFetch from '../../../hooks/helpFetch'
import fondo from '../../../assets/images/Fachada-UNEFA-1000x600.jpeg' // Import para asegurar que Vite procese la imagen

// Agregar estilos en línea para el fondo
const loginBgStyle = {
  backgroundImage: `url(${fondo})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [isLogged,setLogged] = useState(false);
  let navigate = useNavigate();

  const API = helpFetch()

  const verifyUser = async() => {
    await API.get('verify').then((resp) => {
      if(!resp.error) setLogged(true)
    })
  }

  useEffect(()=> {
    verifyUser()
  },[])

  useEffect(() => {
    console.log(isLogged)
    if(isLogged) return navigate('/dashboard')
  },[isLogged])

  const login = async () => {
    const options = {
      body: user,
    }
    await API.post('login',options).then((resp) => {
      if(!resp.error) {
        console.log("logeado")
        setLogged(true)
      }
    })
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login();
  }

  return (
    <div className="login-bg min-vh-100 d-flex flex-row align-items-center" style={loginBgStyle}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Iniciar Sesión</h1>
                    <p className="text-body-secondary">Accede a tu cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Correo electrónico"
                      name='email'
                       onChange={handleChange}
                       value={user.email}
                       autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name='password'
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          type="submit"
                          className="px-4"
                          active
                          tabIndex={-1}
                        >
                          Iniciar Sesión
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/recuperation">
                          <CButton color="link" className="px-0">
                            ¿Olvidaste tu contraseña?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
