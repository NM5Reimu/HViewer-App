import {
  SET_RATING_STARTED,
  SET_RATING_SUCCESS,
  SET_RATING_FAILURE,
  TOGGLE_FAVORITE_STARTED,
  TOGGLE_FAVORITE_SUCCESS,
  TOGGLE_FAVORITE_FAILURE,
} from '../actionsTypes/showReviewActionsTypes';
import axios from 'axios';

export function setTitleFavorite(id, favorite) {
  return (dispatch) => {
    dispatch(setFavoriteStarted());
    let newFav = {
      id: id,
      favorites: favorite,
    };
    axios
      .get(`http://localhost:3000/setFavoriteById/${JSON.stringify(newFav)}`)
      .then((response) => {
        dispatch(setFavoriteSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(setFavoriteFailure(error));
        console.log('Something went wrong: ' + error.message);
      });
  };
}

const setFavoriteStarted = () => ({
  type: TOGGLE_FAVORITE_STARTED,
});

const setFavoriteSuccess = (title) => ({
  type: TOGGLE_FAVORITE_SUCCESS,
  payload: title,
});

const setFavoriteFailure = (error) => ({
  type: TOGGLE_FAVORITE_FAILURE,
  payload: { error },
});

export function setTitleRating(id, rating) {
  return (dispatch) => {
    dispatch(setRatingStarted());
    axios
      .get(
        `http://localhost:3000/setRatingById/${JSON.stringify({
          rating: rating,
          id: id,
        })}`,
      )
      .then((response) => {
        dispatch(setRatingSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(setRatingFailure(error));
        console.log('Something went wrong: ' + error.message);
      });
  };
}

const setRatingStarted = () => ({
  type: SET_RATING_STARTED,
});

const setRatingSuccess = (title) => ({
  type: SET_RATING_SUCCESS,
  payload: title,
});

const setRatingFailure = (error) => ({
  type: SET_RATING_FAILURE,
  payload: { error },
});
