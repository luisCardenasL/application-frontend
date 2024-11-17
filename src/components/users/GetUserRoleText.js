import React from 'react'

import useFetch from '../useFetch'
import Loader from '../Loader'

const GetUserRoleText = ({ user_id }) => {
  const { data: roles, error, isPending } = useFetch(`roles/${user_id}`)

  return (
    <>
      {error && <p>{error}</p>}
      {isPending && (
        <Loader></Loader>
      )}
      {roles && <div>{roles.name}</div>}
    </>
  )
}

export default GetUserRoleText
