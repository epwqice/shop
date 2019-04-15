import Util from '../../util';
import md5 from 'md5';
import { updata, deleteObj } from '../../action';

const {MsgUtil, ModelUtil} = Util;


const loginAction = props => event => {
  const {dispatch, _model} = props;

  if (!_model.model.create.name) {
    dispatch(updata({
      path: '/_model/snackbar',
    }, {
      visable: true,
      message: '请输入用户名',
      type: 'Error',
    }));
    return;
  }

  if (!_model.model.create.password) {
    dispatch(updata({
      path: '/_model/snackbar',
    }, {
      visable: true,
      message: '请输入密码',
      type: 'Error',
    }));
    return;
  }

  const body = ModelUtil.deepCopyModel(_model.model.create);

  body.password = md5(body.password);

  MsgUtil.post('/rest/login', body, (json) => {
    if (MsgUtil.isSuccess(json)) {
      dispatch(updata({
        path: '/_model/snackbar',
      }, {
        visable: true,
        message: '登陆成功',
        type: 'Success',
      }));

      window.location.href = json.content.redirectUrl; 
    } else {
      dispatch(updata({
        path: '/_model/snackbar',
      }, {
        visable: true,
        message: '用户名或密码错误',
        type: 'Error',
      }));
    }
  });
}

const loginModel = {
  res: {
    create: '登陆',
    name: '名称',
    password: '密码',
  },
  model: {
    create: {

    },
  },
  show: {
    create: {
      columns: {
        name: {
          type: 'UIText',
          isRequre: true,
        },
        password: {
          type: 'UIPassword',
          isRequre: true,
          passwordVisable: false,
        },
        _option: {
          close: {
            visable: false,
          },
          ok: {
            name: '登陆',
            action: loginAction,
            color: 'primary',
          }
        }
      }
    }
  }
};

export default loginModel;

