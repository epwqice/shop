import React from 'react';
import OrderItem from './OrderItem';
const OrderItemList = (props) => {
  const { _model, classes, dispatch } = props;
  const items = [];
  Object.keys(_model.order.select).forEach((item, index) => {
      // if (_model.order.select[item] !== 0) {
        items.push(OrderItem(_model, item, classes, dispatch));
      // }
    }
  )
  return (
    <React.Fragment>
      {items}
    </React.Fragment>
  );
}

export default OrderItemList;