import React from 'react'
import classNames from 'classnames'
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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormSwitch,
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
  const API = helpFetch()
  const [Loading, SetLoading] = useState(false)
  const [milbo, setMilbo] = useState(true)
  const [professions, setProfessions] = useState([])
  const [adPosition, setAdPositions] = useState([])
  const [userRoles, setUserRoles] = useState([])

  const [userData, setUserData] = useState({
    TSFiddoc: '',
    TSFfname: '',
    TSFmname: '',
    TSFtname: '',
    TSFflnam: '',
    TSFslnam: '',
    TSFprfid: null,
    TSFposid: null,
    TSFemail: '',
    TSFctelf: '',
    TSFmilbo: false,
    TSFstfst: 'active',
    TUSpawrd: '',
    TUSrolid: null,
  })

  const getProfessions = async () => {
    await API.get('professions').then((response) => {
      console.log(response.msg)
      if (!response.error) setProfessions(response.msg)
    })
  }

  const getAdministrativePos = async () => {
    await API.get('admPositions').then((response) => {
      console.log(response.msg)
      if (!response.error) setAdPositions(response.msg)
    })
  }

  const getUserRoles = async () => {
    await API.get('userRoles').then((response) => {
      console.log(response.msg)
      if (!response.error) setUserRoles(response.msg)
    })
  }

  const getUsers = async () => {
    await API.get('users').then((response) => {
      console.log(response.msg)
      if (!response.error) setUsers(response.msg)
    })
  }

  useEffect(() => {
    getProfessions(), getUsers(), getUserRoles(), getAdministrativePos()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !(userData.email == '') &&
      !(userData.name == '') &&
      !(userData.role_id < 2) &&
      !(userData.password == '')
    ) {
      userData.status = 'active'
      console.log(userData)
      addUser(userData)
      setUserData({
        TSFiddoc: '',
        TSFfname: '',
        TSFmname: '',
        TSFtname: '',
        TSFflnam: '',
        TSFslnam: '',
        TSFprfid: null,
        TSFposid: null,
        TSFemail: '',
        TSFctelf: '',
        TSFmilbo: false,
        TSFstfst: 'active',
        TUSpawrd: '',
        TUSrolid: null,
      })
    }
    setVisibleLg(!visibleLg)
  }

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeTelf = (value) => {
    setUserData({
      ...userData,
      TSFctelf: value,
    })
    console.log(value)
    console.log(userData)
  }

  const handleChangeCheck = (e) => {
    setMilbo(!milbo)
    setUserData({
      ...userData,
      [e.target.name]: milbo,
    })
  }

  const addUser = (user) => {
    const options = {
      body: user,
    }
    API.post('users', options).then((resp) => {
      if (!resp.error) setUsers([...users, user])
    })
  }

  return (
    <>
      <CModal
        size="lg"
        visible={visibleLg}
        onClose={() => setVisibleLg(false)}
        aria-labelledby="OptionalSizesExample2"
      >
        <CModalHeader>
          <CModalTitle id="OptionalSizesExample2">Add new Staff member</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="p-4" onSubmit={handleSubmit}>
            <CInputGroup>
              <CInputGroupText>ID_document:</CInputGroupText>
              <CFormInput
                type="text"
                name="TSFiddoc"
                value={userData.TSFiddoc}
                onChange={handleChange}
                placeholder="ID_document"
                autoComplete="id_document"
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput
                type="text"
                name="TSFfname"
                value={userData.TSFfname}
                onChange={handleChange}
                placeholder="Firstname"
                autoComplete="name"
              />
              <CFormInput
                type="text"
                name="TSFmname"
                value={userData.TSFmname}
                onChange={handleChange}
                placeholder="Middlename"
                autoComplete="name"
              />
              <CFormInput
                type="text"
                name="TSFtname"
                value={userData.TSFtname}
                onChange={handleChange}
                placeholder="Thirdname"
                autoComplete="name"
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              <CFormInput
                type="text"
                name="TSFflnam"
                value={userData.TSFflnam}
                onChange={handleChange}
                placeholder="First Lastname"
                autoComplete="lastname"
              />
              <CFormInput
                type="text"
                name="TSFslnam"
                value={userData.TSFslnam}
                onChange={handleChange}
                placeholder="Second Lastname"
                autoComplete="lastname"
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              <CInputGroupText>Proffesion</CInputGroupText>
              <CFormSelect
                name="TSFprfid"
                value={userData.TSFprfid}
                onChange={handleChange}
                options={professions}
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              <CInputGroupText>Administrative Position</CInputGroupText>
              <CFormSelect
                name="TSFposid"
                value={userData.TSFposid}
                onChange={handleChange}
                options={adPosition}
              />
              <CInputGroupText>User Roles</CInputGroupText>
              <CFormSelect
                name="TUSrolid"
                value={userData.TUSrolid}
                onChange={handleChange}
                options={userRoles}
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              {
                <CFormSwitch
                  className="align-middle"
                  name="TSFmilbo"
                  label="militar"
                  checked={userData.TSFmilbo}
                  onChange={handleChangeCheck}
                  id="switchTSFmilbo"
                ></CFormSwitch>
              }
            </CInputGroup>
            <br />
            <CInputGroup>
              <CInputGroupText>Tel</CInputGroupText>
              <PhoneInput
                className="form-control p-0"
                placeholder="+584120688647"
                defaultCountry="VE"
                value={userData.TSFctelf}
                onChange={handleChangeTelf}
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              <CInputGroupText>@</CInputGroupText>
              <CFormInput
                type="email"
                name="TSFemail"
                value={userData.TSFemail}
                onChange={handleChange}
                placeholder="Email"
                autoComplete="email"
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                name="TUSpawrd"
                onChange={handleChange}
                placeholder="Password"
                autoComplete="new-password"
              />
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Repeat password"
                autoComplete="new-password"
              />
            </CInputGroup>
            <br />
            <CButton color="primary" type="submit">
              Add +
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
      <br />
      <CCard className="mb-4">
        <CCardHeader>List of Users</CCardHeader>
        <CCardBody>
          <CButton color="primary" className="mb-3" onClick={() => setVisibleLg(!visibleLg)}>
            Add Staff Member
          </CButton>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  ID_Document
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
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
