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
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import { useParams } from 'react-router-dom';
import useFetch from 'src/components/useFetch';
import UserList from 'src/components/UserList';

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'


const Users = () => {

  const { id } = useParams();
  const { data: users, error, isPending } = useFetch("http://localhost:8000/users/");
  const { role: item, errorR, isPendingR} = useFetch("http://localhost:8000/roles/");
  
    return (
            <CCard className="mb-4">
              <CCardHeader>Users</CCardHeader>
              <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">User</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Email
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Update_at
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Role</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Modify</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {error && <p>{error}</p>}
                {isPending && <p>Loading users...</p>}
                {users && <UserList users={users} />}
              </CTable>
              </CCardBody>
            </CCard>
                )
}

export default Users