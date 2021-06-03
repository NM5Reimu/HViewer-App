import { CHANGE_TITLE_REVIEW } from '../actionsTypes/showTitlesActionsTypes';

export function changeTitleReview(title) {
  return {
    type: CHANGE_TITLE_REVIEW,
    payload: title,
  };
}
