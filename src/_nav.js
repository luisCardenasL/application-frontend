import React from 'react'
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

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Secretary',
  },
  {
    component: CNavItem,
    name: 'Registration',
    to: '/theme/colors',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Reports',
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
  {
    component: CNavItem,
    name: 'Academic Record',
    to: '#',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
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
    to: '#',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Teacher',
  },
  {
    component: CNavItem,
    name: 'My Class',
    to: '#',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default _nav
