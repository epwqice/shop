import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const UISnackbarStyle = theme => ({
  snackbarMargin: {
    margin: theme.spacing.unit,
  },
  snackbarSuccess: {
    backgroundColor: green[600],
  },
  snackbarError: {
    backgroundColor: theme.palette.error.dark,
  },
  snackbarInfo: {
    backgroundColor: theme.palette.primary.dark,
  },
  snackbarWarning: {
    backgroundColor: amber[700],
  },
  snackbarIcon: {
    fontSize: 20,
  },
  snackbarIconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  snackbarMessage: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default UISnackbarStyle;