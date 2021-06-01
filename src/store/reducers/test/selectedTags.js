import { CHANGE_SELECTED_TAGS } from '../../actionsTypes/sideMenuActionsTypes';

const initState = [];

export default function selectedTags(state = initState, action) {
  switch (action.type) {
    case CHANGE_SELECTED_TAGS:
      let newTag = action.payload;
      let nextTagsArray = [];
      let prevTagsArray = state.slice();
      let tagIndex = prevTagsArray.indexOf(newTag);
      if (tagIndex !== -1) {
        prevTagsArray.splice(tagIndex, 1);
        return prevTagsArray;
      } else {
        nextTagsArray = [...prevTagsArray, newTag];
        return nextTagsArray;
      }

    default:
      return state;
  }
}
