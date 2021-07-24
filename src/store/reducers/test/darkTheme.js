import { TOGGLE_THEME } from '../../actionsTypes/darkThemeActionTypes';

const initState = false;

export default function darkTheme(state = initState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return action.payload;

    default:
      return state;
  }
}
