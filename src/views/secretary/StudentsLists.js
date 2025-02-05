import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

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
import { cilPen, cilTrash } from '@coreui/icons'

import Loader from '../../components/Loader'
import helpFetch from '../../hooks/helpFetch'
import studentLIst from '../../components/students/studentList.js'

const StudentLists = () => {
  const API = helpFetch()
  const [loading, setLoading] = useState(false)
  const [students, setStudent] = useState([])

  const getStudents = async () => {
    await API.get('students').then((response) => {
      console.log(response.msg)
      if (!response.error) setStudent(response.msg)
    })
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List of Student</CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">Student_Cod</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Name</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">ID_Document</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Militar</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Status</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Carrer</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Modify</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Delete</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {students && (
              <CTableBody>
                {students.map((item) => (
                  <CTableRow key={item.TSTcodst}>
                    <CTableDataCell className="text-center">
                      <div>{item.TSTcodst}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{`${item.TSTfirna} ${item.TSTmidna} ${item.TSTthrna} ${item.TSTfltna} ${item.TSTsltna}`}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{`${item.TSTtyidd}-${item.TSTiddoc}`}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.TSTmilpe ? 'Militar' : 'Civil'}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.TMAmatri[0].TMTmstat}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.TMAmatri[0].TMAprogm.TMAcarre.TCAcname}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/students/${item.TSTcodst}`}>
                        <CIcon icon={cilPen} size="lg" color="primary" />
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {console.log('students', students)}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            )}
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default StudentLists
