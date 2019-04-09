const ItemModel = {
  _model: {
    navigation: {
      value: 1,
    },
    order: {
      select: {
      },
      category: {
      },
      total: 0,
      pageIndex: 0,
    },
    category: {
      select: 'index1',
      items: {
        // item1: {
        //   name: '橘子',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/orange.jpg',
        // },
        // item2: {
        //   name: '苹果',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/apple.jpg',
        // },
        // item3: {
        //   name: '橘子',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/orange.jpg',
        // },
        // item4: {
        //   name: '苹果',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/apple.jpg',
        // },
        // item5: {
        //   name: '橘子',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/orange.jpg',
        // },
        // item6: {
        //   name: '苹果',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/apple.jpg',
        // },
        // item7: {
        //   name: '橘子',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/orange.jpg',
        // },
        // item8: {
        //   name: '苹果',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/apple.jpg',
        // },
        // item9: {
        //   name: '橘子',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/orange.jpg',
        // },
        // item10: {
        //   name: '苹果',
        //   price: 4.5,
        //   oldPrice: 8,
        //   unit: '/斤',
        //   picture: '/img/apple.jpg',
        // },
      },
      value: { 
        index1: {
          name: '新鲜水果',
          items: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10'],
        },
        index2: {
          name: '时令蔬菜',
        },
        index3: {
          name: '分类3',
        },
        index4: {
          name: '分类4',
        },
        index5: {
          name: '分类5',
        },
        index6: {
          name: '分类6',
        },
        index7: {
          name: '分类7',
        },
        index8: {
          name: '分类8',
        },
        index9: {
          name: '分类9',
        },
        index10: {
          name: '分类10',
        },
        index11: {
          name: '分类11',
        },
        index12: {
          name: '分类12',
        },
        index13: {
          name: '分类13',
        },
        index14: {
          name: '分类14',
        },
      }
    },
  },
  // _iModel: {
  //   item: {
  //     id: { // 标识
  //       _type: 'String',
  //       _max: 64,
  //     },
  //     name: { // 名称
  //       _type: 'string',
  //       _max: '64',
  //     },
  //     originalPrice: { // 原始价格
  //       _type: 'integer',
  //       _min: 0,
  //       _max: 399999999,
  //     },
  //     price: { // 现价
  //       _type: 'integer',
  //       _min: 0,
  //       _max: 399999999,
  //     },
  //     picture: { // 图片
  //       _type: 'string',
  //       _max: '256',
  //     },
  //   },
  //   order: { // 订单
  //     id: {
  //       _type: 'String',
  //       _max: 64,
  //     },
  //     items: { // 商品标识组
  //       _isArray: true,
  //       _type: 'string',
  //       _max: 64,
  //     },
  //     totalPrice: { // 总价格
  //       _type: 'integer',
  //       _max: 399999999,
  //     },
  //     time: { // 下单时间
  //       _type: 'integer',
  //       _max: 399999999,
  //     },
  //     state: { // 状态
  //       _type: 'enum',
  //       _name: 'order',
  //     },
  //   },
  // },
};

export default ItemModel;