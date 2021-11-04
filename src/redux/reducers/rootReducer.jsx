import { combineReducers } from 'redux';
import buildingReducer from './buildingReducer';

const rootReducer = combineReducers({
  buildings: buildingReducer,
});

export default rootReducer;
