import Action from '../../interfaces/Action';
import { FETCH_TOKEN } from '../actionTypes';
const initialToken: string = '';

const getTokenReducer = (state: string = initialToken, action: Action): string => {
  switch (action.type) {
    case FETCH_TOKEN:
      return action.payload;

    default:
      return state;
  }
};
export default getTokenReducer;
