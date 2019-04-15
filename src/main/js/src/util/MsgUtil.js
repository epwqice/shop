const msg = (url, json, msgType, successFunc, failFunc) => {
  const body = {
    method: msgType,
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  };

  if (msgType === 'Post' || msgType === 'Delete') {
    body.body = JSON.stringify(json);
  }

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

const post = (url, json, successFunc, failFunc) => msg(url, json, 'Post', successFunc, failFunc);

const deleteMsg = (url, json, successFunc, failFunc) => msg(url, json, 'Delete', successFunc, failFunc);

const get = (url, successFunc, failFunc) => msg(url, null, 'Get', successFunc, failFunc);

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
  post,
  delete: deleteMsg,
  isSuccess,
  computePageTableParam,
}

export default MsgUtil;