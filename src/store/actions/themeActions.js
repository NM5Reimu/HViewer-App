import { TOGGLE_THEME } from '../actionsTypes/darkThemeActionTypes';

export function toggleTheme(isDark) {
  return {
    type: TOGGLE_THEME,
    payload: isDark,
  };
}
