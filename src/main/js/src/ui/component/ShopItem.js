import React from 'react';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import { updata } from '../../action';

const changeValueAction = (props, select, key) => (event) => {
  const { dispatch, _model } = props;
  let value;
  if (_model.order.select[key]) {
    value = _model.order.select[key] + 1;
  } else {
    value = 1;
  }
  dispatch(updata({
    path: '/_model/order/select/' + key,
  }, value));
  dispatch(updata({
    path: '/_model/order/total',
  }, _model.order.total + _model.category.items[key].price));
  let categoryValue;
  if (_model.order.category[select]) {
    categoryValue = _model.order.category[select] + 1;
  } else {
    categoryValue = 1;
  }
  dispatch(updata({
    path: '/_model/order/category/' + select,
  }, categoryValue));
}

const ShopItem = (props) => {
  const { _model, classes } = props;
  const select = _model.category.select;
  const items = _model.category.value[select].items;
  const title = _model.category.value[select].name;

  return (
      <GridList cellHeight={150} className={classes.itemGridList}>
        <GridListTile key="category" cols={2} style={{ height: 'auto' }} className={classes.itemTitle}>
          <ListSubheader component="div">
            {title}
            {_model.order.total !==0 && <span className={classes.itemOrderTotal}>总计:￥{_model.order.total}</span>}
          </ListSubheader>
        </GridListTile>
        {items && 
          Object.keys(_model.category.items).map(key => (
            <GridListTile key={key}>
              <img src={_model.category.items[key].picture} alt={_model.category.items[key].name} />
              <GridListTileBar
                title={_model.category.items[key].name + ' ' + _model.category.items[key].unit}
                subtitle={
                  <React.Fragment>
                    <span className={classes.itemPrice}>￥{_model.category.items[key].price}</span>
                    <span className={classes.itemOldPrice}>&nbsp;￥{_model.category.items[key].oldPrice}</span>
                  </React.Fragment>
                }
                actionIcon={
                  <IconButton onClick={changeValueAction(props, select, key)}>
                    {_model.order.select[key] &&
                    <Badge className={classes.itemIcon} badgeContent={_model.order.select[key]} color="primary">
                      <AddIcon />
                    </Badge>}
                    {!_model.order.select[key] && <AddIcon />}
                  </IconButton>
                }
              />
            </GridListTile>
        ))}
      </GridList>
  );
}

export default ShopItem;