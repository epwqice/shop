import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShopPage from './component/ShopPage';
import OrderPage from './component/OrderPage';
import Navigation from './component/Navigation';
import { withStyles } from '@material-ui/core/styles';

const drawerSize = 130;

const styles = {
  page: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: 'calc(100% - 72px)',
  },
  drawer: {
    width: drawerSize,
    overflow: 'auto',
    height: '100%',
    float: 'left',
  },
  drawerItem: {
    width: '100%',
    height: '100%',
    flexShrink: 0,
  },
  shopPage: {
    width: '100%',
    height: '100%',
  },
  item: {
    width: 'calc(100% - ' + drawerSize + 'px)',
    height: '100%',
    float: 'left',
  },
  itemIcon: {
    // position: 'absolute',
    // right: '0px',
    // top: '0px',
    // margin: '20px',
    color: 'rgba(255, 255, 255, 0.54)',
  },
  itemGridList: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    'overflow-y': 'auto',
  },
  itemTitle: {
    width: '100%',
    height: '60px',
  },
  itemPrice: {
    'font-size': '1.2em',
    color: 'red',
  },
  itemOldPrice: {
    'text-decoration': 'line-through',
    'font-size': '0.75em',
  },
  itemOrderTotal: {
    float: 'right',
  },
  navigation: {
    'z-index': 1250,
    position: 'relative',
    width: '100%',
  },
  navigationBadge: {
    // position: 'absolute',
    // right: '0px',
    // top: '0px',
    // margin: '20px',
    color: 'rgba(255, 255, 255, 0.54)',
  },
  order: {
    width: '100%',
    height: '100%',
  },
  orderList: {
    width: '100%',
    height: 'calc(100% - 2em - 48px)',
    'overflow-y': 'auto',
  },
  orderItem: {
    display: 'flex',
  },
  orderItemPic: {
    width: '20%',
  },
  orderItemContext: {
    flex: '1 1 auto',
    display: 'flex',
  },
  orderItemContextText: {
    flex: '1 1 auto',
  },
  orderItemContextAction: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  orderTotal: {
    display: 'flex',
    height: '2em',
    margin: '0 0.75em 0.5em 0.75em',
  },
  orderTotalText: {
    flex: '1 1 auto',
  },
  orderTotalButton: {
    flex: '0 0 auto',
    width: '8em',
  }
};
class View extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, classes, _model } = this.props;
    // 
    let contentPage;
    switch (_model.navigation.value) {
      case 1: 
        contentPage = ShopPage(this.props);
        break;
      case 2:
        contentPage = OrderPage(this.props);
        break;
      default: 
        contentPage = ShopPage(this.props);
        break;
    }

    const navCmp = Navigation(this.props);
    return (<div className={classes.page}>
      <div className={classes.content}>{contentPage}</div>
      <React.Fragment>{navCmp}</React.Fragment>
    </div>);
  }
}

export default connect(state => state.reducer)(withStyles(styles)(View));