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

const URL = process.env.REACT_APP_BACKEND_URL;

export const getConstructionsFetching = () => ({
  type: GET_CONSTRUCTIONS_FETCHING,
});

export const getConstructionsFulfilled = (payload) => ({
  type: GET_CONSTRUCTIONS_FULFILLED,
  payload,
});

export const getConstructionsRejected = () => ({
  type: GET_CONSTRUCTIONS_REJECTED,
});

export const getConstructions = () => (dispatch) => {
  dispatch(getConstructionsFetching());
  return fetch(`${URL}/constructions`)
    .then((data) => data.json())
    .then((response) => {
      dispatch(getConstructionsFulfilled(response));
    })
    .catch(() => {
      dispatch(getConstructionsRejected());
    });
};

export const addConstructionFetching = () => ({
  type: ADD_CONSTRUCTION_FETCHING,
});

export const addConstructionFulfilled = (payload) => ({
  type: ADD_CONSTRUCTION_FULFILLED,
  payload,
});

export const addConstructionRejected = () => ({
  type: ADD_CONSTRUCTION_REJECTED,
});

export const addConstruction = (construction) => (dispatch) => {
  dispatch(addConstructionFetching());
  return fetch(`${URL}/constructions`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(construction),
  })
    .then((data) => data.json())
    .then((response) => {
      dispatch(addConstructionFulfilled(response));
    })
    .catch(() => {
      dispatch(addConstructionRejected());
    });
};

export const updateConstructionFetching = () => ({
  type: UPDATE_CONSTRUCTION_FETCHING,
});

export const updateConstructionFulfilled = (construction, id) => ({
  type: UPDATE_CONSTRUCTION_FULFILLED,
  payload: {
    construction,
    id,
  },
});

export const updateConstructionRejected = () => ({
  type: UPDATE_CONSTRUCTION_REJECTED,
});

export const updateConstruction = (construction, id) => (dispatch) => {
  dispatch(updateConstructionFetching());
  return fetch(`${URL}/constructions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(construction),
  })
    .then((data) => data.json())
    .then((response) => {
      dispatch(updateConstructionFulfilled(response, id));
    })
    .catch(() => {
      dispatch(updateConstructionRejected());
    });
};

export const deleteConstructionFetching = () => ({
  type: DELETE_CONSTRUCTION_FETCHING,
});

export const deleteConstructionFulfilled = (payload) => ({
  type: DELETE_CONSTRUCTION_FULFILLED,
  payload,
});

export const deleteConstructionRejected = () => ({
  type: DELETE_CONSTRUCTION_REJECTED,
});

export const deleteConstruction = (id) => (dispatch) => {
  dispatch(addConstructionFetching());
  return fetch(`${URL}/constructions/${id}`, {
    method: 'DELETE',
  })
    .then((data) => data.json())
    .then(() => {
      dispatch(deleteConstructionFulfilled(id));
    })
    .catch(() => {
      dispatch(deleteConstructionRejected());
    });
};
