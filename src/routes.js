import { exact } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//AdminUser
const Users = React.lazy(() => import('./views/adminuser/users'))
const UserDetails = React.lazy(() => import('./views/adminuser/UserDetails'))

//Secretary
const Registration = React.lazy(() => import('./views/secretary/registration'))
const StudentLists = React.lazy(() => import('./views/secretary/StudentsLists'))
const createProgram = React.lazy(() => import('./views/secretary/Programs/createProgram'))
const addCareer = React.lazy(() => import('./views/secretary/Programs/addCareer'))

//Coodinator
const TeacherLists = React.lazy(() => import('./views/coordinator/teachers'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Inicio', element: Dashboard },
  { path: '/users', name: 'Usuarios', element: Users },
  { path: '/users/:uid', name: 'Info Usuario', element: UserDetails, exact: false },
  { path: '/registration', name: 'Inscripcion', element: Registration },
  { path: '/students', name: 'Estudiante', element: StudentLists},
  { path: '/programs/create', name: 'Crear Programa', element: createProgram },
  { path: '/careers/add', name: 'Agregar Carrera', element: addCareer },
  { path: '/teachers', name: 'Profesor', element: TeacherLists},
]

export default routes
