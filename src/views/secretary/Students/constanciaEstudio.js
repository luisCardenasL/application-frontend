import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Svg, Image } from '@react-pdf/renderer'
import logo from 'src/assets/images/unefa escudo.png'
import mppd from 'src/assets/images/escudo mppd.png'

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 40,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  title: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  membrete:{
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: 'justify',
  },
  firma: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
  },
  valido:{
    marginTop: 100,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  }
})

// Componente PDF
const ConstanciaEstudioPDF = ({ student = {}, Decano = '', fechaHora = '' }) => (
  <Document>
    <Page size="letter" style={styles.page}
      footer={({ pageNumber, totalPages }) => (
        <View style={{ position: 'absolute', left: 40, right: 40, bottom: 20, textAlign: 'center', fontSize: 10 }}>
          <Text>pagina {pageNumber}/{totalPages}</Text>
          <Text>fecha {fechaHora}</Text>
        </View>
      )}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image src={mppd} style={{ width: 80, height: 120, marginRight: 10 }} />
        <Text style={styles.membrete}>
          REPÚBLICA BOLIVARIANA DE VENEZUELA
          {"\n"}MINISTERIO DEL PODER POPULAR PARA LA DEFENSA
          {"\n"}UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA 
          {"\n"}DE LA FUERZA ARMADA NACIONAL BOLIVARIANA
          {"\n"}UNEFA
          {"\n"} NÚCLEO TÁCHIRA SAN CRISTÓBAL - ÁREA DE SECRETARIA
        </Text>
        <Image src={logo} style={{ width: 80, height: 120, marginLeft: 10 }} />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>CONSTANCIA DE ESTUDIO</Text>
        <Text style={styles.text}>
          Quien suscribe, <Text> {Decano} </Text>, 
          DECANO del núcleo TÁCHIRA SAN CRISTÓBAL de la Universidad Nacional Experimental Politécnica de la Fuerza Armada Nacional Bolivariana (UNEFA), 
          hace constar que el (la) ciudadano(a): <Text> {student.nombre || 'LUIS ALEJANDRO CÁRDENAS LOZANO'} </Text> 
          titular del Documento de Identidad: CÉDULA <Text> {student.cedula || '(V)-30443230'} </Text>, 
          es estudiante regular de esta Universidad y actualmente se encuentra cursando el <Text > {student.termino || '1'} </Text> 
          TERMINO Académico de la carrera de: <Text > {student.carrera || 'MAESTRÍA EN GERENCIA AMBIENTAL'} </Text> 
          <Text> {student.turno || 'DIURNO'} </Text>. en el perìodo <Text> {student.periodo || '2-2025'} </Text>.
        </Text>
        <Text style={styles.text}>
          Constancia que se expide a petición de la parte interesada en TÁCHIRA SAN CRISTÓBAL a la fecha <Text> {student.fecha || '12 de Junio de 2025'} </Text>.
        </Text>
        <Text style={styles.firma}>__________________________{"\n"}
          <Text> {Decano} </Text>. {"\n"}
          DECANO DEL NÚCLEO{"\n"}
          TÁCHIRA SAN CRISTÓBAL</Text>
        <Text style={styles.valido}>
          VALIDO SOLO CON SELLO HUMEDO
        </Text>
      </View>
    </Page>
  </Document>
)

// Componente para descargar el PDF
const ConstanciaEstudio = () => {
  // Obtener la fecha actual en formato largo en español
  const fechaActual = new Date().toLocaleDateString('es-VE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Obtener la fecha y hora actual en formato dd-mm-yyyy hh:mm:ss
  const now = new Date()
  const pad = (n) => n.toString().padStart(2, '0')
  const fechaHora = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

  // Datos de ejemplo
  const student = {
    nombre: 'LUIS ALEJANDRO CÁRDENAS LOZANO',
    cedula: '(V)-30443230',
    carrera: 'MAESTRÍA EN GERENCIA AMBIENTAL',
    periodo: '2-2025',
    termino: '1',
    turno: 'DIURNO',
    fecha: fechaActual, // Fecha dinámica
  }

  const Decano = 'CNEL. CARLOS ENRIQUE SAENZ USECHE'

  return (
    <div>
      <PDFDownloadLink
        document={<ConstanciaEstudioPDF student={student} Decano={Decano} fechaHora={fechaHora} />}
        fileName="constancia-estudio.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generando PDF...' : 'Descargar Constancia de Estudio'
        }
      </PDFDownloadLink>
    </div>
  )
}

export default ConstanciaEstudio
