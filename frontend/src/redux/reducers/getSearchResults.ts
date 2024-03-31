import Action from "../../interfaces/Action"
import { SEARCH_RESULTS } from "../actionTypes"
const initialState = {
    artists:[],
    tracks:[],
    albums:[],
    playlists:[]
}
 export const getSearchResults =(state=initialState,action:Action)=>{
    console.log("laudu",action.type)
    switch(action.type){
        case SEARCH_RESULTS:
            console.log(action.payload,"char")
            return action.payload
        
        default:
            return state;
    }
}