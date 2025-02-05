import React from 'react'
import { Link } from 'react-router-dom'

import {
  CButton,
  CButtonGroup,
  CTableBody,
  CSpinner,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilTrash } from '@coreui/icons'

const StudentList = ({ students }) => {
  console.log('students', students)
  return (
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
          <CTableDataCell className="text-center">{console.log('students', students)}</CTableDataCell>
        </CTableRow>
      ))}
    </CTableBody>
  )
}

export default StudentList
