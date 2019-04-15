export const CREATE_ACTION = 'CREATE_ACTION';
export const UPDATA_ACTION = 'UPDATA_ACTION';
export const DELETE_ACTION = 'DELETE_ACTION';

/**
 * 创建操作
 * @param {*} path 路径
 * @param {*} value 值
 */
export const create = (path, value) => ({
  type: CREATE_ACTION,
  path,
  value,
});

export const deleteObj = (path) => ({
  type: DELETE_ACTION,
  path,
});

/**
 * 更新操作
 * @param {string} path 路径
 * @param {object} value 值
 */
export const updata = (path, value) => ({
  type: UPDATA_ACTION,
  path,
  value,
});