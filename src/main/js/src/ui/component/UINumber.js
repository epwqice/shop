import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { updata } from '../../action';

const changeValueAction = props => event => {
  const value = event.target.value;

  const { id, path, dispatch, show } = props;
  const reg = new RegExp(props.reg);
  if (!reg.test(value)) {
    return;
  }
  dispatch(updata({
    path: path + '/' + id,
  }, value));
}

const UINumber = (props) => {
  const { id, model, classes, res, dispatch } = props;
  const value = model[id] ? model[id] : '';
  const cmpProps = {
    key: id,
    className: classes.textField,
    variant: 'outlined',
    label: res[id],
    value,
    onChange: changeValueAction(props),
    id,
    margin: 'normal',
  };
  if (res._unit[id]) {
    cmpProps.InputProps = {
      endAdornment: <InputAdornment position="end">{res._unit[id]}</InputAdornment>,
    };
  }

  return <TextField {...cmpProps} />;
}

export default UINumber;