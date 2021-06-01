import {
  CHANGE_SELECTED_TAGS,
  TOGGLE_FAVORITE_BUTTON,
  CHANGE_SEARCH_FIELD,
} from '../actionsTypes/sideMenuActionsTypes';

export function changeSearchField(searchStr) {
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: searchStr,
  };
}

export function toggleFavoriteButton(isActive) {
  return {
    type: TOGGLE_FAVORITE_BUTTON,
    payload: isActive,
  };
}

export function changeSelectedTags(newTag) {
  return {
    type: CHANGE_SELECTED_TAGS,
    payload: newTag,
  };
}
