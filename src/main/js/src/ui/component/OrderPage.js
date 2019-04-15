import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import ShopDrawer from './ShopDrawer';
import ShopItem from './ShopItem';
import Typography from '@material-ui/core/Typography';
import OrderItemList from './OrderItemList';
import { updata } from '../../action';
import MsgUtil from '../../util/MsgUtil';

const changeValueAction = (props) => (e, value) => {
  const { dispatch } = props;
  dispatch(updata({
    path: '/_model/order/pageIndex',
  }, value));
}

const payAction = (props) => (e, value) => {
  // 发送消息
  MsgUtil.get
  // 1.成功
  // 1.1 清空购物车
  // 2.失败
  dispatch(updata({
    path: '/_model/order/pageIndex',
  }, value));
}


const OrderPage = (props) => {
  const { _model, classes } = props;
  const drawer = ShopDrawer(props);
  const shopItem = ShopItem(props);
  const orderItemList = OrderItemList(props);
  return (
    <div className={classes.order}>
      <AppBar position="static" color="default">
        <Tabs
          value={_model.order.pageIndex}
          onChange={changeValueAction(props)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label='购物车' />
          <Tab label='已完成' />
        </Tabs>
      </AppBar>
      <div className={classes.orderList}>
        {orderItemList}
      </div>
      <div className={classes.orderTotal}>
        <Typography component="h5" variant="h5" className={classes.orderTotalText}>
          总计:{_model.order.total}元
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={payAction(props)}
          className={classes.orderTotalButton}>
          付款
        </Button>
      </div>
    </div>
  );
}

export default OrderPage;