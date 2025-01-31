import React from 'react'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
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
  const [municipalities, setMunicipalities] = useState([])
  const [munSelected, setMunSelected] = useState(false)
  const API = helpFetch()

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

  const handleChange = (e) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeState = (e) => {
    handleChange(e)
    if (e.target.value === 0) {
      setStateSelected(false)
      setMunicipalities([])
    } else {
      setStateSelected(true)
    }
  }

  useEffect(() => {
    getNationalities()
    getCivilStatus()
  }, [])

  return (
    <>
      <CForm className="p-4">
        <CTabs activeItemKey="PData">
          <CTabList variant="pills" layout="fill">
            <CTab itemKey="PData">Personal Data</CTab>
            <CTab itemKey="CData">Residence & Contact Info</CTab>
            <CTab itemKey="AData">Academic Data</CTab>
            <CTab itemKey="Register">Registration</CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel transition className="p-3" itemKey="PData">
              <CCard className="mb-4">
                <CCardHeader>Personal Information</CCardHeader>

                <CInputGroup>
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput type="text" placeholder="First name" autoComplete="name" />
                  <CFormInput type="text" placeholder="Middle Name" autoComplete="name" />
                  <CFormInput type="text" placeholder="Third Name" autoComplete="name" />
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CFormInput type="text" placeholder="First Lastname" autoComplete="lastname" />
                  <CFormInput type="text" placeholder="Second Lastname" autoComplete="lastname" />
                </CInputGroup>
                <br></br>
                <CInputGroup>
                  <CInputGroupText>ID Document</CInputGroupText>
                  <CFormSelect id="inputGroupSelectID">
                    <option>Choose Document Type...</option>
                    <option value="V">Venezuelan (V)</option>
                    <option value="E">Foreigner (E)</option>
                    <option value="P">Passport</option>
                  </CFormSelect>
                  <CFormInput type="number" placeholder="ID Document" />
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Nationality</CInputGroupText>
                  <CFormSelect
                    id="inputGroupSelectNationality"
                    options={nationalities}
                  ></CFormSelect>
                </CInputGroup>
                <br />

                <CInputGroup className="mb-3">
                  <CInputGroupText as="label">Gender</CInputGroupText>
                  <CFormSelect id="inputGroupSelectGender">
                    <option>Choose Gender...</option>
                    <option value="M">Masculine</option>
                    <option value="F">Femenine</option>
                  </CFormSelect>
                </CInputGroup>
                <CInputGroup>
                  <CInputGroupText>Birth Date</CInputGroupText>
                  <CFormInput type="date" placeholder="Fecha de Nacimiento" />
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText as="label">Civil Status</CInputGroupText>
                  <CFormSelect id="inputGroupSelectBlood" options={civilStatus}></CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText as="label">Blood Type</CInputGroupText>
                  <CFormSelect id="inputGroupSelectBlood">
                    <option>Choose Blood Type...</option>
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
                <CCardHeader>Residence Information</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Residence Place</CInputGroupText>
                  <CFormSelect id="inputGroupSelectState" options={states}></CFormSelect>
                  <CFormSelect
                    id="inputGroupSelectMunicipality"
                    disabled={stateSelected}
                  ></CFormSelect>
                  <CFormSelect id="inputGroupSelectCity">
                    <option>Choose City...</option>
                  </CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Residence Status</CInputGroupText>
                  <CFormSelect id="inputGroupSelectResStatus">
                    <option>Choose Residence Status...</option>
                    <option value="1">Permanent</option>
                    <option value="2">Temporal</option>
                  </CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Address</CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Ej. Principal Avenue Los Naranjos Street B "
                  ></CFormInput>
                </CInputGroup>
                <br />
              </CCard>
              <CCard className="mb-4">
                <CCardHeader>Contact Information</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Email</CInputGroupText>
                  <CFormInput type="email" placeholder="example@email.com"></CFormInput>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Telephone Number #1</CInputGroupText>
                  <PhoneInput
                    className="form-control p-0"
                    placeholder="Ingresar N° de Teléfono"
                    defaultCountry="VE"
                  />
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Telephone Number #2</CInputGroupText>
                  <PhoneInput
                    className="form-control p-0"
                    placeholder="Ingresar N° de Teléfono"
                    defaultCountry="VE"
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
                <CCardHeader>Academic Information</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Procedence University</CInputGroupText>
                  <CFormSelect id="inputGroupSelectAcaStr">
                    <option>Choose University...</option>
                    <option value="1">UNEFA</option>
                    <option value="2">UNET</option>
                    <option value="3">UCAB</option>
                  </CFormSelect>
                  <CInputGroupText>Core</CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Core...</option>
                    <option value="1">Táchira</option>
                    <option value="2">Mérida</option>
                  </CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Gradution year</CInputGroupText>
                  <CFormInput placeholder="20XX" type="year"></CFormInput>
                  <CInputGroupText>Mention</CInputGroupText>
                  <CFormSelect id="inputGroupSelectAcaStr">
                    <option>Choose Mention...</option>
                    <option value="1">PHD</option>
                    <option value="2">Magister</option>
                  </CFormSelect>
                  <CInputGroupText>Average Grade</CInputGroupText>
                  <CFormInput placeholder="01-20" type="number"></CFormInput>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Student Condition</CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Student Condition...</option>
                    <option value="1">Civil</option>
                    <option value="2">Militar</option>
                  </CFormSelect>
                  <CInputGroupText>Militar Component</CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Militar Component</option>
                    <option value="1">Army</option>
                    <option value="2">Aviation</option>
                    <option value="3">Milicia</option>
                  </CFormSelect>
                  <CInputGroupText>Militar Component</CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Militar Rank</option>
                    <option value="1">General</option>
                    <option value="2">Liutenant</option>
                    <option value="3">Private</option>
                  </CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Initial Academic Period</CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Academic Period...</option>
                    <option value="1">2024-3</option>
                    <option value="2">2024-2</option>
                    <option value="3">2024-1</option>
                  </CFormSelect>
                  <CInputGroupText>Status</CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Status...</option>
                    <option value="1">Regular</option>
                    <option value="2">Irregular</option>
                  </CFormSelect>
                  <CInputGroupText>Scholarship: </CInputGroupText>
                  <CFormCheck></CFormCheck>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Observations: </CInputGroupText>
                  <CFormInput size="lg"></CFormInput>
                </CInputGroup>
              </CCard>
              <CCard className="mb-4">
                <CCardHeader>Documents</CCardHeader>
                <div className="p-4">
                  <CFormCheck label="Id Document Fotocopy" />
                  <CFormCheck label="Militar Inscription Fotocopy" />
                  <CFormCheck label="Original Academic Record" />
                  <CFormCheck label="Photos" />
                  <CFormCheck label="Original Copy of Birth Certificade" />
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
                <CCardHeader>Registration</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Academic Period</CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Academic Period...</option>
                    <option value="1">2024-3</option>
                    <option value="2">2024-2</option>
                    <option value="3">2024-1</option>
                  </CFormSelect>
                  <CInputGroupText>Carrer Code</CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Career Code...</option>
                    <option value="1">2701</option>
                    <option value="2">2232</option>
                    <option value="3">0039</option>
                  </CFormSelect>
                  <CInputGroupText>Initial Academic Period</CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Academic Period...</option>
                    <option value="1">2024-3</option>
                    <option value="2">2024-2</option>
                    <option value="3">2024-1</option>
                  </CFormSelect>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Registered_by: </CInputGroupText>
                  <CFormSelect id="inputGroupSelect">
                    <option>Choose Staff...</option>
                    <option value="1">Sheila Casique</option>
                  </CFormSelect>
                </CInputGroup>
              </CCard>
              <CCard className="mb-4">
                <CCardHeader>Payment Information</CCardHeader>
                <CInputGroup>
                  <CInputGroupText>Payment Date</CInputGroupText>
                  <CFormInput type="date"></CFormInput>
                  <CInputGroupText>N° Voucher</CInputGroupText>
                  <CFormInput type="number"></CFormInput>
                  <CInputGroupText>N° Receipt</CInputGroupText>
                  <CFormInput type="number"></CFormInput>
                  <CInputGroupText>Amount</CInputGroupText>
                  <CFormInput type="number"></CFormInput>
                </CInputGroup>
                <br />
                <CInputGroup>
                  <CInputGroupText>Observations: </CInputGroupText>
                  <CFormInput size="lg"></CFormInput>
                </CInputGroup>
              </CCard>
              <br />
              <div className="d-flex justify-content-between">
                <CTab itemKey="AData">
                  <CButton color="primary">Anterior</CButton>
                </CTab>
                <CButton color="primary">Registrar</CButton>
              </div>
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </CForm>
    </>
  )
}

export default Registration
