import { combineReducers, createStore } from "redux";
import getTokenReducer from "./reducers/getTokenReducer";
import { getFeaturedPlaylistReducer } from "./reducers/getFeaturePlaylists";

const rootReducer = combineReducers({
    token:getTokenReducer,
    featuredPlaylist:getFeaturedPlaylistReducer
});

export const store = createStore(rootReducer);