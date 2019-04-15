import React from 'react';
import Typography from '@material-ui/core/Typography';

const UILabel = (props) => {
  const { id, model, classes} = props;
  const value = model[id] ? model[id] : '';
  return (<Typography className={classes.createTitle} gutterBottom variant="inherit">
    {value}
  </Typography>);
};

export default UILabel;