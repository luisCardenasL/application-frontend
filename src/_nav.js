import React from 'react'
import { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilPencil,
  cilPeople,
  cilGroup,
  cilStar,
  cilClipboard,
  cilBarChart,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import helpFetch from './hooks/helpFetch'

const _nav = [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/dashboard',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  }
]

const adminNav = [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/dashboard',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Secretaria',
  },
  {
    component: CNavItem,
    name: 'Inscripciones',
    to: '/registration',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Estudiantes',
    to: '/students',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Programas',
    to: '/reports',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Vizualizar Programa',
        to: '#',
      },
      {
        component: CNavItem,
        name: 'Crear Programa',
        to: '#',
      },
      {
        component: CNavItem,
        name: 'Agregar Carrera',
        to: '#',
      },
      {
        component: CNavItem,
        name: 'Gestionar Asignaturas',
        to: '#',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Coordinador',
  },
  {
    component: CNavItem,
    name: 'Secciones',
    to: '#',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Profesores',
    to: '/teachers',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
]

const secretaryNav = [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/dashboard',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Usuarios',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Secretaria',
  },
  {
    component: CNavItem,
    name: 'Inscripciones',
    to: '/registration',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Estudiantes',
    to: '/students',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Reportes',
    to: '/reports',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Report #1',
        to: '#',
      },
      {
        component: CNavItem,
        name: 'Report #2',
        to: '#',
      },
      {
        component: CNavItem,
        name: 'Report #2',
        to: '#',
      },
    ],
  },
]

const teacherNav = [
  {
    component: CNavTitle,
    name: 'Teacher',
  },
  {
    component: CNavItem,
    name: 'My Class',
    to: '#',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  }
]

const coordinatorNav = [
  {
    component: CNavTitle,
    name: 'Coordinator',
  },
  {
    component: CNavItem,
    name: 'Sections',
    to: '#',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Teachers',
    to: '/teachers',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  }
]

export default {adminNav,secretaryNav,teacherNav,coordinatorNav,_nav}
