import React from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { updata, deleteObj } from '../../action';
import Util from '../../util';

// const {MsgUtil} = Util;

const deleteAction = props => event => {
  const {path, dispatch, show, id, model} = props;
  const uri = show.path;
  const body = {
    '_id': model['_id'],
  };
  Util.MsgUtil.delete(show.path, body, (json) => {
    if (Util.MsgUtil.isSuccess(json)) {
      dispatch(deleteObj({
        path,
      }));
    } else {
      // 缺少错误处理
    }
  });
};

const style = theme  => ({
  button: {
    margin: theme.spacing.unit,
  }
});

const UIDeleteIcon = (props) => {
  const { id, model, classes, res, theme, dispatch } = props;
  const iClasses = classNames(style(theme));
  return (<IconButton key={id} onClick={deleteAction(props)} color='secondary' className={iClasses.button} aria-label="删除">
    <DeleteIcon />
  </IconButton>);
}

export default UIDeleteIcon;