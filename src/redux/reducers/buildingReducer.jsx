import {
  GET_BUILDINGS,
  ADD_BUILDING,
  UPDATE_BUILDING,
  DELETE_BUILDING,
} from '../types/buildingActionTypes';

const initialState = {
  list: [],
};

const buildingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUILDINGS:
      return {
        ...state,
        list: action.buildings,
      };
    case ADD_BUILDING:
      return {
        ...state,
        list: [...state.list, { id: action.id, ...action.building }],
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
    case DELETE_BUILDING:
      return {
        ...state,
        list: [...state.list.filter((building) => building.id !== action.id)],
      };
    default:
      return state;
  }
};

export default buildingReducer;
