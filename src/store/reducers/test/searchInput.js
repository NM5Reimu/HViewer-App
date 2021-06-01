import { CHANGE_SEARCH_FIELD } from '../../actionsTypes/sideMenuActionsTypes';

const initState = '';

export default function searchInput(state = initState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_FIELD:
      return action.payload;

    default:
      return state;
  }
}
