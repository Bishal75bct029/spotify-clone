import Action from '../../interfaces/Action'
import { FETCH_BHAJAN_SONGS, FETCH_ENGLISH_SONGS, FETCH_FEATURED_PLAYLIST, FETCH_HINDI_SONGS, FETCH_NEW_RELEASE } from '../actionTypes'
const initialState = {
    englishPlaylists:[],
    featuredPlaylists:[],
    newReleases:[],
    bhajanSongs:[],
    hindiSongs:[]
}

export const getFeaturedPlaylistReducer = (state = initialState,action:Action)=>{
    switch(action.type){
        case FETCH_FEATURED_PLAYLIST:
            //action.payload,"kismat")
            return {...state,featuredPlaylists:action.payload};
        
        case FETCH_ENGLISH_SONGS:
            return {...state, englishPlaylists:action.payload};

        case FETCH_NEW_RELEASE:
            return {...state,newReleases:action.payload};
        
        case FETCH_BHAJAN_SONGS:
            return {...state,bhajanSongs:action.payload};

        case FETCH_HINDI_SONGS:
            return {...state,hindiSongs:action.payload};
        
        default:
            return state;
    }
}