import React, { useReducer, useEffect } from 'react';

import './App.css';
import Casos from './components/Casos';
import initial_state from './store/stores';
import { reducer } from './reducer/reducer';
import { Grid } from '@material-ui/core';
import Axios from 'axios';
import { countNonSpecificCases } from './utils';

export const Context = React.createContext()
const API = 'https://www.datos.gov.co/resource/gt2j-8ykr.json'
let date = new Date()

let mes = date.getMonth() + 1
let year = date.getFullYear()
let dia = date.getDate()
if (mes < 10) mes = `0${mes}`
if (dia < 10) dia = `0${dia}`
let diaAyer
if (dia < 10) {
  diaAyer = `0${dia - 1}`
} else {
  diaAyer = dia - 1
}
let fechaHoy = `${year}-${mes}-${dia}T00:00:00.000`

let fechaAyer = `${year}-${mes}-${diaAyer}T00:00:00.000`


function App() {

  const [state, setState] = useReducer(reducer, initial_state)

  useEffect(() => {

    const fetchCasos = async () => {
      try {
        /* Todos los casos confirmados*/
        const casos = await Axios.get(`${API}?$limit=590000`)
        // const casos = await Axios.get(`${API}?$limit=50000000`)
        const numeroCasosTotales = casos.data.length        
        
        setState({
          type: 'CASOS_CONFIRMADOS',
          payload: {
            casosConfirmados: numeroCasosTotales,
            infoTotalcasos: casos.data
          }
        })

        const sumaTypeCases = countNonSpecificCases(casos.data, fechaHoy, fechaAyer)      
        
        /* Todos los casos Muertos*/                
        setState({
          type: 'CASOS_MUERTOS',
          payload: {
            totalCasosMuertos: sumaTypeCases.totalFallecido
          }
        })

        /* Todos los casos recuperados*/        
        setState({
          type: 'RECUPERADOS',
          payload: {
            totalRecuperados: sumaTypeCases.totalRecuperados > 0 ? sumaTypeCases.totalRecuperados : (<p style={{ fontSize: '18px' }}>No hay datos</p>)
          }
        })


        /* Casos de ayer */        
        setState({
          type: 'CASOS_AYER',
          payload: {
            casosDeAyer: sumaTypeCases.totalAyer > 0 ? sumaTypeCases.totalAyer : (<p style={{ fontSize: '18px' }}>No hay datos</p>)
          }
        })

        /* Muertes de ayer */
        const casosMuertosAyer = await casos.data.filter(casov => {
          if (casov.estado === 'Fallecido' || casov.atenci_n === 'Fallecido') {
            if (casov.fecha_de_notificaci_n === fechaAyer ||
              casov.fecha_de_muerte === fechaAyer ||
              casov.fecha_diagnostico === fechaAyer ||
              casov.fecha_reporte_web === fechaAyer ||
              casov.fis === fechaAyer) {
              return true
            }
          }
          return false
        })
        const numberMuertosAyer = casosMuertosAyer.length
        setState({
          type: 'MUERTOS_AYER',
          payload: {
            muertosAyer: numberMuertosAyer > 0 ? numberMuertosAyer : (<p style={{ fontSize: '18px' }}>No hay datos</p>)
          }
        })

        /* Recuperados ayer */
        const casosRecuperadosAyer = await casos.data.filter(casov => {
          if (casov.atenci_n === 'Recuperado') {
            if (casov.fecha_de_notificaci_n === fechaAyer ||
              casov.fecha_diagnostico === fechaAyer ||
              casov.fecha_recuperado === fechaAyer ||
              casov.fis === fechaAyer ||
              casov.fecha_reporte_web === fechaAyer) {
              return true
            }
          }
          return false
        })
        const numberRecuperadosAyer = casosRecuperadosAyer.length
        setState({
          type: 'RECUPERADOS_AYER',
          payload: {
            recuperadosAyer: numberRecuperadosAyer > 0 ? numberRecuperadosAyer : (<p style={{ fontSize: '18px' }}>No hay datos</p>)
          }
        })

        /* Casos de hoy */        
        setState({
          type: 'CASOS_HOY',
          payload: {
            casosDehoy: sumaTypeCases.totalHoy > 0 ? sumaTypeCases.totalHoy : (<p style={{ fontSize: '18px' }}>No hay datos</p>)
          }
        })
        /* Casos muertos hoy */
        const casosMuertosHoy = await casos.data.filter(casov => {
          if (casov.estado === 'Fallecido' || casov.atenci_n === 'Fallecido') {
            if (casov.fecha_de_notificaci_n === fechaHoy ||
              casov.fecha_de_muerte === fechaHoy ||
              casov.fecha_diagnostico === fechaHoy ||
              casov.fecha_reporte_web === fechaHoy ||
              casov.fis === fechaHoy) {
              return true
            }
          }
          return false
        })
        setState({
          type: 'MUERTOS_HOY',
          payload: {
            muertoshoy: casosMuertosHoy.length > 0 ? casosMuertosHoy.length : (<p style={{ fontSize: '18px' }}>No hay datos</p>)
          }
        })

        /* Recuperados hoy */
        const casosRecuperadosHoy = await casos.data.filter(casov => {
          if (casov.atenci_n === 'Recuperado') {
            if (casov.fecha_de_notificaci_n === fechaHoy ||
              casov.fecha_diagnostico === fechaHoy ||
              casov.fecha_recuperado === fechaHoy ||
              casov.fis === fechaHoy ||
              casov.fecha_reporte_web === fechaHoy) {
              return true
            }
          }
          return false
        })        
        setState({
          type: 'RECUPERADOS_HOY',
          payload: {
            recuperadosHoy: casosRecuperadosHoy.length > 0 ? casosRecuperadosHoy.length : (<p style={{ fontSize: '18px' }}>No hay datos</p>)
          }
        })

      } catch (error) {
        console.log("error", error);
      }
    }
    fetchCasos()

  }, [])
  return (
    <Context.Provider value={{ state, setState }}>
      <div className="App">
        <div className="Header" style={{ textAlign: 'center', padding: '3rem', color: 'white' }}>
          <h1 style={{ margin: 0 }}>Datos Covid-19 Colombia</h1>
        </div>
        <div>
          <div>
            <h1>Casos totales</h1>
          </div>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
          >
            <Casos background='#ff980099' title={'Casos confirmados'} casos={state.casosConfirmados} />
            <Casos background='#ff00008f' title={'Muertes totales'} casos={state.totalCasosMuertos} />
            <Casos background='#00800099' title={'Total recuperados'} casos={state.totalRecuperados} />

          </Grid>
        </div>
        <div>
          <div>
            <h1>Casos de hoy</h1>
          </div>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
          >
            <Casos background='#ff9800b8' title={'Casos de hoy'} casos={state.casosDehoy} />
            <Casos background='#ff0000b8' title={'Muertes hoy'} casos={state.muertoshoy} />
            <Casos background='#008000c7' title={'Recuperados hoy'} casos={state.recuperadosHoy} />
          </Grid>



        </div>
        <div>
          <div>
            <h1>Casos de Ayer</h1>
          </div>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
          >
            <Casos background='#ff9800b8' title={'Casos Ayer'} casos={state.casosDeAyer} />
            <Casos background='#ff0000b8' title={'Muertes Ayer'} casos={state.muertosAyer} />
            <Casos background='#008000c7' title={'Recuperados Ayer'} casos={state.recuperadosAyer} />
          </Grid>



        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
