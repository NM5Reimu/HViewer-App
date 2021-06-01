import { combineReducers } from 'redux';

import searchInput from './test/searchInput';
import selectedTags from './test/selectedTags';
import favorites from './test/favorites';
import titles from './test/titles';
import review from './test/review';

export const rootReducer = combineReducers({
  searchInput,
  selectedTags,
  favorites,
  titles,
  review,
});
