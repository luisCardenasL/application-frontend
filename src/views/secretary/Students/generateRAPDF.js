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
    marginBottom: 3,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 40,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 10,
    textAlign: 'justify',
    marginTop: 10,
    lineHeight: 1.5,
  },
  membrete:{
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 11,
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 3,
  },
  text: {
    fontSize: 10,
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
  },
  table: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tableHeader: {
    width: '55%',
    marginBottom: 5,
    textAlign: 'center',
  },
  tableHeader2: {
    width: '10%',
    marginBottom: 5,
    textAlign: 'center',
  },
  tableHeader3: {
    width: '25%',
    marginBottom: 5,
    textAlign: 'center',
  },
  tableHeader4: {
    width: '10%',
    marginBottom: 5,
    textAlign: 'center',
  },
  tableRow: {
    width: '55%',
    marginBottom: 5,
    textAlign: 'left',
    fontSize: 10,
  },
  tableRow2: {
    width: '10%',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 10,
  },
  tableRow3: {
    width: '25%',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 10,
  },
  tableRow4: {
    width: '10%',
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 10,
  }
})

const MAX_ASIGNATURAS_POR_PAGINA = 10;

function chunkNotas(notas, maxPorPagina) {
  // notas: [{ termino, asignaturas: [...] }, ...]
  // Devuelve: [[{ termino, asignaturas: [...] }, ...], ...] agrupadas por páginas
  const pages = [];
  let currentPage = [];
  let count = 0;

  for (let i = 0; i < notas.length; i++) {
    const terminoObj = notas[i];
    let asignaturas = [...terminoObj.asignaturas];
    while (asignaturas.length > 0) {
      const espacio = maxPorPagina - count;
      const toAdd = asignaturas.splice(0, espacio);
      if (
        currentPage.length > 0 &&
        currentPage[currentPage.length - 1].termino === terminoObj.termino
      ) {
        currentPage[currentPage.length - 1].asignaturas.push(...toAdd);
      } else {
        currentPage.push({ ...terminoObj, asignaturas: toAdd });
      }
      count += toAdd.length;
      if (count >= maxPorPagina) {
        pages.push(currentPage);
        currentPage = [];
        count = 0;
      }
    }
  }
  if (currentPage.length > 0) pages.push(currentPage);
  return pages;
}

const ConstanciaNotasPDF = ({ student = {}, Decano = '', fechaHora = '', notas = [] }) => {
  const paginasNotas = chunkNotas(notas, MAX_ASIGNATURAS_POR_PAGINA);

  return (
    <Document>
      {paginasNotas.map((notasPagina, idx) => (
        <Page key={idx} size="letter" style={styles.page}
          footer={() => (
            <View style={{ textAlign: 'center', fontSize: 10 }}>
              <Text>-VA SIN ENMIENDAS-</Text>
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
            <Text style={styles.title}>CONSTANCIA DE NOTAS</Text>
            <Text style={styles.text}>Por medio de la presente, se hace constar que el (la) ciudadano(a): <Text> {student.nombre || 'LUIS ALEJANDRO CÁRDENAS LOZANO'} </Text> 
             C.I. No. <Text> {student.cedula || '(V)-30443230'} </Text> curso en esta Universidad, las asignaturas de <Text> {student.carrera || 'MAESTRÍA EN GERENCIA AMBIENTAL'} </Text>
             que a continuacion se especifican:
            </Text>
            {notasPagina.map((termino, index) => (
              <View key={index}>
                <Text style={styles.subtitle}>Término: {termino.termino}</Text>
                <View style={styles.table}>
                  <Text style={styles.tableHeader}>ASIGNATURAS</Text>
                  <Text style={styles.tableHeader2}>UC</Text>
                  <Text style={styles.tableHeader3}>CALIFICACIÓN</Text>
                  <Text style={styles.tableHeader4}>OBSERVACIONES</Text>
                </View>
                {termino.asignaturas.map((asignatura, idx2) => (
                  <View key={idx2} style={styles.table}>
                    <Text style={styles.tableRow}>{asignatura.nombre}</Text>
                    <Text style={styles.tableRow2}>{asignatura.UC}</Text>
                    <Text style={styles.tableRow3}>{asignatura.nota}</Text>
                    <Text style={styles.tableRow4}>{asignatura.observacion}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </Page>
      ))}
      <Page size="letter" style={styles.page}>
        <View style={styles.section}>
        <Text style={styles.title2}>CONTINUACION DE LA CONSTANCIA DE NOTAS DE 
          <Text> {student.nombre || 'LUIS ALEJANDRO CÁRDENAS LOZANO'} </Text>
          C.I. No. <Text> {student.cedula || '(V)-30443230'} </Text>
          </Text>
          <Text style={styles.text2}>Estas asignaturas podrán ser acreditadas al Programa de <Text> {student.carrera || 'MAESTRÍA EN GERENCIA AMBIENTAL'} </Text>
          que se dicta en la seda de la UNEFA en Táchira{"\n"}
          Constancia que se expide a solicitud de la parte interesada, en la ciudad de San Cristóbal, el día {student.fecha || '23-07-2025'}
          </Text>
          <>
                <Text style={styles.firma}>__________________________{"\n"}
                  <Text> {Decano} </Text>. {"\n"}
                  DECANO DEL NÚCLEO TÁCHIRA
                </Text>
                <Text style={styles.valido}>
                  VALIDO SOLO CON SELLO HUMEDO
                </Text>
              </>

        </View>
      </Page>
    </Document>
  );
};

// Componente para descargar el PDF
const ConstanciaNotas = () => {
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
    nombre: 'JUAN CARLOS PÉREZ GOMEZ',
    cedula: '(V)-30443230',
    carrera: 'MAESTRÍA EN GERENCIA AMBIENTAL',
    periodo: '2-2025',
    termino: '3',
    turno: 'DIURNO',
    fecha: fechaActual, // Fecha dinámica
  }

  const notas = [
    {
      termino: '2-2021',
      asignaturas: [
        {nombre: 'GERENCIA DE RECURSOS HUMANOS', nota: '10', UC: '3',observacion: 'Reprobado'},
        {nombre: 'COMPORTAMIENTO ORGANIZACIONAL', nota: '19', UC: '3',observacion: 'Aprobado'},
        {nombre: 'MARCO LEGAL LABORAL', nota: '18', UC: '3',observacion: 'Aprobado'},
      ]
    },
    {
      termino: '3-2021',
      asignaturas: [
        {nombre: 'GERENCIA DE RECURSOS HUMANOS', nota: '18', UC: '3',observacion: 'Repitio'},
        {nombre: 'PLANIFICACIÓN ESTRATEGICA DEL RECURSO HUMANOS', nota: '17', UC: '3',observacion: 'Aprobado'},
        {nombre: 'FORMACIÓN DE COMPETENCIAS PARA LA INVESTIGACIÓN', nota: '17', UC: '3',observacion: 'Aprobado'},
      ]
    }
  ]

  const Decano = 'CNEL. CARLOS ENRIQUE SAENZ USECHE'

  return (
    <div>
      <PDFDownloadLink
        document={<ConstanciaNotasPDF student={student} Decano={Decano} fechaHora={fechaHora} notas={notas} />}
        fileName= {"constancia-notas-"+student.cedula+".pdf"}
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generando PDF...' : 'Descargar Constancia de Notas'
        }
      </PDFDownloadLink>
    </div>
  )
}

export default ConstanciaNotas