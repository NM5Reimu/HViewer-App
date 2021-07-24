import { CHANGE_SORT_SELECTION } from '../actionsTypes/headerActionsTypes.js';

export function changeSortSelection(sortBy) {
  return {
    type: CHANGE_SORT_SELECTION,
    payload: sortBy,
  };
}
