import { combineReducers } from 'redux';
import searchInput from './test/searchInput';
import selectedTags from './test/selectedTags';
import favorites from './test/favorites';
import titles from './test/titles';
import review from './test/review';
import darkTheme from './test/darkTheme';
import sortBy from './test/sortBy';

export const rootReducer = combineReducers({
  searchInput,
  selectedTags,
  favorites,
  titles,
  review,
  darkTheme,
  sortBy,
});
