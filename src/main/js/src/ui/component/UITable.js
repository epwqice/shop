import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { updata } from '../../action';
import Util from '../../util';

const { MsgUtil } = Util;

const sortAction = (props, column, order, isOrderColumn, dispatch) => (e) => {
  let orderDirection;
  if (isOrderColumn) {
    orderDirection = order === 'asc' ? 'desc' : 'asc';
  } else {
    orderDirection = 'asc';
  }
  const { page, rowsPerPage } = props._model.items;
  const strParam = MsgUtil.computePageTableParam({
    order: orderDirection,
    orderBy: column,
    rowsPerPage,
    page,
  });
  MsgUtil.get('/rest/item' + '?' + strParam, (json) => {
    if (MsgUtil.isSuccess(json)) {
      const result = {
        ...props._model.items,
        total: json.content.total,
        page: json.content.page,
        datas: json.content.datas,
        order: orderDirection,
        orderBy: column
      };
      dispatch(updata({
        path: '/_model/items',
      }, result));
    } else {
      // 缺少错误处理
    }
  }, () => {

  })

}

const changePageAction = (props) => (event, page) => {
  const { dispatch } = props;
  dispatch(updata({
    path: '/_model/items/page',
  }, page));
}

const changePerPageAction = (props) => (event) => {
  const { dispatch } = props;
  dispatch(updata({
    path: '/_model/items/rowsPerPage',
  }, event.target.value));
}

const UITableHeader = (props) => {
  const { dispatch, _model } = props;
  const { order, columns, orderBy, res } = _model.items;
  return (
    <TableHead>
      <TableRow>
        {columns.map(
          column => (
            <TableCell
              key={column}
              align={'center'}
              padding={'default'}
              sortDirection={orderBy === column ? order : false}
            >
              <Tooltip
                title={res[column]}
                placement={'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column}
                  direction={order}
                  onClick={sortAction(props, column, order, orderBy === column, dispatch)}
                >
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

const UITableRow = (row, columns) => {
  return columns.map((column, index, array) => <TableCell key={column} align='center'>{row[column]}</TableCell>);
}

const UITableBody = (props) => {
  const { classes } = props;
  const { datas, columns, res, rowsPerPage } = props._model.items;
  const emptyRows = rowsPerPage - datas.length;
  return (<TableBody>
    {Object.keys(datas).map((id, index, array) => {
        return (
          <TableRow className={classes.tableRow} key={id}>
            {UITableRow(datas[id], columns)}
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

/**
 * 表格
 * @param {object} props 
 */
const UITable = (props) => {
  const { dispatch, classes } = props;
  const { datas, total, order, orderBy, selected, rowsPerPage, page } = props._model.items;

  return (
    <Paper className={classes.tablePaper}>
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