import React from 'react'

const csvHeaders = [
  'CEDULA',
  'CODCARRERA',
  'CODOPCION',
  'NTERMINO',
  'MODALIDAD',
  'CODMATERIA',
  'NMATERIA',
  'NOTA',
  'CONDICION',
  'CIM',
  'PERIODOACA',
  'UC',
  'AÑO_EGRESO',
]

// Ejemplo de datos (puedes reemplazar por tus datos reales)
const exampleData = [
  {
    CEDULA: '22681813',
    CODCARRERA: 'BH',
    CODOPCION: '21BHC',
    NTERMINO: '1',
    MODALIDAD: '1',
    CODMATERIA: 'CJU-51123',
    NMATERIA: 'DERECHO CONSTITUCIONAL COMPARADO',
    NOTA: '18',
    CONDICION: '1',
    CIM: '3-2020-22681813',
    PERIODOACA: 'Mar-20',
    UC: '3',
    'AÑO_EGRESO': '2024',
  },
  {
    CEDULA: '22681813',
    CODCARRERA: 'BH',
    CODOPCION: '21BHC',
    NTERMINO: '1',
    MODALIDAD: '1',
    CODMATERIA: 'CJU-51112',
    NMATERIA: 'DERECHO PENAL',
    NOTA: '17',
    CONDICION: '1',
    CIM: '3-2020-22681813',
    PERIODOACA: 'Mar-20',
    UC: '3',
    'AÑO_EGRESO': '2024',
  },
  // ... más filas si lo deseas ...
]

function convertToCSV(headers, data) {
  const headerLine = headers.join(';')
  const rows = data.map(row =>
    headers.map(h => (row[h] !== undefined ? row[h] : '')).join(';')
  )
  return [headerLine, ...rows].join('\n')
}

const downloadCSV = (csvString, filename) => {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const GenerateCSV = ({ data = exampleData }) => {
  const handleDownload = () => {
    const csvString = convertToCSV(csvHeaders, data)
    downloadCSV(csvString, 'OBSERVACIONES TXT POSTGRADO.csv')
  }

  return (
    <button onClick={handleDownload}>
      Descargar CSV
    </button>
  )
}

export default GenerateCSV
