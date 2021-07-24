import { CHANGE_SORT_SELECTION } from '../../actionsTypes/headerActionsTypes.js';

const initState = 'name';

export default function favorites(state = initState, action) {
  switch (action.type) {
    case CHANGE_SORT_SELECTION:
      return action.payload;

    default:
      return state;
  }
}
