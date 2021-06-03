import { CHANGE_TITLE_REVIEW } from '../../actionsTypes/showTitlesActionsTypes';
import {
  SET_RATING_STARTED,
  SET_RATING_SUCCESS,
  SET_RATING_FAILURE,
  TOGGLE_FAVORITE_STARTED,
  TOGGLE_FAVORITE_SUCCESS,
  TOGGLE_FAVORITE_FAILURE,
} from '../../actionsTypes/showReviewActionsTypes';

const initState = '';

export default function review(state = initState, action) {
  switch (action.type) {
    case CHANGE_TITLE_REVIEW:
      return action.payload;
    case SET_RATING_SUCCESS:
      return action.payload;
    case TOGGLE_FAVORITE_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
