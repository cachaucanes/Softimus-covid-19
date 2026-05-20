import React from 'react'
import { Card, CardContent, Typography, Zoom } from '@mui/material';
import Chargin from '../pages/Chargin';

const Casos = (props) => {
  return (
    <div>
      <Zoom in={true} style={{ transitionDelay: '500ms' }}>
        <Card
          variant="outlined"
          sx={{
            minWidth: 275,
            maxWidth: 300,
            background: props.background,
            margin: '5px'
          }}
        >
          <CardContent>
            <Typography sx={{ color: 'whitesmoke' }} variant="h5" component="h5">
              {props.title}
            </Typography>
            <Typography sx={{ color: 'whitesmoke' }} variant="h3" component="h3">
              {props.casos ? props.casos : (<Chargin chargin={true} />)}
            </Typography>
          </CardContent>
        </Card>
      </Zoom>
    </div>
  )
}

export default Casos