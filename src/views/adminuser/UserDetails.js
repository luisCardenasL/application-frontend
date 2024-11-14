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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilLockLocked, cilUser } from '@coreui/icons'

import {Link, useParams } from 'react-router-dom'
import useFetch from 'src/components/useFetch'

const UserDetails = () => {
    const {uid} = useParams();
    console.log(uid);
    const {data: user, error, isPending} = useFetch('users?uid='+uid);

    return (
        <>

            <CCard className="mb-4">
                <CCardHeader>User Information</CCardHeader>
                {error && <p>{error}</p>}
                {isPending && (
                    <CSpinner color="primary" size="sm" style={{ width: '4rem', height: '4rem' }} />
                )}
                {user && user.map((item) => 
                    <CForm className="p-4">
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput value = {item.name} type="text" placeholder="First name" autoComplete="first-name" />
                      <CFormInput type="text" placeholder="Middle Name" autoComplete="middle-name" />
                      <CFormInput type="text" placeholder="First Lastname" autoComplete="lastname" />
                      <CFormInput type="text" placeholder="Second Lastname" autoComplete="lastname" />
                    </CInputGroup>
                    <br />
                    <CInputGroup>
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput value={item.email} type="email" placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <br />
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Password" autoComplete="new-password" />
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </CInputGroup>
                    <br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText as="label">Role</CInputGroupText>
                      <CFormSelect value = {item.role_id} id="inputGroupSelect01">
                        <option value="0">Choose Role...</option>
                        <option value="2">Secretary</option>
                        <option value="3">Coordinator</option>
                        <option value="4">Teacher</option>
                      </CFormSelect>
                    </CInputGroup>
                    <Link to="/users">
                        <CButton color="success" className="px-0">
                          Confirm Changes
                        </CButton>
                      </Link>
                  </CForm>
                )}

            </CCard>
        </>
    )
}

export default UserDetails
