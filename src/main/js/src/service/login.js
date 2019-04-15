import React from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import Login from '../module/login/Login';
import loginModel from '../module/login/loginModel';
import UILoginStyle from '../module/login/LoginStyle';
import start from '../index';
import Util from '../util';

const theme = createMuiTheme({
  palette: {
    primary: amber,
  },
  typography: {
    useNextVariants: true,
  },
});

const { MsgUtil } = Util;

const LoginModel = {
  _model: {
    snackbar: {
      visable: false,
      message: '',
      type: '',
    },
    ...loginModel,
  },
  theme,
  styles: UILoginStyle,
};

start('app', LoginModel, <Login _model={LoginModel} />);