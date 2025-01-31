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
  CFormSwitch,
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
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilLockLocked, cilUser } from '@coreui/icons'

import { useState, useEffect } from 'react'
import helpFetch from '../../hooks/helpFetch'
import Loader from '../../components/Loader'
import TeacherList from "../../components/coordinator/teacherList"

const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [visibleLg, setVisibleLg] = useState(false)
  const API = helpFetch()
  const [Loading, SetLoading] = useState(true)
  const [milbo, setMilbo] = useState(true)

  const [professions, setProfessions] = useState([])

  const getProfessions = async () => {
    await API.get('professions').then((response) => {
      console.log(response.msg)
      if (!response.error) setProfessions(response.msg)
    })
  }

  const getTeachers = async() => {
    await API.get('teachers').then((response) => {
      console.log(response.msg)
      if (!response.error) setTeachers(response.msg)
    })
  }

  const [teacherData, setTeacherData] = useState({
    TSFiddoc: '',
    TSFfname: '',
    TSFmname: '',
    TSFtname: '',
    TSFflnam: '',
    TSFslnam: '',
    TSFprfid: null,
    TSFemail: '',
    TSFctelf: '',
    TSFmilbo: false,
    TSFstfst: 'active',
    TUSpawrd: '',
  })

  useEffect(() => {
    getProfessions()
    getTeachers()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!(teacherData.email == '') && !(teacherData.role_id < 2) && !(teacherData.password == '')) {
      teacherData.status = 'active'
      console.log(teacherData)
      addTeacher(teacherData)
      setTeacherData({
        TSFiddoc: null,
        TSFfname: '',
        TSFmname: '',
        TSFtname: '',
        TSFflnam: '',
        TSFslnam: '',
        TSFprfid: null,
        TSFemail: '',
        TSFctelf: '',
        TSFmilbo: false,
        TSFstfst: 'active',
        TUSpawrd: '',
      })
    }
  }

  const handleChange = (e) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeCheck = (e) => {
    setMilbo(!milbo)
    setTeacherData({
      ...teacherData,
      [e.target.name]: milbo,
    })
  }

  const addTeacher = (teacher) => {
    const options = {
      body: teacher,
    }
    API.post('addTeacher', options).then((resp) => {
      if (!resp.error) setTeachers([...teachers, teacher])
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
          <CModalTitle id="OptionalSizesExample2">Add new Teacher</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="p-4" onSubmit={handleSubmit}>
            <CInputGroup>
              <CInputGroupText>ID_document:</CInputGroupText>
              <CFormInput
                type="text"
                name="TSFiddoc"
                value={teacherData.TSFiddoc}
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
                value={teacherData.TSFfname}
                onChange={handleChange}
                placeholder="Firstname"
                autoComplete="name"
              />
              <CFormInput
                type="text"
                name="TSFmname"
                value={teacherData.TSFmname}
                onChange={handleChange}
                placeholder="Middlename"
                autoComplete="name"
              />
              <CFormInput
                type="text"
                name="TSFtname"
                value={teacherData.TSFtname}
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
                value={teacherData.TSFflnam}
                onChange={handleChange}
                placeholder="First Lastname"
                autoComplete="lastname"
              />
              <CFormInput
                type="text"
                name="TSFslnam"
                value={teacherData.TSFslnam}
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
                value={teacherData.TSFprfid}
                onChange={handleChange}
                options={professions}
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              {
                <CFormSwitch
                  className="align-middle"
                  name="TSFmilbo"
                  label="militar"
                  checked={teacherData.TSFmilbo}
                  onChange={handleChangeCheck}
                  id="switchTSFmilbo"
                ></CFormSwitch>
              }
            </CInputGroup>
            <br />
            <CInputGroup>
              <CInputGroupText>Tel</CInputGroupText>
              <CFormInput
                type="tel"
                name="TSFctelf"
                value={teacherData.TSFctelf}
                onChange={handleChange}
                placeholder="+584121234567"
                autoComplete="tel"
              />
            </CInputGroup>
            <br />
            <CInputGroup>
              <CInputGroupText>@</CInputGroupText>
              <CFormInput
                type="email"
                name="TSFemail"
                value={teacherData.TSFemail}
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
        <CCardHeader>List of Teachers</CCardHeader>
        <CCardBody>
          <CButton color="primary" className="mb-3" onClick={() => setVisibleLg(!visibleLg)}>
            Add Teacher
          </CButton>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  ID_Document
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Proffesion</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Modify</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Delete</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {teachers && <TeacherList teachers = {teachers}></TeacherList>}
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Teachers
