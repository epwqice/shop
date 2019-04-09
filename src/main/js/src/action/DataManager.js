export const CREATE_ACTION = 'CREATE_ACTION';
export const UPDATA_ACTION = 'UPDATA_ACTION';

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

/**
 * 更新操作
 * @param {*} path 路径
 * @param {*} value 值
 */
export const updata = (path, value) => ({
  type: UPDATA_ACTION,
  path,
  value,
});