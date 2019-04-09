const get = (url, successFunc, failFunc) => {
  const body = {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  let sendUrl = window.location.origin + url;

  fetch(url, body).then((response) => response.json())
  .then(json => {
    successFunc(json);
  }).catch(function(ex) {
    console.error(ex);
    if (failFunc) {
      failFunc(ex);
    }
  });
}

/**
 * 计算分页表格url参数
 * @param {{order, orderBy, page, rowsPerPage}} items 分页表结构
 * @returns 分页表格url参数
 */
const computePageTableParam = (items) => {
  let strParam = '', connect = '';
  ['order', 'orderBy', 'page', 'rowsPerPage'].forEach(item => {
    if (items[item] !== undefined && items[item] !== null) {
      strParam += connect + item + '=' + items[item];
      connect = '&';
    }
  });
  return strParam;
}

const isSuccess = (json) => 0 === json.result;

const MsgUtil = {
  get,
  isSuccess,
  computePageTableParam,
}

export default MsgUtil;