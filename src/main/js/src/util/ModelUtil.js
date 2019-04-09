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

const updata = (src, path, value) => {
  if (!src) {
    return;
  }
  const paths = path.path.split('/');
  let tModel = src;
  for (let i = 1, length = paths.length;i < length;i++) {
    if (i + 1 === length) {
      tModel[paths[i]] = value;
    } else {
      tModel = tModel[paths[i]];
      if (tModel === null || tModel === undefined) {
        break;
      }
    }
  }
};

const ModelUtil = {
  deepCopyModel,
  updata,
};

export default ModelUtil;