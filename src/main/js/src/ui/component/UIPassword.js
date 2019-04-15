import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { updata } from '../../action';

/**
 * 文本框值变更时间
 * @param {{id, model, classes, res, dispatch, path, show}} props 
 */
const chageTextValueAction = props => event => {
  const { dispatch, id, path} = props;
  dispatch(updata({
    path: path + '/' + id,
  }, event.target.value));
}

const changeShowAction = props => event => {
  const {dispatch, id, showPath, show} = props;
  dispatch(updata({
    path: showPath + '/' + id + '/passwordVisable',
  }, !show.passwordVisable));
};

const UIPassword = (props) => {
  const {id, model, classes, res, show} = props;
  const value = model[id] ? model[id] : '';
  return (<TextField
    key={id}
    id={id}
    label={res[id]}
    value={value}
    type={show.passwordVisable ? 'text' : 'password'}
    onChange={chageTextValueAction(props)}
    className={classes.textField}
    margin='normal'
    variant='outlined'
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="Toggle password visibility"
            onClick={changeShowAction(props)}
          >
            {show.passwordVisable ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />);
};

export default UIPassword;