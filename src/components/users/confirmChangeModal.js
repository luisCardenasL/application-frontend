import React from 'react'
import classNames from 'classnames'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
import { cilTrash } from '@coreui/icons'

const ConfirmChangeModal = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
        <CButton color="success" type='submit' onClick={() => setVisible(true)} className="px-1">
                          Confirm Changes
        </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="UserDeleteModal">
        <CModalHeader>
          <CModalTitle id="confirmModal"></CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>The user Information has been changed successfully!</p>
        </CModalBody>
        <CModalFooter>
            <CButton color="danger" onClick={() => setVisible(false)}>
                Cerrar
            </CButton>

            <Link to = '/users' >
            <CButton color="danger" onClick={() => setVisible(false)}>
                Volver a Usuarios
            </CButton>
            </Link>
          
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ConfirmChangeModal