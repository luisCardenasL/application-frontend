import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CProgress,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilLockLocked, cilUser } from '@coreui/icons'
import { cilPen, cilTrash, cilSearch, cilSortAlphaDown, cilSortAlphaUp, cilChevronLeft, cilChevronRight } from '@coreui/icons'

import Loader from '../../components/Loader'
import helpFetch from '../../hooks/helpFetch'
import studentLIst from '../../components/students/studentList.js'

// Componente modal para confirmar eliminación
const StudentDeleteModal = ({ studentId, studentDocument, studentName, onDelete, visible, setVisible }) => {
  const [validationCode, setValidationCode] = useState('')
  const API = helpFetch()
  const [code, setCode] = useState(generarCadenaAleatoria(6))

  function generarCadenaAleatoria(longitud) {
    const caracteresPosibles =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let resultado = "";
    const longitudCaracteres = caracteresPosibles.length;
  
    for (let i = 0; i < longitud; i++) {
      // Seleccionar un caracter aleatorio del conjunto
      resultado += caracteresPosibles.charAt(
        Math.floor(Math.random() * longitudCaracteres)
      );
    }
    return resultado;
  }

  const deleteStudent = async () => {
    console.log(code)
    console.log(validationCode)
    if (validationCode.trim() === '') {
      alert('Por favor ingrese el código de validación')
      return
    }

    if (validationCode.trim() !== code) {
      alert('El código de validación es incorrecto')
      return
    }
    
    try {
      const response = await API.delet('students', studentDocument)
      if (!response.error) {
        setVisible(false)
        setValidationCode('')
        onDelete() // Recargar la lista de estudiantes
        alert('Estudiante eliminado exitosamente')
      } else {
        alert('Error al eliminar el estudiante')
      }
    } catch (error) {
      console.error('Error deleting student:', error)
      alert('Error al eliminar el estudiante')
    }
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="StudentDeleteModal">
      <CModalHeader>
        <CModalTitle id="StudentDeleteModal">
          ¿Está seguro que desea eliminar este estudiante?
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Estudiante: <strong>{studentName}</strong></p>
        <p>Por favor ingrese el código de validación: {code}</p>
        <CForm>
          <CFormInput 
            type="text" 
            id="code" 
            label="Código de Validación" 
            value={validationCode}
            onChange={(e) => {
              setValidationCode(e.target.value);
            }}
            placeholder="Ingrese el código de validación"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Cancelar
        </CButton>
        <CButton color="danger" onClick={deleteStudent}>
          Confirmar Eliminación
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

const StudentLists = () => {
  const API = helpFetch()
  const [loading, setLoading] = useState(false)
  const [students, setStudent] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(10)

  const getStudents = async () => {
    setLoading(true)
    try {
      await API.get('students').then((response) => {
        console.log(response.msg)
        if (!response.error) {
          setStudent(response.msg)
          setFilteredStudents(response.msg)
        }
      })
    } catch (error) {
      console.error('Error fetching students:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (student) => {
    setSelectedStudent(student)
    setDeleteModalVisible(true)
    console.log(student)
    console.log(selectedStudent)
  }

  const handleDeleteSuccess = () => {
    getStudents() // Recargar la lista después de eliminar
  }

  // Función de búsqueda
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue)
    setCurrentPage(1) // Resetear a la primera página al buscar
    
    if (!searchValue.trim()) {
      setFilteredStudents(students)
      return
    }

    const filtered = students.filter(student => {
      const fullName = `${student.TSTfirna} ${student.TSTmidna} ${student.TSTthrna} ${student.TSTfltna} ${student.TSTsltna}`.toLowerCase()
      const code = student.TSTcodst?.toLowerCase() || ''
      const document = `${student.TSTtyidd}-${student.TSTiddoc}`.toLowerCase()
      const career = student.TMAmatri[0]?.TMAprogm?.TMAcarre?.TCAcname?.toLowerCase() || ''
      
      const searchLower = searchValue.toLowerCase()
      
      return fullName.includes(searchLower) || 
             code.includes(searchLower) || 
             document.includes(searchLower) ||
             career.includes(searchLower)
    })
    
    setFilteredStudents(filtered)
  }

  // Función de ordenamiento
  const handleSort = (field) => {
    let direction = 'asc'
    
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc'
    }
    
    setSortField(field)
    setSortDirection(direction)
    setCurrentPage(1) // Resetear a la primera página al ordenar
    
    const sorted = [...filteredStudents].sort((a, b) => {
      let aValue, bValue
      
      switch (field) {
        case 'code':
          aValue = a.TSTcodst || ''
          bValue = b.TSTcodst || ''
          break
        case 'name':
          aValue = `${a.TSTfirna} ${a.TSTmidna} ${a.TSTthrna} ${a.TSTfltna} ${a.TSTsltna}`.toLowerCase()
          bValue = `${b.TSTfirna} ${b.TSTmidna} ${b.TSTthrna} ${b.TSTfltna} ${b.TSTsltna}`.toLowerCase()
          break
        case 'document':
          aValue = `${a.TSTtyidd}-${a.TSTiddoc}`.toLowerCase()
          bValue = `${b.TSTtyidd}-${b.TSTiddoc}`.toLowerCase()
          break
        case 'career':
          aValue = a.TMAmatri[0]?.TMAprogm?.TMAcarre?.TCAcname?.toLowerCase() || ''
          bValue = b.TMAmatri[0]?.TMAprogm?.TMAcarre?.TCAcname?.toLowerCase() || ''
          break
        default:
          return 0
      }
      
      if (direction === 'asc') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
    
    setFilteredStudents(sorted)
  }

  // Función para obtener el ícono de ordenamiento
  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <CIcon icon={cilSortAlphaDown} size="sm" className="text-muted" />
    }
    return sortDirection === 'asc' 
      ? <CIcon icon={cilSortAlphaUp} size="sm" className="text-primary" />
      : <CIcon icon={cilSortAlphaDown} size="sm" className="text-primary" />
  }

  // Lógica de paginación
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Función para ir a la página anterior
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Función para ir a la página siguiente
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Función para generar números de página
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Si hay muchas páginas, mostrar un rango inteligente
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      
      // Ajustar el inicio si estamos cerca del final
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
    }
    
    return pageNumbers
  }

  useEffect(() => {
    getStudents()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <span>Lista de Estudiantes</span>
            <div className="d-flex align-items-center">
              <CInputGroup style={{ width: '300px' }}>
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Buscar por código, nombre, documento o carrera..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </CInputGroup>
            </div>
          </div>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <span>Código Estudiante</span>
                    <CButton 
                      variant="ghost" 
                      size="sm" 
                      className="ms-1 p-0"
                      onClick={() => handleSort('code')}
                    >
                      {getSortIcon('code')}
                    </CButton>
                  </div>
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <span>Nombre</span>
                    <CButton 
                      variant="ghost" 
                      size="sm" 
                      className="ms-1 p-0"
                      onClick={() => handleSort('name')}
                    >
                      {getSortIcon('name')}
                    </CButton>
                  </div>
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <span>Documento de Identidad</span>
                    <CButton 
                      variant="ghost" 
                      size="sm" 
                      className="ms-1 p-0"
                      onClick={() => handleSort('document')}
                    >
                      {getSortIcon('document')}
                    </CButton>
                  </div>
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Militar</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Estado</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <span>Carrera</span>
                    <CButton 
                      variant="ghost" 
                      size="sm" 
                      className="ms-1 p-0"
                      onClick={() => handleSort('career')}
                    >
                      {getSortIcon('career')}
                    </CButton>
                  </div>
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Modificar</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">Eliminar</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {currentStudents && (
              <CTableBody>
                {currentStudents.map((item) => (
                  <CTableRow key={item.TSTcodst}>
                    <CTableDataCell className="text-center">
                      <div>{item.TSTcodst}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{`${item.TSTfirna} ${item.TSTmidna} ${item.TSTthrna} ${item.TSTfltna} ${item.TSTsltna}`}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{`${item.TSTtyidd}-${item.TSTiddoc}`}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.TSTmilpe ? 'Militar' : 'Civil'}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.TMAmatri[0].TMTmstat}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.TMAmatri[0].TMAprogm.TMAcarre.TCAcname}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <Link to={`/students/${item.TSTcodst}`}>
                        <CIcon icon={cilPen} size="lg" color="primary" />
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <CButton 
                        variant="ghost" 
                        onClick={() => handleDeleteClick(item)}
                        className="p-0"
                      >
                        <CIcon icon={cilTrash} size="lg" className="text-danger" />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            )}
          </CTable>
          {filteredStudents.length === 0 && !loading && (
            <div className="text-center py-4">
              <p className="text-muted">No se encontraron estudiantes que coincidan con la búsqueda.</p>
            </div>
          )}
        </CCardBody>
        {totalPages > 1 && (
          <CCardFooter>
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">
                Mostrando {indexOfFirstStudent + 1} a {Math.min(indexOfLastStudent, filteredStudents.length)} de {filteredStudents.length} estudiantes
              </div>
              <CPagination aria-label="Paginación de estudiantes">
                <CPaginationItem 
                  aria-label="Página anterior" 
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  <CIcon icon={cilChevronLeft} />
                </CPaginationItem>
                
                {getPageNumbers().map((pageNumber) => (
                  <CPaginationItem
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </CPaginationItem>
                ))}
                
                <CPaginationItem 
                  aria-label="Página siguiente" 
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  <CIcon icon={cilChevronRight} />
                </CPaginationItem>
              </CPagination>
            </div>
          </CCardFooter>
        )}
      </CCard>

      {/* Modal de confirmación de eliminación */}
      {selectedStudent && (
        <StudentDeleteModal
          studentId={selectedStudent.TSTcodst}
          studentDocument={selectedStudent.TSTiddoc}
          studentName={`${selectedStudent.TSTfirna} ${selectedStudent.TSTmidna} ${selectedStudent.TSTthrna} ${selectedStudent.TSTfltna} ${selectedStudent.TSTsltna}`}
          onDelete={handleDeleteSuccess}
          visible={deleteModalVisible}
          setVisible={setDeleteModalVisible}
        />
      )}
    </>
  )
}

export default StudentLists
