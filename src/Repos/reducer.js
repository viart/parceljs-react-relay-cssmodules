import { SET_QUERY, TOGGLE_REPO, RESET } from './constants';

const initialState = {
  query: '',
  selected: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case TOGGLE_REPO:
      const { selected } = state;
      const id = action.payload;
      return {
        ...state,
        selected: selected.includes(id) ? selected.filter(i => i !== id) : selected.concat(id)
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
}
