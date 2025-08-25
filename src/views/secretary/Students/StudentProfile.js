import React, { useState } from 'react'
import {
  CCard, CCardBody, CCardHeader, CNav, CNavItem, CNavLink, CTabContent, CTabPane,
  CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton, CFormInput,
  CCardFooter
} from '@coreui/react'
import ConstanciaEstudio from './constanciaEstudio';
import ConstanciaNotas from './generateRAPDF';
import GenerateCSV from './generateCSV';


const mockNotas = [
  { termino: 1, asignatura: 'GERENCIA DE RECURSOS HUMANOS', nota: 18, observacion: 'Aprobado' },
  { termino: 1, asignatura: 'COMPORTAMIENTO ORGANIZACIONAL', nota: 15, observacion: 'Aprobado' },
  { termino: 2, asignatura: 'MARCO LEGAL LABORAL', nota: 12, observacion: 'Aprobado' },
  { termino: 2, asignatura: 'PLANIFICACIÓN ESTRATEGICA DEL RECURSO HUMANO', nota: 8, observacion: 'Reprobado' },
  { termino: 3, asignatura: 'FORMACIÓN DE COMPETENCIAS PARA LA INVESTIGACIÓN', nota: 17, observacion: 'Aprobado' },

]

const notasPorPagina = 5

const StudentProfile = ({ student = {
  TSTfirna: 'Juan',
  TSTmidna: 'Carlos',
  TSTthrna: '',
  TSTfltna: 'Pérez',
  TSTsltna: 'Gómez',
  TSTgenst: 'M',
  TSTbidat: '2000-01-01',
  TSTiddoc: '30443230',
  TSTemail: 'juan.perez@email.com',
  TSTcetel: '+584121234567',
  TSTretel: '+582123456789',
  TSTresad: 'Av. Principal, Caracas',
  TSTuniid: 'Universidad Central de Venezuela',
  TSTgrady: '2018',
  TSTgrmid: 'Mención Magna Cum Laude',
  carrera: 'MAESTRÍA EN GERENCIA AMBIENTAL',
  usuario: 'juanp',
  correo: 'juan.perez@email.com',
} }) => {
  const [activeTab, setActiveTab] = useState(1)
  const [pagina, setPagina] = useState(1)
  const totalPaginas = Math.ceil(mockNotas.length / notasPorPagina)
  const notasPagina = mockNotas.slice((pagina - 1) * notasPorPagina, pagina * notasPorPagina)

  return (
    <>
      <CNav variant="tabs" className="mb-4">
        <CNavItem>
          <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)}>
            Información General
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 2} onClick={() => setActiveTab(2)}>
            Carrera y Notas
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
            <CCardHeader>Información Personal</CCardHeader>
            <CCardBody>
              <p><b>Nombre:</b> {student.TSTfirna} {student.TSTmidna} {student.TSTthrna} {student.TSTfltna} {student.TSTsltna}</p>
              <p><b>Género:</b> {student.TSTgenst === 'M' ? 'Masculino' : 'Femenino'}</p>
              <p><b>Fecha de Nacimiento:</b> {student.TSTbidat}</p>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>Información de Contacto</CCardHeader>
            <CCardBody>
              <p><b>Correo:</b> {student.TSTemail}</p>
              <p><b>Teléfono Celular:</b> {student.TSTcetel}</p>
              <p><b>Teléfono de Residencia:</b> {student.TSTretel}</p>
              <p><b>Dirección:</b> {student.TSTresad}</p>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>Estudios Anteriores</CCardHeader>
            <CCardBody>
              <p><b>Universidad de Procedencia:</b> {student.TSTuniid}</p>
              <p><b>Año de Graduación:</b> {student.TSTgrady}</p>
              <p><b>Mención:</b> {student.TSTgrmid}</p>
            </CCardBody>
          </CCard>
        </CTabPane>
        <CTabPane visible={activeTab === 2}>
          <CCard className="mb-4">
            <CCardHeader>Carrera Actual</CCardHeader>
            <CCardBody>
              <p><b>Carrera:</b> {student.carrera}</p>
              <ConstanciaEstudio />
              <ConstanciaNotas />
              <GenerateCSV />
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>Notas</CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Término</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Asignatura</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nota</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Observación</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {notasPagina.map((nota, idx) => (
                    <CTableRow key={idx}>
                      <CTableDataCell>{nota.termino}</CTableDataCell>
                      <CTableDataCell>{nota.asignatura}</CTableDataCell>
                      <CTableDataCell>{nota.nota}</CTableDataCell>
                      <CTableDataCell>{nota.observacion}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <CButton disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
                  Anterior
                </CButton>
                <span>Página {pagina} de {totalPaginas}</span>
                <CButton disabled={pagina === totalPaginas} onClick={() => setPagina(pagina + 1)}>
                  Siguiente
                </CButton>
              </div>
            </CCardBody>
            <CCardFooter>
            </CCardFooter>
          </CCard>
        </CTabPane>
        <CTabPane visible={activeTab === 3}>
          <CCard className="mb-4">
            <CCardHeader>Información de Usuario</CCardHeader>
            <CCardBody>
              <p><b>Correo:</b> {student.correo}</p>
              <p><b>Configuraciones de Acceso:</b></p>
              <div className="d-flex align-items-center gap-3">
                <CButton color="warning">Restaurar contraseña</CButton>
                <div className="d-flex align-items-center">
                  <span className="me-2">Activo</span>
                  <input type="checkbox" checked={student.activo ?? true} onChange={() => {}} />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default StudentProfile
