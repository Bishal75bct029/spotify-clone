import { ChangeEvent, useEffect, useState } from 'react'
import { Store } from '../interfaces/Store';
import { useDispatch, useSelector } from 'react-redux';
import { UserInput } from '../interfaces/UserInput';
import axios from 'axios';
import { SEARCH_RESULTS } from '../redux/actionTypes';


const useInput = (initialValue: any): UserInput => {
  const [value, setValue] = useState(initialValue);
  const dispatch = useDispatch();
  const token = useSelector((store: Store) => store.token);
  const searchValues = useSelector((store: Store) => store.searchResult);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        //'hehe')
        if(!value){
          return;
        }
        const response = await axios.get('https://api.spotify.com/v1/search', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          
            params: {
              q: value,
              type: 'artist,album,playlist,track',
              limit:'5'
            }
          
        });
        const searchResult = response.data;
        const albums = searchResult.albums.items.map((album:any)=>{
          return {
            title:album.name,
            image:album.images[0].url
          }
        })
        const artists = searchResult.artists.items.map((artist:any)=>{
          return {
            title:artist.name,
            image:artist.images[0].url,
            followers:artist.followers.total
          }
        })
        const playlists = searchResult.playlists.items.map((playlist:any)=>{
          return {
            title:playlist.name,
            image:playlist.images[0].url,
            description:playlist.description
          }
        })
        const tracks = searchResult.tracks.items.map((track:any)=>{
          return {
            title:track.name,
            image:track.album.images[0].url,
            artists:track.artists
          }
        });
        const payloadData = {artists,albums,playlists,tracks}
        //payloadData,'hatori')
        dispatch({type:SEARCH_RESULTS,payload:payloadData});
        //response.data,'perman'); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setTimeout(()=>{
      if(value){
        fetchData();
      }else{
        dispatch({type:SEARCH_RESULTS,payload:{artists:[],tracks:[],albums:[],playlists:[]}})
      }

    },1000)
  
  }, [token,value]); 
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  }
  //searchValues,'ninja');
  return { value, handleChange };

};

export default useInput