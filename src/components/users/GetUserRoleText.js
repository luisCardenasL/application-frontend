import React from 'react'
import { CSpinner } from '@coreui/react'

import useFetch from '../useFetch'

const GetUserRoleText = ({ user_id }) => {
  const { data: roles, error, isPending } = useFetch(`roles?role_id=${user_id}`)

  return (
    <>
      {error && <p>{error}</p>}
      {isPending && (
        <CSpinner color="primary" size="sm" style={{ width: '4rem', height: '4rem' }} />
      )}
      {roles && roles.map((item) => <div>{item.name}</div>)}
    </>
  )
}

export default GetUserRoleText
