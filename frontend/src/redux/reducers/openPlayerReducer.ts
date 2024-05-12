import Action from "../../interfaces/Action";
import { OPEN_PLAYER } from "../actionTypes";


export const getPlayerState = (state = "",action:Action)=>{
    switch(action.type){
        case OPEN_PLAYER:
            //action.payload,"are ou here")
            return action.payload;
        
        default:
            return state;
    }
}