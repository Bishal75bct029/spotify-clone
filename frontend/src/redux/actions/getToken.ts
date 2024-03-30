import Action from "../../interfaces/Action"
import { FETCH_TOKEN } from "../actionTypes"

export const getTokenAction = (data: any): Action => ({
    type: FETCH_TOKEN,
    payload:data

})