import {
  GET_CONSTRUCTIONS_FETCHING,
  GET_CONSTRUCTIONS_FULFILLED,
  GET_CONSTRUCTIONS_REJECTED,
  ADD_CONSTRUCTION_FETCHING,
  ADD_CONSTRUCTION_FULFILLED,
  ADD_CONSTRUCTION_REJECTED,
  UPDATE_CONSTRUCTION_FETCHING,
  UPDATE_CONSTRUCTION_FULFILLED,
  UPDATE_CONSTRUCTION_REJECTED,
  DELETE_CONSTRUCTION_FETCHING,
  DELETE_CONSTRUCTION_FULFILLED,
  DELETE_CONSTRUCTION_REJECTED,
} from '../types/constructionCompanyActionTypes';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
};

const constructionCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONSTRUCTIONS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CONSTRUCTIONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case GET_CONSTRUCTIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case ADD_CONSTRUCTION_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_CONSTRUCTION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload],
      };
    case ADD_CONSTRUCTION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case UPDATE_CONSTRUCTION_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_CONSTRUCTION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((construction) => {
          if (construction._id === action.payload.id) {
            const updatedConstruction = action.payload.construction;
            updatedConstruction.id = action.payload.id;
            return updatedConstruction;
          }
          return construction;
        }),
      };
    case UPDATE_CONSTRUCTION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case DELETE_CONSTRUCTION_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_CONSTRUCTION_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [
          ...state.list.filter(
            (construction) => construction._id !== action.payload
          ),
        ],
      };
    case DELETE_CONSTRUCTION_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default constructionCompanyReducer;
