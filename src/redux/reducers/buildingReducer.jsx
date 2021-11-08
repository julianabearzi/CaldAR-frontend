import {
  GET_BUILDINGS_FETCHING,
  GET_BUILDINGS_FULFILLED,
  GET_BUILDINGS_REJECTED,
  ADD_BUILDING_FETCHING,
  ADD_BUILDING_FULFILLED,
  ADD_BUILDING_REJECTED,
  UPDATE_BUILDING,
  DELETE_BUILDING_FETCHING,
  DELETE_BUILDING_FULFILLED,
  DELETE_BUILDING_REJECTED,
} from '../types/buildingActionTypes';

const initialState = {
  isLoading: false,
  list: [],
  error: false,
};

const buildingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUILDINGS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_BUILDINGS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case GET_BUILDINGS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case ADD_BUILDING_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_BUILDING_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload],
      };
    case ADD_BUILDING_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case UPDATE_BUILDING:
      return {
        ...state,
        list: state.list.map((building) => {
          if (building.id === action.building.id) {
            const updatedBuilding = action.building;
            updatedBuilding.id = action.building.id;
            return updatedBuilding;
          }
          return building;
        }),
      };
    case DELETE_BUILDING_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_BUILDING_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [
          // eslint-disable-next-line no-underscore-dangle
          ...state.list.filter((building) => building._id !== action.payload),
        ],
      };
    case DELETE_BUILDING_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default buildingReducer;
