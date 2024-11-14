import { exact } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//AdminUser
const Users = React.lazy(() => import('./views/adminuser/users'))
const UserDetails = React.lazy(() => import('./views/adminuser/UserDetails'))

//Secretary
const Registration = React.lazy(() => import('./views/secretary/registration'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/users/:uid', name: 'UserDetails', element: UserDetails, exact: false },
  { path: '/registration', name: 'Registration', element: Registration },
]

export default routes
