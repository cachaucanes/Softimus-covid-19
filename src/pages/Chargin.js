import React from 'react'
import { ClipLoader } from 'react-spinners'



const Chargin = ({chargin}) => {
      
  return(
    <ClipLoader
        size={50}
        //size={"150px"} this also works
        color={"#123abc"}
        loading={chargin}
      />
  )
}

export default Chargin