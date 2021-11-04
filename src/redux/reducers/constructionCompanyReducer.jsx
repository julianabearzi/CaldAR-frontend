import {
  GET_CONSTRUCTIONS,
  ADD_CONSTRUCTION,
  UPDATE_CONSTRUCTION,
  DELETE_CONSTRUCTION,
} from '../types/constructionCompanyActionTypes';

const initialState = {
  list: [],
};

const constructionCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONSTRUCTIONS:
      return {
        ...state,
        list: action.constructions,
      };
    case ADD_CONSTRUCTION:
      return {
        ...state,
        list: [...state.list, { id: action.id, ...action.construction }],
      };
    case UPDATE_CONSTRUCTION:
      return {
        ...state,
        list: state.list.map((construction) => {
          if (construction.id === action.construction.id) {
            const updatedConstruction = action.construction;
            updatedConstruction.id = action.construction.id;
            return updatedConstruction;
          }
          return construction;
        }),
      };
    case DELETE_CONSTRUCTION:
      return {
        ...state,
        list: [
          ...state.list.filter((construction) => construction.id !== action.id),
        ],
      };
    default:
      return state;
  }
};

export default constructionCompanyReducer;
