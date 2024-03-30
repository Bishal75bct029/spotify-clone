import Action from '../../interfaces/Action'
import { FETCH_FEATURED_PLAYLIST } from '../actionTypes'

// const Item = {
//     image:'',
//     title:'',
//     description:''

// }

// const initialState:typeof Item[] = [];
export const getFeaturedPlaylistReducer = (state = [],action:Action)=>{
    switch(action.type){
        case FETCH_FEATURED_PLAYLIST:
            console.log(action.payload,"kismat")
            return action.payload as any;
        
        default:
            return state;
    }
}