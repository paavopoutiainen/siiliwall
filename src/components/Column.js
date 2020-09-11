import React from "react";
import { Grid } from '@material-ui/core'
import { boardPageStyles } from '../styles/styles'

const Column = ({column}) => {
  const classes = boardPageStyles()
  
  return (
    <Grid
      item
      classes={{root: classes.column}}>
      <h1>{column.name}</h1>
    </Grid>
  );
};

export default Column;