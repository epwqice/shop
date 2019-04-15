import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Badge from '@material-ui/core/Badge';
import SvgIcon from '@material-ui/core/SvgIcon';
import { updata } from '../../action';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const changeValueAction = (props) => (event, value) => {
  const { dispatch } = props;

  dispatch(updata({
    path: '/_model/navigation/value',
  }, value));
}

const OrderNavigation = (total, cls) => {
  if (total === 0) {
    // return <BottomNavigationAction label="订单" icon={<AddShoppingCart />} />;
    return <Tab label='订单' icon={<AddShoppingCart /> } />;
  }

  return (
    // <Badge className={cls} badgeContent={total} color="primary">
    //   <BottomNavigationAction label="订单" icon={<AddShoppingCart />} />
    // </Badge>
    <Badge className={cls} badgeContent={total} color="primary">
      <Tab label='订单' icon={<AddShoppingCart /> } />
    </Badge>
  );
}

const Navigation = (props) => {
  const { _model, classes } = props;
  // let total = 0;
  // Object.keys(_model.order.category).forEach(key => {
  //   total += _model.order.category[key];
  // });
  
  // const orderNav = OrderNavigation(total, classes.navigationBadge);
  return (
    // <BottomNavigation
    //   value={_model.navigation.value}
    //   onChange={changeValueAction(props)}
    //   className={classes.navigation}
    // >
    //   <BottomNavigationAction label="首页" icon={<HomeIcon />} />
    //   <BottomNavigationAction label="分类" icon={<Dashboard />} />
    //   {orderNav}
    //   {/* <BottomNavigationAction label="订单" icon={<AddShoppingCart />} /> */}
    //   <BottomNavigationAction label="我的" icon={<Person />} />
    // </BottomNavigation>
    <AppBar position="static" color="default">
      <Tabs
        value={_model.navigation.value}
        onChange={changeValueAction(props)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label='首页' icon={<HomeIcon />} />
        <Tab label='分类' icon={<Dashboard />} />
        <Tab label='订单' icon={<AddShoppingCart /> } />
        <Tab label='我的' icon={<Person />} />
      </Tabs>
    </AppBar>
  );
}

export default Navigation;