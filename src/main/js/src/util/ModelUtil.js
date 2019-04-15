const checkObjectType = (obj) => Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
const isObject = obj => checkObjectType(obj) === 'Object';
const isArray = obj => checkObjectType(obj) === 'Array';
const isString = obj => checkObjectType(obj) === 'String';
const isFunction = obj => checkObjectType(obj) === 'Function';

const setModelFunc = (targ, src, skipKey) => {
  for (const [k, v] of Object.entries(src)) {
    if (skipKey === k) {
      continue;
    }
    if (isFunction(v)) {
      targ[k] = v;
    };

    if (isObject(v)) {
      setModelFunc(targ[k], v);
    }

    if (isArray(v)) {
      v.forEach((vItem, index) => {
        setModelFunc(targ[k][index], v[index]);
      });
    }
  }
}

/**
 * 拷贝数据, 函数赋值不拷贝
 * @param {object} src 源数据
 * @param {string} skipKey 忽略标识
 */
const deepCopyModel = (src, skipKey) => {
  const targ = JSON.parse(JSON.stringify(src));
  setModelFunc(targ, src);
  return targ;
};

const deleteObj = (src, path) => modelOperation(src, path, 'delete');

const modelOperation = (src, path, operation, value) => {
  if (src === undefined || src === null) {
    return src;
  }
  const paths = path.path.split('/');
  let tModel = src, resultModel = null, tResultModel, find = true;
  for (let i = 1, length = paths.length;i < length;i++) {
    const tPath = paths[i];
    if (i + 1 === length) {
      if (operation === 'updata') {
        tModel[tPath] = value;
      } else if (operation === 'delete') {
        delete tModel[paths[i]];
      } else {
        // 暂无
      }

    } else {
      tModel = {
        ...tModel,
      };
      if (1 === i) {
        resultModel = tModel;
        tResultModel = resultModel;
      }
      tModel[tPath] = {
        ...tModel[tPath]
      };
      tModel = tModel[tPath];
      tResultModel[tPath] = tModel;
      tResultModel = tResultModel[tPath];
      if (tModel === null || tModel === undefined) {
        find = false;
        break;
      }
    }
  }

  if (find) {
    return resultModel;
  }

  return src;
};

const updata = (src, path, value) => modelOperation(src, path, 'updata', value)

const ModelUtil = {
  deepCopyModel,
  updata,
  deleteObj,
};

export default ModelUtil;