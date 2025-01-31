import React from 'react'
import classNames from 'classnames'
import { useState, useEffect } from 'react'

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
import helpFetch from '../../components/helpFetch'
import ConfirmChangeModal from '../../components/users/confirmChangeModal'

const UserDetails = () => {
    const {uid} = useParams();
    console.log(uid);
    const {data: user, error, isPending} = useFetch('users?uid='+uid);
    const API = helpFetch();
    const [init,setInit] = useState(true)

    const [userData,setUserData] = useState({
      id: '',
      role_id: 0,
      name: '',
      email: '',
      created_at: '',
      updated_at: '',
      status: 'active',
      uid: '',
      password: ''
  })

  const initData = () => {
    if(init){
    user && user.map((item) => {
      setUserData({
        id: item.id,
        role_id: item.role_id,
        name: item.name,
        email: item.email,
        created_at: item.created_at,
        updated_at: item.updated_at,
        status: item.status,
        uid: item.uid,
        password: item.password
      })
    });
    }
    setInit(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!(userData.email == '') && !(userData.name == '') && !(userData.role_id < 2)  && !(userData.password == '')){
      userData.updated_at = Date.now();
      editUser(userData);
    }
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
    console.log(userData)
  }

    const editUser = (user) => {
      const options = {
        body: user
      }
      API.put('users',options,user.id).then(resp => {
        if(!resp.error){
          console.log("user sucessfully added");
        }
      })
    }

    return (
        <>

            <CCard className="mb-4" o>
                <CCardHeader>User Information</CCardHeader>
                {error && <p>{error}</p>}
                {isPending && (
                    <CSpinner color="primary" size="sm" style={{ width: '4rem', height: '4rem' }} />
                )}
                {user &&
                    <CForm className="p-4" onFocus={initData} onSubmit={handleSubmit}>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput value={userData.name} onChange={handleChange} name='name' type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <br />
                    <CInputGroup>
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput value={userData.email} onChange={handleChange} name='email' type="email" placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <br />
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" onChange={handleChange} name='password' placeholder="Password" autoComplete="new-password" />
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Repeat password" autoComplete="new-password" />
                    </CInputGroup>
                    <br />
                    <CInputGroup className="mb-3">
                      <CInputGroupText as="label">Role</CInputGroupText>
                      <CFormSelect name='role_id' onChange={handleChange} value = {userData.role_id} id="inputGroupSelect01">
                        <option value="0">Choose Role...</option>
                        <option value="2">Secretary</option>
                        <option value="3">Coordinator</option>
                        <option value="4">Teacher</option>
                      </CFormSelect>
                      <CInputGroupText as="label">Role</CInputGroupText>
                      <CFormSelect name='status' onChange={handleChange} value = {userData.status} id="inputGroupSelect02">
                        <option value="active">Actived</option>
                        <option value="deactive">Deactived</option>
                      </CFormSelect>
                    </CInputGroup>
                    <ConfirmChangeModal/>
                  </CForm>
                }
            </CCard>
        </>
    )
}

export default UserDetails
