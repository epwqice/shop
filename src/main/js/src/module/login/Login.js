import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider} from '@material-ui/core/styles';
import UICreate from '../../ui/component/UICreate';
import UISnackbar from '../../ui/component/UISnackbar';
import blue from '@material-ui/core/colors/blue';
import LoginStyle from './LoginStyle';

// const styles = theme => {
//   return ({
//   root: {
//     'background-color': theme.palette.primary[500],
//     width: '100%',
//     height: '100%',
//     display: 'flex',
//     'justify-content': 'center',
//     'align-items': 'center',
//   },
//   login: {
//     width: '30em',
//   },
//   ...UIComponentStyle(theme),
//   ...UICreateStyle(theme),
//   ...UISnackbarStyle(theme),
// })};

class WithStyleLogin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {classes, props} = this.props;
    const {props} = this.props;
    const {classes} = this.props.props.model;
    const subProps = {
      ...props.model,
      // classes,
    };
    // let contentCmp = UICreate(subProps);
    let contentCmp = UICreate(this.props.props.model);

    return (<div className={classes.root}>
      <div className={classes.login}>
        {UISnackbar(subProps)}
        {contentCmp}
      </div>
    </div>);
  }
}

class WithThemeLogin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {styles} = this.props.model;
    const WithStyleCmp = (WithStyleLogin);
    return <WithStyleCmp props={this.props}/>;
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes, _model, theme} = this.props;
    
    return (
    <MuiThemeProvider theme={theme}>
      <WithThemeLogin model={this.props}/>
    </MuiThemeProvider>);
  }
}

export default connect(state => state.reducer)(withStyles(LoginStyle)(Login));