import React from 'react'
import classNames from 'classnames'

import { useState, useEffect } from 'react'

import { CButton, CCard, CCardBody, CCardFooter, CCardHeader,CInputGroupText , CCardTitle, CContainer, CForm, CFormSelect, CInputGroup, CFormInput } from '@coreui/react'

import helpFetch from '../../../hooks/helpFetch'

  
const createProgram = () => {

const [careerCods, setCareerCods] = useState([])
  const API = helpFetch()

    const getCareerCods = async () => {
    await API.get('careerCods').then((response) => {
      console.log(response.msg)
      if (!response.error) setCareerCods(response.msg)
    })
  }

  const [inputs, setInputs] = useState([{ value: '' }]);

  const handleChange = (index, event) => {
    const values = [...inputs];
    values[index].value = event.target.value;
    setInputs(values);
  };

  const handleAdd = () => {
    setInputs([...inputs, { value: '' }]);
  };

  const handleRemove = (index) => {
    if (inputs.length > 1) {
      const values = [...inputs];
      values.splice(index, 1);
      setInputs(values);
    }
  };

   useEffect(() => {
      getCareerCods()
    }, [])


  return (
    <>
        <CCard>
            <CCardHeader>Crear Programa</CCardHeader>
            <CCardBody>
                <CInputGroup>
                    <CInputGroupText>Código de Carrera</CInputGroupText>
                                      <CFormSelect
                                        id="inputGroupSelect"
                                        options={careerCods}
                                        name="TMTproid"
                                      ></CFormSelect>
                </CInputGroup>
                <br></br>
                <CInputGroup>
                    <CInputGroupText>Número de Periodos</CInputGroupText>
                    <CFormInput type='number'></CFormInput>
                    <CInputGroupText>Regimen: </CInputGroupText>
                    <CFormSelect>
                    <option>Seleccione el Regimen</option>
                    <option value="Diurno">Diurno</option>
                    <option value="Noctuno">Nocturno</option>
                    </CFormSelect>
                </CInputGroup>
                <br></br>
                <CCardHeader>Materias</CCardHeader>
                <br></br>
                <div>
                {inputs.map((input, index) => (

                    <CCard>
                    <CCardBody>
                        <div key={index}>
                    <CInputGroup>
                        <CInputGroupText>Asignatura</CInputGroupText>
                        <CFormSelect>
                            <option>Seleccione la materia</option>
                        </CFormSelect>
                        <CInputGroupText>Termino</CInputGroupText>
                        <CFormInput type='number'></CFormInput>
                        <CInputGroupText>Prelada por:</CInputGroupText>
                        <CFormSelect>
                            <option>Sin Prelación</option>
                            <option>UC</option>
                            <option>Matería</option>
                            <option>UC y Materia</option>
                        </CFormSelect>
                    <CInputGroup>
                        <CInputGroupText>Materia Prelatoria</CInputGroupText>
                        <CFormSelect>
                            <option>Seleccione Materia Prelatoria...</option>
                        </CFormSelect>
                    </CInputGroup>
                    </CInputGroup>
                    <CInputGroup>
                        <CInputGroupText>Cantidad de UC necesarias</CInputGroupText>
                        <CFormInput type='number'></CFormInput>
                        {inputs.length > 1 && (
                        <CButton color='danger' onClick={() => handleRemove(index)}> Eliminar</CButton>
                        )}
                    </CInputGroup>
                    </div>
                    </CCardBody>
                        
                    </CCard>
                    
                ))}
                <br></br>
                <CButton color='secondary' onClick={handleAdd}> Agregar Materia</CButton>
                </div>
            </CCardBody>
            <CCardFooter>
                <CButton color='primary'>Agregar Programa</CButton>
            </CCardFooter>
        </CCard>
    </>
  )
}

export default createProgram
