import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react'

const mockSecciones = [
  { asignatura: 'Matemática I', seccion: 'A', profesor: 'María Rodríguez', participantes: 30 },
  { asignatura: 'Física II', seccion: 'B', profesor: 'Carlos Pérez', participantes: 28 },
  { asignatura: 'Química', seccion: 'C', profesor: 'Ana Gómez', participantes: 25 },
]

const Sections = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Listado de Secciones</CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary">Asignatura</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Sección</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Profesor</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Participantes</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Acción</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {mockSecciones.map((sec, idx) => (
                <CTableRow key={idx}>
                  <CTableDataCell>{sec.asignatura}</CTableDataCell>
                  <CTableDataCell>{sec.seccion}</CTableDataCell>
                  <CTableDataCell>{sec.profesor}</CTableDataCell>
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
    </>
  )
}

export default Sections


