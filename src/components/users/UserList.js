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
import UserDeleteModal from './UserDeleteModal'
import GetUserRoleText from './GetUserRoleText'
import GetTimestampText from '../GetTimestampText'

const UserList = ({ users }) => {
  return (
    <>
      <CTableBody>
        {users.map((item) => (
          <CTableRow v-for="item in tableItems" key={item.user_id}>
            <CTableDataCell className="text-center">
              <div>{item.user_id}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.name}</div>
              <div className="small text-body-secondary text-nowrap">
                {' '}
                Registered: {GetTimestampText(item.created_at)}
              </div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <div>{item.email}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{GetTimestampText(item.updated_at)}</div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <GetUserRoleText user_id={item.role_id} />
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <div>{item.status}</div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <Link to={`/users/${item.uid}`}>
                <CIcon icon={cilPen} size="lg" color="primary" />
              </Link>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <UserDeleteModal />
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </>
  )
}

export default UserList
