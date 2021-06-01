import { TOGGLE_FAVORITE_BUTTON } from '../../actionsTypes/sideMenuActionsTypes';

const initState = false;

export default function favorites(state = initState, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE_BUTTON:
      return action.payload;

    default:
      return state;
  }
}
