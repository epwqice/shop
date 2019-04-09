import { combineReducers } from 'redux';
import dispatchReducer from './dispatchReducer';

const reducer = (initState) => combineReducers({
  reducer: dispatchReducer(initState)
});

export default reducer;