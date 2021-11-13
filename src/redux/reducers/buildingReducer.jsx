import {
  GET_BUILDINGS_FETCHING,
  GET_BUILDINGS_FULFILLED,
  GET_BUILDINGS_REJECTED,
  GET_BUILDING_FETCHING,
  GET_BUILDING_FULFILLED,
  GET_BUILDING_REJECTED,
  ADD_BUILDING_FETCHING,
  ADD_BUILDING_FULFILLED,
  ADD_BUILDING_REJECTED,
  UPDATE_BUILDING_FETCHING,
  UPDATE_BUILDING_FULFILLED,
  UPDATE_BUILDING_REJECTED,
  DELETE_BUILDING_FETCHING,
  DELETE_BUILDING_FULFILLED,
  DELETE_BUILDING_REJECTED,
} from '../types/buildingActionTypes';

const initialState = {
  isLoading: false,
  list: [],
  building: {},
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
    case UPDATE_BUILDING_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_BUILDING_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((building) => {
          if (building._id === action.payload.id) {
            const updatedBuilding = action.payload.building;
            updatedBuilding.id = action.payload.id;
            return updatedBuilding;
          }
          return building;
        }),
      };
    case UPDATE_BUILDING_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
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
          ...state.list.filter((building) => building._id !== action.payload),
        ],
      };
    case DELETE_BUILDING_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case GET_BUILDING_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_BUILDING_FULFILLED:
      return {
        ...state,
        isLoading: false,
        building: action.payload,
      };
    case GET_BUILDING_REJECTED:
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
