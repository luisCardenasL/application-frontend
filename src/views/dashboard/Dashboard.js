import React from 'react'
import classNames from 'classnames'

import { ChartBarDocuments } from '../../components/dashboardSec/DocumentsGraph'
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCardTitle, CContainer } from '@coreui/react'
import { ChartStudents } from '../../components/dashboardSec/ChartStudents'

const dataDoc = {
    labels: ['Doctorado en Ciencias Gerenciales',
            'Doctorado en Innovaciones Educativas',],
    datasets: [
      {
        backgroundColor: ['#DD1B16','#6610F2'],
        data: [10, 30],
      },
    ],
  }

  const dataMas = {
    labels: [
            'Maestría en Ciencias Jurídicas',
            'Maestría en Gerencia de Recursos Humanos',
            'Maestría en Gerencia Ambiental'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        data: [40, 20, 80],
      },
    ],
  }

const Dashboard = () => {
  return (
    <>
        <CCard className='d-flex justify-content-around'  >
        <CCardHeader>Estudiantes de las Carreras de Postgrado</CCardHeader>
        <CCardBody className='d-flex ' style={{width: '500px'}}>
          <ChartStudents data={dataDoc} ></ChartStudents>
          <ChartStudents data={dataMas}></ChartStudents>
        </CCardBody>
        <CCardFooter className='d-flex justify-content-around' >
          <CButton color="primary">Ver Listado de Estudiantes</CButton>
          <CButton color="primary">Inscripciones</CButton>
          <CButton color="primary">Listado de Carreras</CButton>
        </CCardFooter>
      </CCard>
      <br/>
      <CCard>
        <CCardHeader>
          <CCardTitle>Documentos Faltantes</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <ChartBarDocuments></ChartBarDocuments>
        </CCardBody>
        <CCardFooter>
          <CButton color="primary">Generar Reporte</CButton>
        </CCardFooter>
      </CCard>
        
      <br></br>

    </>
  )
}

export default Dashboard
