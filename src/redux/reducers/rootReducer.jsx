import { combineReducers } from 'redux';
import buildingReducer from './buildingReducer';
import constructionCompanyReducer from './constructionCompanyReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  buildings: buildingReducer,
  constructions: constructionCompanyReducer,
  modal: modalReducer,
});

export default rootReducer;
