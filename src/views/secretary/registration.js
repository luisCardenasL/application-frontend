import React from 'react'
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
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilLockLocked, cilUser } from '@coreui/icons'

import { useParams } from 'react-router-dom'
import useFetch from 'src/components/useFetch'
import UserList from '../../components/users/UserList'
import Register from '../pages/register/ForgotPassword'

const Registration = () => {

  return (
    <>
      <CTabs activeItemKey="PData">
        <CTabList variant='pills' layout='fill'>
            <CTab itemKey="PData">Personal Data</CTab>
            <CTab itemKey="CData">Residence & Contact Info</CTab>
            <CTab itemKey="AData">Academic Data</CTab>
            <CTab itemKey="Documents">Documents</CTab>
            <CTab itemKey="Register">Registration</CTab>
        </CTabList>
        <CTabContent>
            <CTabPanel transition className="p-3" itemKey="PData">
                <CCard className="mb-4">
                    <CCardHeader>Personal Information</CCardHeader>
                    <CForm className="p-4">
                    <CInputGroup>
                        <CInputGroupText>
                        <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput type="text" placeholder="First name" autoComplete="first-name" />
                        <CFormInput type="text" placeholder="Middle Name" autoComplete="middle-name" />
                        <CFormInput type="text" placeholder="First Lastname" autoComplete="lastname" />
                        <CFormInput type="text" placeholder="Second Lastname" autoComplete="lastname" />
                    </CInputGroup>
                    <br />
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
                        <CFormSelect id="inputGroupSelectNationality">
                        <option>Choose Procedence Country</option>
                        <option value="V">Venezuela</option>
                        <option value="E">Colombia</option>
                        <option value="P">EEUU</option>
                        <option value="E">Ecuador</option>
                        <option value="E">Peru</option>
                        </CFormSelect>
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
                    <br/>
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
                    <br/>
                    </CForm>
                </CCard>
                <br/>
            </CTabPanel>
            <CTabPanel transition className="p-3" itemKey="CData">
                <CCard className="mb-4">
                    <CCardHeader>Residence Information</CCardHeader>
                    <CForm className="p-4">
                    <CInputGroup>
                        <CInputGroupText>Residence Place</CInputGroupText>
                        <CFormSelect id="inputGroupSelectState">
                        <option>Choose State...</option>
                        <option value="1">Táchira</option>
                        <option value="2">Mérida</option>
                        <option value="3">Trújillo</option>
                        </CFormSelect>
                        <CFormSelect id="inputGroupSelectMunicipality">
                        <option>Choose Municipality...</option>
                        <option value="1">San Cristóbal</option>
                        <option value="2">Cárdenas</option>
                        </CFormSelect>
                        <CFormSelect id="inputGroupSelectCity">
                        <option>Choose City...</option>
                        </CFormSelect>
                    </CInputGroup>
                    <br/>
                    <CInputGroup>
                        <CInputGroupText>Address</CInputGroupText>
                        <CFormInput type='text' placeholder='Ej. Principal Avenue Los Naranjos Street B '></CFormInput>
                    </CInputGroup>
                    <br/>
                    </CForm>
                </CCard>
                <CCard className="mb-4">
                    <CCardHeader>Contact Information</CCardHeader>
                    <CForm className="p-4">
                    <CInputGroup>
                        <CInputGroupText>Email</CInputGroupText>
                        <CFormInput type='email' placeholder='example@email.com'></CFormInput>
                    </CInputGroup>
                    <br/>
                    <CInputGroup>
                        <CInputGroupText>Telephone Number #1</CInputGroupText>
                        <CFormInput type='telf' placeholder='412XXXXXXX'></CFormInput>
                    </CInputGroup>
                    <br/>
                    <CInputGroup>
                        <CInputGroupText>Telephone Number #2</CInputGroupText>
                        <CFormInput type='telf' placeholder='412XXXXXXX'></CFormInput>
                    </CInputGroup>
                    <br/>
                    </CForm>
                </CCard>
            </CTabPanel>
            <CTabPanel transition className="p-3" itemKey="AData">
                
            </CTabPanel>

            <CTabPanel transition className="p-3" itemKey="Documents">
                
            </CTabPanel>

            <CTabPanel transition className="p-3" itemKey="Register">
                
            </CTabPanel>

        </CTabContent>
      </CTabs>
    </>
  )
}

export default Registration
