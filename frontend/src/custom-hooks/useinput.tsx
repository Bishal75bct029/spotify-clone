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
 // const searchValues = useSelector((store: Store) => store.searchResult);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        //'hehe')
        if(!value){
          return;
        }
        const response = await axios.get('https://saavn.dev/api/search', {
          
          
            params: {
              query:value
             
            }
          
        });
        const searchResult = response.data;
        console.log(searchResult,"gandu")
        const albums = searchResult.data.albums?.results?.map((album:any)=>{
          return {
            id:album.id,
            title:album.description,
            image:album.image[2].url
          }
        })
        const artists = searchResult.data.artists.results.map((artist:any)=>{
          return {
            id:artist.id,
            title:artist.title,
            image:artist.image[2].url,
          }
        })
        const playlists = searchResult.data.playlists.results.map((playlist:any)=>{
          return {
            id:playlist.id,
            title:playlist.title,
            image:playlist.image[2].url,
            description:playlist.description
          }
        })
        const tracks = searchResult.data.songs.results.map((track:any)=>{
          return {
            id:track.id,
            title:track.title,
            image:track.image[2].url,
            artists: track.primaryArtists?.includes(',')?track.primaryArtists.split(',') : [track.primaryArtists],
            description:track.description,
            url:track.url
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