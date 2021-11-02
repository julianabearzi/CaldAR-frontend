import { combineReducers } from 'redux';
import constructionCompanyReducer from './constructionCompanyReducer';

const rootReducer = combineReducers({
  constructions: constructionCompanyReducer,
});

export default rootReducer;
