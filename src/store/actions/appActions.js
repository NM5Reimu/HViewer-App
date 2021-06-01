import {
  GET_SEARCHED_TITLES_STARTED,
  GET_SEARCHED_TITLES_SUCCESS,
  GET_SEARCHED_TITLES_FAILURE,
} from '../actionsTypes/appActionsTypes';
import axios from 'axios';
import store from '../store';

export function getSearchedTitles() {
  return (dispatch) => {
    dispatch(getTitlesStarted());
    const state = store.getState();

    axios
      .get(
        `http://localhost:3000/getSearched/${JSON.stringify({
          searchField: state.searchInput,
          tags: state.selectedTags,
          favs: state.favorites,
        })}`,
      )
      .then((response) => {
        dispatch(getTitlesSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(getTitlesFailure(error));
        console.log('Something went wrong: ' + error.message);
      });
    console.log(
      `Request:  searchField: ${state.searchInput} tags: ${state.selectedTags} favorites: ${state.favorites}`,
    );
  };
}

const getTitlesStarted = () => ({
  type: GET_SEARCHED_TITLES_STARTED,
});

const getTitlesSuccess = (titles) => ({
  type: GET_SEARCHED_TITLES_SUCCESS,
  payload: titles,
});

const getTitlesFailure = (error) => ({
  type: GET_SEARCHED_TITLES_FAILURE,
  payload: { error },
});
