/**
 * Count cases in general that do not have many properties to validate.
 * 
 * @param {Array} cases - list of cases. 
 * @returns {Number} The sum of cases.
 */
function countNonSpecificCases(cases, fechaHoy, fechaAyer){
    console.log(typeof cases, cases.length);
    let initValue = {
        totalFallecido: 0,
        totalRecuperados: 0,
        totalHoy: 0,
        totalAyer: 0                
    }
    
    const totalCases = cases.reduce((prevValue, currentCase) => {        
        if(currentCase.estado === 'Fallecido') prevValue.totalFallecido = prevValue.totalFallecido + 1
        if(currentCase.atenci_n === 'Recuperado') prevValue.totalRecuperados = prevValue.totalRecuperados + 1
        if(currentCase.fecha_reporte_web === fechaHoy) prevValue.totalHoy = prevValue.totalHoy + 1
        if(currentCase.fecha_reporte_web === fechaAyer) prevValue.totalAyer = prevValue.totalAyer + 1

        return prevValue
      }, initValue);

    return totalCases
    
}

export {countNonSpecificCases}