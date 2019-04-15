import React from 'react';
import Util from '../../util';

const UIButtonPanel = props => {
  const {id, classes, show} = props;
  const cmps = Object.keys(show.columns).map((key, index) => 
    Util.ComponentUtil.factory(show.columns[key].type, { 
      ...props,
      id: key,
      show: show.columns[key],
  }));
  return (<div key={id} className={classes.tableButtonPanel}>
    {cmps}
  </div>);
};

export default UIButtonPanel;