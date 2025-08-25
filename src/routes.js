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
const StudentProfile = React.lazy(() => import('./views/secretary/Students/StudentProfile'))
const TeacherProfile = React.lazy(() => import('./views/coordinator/teacherProfile'))

//Coodinator
const TeacherLists = React.lazy(() => import('./views/coordinator/teachers'))
const Sections = React.lazy(() => import('./views/coordinator/sections/sections'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Inicio', element: Dashboard },
  { path: '/users', name: 'Usuarios', element: Users },
  { path: '/users/:uid', name: 'Info Usuario', element: UserDetails, exact: false },
  { path: '/registration', name: 'Inscripcion', element: Registration },
  { path: '/students', name: 'Estudiante', element: StudentLists},
  { path: '/students/:uid', name: 'Estudiante', element: StudentProfile, exact: false },
  { path: '/programs/create', name: 'Crear Programa', element: createProgram },
  { path: '/careers/add', name: 'Agregar Carrera', element: addCareer },
  { path: '/teachers', name: 'Profesor', element: TeacherLists},
  { path: '/teachers/:uid', name: 'Profesor', element: TeacherProfile, exact: false },
  { path: '/sections', name: 'Secciones', element: Sections },
]

export default routes

// Ejemplo de uso de rutas protegidas por rol:
// import ProtectedRoute from './components/ProtectedRoute'
// import { useSelector } from 'react-redux' // o tu contexto
// const userRole = useSelector(state => state.auth.user.rol)
//
// <Route
//   path="/users"
//   element={
//     <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
//       <UserList />
//     </ProtectedRoute>
//   }
// />
// <Route
//   path="/students"
//   element={
//     <ProtectedRoute allowedRoles={['admin', 'secretary']} userRole={userRole}>
//       <StudentList />
//     </ProtectedRoute>
//   }
// />
