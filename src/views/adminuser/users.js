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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilLockLocked, cilUser } from '@coreui/icons'

import { useState, useEffect } from 'react'
import UserList from '../../components/users/UserList'
import helpFetch from '../../hooks/helpFetch'
import Loader from '../../components/Loader'

const Users = () => {
  const [users, setUsers] = useState([])
  const [visibleLg, setVisibleLg] = useState(false)
  const API =  helpFetch()
  const [Loading,SetLoading] = useState(true)

  const [userData,setUserData] = useState({
      role_id: null,
      name: '',
      email: '',
      status: '',
      password: ''
      
  })

  useEffect(() => {
    SetLoading(true)
    setTimeout(() => {
      API.get("users").then((response) => {
        if (!response.error) setUsers(response)
      })
  }, 1000);
  SetLoading(false)
  }, [users])

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!(userData.email == '') && !(userData.name == '') && !(userData.role_id < 2) && !(userData.password == '')){
      userData.status = 'active';
      console.log(userData);
      addUser(userData);
      setUserData({
        role_id: null,
        name: '',
        email: '',
        status: '',
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
      if(!resp.error) setUsers([...users,user])
    })
  }

  return (
    <>
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
            {Loading && <Loader></Loader>}
            {users && <UserList users={users} />}
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Users
