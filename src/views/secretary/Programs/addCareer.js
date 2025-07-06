import React from 'react'
import classNames from 'classnames'

import { useState, useEffect } from 'react'

import { CButton, CCard, CCardBody, CCardFooter, CCardHeader,CInputGroupText , CCardTitle, CContainer, CForm, CFormSelect, CInputGroup, CFormInput } from '@coreui/react'

import helpFetch from '../../../hooks/helpFetch'

  
const addCareer = () => {

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
            <CCardHeader>Agregar Carrera</CCardHeader>
            <CCardBody>
                <CInputGroup>
                    <CInputGroupText>Código de Carrera (Secretaria)</CInputGroupText>
                    <CFormInput type='text'></CFormInput>
                    <CInputGroupText>Código de Carrera (Postgrado)</CInputGroupText>
                    <CFormInput type='text'></CFormInput>
                </CInputGroup>
                <br></br>
                <CInputGroup>
                    <CInputGroupText>Nombre de la Carrera</CInputGroupText>
                    <CFormInput type='number'></CFormInput>
                </CInputGroup>
            </CCardBody>
            <CCardFooter>
                <CButton color='primary'>Agregar Carrera</CButton>
            </CCardFooter>
        </CCard>
    </>
  )
}

export default addCareer