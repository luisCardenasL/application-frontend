import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import {
  CCloseButton,
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import helpFetch from '../hooks/helpFetch'

import { AppSidebarNav } from './AppSidebarNav'

// sidebar nav config
import navi from '../_nav'
import logo from 'src/assets/images/unefa (2).svg'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const API = helpFetch()
  const _navi = navi._nav
  const [navigation, setNavigation] = useState(_navi)
  
    const [isAdmin, setAdmin] = useState(false)
    const [isSecretary, setSecretary] = useState(false)
    const [isCoordinator, setCoordinator] = useState(false)
    const [isTeacher, setTeacher] = useState(false)
  
    const verifyAdmin = async () => {
      await API.get('verifyAdmin').then((res) => {
        setAdmin(res.ok)
      })
    }
  
    const verifySecretary = async () => {
      await API.get('verifySecretary').then((res) => {
        setSecretary(res.ok)
      })
    }
  
    const verifyTeacher = async () => {
      await API.get('verifyTeacher').then((res) => {
        setTeacher(res.ok)
      })
    }
  
    const verifyCoordinator = async () => {
      await API.get('verifyCoordinator').then((res) => {
        setCoordinator(res.ok)
      })
    }

    const arrangeNav = () => {
      if(isAdmin) 
      {
        setNavigation(navi.adminNav)
      }
        else if(isSecretary) {
          setNavigation(navi.secretaryNav)
        }
          else if(isCoordinator){
            setNavigation(navi.coordinatorNav)
          }
            else if(isTeacher) {
              setNavigation(navi.teacherNav)
            }
    }
  
    useEffect(() => {
      
      verifyAdmin()
      if(isAdmin) 
      {
        verifySecretary()
      }
        else if(isSecretary) {
          verifyCoordinator()
        }
          else if(isCoordinator){
            verifyTeacher()
          }
    }, [])

    useEffect(() => {
      arrangeNav()
    },[verifyAdmin,verifySecretary,verifyTeacher,verifyCoordinator])
  

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CImage align="center" rounded src={logo} height={48}/>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
