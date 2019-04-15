import React from 'react';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Util from '../../util';

const { ComponentUtil, MsgUtil } = Util;




/**
 * 计算标题
 * @param {*} props 
 */
const computeTitle = (props) => {
  const {_model} = props;
  if (_model.res.create) {
    return _model.res.create;
  }

  return (_model.show.state === 'create'? '新增' : '修改') + _model.show.title
}

const createButton = (key, option, props) => {
  const {name, visable, action, color} = option;
  if (visable === null || visable === undefined || visable) {
    return (<Button
      key={key}
      color={color}
      variant='contained' 
      onClick={action(props)}
      className={props.classes.createButton}>
      {name}
    </Button>);
  }
  return undefined;
}

// id, model, classes, res, dispatch
const UICreate = (props) => {
  const {_model, classes, dispatch, theme} = props;
  const show = props._model.show.create;
  const cmps = [];
  Object.keys(show.columns).forEach((key, index) => {
    if (!key.startsWith('_')) {
      cmps.push((<div key={key} className={classes.createItem}>
        {ComponentUtil.factory(show.columns[key].type, { 
          id: key,
          model: _model.model.create,
          classes,
          res: _model.res,
          dispatch,
          show: show.columns[key],
          path: '/_model/model/create',
          showPath: '/_model/show/create/columns'
        })}
      </div>));
    }
  });

  const title = computeTitle(props);
  return (
    <Paper className={classes.createPaper}>
      <Typography className={classes.createTitle} gutterBottom variant="h6">
        {title}
      </Typography>
      {cmps}
      <div className={classNames(classes.createItem, classes.createButtonPanel)}>
        {Object.keys(_model.show.create.columns._option).map((key, index) => {
          return createButton(key, _model.show.create.columns._option[key], props);
        })}
      </div>
    </Paper>
  );
}

export default UICreate;