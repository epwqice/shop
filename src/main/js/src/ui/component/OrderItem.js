import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { updata } from '../../action';

const addAction = (dispatch, _model, index, value) => (event, eValue) => {
  dispatch(updata({
    path: '/_model/order/select/' + index,
  }, value + 1));
  dispatch(updata({
    path: '/_model/order/total',
  }, _model.order.total + _model.category.items[index].price));
}

const subAction = (dispatch, _model, index, value) => (event, eValue) => {
  dispatch(updata({
    path: '/_model/order/select/' + index,
  }, value - 1));
  dispatch(updata({
    path: '/_model/order/total',
  }, _model.order.total - _model.category.items[index].price));
}

const OrderItem = (_model, index, classes, dispatch) => {
  console.log(_model.order.select[index] !== 0);
  return (
    <Card className={classes.orderItem} key={index}>
      <CardMedia
        className={classes.orderItemPic}
        image={_model.category.items[index].picture}
        title={_model.category.items[index].name}
      />
      <div className={classes.orderItemContext}>
        <CardContent className={classes.orderItemContextText}>
          <Typography component="h5" variant="h5">
            {_model.category.items[index].name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {_model.order.select[index] * _model.category.items[index].price}元
          </Typography>
        </CardContent>
        <div className={classes.orderItemContextAction}>
          <IconButton disabled={_model.order.select[index] === 0} aria-label="减少" onClick={subAction(dispatch, _model, index, _model.order.select[index])}>
            <RemoveIcon />
          </IconButton>
          <div>{_model.order.select[index]}</div>
          <IconButton aria-label="增加" onClick={addAction(dispatch, _model, index, _model.order.select[index])}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

export default OrderItem;