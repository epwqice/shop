import React from 'react';
import Portal from '../module/portal/Portal';
import start from '../index';

const portalModel = {
  _model: {
    drawer: {
      state: true,
    },
    items: {
      order: 'asc',
      orderBy: '',
      datas: {id1: {
        id: 'id1',
        name: '橘子',
        price: 4.5,
        oldPrice: 10,
        unit: '斤',
        picture: '/image/orange.jpg',
        num: 99,
      }},
      total: 100,
      page: 0,
      rowsPerPage: 10,
      orders: ['name', 'price', 'oldPrice', 'unit', 'num'],
      columns: ['name', 'price', 'oldPrice', 'unit', 'picture'],
      res: {
        name: '名称',
        price: '价格',
        oldPrice: '原价',
        unit: '单位',
        picture: '图片',
        num: '库存',
      }
    }
  },
};

start('app', portalModel, <Portal _model={portalModel} />);