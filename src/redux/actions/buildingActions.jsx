import { v4 as uuidv4 } from 'uuid';
import {
  GET_BUILDINGS,
  ADD_BUILDING,
  UPDATE_BUILDING,
  DELETE_BUILDING,
} from '../types/buildingActionTypes';
import BuildingsData from '../../mocks/buildings.json';

let buildings = BuildingsData;

export const getBuildings = () => ({
  type: GET_BUILDINGS,
  buildings,
});

export const addBuilding = (building) => ({
  type: ADD_BUILDING,
  id: uuidv4(),
  building,
});

export const updateBuilding = (building) => ({
  type: UPDATE_BUILDING,
  building,
});

export const deleteBuilding = (id) => ({
  type: DELETE_BUILDING,
  id,
});
