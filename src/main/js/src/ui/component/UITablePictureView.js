import React from 'react';

const UITablePictureView = (props) => {
  const {id, model, classes, res, dispatch, path, show} = props;
  return (
    <img className={classes.uiTablePictureView} src={model[id]} />
  );
};

export default UITablePictureView;