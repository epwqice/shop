import React from 'react';
import ShopDrawer from './ShopDrawer';
import ShopItem from './ShopItem';

const ShopPage = (props) => {
  const { classes } = props;
  const drawer = ShopDrawer(props);
  const shopItem = ShopItem(props);
  return (
    <>
      <div className={classes.drawer}>{drawer}</div>
      <div className={classes.item}>{shopItem}</div>
    </>
  );
}

export default ShopPage;