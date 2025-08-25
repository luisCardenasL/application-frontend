import React, { useState } from 'react'
import {
  CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane,
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton
} from '@coreui/react'

const mockSecciones = [
  { asignatura: 'Matemática I', seccion: 'A', participantes: 30 },
  { asignatura: 'Física II', seccion: 'B', participantes: 28 },
  { asignatura: 'Química', seccion: 'C', participantes: 25 },
]

const TeacherProfile = ({ teacher = {
  TSFiddoc: '12345678',
  TSFfname: 'María',
  TSFmname: 'Elena',
  TSFtname: '',
  TSFflnam: 'Rodríguez',
  TSFslnam: 'Pérez',
  TSFprfid: 'Matemático',
  TSFemail: 'maria.rodriguez@email.com',
  TSFctelf: '+584121234567',
  TSFmilbo: false,
  TSFstfst: 'active',
} }) => {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <>
      <CNav variant="tabs" className="mb-4">
        <CNavItem>
          <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)}>
            Datos Personales
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 2} onClick={() => setActiveTab(2)}>
            Secciones
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 3} onClick={() => setActiveTab(3)}>
            Usuario
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane visible={activeTab === 1}>
          <CCard className="mb-4">
            <CCardHeader>Datos Personales</CCardHeader>
            <CCardBody>
              <p><b>ID Documento:</b> {teacher.TSFiddoc}</p>
              <p><b>Nombre:</b> {teacher.TSFfname} {teacher.TSFmname} {teacher.TSFtname} {teacher.TSFflnam} {teacher.TSFslnam}</p>
              <p><b>Profesión:</b> {teacher.TSFprfid}</p>
              <p><b>Email:</b> {teacher.TSFemail}</p>
              <p><b>Teléfono:</b> {teacher.TSFctelf}</p>
              <p><b>Militar:</b> {teacher.TSFmilbo ? 'Sí' : 'No'}</p>
              <p><b>Estado:</b> {teacher.TSFstfst}</p>
            </CCardBody>
          </CCard>
        </CTabPane>
        <CTabPane visible={activeTab === 2}>
          <CCard className="mb-4">
            <CCardHeader>Secciones Asignadas</CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Asignatura</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sección</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Participantes</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Acción</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {mockSecciones.map((sec, idx) => (
                    <CTableRow key={idx}>
                      <CTableDataCell>{sec.asignatura}</CTableDataCell>
                      <CTableDataCell>{sec.seccion}</CTableDataCell>
                      <CTableDataCell>{sec.participantes}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="info" size="sm">Ver sección</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CTabPane>
        <CTabPane visible={activeTab === 3}>
          <CCard className="mb-4">
            <CCardHeader>Información de Usuario</CCardHeader>
            <CCardBody>
              <p><b>Correo:</b> {teacher.TSFemail}</p>
              <p><b>Configuraciones de Acceso:</b></p>
              <div className="d-flex align-items-center gap-3">
                <CButton color="warning">Restaurar contraseña</CButton>
                <div className="d-flex align-items-center">
                  <span className="me-2">Activo</span>
                  <input type="checkbox" checked={teacher.activo ?? true} onChange={() => {}} />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default TeacherProfile
