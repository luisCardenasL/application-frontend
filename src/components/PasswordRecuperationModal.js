import React from 'react'
import classNames from 'classnames'
import { useState, useEffect } from 'react'

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
import { cilLockLocked } from '@coreui/icons'

import helpFetch from '../hooks/helpFetch'

const API = helpFetch()

const PasswordRecuperationModal = ({ email }) => {
  const [visible, setVisible] = useState(false)
  const [restoreUser, setRestoreUser] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setRestoreUser({
      ...restoreUser,
      email: email,
      [e.target.name]: e.target.value,
    })
    console.log(restoreUser)
  }

  const handleSubmit = (e) => {
    e.preventDefault
    
    setRestoreUser({
      ...restoreUser,
      email: email,
    })
    console.log(restoreUser)
    restorePassword(restoreUser)
  }

  const restorePassword = async (user) =>
  {
    console.log(user)
    const options = {
      body: user
    }
    await API.put('restorePassword',options).then(resp => {
      if(!resp.error) console.log('hola')
    })
  }

  return (
    <>
      <CButton color="success" onClick={() => setVisible(!visible)}>
        Send Validation Code
      </CButton>
      <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="UserDeleteModal">
        <CForm onSubmit={handleSubmit}>
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
              onChange={handleChange}
              name='password'
              value={restoreUser.password}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput type="password" placeholder="Repeat password" autoComplete="new-password" />
          </CInputGroup>
          <p>Please insert the code send to your email to Validate</p>
            <CFormInput type="number" id="code" label="Validation Code" aria-describedby="" />
        </CModalBody>
        <CModalFooter>
          <CButton
            type='submit'
            color="success"
          >
            Confirm
          </CButton>
        </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default PasswordRecuperationModal
