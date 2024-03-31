import { combineReducers, createStore } from "redux";
import getTokenReducer from "./reducers/getTokenReducer";
import { getFeaturedPlaylistReducer } from "./reducers/getFeaturePlaylists";
import { getSearchResults } from "./reducers/getSearchResults";


const rootReducer = combineReducers({
    token:getTokenReducer,
    featuredPlaylist:getFeaturedPlaylistReducer,
    searchResult:getSearchResults
});

export const store = createStore(rootReducer);