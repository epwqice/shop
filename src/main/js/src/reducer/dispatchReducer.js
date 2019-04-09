import { UPDATA_ACTION } from '../action';
import Util from '../util';

const { ModelUtil } = Util;

const dispatchReducer = (initState) => (state = initState, action) => {
  switch (action.type) {
    case UPDATA_ACTION:
      const newState = ModelUtil.deepCopyModel(state);
      ModelUtil.updata(newState, action.path, action.value);
      return newState;
    default:
      return state;
  }

  return state;
};

export default dispatchReducer;