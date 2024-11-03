import React from 'react'
import classNames from 'classnames'
import { useState, useEffect } from 'react';

import {
    CButton,
    CModal,
    CForm,
    CFormInput,
    CModalHeader,
    CModalTitle,
    CModalFooter,
    CModalBody,
    
  } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilTrash,
} from '@coreui/icons'

const UserDeleteModal = () => {
    const [visible, setVisible] = useState(false)
return (
  <>
    <CButton  variant="ghost" onClick={() => setVisible(!visible)}>
        <CIcon icon={cilTrash} size='lg' className='text-danger' />
    </CButton>
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="UserDeleteModal"
    >
      <CModalHeader>
        <CModalTitle id="UserDeletaModal">Are you sure you want to delete this user?</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Please insert the code send to your email to Confirm</p>
        <CForm>
              <CFormInput
                  type="number"
                  id="code"
                  label="Validation Code"
                  aria-describedby=""
                />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={() => setVisible(false)}>
          Confirm
        </CButton>
      </CModalFooter>
    </CModal>
  </>
)
}

export default UserDeleteModal