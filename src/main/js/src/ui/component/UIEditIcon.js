import React from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {updata} from '../../action';
import Util from '../../util';

const editAction = props => event => {
  const {dispatch, model} = props;
  dispatch(updata({
    path: '/_model/model/create',
  }, model));
  dispatch(updata({
    path: '/_model/show/state',
  }, 'edit'));
};

const UIEditIcon = (props) => {
  const {id} = props;
  return (<IconButton key={id} onClick={editAction(props)} color='default' aria-label="编辑">
    <EditIcon />
  </IconButton>);
}

export default UIEditIcon;