import { combineReducers } from 'redux';
import buildingReducer from './buildingReducer';
import constructionCompanyReducer from './constructionCompanyReducer';

const rootReducer = combineReducers({
  buildings: buildingReducer,
  constructions: constructionCompanyReducer,
});

export default rootReducer;
