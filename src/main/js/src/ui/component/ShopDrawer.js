import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { updata } from '../../action';


const changeValueAction = (props, value) => (e, evalue) => {
  const { dispatch } = props;
  dispatch(updata({
    path: '/_model/category/select',
  }, value));
}

const ShopDrawer = (props) => {
  const { classes, _model } = props;
  
  return (
    <List className={classes.drawerItem}>
      {Object.keys(_model.category.value).map((key, index) => (
        <ListItem button key={key} onClick={changeValueAction(props, key)}>
          {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
          {_model.order.category[key] &&
          <Badge className={classes.itemIcon} badgeContent={_model.order.category[key]} color="primary">
            <ListItemText primary={_model.category.value[key].name} />
          </Badge>}
          {!_model.order.category[key] && <ListItemText primary={_model.category.value[key].name} />}
        </ListItem>
      ))}
    </List>
  );
}

export default ShopDrawer;