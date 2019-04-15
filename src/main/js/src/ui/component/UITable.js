import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import {updata} from '../../action';
import Util from '../../util';

const {MsgUtil, ComponentUtil} = Util;

const filterSortAction = (props, orderBy, order, dispatch, page) => {

  const { rowsPerPage } = props._model.model.query;
  const strParam = MsgUtil.computePageTableParam({
    order,
    orderBy,
    rowsPerPage,
    page,
  });
  MsgUtil.get('/rest/item' + '?' + strParam, (json) => {
    if (MsgUtil.isSuccess(json)) {
      const result = {
        ...props._model.model.query,
        total: json.content.total,
        page: json.content.page,
        datas: json.content.datas,
        order,
        orderBy,
      };
      dispatch(updata({
        path: '/_model/model/query',
      }, result));
    } else {
      // 缺少错误处理
    }
  })
}

const sortAction = (props, column, order, isOrderColumn, dispatch) => (e) => {
  const {dispatch} = props;
  const {page} = props._model.model.query;
  let orderDirection;
  if (isOrderColumn) {
    orderDirection = order === 'asc' ? 'desc' : 'asc';
  } else {
    orderDirection = 'asc';
  }
  filterSortAction(props, column, orderDirection, dispatch, page);
}

const changePageAction = (props) => (event, page) => {
  const {dispatch} = props;
  const {order, orderBy} = props._model.model.query;
  filterSortAction(props, orderBy, order, dispatch, page);
}

const changePerPageAction = (props) => (event) => {
  const {dispatch} = props;
  const {order, orderBy} = props._model.model.query;
  filterSortAction(props, orderBy, order, dispatch, event.target.value);
}

const UITableHeader = (props) => {
  const { dispatch, _model } = props;
  const {res, action} = _model;
  const {order, orderBy} = _model.model.query;
  const {columns} = _model.show.query;
  return (
    <TableHead>
      <TableRow>
        {Object.keys(columns).map(
          column => (
            <TableCell
              key={column}
              align={'center'}
              padding={'default'}
              sortDirection={orderBy === column ? order : false}>
              <Tooltip
                title={res[column]}
                placement={'bottom-start'}
                enterDelay={300}>
                <TableSortLabel
                  active={orderBy === column}
                  direction={order}
                  onClick={sortAction(props, column, order, orderBy === column, dispatch)}>
                  {res[column]}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

const UITableRow = (props, row, rowIndex, columns) => {
  const {classes, dispatch, _model, theme} = props;
  return Object.keys(columns).map((column, index, array) => {
    const cmp = ComponentUtil.factory(columns[column].type, {
      id: column,
      model: row,
      classes,
      res: _model.res,
      dispatch,
      theme,
      show: _model.show.query.columns[column],
      path: '/_model/model/query/datas/' + row['_id'],
    });

    return <TableCell key={column} align='center'>{cmp}</TableCell>
  });
}

const UITableBody = (props) => {
  const {classes, _model} = props;
  const {res, model} = _model;
  const {datas, rowsPerPage} = model.query;
  const {columns} = _model.show.query;
  const emptyRows = rowsPerPage - Object.keys(datas).length;
  return (<TableBody>
    {Object.keys(datas).map((id, index, array) => {
        return (
          <TableRow className={classes.tableRow} key={id}>
            {UITableRow(props, datas[id], index, columns)}
          </TableRow>
        );
      })}
    {emptyRows > 0 && (
      <TableRow style={{ height: 49 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
    )}
    </TableBody>
  );
}

const createAction = props => event => {
  const { dispatch } = props;
  dispatch(updata({
    path: '/_model/create',
  }, {}));
  dispatch(updata({
    path: '/_model/show/state',
  }, 'create'));
}

const UIOperation = (props) => {
  const { classes } = props;
  return (<Button variant="contained" color="primary" 
    className={classes.tableButton}
    onClick={createAction(props)}>
      新增
      <AddIcon className={classes.rightIcon} />
    </Button>
    );
}

/**
 * 表格
 * @param {object} props 
 */
const UITable = (props) => {
  const { dispatch, classes } = props;
  const { datas, total, order, orderBy, selected, rowsPerPage, page } = props._model.model.query;

  return (
    <Paper className={classes.tablePaper}>
      {UIOperation(props)}
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          {UITableHeader(props)}
          {UITableBody(props)}
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50, 100]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={changePageAction(props)}
        onChangeRowsPerPage={changePerPageAction(props)}
      />
    </Paper>
  );
}

export default UITable;