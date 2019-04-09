import React from 'react';
import ItemModel from '../model/ItemModel';
import Util from '../util';
import start from '../index';
import View from '../ui';

const { MsgUtil } = Util;

MsgUtil.get('/rest/item', (json) => {
  if (0 === json.result) {
    ItemModel._model.category.items = json.content.datas;
    start('app', ItemModel, <View {...ItemModel} />);
  }
});