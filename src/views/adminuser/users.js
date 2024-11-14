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

import { useState, } from 'react'

import { v4 as uuidv4 } from 'uuid';

import useFetch from 'src/components/useFetch'
import UserList from '../../components/users/UserList'
import helpFetch from '../../components/helpFetch'

const Users = () => {
  const { data: users, error, isPending } = useFetch('users')
  const API =  helpFetch()

  const [userData,setUserData] = useState({
      user_id: null,
      role_id: null,
      name: '',
      email: '',
      created_at: '',
      updated_at: '',
      status: '',
      uid: '',
      password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!(userData.email == '') && !(userData.name == '') && !(userData.role_id < 2) && !(userData.password == '')){
      userData.uid = uuidv4();
      userData.user_id = (users.length + 1);
      userData.status = 'active';
      userData.created_at = Date.now();
      userData.updated_at = Date.now();

      console.log(userData);
      addUser(userData);
      setUserData({
        user_id: null,
        role_id: null,
        name: '',
        email: '',
        created_at: '',
        updated_at: '',
        status: '',
        uid: ''
      })
    }
    

  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  const addUser = (user) => {
    const options = {
      body: user
    }
    API.post('users',options).then(resp => {
      console.log(res);
    })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Create a new User</CCardHeader>
        <CForm className="p-4" onSubmit={handleSubmit}>
          <CInputGroup>
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput type="text" name='name' value={userData.name} onChange={handleChange} placeholder="Username" autoComplete="username" />
          </CInputGroup>
          <br />
          <CInputGroup>
            <CInputGroupText>@</CInputGroupText>
            <CFormInput type="email" name='email' value={userData.email} onChange={handleChange} placeholder="Email" autoComplete="email" />
          </CInputGroup>
          <br />
          <CInputGroup>
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput type="password" name='password' onChange={handleChange} placeholder="Password" autoComplete="new-password" />
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput type="password" placeholder="Repeat password" autoComplete="new-password" />
          </CInputGroup>
          <br />
          <CInputGroup className="mb-3">
            <CInputGroupText as="label">Role</CInputGroupText>
            <CFormSelect name="role_id" value={userData.role_id} onChange={handleChange}>
              <option>Choose Role...</option>
              <option value="2">Secretary</option>
              <option value="3">Coordinator</option>
              <option value="4">Teacher</option>
            </CFormSelect>
          </CInputGroup>
          <CButton color='primary' type='submit'>
              Add +  
          </CButton>
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
