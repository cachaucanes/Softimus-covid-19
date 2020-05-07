export const reducer = (state, action) => {
  switch (action.type) {

    case 'CASOS_CONFIRMADOS':
      return{
        ...state,
        casosConfirmados: action.payload.casosConfirmados,
        infoTotalcasos: action.payload.infoTotalcasos
      }
    case 'CASOS_MUERTOS':
      return {
        ...state,
        totalCasosMuertos: action.payload.totalCasosMuertos
      }
    case 'RECUPERADOS':
      return {
        ...state,
        totalRecuperados: action.payload.totalRecuperados
      }
    
    case 'CASOS_AYER':
      return {
        ...state,
        casosDeAyer: action.payload.casosDeAyer
      }          
    case 'MUERTOS_AYER': {
      return {
        ...state,
        muertosAyer: action.payload.muertosAyer
      }
    }
    case 'RECUPERADOS_AYER': {
      return {
        ...state,
        recuperadosAyer: action.payload.recuperadosAyer
      }
    }
    case 'CASOS_HOY':
      return {
        ...state,
        casosDehoy: action.payload.casosDehoy
      }
    case 'MUERTOS_HOY':
        return {
          ...state,
          muertoshoy: action.payload.muertoshoy
        }
    case 'RECUPERADOS_HOY':
      return {
        ...state,
        recuperadosHoy: action.payload.recuperadosHoy
      }
  
    default:
      return state
  }
}
