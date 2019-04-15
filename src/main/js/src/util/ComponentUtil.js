import React from 'react';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import UINumber from '../ui/component/UINumber';
import UIPicture from '../ui/component/UIPicture';
import UIDeleteIcon from '../ui/component/UIDeleteIcon';
import UIEditIcon from '../ui/component/UIEditIcon';
import UIButtonPanel from '../ui/component/UIButtonPanel';
import UITablePictureView from '../ui/component/UITablePictureView';
import UIPassword from '../ui/component/UIPassword';
import UILabel from '../ui/component/UILabel';
import { updata } from '../action';

/**
 * 文本框值变更时间
 * @param {{id, model, classes, res, dispatch, path, show}} props 
 */
const chageTextValueAction = props => event => {
  const { dispatch, id, path} = props;
  dispatch(updata({
    path: path + '/' + id,
  }, event.target.value));
}

/**
 * 组件工厂
 */
const factoryRelation = {
  UIText: (props) => {
    const { id, model, classes, res, dispatch } = props;
    const value = model[id] ? model[id] : '';
    return (<TextField
      key={id}
      id={id}
      label={res[id]}
      value={value}
      onChange={chageTextValueAction(props)}
      className={classes.textField}
      margin='normal'
      variant="outlined"
    />);
  },
  UIDouble: (props) => {
    const tProps = {
      ...props,
      reg: /^(\+|\-)?[0-9]*\.?[0-9]*$/,
    }
    return UINumber(tProps);
  },
  UIInteger: (props) => {
    const tProps = {
      ...props,
      reg: /^(\+|\-)?[0-9]*$/,
    }
    return UINumber(tProps);
  },
  UIPicture: (props) => UIPicture(props),
  UITablePictureView: props => UITablePictureView(props),
  UILabel: (props) => UILabel(props),
  UIDeleteIcon: (props) => UIDeleteIcon(props),
  UIEditIcon: props => UIEditIcon(props),
  UIButtonPanel: props => UIButtonPanel(props),
  UIPassword: props => UIPassword(props),
};

const factory = (type, props) => {
  if (!factoryRelation[type]) {
    console.error('类型不存在：' + type);
    return <div>类型不存在：{type}</div>
  }

  return factoryRelation[type](props);
} 

/**
 * 组件工具对象
 */
const ComponentUtil = {
  factory,
};

export default ComponentUtil;