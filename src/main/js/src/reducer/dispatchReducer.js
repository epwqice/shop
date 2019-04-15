import { UPDATA_ACTION, DELETE_ACTION } from '../action';
import Util from '../util';

const { ModelUtil } = Util;

const dispatchReducer = (initState) => (state = initState, action) => {
  let newState;
  switch (action.type) {
    case UPDATA_ACTION:
      // newState = ModelUtil.deepCopyModel(state); 
      return ModelUtil.updata(state, action.path, action.value);
      // return newState;
    case DELETE_ACTION:
      // newState = ModelUtil.deepCopyModel(state); 
      return ModelUtil.deleteObj(state, action.path);
    default:
      return state;
  }

  return state;
};

export default dispatchReducer;