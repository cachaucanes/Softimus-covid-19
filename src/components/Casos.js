import React from 'react'

import { Card, CardContent, Typography, makeStyles, Zoom } from '@material-ui/core';
import Chargin from '../pages/Chargin';

const Casos = (props) => {  
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      maxWidth: 300,
      background: props.background,
      margin: 5
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    colorCard: {
      color: 'whitesmoke'
    }
  });
  const classes = useStyles();

  return (
    <div>
    <Zoom in={true} style={{ transitionDelay: '500ms' }}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.colorCard} variant="h5" component="h5">
            {props.title}            
        </Typography>
          <Typography className={classes.colorCard} variant="h3" component="h3">
            
            {props.casos ? props.casos : (<Chargin chargin={true}/>)}            
            
          </Typography>
        </CardContent>
      </Card>
      </Zoom>
    </div>
  )
}

export default Casos