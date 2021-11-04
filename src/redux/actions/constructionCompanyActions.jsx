import { v4 as uuidv4 } from 'uuid';
import {
  GET_CONSTRUCTIONS,
  ADD_CONSTRUCTION,
  UPDATE_CONSTRUCTION,
  DELETE_CONSTRUCTION,
} from '../types/constructionCompanyActionTypes';
import ConstructionsData from '../../mocks/constructionCompany.json';

let constructions = ConstructionsData;

export const getConstructions = () => ({
  type: GET_CONSTRUCTIONS,
  constructions,
});

export const addConstruction = (construction) => ({
  type: ADD_CONSTRUCTION,
  id: uuidv4(),
  construction,
});

export const updateConstruction = (construction) => ({
  type: UPDATE_CONSTRUCTION,
  construction,
});

export const deleteConstruction = (id) => ({
  type: DELETE_CONSTRUCTION,
  id,
});
