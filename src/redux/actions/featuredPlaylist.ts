import Action from '../../interfaces/Action';
import { FETCH_FEATURED_PLAYLIST } from '../actionTypes';

export const featuredPlaylistAction = (data: any): Action => {
  return {
    type: FETCH_FEATURED_PLAYLIST,
    payload: data,
  };
};
