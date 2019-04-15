import React from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {updata} from '../../action';

const loginAction = (props) => (event) => {
  const { dispatch, _model } = props;
  dispatch(updata({
    path: '/_model/app',
  }, {
    ..._model.app,
    userTagert: event.currentTarget,
    userMenu: true,
  }));
}

const changeValueAction = (props) => (e) => {
  const { dispatch, _model } = props;
  dispatch(updata({
    path: '/_model/drawer/state',
  }, !_model.drawer.state));
};

const closeMenuAction = props => () => {
  const { dispatch, _model } = props;
  dispatch(updata({
    path: '/_model/app/userMenu',
  }, false));
};

const settingAction = props => event => {

};

const logoutAction = props => event => {

};

const UIAppBar = (props) => {
  const {classes, _model} = props;
  const state = _model.drawer.state;
  const open = _model.app.userMenu;
  const userTagert = _model.app.userTagert;
  return (<AppBar
    position="fixed"
    className={classNames(classes.appBar, {
      [classes.appBarShift]: state,
    })}>
    <Toolbar className={classes.toolbar} disableGutters={!state}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={changeValueAction(props)}
        className={classNames(classes.menuButton, {
          [classes.hide]: state,
        })}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.appTitle} color="inherit" noWrap>
        控制台
      </Typography>
      <div>
        <IconButton
          aria-owns={'menu-appbar'}
          aria-haspopup="true"
          onClick={loginAction(props)}
          color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={userTagert}

          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          onClose={closeMenuAction(props)}>
          <MenuItem onClick={settingAction(props)}>设置</MenuItem>
          <MenuItem onClick={logoutAction(props)}>退出</MenuItem>
        </Menu>
      </div>
    </Toolbar>
  </AppBar>)
}

export default UIAppBar;