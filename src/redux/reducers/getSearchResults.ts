import Action from '../../interfaces/Action';
import { SEARCH_RESULTS } from '../actionTypes';
const initialState = {
  artists: [],
  tracks: [],
  albums: [],
  playlists: [],
};
export const getSearchResults = (state = initialState, action: Action) => {
  ////"laudu",action.type)
  switch (action.type) {
    case SEARCH_RESULTS:
      //action.payload,"char")
      return action.payload;

    default:
      return state;
  }
};
