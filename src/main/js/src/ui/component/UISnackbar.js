import React from 'react';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {updata} from '../../action';

const variantIcon = {
  Success: CheckCircleIcon,
  Warning: WarningIcon,
  Error: ErrorIcon,
  Info: InfoIcon,
};

const closeAction = props => () => {
  const {dispatch} = props;
  dispatch(updata({
    path: '/_model/snackbar/visable',
  }, false));
};

const UISnackbar = (props) => {
  const {classes, _model} = props;
  const snackbarModel = _model.snackbar;
  const snackbarType = snackbarModel.type;
  const stClsType = 'snackbar' + snackbarType;
  const Icon = variantIcon[snackbarType];
  if (!_model.snackbar.visable) {
    return undefined;
  }
  return (<Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={snackbarModel.visable}
    autoHideDuration={6000}
    onClose={closeAction(props)}>
     <SnackbarContent
      className={classNames(classes[stClsType], classes.snackbarMargin)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.snackbarMessage}>
          <Icon className={classNames(classes.snackbarIcon, classes.snackbarIconVariant)} />
          {snackbarModel.message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.snackbarClose}
          onClick={closeAction(props)}
        >
          <CloseIcon className={classes.snackbarIcon} />
        </IconButton>,
      ]}
    />
  </Snackbar>
  );
}

export default UISnackbar;