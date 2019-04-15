import React from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import Portal from '../module/portal/Portal';
import start from '../index';
import Util from '../util';
import { updata, deleteObj } from '../action';

const { MsgUtil } = Util;

const theme = createMuiTheme({
  palette: {
    primary: amber,
  },
  typography: {
    useNextVariants: true,
  },
});

const onCreateAction = props => event => {
  const {dispatch, _model} = props;

  const isCreate = !_model.model.create._id;
  MsgUtil.post('/rest/item', _model.model.create, (json) => {
    if (0 === json.result) {
      const keys = Object.keys(_model.model.query.datas);
      if (keys.length === _model.model.query.rowsPerPage && _model.show.state === 'create') {
        dispatch(updata({
          path: '/_model/model/query/datas/' + json.content._id,
        }, json.content));
        dispatch(deleteObj({
          path: '/_model/model/query/datas/' + keys[0],
        }, json.content));
      } else {
        dispatch(updata({
          path: '/_model/model/query/datas/' + json.content._id,
        }, json.content));
      }
      dispatch(updata({
        path: '/_model/show/state',
      }, 'query'));
      // 提示
      const preTitle = isCreate ? '创建' : '修改';
      dispatch(updata({
        path: '/_model/snackbar',
      }, {
        visable: true,
        message: preTitle + _model.model.create.name + '成功',
        type: 'Success',
      }));
    } 

  }, () => {
    
  });
}

const onCloseAction = props => event => {
  const {dispatch} = props;
  dispatch(updata({
    path: '/_model/show/state',
  }, 'query'));
}

const itemModel = {
  res: {
    name: '名称',
    price: '价格',
    oldPrice: '原价',
    unit: '单位',
    picture: '图片',
    num: '库存',
    action: '操作',
    _unit: {
      num: '件',
      price: '元',
      oldPrice: '元',
    }
  },
  model: {
    create: {

    },
    query: {
      order: 'asc',
      orderBy: '',
      datas: {
        
      },
      total: 100,
      page: 0,
      rowsPerPage: 10,
    }
  },
  show: {
    state: 'query',
    title: '商品',
    create: {
      columns: {
        name: {
          type: 'UIText',
        },
        price: {
          type: 'UIDouble',
        },
        oldPrice: {
          type: 'UIDouble',
        },
        unit: {
          type: 'UIText',
        },
        picture: {
          type: 'UIPicture',
          accept: 'jpg/jpeg/gif',
        },
        num: {
          type: 'UIInteger',
          min: 0,
          max: 999999,
          step: 1,
        },
        _option: {
          ok: {
            name: '确定',
            action: onCreateAction,
            color: 'primary',
          },
          close: {
            name: '关闭',
            action: onCloseAction,
          },
        }
      }
    },
    query: {
      orders: ['name', 'price', 'oldPrice', 'unit', 'num'],
      columns: {
        name: {
          type: 'UILabel'
        },
        price: {
          type: 'UILabel'
        },
        oldPrice: {
          type: 'UILabel'
        },
        unit: {
          type: 'UILabel'
        },
        picture: {
          type: 'UITablePictureView'
        },
        action: {
          type: 'UIButtonPanel',
          columns: {
            modify: {
              type: 'UIEditIcon',
              path: '/rest/item',
            },
            delete: {
              type: 'UIDeleteIcon',
              path: '/rest/item',
            },
          },
        }
      },
    }
  }
};

MsgUtil.get('/rest/item?order=asc&orderBy=name&page=0&rowsPerPage=10', (json) => {
  if (0 === json.result) {
    itemModel.model.query = {
      ...itemModel.model.query,
      ...json.content,
    };
    const portalModel = {
      theme,
      _model: {
        snackbar: {
          visable: false,
          message: '',
          type: '',
        },
        drawer: {
          state: true,
        },
        app: {
          userTagert: null,
          userMenu: false,
        },
        ...itemModel,
      },
    };
    start('app', portalModel, <Portal _model={portalModel} />);
  }
}, () => {
  
});
