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
  CFormCheck,
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
                        <CFormInput type="text" placeholder="First name" autoComplete="name" />
                        <CFormInput type="text" placeholder="Middle Name" autoComplete="name" />
                        <CFormInput type="text" placeholder="Third Name" autoComplete="name" />
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
                    <CInputGroupText as="label">Civil Status</CInputGroupText>
                        <CFormSelect id="inputGroupSelectBlood">
                        <option>Choose Civil Status</option>
                        <option value="1">Single</option>
                        <option value="2">Married</option>
                        <option value="3">Widower/Widow</option>
                        </CFormSelect>
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
                    <CInputGroup>
                    <CInputGroupText as="label">Discapacity type</CInputGroupText>
                        <CFormSelect id="inputGroupSelectBlood">
                        <option>Choose Discapacity Type...</option>
                        <option value="1">None</option>
                        <option value="2">Visual</option>
                        <option value="3">Motor</option>
                        <option value="4">Hearing</option>
                        <option value="5">Mental</option>
                        </CFormSelect>
                    </CInputGroup>
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
                        <CInputGroupText>Residence Status</CInputGroupText>
                        <CFormSelect id="inputGroupSelectResStatus">
                        <option>Choose Residence Status...</option>
                        <option value="1">Permanent</option>
                        <option value="2">Temporal</option>
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
                <CCard className="mb-4">
                <CCardHeader>Academic Information</CCardHeader>
                <CForm className="p-4">
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
                <br/>
                <CInputGroup>
                    <CInputGroupText>Gradution year</CInputGroupText>
                    <CFormInput placeholder='20XX' type='year'></CFormInput>
                    <CInputGroupText>Mention</CInputGroupText>
                    <CFormSelect id="inputGroupSelectAcaStr">
                        <option>Choose Mention...</option>
                        <option value="1">PHD</option>
                        <option value="2">Magister</option>
                        </CFormSelect>
                    <CInputGroupText>Average Grade</CInputGroupText>
                    <CFormInput placeholder='01-20' type='number'></CFormInput>
                </CInputGroup>
                <br/>
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
                <br/>
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
                    <CFormCheck ></CFormCheck>
                </CInputGroup>
                <br/>
                <CInputGroup>
                    <CInputGroupText>Observations: </CInputGroupText>
                    <CFormInput size='lg'></CFormInput>
                </CInputGroup>
                </CForm>
                </CCard>
                <CCard className='mb-4'>
                    <CCardHeader>Documents</CCardHeader>
                    <div className='p-4'>
                    <CFormCheck label='Id Document Fotocopy'/>
                    <CFormCheck label='Militar Inscription Fotocopy'/>
                    <CFormCheck label='Original Academic Record'/>
                    <CFormCheck label='Photos'/>
                    <CFormCheck label='Original Copy of Birth Certificade'/>
                    </div>
                </CCard>
            </CTabPanel>

            <CTabPanel transition className="p-3" itemKey="Register">
                <CCard className='mb-4'>
                    <CCardHeader>Registration</CCardHeader>
                    <CForm className='p-4'>
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
                    <br/>
                    <CInputGroup>
                        <CInputGroupText>Registered_by: </CInputGroupText>
                        <CFormSelect id="inputGroupSelect">
                        <option>Choose Staff...</option>
                        <option value="1">Sheila Casique</option>
                        </CFormSelect>
                    </CInputGroup>
                    </CForm>
                </CCard>
                <CCard className='mb-4'>
                <CCardHeader>Payment Information</CCardHeader>
                    <CForm className='p-4'>
                    <CInputGroup>
                        <CInputGroupText>Payment Date</CInputGroupText>
                        <CFormInput type='date'></CFormInput>
                        <CInputGroupText>N° Voucher</CInputGroupText>
                        <CFormInput type='number'></CFormInput>
                        <CInputGroupText>N° Receipt</CInputGroupText>
                        <CFormInput type='number'></CFormInput>
                        <CInputGroupText>Amount</CInputGroupText>
                        <CFormInput type='number'></CFormInput>
                    </CInputGroup>
                    <br/>
                    <CInputGroup>
                        <CInputGroupText>Observations: </CInputGroupText>
                        <CFormInput size='lg'></CFormInput>
                    </CInputGroup>
                    </CForm>
                </CCard>
            </CTabPanel>

        </CTabContent>
      </CTabs>
    </>
  )
}

export default Registration
