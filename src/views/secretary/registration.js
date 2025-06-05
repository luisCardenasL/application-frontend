import React from 'react'
import classNames from 'classnames'
import { useEffect, useState, useRef } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

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
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilLockLocked, cilUser } from '@coreui/icons'

import helpFetch from '../../hooks/helpFetch'

const Registration = () => {
  const [nationalities, setNationalities] = useState([])
  const [civilStatus, setCivilStatus] = useState([])
  const [states, setStates] = useState([])
  const [stateSelected, setStateSelected] = useState(false)
  const [municipalities, setMunicipalities] = useState([
    { label: 'Select Residence Munipality', value: 0 },
  ])
  const [munSelected, setMunSelected] = useState(false)
  const [parroquies, setParroquies] = useState([{ label: 'Select Residence Parroquies', value: 0 }])
  const [universities, setUniversities] = useState([])
  const [gradMentions, setGradMentions] = useState([])
  const [militarComponents, setMilitarComp] = useState([])
  const [milCompSelected, setMilCompSelected] = useState(false)
  const [militarGrades, setMilitarGrades] = useState([{ label: 'Select Militar Grade', value: 0 }])
  const [periods, setPeriods] = useState([])
  const [careerCods, setCareerCods] = useState([])
  const [secretaryStaff, setSecretaryStaff] = useState([])
  const [toast, addToast] = useState()
  const toaster = useRef(null)
  const API = helpFetch()

  const [studentData, setStudentData] = useState({
    TSTcodst: '',
    TSTiddoc: null,
    TSTfirna: '',
    TSTmidna: '',
    TSTthrna: '',
    TSTfltna: '',
    TSTsltna: '',
    TSTgenst: 'M',
    TSTmstid: 0,
    TSTnacid: 0,
    TSTrstid: 0,
    TSTbidat: '',
    TSTresad: '',
    TSTparid: 0,
    TSTemail: '',
    TSTretel: '',
    TSTcetel: '',
    TSTmilpe: false,
    TSTiddfo: false,
    TSTminfo: false,
    TSTorare: false,
    TSTphoto: false,
    TSTorcbc: false,
    TSTtsang: 'A+',
    TSTtyidd: 'V',
    TSTuniid: 0,
    TSTgrady: '',
    TSTagrad: '',
    TSTgrmid: 0,
    TMTperid: 0,
    TMTproid: 0,
    TMTschsh: false,
    TMTpadat: '',
    TMTnrece: 0,
    TMTpaamo: 0,
    TMTregby: 1,
  })

  const getNationalities = async () => {
    await API.get('nationalities').then((response) => {
      console.log(response.msg)
      if (!response.error) setNationalities(response.msg)
    })
  }

  const getCivilStatus = async () => {
    await API.get('civilStatus').then((response) => {
      console.log(response.msg)
      if (!response.error) setCivilStatus(response.msg)
    })
  }

  const getStates = async () => {
    await API.get('states').then((response) => {
      console.log(response.msg)
      if (!response.error) setStates(response.msg)
    })
  }

  const getMunicipalities = async (stateID) => {
    await API.get(`municipalities/${stateID}`).then((response) => {
      console.log(response.msg)
      if (!response.error) setMunicipalities(response.msg)
    })
  }

  const getParroquies = async (munID) => {
    await API.get(`parroquies/${munID}`).then((response) => {
      console.log(response.msg)
      if (!response.error) setParroquies(response.msg)
    })
  }

  const getUniversities = async () => {
    await API.get('universities').then((response) => {
      console.log(response.msg)
      if (!response.error) setUniversities(response.msg)
    })
  }

  const getGradMentions = async () => {
    await API.get('gradMention').then((response) => {
      console.log(response.msg)
      if (!response.error) setGradMentions(response.msg)
    })
  }

  const getMilitarComp = async () => {
    await API.get('militarComponent').then((response) => {
      console.log(response.msg)
      if (!response.error) setMilitarComp(response.msg)
    })
  }

  const getMilitarGrades = async (milCompID) => {
    await API.get(`militarGrades/${milCompID}`).then((response) => {
      console.log(response.msg)
      if (!response.error) setMilitarGrades(response.msg)
    })
  }

  const getPeriods = async () => {
    await API.get('periods').then((response) => {
      console.log(response.msg)
      if (!response.error) setPeriods(response.msg)
    })
  }

  const getCareerCods = async () => {
    await API.get('careerCods').then((response) => {
      console.log(response.msg)
      if (!response.error) setCareerCods(response.msg)
    })
  }

  const getSecretaryStaff = async () => {
    await API.get('secretaryStaff').then((response) => {
      console.log(response.msg)
      if (!response.error) setSecretaryStaff(response.msg)
    })
  }

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    })
    console.log(studentData)
  }

  const handleChangeTelf1 = (value) => {
    setStudentData({
      ...studentData,
      TSTcetel: value,
    })
    console.log(studentData)
  }

  const handleChangeTelf2 = (value) => {
    setStudentData({
      ...studentData,
      TSTretel: value,
    })
    console.log(studentData)
  }

  const handleChangeState = (e) => {
    handleChange(e)
    setMunicipalities([{ label: 'Select Residence Munipality', value: 0 }])
    setParroquies([{ label: 'Select Residence Munipality', value: 0 }])
    setMunSelected(false)
    if (e.target.value == 0) {
      setStateSelected(false)
    } else {
      setStateSelected(true)
      getMunicipalities(e.target.value)
    }
  }

  const handleChangeMunicipality = (e) => {
    handleChange(e)
    setParroquies([{ label: 'Select Residence Munipality', value: 0 }])
    if (e.target.value == 0) {
      setMunSelected(false)
    } else {
      setMunSelected(true)
      getParroquies(e.target.value)
    }
  }

  const handleChangeMilComponent = (e) => {
    handleChange(e)
    setMilitarGrades([{ label: 'Select Militar Grade', value: 0 }])
    if (e.target.value == 0) {
      setMilCompSelected(false)
    } else {
      setMilCompSelected(true)
      getMilitarGrades(e.target.value)
    }
  }

  const addStudent = (student) => {
    const options = {
      body: student,
    }
    API.post('students', options).then((resp) => {
      if (!resp.error) {
        addToast(successToast)
        setStudentData({
          TSTcodst: '',
          TSTiddoc: null,
          TSTfirna: '',
          TSTmidna: '',
          TSTthrna: '',
          TSTfltna: '',
          TSTsltna: '',
          TSTgenst: 'M',
          TSTmstid: 0,
          TSTnacid: 0,
          TSTrstid: 0,
          TSTbidat: '',
          TSTresad: '',
          TSTparid: 0,
          TSTemail: '',
          TSTretel: '',
          TSTcetel: '',
          TSTmilpe: false,
          TSTiddfo: false,
          TSTminfo: false,
          TSTorare: false,
          TSTphoto: false,
          TSTorcbc: false,
          TSTtsang: 'A+',
          TSTtyidd: 'V',
          TSTuniid: 0,
          TSTgrady: '',
          TSTagrad: '',
          TSTgrmid: 0,
          TMTperid: 0,
          TMTproid: 0,
          TMTschsh: false,
          TMTpadat: '',
          TMTnrece: 0,
          TMTpaamo: 0,
          TMTregby: 0,
        })
      } else addToast(failedToast)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    studentData.TSTcodst = `${studentData.TMTperid}-${studentData.TSTtyidd}-${studentData.TSTiddoc}`
    addStudent(studentData)
  }

  useEffect(() => {
    getNationalities()
    getCivilStatus()
    getStates()
    getUniversities()
    getGradMentions()
    getMilitarComp()
    getPeriods()
    getCareerCods()
    getSecretaryStaff()
  }, [])

  const successToast = (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto">Successful Registration</div>
      </CToastHeader>
      <CToastBody>THe student has been registered successfully</CToastBody>
    </CToast>
  )

  const failedToast = (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto">Inscripción Fallida</div>
      </CToastHeader>
      <CToastBody>Algo salio mal, intente otra vez</CToastBody>
    </CToast>
  )

  return (
    <>
      <CForm className="p-4" onSubmit={handleSubmit}>
        <CTabs activeItemKey="PData">
          <CTabList variant="pills" layout="fill">
            <CTab itemKey="PData">Datos Personales</CTab>
            <CTab itemKey="CData">Información de Residencia y Contacto</CTab>
            <CTab itemKey="AData">Datos Academicos</CTab>
            <CTab itemKey="Register">Inscripción</CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel transition className="p-3" itemKey="PData">
              <CCard className="mb-4">
                <CCardHeader>Informacion Personal</CCardHeader>

                <CInputGroup>
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    value={studentData.TSTfirna}
                    name="TSTfirna"
                    onChange={handleChange}
                    type="text"
                    placeholder="Primer Nombre"
                    autoComplete="name"
                  />
                  <CFormInput
                    value={studentData.TSTmidna}
                    name="TSTmidna"
                    onChange={handleChange}
                    type="text"
                    placeholder="Segundo Nombre"
                    autoComplete="name"
                  />
                  <CFormInput
                    value={studentData.TSTthrna}
                    name="TSTthrna"
                    onChange={handleChange}
                    type="text"
                    placeholder="Tercer Nombre"
                    autoComplete="name"
                  />
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CFormInput
                    value={studentData.TSTfltna}
                    name="TSTfltna"
                    onChange={handleChange}
                    type="text"
                    placeholder="Primer Apellido"
                    autoComplete="lastname"
                  />
                  <CFormInput
                    value={studentData.TSTsltna}
                    name="TSTsltna"
                    onChange={handleChange}
                    type="text"
                    placeholder="Segundo Apellido"
                    autoComplete="lastname"
                  />
                </CInputGroup>
                <br></br>
                <CInputGroup>
                  <CInputGroupText>Documento de Identificación</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectID"
                    value={studentData.TSTtyidd}
                    name="TSTtyidd"
                    onChange={handleChange}
                  >
                    <option>Elija el Tipo de Documento...</option>
                    <option value="V">Venezolano (V)</option>
                    <option value="E">Extranjero (E)</option>
                    <option value="Passport">Pasaporte</option>
                  </CFormSelect>
                  <CFormInput
                    value={studentData.TSTiddoc}
                    name="TSTiddoc"
                    onChange={handleChange}
                    type="number"
                    placeholder="Número de Documento"
                  />
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Nacionalidad</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectNationality"
                    value={studentData.TSTnacid}
                    name="TSTnacid"
                    onChange={handleChange}
                    options={nationalities}
                  ></CFormSelect>
                </CInputGroup>
                <br />

                <CInputGroup className="mb-3">
                  <CInputGroupText as="label">Género</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectGender"
                    value={studentData.TSTgenst}
                    name="TSTgenst"
                    onChange={handleChange}
                  >
                    <option>Seleccione el Género...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </CFormSelect>
                </CInputGroup>
                <CInputGroup>
                  <CInputGroupText>Fecha de Nacimiento</CInputGroupText>
                  <CFormInput
                    type="date"
                    placeholder="Birth dare"
                    value={studentData.TSTbidat}
                    name="TSTbidat"
                    onChange={handleChange}
                  />
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText as="label">Estado Civil</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectBlood"
                    value={studentData.TSTmstid}
                    name="TSTmstid"
                    onChange={handleChange}
                    options={civilStatus}
                  ></CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText as="label">Tipo de Sangre</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectBlood"
                    value={studentData.TSTtsang}
                    name="TSTtsang"
                    onChange={handleChange}
                  >
                    <option>Seleccione el tipo de Sangre</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </CFormSelect>
                </CInputGroup>
              </CCard>
              <br />
              <div className="d-flex justify-content-end">
                <CTab itemKey="CData">
                  <CButton color="primary">Siguiente</CButton>
                </CTab>
              </div>
            </CTabPanel>
            <CTabPanel transition className="p-3" itemKey="CData">
              <CCard className="mb-4">
                <CCardHeader>Información de Residencia</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Lugar de Residencia</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectState"
                    options={states}
                    onChange={handleChangeState}
                  ></CFormSelect>
                  <CFormSelect
                    id="inputGroupSelectMunicipality"
                    options={municipalities}
                    disabled={!stateSelected}
                    onChange={handleChangeMunicipality}
                  ></CFormSelect>
                  <CFormSelect
                    id="inputGroupSelectParroquies"
                    options={parroquies}
                    disabled={!munSelected}
                    value={studentData.TSTparid}
                    name="TSTparid"
                    onChange={handleChange}
                  ></CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Estado de Residencia</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectResStatus"
                    value={studentData.TSTrstid}
                    name="TSTrstid"
                    onChange={handleChange}
                  >
                    <option>Seleccione el Estado de Residencia...</option>
                    <option value="1">Permanente</option>
                    <option value="2">Temporal</option>
                  </CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Dirección</CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Ej. Avenida Principal Los Naranjos Calle B "
                    value={studentData.TSTresad}
                    name="TSTresad"
                    onChange={handleChange}
                  ></CFormInput>
                </CInputGroup>
                <br />
              </CCard>
              <CCard className="mb-4">
                <CCardHeader>Información de Contacto</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Correo</CInputGroupText>
                  <CFormInput
                    type="email"
                    placeholder="example@email.com"
                    value={studentData.TSTemail}
                    name="TSTemail"
                    onChange={handleChange}
                  ></CFormInput>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Teléfono Celular</CInputGroupText>
                  <PhoneInput
                    className="form-control p-0"
                    placeholder="Ingresar N° de Teléfono"
                    defaultCountry="VE"
                    value={studentData.TSTcetel}
                    name="TSTcetel"
                    onChange={handleChangeTelf1}
                  />
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Teléfono de Residencia</CInputGroupText>
                  <PhoneInput
                    className="form-control p-0"
                    placeholder="Ingresar N° de Teléfono"
                    defaultCountry="VE"
                    value={studentData.TSTretel}
                    name="TSTretel"
                    onChange={handleChangeTelf2}
                  />
                </CInputGroup>
                <br />
              </CCard>
              <br></br>
              <div className="d-flex justify-content-between">
                <CTab itemKey="PData">
                  <CButton color="primary">Anterior</CButton>
                </CTab>
                <CTab itemKey="AData">
                  <CButton color="primary">Siguiente</CButton>
                </CTab>
              </div>
            </CTabPanel>
            <CTabPanel transition className="p-3" itemKey="AData">
              <CCard className="mb-4">
                <CCardHeader>Información Académica</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Universidad de Procedencia</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectAcaStr"
                    options={universities}
                    value={studentData.TSTuniid}
                    name="TSTuniid"
                    onChange={handleChange}
                  ></CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Año de Graduación</CInputGroupText>
                  <CFormInput
                    placeholder="20XX"
                    type="year"
                    value={studentData.TSTgrady}
                    name="TSTgrady"
                    onChange={handleChange}
                  ></CFormInput>
                  <CInputGroupText>Mención</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectAcaStr"
                    options={gradMentions}
                    value={studentData.TSTgrmid}
                    name="TSTgrmid"
                    onChange={handleChange}
                  ></CFormSelect>
                  <CInputGroupText>Nota Promedio</CInputGroupText>
                  <CFormInput
                    placeholder="01-20"
                    type="number"
                    value={studentData.TSTagrad}
                    name="TSTagrad"
                    onChange={handleChange}
                  ></CFormInput>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Condición del Estudiante</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelect"
                    value={studentData.TSTmilpe}
                    name="TSTmilpe"
                    onChange={handleChange}
                  >
                    <option>Seleccione Condición del Estudiante...</option>
                    <option value="false">Civil</option>
                    <option value="true">Militar</option>
                  </CFormSelect>
                  <CInputGroupText>Componente Militar</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelect"
                    options={militarComponents}
                    onChange={handleChangeMilComponent}
                  ></CFormSelect>
                  <CInputGroupText>Grado Militar</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelect"
                    disabled={!milCompSelected}
                    options={militarGrades}
                  ></CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Periodo Académico Inicial</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelect"
                    options={periods}
                    value={studentData.TMTperid}
                    name="TMTperid"
                    onChange={handleChange}
                  ></CFormSelect>
                </CInputGroup>
                <br />
              </CCard>
              <CCard className="mb-4">
                <CCardHeader>Documentos</CCardHeader>
                <div className="p-4">
                  <CFormCheck
                    label="Copia de Documento de Identidad"
                    value={studentData.TSTiddfo}
                    name="TSTiddfo"
                    onChange={handleChange}
                  />
                  <CFormCheck
                    label="Fotocopia de la Inscripción Militar"
                    value={studentData.TSTminfo}
                    name="TSTminfo"
                    onChange={handleChange}
                  />
                  <CFormCheck
                    label="Record Académico Original"
                    value={studentData.TSTorare}
                    name="TSTorare"
                    onChange={handleChange}
                  />
                  <CFormCheck
                    label="Fotos"
                    value={studentData.TSTphoto}
                    name="TSTphoto"
                    onChange={handleChange}
                  />
                  <CFormCheck
                    label="Copia Original del Acta de Nacimiento"
                    value={studentData.TSTorcbc}
                    name="TSTorcbc"
                    onChange={handleChange}
                  />
                </div>
              </CCard>
              <br />
              <div className="d-flex justify-content-between">
                <CTab itemKey="CData">
                  <CButton color="primary">Anterior</CButton>
                </CTab>
                <CTab itemKey="Register">
                  <CButton color="primary">Siguiente</CButton>
                </CTab>
              </div>
            </CTabPanel>

            <CTabPanel transition className="p-3" itemKey="Register">
              <CCard className="mb-4">
                <CCardHeader>Inscripción</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Periodo Académico</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelect"
                    options={periods}
                    value={studentData.TMTperid}
                    name="TMTperid"
                    onChange={handleChange}
                  ></CFormSelect>
                  <CInputGroupText>Código de Carrera</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelect"
                    options={careerCods}
                    value={studentData.TMTproid}
                    name="TMTproid"
                    onChange={handleChange}
                  ></CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Registrado por: </CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelect"
                    options={secretaryStaff}
                    value={studentData.TMTregby}
                    name="TMTregby"
                    onChange={handleChange}
                  ></CFormSelect>
                </CInputGroup>
              </CCard>
              <CCard className="mb-4">
                <CCardHeader>Informacion de Pago</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Fecha de Pago</CInputGroupText>
                  <CFormInput
                    type="date"
                    value={studentData.TMTpadat}
                    name="TMTpadat"
                    onChange={handleChange}
                  ></CFormInput>
                  <CInputGroupText>N° Receipt</CInputGroupText>
                  <CFormInput
                    type="number"
                    value={studentData.TMTnrece}
                    name="TMTnrece"
                    onChange={handleChange}
                  ></CFormInput>
                  <CInputGroupText>Amount</CInputGroupText>
                  <CFormInput
                    type="number"
                    value={studentData.TMTpaamo}
                    name="TMTpaamo"
                    onChange={handleChange}
                  ></CFormInput>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Obseravaciones: </CInputGroupText>
                  <CFormInput size="lg"></CFormInput>
                </CInputGroup>
              </CCard>
              <br />
              <div className="d-flex justify-content-between">
                <CTab itemKey="AData">
                  <CButton color="primary">Anterior</CButton>
                </CTab>
                <CButton color="primary" type="submit">
                  Registrar
                </CButton>
                <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
              </div>
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </CForm>
    </>
  )
}

export default Registration
