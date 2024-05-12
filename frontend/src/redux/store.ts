import { combineReducers, createStore } from "redux";
import getTokenReducer from "./reducers/getTokenReducer";
import { getFeaturedPlaylistReducer } from "./reducers/getFeaturePlaylists";
import { getSearchResults } from "./reducers/getSearchResults";
import { getPlayerState } from "./reducers/openPlayerReducer";


const rootReducer = combineReducers({
    token:getTokenReducer,
    featuredPlaylist:getFeaturedPlaylistReducer,
    searchResult:getSearchResults,
    playerState:getPlayerState,
  
});

export const store = createStore(rootReducer);