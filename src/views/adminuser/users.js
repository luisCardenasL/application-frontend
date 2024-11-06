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

import { useParams } from 'react-router-dom'
import useFetch from 'src/components/useFetch'
import UserList from 'src/components/UserList'

const Users = () => {
  const { data: users, error, isPending } = useFetch('http://localhost:8000/users')

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Create a new User</CCardHeader>
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
            <CInputGroupText>@</CInputGroupText>
            <CFormInput type="email" placeholder="Email" autoComplete="email" />
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
            <CFormSelect id="inputGroupSelect01">
              <option>Choose Role...</option>
              <option value="2">Secretary</option>
              <option value="3">Coordinator</option>
              <option value="4">Teacher</option>
            </CFormSelect>
          </CInputGroup>
        </CForm>
      </CCard>
      <br />
      <CCard className="mb-4">
        <CCardHeader>List of Users</CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Updated_at</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Role</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Modify</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Delete</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {error && <p>{error}</p>}
            {isPending && (
              <CTableBody>
                <CTableRow>
                  <CTableDataCell colSpan={8} className="text-center">
                    <CSpinner color="primary" size="sm" style={{ width: '4rem', height: '4rem' }} />
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            )}
            {users && <UserList users={users} />}
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Users
