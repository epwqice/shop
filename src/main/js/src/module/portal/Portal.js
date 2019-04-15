import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import UITable from '../../ui/component/UITable';
import UICreate from '../../ui/component/UICreate';
import UIAppBar from '../../ui/component/UIAppBar';
import { updata } from '../../action';
import UICreateStyle from '../../ui/component/UICreateStyle';
import UIComponentStyle from '../../ui/component/UIComponentStyle';
import UISnackbar from '../../ui/component/UISnackbar';
import UISnackbarStyle from '../../ui/component/UISnackbarStyle';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appTitle: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 24px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  tablePaper: {
    width: '100%',
  },
  table: {
    minWidth: 1020,
  },
  tableRow: {
    height: '2.5em',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableButton: {
    margin: theme.spacing.unit,
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableButtonPanel: {
    'display': 'flex',
    'justify-content': 'center',
  },
  ...UIComponentStyle(theme),
  ...UICreateStyle(theme),
  ...UISnackbarStyle(theme),
});


class WithThemePortal extends Component {
  constructor(props) {
    super(props);
  }

  changeValueAction = (props) => (e) => {
    const { dispatch, _model } = props;
    dispatch(updata({
      path: '/_model/drawer/state',
    }, !_model.drawer.state));
  }

  changeDrawerAction = (props, text) => (e) => {
    const { dispatch, _model } = props;
    dispatch(updata({
      path: '/_model/drawer/select',
    }, text));
  }

  render() {
    const { dispatch, classes, _model } = this.props;
    const state = _model.drawer.state;
    let contentCmp;
    if (_model.show.state === 'query') {
      contentCmp = UITable(this.props);
    } else if (_model.show.state === 'create' || _model.show.state === 'edit') {
      contentCmp = UICreate(this.props);
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        {UIAppBar(this.props)}
        {UISnackbar(this.props)}
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: state,
            [classes.drawerClose]: !state,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: state,
              [classes.drawerClose]: !state,
            }),
          }}
          open={state}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.changeValueAction(this.props)}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['商品管理', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text} onClick={this.changeDrawerAction(this.props, text)}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {contentCmp}
        </main>
      </div>);
  }
}

class Portal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes, _model, theme} = this.props;
    
    return (
    <MuiThemeProvider theme={theme}>
      <WithThemePortal {...this.props}/>
    </MuiThemeProvider>);
  }
}


export default connect(state => state.reducer)(withStyles(styles, { withTheme: true })(Portal));