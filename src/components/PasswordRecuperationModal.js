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
    CInputGroup,
    CInputGroupText,
    
  } from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
} from '@coreui/icons'


const PasswordRecuperationModal = () => {
    const [visible, setVisible] = useState(false)
return (
  <>
    <CButton  color="success" onClick={() => setVisible(!visible)}>
     Send Validation Code
    </CButton>
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="UserDeleteModal"
    >
      <CModalHeader>
        <CModalTitle id="UserDeletaModal">Email Confirmation</CModalTitle>
      </CModalHeader>
      <CModalBody>
      <p>Please insert the code send to your email to Validate</p>
      <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
        <p>Please insert the code send to your email to Validate</p>
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
        <CButton color="success" href='/#/login' onClick={() => setVisible(false)}>
          Confirm
        </CButton>
      </CModalFooter>
    </CModal>
  </>
)
}

export default PasswordRecuperationModal
