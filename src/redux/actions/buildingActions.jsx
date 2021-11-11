import {
  GET_BUILDINGS_FETCHING,
  GET_BUILDINGS_FULFILLED,
  GET_BUILDINGS_REJECTED,
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

const URL = process.env.REACT_APP_BACKEND_URL;

export const getBuildingsFetching = () => ({
  type: GET_BUILDINGS_FETCHING,
});

export const getBuildingsFulfilled = (payload) => ({
  type: GET_BUILDINGS_FULFILLED,
  payload,
});

export const getBuildingsRejected = () => ({
  type: GET_BUILDINGS_REJECTED,
});

export const getBuildings = () => (dispatch) => {
  dispatch(getBuildingsFetching());
  return fetch(URL)
    .then((data) => data.json())
    .then((response) => {
      dispatch(getBuildingsFulfilled(response));
    })
    .catch(() => {
      dispatch(getBuildingsRejected());
    });
};

export const addBuildingFetching = () => ({
  type: ADD_BUILDING_FETCHING,
});

export const addBuildingFulfilled = (payload) => ({
  type: ADD_BUILDING_FULFILLED,
  payload,
});

export const addBuildingRejected = () => ({
  type: ADD_BUILDING_REJECTED,
});

export const addBuilding = (building) => (dispatch) => {
  dispatch(addBuildingFetching());
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(building),
  })
    .then((data) => data.json())
    .then((response) => {
      dispatch(addBuildingFulfilled(response));
    })
    .catch(() => {
      dispatch(addBuildingRejected());
    });
};

export const updateBuildingFetching = () => ({
  type: UPDATE_BUILDING_FETCHING,
});

export const updateBuildingFulfilled = (building, id) => ({
  type: UPDATE_BUILDING_FULFILLED,
  payload: {
    building,
    id,
  },
});

export const updateBuildingRejected = () => ({
  type: UPDATE_BUILDING_REJECTED,
});

export const updateBuilding = (building, id) => (dispatch) => {
  dispatch(updateBuildingFetching());
  return fetch(`${URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(building),
  })
    .then((data) => data.json())
    .then((response) => {
      dispatch(updateBuildingFulfilled(response, id));
    })
    .catch(() => {
      dispatch(updateBuildingRejected());
    });
};

export const deleteBuildingFetching = () => ({
  type: DELETE_BUILDING_FETCHING,
});

export const deleteBuildingFulfilled = (payload) => ({
  type: DELETE_BUILDING_FULFILLED,
  payload,
});

export const deleteBuildingRejected = () => ({
  type: DELETE_BUILDING_REJECTED,
});

export const deleteBuilding = (id) => (dispatch) => {
  dispatch(addBuildingFetching());
  return fetch(`${URL}/${id}`, {
    method: 'DELETE',
  })
    .then((data) => data.json())
    .then(() => {
      dispatch(deleteBuildingFulfilled(id));
    })
    .catch(() => {
      dispatch(deleteBuildingRejected());
    });
};
