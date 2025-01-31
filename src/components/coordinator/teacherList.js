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

const teacherList = ({ teachers }) => {
  return (
    <>
      <CTableBody>
        {teachers.map((item) => (
          <CTableRow v-for="item in tableItems" key={item.id_doc}>
            <CTableDataCell className="text-center">
              <div>{item.id_doc}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.cname}</div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <div>{item.email}</div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <div>{item.profession}</div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <div>{item.status}</div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <Link to={`/teacher/${item.uid}`}>
                <CIcon icon={cilPen} size="lg" color="primary" />
              </Link>
            </CTableDataCell>
            <CTableDataCell className="text-center"></CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </>
  )
}

export default teacherList
