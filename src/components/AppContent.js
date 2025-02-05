import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// routes config
import routes from '../routes'
import helpFetch from '../hooks/helpFetch'

const AppContent = () => {
  const API = helpFetch()

  const [isLogged, setLogged] = useState(true)
  let navigate = useNavigate()

  const verifyUser = async () => {
    await API.get('verify').then((resp) => {
      if (!resp.error) setLogged(true)
      else setLogged(false)
    })
  }

  useEffect(() => {
    //verifyUser()
  }, [])

  useEffect(() => {
    if (!isLogged){setLogged(true)  ;return navigate('/login')}
  }, [isLogged])

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
