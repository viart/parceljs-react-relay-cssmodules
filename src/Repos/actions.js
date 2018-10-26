import {
  SET_QUERY,
  TOGGLE_REPO,
  RESET
} from './constants';

export const setQuery = payload => ({
  payload,
  type: SET_QUERY
});

export const toggleRepo = payload => ({
  payload,
  type: TOGGLE_REPO
});

export const resetState = () => ({
  type: RESET
});
