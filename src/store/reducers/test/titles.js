import {
  GET_SEARCHED_TITLES_STARTED,
  GET_SEARCHED_TITLES_SUCCESS,
  GET_SEARCHED_TITLES_FAILURE,
} from '../../actionsTypes/appActionsTypes';

const initState = [];

export default function titles(state = initState, action) {
  switch (action.type) {
    case GET_SEARCHED_TITLES_SUCCESS:
      console.log('sus');
      return action.payload;

    case GET_SEARCHED_TITLES_STARTED:
      console.log('started');
      return action.payload;

    case GET_SEARCHED_TITLES_FAILURE:
      console.log('fail');
      return [];

    default:
      return state;
  }
}
